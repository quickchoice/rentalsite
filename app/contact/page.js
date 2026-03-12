 'use client';

import { useRef } from 'react';
import RentalsShell from '@/components/RentalsShell';
import styles from '@/app/contact/page.module.css';

const deliveryAreas = [
  'Charleston',
  'Myrtle Beach',
  'Mount Pleasant',
  'North Charleston',
  'Isle of Palms',
  'Kiawah / Seabrook'
];

const referralSources = [
  'Google Search',
  'Instagram',
  'Facebook',
  'Vacation Rental Host',
  'Friend / Family',
  'Returning Customer'
];

export default function ContactPage() {
  const subjectRef = useRef(null);
  const replyToRef = useRef(null);

  function handleSubmit(event) {
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get('Name') || '').trim();
    const area = String(formData.get('DeliveryArea') || '').trim();
    const arrivalDate = String(formData.get('ArrivalDate') || '').trim();
    const email = String(formData.get('Email') || '').trim();

    const subjectParts = [];
    if (name) subjectParts.push(name);
    if (area) subjectParts.push(area);
    if (arrivalDate) subjectParts.push(arrivalDate);

    const subject = subjectParts.length
      ? `Rental Inquiry - ${subjectParts.join(' - ')}`
      : 'New QuickChoice Rentals Inquiry';

    if (subjectRef.current) subjectRef.current.value = subject;
    if (replyToRef.current) replyToRef.current.value = email;
  }

  return (
    <RentalsShell backHref="/">
      <main>
        <section className={`${styles.card} card`}>
          <h1>Contact Us</h1>
          <p className={styles.intro}>
            This is a general information form. A representative will respond shortly.
          </p>

          <form
            className={styles.form}
            method="POST"
            action="https://formspree.io/f/xqagbgrn"
            onSubmit={handleSubmit}
          >
            <p className={styles.helper}>Please send us a message:</p>

            <label>
              Your Name <span>(required)</span>
              <input type="text" name="Name" required />
            </label>

            <label>
              Your Email <span>(required)</span>
              <input type="email" name="Email" required />
            </label>

            <label>
              Cell Phone
              <input type="tel" name="Phone" />
            </label>

            <label>
              Arrival Date
              <input type="date" name="ArrivalDate" />
            </label>

            <label>
              Delivery Area
              <select name="DeliveryArea" defaultValue="">
                <option value="" disabled>—Please choose an option—</option>
                {deliveryAreas.map(area => <option key={area} value={area}>{area}</option>)}
              </select>
            </label>

            <label>
              How did you hear about us?
              <select name="ReferralSource" defaultValue="">
                <option value="" disabled>—Please choose an option—</option>
                {referralSources.map(source => <option key={source} value={source}>{source}</option>)}
              </select>
            </label>

            <label>
              Your Message
              <textarea name="Message" rows={7} />
            </label>

            <input type="hidden" name="_subject" ref={subjectRef} />
            <input type="hidden" name="_replyto" ref={replyToRef} />

            <button type="submit" className="btn btnPrimary">Send Message</button>
          </form>
        </section>
      </main>
    </RentalsShell>
  );
}
