'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '@/app/page.module.css';
import { withBasePath } from '@/lib/paths';

const navLinks = [
  { href: '/rentals/baby-gear', label: 'Baby Gear' },
  { href: '/rentals/beach-gear', label: 'Beach Gear' },
  { href: '/locations/myrtle-beach-sc', label: 'Myrtle Beach' },
  { href: '/locations/charleston-sc', label: 'Charleston' },
  { href: '/rentals', label: 'All Rentals' }
];

const trustItems = [
  { icon: '/rentals/visual/trust-images/shield.svg', label: 'Sanitized & inspected' },
  { icon: '/rentals/visual/trust-images/truck.svg', label: 'Delivery + pickup' },
  { icon: '/rentals/visual/trust-images/chat.svg', label: 'Text support' },
  { icon: '/rentals/visual/trust-images/pay.svg', label: 'Easy checkout' }
];

const carouselImages = [
  '/rentals/visual/carosel-images/Charleston1.jpg',
  '/rentals/visual/carosel-images/charleston2.webp',
  '/rentals/visual/carosel-images/charleston3.jpg',
  '/rentals/visual/carosel-images/myrtle1.webp',
  '/rentals/visual/carosel-images/myrtle2.jpg',
  '/rentals/visual/carosel-images/crib.png'
];

export default function HomePageClient() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const slides = [...carouselImages, carouselImages[0]];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSlideIndex(prev => prev + 1);
    }, 2600);
    return () => window.clearInterval(interval);
  }, []);

  function handleTransitionEnd() {
    if (slideIndex !== carouselImages.length) return;
    setIsTransitionEnabled(false);
    setSlideIndex(0);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsTransitionEnabled(true);
      });
    });
  }

  return (
    <>
      <header className={styles.topNav}>
        <Link href="/" className={styles.logoWrap} aria-label="QuickChoice Rentals home">
          <Image
            src={withBasePath('/rentals/visual/logo.png')}
            alt="QuickChoice Rentals"
            width={210}
            height={62}
            className={styles.logo}
            priority
          />
        </Link>

        <nav className={styles.navLinks} aria-label="Main navigation">
          {navLinks.map(link => (
            <Link key={link.label} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroViewport}>
          <div
            className={`${styles.heroTrack} ${isTransitionEnabled ? styles.heroTrackAnimated : styles.heroTrackStatic}`}
            style={{ transform: `translateX(-${slideIndex * 100}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {slides.map((image, index) => (
              <img
                key={`${image}-${index}`}
                className={styles.heroImage}
                src={withBasePath(image)}
                alt="QuickChoice Rentals delivery and vacation rental imagery from Myrtle Beach and Charleston"
              />
            ))}
          </div>
        </div>
        <div className={styles.heroFade} aria-hidden="true" />
      </section>

      <section className={styles.intro}>
        <h1>Baby gear, beach gear, and beach wheelchair rentals for Myrtle Beach and Charleston.</h1>
        <p>
          Clean, full-size rentals delivered right to your stay.
        </p>

        <div className={styles.ctaRow}>
          <Link href="/rentals/baby-gear" className={`${styles.cta} ${styles.ctaPrimary}`}>
            Browse Baby Gear
          </Link>
          <Link href="/rentals/beach-gear" className={`${styles.cta} ${styles.ctaSecondary}`}>
            Browse Beach Gear
          </Link>
        </div>

        <ul className={styles.trustRow}>
          {trustItems.map(item => (
            <li key={item.label} className={styles.trustItem}>
              <img src={withBasePath(item.icon)} alt="" aria-hidden="true" />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <Link href="/vending" className={styles.vendingLink}>
        Looking for vending?
      </Link>
    </>
  );
}
