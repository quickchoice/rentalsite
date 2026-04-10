'use client';

import { useRef, useState } from 'react';
import styles from '@/components/ContactBubble.module.css';

const deliveryAreas = ['Myrtle Beach', 'Charleston'];

export default function ContactBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const subjectRef = useRef(null);
  const replyToRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get('Name') || '').trim();
    const area = String(formData.get('DeliveryArea') || '').trim();
    const email = String(formData.get('Email') || '').trim();
    const arrivalDate = String(formData.get('ArrivalDate') || '').trim();

    const subjectParts = [];
    if (name) subjectParts.push(name);
    if (area) subjectParts.push(area);
    if (arrivalDate) subjectParts.push(arrivalDate);

    const subject = subjectParts.length
      ? `Rental Inquiry - ${subjectParts.join(' - ')}`
      : 'New QuickChoice Rentals Inquiry';

    if (subjectRef.current) subjectRef.current.value = subject;
    if (replyToRef.current) replyToRef.current.value = email;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('https://formspree.io/f/xqagbgrn', {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: new FormData(form)
      });

      if (!response.ok) {
        throw new Error('Unable to send message right now.');
      }

      form.reset();
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unable to send message right now.');
    }
  }

  return (
    <div className={styles.wrap}>
      {isOpen ? (
        <section id="contact-bubble-panel" className={`${styles.panel} card`} aria-label="Contact form">
          <div className={styles.panelHeader}>
            <div>
              <h2>Need help?</h2>
              <p>Send us a quick message.</p>
              <a href="tel:+18437145903" className={styles.phoneLink}>+1 (843) 714-5903</a>
            </div>
            <button
              type="button"
              className={styles.close}
              onClick={() => setIsOpen(false)}
              aria-label="Close contact form"
            >
              ×
            </button>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label>
              Name
              <input type="text" name="Name" required />
            </label>

            <label>
              Email
              <input type="email" name="Email" required />
            </label>

            <label>
              Delivery Area
              <select name="DeliveryArea" defaultValue="">
                <option value="" disabled>Select one</option>
                {deliveryAreas.map(area => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Arrival Date
              <input type="date" name="ArrivalDate" />
            </label>

            <label>
              Message
              <textarea name="Message" rows={4} placeholder="What are you looking for?" required />
            </label>

            <input type="hidden" name="_subject" ref={subjectRef} />
            <input type="hidden" name="_replyto" ref={replyToRef} />

            <button type="submit" className={`btn btnPrimary ${styles.submit}`} disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' ? (
              <p className={styles.success}>Thanks. We&apos;ll get back to you soon.</p>
            ) : null}

            {status === 'error' ? (
              <p className={styles.error}>{errorMessage}</p>
            ) : null}
          </form>
        </section>
      ) : null}

      <button
        type="button"
        className={styles.bubble}
        onClick={() => setIsOpen(open => !open)}
        aria-expanded={isOpen}
        aria-controls="contact-bubble-panel"
      >
        <span className={styles.bubbleIcon}>✉</span>
        <span className={styles.bubbleLabel}>Contact</span>
      </button>
    </div>
  );
}
