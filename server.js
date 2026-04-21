require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const crypto = require("crypto");
const path = require("path");
const ExcelJS = require("exceljs");

const db = require("./db");
const questions = require("./questions");
const { validateTC, hashTC, maskTC } = require("./utils/tc");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || null;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || null;
const JWT_SECRET = process.env.JWT_SECRET || "lutfen-env-dosyasini-doldur";
const COOKIE_NAME = "admin_token";
const CSRF_COOKIE = "csrf_token";
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 8; // 8 saat
const IS_PROD = process.env.NODE_ENV === "production";

// Vercel arkasında olduğumuz için req.ip'yi X-Forwarded-For üzerinden almak gerekli
app.set("trust proxy", 1);

// --- Security headers ---
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'"],
        "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        "font-src": ["'self'", "https://fonts.gstatic.com"],
        "img-src": ["'self'", "data:", "https://medikalfizik.org"],
        "connect-src": ["'self'"],
        "frame-ancestors": ["'none'"],
        "object-src": ["'none'"],
        "base-uri": ["'self'"]
      }
    },
    crossOriginEmbedderPolicy: false,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" }
  })
);

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(cookieParser());

// --- CSRF token middleware (double-submit cookie) ---
function ensureCsrfCookie(req, res, next) {
  if (!req.cookies[CSRF_COOKIE]) {
    const token = crypto.randomBytes(24).toString("hex");
    res.cookie(CSRF_COOKIE, token, {
      sameSite: "lax",
      secure: IS_PROD,
      maxAge: COOKIE_MAX_AGE
      // httpOnly KAPALI — admin.js okuyup header'da geri göndermeli
    });
    req.cookies[CSRF_COOKIE] = token;
  }
  next();
}

function requireCsrf(req, res, next) {
  const cookieToken = req.cookies[CSRF_COOKIE];
  const headerToken = req.headers["x-csrf-token"];
  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return res.status(403).json({ error: "CSRF doğrulaması başarısız." });
  }
  next();
}

// --- Rate limiters ---
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Çok fazla başarısız deneme. 15 dakika sonra tekrar deneyin." }
});

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Çok fazla istek. Bir saat sonra tekrar deneyin." }
});

const adminApiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false
});

// Static files
app.use(express.static(path.join(__dirname, "public"), { index: false }));

// CSRF cookie HTML istekleri için her zaman set edilsin
app.get("/", ensureCsrfCookie, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/admin/login.html", ensureCsrfCookie, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin", "login.html"));
});
app.get("/admin/index.html", ensureCsrfCookie, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin", "index.html"));
});

// --- Public API ---

app.get("/api/questions", (req, res) => {
  res.json(questions);
});

app.post("/api/submit", submitLimiter, ensureCsrfCookie, requireCsrf, async (req, res) => {
  try {
    const { ad, soyad, tc, answers } = req.body || {};
    if (!ad || !soyad || !tc) {
      return res.status(400).json({ error: "Ad, soyad ve TC zorunludur." });
    }
    const adClean = String(ad).trim().slice(0, 60);
    const soyadClean = String(soyad).trim().slice(0, 60);
    const tcClean = String(tc).trim();

    if (adClean.length < 2 || soyadClean.length < 2) {
      return res.status(400).json({ error: "Ad ve soyad en az 2 karakter olmalıdır." });
    }
    if (!validateTC(tcClean)) {
      return res.status(400).json({ error: "Geçersiz TC Kimlik No." });
    }

    const tcHash = hashTC(tcClean);
    const tcMasked = maskTC(tcClean);

    const existing = await db.findByTCHash(tcHash);
    if (existing) {
      return res.status(409).json({ error: "Bu TC ile daha önce anket doldurulmuş." });
    }

    const answersObj = answers && typeof answers === "object" ? answers : {};
    const normalized = {};
    for (const q of questions) {
      let v = answersObj[q.id];
      if (q.hasOther) {
        const otherText = answersObj[q.id + "__other"];
        if (Array.isArray(v)) {
          v = v.map((x) =>
            x === "Diğer" && otherText ? `Diğer: ${String(otherText).trim().slice(0, 500)}` : x
          );
        } else if (v === "Diğer" && otherText) {
          v = `Diğer: ${String(otherText).trim().slice(0, 500)}`;
        }
      }
      if (q.required) {
        const empty =
          v === undefined ||
          v === null ||
          (typeof v === "string" && !v.trim()) ||
          (Array.isArray(v) && v.length === 0);
        if (empty) {
          return res.status(400).json({ error: `"${q.text}" sorusu zorunludur.` });
        }
      }
      if (v !== undefined) normalized[q.id] = v;
    }

    const inserted = await db.insertResponse({
      ad: adClean,
      soyad: soyadClean,
      tcHash,
      tcMasked,
      answers: normalized
    });
    res.json({ ok: true, id: inserted.id });
  } catch (err) {
    console.error("[submit]", err && err.message ? err.message : err);
    res.status(500).json({ error: "Sunucu hatası." });
  }
});

// --- Admin auth ---

function signToken() {
  return jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: "8h" });
}

function verifyPassword(input) {
  if (typeof input !== "string" || !input) return false;
  if (ADMIN_PASSWORD_HASH) {
    try {
      return bcrypt.compareSync(input, ADMIN_PASSWORD_HASH);
    } catch {
      return false;
    }
  }
  if (ADMIN_PASSWORD) {
    // Timing-safe plain karşılaştırma (geçici geri uyumluluk)
    const a = Buffer.from(input);
    const b = Buffer.from(ADMIN_PASSWORD);
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  }
  return false;
}

function requireAdmin(req, res, next) {
  const token = req.cookies[COOKIE_NAME];
  if (!token) return unauthorized(req, res);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.admin) return unauthorized(req, res);
    next();
  } catch {
    unauthorized(req, res);
  }
}

function unauthorized(req, res) {
  if (req.path.startsWith("/admin/api/")) {
    return res.status(401).json({ error: "Yetkisiz." });
  }
  return res.redirect("/admin/login.html");
}

app.post("/admin/login", loginLimiter, ensureCsrfCookie, requireCsrf, (req, res) => {
  const { username, password } = req.body || {};
  const userOk = typeof username === "string" && username === ADMIN_USERNAME;
  const passOk = verifyPassword(password);
  if (userOk && passOk) {
    const token = signToken();
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "strict",
      secure: IS_PROD,
      maxAge: COOKIE_MAX_AGE
    });
    return res.json({ ok: true });
  }
  res.status(401).json({ error: "Hatalı kullanıcı adı veya şifre." });
});

app.post("/admin/logout", ensureCsrfCookie, requireCsrf, (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.json({ ok: true });
});

// --- Admin API ---

app.use("/admin/api", adminApiLimiter);

app.get("/admin/api/responses", requireAdmin, async (req, res) => {
  try {
    const rows = await db.listResponses();
    res.json({ questions, responses: rows });
  } catch (err) {
    console.error("[responses]", err && err.message ? err.message : err);
    res.status(500).json({ error: "Liste alınamadı." });
  }
});

app.delete("/admin/api/responses/:id", requireAdmin, requireCsrf, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: "Geçersiz id." });
    await db.deleteResponse(id);
    res.json({ ok: true });
  } catch (err) {
    console.error("[delete]", err && err.message ? err.message : err);
    res.status(500).json({ error: "Silme hatası." });
  }
});

// --- Excel export ---

function formatAnswerForExcel(q, value) {
  if (value === undefined || value === null) return "";
  if (Array.isArray(value)) return value.join(", ");
  return String(value);
}

async function buildWorkbook(rows) {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Anket Web";
  wb.created = new Date();

  const ws = wb.addWorksheet("Anket Sonuçları");

  const columns = [
    { header: "ID", key: "id", width: 8 },
    { header: "Ad", key: "ad", width: 18 },
    { header: "Soyad", key: "soyad", width: 18 },
    { header: "TC (maskeli)", key: "tc_masked", width: 16 },
    { header: "Tarih", key: "created_at", width: 20 }
  ];
  for (const q of questions) {
    columns.push({ header: q.text, key: q.id, width: 30 });
  }
  ws.columns = columns;

  ws.getRow(1).font = { bold: true };
  ws.getRow(1).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
  ws.getRow(1).height = 32;

  for (const r of rows) {
    const row = {
      id: r.id,
      ad: r.ad,
      soyad: r.soyad,
      tc_masked: r.tc_masked,
      created_at: r.created_at
    };
    for (const q of questions) {
      row[q.id] = formatAnswerForExcel(q, (r.answers || {})[q.id]);
    }
    ws.addRow(row);
  }
  ws.eachRow((row) => {
    row.alignment = { vertical: "top", wrapText: true };
  });

  return wb;
}

function buildIndividualWorkbook(r) {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Anket Web";
  const ws = wb.addWorksheet("Anket");
  ws.columns = [
    { header: "Alan", key: "alan", width: 35 },
    { header: "Değer", key: "deger", width: 50 }
  ];
  ws.getRow(1).font = { bold: true };

  ws.addRow({ alan: "ID", deger: r.id });
  ws.addRow({ alan: "Ad", deger: r.ad });
  ws.addRow({ alan: "Soyad", deger: r.soyad });
  ws.addRow({ alan: "TC (maskeli)", deger: r.tc_masked });
  ws.addRow({ alan: "Tarih", deger: r.created_at });
  ws.addRow({});
  const headerRow = ws.addRow({ alan: "SORU", deger: "CEVAP" });
  headerRow.font = { bold: true };
  for (const q of questions) {
    ws.addRow({ alan: q.text, deger: formatAnswerForExcel(q, (r.answers || {})[q.id]) });
  }
  ws.eachRow((row) => {
    row.alignment = { vertical: "top", wrapText: true };
  });
  return wb;
}

app.get("/admin/api/export/all", requireAdmin, async (req, res) => {
  try {
    const rows = await db.listResponsesAsc();
    const wb = await buildWorkbook(rows);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="anket-tumu-${Date.now()}.xlsx"`
    );
    await wb.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("[export-all]", err && err.message ? err.message : err);
    res.status(500).json({ error: "Export hatası." });
  }
});

app.get("/admin/api/export/:id", requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const row = await db.getResponse(id);
    if (!row) return res.status(404).json({ error: "Bulunamadı." });
    const wb = buildIndividualWorkbook(row);
    const safeName = `${row.ad}-${row.soyad}`.replace(/[^a-zA-Z0-9-_]/g, "_");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="anket-${safeName}-${id}.xlsx"`
    );
    await wb.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("[export-id]", err && err.message ? err.message : err);
    res.status(500).json({ error: "Export hatası." });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Anket web çalışıyor: http://localhost:${PORT}`);
    console.log(`Admin paneli: http://localhost:${PORT}/admin/login.html`);
  });
}

module.exports = app;
