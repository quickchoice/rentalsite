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
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

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
      line_items_text
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
      ${transaction.lineItemsText}
    )
    ON CONFLICT (stripe_session_id) DO NOTHING
    RETURNING id
  `;

  return result.rowCount > 0;
}
