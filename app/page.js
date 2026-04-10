import Link from 'next/link';
import HomePageClient from '@/app/home-page-client';
import StructuredData from '@/components/StructuredData';
import styles from '@/app/page.module.css';
import { faqPageFaqs, homePageContent } from '@/lib/seo-content';
import { buildMetadata } from '@/lib/site';
import {
  buildFaqSchema,
  buildLocalBusinessSchema,
  buildOrganizationSchema
} from '@/lib/structured-data';

export const metadata = buildMetadata({
  title: 'Baby Gear, Beach Gear & Beach Wheelchair Rentals | QuickChoice Rentals',
  description:
    'QuickChoice Rentals delivers clean, full-size baby gear, beach gear, and beach wheelchair rentals to your vacation stay in Myrtle Beach and Charleston, SC. Easy online booking, flat $10 delivery fee.',
  path: '/',
  keywords: [
    'baby gear rentals Myrtle Beach SC',
    'beach gear rentals Myrtle Beach SC',
    'crib rental delivery Myrtle Beach',
    'stroller rental vacation',
    'beach chair rental delivery',
    'beach wheelchair rentals Charleston SC',
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

const categoryCards = [
  {
    ...homePageContent.popularPages.find(card => card.href === '/rentals/baby-gear'),
    description: 'Cribs, strollers, high chairs, and the essentials that make travel easier.'
  },
  {
    ...homePageContent.popularPages.find(card => card.href === '/rentals/beach-gear'),
    description: 'Chairs, umbrellas, wagons, and beach-day basics delivered to your stay.'
  },
  {
    ...homePageContent.popularPages.find(card => card.href === '/rentals/accessibility-equipment'),
    description: 'Beach wheelchairs and mobility-friendly options for a smoother trip.'
  },
  {
    ...homePageContent.popularPages.find(card => card.href === '/rentals/family-beach-bundle'),
    title: 'Bundles',
    description: 'Popular sets for families who want to book more in fewer clicks.'
  }
];

const featuredCards = [
  {
    ...homePageContent.popularPages.find(card => card.href === '/rentals/crib-rentals'),
    description: 'A full-size sleep setup without packing the bulky gear.'
  },
  {
    ...homePageContent.popularPages.find(card => card.href === '/rentals/family-beach-bundle'),
    title: 'Family Beach Bundle',
    description: 'A simple way to cover the beach basics in one reservation.'
  },
  {
    ...homePageContent.popularPages.find(card => card.href === '/rentals/beach-wheelchair-rentals'),
    description: 'Reserve a beach wheelchair for easier access by the water.'
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

export default function HomePage() {
  return (
    <>
      <StructuredData data={buildOrganizationSchema()} />
      <StructuredData
        data={buildLocalBusinessSchema({
          path: '/',
          description:
            'QuickChoice Rentals delivers clean, full-size baby gear, beach gear, and beach wheelchair rentals to your vacation stay in Myrtle Beach and Charleston, SC.',
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
              <h2>Shop by Category</h2>
              <p>Start with the gear you need most.</p>
            </div>
            <div className={styles.cardGrid}>
              {categoryCards.map(renderCard)}
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
                <h3>Myrtle Beach</h3>
                <p>Gear for family beach trips, condo stays, and vacation rentals across the Grand Strand.</p>
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

          {/* Testimonials — replace these quotes with real customer reviews from Google or direct feedback */}
          <section className={styles.homeSection}>
            <div className={styles.sectionHeading}>
              <h2>What Customers Say</h2>
              <p>Families who traveled lighter thanks to QuickChoice Rentals.</p>
            </div>
            <div className={styles.testimonialGrid}>
              {testimonials.map(item => (
                <article key={item.author} className={`${styles.testimonialCard} card`}>
                  <div className={styles.starsRow} aria-label="5 out of 5 stars">
                    {'★★★★★'}
                  </div>
                  <blockquote className={styles.testimonialQuote}>
                    <p>"{item.quote}"</p>
                  </blockquote>
                  <footer className={styles.testimonialAuthor}>
                    <strong>{item.author}</strong>
                    <span>{item.trip}</span>
                  </footer>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.homeSection}>
            <div className={styles.sectionHeading}>
              <h2>Popular Bundles & Favorites</h2>
              <p>A few easy starting points for faster booking.</p>
            </div>
            <div className={styles.cardGrid}>
              {featuredCards.map(renderCard)}
            </div>
          </section>

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
