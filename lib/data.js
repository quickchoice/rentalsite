import { withBasePath } from '@/lib/paths';

export const categories = [
  { id: 'baby', name: 'Baby Equipment' },
  { id: 'beach', name: 'Beach Gear' }
];

const imageByCategory = {
  baby: withBasePath('/rentals/visual/carosel-images/crib.png'),
  beach: withBasePath('/rentals/visual/carosel-images/peopleatbeach.webp')
};

const createProduct = (id, name, categoryId, pricePerDay) => ({
  id,
  name,
  categoryId,
  pricePerDay,
  imageUrl: imageByCategory[categoryId],
  shortDescription: `${name} cleaned and ready for your stay.`,
  longDescription: `${name} is professionally sanitized, delivered to your rental, and picked up at checkout.`,
  specs: ['Professionally sanitized', 'Delivery + pickup included', 'Vacation-ready setup']
});

export const products = [
  createProduct('baby-cribs', 'Cribs', 'baby', 14),
  createProduct('baby-bassinet', 'Bassinet', 'baby', 10),
  createProduct('baby-pack-n-play', 'Pack n Play', 'baby', 11),
  createProduct('baby-2-camera-monitor', '2 Camera Monitor', 'baby', 9),
  createProduct('baby-1-camera-monitor', 'One Camera Video Monitor', 'baby', 8),
  createProduct('baby-slumberpod', 'SlumberPod', 'baby', 7),
  createProduct('baby-car-seat-booster', 'Car Seat - Booster', 'baby', 12),
  createProduct('baby-car-seat-infant', 'Car Seat - Infant', 'baby', 12),
  createProduct('baby-car-seat-convertible', 'Car Seat - Convertible / Toddler', 'baby', 13),
  createProduct('baby-high-chair-tray', 'High Chair w/Tray', 'baby', 9),
  createProduct('baby-booster-seat-tray', 'Booster Seat w/Tray', 'baby', 8),
  createProduct('baby-single-jogging-stroller', 'Single Jogging Stroller', 'baby', 13),
  createProduct('baby-double-jogging-stroller', 'Double Jogging Stroller', 'baby', 16),
  createProduct('baby-lightweight-stroller-single', 'Lightweight Stroller - Single', 'baby', 11),
  createProduct('baby-tandem-double-stroller', 'Tandem Double Stroller', 'baby', 15),
  createProduct('baby-bouncy-seat', 'Bouncy Seat', 'baby', 7),
  createProduct('baby-swing', 'Swing', 'baby', 8),
  createProduct('baby-indoor-toys', 'Indoor Toys', 'baby', 6),
  createProduct('baby-exersaucer', 'Exersaucer', 'baby', 9),
  createProduct('baby-gates', 'Gates', 'baby', 7),
  createProduct('baby-bath-tub', 'Bath Tub', 'baby', 6),
  createProduct('baby-noise-machine', 'Noise Machine', 'baby', 5),
  createProduct('beach-classic-chair', 'Classic Beach Chair', 'beach', 6),
  createProduct('beach-sun-shade', 'Sun Shade', 'beach', 10),
  createProduct('beach-umbrella', 'Beach Umbrella', 'beach', 8),
  createProduct('beach-table', 'Beach Table', 'beach', 7),
  createProduct('beach-cart', 'Beach Cart', 'beach', 11),
  createProduct('beach-towel', 'Beach Towel', 'beach', 4),
  createProduct('beach-toys', 'Beach Toys', 'beach', 5),
  createProduct('beach-cargo-wagon', 'Cargo Wagon', 'beach', 12),
  createProduct('beach-ultra-cargo-wagon', 'Ultra Cargo Wagon', 'beach', 14),
  createProduct('beach-mega-cargo-wagon', 'Mega Cargo Wagon', 'beach', 16),
  createProduct('beach-kids-wagon', 'Kids Wagon', 'beach', 9),
  createProduct('beach-wheelchair', 'Beach Wheelchair', 'beach', 20)
];

export const bundles = [
  {
    id: 'bundle-baby-basics',
    name: 'Baby Basics Set',
    items: [
      { productId: 'baby-cribs', qty: 1 },
      { productId: 'baby-high-chair-tray', qty: 1 },
      { productId: 'baby-bath-tub', qty: 1 }
    ],
    pricePerDay: 25,
    imageUrl: imageByCategory.baby,
    description: 'Crib, feeding, and bath essentials in one set.'
  },
  {
    id: 'bundle-beach-day',
    name: 'Beach Day Set',
    items: [
      { productId: 'beach-classic-chair', qty: 2 },
      { productId: 'beach-umbrella', qty: 1 },
      { productId: 'beach-cargo-wagon', qty: 1 }
    ],
    pricePerDay: 28,
    imageUrl: imageByCategory.beach,
    description: 'Chairs, shade, and carry gear for a full beach day.'
  }
];

export const categoryIntro = {
  baby: 'Full baby gear list for your stay, cleaned and delivery-ready.',
  beach: 'Beach gear plus mobility options, ready for sand and boardwalk use.'
};
