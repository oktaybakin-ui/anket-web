// Hassas kolon şifrelemesi (AES-256-GCM)
// DB'de yalnızca şifreli (IV+tag+ciphertext) base64 string saklanır.
// Anahtar yalnızca sunucu tarafında, Vercel env var DATA_ENCRYPTION_KEY içinde tutulur.

const crypto = require("crypto");

const KEY_HEX = process.env.DATA_ENCRYPTION_KEY || "";
const KEY = KEY_HEX ? Buffer.from(KEY_HEX, "hex") : null;

function ensureKey() {
  if (!KEY || KEY.length !== 32) {
    throw new Error(
      "[crypto] DATA_ENCRYPTION_KEY tanımlı değil veya 32-byte hex değil."
    );
  }
}

function encrypt(plaintext) {
  if (plaintext == null) return null;
  ensureKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", KEY, iv);
  const data = Buffer.concat([
    cipher.update(String(plaintext), "utf8"),
    cipher.final()
  ]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, data]).toString("base64");
}

function decrypt(payload) {
  if (payload == null) return null;
  try {
    ensureKey();
    const buf = Buffer.from(payload, "base64");
    if (buf.length < 28) return null; // en az iv(12)+tag(16) olmalı
    const iv = buf.subarray(0, 12);
    const tag = buf.subarray(12, 28);
    const data = buf.subarray(28);
    const decipher = crypto.createDecipheriv("aes-256-gcm", KEY, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
  } catch (err) {
    console.error("[crypto] decrypt failed:", err && err.message ? err.message : err);
    return null;
  }
}

module.exports = { encrypt, decrypt };
