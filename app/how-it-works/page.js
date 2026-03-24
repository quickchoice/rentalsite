import Link from 'next/link';
import RentalsShell from '@/components/RentalsShell';
import styles from '@/app/how-it-works/page.module.css';
import { buildMetadata } from '@/lib/site';

const steps = [
  {
    icon: '📅',
    title: 'Choose Dates',
    text: 'Enter your trip dates so pricing and availability line up with your stay.'
  },
  {
    icon: '🛍️',
    title: 'Add Your Gear',
    text: 'Browse baby gear, beach gear, bundles, or beach wheelchair options and add what you need.'
  },
  {
    icon: '🚚',
    title: 'We Deliver',
    text: 'Your gear is delivered to your stay and picked up when the trip ends.'
  }
];

export const metadata = buildMetadata({
  title: 'How QuickChoice Rentals Works | Myrtle Beach & Charleston Delivery',
  description:
    'Learn how to book baby gear, beach gear, bundles, and beach wheelchair rentals from QuickChoice Rentals.',
  path: '/how-it-works',
  keywords: [
    'how QuickChoice Rentals works',
    'Myrtle Beach rental delivery',
    'Charleston rental delivery'
  ]
});

export default function HowItWorksPage() {
  return (
    <RentalsShell backHref="/">
      <main>
        <section className={`${styles.card} card`}>
          <h1>How It Works</h1>
          <p className="muted">Choose dates, add your gear, and we handle delivery and pickup.</p>

          <div className={styles.steps}>
            {steps.map(step => (
              <article key={step.title} className={styles.step}>
                <span className={styles.icon} aria-hidden="true">{step.icon}</span>
                <h2>{step.title}</h2>
                <p>{step.text}</p>
              </article>
            ))}
          </div>

          <Link href="/checkout" className="btn btnPrimary">Choose Your Dates</Link>
        </section>
      </main>
    </RentalsShell>
  );
}
