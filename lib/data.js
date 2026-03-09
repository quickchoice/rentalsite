import { withBasePath } from '@/lib/paths';

export const categories = [
  { id: 'baby', name: 'Baby Equipment' },
  { id: 'beach', name: 'Beach Gear' }
];

const categoryImageById = {
  baby: withBasePath('/rentals/visual/carosel-images/crib.png'),
  beach: withBasePath('/rentals/visual/carosel-images/peopleatbeach.webp')
};

const productImageById = {
  'baby-cribs': 'https://source.unsplash.com/1200x900/?baby,crib',
  'baby-bassinet': 'https://source.unsplash.com/1200x900/?baby,bassinet',
  'baby-pack-n-play': 'https://source.unsplash.com/1200x900/?pack,and,play,baby',
  'baby-2-camera-monitor': 'https://source.unsplash.com/1200x900/?baby,monitor,camera',
  'baby-1-camera-monitor': 'https://source.unsplash.com/1200x900/?video,baby,monitor',
  'baby-slumberpod': 'https://source.unsplash.com/1200x900/?baby,sleep,pod',
  'baby-car-seat-booster': 'https://source.unsplash.com/1200x900/?booster,car,seat',
  'baby-car-seat-infant': 'https://source.unsplash.com/1200x900/?infant,car,seat',
  'baby-car-seat-convertible': 'https://source.unsplash.com/1200x900/?toddler,convertible,car,seat',
  'baby-high-chair-tray': 'https://source.unsplash.com/1200x900/?baby,high,chair',
  'baby-booster-seat-tray': 'https://source.unsplash.com/1200x900/?baby,booster,seat',
  'baby-single-jogging-stroller': 'https://source.unsplash.com/1200x900/?single,jogging,stroller',
  'baby-double-jogging-stroller': 'https://source.unsplash.com/1200x900/?double,jogging,stroller',
  'baby-lightweight-stroller-single': 'https://source.unsplash.com/1200x900/?lightweight,stroller',
  'baby-tandem-double-stroller': 'https://source.unsplash.com/1200x900/?tandem,double,stroller',
  'baby-bouncy-seat': 'https://source.unsplash.com/1200x900/?baby,bouncer,seat',
  'baby-swing': 'https://source.unsplash.com/1200x900/?baby,swing',
  'baby-indoor-toys': 'https://source.unsplash.com/1200x900/?baby,toys,indoor',
  'baby-exersaucer': 'https://source.unsplash.com/1200x900/?baby,activity,center',
  'baby-gates': 'https://source.unsplash.com/1200x900/?baby,safety,gate',
  'baby-bath-tub': 'https://source.unsplash.com/1200x900/?baby,bath,tub',
  'baby-noise-machine': 'https://source.unsplash.com/1200x900/?white,noise,machine',
  'baby-welcome-kit': 'https://source.unsplash.com/1200x900/?baby,essentials,kit',
  'beach-classic-chair': 'https://source.unsplash.com/1200x900/?beach,chair',
  'beach-sun-shade': 'https://source.unsplash.com/1200x900/?beach,sun,shade',
  'beach-umbrella': 'https://source.unsplash.com/1200x900/?beach,umbrella',
  'beach-table': 'https://source.unsplash.com/1200x900/?beach,table',
  'beach-cart': 'https://source.unsplash.com/1200x900/?beach,cart',
  'beach-towel': 'https://source.unsplash.com/1200x900/?beach,towel',
  'beach-toys': 'https://source.unsplash.com/1200x900/?beach,toys',
  'beach-cargo-wagon': 'https://source.unsplash.com/1200x900/?cargo,wagon,beach',
  'beach-ultra-cargo-wagon': 'https://source.unsplash.com/1200x900/?utility,wagon,beach',
  'beach-mega-cargo-wagon': 'https://source.unsplash.com/1200x900/?heavy,duty,wagon,beach',
  'beach-kids-wagon': 'https://source.unsplash.com/1200x900/?kids,wagon',
  'beach-wheelchair': 'https://source.unsplash.com/1200x900/?beach,wheelchair'
};

const productShortDescriptionById = {
  'baby-cribs': 'Full-size sleep setup with a secure mattress for restful nights.',
  'baby-bassinet': 'Compact bedside sleeping option for newborns and early months.',
  'baby-pack-n-play': 'Portable sleep-and-play station that sets up in minutes.',
  'baby-2-camera-monitor': 'Dual-camera monitor to keep an eye on two sleep spaces.',
  'baby-1-camera-monitor': 'Simple video monitoring with clear day and night visibility.',
  'baby-slumberpod': 'Private blackout sleep pod that helps naps stay on schedule.',
  'baby-car-seat-booster': 'Travel-friendly booster seat for older children on the go.',
  'baby-car-seat-infant': 'Rear-facing infant seat with secure fit for early-stage travel.',
  'baby-car-seat-convertible': 'Convertible seat for growing toddlers with comfort and support.',
  'baby-high-chair-tray': 'Stable high chair with tray for easy mealtime seating.',
  'baby-booster-seat-tray': 'Clip-on style booster seat with tray for quick feeding setup.',
  'baby-single-jogging-stroller': 'Single jogging stroller with smooth handling over long walks.',
  'baby-double-jogging-stroller': 'Double jogging stroller built for siblings and extra room.',
  'baby-lightweight-stroller-single': 'Lightweight everyday stroller for errands and boardwalk strolls.',
  'baby-tandem-double-stroller': 'Tandem seating stroller that keeps two riders comfortable.',
  'baby-bouncy-seat': 'Calming bouncy seat for short rests and supervised downtime.',
  'baby-swing': 'Gentle swing motion to soothe babies between feeds and naps.',
  'baby-indoor-toys': 'Age-appropriate toy set for safe indoor playtime entertainment.',
  'baby-exersaucer': 'Activity center that supports upright play and sensory engagement.',
  'baby-gates': 'Safety gates for doorways and stairs to protect little explorers.',
  'baby-bath-tub': 'Infant bath tub designed for safe and easy bath routines.',
  'baby-noise-machine': 'White noise unit to help maintain nap and bedtime routines.',
  'baby-welcome-kit': 'Starter kit add-on for near-zero checkout testing.',
  'beach-classic-chair': 'Comfortable low-profile chair for relaxing in the sand.',
  'beach-sun-shade': 'Large shade canopy for cooler, longer beach days.',
  'beach-umbrella': 'Easy-open beach umbrella with reliable sun coverage.',
  'beach-table': 'Portable table for drinks, snacks, and small beach essentials.',
  'beach-cart': 'Rolling beach cart that makes transport easier over sand.',
  'beach-towel': 'Soft beach towel for drying off after ocean swims.',
  'beach-toys': 'Family-friendly beach toy set for digging, building, and play.',
  'beach-cargo-wagon': 'Cargo wagon with roomy storage for chairs, toys, and coolers.',
  'beach-ultra-cargo-wagon': 'Heavy-duty wagon with extra capacity for larger loads.',
  'beach-mega-cargo-wagon': 'Maximum-capacity wagon for full-family beach hauls.',
  'beach-kids-wagon': 'Kid-friendly wagon sized for lighter loads and easy pulling.',
  'beach-wheelchair': 'All-terrain beach wheelchair designed for sand mobility access.'
};

const createProduct = (id, name, categoryId, pricePerDay) => ({
  id,
  name,
  categoryId,
  pricePerDay,
  imageUrl: productImageById[id] ?? categoryImageById[categoryId],
  shortDescription: productShortDescriptionById[id] ?? `${name} cleaned and ready for your stay.`,
  longDescription: `${name} is professionally sanitized, delivered to your rental, and picked up at checkout.`,
  specs: ['Professionally sanitized', 'Delivery + pickup included', 'Vacation-ready setup']
});

export const products = [
  createProduct('baby-cribs', 'Cribs', 'baby', 14.0),
  createProduct('baby-bassinet', 'Bassinet', 'baby', 8.4),
  createProduct('baby-pack-n-play', 'Pack n Play', 'baby', 9.8),
  createProduct('baby-2-camera-monitor', '2 Camera Monitor', 'baby', 9.8),
  createProduct('baby-1-camera-monitor', 'One Camera Video Monitor', 'baby', 7.0),
  createProduct('baby-slumberpod', 'SlumberPod', 'baby', 7.0),
  createProduct('baby-car-seat-booster', 'Car Seat - Booster', 'baby', 9.8),
  createProduct('baby-car-seat-infant', 'Car Seat - Infant', 'baby', 9.8),
  createProduct('baby-car-seat-convertible', 'Car Seat - Convertible / Toddler', 'baby', 9.8),
  createProduct('baby-high-chair-tray', 'High Chair w/Tray', 'baby', 8.4),
  createProduct('baby-booster-seat-tray', 'Booster Seat w/Tray', 'baby', 4.9),
  createProduct('baby-single-jogging-stroller', 'Single Jogging Stroller', 'baby', 9.8),
  createProduct('baby-double-jogging-stroller', 'Double Jogging Stroller', 'baby', 11.2),
  createProduct('baby-lightweight-stroller-single', 'Lightweight Stroller - Single', 'baby', 9.8),
  createProduct('baby-tandem-double-stroller', 'Tandem Double Stroller', 'baby', 11.2),
  createProduct('baby-bouncy-seat', 'Bouncy Seat', 'baby', 5.6),
  createProduct('baby-swing', 'Swing', 'baby', 7.7),
  createProduct('baby-indoor-toys', 'Indoor Toys', 'baby', 4.2),
  createProduct('baby-exersaucer', 'Exersaucer', 'baby', 6.3),
  createProduct('baby-gates', 'Gates', 'baby', 6.3),
  createProduct('baby-bath-tub', 'Bath Tub', 'baby', 2.1),
  createProduct('baby-noise-machine', 'Noise Machine', 'baby', 2.0),
  createProduct('baby-welcome-kit', 'Welcome Kit (Test Item)', 'baby', 0.5),
  createProduct('beach-classic-chair', 'Classic Beach Chair', 'beach', 3.92),
  createProduct('beach-sun-shade', 'Sun Shade', 'beach', 16.8),
  createProduct('beach-umbrella', 'Beach Umbrella', 'beach', 5.6),
  createProduct('beach-table', 'Beach Table', 'beach', 2.1),
  createProduct('beach-cart', 'Beach Cart', 'beach', 7.7),
  createProduct('beach-towel', 'Beach Towel', 'beach', 1.4),
  createProduct('beach-toys', 'Beach Toys', 'beach', 4.2),
  createProduct('beach-cargo-wagon', 'Cargo Wagon', 'beach', 6.3),
  createProduct('beach-ultra-cargo-wagon', 'Ultra Cargo Wagon', 'beach', 8.4),
  createProduct('beach-mega-cargo-wagon', 'Mega Cargo Wagon', 'beach', 11.9),
  createProduct('beach-kids-wagon', 'Kids Wagon', 'beach', 6.3),
  createProduct('beach-wheelchair', 'Beach Wheelchair', 'beach', 40.0)
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
    imageUrl: categoryImageById.baby,
    description: 'Includes: Crib, high chair with tray, and bath tub essentials.'
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
    imageUrl: categoryImageById.beach,
    description: 'Includes: Two classic beach chairs, one umbrella, and one cargo wagon.'
  }
];

export const categoryIntro = {
  baby: 'Full baby gear list for your stay, cleaned and delivery-ready.',
  beach: 'Beach gear plus mobility options, ready for sand and boardwalk use.'
};
