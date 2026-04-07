'use client';

import { Suspense, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import RentalsShell from '@/components/RentalsShell';
import styles from '@/app/checkout/success/page.module.css';
import { useStore } from '@/context/StoreContext';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const { ready, clearCart } = useStore();
  const hasClearedCart = useRef(false);
  const hasTrackedConversion = useRef(false);

  useEffect(() => {
    if (!ready || hasClearedCart.current) return;
    clearCart();
    hasClearedCart.current = true;
  }, [ready, clearCart]);

  useEffect(() => {
    if (hasTrackedConversion.current) return;
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

    window.gtag('event', 'conversion', {
      send_to: 'AW-18041825199/fQh6CKSqp5AcEK_PgZtD',
      transaction_id: searchParams.get('session_id') || ''
    });

    hasTrackedConversion.current = true;
  }, [searchParams]);

  return (
    <section className={`${styles.card} card`}>
      <h1>Payment complete</h1>
      <p>Stripe confirmed your payment. Your cart has been cleared.</p>
      <div className={styles.actions}>
        <Link href="/category/baby" className="btn btnPrimary">Start a New Rental</Link>
        <Link href="/" className="btn btnSecondary">Back to Home</Link>
      </div>
    </section>
  );
}

function CheckoutSuccessFallback() {
  return (
    <section className={`${styles.card} card`}>
      <h1>Payment complete</h1>
      <p>Finalizing your confirmation details.</p>
      <div className={styles.actions}>
        <Link href="/category/baby" className="btn btnPrimary">Start a New Rental</Link>
        <Link href="/" className="btn btnSecondary">Back to Home</Link>
      </div>
    </section>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <RentalsShell>
      <main>
        <Suspense fallback={<CheckoutSuccessFallback />}>
          <CheckoutSuccessContent />
        </Suspense>
      </main>
    </RentalsShell>
  );
}
