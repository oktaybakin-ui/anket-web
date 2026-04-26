const { createClient } = require("@supabase/supabase-js");

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
const SELECT_COLS =
  "id, ad, soyad, tc_masked, answers, started_at, completed_at, created_at";

async function findByTCHash(tcHash) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("id, completed_at")
    .eq("tc_hash", tcHash)
    .maybeSingle();
  if (error) throw error;
  return data;
}

// "Ankete Başla"ya basınca: kullanıcıyı yarı kalmış olarak kaydet
// (varsa dokunma, yoksa yeni satır)
async function startAttempt({ ad, soyad, tcHash, tcMasked }) {
  const existing = await findByTCHash(tcHash);
  if (existing) return existing; // zaten başlamış (veya tamamlamış)

  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      ad,
      soyad,
      tc_hash: tcHash,
      tc_masked: tcMasked,
      answers: {},
      started_at: new Date().toISOString(),
      completed_at: null
    })
    .select("id, completed_at")
    .single();
  if (error) throw error;
  return data;
}

// "Anketi Gönder"e basınca: yarım kalan satırı tamamla; yoksa yeni ekle
async function completeResponse({ ad, soyad, tcHash, tcMasked, answers }) {
  const existing = await findByTCHash(tcHash);
  if (existing && existing.completed_at) {
    const err = new Error("Bu TC ile daha önce anket doldurulmuş.");
    err.code = "ALREADY_COMPLETED";
    throw err;
  }
  const completedAt = new Date().toISOString();
  if (existing) {
    const { data, error } = await supabase
      .from(TABLE)
      .update({ ad, soyad, tc_masked: tcMasked, answers, completed_at: completedAt })
      .eq("id", existing.id)
      .select("id")
      .single();
    if (error) throw error;
    return data;
  }
  // /api/start çağrılmadan direkt submit edilmiş (örn. eski client)
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      ad,
      soyad,
      tc_hash: tcHash,
      tc_masked: tcMasked,
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
  return data || [];
}

async function listResponsesAsc() {
  const { data, error } = await supabase
    .from(TABLE)
    .select(SELECT_COLS)
    .order("id", { ascending: true });
  if (error) throw error;
  return data || [];
}

async function getResponse(id) {
  const { data, error } = await supabase
    .from(TABLE)
    .select(SELECT_COLS)
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

async function deleteResponse(id) {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}

module.exports = {
  supabase,
  findByTCHash,
  startAttempt,
  completeResponse,
  listResponses,
  listResponsesAsc,
  getResponse,
  deleteResponse
};
