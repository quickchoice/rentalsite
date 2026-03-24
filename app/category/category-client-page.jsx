'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import RentalsShell from '@/components/RentalsShell';
import styles from '@/app/category/page.module.css';
import { bundles, categories, categoryIntro, products } from '@/lib/data';
import { formatMoney, getBundleBasePricePerDay } from '@/lib/cart';
import { useStore } from '@/context/StoreContext';

const DISCOUNT_PERCENT = 30;
const seoHubByCategory = {
  baby: '/rentals/baby-gear',
  beach: '/rentals/beach-gear'
};
const locationSeoLinksByCategory = {
  baby: [
    { href: '/locations/myrtle-beach-sc/baby-gear-rentals', label: 'Myrtle Beach baby gear' },
    { href: '/locations/charleston-sc/baby-gear-rentals', label: 'Charleston baby gear' }
  ],
  beach: [
    { href: '/locations/myrtle-beach-sc/beach-gear-rentals', label: 'Myrtle Beach beach gear' },
    { href: '/locations/charleston-sc/beach-gear-rentals', label: 'Charleston beach gear' }
  ]
};
const DISCOUNTED_PRODUCT_IDS = new Set([
  'baby-cribs',
  'baby-bassinet',
  'baby-pack-n-play',
  'baby-2-camera-monitor',
  'baby-1-camera-monitor',
  'baby-slumberpod',
  'baby-car-seat-booster',
  'baby-car-seat-infant',
  'baby-car-seat-convertible',
  'baby-high-chair-tray',
  'baby-single-jogging-stroller',
  'baby-double-jogging-stroller',
  'baby-tandem-double-stroller',
  'baby-bouncy-seat',
  'baby-swing',
  'baby-exersaucer',
  'baby-gates',
  'beach-chair',
  'beach-chair-umbrella',
  'beach-umbrella',
  'beach-cart',
  'beach-wagon'
]);

function getOriginalPrice(finalPrice) {
  const multiplier = (100 - DISCOUNT_PERCENT) / 100;
  return finalPrice / multiplier;
}

export default function CategoryClientPage({ categoryId }) {
  const { addToCart, addBundle } = useStore();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');

  const currentCategory = categories.find(category => category.id === categoryId) ?? categories[0];

  const sortByPrice = (list, direction) => {
    if (direction === 'price-asc') return [...list].sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (direction === 'price-desc') return [...list].sort((a, b) => b.pricePerDay - a.pricePerDay);
    return list;
  };

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    const list = products.filter(
      item => item.categoryId === currentCategory.id && item.name.toLowerCase().includes(term)
    );

    return sortByPrice(list, sort);
  }, [currentCategory.id, search, sort]);

  const featuredBundles = useMemo(() => {
    const term = search.trim().toLowerCase();
    const list = bundles.filter(
      bundle => bundle.categoryId === currentCategory.id && bundle.name.toLowerCase().includes(term)
    );

    return sortByPrice(list, sort);
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
            <p className={`${styles.locationNote} muted`}>
              Available in Myrtle Beach and Charleston. Want the full overview?{' '}
              <Link href={seoHubByCategory[currentCategory.id] || '/rentals'}>See the {currentCategory.name.toLowerCase()} overview</Link>.
            </p>
            <div className={styles.locationRow}>
              {(locationSeoLinksByCategory[currentCategory.id] || []).map(link => (
                <Link key={link.href} href={link.href} className={styles.locationBtn}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.filters}>
            <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search items" />
            <div className={styles.selectWrap}>
              <select value={sort} onChange={event => setSort(event.target.value)} aria-label="Sort items">
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <span className={styles.selectArrow} aria-hidden="true">⌄</span>
            </div>
          </div>
        </section>

        <section>
          <div className={styles.sectionHeader}><h2>Featured bundles</h2><p className="muted">Best value, fewer decisions.</p></div>
          <div className={styles.grid}>
            {featuredBundles.map(bundle => {
              const bundleDiscountPercent = bundle.discountPercent || 10;
              const bundleBasePrice = getBundleBasePricePerDay(bundle);
              const bundleDiscountedPrice = bundle.pricePerDay;

              return (
                <article key={bundle.id} className={`${styles.itemCard} card`}>
                  <div className={styles.imageWrap}>
                    <div className={`${styles.image} ${styles.bundleImage}`} style={{ backgroundImage: `url(${bundle.imageUrl})` }} />
                    <span className={styles.bundleTag}>BUNDLE SAVE {bundleDiscountPercent}%</span>
                  </div>
                  <strong>{bundle.name}</strong>
                  <p className="muted">{bundle.description}</p>
                  <p className={styles.priceLine}>
                    <span className={styles.oldPrice}>{formatMoney(bundleBasePrice)}/day</span>
                    <span className={styles.newPrice}>{formatMoney(bundleDiscountedPrice)}/day</span>
                  </p>
                  <div className={styles.actions}>
                    <button type="button" className="btn btnPrimary" onClick={() => addBundle(bundle.id, 1)}>Add bundle</button>
                    <Link href={`/bundle/${bundle.id}`} className="btn btnSecondary">View details</Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section>
          <div className={`${styles.sectionHeader} ${styles.saleHeader}`}>
           
            <p className={styles.saleTimer}>Instant Savings: Limited-Time - 30% Off - Select Items</p>
          </div>
          <div className={styles.grid}>
            {filteredProducts.map(item => {
              const isDiscounted = DISCOUNTED_PRODUCT_IDS.has(item.id);
              const originalPrice = getOriginalPrice(item.pricePerDay);

              return (
                <article key={item.id} className={`${styles.itemCard} card`}>
                  <div className={styles.imageWrap}>
                    <div className={styles.image} style={{ backgroundImage: `url(${item.imageUrl})` }} />
                    {isDiscounted && <span className={styles.discountTag}>FLASH {DISCOUNT_PERCENT}% OFF</span>}
                  </div>
                  <strong>{item.name}</strong>
                  <p className="muted">{item.shortDescription}</p>
                  <p className={styles.priceLine}>
                    {isDiscounted && <span className={styles.oldPrice}>{formatMoney(originalPrice)}/day</span>}
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
