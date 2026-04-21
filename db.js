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
// Admin panelde/Excel'de gösterilecek kolonlar — TC yerine sadece maskelenmiş hali
const SELECT_COLS = "id, ad, soyad, tc_masked, answers, created_at";

async function findByTCHash(tcHash) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("id")
    .eq("tc_hash", tcHash)
    .maybeSingle();
  if (error) throw error;
  return data;
}

async function insertResponse({ ad, soyad, tcHash, tcMasked, answers }) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert({ ad, soyad, tc_hash: tcHash, tc_masked: tcMasked, answers })
    .select("id")
    .single();
  if (error) throw error;
  return data;
}

async function listResponses() {
  const { data, error } = await supabase
    .from(TABLE)
    .select(SELECT_COLS)
    .order("id", { ascending: false });
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
  insertResponse,
  listResponses,
  listResponsesAsc,
  getResponse,
  deleteResponse
};
