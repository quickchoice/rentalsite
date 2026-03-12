'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import RentalsShell from '@/components/RentalsShell';
import styles from '@/app/bundle/page.module.css';
import { bundles, products } from '@/lib/data';
import { formatMoney, getBundleBasePricePerDay } from '@/lib/cart';
import { useStore } from '@/context/StoreContext';

export default function BundleClientPage({ bundleId }) {
  const { addBundle } = useStore();
  const [qty, setQty] = useState(1);

  const bundle = useMemo(() => bundles.find(item => item.id === bundleId) ?? bundles[0], [bundleId]);
  const basePricePerDay = getBundleBasePricePerDay(bundle);
  const discountPercent = bundle.discountPercent || 10;

  return (
    <RentalsShell backHref={`/category/${bundle.categoryId || 'baby'}`}>
      <main>
        <section className={styles.layout}>
          <div className={styles.image} style={{ backgroundImage: `url(${bundle.imageUrl})` }} />

          <div className={styles.content}>
            <p className={styles.category}>Bundle</p>
            <h1>{bundle.name}</h1>
            <p className={styles.price}>
              <span className={styles.oldPrice}>{formatMoney(basePricePerDay)}/day</span>{' '}
              {formatMoney(bundle.pricePerDay)}/day
            </p>
            <p className={styles.discountLabel}>Save {discountPercent}% with this bundle</p>
            <p className="muted">{bundle.description}</p>

            <div className={styles.qtyRow}>
              <label htmlFor="bundle-qty">Quantity</label>
              <div className={styles.qty}>
                <button type="button" onClick={() => setQty(prev => Math.max(1, prev - 1))}>-</button>
                <input id="bundle-qty" type="number" min="1" value={qty} onChange={event => setQty(Math.max(1, Number(event.target.value) || 1))} />
                <button type="button" onClick={() => setQty(prev => prev + 1)}>+</button>
              </div>
              <button type="button" className="btn btnPrimary" onClick={() => addBundle(bundle.id, qty)}>Add bundle</button>
            </div>

            <div className={styles.section}>
              <h2>Bundle Items</h2>
              <ul>
                {bundle.items.map(item => {
                  const product = products.find(productItem => productItem.id === item.productId);
                  if (!product) return null;
                  return (
                    <li key={item.productId}>
                      <Link href={`/product/${product.id}`}>{product.name}</Link>
                      {item.qty > 1 ? ` x ${item.qty}` : ''}
                    </li>
                  );
                })}
              </ul>
            </div>

            <Link href={`/category/${bundle.categoryId || 'baby'}`} className="btn btnSecondary">Back to category</Link>
          </div>
        </section>
      </main>
    </RentalsShell>
  );
}
