import Link from 'next/link';
import styles from '@/app/page.module.css';
import { withBasePath } from '@/lib/paths';

const zones = [
  { href: '/category/baby', label: 'Baby Gear' },
  { href: '/category/beach', label: 'Beach Gear' }
];

export default function HomePage() {
  return (
    <main className={styles.scene}>
      <video className={`${styles.video} ${styles.desktopVideo}`} autoPlay muted loop playsInline aria-hidden="true">
        <source src={withBasePath('/rentals/assets/horizvideo.mp4')} type="video/mp4" />
      </video>
      <video className={`${styles.video} ${styles.mobileVideo}`} autoPlay muted loop playsInline aria-hidden="true">
        <source src={withBasePath('/rentals/assets/vertvideo.mp4')} type="video/mp4" />
      </video>

      <section className={styles.shackWrap} aria-label="Choose a gear category">
        <img className={`${styles.shack} ${styles.desktopShack}`} src={withBasePath('/rentals/assets/horizshack-nobg.png')} alt="" />
        <img className={`${styles.shack} ${styles.mobileShack}`} src={withBasePath('/rentals/assets/horizshack-nobg.png')} alt="" />

        <div className={styles.zones}>
          {zones.map(zone => (
            <Link key={zone.href} href={zone.href} className={styles.zone} aria-label={`Go to ${zone.label}`}>
              {zone.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
