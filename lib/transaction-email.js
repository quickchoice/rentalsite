function dedupeEmails(recipients) {
  return Array.from(new Set(recipients.filter(Boolean).map(email => email.trim().toLowerCase())));
}

async function sendOne({ resendApiKey, fromEmail, toEmail, subject, bodyText }) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject,
      text: bodyText
    }),
    cache: 'no-store'
  });

  if (!response.ok) {
    const payload = await response.text();
    return { toEmail, ok: false, error: `Resend error (${response.status}): ${payload}` };
  }

  return { toEmail, ok: true };
}

export async function sendTransactionSummaryEmail({
  resendApiKey,
  fromEmail,
  danteEmail,
  subject,
  bodyText
}) {
  const recipients = dedupeEmails([danteEmail]);
  if (!recipients.length) return [];

  const results = [];
  for (const recipient of recipients) {
    // Send separately so one bad recipient doesn't block all deliveries.
    const result = await sendOne({
      resendApiKey,
      fromEmail,
      toEmail: recipient,
      subject,
      bodyText
    });
    results.push(result);
  }

  return results;
}
