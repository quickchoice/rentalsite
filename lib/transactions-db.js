import { sql } from '@vercel/postgres';

let initialized = false;

async function ensureTransactionsTable() {
  if (initialized) return;

  await sql`
    CREATE TABLE IF NOT EXISTS rental_transactions (
      id BIGSERIAL PRIMARY KEY,
      stripe_session_id TEXT UNIQUE NOT NULL,
      stripe_event_id TEXT UNIQUE NOT NULL,
      payment_intent_id TEXT,
      customer_email TEXT,
      customer_name TEXT,
      amount_total_cents INTEGER NOT NULL,
      currency TEXT NOT NULL,
      day_count INTEGER,
      start_date TEXT,
      end_date TEXT,
      promo_applied BOOLEAN DEFAULT FALSE,
      line_items_text TEXT NOT NULL,
      customer_phone TEXT,
      customer_address TEXT,
      customer_zipcode TEXT,
      customer_state TEXT,
      arrival_date TEXT,
      delivery_area TEXT,
      referral_source TEXT,
      customer_message TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  // Backfill columns for pre-existing tables.
  await sql`ALTER TABLE rental_transactions ADD COLUMN IF NOT EXISTS customer_phone TEXT`;
  await sql`ALTER TABLE rental_transactions ADD COLUMN IF NOT EXISTS customer_address TEXT`;
  await sql`ALTER TABLE rental_transactions ADD COLUMN IF NOT EXISTS customer_zipcode TEXT`;
  await sql`ALTER TABLE rental_transactions ADD COLUMN IF NOT EXISTS customer_state TEXT`;
  await sql`ALTER TABLE rental_transactions ADD COLUMN IF NOT EXISTS arrival_date TEXT`;
  await sql`ALTER TABLE rental_transactions ADD COLUMN IF NOT EXISTS delivery_area TEXT`;
  await sql`ALTER TABLE rental_transactions ADD COLUMN IF NOT EXISTS referral_source TEXT`;
  await sql`ALTER TABLE rental_transactions ADD COLUMN IF NOT EXISTS customer_message TEXT`;

  initialized = true;
}

export async function saveTransaction(transaction) {
  await ensureTransactionsTable();

  const result = await sql`
    INSERT INTO rental_transactions (
      stripe_session_id,
      stripe_event_id,
      payment_intent_id,
      customer_email,
      customer_name,
      amount_total_cents,
      currency,
      day_count,
      start_date,
      end_date,
      promo_applied,
      line_items_text,
      customer_phone,
      customer_address,
      customer_zipcode,
      customer_state,
      arrival_date,
      delivery_area,
      referral_source,
      customer_message
    )
    VALUES (
      ${transaction.stripeSessionId},
      ${transaction.stripeEventId},
      ${transaction.paymentIntentId},
      ${transaction.customerEmail},
      ${transaction.customerName},
      ${transaction.amountTotalCents},
      ${transaction.currency},
      ${transaction.dayCount},
      ${transaction.startDate},
      ${transaction.endDate},
      ${transaction.promoApplied},
      ${transaction.lineItemsText},
      ${transaction.customerPhone},
      ${transaction.customerAddress},
      ${transaction.customerZipcode},
      ${transaction.customerState},
      ${transaction.arrivalDate},
      ${transaction.deliveryArea},
      ${transaction.referralSource},
      ${transaction.customerMessage}
    )
    ON CONFLICT (stripe_session_id) DO NOTHING
    RETURNING id
  `;

  return result.rowCount > 0;
}
