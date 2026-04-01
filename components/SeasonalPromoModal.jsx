'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from '@/components/SeasonalPromoModal.module.css';
import { BASE_PATH, withBasePath } from '@/lib/paths';

const SESSION_KEY = 'qc_spring_promo_seen';
const SHOPPING_ROUTES = ['/category', '/product', '/bundle', '/checkout', '/summary', '/empty-cart'];

function normalizePathname(pathname) {
  if (!pathname) return '/';
  if (BASE_PATH && pathname.startsWith(BASE_PATH)) {
    const nextPath = pathname.slice(BASE_PATH.length);
    return nextPath || '/';
  }
  return pathname;
}

export default function SeasonalPromoModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = useMemo(() => normalizePathname(pathname), [pathname]);

  const shouldShow = useMemo(() => {
    return SHOPPING_ROUTES.some(route => currentPath === route || currentPath.startsWith(`${route}/`));
  }, [currentPath]);

  useEffect(() => {
    if (!shouldShow || typeof window === 'undefined') return;
    if (window.sessionStorage.getItem(SESSION_KEY) === '1') return;
    setIsOpen(true);
  }, [shouldShow]);

  function closeModal() {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(SESSION_KEY, '1');
    }
  }

  if (!shouldShow || !isOpen) return null;

  return (
    <div className={styles.overlay} role="presentation" onClick={closeModal}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="seasonal-promo-title"
        onClick={event => event.stopPropagation()}
      >
        <button type="button" className={styles.close} aria-label="Close promo" onClick={closeModal}>
          ×
        </button>

        <div
          className={styles.art}
          style={{ '--promo-bg': `url(${withBasePath('/rentals/visual/BACKGROUND.png')})` }}
        >
          <p className={styles.eyebrow}>Sun-soaked savings</p>
          <h2 id="seasonal-promo-title">Beach days, lighter totals.</h2>
          <p className={styles.copy}>
            Vacation-ready rentals with a breezy little bonus for bigger orders.
          </p>

          <div className={styles.deals}>
            <p><strong>$20 off</strong> orders over $295</p>
            <p><strong>$30 off</strong> orders over $395</p>
            <p><strong>$40 off</strong> orders over $495</p>
            <p><strong>$50 off</strong> orders over $595</p>
          </div>

          <button type="button" className={`btn btnSecondary ${styles.cta}`} onClick={closeModal}>
            Shop now
          </button>

          <p className={styles.finePrint}>
            One coupon per order. Online orders only. Valid while the promotion is active.
          </p>
        </div>
      </section>
    </div>
  );
}
