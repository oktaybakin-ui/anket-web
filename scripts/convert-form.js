// Google Form FB_PUBLIC_LOAD_DATA_ → questions.js dönüştürücü
// Kullanım: node scripts/convert-form.js > questions.js
const fs = require("fs");
const path = require("path");

const data = JSON.parse(fs.readFileSync("/tmp/form_data.json", "utf-8"));
const items = data[1][1];

// Google Forms tip kodları
const TYPE_TEXT = 0;
const TYPE_PARAGRAPH = 1;
const TYPE_RADIO = 2;
const TYPE_DROPDOWN = 3;
const TYPE_CHECKBOX = 4;
const TYPE_SCALE = 5;
const TYPE_GRID = 7;
const TYPE_SECTION = 8;
const TYPE_SCALE2 = 18; // bizim formdaki diğer scale

// Slug ID üretici (Google numerik id'leri yerine kısa, anlamlı id)
function slugify(text, fallback) {
  const m = (text || "").match(/(S\d+|6[a-e])/i);
  if (m) return m[1].toLowerCase().replace("ş", "s");
  return fallback;
}

// Sadece soru başlığını al (önekleri ve tanımları temizle)
function cleanTitle(t) {
  if (!t) return "";
  // BÖLÜM başlığını kaldır
  let v = t;
  v = v.replace(/^BÖLÜM\s+\d+[^\n]*\n+/i, "");
  v = v.replace(/^GRUP\s+\d+[^\n]*\n+/i, "");
  // S1- veya S1 - öneklerini koru ama bölüm açıklamasını temizle
  v = v.replace(/\n\s*\n/g, "\n").trim();
  return v;
}

// Ana bölüm (section title) çıkar
function extractSection(title) {
  const m = (title || "").match(/(BÖLÜM\s+\d+[^\n]*)/i);
  if (m) return m[1].replace(/^BÖLÜM/, "BÖLÜM").trim();
  return null;
}

// 1. Önce tüm öğeleri tara, hangi sectionId'lerden hangi rotalar gidiyor
// Her radio sorusu cevabına göre option[2] = goToItemId
// SECTION (type 8) item'ları arada page break gibidir
// goTo = -1 önceki section'a, -2 form sonu, -3 gönder

// Strateji: Form'u lineer akışta sıraya koy, ama dallanmaları showIf ile temsil et.
// Bizim akış sadece tek bir "yol" çiziyor. showIf ile koşullu sorular.
//
// Dallanma noktası 1: S6 (id 1592281238)
//   - "Evet" → section 1128462934 (idx 7)
//   - "Hayır" → section 488416181 (idx 60)
// Dallanma noktası 2: S49 (id 420925542)
//   - "Radyasyon Onkoloğu" → section 1825787695 (idx 51)
//   - "Medikal Fizik Uzmanı" → -3 (form sonu)

// Section id'leri ve aralıkları
const sections = [];
items.forEach((it, i) => {
  if (it[3] === TYPE_SECTION) {
    sections.push({ idx: i, id: it[0], title: it[1] });
  }
});

// Section'a ait soruların aralığı (next section'a kadar)
function rangeOfSection(idx) {
  const next = sections.find((s) => s.idx > idx);
  return [idx + 1, next ? next.idx : items.length];
}

// Üretilecek questions array
const out = [];
let currentSection = null;

// İlk öğe onam, biz onam'ı UI'da KVKK kutusu olarak sunduğumuz için anket sorularına dahil etmiyoruz.
// Onam zaten "Ankete Başla"da kabul ediliyor.

// Bölüm 1 — koşulsuz: S1-S6
// EVET yolu: idx 7-49 (sectionId 1128462934)
// Onkolog alt yolu: idx 51-59 (sectionId 1825787695, S49 = "Radyasyon Onkoloğu")
// HAYIR yolu: idx 60-65 (sectionId 488416181)

// Branch koşulları:
const EVET_SECTION_ID = 1128462934;
const HAYIR_SECTION_ID = 488416181;
const ONKOLOG_SECTION_ID = 1825787695;
const Q_RE_RT_VAR_MI = "s6";
const Q_MESLEK = "s49";

function showIfFromIdx(idx) {
  // Hangi section içindeyim?
  const containing = [...sections].reverse().find((s) => s.idx < idx);
  if (!containing) return null;
  if (containing.id === EVET_SECTION_ID) {
    return { id: Q_RE_RT_VAR_MI, equals: "Evet" };
  }
  if (containing.id === HAYIR_SECTION_ID) {
    return { id: Q_RE_RT_VAR_MI, equals: "Hayır" };
  }
  if (containing.id === ONKOLOG_SECTION_ID) {
    // Hem S6=Evet hem S49=Radyasyon Onkoloğu
    return { allOf: [
      { id: Q_RE_RT_VAR_MI, equals: "Evet" },
      { id: Q_MESLEK, equals: "Radyasyon Onkoloğu" }
    ]};
  }
  return null;
}

// Ana loop: items[1..] (0 = onam, atla)
items.forEach((it, idx) => {
  if (idx === 0) return; // onam
  const type = it[3];
  if (type === TYPE_SECTION) {
    // Section header — UI'da bölüm başlığı olarak kullanılabilir
    return;
  }

  const id = slugify(it[1], "q" + idx);
  const text = cleanTitle(it[1]);
  const showIf = showIfFromIdx(idx);

  // Bölüm başlığı tespiti (BÖLÜM ile başlayan sorular)
  const sectionMatch = (it[1] || "").match(/BÖLÜM\s+\d+[^\n]*/i);
  if (sectionMatch) currentSection = sectionMatch[0].trim();

  const q = {
    id,
    text,
    section: currentSection
  };
  if (showIf) q.showIf = showIf;

  if (type === TYPE_RADIO) {
    q.type = "radio";
    const opts = (it[4] && it[4][0] && it[4][0][1]) || [];
    q.options = opts.filter((o) => o[4] !== 1).map((o) => o[0]);
    if (opts.some((o) => o[4] === 1)) q.hasOther = true;
    q.required = it[4][0][2] === 1;
  } else if (type === TYPE_CHECKBOX) {
    q.type = "checkbox";
    const opts = (it[4] && it[4][0] && it[4][0][1]) || [];
    q.options = opts.filter((o) => o[4] !== 1).map((o) => o[0]);
    if (opts.some((o) => o[4] === 1)) q.hasOther = true;
    q.required = it[4][0][2] === 1;
  } else if (type === TYPE_DROPDOWN) {
    q.type = "radio"; // bizde dropdown yerine radio göster
    const opts = (it[4] && it[4][0] && it[4][0][1]) || [];
    q.options = opts.map((o) => o[0]);
    q.required = it[4][0][2] === 1;
  } else if (type === TYPE_TEXT) {
    q.type = "text";
    q.required = it[4] && it[4][0] ? it[4][0][2] === 1 : false;
  } else if (type === TYPE_PARAGRAPH) {
    q.type = "textarea";
    q.required = it[4] && it[4][0] ? it[4][0][2] === 1 : false;
  } else if (type === TYPE_GRID) {
    q.type = "grid";
    q.rows = (it[4] || []).map((r) => (r[3] && r[3][0]) || "");
    // Sütunlar tüm satırlarda aynı varsayılır
    const firstRow = (it[4] && it[4][0]) || [];
    q.columns = (firstRow[1] || []).map((c) => c[0]);
    q.required = firstRow[2] === 1;
  } else if (type === TYPE_SCALE || type === TYPE_SCALE2) {
    q.type = "radio";
    const inner = (it[4] && it[4][0]) || [];
    q.options = (inner[1] || []).map((c) => c[0]);
    q.required = inner[2] === 1;
  } else {
    return; // bilinmeyen tip atla
  }

  out.push(q);
});

// Çıktıyı yaz
const header = `// Otomatik üretildi: scripts/convert-form.js
// Kaynak: Türkiye'de Yeniden Işınlama İş Akışı Anketi (Google Forms)
// EL DEĞİŞTİRMEYİN — sorular Google Form'dan dönüştürülmüştür.

const questions = `;

const helper = `

// Belirli bir sorunun, mevcut cevaplara göre görünür olup olmadığını döndürür.
function isQuestionVisible(q, answers) {
  if (!q || !q.showIf) return true;
  const cond = q.showIf;
  if (cond.allOf) return cond.allOf.every((c) => matchCond(c, answers));
  return matchCond(cond, answers);
}

function matchCond(cond, answers) {
  if (!cond || !cond.id) return true;
  const v = answers ? answers[cond.id] : undefined;
  if (cond.equals !== undefined) {
    if (Array.isArray(v)) return v.includes(cond.equals);
    return v === cond.equals;
  }
  if (cond.in && Array.isArray(cond.in)) {
    if (Array.isArray(v)) return v.some((x) => cond.in.includes(x));
    return cond.in.includes(v);
  }
  return true;
}

module.exports = { questions, isQuestionVisible };
`;

console.log(header + JSON.stringify(out, null, 2) + ";\n" + helper);
