import RentalsShell from '@/components/RentalsShell';
import Link from 'next/link';
import styles from '@/app/faq/page.module.css';

const faqs = [
  {
    question: 'Do I have to choose dates before I can checkout?',
    answer: 'Yes. Checkout is locked until both a start date and end date are selected.'
  },
  {
    question: 'How does delivery work?',
    answer: 'We deliver directly to your vacation rental, then pick everything up at the end of your stay.'
  },
  {
    question: 'Are items cleaned between rentals?',
    answer: 'Every item is sanitized and inspected before each delivery.'
  },
  {
    question: 'Can I change my cart after adding items?',
    answer: 'Yes. Open the cart to adjust quantities, remove items, or update your trip dates.'
  }
];

export default function FAQPage() {
  return (
    <RentalsShell backHref="/">
      <main>
        <section className={`${styles.card} card`}>
          <h1>FAQ</h1>
         

          <div className={styles.thread}>
            {faqs.map(item => (
              <div key={item.question} className={styles.pair}>
                <p className={`${styles.bubble} ${styles.question}`}>{item.question}</p>
                <p className={`${styles.bubble} ${styles.answer}`}>{item.answer}</p>
              </div>
            ))}
          </div>
          <Link href="/checkout" className="btn btnPrimary">Choose Your Dates</Link>
        </section>
      </main>
    </RentalsShell>
  );
}
