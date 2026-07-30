import Link from 'next/link';
import HomePageClient from '@/app/home-page-client';
import GoogleReviews from '@/components/GoogleReviews';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import StructuredData from '@/components/StructuredData';
import styles from '@/app/page.module.css';
import { getGoogleReviews } from '@/lib/google-reviews';
import { faqPageFaqs, homePageContent } from '@/lib/seo-content';
import { buildMetadata } from '@/lib/site';
import {
  buildFaqSchema,
  buildLocalBusinessSchema,
  buildOrganizationSchema
} from '@/lib/structured-data';

export const metadata = buildMetadata({
  title: 'Baby Gear & Beach Gear Rentals | QuickChoice Rentals',
  description:
    'QuickChoice Rentals delivers clean, full-size baby gear and beach gear rentals to your vacation stay in Myrtle Beach and Charleston, SC. Easy online booking, flat $20 delivery / pickup fee.',
  path: '/',
  keywords: [
    'baby gear rentals Myrtle Beach SC',
    'beach gear rentals Myrtle Beach SC',
    'crib rental delivery Myrtle Beach',
    'stroller rental vacation',
    'beach chair rental delivery',
    'vacation rental gear delivery',
    'QuickChoice Rentals'
  ]
});

const homeFaqs = faqPageFaqs.filter(item =>
  [
    'Where does QuickChoice Rentals deliver?',
    'Are items cleaned between rentals?',
    'How does delivery work?'
  ].includes(item.question)
);

const howItWorksSteps = [
  {
    step: '1',
    title: 'Choose Dates',
    text: 'Pick your arrival and departure so pricing lines up with your trip.'
  },
  {
    step: '2',
    title: 'Add Your Gear',
    text: 'Browse cribs, strollers, beach chairs, bundles, and more — add what you need.'
  },
  {
    step: '3',
    title: 'We Deliver',
    text: 'Your gear arrives before you do. We pick it up when the trip ends.'
  }
];

// Replace these with real customer quotes — pull from Google reviews or direct feedback
const testimonials = [
  {
    quote: "The crib was already set up when we arrived. Saved us from hauling it on the flight. Would absolutely book again.",
    author: "Sarah M.",
    trip: "Myrtle Beach trip"
  },
  {
    quote: "Rented beach chairs and an umbrella for the whole week. Drop-off was smooth and the gear was clean and in great shape.",
    author: "James T.",
    trip: "Family vacation, Charleston"
  },
  {
    quote: "Everything was sanitized and exactly as described. Made traveling with a baby so much easier.",
    author: "Rachel K.",
    trip: "Myrtle Beach condo stay"
  }
];


const locationCards = [
  {
    ...homePageContent.locations.find(card => card.href === '/locations/myrtle-beach-sc'),
    title: 'Myrtle Beach',
    description: 'Browse rentals available across the Grand Strand.'
  },
  {
    ...homePageContent.locations.find(card => card.href === '/locations/charleston-sc'),
    title: 'Charleston',
    description: 'See what is available for Charleston-area stays.'
  }
];

function renderCard(card) {
  return (
    <article key={card.href} className={`${styles.contentCard} card`}>
      {card.imageUrl ? (
        <Link href={card.href} className={styles.cardImageWrap} aria-label={card.title}>
          <img className={styles.cardImage} src={card.imageUrl} alt={card.imageAlt || card.title} loading="lazy" />
        </Link>
      ) : null}
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>
          <Link href={card.href}>{card.title}</Link>
        </h3>
        <p className={styles.cardDescription}>{card.description}</p>
      </div>
    </article>
  );
}

export default async function HomePage() {
  const googleReviews = await getGoogleReviews();
  return (
    <>
      <StructuredData data={buildOrganizationSchema()} />
      <StructuredData
        data={buildLocalBusinessSchema({
          path: '/',
          description:
            'QuickChoice Rentals delivers clean, full-size baby gear and beach gear rentals to your vacation stay in Myrtle Beach and Charleston, SC.',
          includeRating: true
        })}
      />
      <StructuredData data={buildFaqSchema(homeFaqs)} />

      <main className={styles.page}>
        <HomePageClient />

        <div className={styles.homeBody}>

          {/* How It Works — moved here from its own page so visitors see the process immediately */}
          <section className={`${styles.howItWorksSection} card`}>
            <div className={styles.sectionHeading}>
              <h2>How It Works</h2>
              <p>Three steps from browsing to gear at your door.</p>
            </div>
            <div className={styles.howItWorksSteps}>
              {howItWorksSteps.map(step => (
                <article key={step.step} className={styles.howItWorksStep}>
                  <span className={styles.stepNumber} aria-hidden="true">{step.step}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
            <div className={styles.howItWorksCta}>
              <Link href="/checkout" className="btn btnPrimary">Choose Your Dates</Link>
            </div>
          </section>

          <section className={styles.homeSection}>
            <div className={styles.sectionHeading}>
              <h2>Locations</h2>
              <p>Choose your area and start browsing.</p>
            </div>
            <div className={styles.cardGrid}>
              {locationCards.map(renderCard)}
            </div>
          </section>

          <section className={`${styles.coveragePanel} card`}>
            <div className={styles.sectionHeading}>
              <h2>Delivered to Your Stay</h2>
              <p>Simple delivery and pickup for Myrtle Beach and Charleston trips.</p>
            </div>
            <div className={styles.coverageGrid}>
              <article className={styles.coverageItem}>
                <h3>Myrtle Beach Area</h3>
                <p>Serving Myrtle Beach, North Myrtle Beach, Cherry Grove, Surfside Beach, Garden City, and Murrell's Inlet.</p>
              </article>
              <article className={styles.coverageItem}>
                <h3>Charleston</h3>
                <p>Delivered for Charleston-area stays so you can travel lighter and settle in faster.</p>
              </article>
              <article className={styles.coverageItem}>
                <h3>Pickup Included</h3>
                <p>Your rental is dropped off before or at arrival and picked up when the trip ends.</p>
              </article>
            </div>
          </section>

          <section className={styles.homeSection}>
            <div className={styles.sectionHeading}>
              <h2>Myrtle Beach Service Area</h2>
              <p>We deliver across the Grand Strand — from Cherry Grove to Murrell's Inlet.</p>
            </div>
            <ServiceAreaMap />
          </section>

          <GoogleReviews data={googleReviews} fallback={testimonials} />

          <section className={styles.homeSection}>
            <div className={styles.sectionHeading}>
              <h2>FAQ</h2>
              <p>Quick answers before you book.</p>
            </div>
            <div className={styles.faqGrid}>
              {homeFaqs.map(item => (
                <article key={item.question} className={`${styles.faqCard} card`}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={`${styles.ctaPanel} card`}>
            <h2>Ready to book?</h2>
            <p>Choose your dates and we handle the rest.</p>
            <div className={styles.ctaPanelLinks}>
              <Link href="/checkout" className="btn btnPrimary">
                Choose Dates
              </Link>
              <Link href="/rentals" className="btn btnSecondary">
                Browse All Rentals
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
