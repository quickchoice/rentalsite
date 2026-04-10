import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import StructuredData from '@/components/StructuredData';
import styles from '@/app/lp/[slug]/page.module.css';
import { getLpPage, getAllLpSlugs, PHONE_NUMBER, CONTACT_EMAIL } from '@/lib/lp-content';
import { buildMetadata, absoluteUrl } from '@/lib/site';
import { buildLocalBusinessSchema } from '@/lib/structured-data';
import { withBasePath } from '@/lib/paths';

export async function generateStaticParams() {
  return getAllLpSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getLpPage(slug);
  if (!page) return {};

  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/lp/${slug}`,
    noindex: true // LP pages should not be indexed — they're for paid traffic only
  });
}

const howItWorksSteps = [
  { step: '1', title: 'Choose Dates', text: 'Pick your arrival and departure so pricing lines up with your stay.' },
  { step: '2', title: 'Add Your Gear', text: 'Browse and add what you need — cribs, strollers, chairs, bundles.' },
  { step: '3', title: 'We Deliver', text: 'Your gear arrives before you do and gets picked up when the trip ends.' }
];

// Replace with real customer quotes
const testimonials = [
  {
    quote: "The crib was already set up when we arrived. Saved us from hauling it on the flight.",
    author: "Sarah M.",
    trip: "Myrtle Beach trip"
  },
  {
    quote: "Drop-off was smooth and the gear was clean and in great shape.",
    author: "James T.",
    trip: "Family vacation, Charleston"
  },
  {
    quote: "Made traveling with a baby so much easier. Everything was sanitized and exactly as described.",
    author: "Rachel K.",
    trip: "Myrtle Beach condo stay"
  }
];

export default async function LpPage({ params }) {
  const { slug } = await params;
  const page = getLpPage(slug);
  if (!page) notFound();

  const contactDisplay = PHONE_NUMBER || CONTACT_EMAIL;
  const contactHref = PHONE_NUMBER ? `tel:${PHONE_NUMBER.replace(/\D/g, '')}` : `mailto:${CONTACT_EMAIL}`;

  return (
    <>
      <StructuredData
        data={buildLocalBusinessSchema({
          path: `/lp/${slug}`,
          description: page.metaDescription,
          includeRating: true
        })}
      />

      <div className={styles.page}>
        {/* Minimal header — no site nav to avoid distractions on paid traffic */}
        <header className={styles.header}>
          <Link href="/" className={styles.logoWrap} aria-label="QuickChoice Rentals home">
            <Image
              src={withBasePath('/rentals/visual/logo.png')}
              alt="QuickChoice Rentals"
              width={168}
              height={52}
              className={styles.logo}
              priority
            />
          </Link>
          <a href={contactHref} className={styles.contactLink}>
            {contactDisplay}
          </a>
        </header>

        <main className={styles.main}>
          {/* Hero */}
          <section className={styles.hero}>
            <div className={styles.heroInner}>
              <p className={styles.locationLabel}>{page.location}</p>
              <h1 className={styles.headline}>{page.headline}</h1>
              <p className={styles.subhead}>{page.subhead}</p>
              <div className={styles.heroCtas}>
                <Link href={page.ctaHref} className={`${styles.ctaPrimary} btn btnPrimary`}>
                  {page.ctaLabel}
                </Link>
                <Link href={page.secondaryCtaHref} className={`${styles.ctaSecondary} btn btnSecondary`}>
                  {page.secondaryCtaLabel}
                </Link>
              </div>
              <ul className={styles.trustRow}>
                <li>Sanitized & inspected</li>
                <li>Flat $10 delivery fee</li>
                <li>Pickup included</li>
                <li>Text support</li>
              </ul>
            </div>
          </section>

          {/* How It Works */}
          <section className={`${styles.section} card`}>
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <div className={styles.stepsGrid}>
              {howItWorksSteps.map(step => (
                <article key={step.step} className={styles.step}>
                  <span className={styles.stepNum}>{step.step}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Highlights */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What You Can Rent</h2>
            <div className={styles.highlightGrid}>
              {page.highlights.map(item => (
                <article key={item.title} className={`${styles.highlightCard} card`}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Mid-page CTA */}
          <section className={`${styles.midCta} card`}>
            <h2>Ready to book?</h2>
            <p>Choose your dates and start adding gear. We handle delivery and pickup.</p>
            <div className={styles.midCtaButtons}>
              <Link href={page.secondaryCtaHref} className="btn btnPrimary">
                Choose Dates
              </Link>
              <Link href={page.ctaHref} className="btn btnSecondary">
                {page.ctaLabel}
              </Link>
            </div>
          </section>

          {/* Testimonials */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What Customers Say</h2>
            <div className={styles.testimonialGrid}>
              {testimonials.map(item => (
                <article key={item.author} className={`${styles.testimonialCard} card`}>
                  <div className={styles.stars} aria-label="5 stars">★★★★★</div>
                  <blockquote>
                    <p>"{item.quote}"</p>
                  </blockquote>
                  <footer>
                    <strong>{item.author}</strong>
                    <span> — {item.trip}</span>
                  </footer>
                </article>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className={`${styles.finalCta} card`}>
            <h2>Get gear delivered to your {page.location} stay</h2>
            <div className={styles.midCtaButtons}>
              <Link href={page.ctaHref} className="btn btnPrimary">
                {page.ctaLabel}
              </Link>
              <Link href={page.secondaryCtaHref} className="btn btnSecondary">
                Choose Dates
              </Link>
            </div>
            <p className={styles.contactNote}>
              Questions?{' '}
              <a href={contactHref} className={styles.contactLinkInline}>
                {contactDisplay}
              </a>
            </p>
          </section>
        </main>

        <footer className={styles.footer}>
          <Link href="/">QuickChoice Rentals</Link>
          <span>·</span>
          <Link href="/faq">FAQ</Link>
          <span>·</span>
          <Link href="/contact">Contact</Link>
        </footer>
      </div>
    </>
  );
}
