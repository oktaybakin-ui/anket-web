// Hafif Resend HTTP istemcisi — Vercel serverless için uygun
// Gerekli env: RESEND_API_KEY, MAIL_FROM, MAIL_TO
//
// attachments: [{ filename, content (base64 string) }]
// Resend formatı: https://resend.com/docs/api-reference/emails/send-email

async function sendMail({ to, subject, html, text, attachments }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  if (!apiKey || !from) {
    console.warn("[mail] RESEND_API_KEY veya MAIL_FROM tanımlı değil; e-posta gönderilmiyor.");
    return { skipped: true };
  }

  const payload = {
    from,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    text
  };
  if (Array.isArray(attachments) && attachments.length) {
    payload.attachments = attachments;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${body.slice(0, 300)}`);
  }
  return res.json();
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

module.exports = { sendMail, escapeHtml };
