'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '@/app/page.module.css';
import { withBasePath } from '@/lib/paths';

const navLinks = [
  { href: '/category/baby', label: 'Baby Equipment' },
  { href: '/category/beach', label: 'Beach Gear' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/faq', label: 'FAQ' }
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

export default function HomePage() {
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
    <main className={styles.page}>
      <header className={styles.topNav}>
        <Link href="/" className={styles.logoWrap} aria-label="QuickChoice Rental home">
          <Image
            src={withBasePath('/rentals/visual/logo.png')}
            alt="QuickChoice Rental"
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
                alt="Bright, clean vacation home interior"
              />
            ))}
          </div>
        </div>
        <div className={styles.heroFade} aria-hidden="true" />
      </section>

      <section className={styles.intro}>
        <h1>Vacation rentals, delivered to your door.</h1>
        <p>
          Baby gear and beach gear in Charleston & Myrtle Beach, clean, on-time, and effortless.
        </p>

        <div className={styles.ctaRow}>
          <Link href="/category/baby" className={`${styles.cta} ${styles.ctaPrimary}`}>
            Browse Baby Gear
          </Link>
          <Link href="/category/beach" className={`${styles.cta} ${styles.ctaSecondary}`}>
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
    </main>
  );
}
