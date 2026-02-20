'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import RentalsShell from '@/components/RentalsShell';
import styles from '@/app/category/page.module.css';
import { bundles, categories, categoryIntro, products } from '@/lib/data';
import { formatMoney } from '@/lib/cart';
import { useStore } from '@/context/StoreContext';

export default function CategoryClientPage({ categoryId }) {
  const { addToCart, addBundle } = useStore();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');

  const currentCategory = categories.find(category => category.id === categoryId) ?? categories[0];

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    let list = products.filter(
      item => item.categoryId === currentCategory.id && item.name.toLowerCase().includes(term)
    );

    if (sort === 'price-asc') list = [...list].sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.pricePerDay - a.pricePerDay);

    return list;
  }, [currentCategory.id, search, sort]);

  return (
    <RentalsShell>
      <main>
        <section className={styles.hero}>
          <div>
            <p className={styles.label}>I'm looking for...</p>
            <h1>{currentCategory.name}</h1>
            <p className="muted">{categoryIntro[currentCategory.id]}</p>
            <div className={styles.tabs}>
              {categories.map(category => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className={`${styles.tab} ${category.id === currentCategory.id ? styles.tabActive : ''}`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.filters}>
            <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search items" />
            <select value={sort} onChange={event => setSort(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </section>

        <section>
          <div className={styles.sectionHeader}><h2>Featured bundles</h2><p className="muted">Best value, fewer decisions.</p></div>
          <div className={styles.grid}>
            {bundles.map(bundle => (
              <article key={bundle.id} className={`${styles.itemCard} card`}>
                <div className={styles.image} style={{ backgroundImage: `url(${bundle.imageUrl})` }} />
                <strong>{bundle.name}</strong>
                <p className="muted">{bundle.description}</p>
                <p className={styles.price}>{formatMoney(bundle.pricePerDay)}/day</p>
                <button type="button" className="btn btnPrimary" onClick={() => addBundle(bundle.items)}>Add bundle</button>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className={styles.sectionHeader}><h2>Quick add items</h2><p className="muted">Tap once to add to cart.</p></div>
          <div className={styles.grid}>
            {filteredProducts.map(item => (
              <article key={item.id} className={`${styles.itemCard} card`}>
                <div className={styles.image} style={{ backgroundImage: `url(${item.imageUrl})` }} />
                <strong>{item.name}</strong>
                <p className="muted">{item.shortDescription}</p>
                <p className={styles.price}>{formatMoney(item.pricePerDay)}/day</p>
                <div className={styles.actions}>
                  <button type="button" className="btn btnPrimary" onClick={() => addToCart(item.id, 1)}>Quick add</button>
                  <Link href={`/product/${item.id}`} className="btn btnSecondary">View details</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </RentalsShell>
  );
}
