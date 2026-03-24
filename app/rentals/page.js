import SeoPage from '@/components/SeoPage';
import { getAllLocationPages, getRentalPage, getResourcePage } from '@/lib/seo-content';
import { buildMetadata } from '@/lib/site';
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildLocalBusinessSchema
} from '@/lib/structured-data';

export const metadata = buildMetadata({
  title: 'Vacation Rentals in Myrtle Beach & Charleston | QuickChoice Rentals',
  description:
    'Explore baby gear rentals, beach gear rentals, accessibility equipment, and bundles for Myrtle Beach and Charleston, SC.',
  path: '/rentals',
  keywords: [
    'vacation rentals Myrtle Beach SC',
    'baby gear rentals Myrtle Beach SC',
    'beach gear rentals Charleston SC',
    'beach wheelchair rentals Myrtle Beach SC'
  ]
});

function compact(list) {
  return list.filter(Boolean);
}

function pageToCard(page) {
  const imageGalleryBySlug = {
    'baby-gear': [
      { src: '/rentals/visual/product-images/crib.webp', alt: 'Crib rental' },
      { src: '/rentals/visual/product-images/packnplay.png', alt: 'Pack and play rental' },
      { src: '/rentals/visual/product-images/high-chair-tray.png', alt: 'High chair rental' },
      { src: '/rentals/visual/product-images/single-jogging-stroller.png', alt: 'Stroller rental' }
    ],
    'beach-gear': [
      { src: '/rentals/visual/product-images-beach/beach-chair.png', alt: 'Beach chair rental' },
      { src: '/rentals/visual/product-images-beach/umbrella.png', alt: 'Beach umbrella rental' },
      { src: '/rentals/visual/product-images-beach/beach-wagon.png', alt: 'Beach wagon rental' },
      { src: '/rentals/visual/product-images-beach/beach-cart.png', alt: 'Beach cart rental' }
    ]
  };
  const shortDescriptionBySlug = {
    'baby-gear': 'Cribs, strollers, pack n plays, high chairs, and more.',
    'beach-gear': 'Chairs, umbrellas, wagons, carts, and beach-day extras.',
    'accessibility-equipment': 'Beach wheelchair rentals and a few helpful add-ons.',
    bundles: 'Grouped options for a faster, simpler booking.',
    'crib-rentals': 'A full-size crib for easier nights away from home.',
    'stroller-rentals': 'Single and double stroller options for outings and errands.',
    'pack-and-play-rentals': 'A flexible sleep option that travels well.',
    'high-chair-rentals': 'Meal-time seating for a smoother stay.',
    'beach-chair-rentals': 'Comfortable seating for long beach days.',
    'umbrella-rentals': 'Reliable shade for a more comfortable setup.',
    'beach-wagon-rentals': 'An easier way to move the extras.',
    'beach-wheelchair-rentals': 'Built to make sand access easier.',
    'family-beach-bundle': 'A simple beach setup with chairs, shade, and a wagon.',
    'sleep-essentials-bundle': 'A sleep-focused bundle for easier nights away.',
    'baby-basics-bundle': 'A simple setup for the basics.',
    'car-safety-bundle': 'A travel-ready bundle with a few key essentials.'
  };

  return {
    title: page.shortTitle || page.title,
    href: page.path,
    description: shortDescriptionBySlug[page.slug] || page.cardDescription || page.metaDescription || page.intro?.[0],
    imageUrl: page.image,
    imageGallery: imageGalleryBySlug[page.slug],
    imageAlt: page.title,
    linkLabel: 'View details'
  };
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Rentals', href: '/rentals' }
];

const faqs = [
  {
    question: 'What can I rent for my trip?',
    answer:
      'You can rent baby gear, beach gear, beach wheelchairs, and a few bundled setups for an easier trip.'
  },
  {
    question: 'Do you deliver to hotels, vacation homes, and condos?',
    answer:
      'Yes. Delivery is available to vacation stays in Myrtle Beach and Charleston, including hotels, condos, and vacation homes.'
  },
  {
    question: 'Are rentals cleaned between customers?',
    answer:
      'Yes. Items are sanitized and inspected between rentals.'
  },
  {
    question: 'When should I book my rentals?',
    answer:
      'Earlier is usually better, especially around busy travel dates. Booking ahead gives you the best chance of getting exactly what you want.'
  }
];

export default function RentalsHubPage() {
  const corePages = compact([
    getRentalPage('baby-gear'),
    getRentalPage('beach-gear'),
    getRentalPage('accessibility-equipment'),
    getRentalPage('bundles')
  ]).map(pageToCard);

  const productPages = compact([
    getRentalPage('crib-rentals'),
    getRentalPage('stroller-rentals'),
    getRentalPage('pack-and-play-rentals'),
    getRentalPage('high-chair-rentals'),
    getRentalPage('beach-chair-rentals'),
    getRentalPage('umbrella-rentals'),
    getRentalPage('beach-wagon-rentals'),
    getRentalPage('beach-wheelchair-rentals')
  ]).map(pageToCard);

  const bundlePages = compact([
    getRentalPage('family-beach-bundle'),
    getRentalPage('sleep-essentials-bundle'),
    getRentalPage('baby-basics-bundle'),
    getRentalPage('car-safety-bundle')
  ]).map(pageToCard);

  const locationPages = getAllLocationPages().map(page => ({
    title: page.name,
    href: page.path,
    description: page.summary,
    imageUrl: page.image,
    imageAlt: `${page.name} rentals`,
    meta: page.shortName,
    linkLabel: 'See location page'
  }));

  const relatedLinks = [
    {
      href: getResourcePage('what-baby-gear-to-rent-for-a-beach-vacation')?.path || '/resources',
      label: 'Baby gear planning guide',
      description: 'Read the beach-vacation baby gear guide and then move into the matching rental pages.'
    },
    {
      href: '/faq',
      label: 'Rental FAQ',
      description: 'See direct answers about delivery, locations, and how the booking flow works.'
    },
    {
      href: '/how-it-works',
      label: 'How It Works',
      description: 'Review the short booking process before starting your rental.'
    }
  ];

  const structuredData = compact([
    buildBreadcrumbSchema(breadcrumbs),
    buildFaqSchema(faqs),
    buildLocalBusinessSchema({
      path: '/rentals',
      description:
        'Vacation rental delivery for baby gear, beach gear, bundles, and beach wheelchair rentals in Myrtle Beach and Charleston, SC.'
    })
  ]);

  return (
    <SeoPage
      breadcrumbs={breadcrumbs}
      title="Vacation Rentals in Myrtle Beach & Charleston"
      intro={[
        'Browse baby gear, beach gear, bundles, and beach wheelchair rentals for Myrtle Beach and Charleston.'
      ]}
      heroCtas={[
        { href: '/category/baby', label: 'Browse Baby Gear' },
        { href: '/category/beach', label: 'Browse Beach Gear', kind: 'secondary' }
      ]}
      cardSections={[
        {
          title: 'Core Rental Categories',
          cards: corePages
        },
        {
          title: 'Popular Rentals',
          cards: [...productPages.slice(0, 5), ...bundlePages.slice(0, 2)]
        },
        {
          title: 'Locations',
          cards: locationPages
        }
      ]}
      faqs={faqs}
      relatedLinks={relatedLinks.slice(0, 2)}
      footerCta={{
        title: 'Ready to start your rental?',
        text:
          'Browse the collections first, then choose dates when you are ready to book.',
        links: [
          { href: '/checkout', label: 'Choose Dates' },
          { href: '/', label: 'Back to Home', kind: 'secondary' }
        ]
      }}
      structuredData={structuredData}
    />
  );
}
