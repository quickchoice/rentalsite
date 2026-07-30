import Image from 'next/image';
import styles from '@/components/ServiceAreaMap.module.css';

const MYRTLE_BEACH_LOCATIONS = [
  { name: 'Myrtle Beach',      note: 'Main service hub', color: '#4a85c0' },
  { name: 'North Myrtle Beach', note: '',                color: '#3a6b56' },
  { name: 'Cherry Grove',       note: '',                color: '#c94040' },
  { name: 'Surfside Beach',     note: '',                color: '#c8a020' },
  { name: 'Garden City',        note: '',                color: '#8050b8' },
  { name: "Murrell's Inlet",    note: '',                color: '#c86030' },
];

export default function ServiceAreaMap() {
  return (
    <div className={styles.wrap}>
      <div className={styles.mapFrame}>
        <Image
          src="/rentals/visual/location-images/servicearea.png"
          alt="QuickChoice Rentals service area map covering Myrtle Beach, North Myrtle Beach, Cherry Grove, Surfside Beach, Garden City, and Murrell's Inlet"
          fill
          className={styles.mapImage}
          priority
        />
      </div>
      <div className={styles.locationList}>
        <p className={styles.listLabel}>Delivery locations</p>
        <ul className={styles.list}>
          {MYRTLE_BEACH_LOCATIONS.map(loc => (
            <li key={loc.name} className={styles.listItem}>
              <span
                className={styles.dot}
                style={{ background: loc.color }}
                aria-hidden="true"
              />
              <span className={styles.locName}>{loc.name}</span>
              {loc.note && <span className={styles.locNote}>{loc.note}</span>}
            </li>
          ))}
        </ul>
        <p className={styles.listFooter}>
          Not sure if we cover your area?{' '}
          <a href="/contact" className={styles.contactLink}>Contact us</a>
        </p>
      </div>
    </div>
  );
}
