const OTHER_LABEL = "Diğer";
const identity = { ad: "", soyad: "", email: "" };
let allQuestions = [];

function readCookie(name) {
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[1]) : "";
}

function el(tag, attrs = {}, ...children) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") n.className = v;
    else if (k === "html") n.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v);
  }
  for (const c of children) {
    if (c == null) continue;
    n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return n;
}

// ====== Dallanma değerlendirici ======
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

function isVisible(q, answers) {
  if (!q || !q.showIf) return true;
  const c = q.showIf;
  if (c.allOf) return c.allOf.every((x) => matchCond(x, answers));
  return matchCond(c, answers);
}

// ====== Soru render fonksiyonları ======
function renderQuestion(q) {
  const wrap = el("div", { class: "question", id: `q-${q.id}`, "data-id": q.id });
  const qtext = el("div", { class: "qtext" });
  qtext.appendChild(el("span", { class: "num" }, q.id));
  qtext.appendChild(document.createTextNode(" " + q.text + (q.required ? " *" : "")));
  wrap.appendChild(qtext);

  if (q.type === "text") {
    const i = el("input", { type: "text", name: q.id });
    if (q.required) i.setAttribute("required", "");
    wrap.appendChild(i);
    return wrap;
  }
  if (q.type === "textarea") {
    const ta = el("textarea", { name: q.id });
    if (q.required) ta.setAttribute("required", "");
    wrap.appendChild(ta);
    return wrap;
  }
  if (q.type === "grid") {
    const table = el("table", { class: "grid-table" });
    const thead = el("thead");
    const headRow = el("tr");
    headRow.appendChild(el("th", {}, ""));
    (q.columns || []).forEach((c) => headRow.appendChild(el("th", {}, c)));
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = el("tbody");
    (q.rows || []).forEach((row) => {
      const tr = el("tr");
      tr.appendChild(el("th", { class: "grid-row-label" }, row));
      (q.columns || []).forEach((col) => {
        const td = el("td");
        const inp = el("input", {
          type: "radio",
          name: `${q.id}::${row}`,
          value: col,
          "aria-label": `${row}: ${col}`
        });
        td.appendChild(inp);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    wrap.appendChild(table);
    return wrap;
  }

  // radio / checkbox
  const optsDiv = el("div", { class: "options" });
  const inputType = q.type === "checkbox" ? "checkbox" : "radio";
  const opts = [...(q.options || [])];
  if (q.hasOther) opts.push(OTHER_LABEL);

  opts.forEach((opt) => {
    const input = el("input", { type: inputType, name: q.id, value: opt });
    const lbl = el("label", {}, input, document.createTextNode(" " + opt));
    optsDiv.appendChild(lbl);
  });
  wrap.appendChild(optsDiv);

  if (q.hasOther) {
    const otherInput = el("input", {
      type: "text",
      name: q.id + "__other",
      placeholder: "Lütfen belirtiniz...",
      class: "other-input hidden"
    });
    wrap.appendChild(otherInput);
    optsDiv.addEventListener("change", () => {
      let showOther = false;
      if (q.type === "checkbox") {
        const boxes = optsDiv.querySelectorAll(`input[name="${q.id}"]:checked`);
        showOther = Array.from(boxes).some((b) => b.value === OTHER_LABEL);
      } else {
        const r = optsDiv.querySelector(`input[name="${q.id}"]:checked`);
        showOther = r && r.value === OTHER_LABEL;
      }
      otherInput.classList.toggle("hidden", !showOther);
      if (!showOther) otherInput.value = "";
    });
  }
  return wrap;
}

// ====== Soruları yükle ve böl ======
async function loadQuestions() {
  if (allQuestions.length) return;
  const res = await fetch("/api/questions");
  const data = await res.json();
  allQuestions = Array.isArray(data) ? data : data.questions || [];

  const container = document.getElementById("questionsContainer");
  container.innerHTML = "";
  let currentSection = null;
  for (const q of allQuestions) {
    if (q.section && q.section !== currentSection) {
      currentSection = q.section;
      const sec = el("div", { class: "section-title", "data-section-for": q.id }, currentSection);
      container.appendChild(sec);
    }
    container.appendChild(renderQuestion(q));
  }

  // İlk değerlendirme — koşullu olanları gizle
  refreshVisibility();

  // Cevap değiştikçe yeniden değerlendir
  document
    .getElementById("surveyForm")
    .addEventListener("change", () => refreshVisibility());
}

// ====== Görünürlük güncelle ======
function collectAnswersDOM(form) {
  const answers = {};
  for (const q of allQuestions) {
    if (q.type === "checkbox") {
      const checked = form.querySelectorAll(`input[name="${q.id}"]:checked`);
      answers[q.id] = Array.from(checked).map((c) => c.value);
    } else if (q.type === "radio") {
      const r = form.querySelector(`input[name="${q.id}"]:checked`);
      if (r) answers[q.id] = r.value;
    } else if (q.type === "text" || q.type === "textarea") {
      const t = form.querySelector(`[name="${q.id}"]`);
      if (t) answers[q.id] = t.value.trim();
    } else if (q.type === "grid") {
      const obj = {};
      (q.rows || []).forEach((row) => {
        const r = form.querySelector(`input[name="${q.id}::${row}"]:checked`);
        if (r) obj[row] = r.value;
      });
      answers[q.id] = obj;
    }
    if (q.hasOther) {
      const other = form.querySelector(`[name="${q.id}__other"]`);
      if (other && !other.classList.contains("hidden")) {
        answers[q.id + "__other"] = other.value.trim();
      }
    }
  }
  return answers;
}

function refreshVisibility() {
  const form = document.getElementById("surveyForm");
  const answers = collectAnswersDOM(form);
  const container = document.getElementById("questionsContainer");

  // Hangi bölüm başlığı en az bir görünür soru içeriyor?
  let currentSection = null;
  let sectionVisibleMap = new Map();

  for (const q of allQuestions) {
    if (q.section && q.section !== currentSection) currentSection = q.section;
    const visible = isVisible(q, answers);
    if (currentSection) {
      sectionVisibleMap.set(currentSection, sectionVisibleMap.get(currentSection) || visible);
    }
    const node = document.getElementById(`q-${q.id}`);
    if (!node) continue;
    if (visible) {
      node.classList.remove("hidden");
    } else {
      node.classList.add("hidden");
    }
  }

  // Bölüm başlıklarını da gizle (hiç görünür sorusu yoksa)
  container.querySelectorAll(".section-title").forEach((sec) => {
    const txt = sec.textContent.trim();
    sec.classList.toggle("hidden", !sectionVisibleMap.get(txt));
  });
}

function showMessage(id, text, type = "error") {
  const m = document.getElementById(id);
  m.className = `message ${type}`;
  m.textContent = text;
}

// ====== Adım 1: Kimlik (email tabanlı) ======
async function onIdentitySubmit(e) {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const ad = (fd.get("ad") || "").toString().trim();
  const soyad = (fd.get("soyad") || "").toString().trim();
  const email = (fd.get("email") || "").toString().trim();

  showMessage("identityMessage", "");

  if (ad.length < 2 || soyad.length < 2) {
    showMessage("identityMessage", "Ad ve soyad en az 2 karakter olmalıdır.");
    return;
  }
  const emailRe = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i;
  if (!emailRe.test(email)) {
    showMessage("identityMessage", "Geçersiz e-posta adresi.");
    return;
  }

  // Onam kutuları
  const consent1 = document.getElementById("consent1");
  const consent2 = document.getElementById("consent2");
  if (consent1 && (!consent1.checked || !consent2.checked)) {
    showMessage(
      "identityMessage",
      "Devam edebilmek için onam kutularının ikisini de işaretleyiniz."
    );
    return;
  }

  identity.ad = ad;
  identity.soyad = soyad;
  identity.email = email.toLowerCase();

  try {
    const startRes = await fetch("/api/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": readCookie("csrf_token")
      },
      body: JSON.stringify({ ad, soyad, email: identity.email })
    });
    if (!startRes.ok) {
      const data = await startRes.json().catch(() => ({}));
      showMessage("identityMessage", data.error || "Başlangıç kaydedilemedi.");
      return;
    }
  } catch (err) {
    console.error(err);
    showMessage("identityMessage", "Ağ hatası. Lütfen tekrar deneyin.");
    return;
  }

  await loadQuestions();

  document.getElementById("greetingName").textContent = `${ad} ${soyad}`;
  document.getElementById("step-identity").classList.add("hidden");
  document.getElementById("step-survey").classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ====== Adım 2: Anket gönder ======
async function onSurveySubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const btn = document.getElementById("submitBtn");
  showMessage("formMessage", "");

  const answers = collectAnswersDOM(form);

  for (const q of allQuestions) {
    if (!q.required) continue;
    if (!isVisible(q, answers)) continue;
    const v = answers[q.id];
    let empty;
    if (q.type === "grid") {
      empty =
        !v ||
        typeof v !== "object" ||
        (q.rows || []).some((row) => !v[row]);
    } else {
      empty =
        v === undefined ||
        v === null ||
        (typeof v === "string" && !v.trim()) ||
        (Array.isArray(v) && v.length === 0);
    }
    if (empty) {
      showMessage("formMessage", `"${q.text}" sorusu zorunludur.`);
      document.getElementById(`q-${q.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
  }

  btn.disabled = true;
  btn.textContent = "Gönderiliyor...";
  try {
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": readCookie("csrf_token")
      },
      body: JSON.stringify({ ...identity, answers })
    });
    const data = await res.json();
    if (!res.ok) {
      showMessage("formMessage", data.error || "Bir hata oluştu.");
      btn.disabled = false;
      btn.textContent = "Anketi Gönder";
      return;
    }
    document.getElementById("step-survey").classList.add("hidden");
    document.getElementById("thankyou").classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (err) {
    console.error(err);
    showMessage("formMessage", "Ağ hatası. Lütfen tekrar deneyin.");
    btn.disabled = false;
    btn.textContent = "Anketi Gönder";
  }
}

function onBack() {
  document.getElementById("step-survey").classList.add("hidden");
  document.getElementById("step-identity").classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("identityForm").addEventListener("submit", onIdentitySubmit);
  document.getElementById("surveyForm").addEventListener("submit", onSurveySubmit);
  document.getElementById("backBtn").addEventListener("click", onBack);
});
