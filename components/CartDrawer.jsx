'use client';

import Link from 'next/link';
import styles from '@/components/CartDrawer.module.css';
import { useStore } from '@/context/StoreContext';
import { formatMoney, getDayCount, getProductById } from '@/lib/cart';
import { locations } from '@/lib/data';

export default function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    cart,
    subtotal,
    orderMeta,
    setOrderMeta,
    setLocation,
    updateQty,
    removeFromCart
  } = useStore();

  const dayCount = getDayCount(orderMeta);
  const hasSelectedDates = Boolean(orderMeta.startDate && orderMeta.endDate);
  const hasSelectedLocation = Boolean(orderMeta.location);
  const needsDates = cart.length > 0 && !hasSelectedDates;
  const needsLocation = cart.length > 0 && !hasSelectedLocation;
  const cannotCheckout = needsDates || needsLocation;
  const checkoutHref = cart.length ? (hasSelectedDates && hasSelectedLocation ? '/summary' : '#') : '/empty-cart';
  const dateLabel = orderMeta.startDate && orderMeta.endDate ? `${orderMeta.startDate} → ${orderMeta.endDate} (${dayCount} days)` : '—';

  const dailySubtotal = cart.reduce((sum, line) => {
    const product = getProductById(line.productId);
    if (!product) return sum;
    return sum + product.pricePerDay * line.qty;
  }, 0);

  function onStartDateChange(value) {
    const next = { ...orderMeta, startDate: value };
    if (next.endDate && next.endDate < value) {
      next.endDate = value;
    }
    setOrderMeta(next);
  }

  function onEndDateChange(value) {
    const next = { ...orderMeta, endDate: value };
    if (value && next.startDate && value < next.startDate) {
      next.endDate = next.startDate;
    }
    setOrderMeta(next);
  }

  return (
    <>
      <aside className={`${styles.drawer} ${cartOpen ? styles.open : ''}`}>
        <div className={styles.topRow}>
          <h3>Your Cart</h3>
          <button type="button" onClick={() => setCartOpen(false)} className={styles.close}>×</button>
        </div>

        <div className={styles.lines}>
          {!cart.length && <p className={styles.muted}>Your cart is empty.</p>}
          {cart.map(line => {
            const product = getProductById(line.productId);
            if (!product) return null;
            return (
              <div key={line.productId} className={styles.line}>
                <div className={styles.itemMain}>
                  <img src={product.imageUrl} alt={product.name} className={styles.thumb} />
                  <div>
                    <strong>{product.name}</strong>
                    <p className={styles.muted}>{formatMoney(product.pricePerDay)}/day</p>
                  </div>
                </div>
                <div className={styles.actions}>
                  <button type="button" onClick={() => updateQty(line.productId, -1)}>-</button>
                  <span>{line.qty}</span>
                  <button type="button" onClick={() => updateQty(line.productId, 1)}>+</button>
                  <button type="button" onClick={() => removeFromCart(line.productId)}>Remove</button>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.meta}>
          <strong>Service Area</strong>
          <div className={styles.locationRow}>
            {locations.map(location => (
              <button
                key={location.id}
                type="button"
                className={`${styles.locationBtn} ${orderMeta.location === location.id ? styles.locationBtnActive : ''}`}
                onClick={() => setLocation(location.id)}
              >
                {location.name}
              </button>
            ))}
          </div>

          <strong>Trip Dates</strong>
          <div className={styles.dateFields}>
            <label>
              Start
              <input type="date" value={orderMeta.startDate} onChange={event => onStartDateChange(event.target.value)} />
            </label>
            <label>
              End
              <input type="date" value={orderMeta.endDate} min={orderMeta.startDate || undefined} onChange={event => onEndDateChange(event.target.value)} />
            </label>
          </div>
          <span>{dateLabel}</span>
        </div>

        <div className={styles.footer}>
          <div className={styles.subtotal}><span>Per-day subtotal</span><strong>{formatMoney(dailySubtotal)}</strong></div>
          <div className={styles.subtotal}><span>Trip total</span><strong>{formatMoney(subtotal)}</strong></div>
          <Link
            href={checkoutHref}
            className={`${styles.checkout} ${cannotCheckout ? styles.checkoutDisabled : ''}`}
            aria-disabled={cannotCheckout}
            onClick={event => {
              if (cannotCheckout) {
                event.preventDefault();
                return;
              }
              setCartOpen(false);
            }}
          >
            Checkout
          </Link>
          {cannotCheckout && (
            <p className={styles.checkoutHint}>
              {needsLocation && needsDates
                ? 'Select Charleston or Myrtle Beach, then choose trip dates.'
                : needsLocation
                ? 'Select Charleston or Myrtle Beach.'
                : 'Select start and end dates to continue.'}
            </p>
          )}
        </div>
      </aside>

      <button className={`${styles.backdrop} ${cartOpen ? styles.backdropOpen : ''}`} onClick={() => setCartOpen(false)} aria-label="Close cart" />
    </>
  );
}
