'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import RentalsShell from '@/components/RentalsShell';
import styles from '@/app/checkout/success/page.module.css';
import { useStore } from '@/context/StoreContext';

export default function CheckoutSuccessPage() {
  const { ready, clearCart } = useStore();
  const hasClearedCart = useRef(false);

  useEffect(() => {
    if (!ready || hasClearedCart.current) return;
    clearCart();
    hasClearedCart.current = true;
  }, [ready, clearCart]);

  return (
    <RentalsShell>
      <main>
        <section className={`${styles.card} card`}>
          <h1>Payment complete</h1>
          <p>Stripe confirmed your payment. Your cart has been cleared.</p>
          <div className={styles.actions}>
            <Link href="/category/baby" className="btn btnPrimary">Start a New Rental</Link>
            <Link href="/" className="btn btnSecondary">Back to Home</Link>
          </div>
        </section>
      </main>
    </RentalsShell>
  );
}
