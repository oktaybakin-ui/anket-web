// Basit ama güvenli RFC 5322 e-posta doğrulaması
const EMAIL_RE = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i;

function validateEmail(value) {
  if (typeof value !== "string") return false;
  const v = value.trim();
  if (v.length < 5 || v.length > 254) return false;
  return EMAIL_RE.test(v);
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

module.exports = { validateEmail, normalizeEmail };
