'use client';

import { useEffect, useState } from 'react';
import RentalsShell from '@/components/RentalsShell';
import styles from '@/app/summary/page.module.css';
import { useStore } from '@/context/StoreContext';
import { formatMoney, getDayCount, getProductById } from '@/lib/cart';
import { withBasePath } from '@/lib/paths';

export default function SummaryPage() {
  const { cart, orderMeta, subtotal } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [wasCanceled, setWasCanceled] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const days = getDayCount(orderMeta);

  useEffect(() => {
    const canceled = new URLSearchParams(window.location.search).get('canceled') === '1';
    setWasCanceled(canceled);
  }, []);

  async function onPayNow() {
    if (!orderMeta.startDate || !orderMeta.endDate) {
      setError('Please add trip dates before paying.');
      return;
    }
    if (!cart.length) {
      setError('Your cart is empty.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(withBasePath('/api/checkout-session'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, orderMeta, promoCode })
      });

      const data = await response.json();
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
          <p className="muted">Dates selected: {orderMeta.startDate && orderMeta.endDate ? `${orderMeta.startDate} → ${orderMeta.endDate}` : '—'}</p>
          {wasCanceled && <p className={styles.notice}>Checkout was canceled. Your cart is still saved.</p>}

          <div className={styles.lines}>
            {!cart.length && <p className="muted">Your cart is empty.</p>}
            {cart.map(line => {
              const product = getProductById(line.productId);
              if (!product) return null;
              const lineTotal = product.pricePerDay * line.qty * days;
              return (
                <div key={line.productId} className={styles.line}>
                  <div>
                    <strong>{product.name}</strong>
                    <p className="muted">{formatMoney(product.pricePerDay)}/day × {line.qty} × {days} day(s)</p>
                  </div>
                  <strong>{formatMoney(lineTotal)}</strong>
                </div>
              );
            })}
          </div>

          <div className={styles.subtotal}><span>Subtotal</span><strong>{formatMoney(subtotal)}</strong></div>
          <label className={styles.promoField}>
            Promo code (optional)
            <input
              type="text"
              value={promoCode}
              onChange={event => setPromoCode(event.target.value)}
              placeholder="Enter promo code"
              autoComplete="off"
            />
          </label>
          <p className="muted">Secure checkout is handled by Stripe.</p>
          {error && <p className={styles.error}>{error}</p>}
          <button type="button" className="btn btnPrimary" onClick={onPayNow} disabled={isSubmitting}>
            {isSubmitting ? 'Redirecting...' : 'Pay Now'}
          </button>
        </section>
      </main>
    </RentalsShell>
  );
}
