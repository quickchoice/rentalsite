import Link from 'next/link';
import RentalsShell from '@/components/RentalsShell';
import styles from '@/app/empty-cart/page.module.css';

export default function EmptyCartPage() {
  return (
    <RentalsShell>
      <main>
        <section className={`${styles.card} card`}>
          <h1>Your cart is empty</h1>
          <p>Pick your dates and add rental items to continue.</p>
          <Link href="/category?cat=baby" className="btn btnPrimary">Return to rental page</Link>
        </section>
      </main>
    </RentalsShell>
  );
}
