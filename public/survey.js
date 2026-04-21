function validateTC(tc) {
  if (!/^\d{11}$/.test(tc)) return false;
  const d = tc.split("").map(Number);
  if (d[0] === 0) return false;
  const sumOdd = d[0] + d[2] + d[4] + d[6] + d[8];
  const sumEven = d[1] + d[3] + d[5] + d[7];
  const digit10 = (sumOdd * 7 - sumEven) % 10;
  if (digit10 < 0 || digit10 !== d[9]) return false;
  const sumFirst10 = d.slice(0, 10).reduce((a, b) => a + b, 0);
  return sumFirst10 % 10 === d[10];
}

const OTHER_LABEL = "Diğer";
const identity = { ad: "", soyad: "", tc: "" };

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

function renderQuestion(q, idx) {
  const wrap = el("div", { class: "question", id: `q-${q.id}` });
  const qtext = el("div", { class: "qtext" });
  qtext.appendChild(el("span", { class: "num" }, String(idx)));
  qtext.appendChild(document.createTextNode(q.text + (q.required ? " *" : "")));
  wrap.appendChild(qtext);

  if (q.type === "textarea") {
    const ta = el("textarea", { name: q.id });
    if (q.required) ta.setAttribute("required", "");
    wrap.appendChild(ta);
    return wrap;
  }

  const optsDiv = el("div", { class: "options" });
  const inputType = q.type === "checkbox" ? "checkbox" : "radio";
  const opts = [...q.options];
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

async function loadQuestions() {
  if (window.__questions) return;
  const res = await fetch("/api/questions");
  const questions = await res.json();
  const container = document.getElementById("questionsContainer");
  container.innerHTML = "";
  let currentSection = null;
  let i = 0;
  for (const q of questions) {
    if (q.section && q.section !== currentSection) {
      currentSection = q.section;
      container.appendChild(el("div", { class: "section-title" }, currentSection));
    }
    i += 1;
    container.appendChild(renderQuestion(q, i));
  }
  window.__questions = questions;
}

function collectAnswers(form) {
  const answers = {};
  for (const q of window.__questions) {
    if (q.type === "checkbox") {
      const checked = form.querySelectorAll(`input[name="${q.id}"]:checked`);
      answers[q.id] = Array.from(checked).map((c) => c.value);
    } else if (q.type === "radio") {
      const r = form.querySelector(`input[name="${q.id}"]:checked`);
      if (r) answers[q.id] = r.value;
    } else if (q.type === "textarea") {
      const t = form.querySelector(`[name="${q.id}"]`);
      if (t) answers[q.id] = t.value.trim();
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

function showMessage(id, text, type = "error") {
  const m = document.getElementById(id);
  m.className = `message ${type}`;
  m.textContent = text;
}

async function onIdentitySubmit(e) {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const ad = (fd.get("ad") || "").toString().trim();
  const soyad = (fd.get("soyad") || "").toString().trim();
  const tc = (fd.get("tc") || "").toString().trim();

  showMessage("identityMessage", "");

  if (ad.length < 2 || soyad.length < 2) {
    showMessage("identityMessage", "Ad ve soyad en az 2 karakter olmalıdır.");
    return;
  }
  if (!validateTC(tc)) {
    showMessage("identityMessage", "Geçersiz TC Kimlik No. Lütfen kontrol ediniz.");
    return;
  }

  identity.ad = ad;
  identity.soyad = soyad;
  identity.tc = tc;

  await loadQuestions();

  document.getElementById("greetingName").textContent = `${ad} ${soyad}`;
  document.getElementById("step-identity").classList.add("hidden");
  document.getElementById("step-survey").classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function onSurveySubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const btn = document.getElementById("submitBtn");
  showMessage("formMessage", "");

  const answers = collectAnswers(form);

  for (const q of window.__questions) {
    if (!q.required) continue;
    const v = answers[q.id];
    const empty =
      v === undefined ||
      v === null ||
      (typeof v === "string" && !v.trim()) ||
      (Array.isArray(v) && v.length === 0);
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
      headers: { "Content-Type": "application/json" },
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

  const tcInput = document.querySelector('#identityForm input[name="tc"]');
  tcInput.addEventListener("input", () => {
    tcInput.value = tcInput.value.replace(/\D/g, "").slice(0, 11);
  });
});
