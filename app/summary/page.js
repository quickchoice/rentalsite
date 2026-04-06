'use client';

import { useEffect, useState } from 'react';
import RentalsShell from '@/components/RentalsShell';
import styles from '@/app/summary/page.module.css';
import { useStore } from '@/context/StoreContext';
import { formatMoney, getBundleBasePricePerDay, getBundleById, getDayCount, getDeliveryFee, getExpediteFee, getProductById, isExpeditedOrder } from '@/lib/cart';
import { locations } from '@/lib/data';
import { withBasePath } from '@/lib/paths';

export default function SummaryPage() {
  const { cart, orderMeta, subtotal } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [wasCanceled, setWasCanceled] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    zipcode: '',
    state: '',
    arrivalDate: '',
    deliveryArea: '',
    referralSource: '',
    message: ''
  });
  const days = getDayCount(orderMeta);
  const deliveryFee = getDeliveryFee(cart);
  const expediteFee = getExpediteFee(orderMeta);
  const totalWithFees = subtotal + deliveryFee + expediteFee;
  const isRushOrder = isExpeditedOrder(orderMeta);
  const locationName = locations.find(location => location.id === orderMeta.location)?.name || 'Not selected';
  const deliveryAreas = [
    'Charleston',
    'Myrtle Beach'
  ];
  const referralSources = [
    'Google Search',
    'Instagram',
    'Facebook',
    'Vacation Rental Host',
    'Friend / Family',
    'Returning Customer'
  ];

  useEffect(() => {
    const canceled = new URLSearchParams(window.location.search).get('canceled') === '1';
    setWasCanceled(canceled);
  }, []);

  async function onPayNow() {
    if (!orderMeta.startDate || !orderMeta.endDate) {
      setError('Please add trip dates before paying.');
      return;
    }
    if (!orderMeta.location) {
      setError('Please select Charleston or Myrtle Beach before paying.');
      return;
    }
    if (!cart.length) {
      setError('Your cart is empty.');
      return;
    }
    if (
      !customerInfo.name.trim() ||
      !customerInfo.email.trim() ||
      !customerInfo.address.trim() ||
      !customerInfo.zipcode.trim() ||
      !customerInfo.state.trim() ||
      !customerInfo.deliveryArea.trim()
    ) {
      setError('Please complete all required contact, delivery address, and city fields.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(withBasePath('/api/checkout-session'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, orderMeta, customerInfo })
      });
      const contentType = response.headers.get('content-type') || '';
      let data = null;
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const rawText = await response.text();
        const looksLikeHtml = rawText.trimStart().startsWith('<');
        if (looksLikeHtml) {
          throw new Error('Checkout is unavailable on this preview site. Please use the live production checkout.');
        }
        throw new Error('Checkout service returned an unexpected response.');
      }
      if (!response.ok || !data?.url) {
        throw new Error(data?.error || 'Could not start checkout.');
      }

      window.location.assign(data.url);
    } catch (checkoutError) {
      setError(checkoutError.message || 'Could not start checkout.');
      setIsSubmitting(false);
    }
  }

  return (
    <RentalsShell>
      <main>
        <section className={`${styles.card} card`}>
          <h1>Order Summary</h1>
          <p className="muted">Service area: {locationName}</p>
          <p className="muted">Dates selected: {orderMeta.startDate && orderMeta.endDate ? `${orderMeta.startDate} → ${orderMeta.endDate}` : '—'}</p>
          {wasCanceled && <p className={styles.notice}>Checkout was canceled. Your cart is still saved.</p>}

          <div className={styles.lines}>
            {!cart.length && <p className="muted">Your cart is empty.</p>}
            {cart.map((line, index) => {
              if (line.type === 'bundle') {
                const bundle = getBundleById(line.bundleId);
                if (!bundle) return null;
                const bundleBasePrice = getBundleBasePricePerDay(bundle);
                const lineTotal = bundle.pricePerDay * line.qty * days;
                return (
                  <div key={`bundle-${line.bundleId}-${index}`} className={styles.line}>
                    <div>
                      <strong>{bundle.name}</strong>
                      <p className="muted">
                        <span className={styles.oldPrice}>{formatMoney(bundleBasePrice)}/day</span>{' '}
                        {formatMoney(bundle.pricePerDay)}/day × {line.qty} × {days} day(s){' '}
                        <span className={styles.discountLabel}>Bundle {bundle.discountPercent || 10}% off</span>
                      </p>
                    </div>
                    <strong>{formatMoney(lineTotal)}</strong>
                  </div>
                );
              }

              const product = getProductById(line.productId);
              if (!product) return null;
              const discountPercent = line.discountPercent || 0;
              const discountedPricePerDay = product.pricePerDay * ((100 - discountPercent) / 100);
              const lineTotal = discountedPricePerDay * line.qty * days;
              const lineKey = `${line.productId}-${discountPercent}-${index}`;
              return (
                <div key={lineKey} className={styles.line}>
                  <div>
                    <strong>{product.name}</strong>
                    <p className="muted">
                      {discountPercent > 0 ? (
                        <>
                          <span className={styles.oldPrice}>{formatMoney(product.pricePerDay)}/day</span>{' '}
                          {formatMoney(discountedPricePerDay)}/day × {line.qty} × {days} day(s){' '}
                          <span className={styles.discountLabel}>Bundle {discountPercent}% off</span>
                        </>
                      ) : (
                        <>{formatMoney(product.pricePerDay)}/day × {line.qty} × {days} day(s)</>
                      )}
                    </p>
                  </div>
                  <strong>{formatMoney(lineTotal)}</strong>
                </div>
              );
            })}
          </div>

          <div className={styles.subtotal}><span>Rental subtotal</span><strong>{formatMoney(subtotal)}</strong></div>
          <div className={styles.subtotal}><span>Flat delivery fee</span><strong>{formatMoney(deliveryFee)}</strong></div>
          {isRushOrder && (
            <div className={styles.subtotal}><span>Expedite fee</span><strong>{formatMoney(expediteFee)}</strong></div>
          )}
          <div className={styles.subtotal}><span>Total</span><strong>{formatMoney(totalWithFees)}</strong></div>
          <div className={styles.contactBlock}>
            <h2>Contact Info</h2>
            <div className={styles.contactGrid}>
              <label>
                Your Name (required)
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={event => setCustomerInfo(prev => ({ ...prev, name: event.target.value }))}
                  required
                />
              </label>
              <label>
                Your Email (required)
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={event => setCustomerInfo(prev => ({ ...prev, email: event.target.value }))}
                  required
                />
              </label>
              <label>
                Cell Phone
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={event => setCustomerInfo(prev => ({ ...prev, phone: event.target.value }))}
                />
              </label>
              <label>
                Delivery Address (required)
                <input
                  type="text"
                  value={customerInfo.address}
                  onChange={event => setCustomerInfo(prev => ({ ...prev, address: event.target.value }))}
                  placeholder="Hotel, condo, or home delivery address"
                  required
                />
              </label>
              <label>
                Zip Code (required)
                <input
                  type="text"
                  inputMode="numeric"
                  value={customerInfo.zipcode}
                  onChange={event => setCustomerInfo(prev => ({ ...prev, zipcode: event.target.value }))}
                  required
                />
              </label>
              <label>
                State (required)
                <input
                  type="text"
                  value={customerInfo.state}
                  onChange={event => setCustomerInfo(prev => ({ ...prev, state: event.target.value }))}
                  required
                />
              </label>
              <label>
                Arrival Date
                <input
                  type="date"
                  value={customerInfo.arrivalDate}
                  onChange={event => setCustomerInfo(prev => ({ ...prev, arrivalDate: event.target.value }))}
                />
              </label>
              <label>
                City (required)
                <select
                  value={customerInfo.deliveryArea}
                  onChange={event => setCustomerInfo(prev => ({ ...prev, deliveryArea: event.target.value }))}
                  required
                >
                  <option value="">—Please choose an option—</option>
                  {deliveryAreas.map(area => <option key={area} value={area}>{area}</option>)}
                </select>
              </label>
              <label>
                How did you hear about us?
                <select
                  value={customerInfo.referralSource}
                  onChange={event => setCustomerInfo(prev => ({ ...prev, referralSource: event.target.value }))}
                >
                  <option value="">—Please choose an option—</option>
                  {referralSources.map(source => <option key={source} value={source}>{source}</option>)}
                </select>
              </label>
              <label className={styles.messageField}>
                Your Message
                <textarea
                  rows={4}
                  value={customerInfo.message}
                  onChange={event => setCustomerInfo(prev => ({ ...prev, message: event.target.value }))}
                />
              </label>
            </div>
          </div>
          <p className="muted">
            Secure checkout is handled by Stripe. A flat {formatMoney(deliveryFee)} delivery fee is included
            {isRushOrder ? `, plus a ${formatMoney(expediteFee)} expedite fee for orders within 24 hours.` : '.'}
          </p>
          <p className={styles.disclaimer}>
            Renters are responsible for replacing any products that are damaged or broken during their rental.
          </p>
          {error && <p className={styles.error}>{error}</p>}
          <button type="button" className="btn btnPrimary" onClick={onPayNow} disabled={isSubmitting}>
            {isSubmitting ? 'Redirecting...' : 'Pay Now'}
          </button>
        </section>
      </main>
    </RentalsShell>
  );
}
