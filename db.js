const { createClient } = require("@supabase/supabase-js");
const { encrypt, decrypt } = require("./utils/crypto");
const { hashEmail, normalizeEmail } = require("./utils/contact");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.warn(
    "[db] SUPABASE_URL veya SUPABASE_SERVICE_KEY tanımlı değil. .env dosyasını kontrol edin."
  );
}

const supabase = createClient(SUPABASE_URL || "", SUPABASE_SERVICE_KEY || "", {
  auth: { persistSession: false }
});

const TABLE = "responses";
// Şifreli kolonlar + meta
const SELECT_COLS =
  "id, ad_enc, soyad_enc, email_enc, email_hash, answers, started_at, completed_at, created_at";

// DB'den dönen satırı uygulama formatına çözer (decrypt PII)
function decryptRow(r) {
  if (!r) return r;
  return {
    id: r.id,
    ad: decrypt(r.ad_enc) || "",
    soyad: decrypt(r.soyad_enc) || "",
    email: decrypt(r.email_enc) || "",
    answers: r.answers,
    started_at: r.started_at,
    completed_at: r.completed_at,
    created_at: r.created_at
  };
}

async function findByEmail(email) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("id, completed_at")
    .eq("email_hash", hashEmail(email))
    .maybeSingle();
  if (error) throw error;
  return data;
}

async function startAttempt({ ad, soyad, email }) {
  const existing = await findByEmail(email);
  if (existing) return existing;

  const normEmail = normalizeEmail(email);
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      ad_enc: encrypt(ad),
      soyad_enc: encrypt(soyad),
      email_enc: encrypt(normEmail),
      email_hash: hashEmail(normEmail),
      answers: {},
      started_at: new Date().toISOString(),
      completed_at: null
    })
    .select("id, completed_at")
    .single();
  if (error) throw error;
  return data;
}

async function completeResponse({ ad, soyad, email, answers }) {
  const existing = await findByEmail(email);
  if (existing && existing.completed_at) {
    const err = new Error("Bu e-posta ile daha önce anket doldurulmuş.");
    err.code = "ALREADY_COMPLETED";
    throw err;
  }
  const completedAt = new Date().toISOString();
  const normEmail = normalizeEmail(email);
  if (existing) {
    const { data, error } = await supabase
      .from(TABLE)
      .update({
        ad_enc: encrypt(ad),
        soyad_enc: encrypt(soyad),
        answers,
        completed_at: completedAt
      })
      .eq("id", existing.id)
      .select("id")
      .single();
    if (error) throw error;
    return data;
  }
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      ad_enc: encrypt(ad),
      soyad_enc: encrypt(soyad),
      email_enc: encrypt(normEmail),
      email_hash: hashEmail(normEmail),
      answers,
      started_at: completedAt,
      completed_at: completedAt
    })
    .select("id")
    .single();
  if (error) throw error;
  return data;
}

async function listResponses() {
  const { data, error } = await supabase
    .from(TABLE)
    .select(SELECT_COLS)
    .order("started_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(decryptRow);
}

async function listResponsesAsc() {
  const { data, error } = await supabase
    .from(TABLE)
    .select(SELECT_COLS)
    .order("id", { ascending: true });
  if (error) throw error;
  return (data || []).map(decryptRow);
}

async function getResponse(id) {
  const { data, error } = await supabase
    .from(TABLE)
    .select(SELECT_COLS)
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return decryptRow(data);
}

async function deleteResponse(id) {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}

module.exports = {
  supabase,
  findByEmail,
  startAttempt,
  completeResponse,
  listResponses,
  listResponsesAsc,
  getResponse,
  deleteResponse
};
