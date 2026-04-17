'use client';

import { useEffect, useState } from 'react';
import RentalsShell from '@/components/RentalsShell';
import styles from '@/app/summary/page.module.css';
import { useStore } from '@/context/StoreContext';
import { formatMoney, getBundleBasePricePerDay, getBundleById, getDayCount, getDeliveryFee, getExpediteFee, getProductById, getPromoDiscount, isExpeditedOrder } from '@/lib/cart';
import { locations } from '@/lib/data';
import { withBasePath } from '@/lib/paths';

function TermsModal({ onClose }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>QuickChoice Rentals — Terms of Service</h2>
          <button className={styles.modalClose} onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className={styles.modalBody}>
          <p className={styles.tosDate}>Last updated: April 2025</p>

          <h3>1. Rental Agreement</h3>
          <p>By placing an order with QuickChoice Rentals ("Company"), you ("Renter") agree to the terms set forth in this agreement. This agreement is entered into at the time of payment and covers all items included in your rental order.</p>

          <h3>2. Equipment Use</h3>
          <p>All rental equipment must be used in a manner consistent with its intended purpose and kept within the agreed delivery address. Equipment may not be transferred, sublet, or loaned to third parties.</p>

          <h3>3. Damage &amp; Loss Liability</h3>
          <p>The Renter is <strong>financially responsible</strong> for any damage, loss, theft, or destruction of rental equipment during the rental period. The Company will assess the cost of repair or full replacement value for any damaged or lost items. The assessed amount will be communicated to the Renter via the email address provided at checkout. By accepting these terms, you agree to pay all assessed damage or replacement costs promptly upon notification.</p>

          <h3>4. Delivery &amp; Pickup</h3>
          <p>Equipment will be delivered to and picked up from the address provided at checkout on the dates selected. The Renter is responsible for ensuring that all equipment is accessible and available at the agreed pickup time. Failure to make equipment available for scheduled pickup may result in additional fees.</p>

          <h3>5. Cleanliness</h3>
          <p>All rental equipment is delivered clean and sanitized. Equipment returned in an excessively soiled or unsanitary condition may be subject to a cleaning fee at the Company's discretion.</p>

          <h3>6. Cancellations &amp; Refunds</h3>
          <p>Cancellation requests and refund eligibility are handled on a case-by-case basis. Please contact us as soon as possible if you need to modify or cancel your order. Refunds for cancellations made less than 24 hours before the delivery date may not be issued.</p>

          <h3>7. Indemnification</h3>
          <p>The Renter agrees to hold QuickChoice Rentals, its owners, employees, and agents harmless from any and all claims, damages, losses, or injuries arising from the use of rental equipment during the rental period.</p>

          <h3>8. Governing Law</h3>
          <p>This agreement is governed by the laws of the State of South Carolina. Any disputes arising under this agreement shall be subject to the exclusive jurisdiction of the courts of South Carolina.</p>

          <h3>9. Acceptance</h3>
          <p>By checking the acceptance box at checkout, you confirm that you have read, understood, and agree to these Terms of Service. Your acceptance is recorded with a timestamp and IP address for the protection of both parties.</p>
        </div>
        <div className={styles.modalFooter}>
          <button className="btn btnPrimary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default function SummaryPage() {
  const { cart, orderMeta, subtotal } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [wasCanceled, setWasCanceled] = useState(false);
  const [tosAccepted, setTosAccepted] = useState(false);
  const [tosModalOpen, setTosModalOpen] = useState(false);
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
  const promoDiscount = getPromoDiscount(subtotal);
  const totalWithFees = subtotal + deliveryFee + expediteFee - promoDiscount;
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
    if (!tosAccepted) {
      setError('Please read and accept the Terms of Service before continuing.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(withBasePath('/api/checkout-session'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, orderMeta, customerInfo, tosAcceptedAt: new Date().toISOString() })
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
          {promoDiscount > 0 && (
            <div className={`${styles.subtotal} ${styles.promoRow}`}>
              <span>Sun-Soaked Savings discount</span>
              <strong className={styles.promoAmount}>-{formatMoney(promoDiscount)}</strong>
            </div>
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
          <div className={styles.tosBox}>
            <p className={styles.tosBoxTitle}>⚠ Required before checkout</p>
            <label className={styles.tosCheckboxRow}>
              <input
                type="checkbox"
                className={styles.tosCheckbox}
                checked={tosAccepted}
                onChange={e => setTosAccepted(e.target.checked)}
              />
              <span>
                I have read and agree to the QuickChoice Rentals{' '}
                <button type="button" className={styles.tosLink} onClick={() => setTosModalOpen(true)}>
                  Terms of Service
                </button>
                . I understand I am financially responsible for any damage or loss during my rental period.
              </span>
            </label>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="button" className="btn btnPrimary" onClick={onPayNow} disabled={isSubmitting || !tosAccepted}>
            {isSubmitting ? 'Redirecting...' : 'Pay Now'}
          </button>
        </section>
      </main>
      {tosModalOpen && <TermsModal onClose={() => setTosModalOpen(false)} />}
    </RentalsShell>
  );
}
