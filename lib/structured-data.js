import { absoluteUrl, SITE_NAME } from '@/lib/site';

export function buildBreadcrumbSchema(items) {
  if (!items?.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href)
    }))
  };
}

export function buildFaqSchema(faqs) {
  if (!faqs?.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/rentals/visual/logo.png'),
    email: 'dante.smith@quickchoice.net',
    areaServed: [
      {
        '@type': 'City',
        name: 'Myrtle Beach, SC'
      },
      {
        '@type': 'City',
        name: 'Charleston, SC'
      }
    ]
  };
}

export function buildLocalBusinessSchema({
  path = '/',
  description,
  image = '/rentals/visual/carosel-images/myrtle2.jpg',
  areasServed = ['Myrtle Beach, SC', 'Charleston, SC'],
  includeRating = false
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    url: absoluteUrl(path),
    image: absoluteUrl(image),
    description,
    areaServed: areasServed.map(area => ({
      '@type': 'City',
      name: area
    })),
    knowsAbout: [
      'Baby gear rentals',
      'Beach gear rentals',
      'Beach wheelchair rentals',
      'Vacation rental delivery'
    ],
    ...(includeRating
      ? { aggregateRating: buildAggregateRatingSchema() }
      : {})
  };
}

/**
 * Add aggregate rating to a LocalBusiness or Product schema.
 * ratingValue and reviewCount should reflect real data — pull from Google My Business or reviews.
 */
export function buildAggregateRatingSchema({
  ratingValue = 5.0,
  reviewCount = 48,
  bestRating = 5,
  worstRating = 1
} = {}) {
  return {
    '@type': 'AggregateRating',
    ratingValue,
    reviewCount,
    bestRating,
    worstRating
  };
}

export function buildProductSchema({
  path,
  name,
  description,
  image,
  category
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: absoluteUrl(image),
    category,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME
    },
    url: absoluteUrl(path)
  };
}
