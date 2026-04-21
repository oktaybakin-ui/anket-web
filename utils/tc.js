const crypto = require("crypto");

function validateTC(tc) {
  if (!tc || typeof tc !== "string") return false;
  if (!/^\d{11}$/.test(tc)) return false;
  const digits = tc.split("").map(Number);
  if (digits[0] === 0) return false;

  const sumOdd = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
  const sumEven = digits[1] + digits[3] + digits[5] + digits[7];
  const digit10 = (sumOdd * 7 - sumEven) % 10;
  if (digit10 < 0 || digit10 !== digits[9]) return false;

  const sumFirst10 = digits.slice(0, 10).reduce((a, b) => a + b, 0);
  if (sumFirst10 % 10 !== digits[10]) return false;

  return true;
}

// KVKK: TC'yi salt ile SHA-256 hash'ler. Salt JWT_SECRET'ten türetilir,
// böylece hash rainbow table saldırılarına karşı dayanıklı olur.
function hashTC(tc) {
  const salt = process.env.TC_HASH_SALT || process.env.JWT_SECRET || "";
  return crypto.createHash("sha256").update(salt + ":" + tc).digest("hex");
}

function maskTC(tc) {
  if (!tc || tc.length !== 11) return "***";
  return tc.substring(0, 3) + "****" + tc.substring(7, 11);
}

module.exports = { validateTC, hashTC, maskTC };
