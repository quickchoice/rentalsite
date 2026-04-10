/**
 * Google Ads landing page definitions.
 *
 * Each slug maps to a focused landing page at /lp/[slug].
 * These pages have no site navigation — only logo + contact link —
 * to keep paid-traffic visitors on a single conversion path.
 *
 * Usage: link your Google Ads campaign to /lp/[slug] rather than the
 * main site pages. Match the headline here to the ad headline for
 * a high Quality Score.
 *
 * TODO: Replace PHONE_NUMBER with your actual business phone.
 */

export const PHONE_NUMBER = ''; // e.g. '(843) 555-0123'
export const CONTACT_EMAIL = 'dante.smith@quickchoice.net';

export const lpPages = {
  'baby-gear-myrtle-beach': {
    metaTitle: 'Baby Gear Rentals in Myrtle Beach, SC | QuickChoice Rentals',
    metaDescription:
      'Rent cribs, strollers, car seats, and more for your Myrtle Beach vacation. Delivered to your rental before you arrive. Flat $10 delivery fee.',
    headline: 'Baby gear delivered to your Myrtle Beach rental',
    subhead:
      'Cribs, strollers, high chairs, car seats — sanitized, full-size, and waiting for you when you check in.',
    ctaLabel: 'Browse Baby Gear',
    ctaHref: '/category/baby',
    secondaryCtaLabel: 'Choose Dates',
    secondaryCtaHref: '/checkout',
    location: 'Myrtle Beach, SC',
    categoryId: 'baby',
    highlights: [
      { title: 'Cribs & Pack n Plays', text: 'Full-size sleep setups so you don\'t have to pack or fly with bulky gear.' },
      { title: 'Strollers', text: 'Single, double, and jogging strollers for every family configuration.' },
      { title: 'Car Seats', text: 'Infant, convertible, and booster seats — always inspected before delivery.' },
      { title: 'High Chairs & More', text: 'High chairs, booster seats, gates, swings, and everything in between.' }
    ]
  },

  'beach-gear-myrtle-beach': {
    metaTitle: 'Beach Gear Rentals in Myrtle Beach, SC | QuickChoice Rentals',
    metaDescription:
      'Rent beach chairs, umbrellas, wagons, and more for your Myrtle Beach trip. Delivered to your rental. No hauling gear through the airport.',
    headline: 'Beach gear delivered to your Myrtle Beach stay',
    subhead:
      'Chairs, umbrellas, wagons, and beach-day essentials — dropped off before you arrive, picked up when you leave.',
    ctaLabel: 'Browse Beach Gear',
    ctaHref: '/category/beach',
    secondaryCtaLabel: 'Choose Dates',
    secondaryCtaHref: '/checkout',
    location: 'Myrtle Beach, SC',
    categoryId: 'beach',
    highlights: [
      { title: 'Beach Chairs', text: 'Basic chairs or chairs with attached umbrellas — comfortable for a full day on the sand.' },
      { title: 'Beach Umbrellas', text: 'Premium 8-foot umbrellas that actually stay put in the wind.' },
      { title: 'Wagons & Carts', text: 'Haul your gear from the rental to the beach without the struggle.' },
      { title: 'Beach Wheelchairs', text: 'Wide-tire beach wheelchairs for accessible fun at the water\'s edge.' }
    ]
  },

  'baby-gear-charleston': {
    metaTitle: 'Baby Gear Rentals in Charleston, SC | QuickChoice Rentals',
    metaDescription:
      'Rent cribs, strollers, car seats, and more for your Charleston vacation. Delivered to your rental or hotel. Flat $10 delivery fee.',
    headline: 'Baby gear delivered to your Charleston rental',
    subhead:
      'Travel light. We deliver cribs, strollers, high chairs, and car seats right to your stay in the Charleston area.',
    ctaLabel: 'Browse Baby Gear',
    ctaHref: '/category/baby',
    secondaryCtaLabel: 'Choose Dates',
    secondaryCtaHref: '/checkout',
    location: 'Charleston, SC',
    categoryId: 'baby',
    highlights: [
      { title: 'Cribs & Pack n Plays', text: 'Full-size sleep setups so you don\'t have to pack or fly with bulky gear.' },
      { title: 'Strollers', text: 'Single, double, and jogging strollers for every family configuration.' },
      { title: 'Car Seats', text: 'Infant, convertible, and booster seats — always inspected before delivery.' },
      { title: 'High Chairs & More', text: 'High chairs, booster seats, gates, swings, and everything in between.' }
    ]
  },

  'beach-gear-charleston': {
    metaTitle: 'Beach Gear Rentals in Charleston, SC | QuickChoice Rentals',
    metaDescription:
      'Rent beach chairs, umbrellas, and more for your Charleston beach trip. Delivered to your rental. Skip the airport gear haul.',
    headline: 'Beach gear delivered to your Charleston stay',
    subhead:
      'Chairs, umbrellas, wagons, and beach essentials delivered right to your rental — no airport check-in fees for gear.',
    ctaLabel: 'Browse Beach Gear',
    ctaHref: '/category/beach',
    secondaryCtaLabel: 'Choose Dates',
    secondaryCtaHref: '/checkout',
    location: 'Charleston, SC',
    categoryId: 'beach',
    highlights: [
      { title: 'Beach Chairs', text: 'Comfortable chairs for a full day at Folly Beach, Isle of Palms, or Sullivan\'s Island.' },
      { title: 'Beach Umbrellas', text: 'Premium 8-foot umbrellas for shade on the sand.' },
      { title: 'Wagons & Carts', text: 'Haul your gear from your rental to the beach without the struggle.' },
      { title: 'Beach Wheelchairs', text: 'Wide-tire beach wheelchairs for everyone to enjoy the water.' }
    ]
  }
};

export function getLpPage(slug) {
  return lpPages[slug] || null;
}

export function getAllLpSlugs() {
  return Object.keys(lpPages);
}
