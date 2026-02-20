'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import RentalsShell from '@/components/RentalsShell';
import styles from '@/app/product/page.module.css';
import { categories, products } from '@/lib/data';
import { formatMoney } from '@/lib/cart';
import { useStore } from '@/context/StoreContext';

export default function ProductClientPage({ productId }) {
  const { addToCart } = useStore();
  const [qty, setQty] = useState(1);

  const product = useMemo(() => {
    return products.find(item => item.id === productId) ?? products[0];
  }, [productId]);

  const categoryName = categories.find(category => category.id === product.categoryId)?.name ?? 'Category';

  return (
    <RentalsShell backHref={`/category/${product.categoryId}`}>
      <main>
        <section className={styles.layout}>
          <div className={styles.image} style={{ backgroundImage: `url(${product.imageUrl})` }} />

          <div className={styles.content}>
            <p className={styles.category}>{categoryName}</p>
            <h1>{product.name}</h1>
            <p className={styles.price}>{formatMoney(product.pricePerDay)}/day</p>
            <p className="muted">{product.shortDescription}</p>

            <div className={styles.qtyRow}>
              <label htmlFor="qty">Quantity</label>
              <div className={styles.qty}>
                <button type="button" onClick={() => setQty(prev => Math.max(1, prev - 1))}>-</button>
                <input id="qty" type="number" min="1" value={qty} onChange={event => setQty(Math.max(1, Number(event.target.value) || 1))} />
                <button type="button" onClick={() => setQty(prev => prev + 1)}>+</button>
              </div>
              <button type="button" className="btn btnPrimary" onClick={() => addToCart(product.id, qty)}>Add to cart</button>
            </div>

            <div className={styles.section}>
              <h2>Specifications</h2>
              <ul>
                {product.specs.map(spec => <li key={spec}>{spec}</li>)}
              </ul>
            </div>

            <div className={styles.section}>
              <h2>What's Included</h2>
              <p className="muted">{product.longDescription}</p>
            </div>

            <Link href={`/category/${product.categoryId}`} className="btn btnSecondary">Back to category</Link>
          </div>
        </section>
      </main>
    </RentalsShell>
  );
}
