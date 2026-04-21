require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const path = require("path");
const ExcelJS = require("exceljs");

const db = require("./db");
const questions = require("./questions");
const { validateTC } = require("./utils/tc");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "degistir123";
const JWT_SECRET = process.env.JWT_SECRET || "lutfen-env-dosyasini-doldur";
const COOKIE_NAME = "admin_token";
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 8; // 8 saat

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// --- Public API ---

app.get("/api/questions", (req, res) => {
  res.json(questions);
});

app.post("/api/submit", async (req, res) => {
  try {
    const { ad, soyad, tc, answers } = req.body || {};
    if (!ad || !soyad || !tc) {
      return res.status(400).json({ error: "Ad, soyad ve TC zorunludur." });
    }
    const adClean = String(ad).trim();
    const soyadClean = String(soyad).trim();
    const tcClean = String(tc).trim();

    if (adClean.length < 2 || soyadClean.length < 2) {
      return res.status(400).json({ error: "Ad ve soyad en az 2 karakter olmalıdır." });
    }
    if (!validateTC(tcClean)) {
      return res.status(400).json({ error: "Geçersiz TC Kimlik No." });
    }

    const existing = await db.findByTC(tcClean);
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
            x === "Diğer" && otherText ? `Diğer: ${String(otherText).trim()}` : x
          );
        } else if (v === "Diğer" && otherText) {
          v = `Diğer: ${String(otherText).trim()}`;
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
      tc: tcClean,
      answers: normalized
    });
    res.json({ ok: true, id: inserted.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sunucu hatası." });
  }
});

// --- Admin auth ---

function signToken() {
  return jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: "8h" });
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

app.post("/admin/login", (req, res) => {
  const { username, password } = req.body || {};
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = signToken();
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: COOKIE_MAX_AGE
    });
    return res.json({ ok: true });
  }
  res.status(401).json({ error: "Hatalı kullanıcı adı veya şifre." });
});

app.post("/admin/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.json({ ok: true });
});

// --- Admin API ---

app.get("/admin/api/responses", requireAdmin, async (req, res) => {
  try {
    const rows = await db.listResponses();
    res.json({ questions, responses: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Liste alınamadı." });
  }
});

app.delete("/admin/api/responses/:id", requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: "Geçersiz id." });
    await db.deleteResponse(id);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
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
    { header: "TC", key: "tc", width: 15 },
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
      tc: r.tc,
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
  ws.addRow({ alan: "TC", deger: r.tc });
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
    console.error(err);
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
    console.error(err);
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
