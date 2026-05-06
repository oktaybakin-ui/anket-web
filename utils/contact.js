const dns = require("dns").promises;
const crypto = require("crypto");

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

// E-posta için deterministik hash — uniqueness lookup için.
// EMAIL_HASH_SALT veya JWT_SECRET salt olarak kullanılır (sızıntıda rainbow table direnci).
function hashEmail(email) {
  const salt = process.env.EMAIL_HASH_SALT || process.env.JWT_SECRET || "";
  const normalized = normalizeEmail(email);
  return crypto.createHash("sha256").update(salt + ":" + normalized).digest("hex");
}

// Domain MX doğrulama cache (TTL 30 dk) — aynı domain'i defalarca DNS sorgulamamak için
const mxCache = new Map();
const MX_CACHE_TTL = 30 * 60 * 1000;

function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`${label || "dns"} timeout`)), ms)
    )
  ]);
}

// E-posta domaininin gerçek bir mail sunucusu olup olmadığını kontrol eder.
// Önce MX kayıtlarına bakar; yoksa A/AAAA kayıtlarına geri düşer (RFC 5321 fallback).
// Network/DNS arızasında "true" döner ki gerçek kullanıcı engellenmesin.
// "Domain yok" anlamına gelen DNS hata kodları
const NXDOMAIN_CODES = new Set(["ENOTFOUND", "NXDOMAIN", "ENODATA"]);

async function hasValidEmailDomain(email) {
  if (!email || typeof email !== "string" || !email.includes("@")) return false;
  const domain = email.split("@")[1];
  if (!domain || domain.length < 3) return false;

  // Cache
  const cached = mxCache.get(domain);
  if (cached && Date.now() - cached.t < MX_CACHE_TTL) return cached.ok;

  let nxSignals = 0;

  // MX kayıtları — birincil kontrol
  try {
    const records = await withTimeout(dns.resolveMx(domain), 4000, "mx");
    if (Array.isArray(records) && records.length > 0) {
      mxCache.set(domain, { ok: true, t: Date.now() });
      return true;
    }
  } catch (err) {
    if (err && NXDOMAIN_CODES.has(err.code)) nxSignals++;
  }

  // A record fallback (RFC 5321: MX yoksa A geçerli sayılabilir)
  try {
    const a = await withTimeout(dns.resolve4(domain), 3000, "a");
    if (Array.isArray(a) && a.length > 0) {
      mxCache.set(domain, { ok: true, t: Date.now() });
      return true;
    }
  } catch (err) {
    if (err && NXDOMAIN_CODES.has(err.code)) nxSignals++;
  }

  // AAAA record fallback
  try {
    const aaaa = await withTimeout(dns.resolve6(domain), 3000, "aaaa");
    if (Array.isArray(aaaa) && aaaa.length > 0) {
      mxCache.set(domain, { ok: true, t: Date.now() });
      return true;
    }
  } catch (err) {
    if (err && NXDOMAIN_CODES.has(err.code)) nxSignals++;
  }

  // En az bir DNS sorgusu açıkça "domain yok" dediyse → reddet
  if (nxSignals >= 1) {
    mxCache.set(domain, { ok: false, t: Date.now() });
    return false;
  }

  // Tüm sorgular timeout/REFUSED gibi belirsiz hata verdi — kullanıcıyı engelleme
  return true;
}

module.exports = { validateEmail, normalizeEmail, hashEmail, hasValidEmailDomain };
