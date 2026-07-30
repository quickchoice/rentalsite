import Link from 'next/link';
import styles from '@/app/page.module.css';

function StarsDisplay({ rating, label }) {
  const full = Math.round(rating);
  return (
    <span className={styles.starsRow} aria-label={label || `${rating} out of 5 stars`}>
      {'★'.repeat(full)}{'☆'.repeat(Math.max(0, 5 - full))}
    </span>
  );
}

export default function GoogleReviews({ data, fallback }) {
  if (!data || !data.reviews?.length) {
    return (
      <section className={styles.homeSection}>
        <div className={styles.sectionHeading}>
          <h2>What Customers Say</h2>
          <p>Families who traveled lighter thanks to QuickChoice Rentals.</p>
        </div>
        <div className={styles.testimonialGrid}>
          {fallback.map(item => (
            <article key={item.author} className={`${styles.testimonialCard} card`}>
              <StarsDisplay rating={5} label="5 out of 5 stars" />
              <blockquote className={styles.testimonialQuote}>
                <p>&ldquo;{item.quote}&rdquo;</p>
              </blockquote>
              <footer className={styles.testimonialAuthor}>
                <strong>{item.author}</strong>
                <span>{item.trip}</span>
              </footer>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={styles.homeSection}>
      <div className={styles.sectionHeading}>
        <h2>What Customers Say</h2>
        <div className={styles.googleRatingRow}>
          <StarsDisplay rating={data.rating} />
          <span className={styles.googleRatingText}>
            <strong>{data.rating.toFixed(1)}</strong>
            {' · '}
            {data.userRatingsTotal} Google reviews
          </span>
          <Link
            href={data.placeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.googleReviewsLink}
          >
            See all reviews →
          </Link>
        </div>
      </div>
      <div className={styles.testimonialGrid}>
        {data.reviews.map((review, index) => (
          <article key={index} className={`${styles.testimonialCard} card`}>
            <div className={styles.googleReviewAuthor}>
              {review.profilePhotoUrl && (
                <img
                  src={review.profilePhotoUrl}
                  alt=""
                  className={styles.googleAvatar}
                  width={36}
                  height={36}
                  aria-hidden="true"
                />
              )}
              <div className={styles.googleAuthorMeta}>
                <strong className={styles.googleAuthorName}>{review.authorName}</strong>
                <span className={styles.googleReviewTime}>{review.relativeTimeDescription}</span>
              </div>
            </div>
            <StarsDisplay rating={review.rating} />
            <blockquote className={styles.testimonialQuote}>
              <p>
                {review.text.length > 300
                  ? review.text.slice(0, 300) + '…'
                  : review.text}
              </p>
            </blockquote>
          </article>
        ))}
      </div>
    </section>
  );
}
