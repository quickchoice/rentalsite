'use client';

import RentalsShell from '@/components/RentalsShell';
import styles from '@/app/summary/page.module.css';
import { useStore } from '@/context/StoreContext';
import { formatMoney, getDayCount, getProductById } from '@/lib/cart';

export default function SummaryPage() {
  const { cart, orderMeta, subtotal } = useStore();
  const days = getDayCount(orderMeta);

  function onPayNow() {
    if (!orderMeta.startDate || !orderMeta.endDate) {
      alert('Please add trip dates before paying.');
      return;
    }
    if (!cart.length) {
      alert('Your cart is empty.');
      return;
    }
    alert('Stripe checkout stub. Connect your backend endpoint here.');
  }

  return (
    <RentalsShell>
      <main>
        <section className={`${styles.card} card`}>
          <h1>Order Summary</h1>
          <p className="muted">Dates selected: {orderMeta.startDate && orderMeta.endDate ? `${orderMeta.startDate} → ${orderMeta.endDate}` : '—'}</p>

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
          <p className="muted">Payment handled securely by Stripe once backend checkout session is connected.</p>
          <button type="button" className="btn btnPrimary" onClick={onPayNow}>Pay Now</button>
        </section>
      </main>
    </RentalsShell>
  );
}
