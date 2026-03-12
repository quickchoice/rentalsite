import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { saveTransaction } from '@/lib/transactions-db';
import { sendTransactionSummaryEmail } from '@/lib/transaction-email';

const STRIPE_WEBHOOK_TOLERANCE_SECONDS = 300;
const DEFAULT_NOTIFY_EMAIL = 'dante.smith@quickchoice.net';

function parseStripeSignature(headerValue) {
  const parts = String(headerValue || '').split(',');
  const parsed = { timestamp: '', v1: [] };

  parts.forEach(part => {
    const [key, value] = part.split('=');
    if (key === 't') parsed.timestamp = value;
    if (key === 'v1') parsed.v1.push(value);
  });

  return parsed;
}

function timingSafeHexEqual(a, b) {
  const aBuffer = Buffer.from(a, 'hex');
  const bBuffer = Buffer.from(b, 'hex');
  if (aBuffer.length !== bBuffer.length) return false;
  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

function verifyStripeSignature({ rawBody, signatureHeader, webhookSecret }) {
  const { timestamp, v1 } = parseStripeSignature(signatureHeader);
  if (!timestamp || !v1.length) return false;

  const ageSeconds = Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp));
  if (!Number.isFinite(ageSeconds) || ageSeconds > STRIPE_WEBHOOK_TOLERANCE_SECONDS) return false;

  const signedPayload = `${timestamp}.${rawBody}`;
  const expected = crypto.createHmac('sha256', webhookSecret).update(signedPayload).digest('hex');

  return v1.some(signature => timingSafeHexEqual(signature, expected));
}

function formatMoneyFromCents(cents, currency = 'usd') {
  const value = Number(cents || 0) / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: String(currency || 'usd').toUpperCase()
  }).format(value);
}

async function stripeGet(pathname, secretKey) {
  const response = await fetch(`https://api.stripe.com/v1${pathname}`, {
    headers: { Authorization: `Bearer ${secretKey}` },
    cache: 'no-store'
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Stripe API request failed (${response.status}): ${details}`);
  }

  return response.json();
}

function buildLineItemsText(lineItems, currency) {
  if (!Array.isArray(lineItems) || !lineItems.length) return 'No line items available.';

  return lineItems
    .map(item => {
      const amount = formatMoneyFromCents(item.amount_total, currency);
      const quantity = Number(item.quantity || 1);
      return `- ${item.description} (qty: ${quantity}) ${amount}`;
    })
    .join('\n');
}

function buildEmailBody({
  sessionId,
  paymentIntentId,
  customerName,
  customerEmail,
  customerPhone,
  arrivalDate,
  deliveryArea,
  referralSource,
  customerMessage,
  amountTotal,
  currency,
  dayCount,
  startDate,
  endDate,
  lineItemsText
}) {
  const paidAt = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });

  return [
    'QuickChoice Rentals Payment Summary',
    '',
    `Checkout Session: ${sessionId}`,
    `Payment Intent: ${paymentIntentId || 'N/A'}`,
    `Paid At (ET): ${paidAt}`,
    '',
    `Customer Name: ${customerName || 'N/A'}`,
    `Customer Email: ${customerEmail || 'N/A'}`,
    `Customer Phone: ${customerPhone || 'N/A'}`,
    `Arrival Date: ${arrivalDate || 'N/A'}`,
    `Delivery Area: ${deliveryArea || 'N/A'}`,
    `How They Heard About Us: ${referralSource || 'N/A'}`,
    `Customer Message: ${customerMessage || 'N/A'}`,
    '',
    `Total Paid: ${formatMoneyFromCents(amountTotal, currency)}`,
    `Rental Days: ${dayCount || 'N/A'}`,
    `Rental Start: ${startDate || 'N/A'}`,
    `Rental End: ${endDate || 'N/A'}`,
    '',
    'Items:',
    lineItemsText,
    '',
    'This email was sent automatically from the Stripe webhook.'
  ].join('\n');
}

export async function POST(request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFromEmail = process.env.RESEND_FROM_EMAIL;

  if (!stripeSecretKey || !stripeWebhookSecret) {
    return NextResponse.json({ error: 'Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET.' }, { status: 500 });
  }

  const rawBody = await request.text();
  const signatureHeader = request.headers.get('stripe-signature') || '';

  const isValid = verifyStripeSignature({
    rawBody,
    signatureHeader,
    webhookSecret: stripeWebhookSecret
  });

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid Stripe signature.' }, { status: 400 });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  const session = event.data?.object;
  const sessionId = session?.id;

  if (!sessionId) {
    return NextResponse.json({ error: 'Webhook payload missing session id.' }, { status: 400 });
  }

  if (session.payment_status !== 'paid') {
    return NextResponse.json({ received: true, skipped: 'Session not paid yet.' });
  }

  const lineItemsResponse = await stripeGet(`/checkout/sessions/${sessionId}/line_items?limit=100`, stripeSecretKey);
  const lineItems = lineItemsResponse?.data || [];

  const customerEmail = session.customer_details?.email || session.customer_email || session.metadata?.customer_email || '';
  const customerName = session.customer_details?.name || session.metadata?.customer_name || '';
  const customerPhone = session.customer_details?.phone || session.metadata?.customer_phone || '';
  const currency = session.currency || 'usd';
  const amountTotal = Number(session.amount_total || 0);

  const dayCount = Number(session.metadata?.day_count || 0) || null;
  const startDate = session.metadata?.start_date || null;
  const endDate = session.metadata?.end_date || null;
  const arrivalDate = session.metadata?.arrival_date || null;
  const deliveryArea = session.metadata?.delivery_area || null;
  const referralSource = session.metadata?.referral_source || null;
  const customerMessage = session.metadata?.customer_message || null;
  const promoApplied = session.metadata?.promo_applied === 'true';

  const lineItemsText = buildLineItemsText(lineItems, currency);

  const inserted = await saveTransaction({
    stripeSessionId: sessionId,
    stripeEventId: event.id,
    paymentIntentId: session.payment_intent || null,
    customerEmail: customerEmail || null,
    customerName: customerName || null,
    amountTotalCents: amountTotal,
    currency,
    dayCount,
    startDate,
    endDate,
    promoApplied,
    lineItemsText,
    customerPhone,
    arrivalDate,
    deliveryArea,
    referralSource,
    customerMessage
  });

  if (!inserted) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  const bodyText = buildEmailBody({
    sessionId,
    paymentIntentId: session.payment_intent,
    customerName,
    customerEmail,
    customerPhone,
    arrivalDate,
    deliveryArea,
    referralSource,
    customerMessage,
    amountTotal,
    currency,
    dayCount,
    startDate,
    endDate,
    lineItemsText
  });

  if (resendApiKey && resendFromEmail) {
    try {
      const emailResults = await sendTransactionSummaryEmail({
        resendApiKey,
        fromEmail: resendFromEmail,
        danteEmail: process.env.ORDER_NOTIFY_EMAIL || DEFAULT_NOTIFY_EMAIL,
        customerEmail,
        subject: `QuickChoice receipt: ${formatMoneyFromCents(amountTotal, currency)} (${sessionId})`,
        bodyText
      });

      emailResults
        .filter(result => !result.ok)
        .forEach(result => {
          console.error(`Email delivery failed for ${result.toEmail}: ${result.error}`);
        });
    } catch (error) {
      console.error('Unexpected email dispatch error:', error);
    }
  }

  return NextResponse.json({ received: true });
}
