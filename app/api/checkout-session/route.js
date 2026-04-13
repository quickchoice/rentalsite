import { NextResponse } from 'next/server';
import { DEFAULT_DELIVERY_FEE_CENTS, DEFAULT_EXPEDITE_FEE_CENTS, getDayCount, getPromoDiscount, isExpeditedOrder, parseDateLocal } from '@/lib/cart';
import { bundles, products } from '@/lib/data';

const productById = new Map(products.map(product => [product.id, product]));
const bundleById = new Map(bundles.map(bundle => [bundle.id, bundle]));
const MAX_QTY_PER_LINE = 25;
const DISCOUNT_PERCENT = 20;
const DISCOUNT_MULTIPLIER = (100 - DISCOUNT_PERCENT) / 100;
const validLocations = new Set(['charleston', 'myrtle-beach']);
const parsedDeliveryFeeCents = Number(process.env.CHECKOUT_DELIVERY_FEE_CENTS || DEFAULT_DELIVERY_FEE_CENTS);
const DELIVERY_FEE_CENTS = Number.isFinite(parsedDeliveryFeeCents)
  ? Math.max(0, Math.round(parsedDeliveryFeeCents))
  : DEFAULT_DELIVERY_FEE_CENTS;
const parsedExpediteFeeCents = Number(process.env.CHECKOUT_EXPEDITE_FEE_CENTS || DEFAULT_EXPEDITE_FEE_CENTS);
const EXPEDITE_FEE_CENTS = Number.isFinite(parsedExpediteFeeCents)
  ? Math.max(0, Math.round(parsedExpediteFeeCents))
  : DEFAULT_EXPEDITE_FEE_CENTS;

function normalizePromoCode(value) {
  if (typeof value !== 'string') return '';
  return value.trim().toUpperCase();
}

function metaValue(value, maxLength = 450) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

function sanitizeCart(cart) {
  if (!Array.isArray(cart)) return [];

  const productLines = new Map();
  const bundleLines = new Map();
  cart.forEach(line => {
    if (line?.type === 'bundle') {
      const bundleId = typeof line?.bundleId === 'string' ? line.bundleId : '';
      if (!bundleById.has(bundleId)) return;
      const qty = Math.max(1, Math.min(MAX_QTY_PER_LINE, Math.floor(Number(line.qty) || 1)));
      bundleLines.set(bundleId, (bundleLines.get(bundleId) || 0) + qty);
      return;
    }

    const productId = typeof line?.productId === 'string' ? line.productId : '';
    if (!productById.has(productId)) return;

    const qty = Math.max(1, Math.min(MAX_QTY_PER_LINE, Math.floor(Number(line.qty) || 1)));
    const discountPercent = Math.max(0, Math.min(100, Math.floor(Number(line.discountPercent) || 0)));
    const key = `${productId}::${discountPercent}`;
    productLines.set(key, {
      productId,
      discountPercent,
      qty: (productLines.get(key)?.qty || 0) + qty
    });
  });

  const normalizedProducts = Array.from(productLines.values()).map(line => ({
    type: 'product',
    productId: line.productId,
    discountPercent: line.discountPercent,
    qty: Math.min(line.qty, MAX_QTY_PER_LINE)
  }));
  const normalizedBundles = Array.from(bundleLines.entries()).map(([bundleId, qty]) => ({
    type: 'bundle',
    bundleId,
    qty: Math.min(qty, MAX_QTY_PER_LINE)
  }));

  return [...normalizedProducts, ...normalizedBundles];
}

function buildStripeCheckoutParams({ lineItems, orderMeta, customerInfo, dayCount, origin, promoApplied, expediteFeeCents, promoCouponId }) {
  const params = new URLSearchParams();

  params.set('mode', 'payment');
  params.set('customer_creation', 'always');
  params.set('success_url', `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`);
  params.set('cancel_url', `${origin}/summary?canceled=1`);
  if (promoCouponId) {
    params.set('discounts[0][coupon]', promoCouponId);
  } else {
    params.set('allow_promotion_codes', 'true');
  }
  params.set('metadata[start_date]', orderMeta.startDate);
  params.set('metadata[end_date]', orderMeta.endDate);
  params.set('metadata[location]', orderMeta.location);
  params.set('metadata[day_count]', String(dayCount));
  params.set('metadata[delivery_fee_cents]', String(DELIVERY_FEE_CENTS));
  params.set('metadata[expedite_fee_cents]', String(expediteFeeCents));
  params.set('metadata[customer_name]', metaValue(customerInfo.name));
  params.set('metadata[customer_email]', metaValue(customerInfo.email));
  params.set('metadata[customer_phone]', metaValue(customerInfo.phone));
  params.set('metadata[customer_address]', metaValue(customerInfo.address));
  params.set('metadata[customer_zipcode]', metaValue(customerInfo.zipcode));
  params.set('metadata[customer_state]', metaValue(customerInfo.state));
  params.set('metadata[arrival_date]', metaValue(customerInfo.arrivalDate));
  params.set('metadata[delivery_area]', metaValue(customerInfo.deliveryArea));
  params.set('metadata[referral_source]', metaValue(customerInfo.referralSource));
  params.set('metadata[customer_message]', metaValue(customerInfo.message));
  if (customerInfo.email) {
    params.set('customer_email', customerInfo.email);
  }
  params.set('metadata[promo_applied]', promoApplied ? 'true' : 'false');
  if (promoApplied) {
    params.set('metadata[promo_discount_percent]', String(DISCOUNT_PERCENT));
  }
  if (promoCouponId) {
    params.set('metadata[sun_soaked_savings_coupon]', promoCouponId);
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

  if (DELIVERY_FEE_CENTS > 0) {
    const deliveryIndex = lineItems.length;
    params.set(`line_items[${deliveryIndex}][quantity]`, '1');
    params.set(`line_items[${deliveryIndex}][price_data][currency]`, 'usd');
    params.set(`line_items[${deliveryIndex}][price_data][unit_amount]`, String(DELIVERY_FEE_CENTS));
    params.set(`line_items[${deliveryIndex}][price_data][product_data][name]`, 'Delivery fee');
    params.set(
      `line_items[${deliveryIndex}][price_data][product_data][description]`,
      'Flat delivery fee (not charged per rental day)'
    );
  }

  if (expediteFeeCents > 0) {
    const expediteIndex = lineItems.length + (DELIVERY_FEE_CENTS > 0 ? 1 : 0);
    params.set(`line_items[${expediteIndex}][quantity]`, '1');
    params.set(`line_items[${expediteIndex}][price_data][currency]`, 'usd');
    params.set(`line_items[${expediteIndex}][price_data][unit_amount]`, String(expediteFeeCents));
    params.set(`line_items[${expediteIndex}][price_data][product_data][name]`, 'Expedite fee');
    params.set(
      `line_items[${expediteIndex}][price_data][product_data][description]`,
      'Rush order fee for bookings starting within 24 hours'
    );
  }

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
  const customerInfoPayload = payload?.customerInfo || {};
  const customerInfo = {
    name: typeof customerInfoPayload.name === 'string' ? customerInfoPayload.name.trim() : '',
    email: typeof customerInfoPayload.email === 'string' ? customerInfoPayload.email.trim() : '',
    phone: typeof customerInfoPayload.phone === 'string' ? customerInfoPayload.phone.trim() : '',
    address: typeof customerInfoPayload.address === 'string' ? customerInfoPayload.address.trim() : '',
    zipcode: typeof customerInfoPayload.zipcode === 'string' ? customerInfoPayload.zipcode.trim() : '',
    state: typeof customerInfoPayload.state === 'string' ? customerInfoPayload.state.trim() : '',
    arrivalDate: typeof customerInfoPayload.arrivalDate === 'string' ? customerInfoPayload.arrivalDate.trim() : '',
    deliveryArea: typeof customerInfoPayload.deliveryArea === 'string' ? customerInfoPayload.deliveryArea.trim() : '',
    referralSource: typeof customerInfoPayload.referralSource === 'string' ? customerInfoPayload.referralSource.trim() : '',
    message: typeof customerInfoPayload.message === 'string' ? customerInfoPayload.message.trim() : ''
  };
  const enteredPromoCode = normalizePromoCode(payload?.promoCode);
  const expectedPromoCode = normalizePromoCode(
    process.env.CHECKOUT_PROMO_CODE || process.env.CHECKOUT_PROMO_CODE_99
  );
  const promoApplied = Boolean(
    enteredPromoCode &&
    expectedPromoCode &&
    enteredPromoCode === expectedPromoCode
  );

  const start = parseDateLocal(orderMeta.startDate);
  const end = parseDateLocal(orderMeta.endDate);
  const location = typeof orderMeta.location === 'string' ? orderMeta.location : '';
  if (!validLocations.has(location)) {
    return NextResponse.json(
      { error: 'Select Charleston or Myrtle Beach before checkout.' },
      { status: 400 }
    );
  }
  if (!start || !end || end < start) {
    return NextResponse.json(
      { error: 'Invalid rental dates. Please select a valid date range.' },
      { status: 400 }
    );
  }
  const validDeliveryAreas = new Set(['Charleston', 'Myrtle Beach']);

  if (
    !customerInfo.name ||
    !customerInfo.email ||
    !customerInfo.address ||
    !customerInfo.zipcode ||
    !customerInfo.state ||
    !customerInfo.deliveryArea
  ) {
    return NextResponse.json(
      { error: 'Name, email, delivery address, zip code, state, and city are required before checkout.' },
      { status: 400 }
    );
  }
  if (!validDeliveryAreas.has(customerInfo.deliveryArea)) {
    return NextResponse.json(
      { error: 'City must be Charleston or Myrtle Beach.' },
      { status: 400 }
    );
  }

  const cart = sanitizeCart(payload?.cart);
  if (!cart.length) {
    return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 });
  }

  const dayCount = getDayCount(orderMeta);
  const expediteFeeCents = isExpeditedOrder(orderMeta) ? EXPEDITE_FEE_CENTS : 0;
  const lineItems = cart.map(line => {
    if (line.type === 'bundle') {
      const bundle = bundleById.get(line.bundleId);
      if (!bundle) return null;
      const baseUnitAmountCents = Math.round(bundle.pricePerDay * dayCount * 100);
      if (baseUnitAmountCents <= 0) return null;
      const unitAmountCents = promoApplied
        ? Math.max(1, Math.round(baseUnitAmountCents * DISCOUNT_MULTIPLIER))
        : baseUnitAmountCents;

      return {
        productId: `bundle:${bundle.id}`,
        name: bundle.name,
        qty: line.qty,
        unitAmountCents,
        pricePerDayLabel: `$${bundle.pricePerDay.toFixed(2)}`
      };
    }

    const product = productById.get(line.productId);
    if (!product) return null;
    const baseUnitAmountCents = Math.round(product.pricePerDay * dayCount * 100);
    if (baseUnitAmountCents <= 0) return null;
    const productDiscountMultiplier = (100 - line.discountPercent) / 100;
    const discountedForProductCents = Math.max(1, Math.round(baseUnitAmountCents * productDiscountMultiplier));
    const unitAmountCents = promoApplied
      ? Math.max(1, Math.round(discountedForProductCents * DISCOUNT_MULTIPLIER))
      : discountedForProductCents;
    const pricePerDayLabel = `$${(product.pricePerDay * productDiscountMultiplier).toFixed(2)}`;

    return {
      productId: product.id,
      name: product.name,
      qty: line.qty,
      unitAmountCents,
      pricePerDayLabel
    };
  }).filter(Boolean);

  if (!lineItems.length) {
    return NextResponse.json(
      { error: 'Cart only contains free items. Add at least one paid item to checkout.' },
      { status: 400 }
    );
  }

  // Sun-Soaked Savings: automatic tiered discount based on rental subtotal
  const rentalSubtotalCents = lineItems.reduce((sum, item) => sum + item.unitAmountCents * item.qty, 0);
  const promoDiscountDollars = getPromoDiscount(rentalSubtotalCents / 100);
  let promoCouponId = null;
  if (promoDiscountDollars > 0) {
    try {
      const couponParams = new URLSearchParams();
      couponParams.set('amount_off', String(promoDiscountDollars * 100));
      couponParams.set('currency', 'usd');
      couponParams.set('duration', 'once');
      const couponRes = await fetch('https://api.stripe.com/v1/coupons', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: couponParams.toString(),
        cache: 'no-store'
      });
      if (couponRes.ok) {
        const couponJson = await couponRes.json();
        promoCouponId = couponJson.id || null;
      }
    } catch {
      // If coupon creation fails, proceed without the discount rather than blocking checkout
    }
  }

  const origin = request.headers.get('origin') || request.nextUrl.origin;
  const params = buildStripeCheckoutParams({
    lineItems,
    orderMeta: { ...orderMeta, location },
    customerInfo,
    dayCount,
    origin,
    promoApplied,
    expediteFeeCents,
    promoCouponId
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
