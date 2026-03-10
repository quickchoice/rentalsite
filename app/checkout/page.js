'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import RentalsShell from '@/components/RentalsShell';
import styles from '@/app/checkout/page.module.css';
import { formatDateLocal, parseDateLocal } from '@/lib/cart';
import { useStore } from '@/context/StoreContext';
import { locations } from '@/lib/data';

function getCalendarDays(viewDate) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { startDay: first.getDay(), daysInMonth };
}

export default function CheckoutPage() {
  const router = useRouter();
  const { orderMeta, setOrderMeta, setLocation } = useStore();
  const [viewDate, setViewDate] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setViewDate(new Date());
  }, []);

  const start = parseDateLocal(orderMeta.startDate);
  const end = parseDateLocal(orderMeta.endDate);
  const { startDay, daysInMonth } = useMemo(() => {
    if (!viewDate) return { startDay: 0, daysInMonth: 0 };
    return getCalendarDays(viewDate);
  }, [viewDate]);

  function onDayClick(day) {
    if (!viewDate) return;
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const value = formatDateLocal(date);

    if (!start || (start && end) || date < start) {
      setOrderMeta(prev => ({ ...prev, startDate: value, endDate: '' }));
      return;
    }

    setOrderMeta(prev => ({ ...prev, endDate: value }));
  }

  function startShopping() {
    if (!orderMeta.location) {
      setError('Please select Charleston or Myrtle Beach.');
      return;
    }
    if (!orderMeta.startDate || !orderMeta.endDate) {
      setError('Please select a start and end date.');
      return;
    }
    setError('');
    router.push('/category/baby');
  }

  return (
    <RentalsShell>
      <main>
        <section className={`${styles.card} card`}>
          <h1>When is your vacation?</h1>
          <div className={styles.locationRow}>
            {locations.map(location => (
              <button
                key={location.id}
                type="button"
                className={`${styles.locationBtn} ${orderMeta.location === location.id ? styles.locationBtnActive : ''}`}
                onClick={() => setLocation(location.id)}
              >
                {location.name}
              </button>
            ))}
          </div>
          <div className={styles.calendar}>
            <div className={styles.head}>
              <button type="button" className="btn btnSecondary" onClick={() => viewDate && setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}>‹</button>
              <strong>{viewDate ? viewDate.toLocaleString('en-US', { month: 'long', year: 'numeric' }) : 'Loading...'}</strong>
              <button type="button" className="btn btnSecondary" onClick={() => viewDate && setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}>›</button>
            </div>

            <div className={styles.weekdays}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}
            </div>

            <div className={styles.grid}>
              {viewDate && Array.from({ length: startDay }).map((_, index) => <span key={`empty-${index}`} className={styles.empty} />)}
              {viewDate && Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
                const value = formatDateLocal(date);
                const inRange = start && end && date >= start && date <= end;
                const isStart = orderMeta.startDate === value;
                const isEnd = orderMeta.endDate === value;
                return (
                  <button
                    key={value}
                    type="button"
                    className={`${styles.day} ${inRange ? styles.range : ''} ${isStart ? styles.start : ''} ${isEnd ? styles.end : ''}`}
                    onClick={() => onDayClick(day)}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <p className={styles.selected}>
            {orderMeta.startDate && orderMeta.endDate
              ? `${orderMeta.startDate} → ${orderMeta.endDate}`
              : orderMeta.startDate
              ? `Start: ${orderMeta.startDate}`
              : 'Pick start and end dates'}
          </p>

          {error && <p className={styles.error}>{error}</p>}
          <button type="button" className="btn btnPrimary" onClick={startShopping}>Start Shopping</button>
        </section>
      </main>
    </RentalsShell>
  );
}
