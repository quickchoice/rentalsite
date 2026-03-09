import { NextResponse } from 'next/server';
import { getDayCount, parseDateLocal } from '@/lib/cart';
import { products } from '@/lib/data';

const productById = new Map(products.map(product => [product.id, product]));
const MAX_QTY_PER_LINE = 25;
const DISCOUNT_PERCENT = 99;
const DISCOUNT_MULTIPLIER = (100 - DISCOUNT_PERCENT) / 100;

function normalizePromoCode(value) {
  if (typeof value !== 'string') return '';
  return value.trim().toUpperCase();
}

function sanitizeCart(cart) {
  if (!Array.isArray(cart)) return [];

  const merged = new Map();
  cart.forEach(line => {
    const productId = typeof line?.productId === 'string' ? line.productId : '';
    if (!productById.has(productId)) return;

    const qty = Math.max(1, Math.min(MAX_QTY_PER_LINE, Math.floor(Number(line.qty) || 1)));
    merged.set(productId, (merged.get(productId) || 0) + qty);
  });

  return Array.from(merged.entries()).map(([productId, qty]) => ({
    productId,
    qty: Math.min(qty, MAX_QTY_PER_LINE)
  }));
}

function buildStripeCheckoutParams({ lineItems, orderMeta, dayCount, origin, promoApplied }) {
  const params = new URLSearchParams();

  params.set('mode', 'payment');
  params.set('customer_creation', 'always');
  params.set('success_url', `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`);
  params.set('cancel_url', `${origin}/summary?canceled=1`);
  params.set('allow_promotion_codes', 'true');
  params.set('metadata[start_date]', orderMeta.startDate);
  params.set('metadata[end_date]', orderMeta.endDate);
  params.set('metadata[day_count]', String(dayCount));
  params.set('metadata[promo_applied]', promoApplied ? 'true' : 'false');
  if (promoApplied) {
    params.set('metadata[promo_discount_percent]', String(DISCOUNT_PERCENT));
  }

  lineItems.forEach((lineItem, index) => {
    params.set(`line_items[${index}][quantity]`, String(lineItem.qty));
    params.set(`line_items[${index}][price_data][currency]`, 'usd');
    params.set(`line_items[${index}][price_data][unit_amount]`, String(lineItem.unitAmountCents));
    params.set(`line_items[${index}][price_data][product_data][name]`, lineItem.name);
    params.set(
      `line_items[${index}][price_data][product_data][description]`,
      `${lineItem.pricePerDayLabel} per day x ${dayCount} day(s)`
    );
    params.set(
      `line_items[${index}][price_data][product_data][metadata][product_id]`,
      lineItem.productId
    );
  });

  return params;
}

export async function POST(request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: 'Server is missing STRIPE_SECRET_KEY.' },
      { status: 500 }
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const orderMeta = payload?.orderMeta || {};
  const enteredPromoCode = normalizePromoCode(payload?.promoCode);
  const expectedPromoCode = normalizePromoCode(process.env.CHECKOUT_PROMO_CODE_99);
  const promoApplied = Boolean(
    enteredPromoCode &&
    expectedPromoCode &&
    enteredPromoCode === expectedPromoCode
  );

  const start = parseDateLocal(orderMeta.startDate);
  const end = parseDateLocal(orderMeta.endDate);
  if (!start || !end || end < start) {
    return NextResponse.json(
      { error: 'Invalid rental dates. Please select a valid date range.' },
      { status: 400 }
    );
  }

  const cart = sanitizeCart(payload?.cart);
  if (!cart.length) {
    return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 });
  }

  const dayCount = getDayCount(orderMeta);
  const lineItems = cart.map(line => {
    const product = productById.get(line.productId);
    if (!product) return null;
    const baseUnitAmountCents = Math.round(product.pricePerDay * dayCount * 100);
    const unitAmountCents = promoApplied
      ? Math.max(1, Math.round(baseUnitAmountCents * DISCOUNT_MULTIPLIER))
      : baseUnitAmountCents;

    return {
      productId: product.id,
      name: product.name,
      qty: line.qty,
      unitAmountCents,
      pricePerDayLabel: `$${product.pricePerDay}`
    };
  }).filter(Boolean);

  if (!lineItems.length) {
    return NextResponse.json({ error: 'No valid cart items found.' }, { status: 400 });
  }

  const origin = request.headers.get('origin') || request.nextUrl.origin;
  const params = buildStripeCheckoutParams({
    lineItems,
    orderMeta,
    dayCount,
    origin,
    promoApplied
  });

  let stripeResponse;
  try {
    stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString(),
      cache: 'no-store'
    });
  } catch {
    return NextResponse.json(
      { error: 'Could not reach Stripe. Try again in a moment.' },
      { status: 502 }
    );
  }

  const stripeJson = await stripeResponse.json();
  if (!stripeResponse.ok) {
    const message = stripeJson?.error?.message || 'Stripe checkout session creation failed.';
    return NextResponse.json({ error: message }, { status: 502 });
  }

  if (!stripeJson?.url) {
    return NextResponse.json({ error: 'Stripe did not return a checkout URL.' }, { status: 502 });
  }

  return NextResponse.json({ url: stripeJson.url });
}
