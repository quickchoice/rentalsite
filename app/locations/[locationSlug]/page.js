import { notFound } from 'next/navigation';
import SeoPage from '@/components/SeoPage';
import { getAllLocationPages, getLocationPage } from '@/lib/seo-content';
import { buildMetadata } from '@/lib/site';
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildLocalBusinessSchema
} from '@/lib/structured-data';

function compact(list) {
  return list.filter(Boolean);
}

function simplifyIntro(paragraph) {
  if (!paragraph) return '';
  const sentences = paragraph.match(/[^.!?]+[.!?]/g) || [paragraph];
  return sentences
    .map(sentence => sentence.trim())
    .filter(sentence => !sentence.toLowerCase().includes('service-area'))
    .slice(0, 2)
    .join(' ');
}

function isCustomerFaq(item) {
  const question = item?.question?.toLowerCase() || '';
  return !question.includes('main service area');
}

export function generateStaticParams() {
  return getAllLocationPages().map(page => ({ locationSlug: page.slug }));
}

export async function generateMetadata({ params }) {
  const { locationSlug } = await params;
  const page = getLocationPage(locationSlug);
  if (!page) return {};

  return buildMetadata({
    title: `${page.shortName} Rentals | Baby Gear, Beach Gear & Beach Wheelchair Rentals`,
    description: page.summary,
    path: page.path,
    image: page.image,
    keywords: [
      `${page.shortName} baby gear rentals`,
      `${page.shortName} beach gear rentals`,
      `${page.shortName} beach wheelchair rentals`
    ]
  });
}

export default async function LocationLandingPage({ params }) {
  const { locationSlug } = await params;
  const page = getLocationPage(locationSlug);
  if (!page) notFound();
  const intro = [simplifyIntro(page.intro?.[0]), page.intro?.[1]].filter(Boolean).slice(0, 1);
  const cardSections = (page.cardSections || []).slice(0, 2).map(section => ({
    ...section,
    intro: null
  }));
  const contentSections = (page.contentSections || []).slice(0, 1);
  const faqs = (page.faqs || []).filter(isCustomerFaq).slice(0, 2);
  const relatedLinks = (page.relatedLinks || []).slice(0, 2);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: page.shortName, href: page.path }
  ];

  const structuredData = compact([
    buildBreadcrumbSchema(breadcrumbs),
    buildFaqSchema(faqs),
    buildLocalBusinessSchema({
      path: page.path,
      description: page.summary,
      image: page.image,
      areasServed: [page.name]
    })
  ]);

  return (
    <SeoPage
      breadcrumbs={breadcrumbs}
      title={page.title}
      intro={intro}
      heroCtas={[
        { href: '/rentals', label: 'Browse Rentals' },
        { href: '/checkout', label: 'Choose Dates', kind: 'secondary' }
      ]}
      cardSections={cardSections}
      contentSections={contentSections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      structuredData={structuredData}
    />
  );
}
