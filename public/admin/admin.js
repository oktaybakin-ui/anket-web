let allResponses = [];
let questions = [];
let currentFilter = "all";
let currentSearch = "";

function readCookie(name) {
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[1]) : "";
}

function csrfHeaders(extra = {}) {
  return { ...extra, "X-CSRF-Token": readCookie("csrf_token") };
}

function fmtDate(s) {
  if (!s) return "—";
  try {
    return new Date(s).toLocaleString("tr-TR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return String(s);
  }
}

async function loadData() {
  const res = await fetch("/admin/api/responses");
  if (res.status === 401) {
    window.location.href = "/admin/login.html";
    return;
  }
  const data = await res.json();
  questions = data.questions;
  allResponses = data.responses;
  applyFilters();
  updateStats();
}

function updateStats() {
  const total = allResponses.length;
  const completed = allResponses.filter((r) => r.completed_at).length;
  const pending = total - completed;
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
  document.getElementById("statTotal").textContent = total;
  document.getElementById("statCompleted").textContent = completed;
  document.getElementById("statPending").textContent = pending;
  document.getElementById("statRate").textContent = total > 0 ? `%${rate}` : "—";
  document.getElementById("countBadge").textContent = `${total} kayıt`;
}

function applyFilters() {
  let rows = allResponses;
  if (currentFilter === "completed") {
    rows = rows.filter((r) => r.completed_at);
  } else if (currentFilter === "pending") {
    rows = rows.filter((r) => !r.completed_at);
  }
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    rows = rows.filter(
      (r) =>
        r.ad.toLowerCase().includes(q) ||
        r.soyad.toLowerCase().includes(q) ||
        (r.email || "").includes(q)
    );
  }
  renderTable(rows);
}

function renderTable(rows) {
  const tbody = document.querySelector("#responsesTable tbody");
  tbody.innerHTML = "";
  if (rows.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="8" style="text-align:center;color:var(--muted);padding:24px">Kayıt bulunamadı.</td>`;
    tbody.appendChild(tr);
    return;
  }
  for (const r of rows) {
    const tr = document.createElement("tr");
    const completed = !!r.completed_at;
    const badge = completed
      ? `<span class="status-badge status-completed">Tamamlandı</span>`
      : `<span class="status-badge status-pending">Yarım Kaldı</span>`;
    const viewBtn = `<button class="btn btn-secondary btn-sm" data-action="view" data-id="${r.id}">Görüntüle</button>`;
    const excelBtn = completed
      ? `<a class="btn btn-primary btn-sm" href="/admin/api/export/${r.id}">Excel</a>`
      : "";
    tr.innerHTML = `
      <td>${r.id}</td>
      <td>${badge}</td>
      <td>${escapeHtml(r.ad)}</td>
      <td>${escapeHtml(r.soyad)}</td>
      <td><code>${escapeHtml(r.email || "—")}</code></td>
      <td>${fmtDate(r.started_at)}</td>
      <td>${completed ? fmtDate(r.completed_at) : "—"}</td>
      <td>
        ${viewBtn}
        ${excelBtn}
        <button class="btn btn-danger btn-sm" data-action="delete" data-id="${r.id}">Sil</button>
      </td>
    `;
    tbody.appendChild(tr);
  }
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

function showDetailModal(r) {
  const root = document.getElementById("modalRoot");
  const completed = !!r.completed_at;
  const dl = document.createElement("dl");
  dl.className = "answers";
  if (completed) {
    for (const q of questions) {
      const dt = document.createElement("dt");
      dt.textContent = q.text;
      const dd = document.createElement("dd");
      let v = r.answers[q.id];
      if (Array.isArray(v)) v = v.join(", ");
      dd.textContent = v === undefined || v === null || v === "" ? "—" : String(v);
      dl.appendChild(dt);
      dl.appendChild(dd);
    }
  } else {
    const dd = document.createElement("dd");
    dd.style.color = "var(--muted)";
    dd.textContent = "Bu kullanıcı kimlik bilgilerini girdi ancak anketi henüz tamamlamadı.";
    dl.appendChild(dd);
  }

  root.innerHTML = "";
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  const status = completed
    ? `<span class="status-badge status-completed">Tamamlandı</span>`
    : `<span class="status-badge status-pending">Yarım Kaldı</span>`;
  backdrop.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <h2>${escapeHtml(r.ad)} ${escapeHtml(r.soyad)} ${status}</h2>
      <p style="color:var(--muted);margin-top:-2px">
        E-posta: <code>${escapeHtml(r.email || "—")}</code><br>
        Başlangıç: ${fmtDate(r.started_at)}${completed ? ` · Tamamlanma: ${fmtDate(r.completed_at)}` : ""}
      </p>
    </div>
  `;
  const modal = backdrop.querySelector(".modal");
  modal.appendChild(dl);
  const closeRow = document.createElement("div");
  closeRow.className = "close-row";
  closeRow.innerHTML = `
    ${completed ? `<a class="btn btn-primary btn-sm" href="/admin/api/export/${r.id}">Excel İndir</a>` : ""}
    <button class="btn btn-secondary btn-sm" id="closeModalBtn">Kapat</button>
  `;
  modal.appendChild(closeRow);

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop || e.target.id === "closeModalBtn") {
      root.innerHTML = "";
    }
  });
  root.appendChild(backdrop);
}

async function deleteResponse(id) {
  if (!confirm("Bu kaydı silmek istediğinize emin misiniz?")) return;
  const res = await fetch(`/admin/api/responses/${id}`, {
    method: "DELETE",
    headers: csrfHeaders()
  });
  if (res.ok) {
    await loadData();
  } else {
    alert("Silme başarısız.");
  }
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;
  const id = Number(btn.dataset.id);
  if (btn.dataset.action === "view") {
    const r = allResponses.find((x) => x.id === id);
    if (r) showDetailModal(r);
  } else if (btn.dataset.action === "delete") {
    deleteResponse(id);
  }
});

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await fetch("/admin/logout", { method: "POST", headers: csrfHeaders() });
  window.location.href = "/admin/login.html";
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  currentSearch = e.target.value.trim();
  applyFilters();
});

document.getElementById("statusFilter").addEventListener("change", (e) => {
  currentFilter = e.target.value;
  applyFilters();
});

loadData();
