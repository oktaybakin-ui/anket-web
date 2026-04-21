#!/usr/bin/env node
// Kullanım:  node scripts/hash-password.js "ParolanizBuraya"
const bcrypt = require("bcryptjs");
const pw = process.argv[2];
if (!pw) {
  console.error("Hata: parola belirtin.\nKullanım: node scripts/hash-password.js \"ParolanizBuraya\"");
  process.exit(1);
}
console.log(bcrypt.hashSync(pw, 12));
