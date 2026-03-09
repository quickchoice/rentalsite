function dedupeEmails(recipients) {
  return Array.from(new Set(recipients.filter(Boolean).map(email => email.trim().toLowerCase())));
}

export async function sendTransactionSummaryEmail({
  resendApiKey,
  fromEmail,
  danteEmail,
  customerEmail,
  subject,
  bodyText
}) {
  const to = dedupeEmails([danteEmail, customerEmail]);
  if (!to.length) return;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromEmail,
      to,
      subject,
      text: bodyText
    }),
    cache: 'no-store'
  });

  if (!response.ok) {
    const payload = await response.text();
    throw new Error(`Resend error (${response.status}): ${payload}`);
  }
}
