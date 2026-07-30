'use client';

import Link from 'next/link';
import styles from '@/components/CartDrawer.module.css';
import { useStore } from '@/context/StoreContext';
import { formatMoney, getBundleBasePricePerDay, getBundleById, getBundleTier, getDayCount, getDeliveryFee, getExpediteFee, getProductById, getPromoDiscount, isExpeditedOrder } from '@/lib/cart';
import { locations, products } from '@/lib/data';

const BEACH_PICKS = ['beach-chair-umbrella', 'beach-umbrella', 'beach-wagon', 'beach-tent', 'beach-cooler', 'beach-recliner'];
const BABY_PICKS  = ['baby-cribs', 'baby-pack-n-play', 'baby-single-jogging-stroller', 'baby-noise-machine', 'baby-high-chair-tray'];

function getSuggestions(cart) {
  const inCart = new Set(cart.map(l => l.productId).filter(Boolean));
  const cats = new Set(cart.map(l => {
    if (l.type === 'bundle') return getBundleById(l.bundleId)?.categoryId;
    return getProductById(l.productId)?.categoryId;
  }).filter(Boolean));

  let pool = [];
  if (cats.has('beach') && cats.has('baby')) {
    pool = [...BEACH_PICKS, ...BABY_PICKS];
  } else if (cats.has('beach')) {
    pool = [...BEACH_PICKS, ...BABY_PICKS];
  } else if (cats.has('baby')) {
    pool = [...BABY_PICKS, ...BEACH_PICKS];
  } else {
    pool = [...BABY_PICKS, ...BEACH_PICKS];
  }

  return pool
    .filter(id => !inCart.has(id))
    .slice(0, 3)
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);
}

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
    removeFromCart,
    addToCart
  } = useStore();

  const suggestions = cart.length ? getSuggestions(cart) : [];

  const dayCount = getDayCount(orderMeta);
  const hasSelectedDates = Boolean(orderMeta.startDate && orderMeta.endDate);
  const hasSelectedLocation = Boolean(orderMeta.location);
  const needsDates = cart.length > 0 && !hasSelectedDates;
  const needsLocation = cart.length > 0 && !hasSelectedLocation;
  const cannotCheckout = needsDates || needsLocation;
  const checkoutHref = cart.length ? (hasSelectedDates && hasSelectedLocation ? '/summary' : '#') : '/empty-cart';
  const dateLabel = orderMeta.startDate && orderMeta.endDate ? `${orderMeta.startDate} → ${orderMeta.endDate} (${dayCount} days)` : '—';

  const dailySubtotal = cart.reduce((sum, line) => {
    if (line.type === 'bundle' && line.bundleId) {
      const bundle = getBundleById(line.bundleId);
      if (!bundle) return sum;
      return sum + bundle.pricePerDay * line.qty;
    }
    const product = getProductById(line.productId);
    if (!product) return sum;
    const discountMultiplier = (100 - (line.discountPercent || 0)) / 100;
    return sum + product.pricePerDay * discountMultiplier * line.qty;
  }, 0);
  const deliveryFee = getDeliveryFee(cart);
  const expediteFee = getExpediteFee(orderMeta);
  const promoDiscount = getPromoDiscount(subtotal);
  const bundleTier = getBundleTier(cart);
  const bundleDiscount = bundleTier ? Math.round(subtotal * bundleTier.discountPercent) / 100 : 0;
  const totalWithFees = subtotal + deliveryFee + expediteFee - promoDiscount - bundleDiscount;
  const isRushOrder = isExpeditedOrder(orderMeta);

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
            if (line.type === 'bundle') {
              const bundle = getBundleById(line.bundleId);
              if (!bundle) return null;
              const basePrice = getBundleBasePricePerDay(bundle);
              const bundleDiscountPercent = bundle.discountPercent || 0;

              return (
                <div key={`bundle-${line.bundleId}`} className={styles.line}>
                  <div className={styles.itemMain}>
                    <img src={bundle.imageUrl} alt={bundle.name} className={styles.thumb} />
                    <div>
                      <strong>{bundle.name}</strong>
                      <p className={styles.muted}>
                        <span className={styles.oldPrice}>{formatMoney(basePrice)}/day</span>{' '}
                        <span>{formatMoney(bundle.pricePerDay)}/day</span>{' '}
                        <span className={styles.discountLabel}>Bundle {bundleDiscountPercent}% off</span>
                      </p>
                    </div>
                  </div>
                  <div className={styles.actions}>
                    <button type="button" onClick={() => updateQty({ type: 'bundle', bundleId: line.bundleId }, -1)}>-</button>
                    <span>{line.qty}</span>
                    <button type="button" onClick={() => updateQty({ type: 'bundle', bundleId: line.bundleId }, 1)}>+</button>
                    <button type="button" onClick={() => removeFromCart({ type: 'bundle', bundleId: line.bundleId })}>Remove</button>
                  </div>
                </div>
              );
            }

            const product = getProductById(line.productId);
            if (!product) return null;
            const discountPercent = line.discountPercent || 0;
            const discountedPricePerDay = product.pricePerDay * ((100 - discountPercent) / 100);
            const lineKey = `${line.productId}-${discountPercent}`;
            return (
              <div key={lineKey} className={styles.line}>
                <div className={styles.itemMain}>
                  <img src={product.imageUrl} alt={product.name} className={styles.thumb} />
                  <div>
                    <strong>{product.name}</strong>
                    <p className={styles.muted}>
                      {discountPercent > 0 ? (
                        <>
                          <span className={styles.oldPrice}>{formatMoney(product.pricePerDay)}/day</span>{' '}
                          <span>{formatMoney(discountedPricePerDay)}/day</span>{' '}
                          <span className={styles.discountLabel}>Bundle {discountPercent}% off</span>
                        </>
                      ) : (
                        <>{formatMoney(product.pricePerDay)}/day</>
                      )}
                    </p>
                  </div>
                </div>
                <div className={styles.actions}>
                  <button type="button" onClick={() => updateQty({ type: 'product', productId: line.productId, discountPercent }, -1)}>-</button>
                  <span>{line.qty}</span>
                  <button type="button" onClick={() => updateQty({ type: 'product', productId: line.productId, discountPercent }, 1)}>+</button>
                  <button type="button" onClick={() => removeFromCart({ type: 'product', productId: line.productId, discountPercent })}>Remove</button>
                </div>
              </div>
            );
          })}
        </div>

        {suggestions.length > 0 && (
          <div className={styles.suggestions}>
            <p className={styles.suggestLabel}>You might also like</p>
            {suggestions.map(product => (
              <div key={product.id} className={styles.suggestLine}>
                <img src={product.imageUrl} alt={product.name} className={styles.suggestThumb} />
                <div className={styles.suggestInfo}>
                  <span className={styles.suggestName}>{product.name}</span>
                  <span className={styles.suggestPrice}>{formatMoney(product.pricePerDay)}/day</span>
                </div>
                <button
                  type="button"
                  className={styles.suggestAdd}
                  onClick={() => addToCart(product.id, 1)}
                  aria-label={`Add ${product.name} to cart`}
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        )}

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
          <div className={styles.subtotal}><span>Trip subtotal</span><strong>{formatMoney(subtotal)}</strong></div>
          <div className={styles.subtotal}><span>Flat delivery / pickup fee</span><strong>{formatMoney(deliveryFee)}</strong></div>
          {isRushOrder && (
            <div className={styles.subtotal}><span>Expedite fee</span><strong>{formatMoney(expediteFee)}</strong></div>
          )}
          {bundleDiscount > 0 && (
            <div className={`${styles.subtotal} ${styles.bundleRow}`}>
              <span>Bundle savings ({bundleTier.discountPercent}% off)</span>
              <strong className={styles.bundleAmount}>-{formatMoney(bundleDiscount)}</strong>
            </div>
          )}
          {promoDiscount > 0 && (
            <div className={`${styles.subtotal} ${styles.promoRow}`}>
              <span>Sun-Soaked Savings</span>
              <strong className={styles.promoAmount}>-{formatMoney(promoDiscount)}</strong>
            </div>
          )}
          <div className={styles.subtotal}><span>Total</span><strong>{formatMoney(totalWithFees)}</strong></div>
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
          {!cannotCheckout && isRushOrder && (
            <p className={styles.checkoutHint}>
              Orders starting within 24 hours include a {formatMoney(expediteFee)} expedite fee.
            </p>
          )}
        </div>
      </aside>

      <button className={`${styles.backdrop} ${cartOpen ? styles.backdropOpen : ''}`} onClick={() => setCartOpen(false)} aria-label="Close cart" />
    </>
  );
}
