import SeoPage from '@/components/SeoPage';
import {
  getAllResourcePages,
  getRentalPage
} from '@/lib/seo-content';
import { buildMetadata } from '@/lib/site';
import {
  buildBreadcrumbSchema,
  buildLocalBusinessSchema
} from '@/lib/structured-data';

export const metadata = buildMetadata({
  title: 'Vacation Rental Guides & Planning Resources | QuickChoice Rentals',
  description:
    'Read family travel guides, packing checklists, and rental planning resources that support Myrtle Beach and Charleston bookings.',
  path: '/resources',
  keywords: [
    'family packing checklist Myrtle Beach vacation',
    'baby gear beach vacation guide',
    'Charleston family travel rental guide'
  ]
});

function pageToCard(page) {
  return {
    title: page.title,
    href: page.path,
    description: page.intro?.[0],
    imageUrl: page.image,
    imageAlt: page.title,
    meta: page.primaryKeyword,
    linkLabel: 'Read guide'
  };
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Resources', href: '/resources' }
];

export default function ResourcesHubPage() {
  const resources = getAllResourcePages().map(pageToCard);

  const relatedLinks = [
    {
      href: getRentalPage('baby-gear')?.path || '/rentals/baby-gear',
      label: 'Baby gear rentals',
      description: 'Browse the baby gear collection.'
    },
    {
      href: getRentalPage('beach-gear')?.path || '/rentals/beach-gear',
      label: 'Beach gear rentals',
      description: 'Browse the beach gear collection.'
    },
    {
      href: '/rentals',
      label: 'Rentals hub',
      description: 'See everything in one place.'
    }
  ];

  const structuredData = [
    buildBreadcrumbSchema(breadcrumbs),
    buildLocalBusinessSchema({
      path: '/resources',
      description:
        'Planning guides and vacation rental resources for Myrtle Beach and Charleston family travel.'
    })
  ];

  return (
    <SeoPage
      breadcrumbs={breadcrumbs}
      title="Vacation Rental Guides & Planning Resources"
      intro={[
        'Planning guides for what to bring, what to rent, and where to start.'
      ]}
      heroCtas={[
        { href: '/rentals', label: 'Browse Rentals' },
        { href: '/checkout', label: 'Choose Dates', kind: 'secondary' }
      ]}
      cardSections={[
        {
          title: 'Featured Guides',
          cards: resources
        }
      ]}
      relatedLinks={relatedLinks.slice(0, 2)}
      structuredData={structuredData}
    />
  );
}
