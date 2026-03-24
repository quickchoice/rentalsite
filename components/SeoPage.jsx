import Link from 'next/link';
import StructuredData from '@/components/StructuredData';
import UtilityHeader from '@/components/UtilityHeader';
import styles from '@/components/SeoPage.module.css';

function renderContentBlocks(contentSections) {
  if (!contentSections?.length) return null;

  return (
    <section className={styles.section}>
      <div className={styles.contentGrid}>
        {contentSections.map(section => (
          <article key={section.title} className={`${styles.contentBlock} card`}>
            <h3>{section.title}</h3>
            {section.paragraphs?.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets?.length ? (
              <ul>
                {section.bullets.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function renderCardSections(cardSections) {
  if (!cardSections?.length) return null;

  return cardSections.map(section => (
    <section key={section.title} className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>{section.title}</h2>
        {section.intro ? <p>{section.intro}</p> : null}
      </div>

      <div className={styles.cardGrid}>
        {section.cards.map(card => (
          <article key={`${section.title}-${card.title}`} className={`${styles.card} card`}>
            {card.imageGallery?.length ? (
              <div className={`${styles.imageWrap} ${styles.galleryWrap}`}>
                <div className={styles.galleryGrid}>
                  {card.imageGallery.slice(0, 4).map(image => (
                    <img
                      key={`${card.title}-${image.src}`}
                      className={styles.galleryImage}
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            ) : card.imageUrl ? (
              <div className={styles.imageWrap}>
                <img
                  className={styles.image}
                  src={card.imageUrl}
                  alt={card.imageAlt || card.title}
                  loading="lazy"
                />
              </div>
            ) : null}

            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>
                {card.href ? (
                  <Link className={styles.cardTitleLink} href={card.href}>
                    {card.title}
                  </Link>
                ) : (
                  card.title
                )}
              </h3>
              {card.description ? <p className={styles.cardDescription}>{card.description}</p> : null}
              {card.href ? (
                <Link className={styles.cardLink} href={card.href}>
                  {card.linkLabel || 'View details'}
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  ));
}

export default function SeoPage({
  breadcrumbs = [],
  eyebrow,
  title,
  intro = [],
  heroNote,
  heroCtas = [],
  answerCards = [],
  keyPoints = [],
  cardSections = [],
  contentSections = [],
  faqs = [],
  relatedLinks = [],
  footerCta,
  structuredData = []
}) {
  return (
    <>
      <UtilityHeader backHref="/" />
      {structuredData.map((item, index) => (
        <StructuredData key={`${title}-schema-${index}`} data={item} />
      ))}

      <main className={styles.page}>
        {breadcrumbs.length ? (
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            {breadcrumbs.map((item, index) => (
              <span key={item.href || item.label}>
                {index > 0 ? <span aria-hidden="true">/</span> : null}{' '}
                {item.href && index < breadcrumbs.length - 1 ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        <section className={`${styles.hero} card`}>
          <div className={styles.heroInner}>
            {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
            <h1>{title}</h1>

            {intro.length ? (
              <div className={styles.intro}>
                {intro.map(paragraph => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            {heroCtas.length ? (
              <div className={styles.ctaRow}>
                {heroCtas.map(cta => (
                  <Link
                    key={`${cta.href}-${cta.label}`}
                    href={cta.href}
                    className={`btn ${cta.kind === 'secondary' ? 'btnSecondary' : 'btnPrimary'}`}
                  >
                    {cta.label}
                  </Link>
                ))}
              </div>
            ) : null}

            {heroNote ? <p className={styles.heroNote}>{heroNote}</p> : null}
          </div>

          {answerCards.length ? (
            <div className={styles.answerGrid}>
              {answerCards.map(card => (
                <article key={card.title} className={styles.answerCard}>
                  <h2>{card.title}</h2>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          ) : null}

          {keyPoints.length ? (
            <ul className={styles.keyList}>
              {keyPoints.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>

        {renderCardSections(cardSections)}
        {renderContentBlocks(contentSections)}

        {faqs.length ? (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>FAQ</h2>
            </div>

            <div className={styles.faqList}>
              {faqs.map(item => (
                <article key={item.question} className={`${styles.faqItem} card`}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {relatedLinks.length ? (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>More to Explore</h2>
            </div>

            <div className={styles.relatedGrid}>
              {relatedLinks.map(link => (
                <article key={link.href} className={`${styles.relatedCard} card`}>
                  <h3>
                    <Link href={link.href}>{link.label}</Link>
                  </h3>
                  <p>{link.description}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {footerCta ? (
          <section className={`${styles.footerCta} card`}>
            <h2>{footerCta.title}</h2>
            <p>{footerCta.text}</p>
            <div className={styles.ctaRow}>
              {footerCta.links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`btn ${link.kind === 'secondary' ? 'btnSecondary' : 'btnPrimary'}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
