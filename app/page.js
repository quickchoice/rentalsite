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
    'QuickChoice Rentals delivers baby gear, beach gear, bundles, and beach wheelchair rentals in Myrtle Beach, SC and Charleston, SC.',
  path: '/',
  keywords: [
    'baby gear rentals Myrtle Beach SC',
    'beach gear rentals Myrtle Beach SC',
    'beach wheelchair rentals Charleston SC',
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
            'QuickChoice Rentals delivers baby gear, beach gear, bundles, and beach wheelchair rentals in Myrtle Beach, SC and Charleston, SC.'
        })}
      />
      <StructuredData data={buildFaqSchema(homeFaqs)} />

      <main className={styles.page}>
        <HomePageClient />

        <div className={styles.homeBody}>
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
            <h2>Start browsing rentals</h2>
            <div className={styles.ctaPanelLinks}>
              <Link href="/rentals" className="btn btnPrimary">
                Browse Rentals
              </Link>
              <Link href="/locations/myrtle-beach-sc" className="btn btnSecondary">
                View Locations
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
