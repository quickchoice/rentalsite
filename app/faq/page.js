import StructuredData from '@/components/StructuredData';
import RentalsShell from '@/components/RentalsShell';
import Link from 'next/link';
import styles from '@/app/faq/page.module.css';
import { faqPageFaqs } from '@/lib/seo-content';
import { buildMetadata } from '@/lib/site';
import { buildFaqSchema } from '@/lib/structured-data';

export const metadata = buildMetadata({
  title: 'QuickChoice Rentals FAQ | Myrtle Beach & Charleston Rental Questions',
  description:
    'Read common questions about QuickChoice Rentals, including delivery areas, baby gear rentals, beach gear rentals, and booking steps.',
  path: '/faq',
  keywords: [
    'QuickChoice Rentals FAQ',
    'baby gear rentals Myrtle Beach SC FAQ',
    'beach gear rentals Charleston SC FAQ'
  ]
});

export default function FAQPage() {
  return (
    <>
      <StructuredData data={buildFaqSchema(faqPageFaqs)} />
      <RentalsShell backHref="/">
        <main>
          <section className={`${styles.card} card`}>
            <h1>Frequently Asked Questions</h1>
            <p className="muted">
              Short answers about delivery, timing, and booking.
            </p>

            <div className={styles.thread}>
              {faqPageFaqs.map(item => (
                <div key={item.question} className={styles.pair}>
                  <p className={`${styles.bubble} ${styles.question}`}>{item.question}</p>
                  <p className={`${styles.bubble} ${styles.answer}`}>{item.answer}</p>
                </div>
              ))}
            </div>
            <Link href="/rentals" className="btn btnSecondary">Explore Rental Pages</Link>{' '}
            <Link href="/checkout" className="btn btnPrimary">Choose Your Dates</Link>
          </section>
        </main>
      </RentalsShell>
    </>
  );
}
