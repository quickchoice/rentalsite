'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '@/components/UtilityHeader.module.css';
import { useStore } from '@/context/StoreContext';
import { withBasePath } from '@/lib/paths';

const navLinks = [
  { href: '/rentals/baby-gear', label: 'Baby Gear' },
  { href: '/rentals/beach-gear', label: 'Beach Gear' },
  { href: '/rentals/bundles', label: 'Bundles' },
  { href: '/locations/myrtle-beach-sc', label: 'Myrtle Beach' },
  { href: '/locations/charleston-sc', label: 'Charleston' }
];

export default function UtilityHeader({ backHref = '/category/baby' }) {
  const router = useRouter();
  const { cartCount, setCartOpen } = useStore();

  function handleBack() {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
      return;
    }
    router.push(backHref);
  }

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <button className={styles.back} type="button" onClick={handleBack} aria-label="Go back">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5" />
            <path d="M11 6L5 12L11 18" />
          </svg>
        </button>
        <Link className={styles.logoWrap} href="/" aria-label="QuickChoice Rentals home">
          <Image src={withBasePath('/rentals/visual/logo.png')} alt="QuickChoice Rentals" width={168} height={52} className={styles.logo} />
        </Link>
        <button className={styles.cart} type="button" onClick={() => setCartOpen(true)} aria-label="Open cart">
          <span>🛒</span>
          <span>{cartCount}</span>
        </button>
      </div>

      <nav className={styles.nav} aria-label="Site navigation">
        {navLinks.map(link => (
          <Link key={link.href} href={link.href} className={styles.navLink}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
