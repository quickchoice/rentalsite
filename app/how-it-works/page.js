import Link from 'next/link';
import RentalsShell from '@/components/RentalsShell';
import styles from '@/app/how-it-works/page.module.css';

const steps = [
  {
    icon: '📅',
    title: 'Choose Dates',
    text: 'Pick your vacation start and end dates before shopping so pricing stays accurate.'
  },
  {
    icon: '🛍️',
    title: 'Add Your Gear',
    text: 'Browse baby and beach essentials, then add exactly what your trip needs.'
  },
  {
    icon: '🚚',
    title: 'We Deliver',
    text: 'We bring cleaned, inspected gear to your rental and handle pickup at checkout.'
  }
];

export default function HowItWorksPage() {
  return (
    <RentalsShell backHref="/">
      <main>
        <section className={`${styles.card} card`}>
          <h1>How It Works</h1>
          <p className="muted">Fast setup, simple delivery, and no extra travel-day stress.</p>

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
