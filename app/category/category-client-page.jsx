'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import RentalsShell from '@/components/RentalsShell';
import styles from '@/app/category/page.module.css';
import { bundles, categories, categoryIntro, locations, products } from '@/lib/data';
import { formatMoney } from '@/lib/cart';
import { useStore } from '@/context/StoreContext';

const DISCOUNT_STEPS = [10, 15, 20, 25];

function getDiscountPercent(productId) {
  const hash = productId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return DISCOUNT_STEPS[hash % DISCOUNT_STEPS.length];
}

function getOriginalPrice(finalPrice, discountPercent) {
  const multiplier = (100 - discountPercent) / 100;
  return finalPrice / multiplier;
}

function formatCountdown(totalSeconds) {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

export default function CategoryClientPage({ categoryId }) {
  const { addToCart, addBundle, orderMeta, setLocation } = useStore();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [saleDeadline] = useState(() => Date.now() + 3 * 60 * 60 * 1000);
  const [now, setNow] = useState(Date.now());

  const currentCategory = categories.find(category => category.id === categoryId) ?? categories[0];
  const activeLocation = orderMeta.location;
  const activeLocationName = locations.find(location => location.id === activeLocation)?.name || 'Not selected';

  useEffect(() => {
    const requestedLocation = new URLSearchParams(window.location.search).get('location');
    if (!requestedLocation) return;
    setLocation(requestedLocation);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const saleSecondsLeft = Math.max(0, Math.floor((saleDeadline - now) / 1000));

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
            <p className={styles.locationNote}>Service area: <strong>{activeLocationName}</strong></p>
            <div className={styles.locationRow}>
              {locations.map(location => (
                <button
                  key={location.id}
                  type="button"
                  className={`${styles.locationBtn} ${activeLocation === location.id ? styles.locationBtnActive : ''}`}
                  onClick={() => setLocation(location.id)}
                >
                  {location.name}
                </button>
              ))}
            </div>
            <div className={styles.tabs}>
              {categories.map(category => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}${activeLocation ? `?location=${activeLocation}` : ''}`}
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
          <div className={`${styles.sectionHeader} ${styles.saleHeader}`}>
            <h2>Quick add items</h2>
            <p className={styles.saleTimer}>FLASH SALE ENDS IN {formatCountdown(saleSecondsLeft)}</p>
          </div>
          <div className={styles.grid}>
            {filteredProducts.map(item => {
              const discountPercent = getDiscountPercent(item.id);
              const originalPrice = getOriginalPrice(item.pricePerDay, discountPercent);

              return (
                <article key={item.id} className={`${styles.itemCard} card`}>
                  <div className={styles.imageWrap}>
                    <div className={styles.image} style={{ backgroundImage: `url(${item.imageUrl})` }} />
                    <span className={styles.discountTag}>FLASH {discountPercent}% OFF</span>
                  </div>
                  <strong>{item.name}</strong>
                  <p className="muted">{item.shortDescription}</p>
                  <p className={styles.priceLine}>
                    <span className={styles.oldPrice}>{formatMoney(originalPrice)}/day</span>
                    <span className={styles.newPrice}>{formatMoney(item.pricePerDay)}/day</span>
                  </p>
                  <div className={styles.actions}>
                    <button type="button" className="btn btnPrimary" onClick={() => addToCart(item.id, 1)}>Quick add</button>
                    <Link href={`/product/${item.id}`} className="btn btnSecondary">View details</Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </RentalsShell>
  );
}
