import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/page.module.css';
import { withBasePath } from '@/lib/paths';

const navLinks = [
  { href: '/category/baby', label: 'Baby Equipment' },
  { href: '/category/beach', label: 'Beach Gear' },
  { href: '#accessibility', label: 'Handicap Options' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#faq', label: 'FAQ' }
];

const trustItems = [
  { icon: '/rentals/visual/trust-images/shield.svg', label: 'Sanitized & inspected' },
  { icon: '/rentals/visual/trust-images/truck.svg', label: 'Delivery + pickup' },
  { icon: '/rentals/visual/trust-images/chat.svg', label: 'Text support' },
  { icon: '/rentals/visual/trust-images/pay.svg', label: 'Easy checkout' }
];

export default function HomePage() {
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
        <img
          className={styles.heroImage}
          src={withBasePath('/rentals/visual/carosel-images/peopleatbeach.webp')}
          alt="Bright, clean vacation home interior"
        />
        <div className={styles.heroFade} aria-hidden="true" />
      </section>

      <section className={styles.intro}>
        <h1>Vacation rentals, delivered to your door.</h1>
        <p>
          Baby gear, beach gear, and accessibility essentials in Charleston & Myrtle Beach, clean, on-time, and
          effortless.
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

        <Link id="accessibility" href="/category/beach" className={styles.accessibilityLink}>
          Need accessibility options?
        </Link>
      </section>

      <section id="how-it-works" className={styles.hiddenAnchor} aria-hidden="true" />
      <section id="faq" className={styles.hiddenAnchor} aria-hidden="true" />
    </main>
  );
}
