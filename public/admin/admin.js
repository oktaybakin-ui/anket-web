let allResponses = [];
let questions = [];

async function loadData() {
  const res = await fetch("/admin/api/responses");
  if (res.status === 401) {
    window.location.href = "/admin/login.html";
    return;
  }
  const data = await res.json();
  questions = data.questions;
  allResponses = data.responses;
  renderTable(allResponses);
  document.getElementById("countBadge").textContent = `${allResponses.length} kayit`;
}

function renderTable(rows) {
  const tbody = document.querySelector("#responsesTable tbody");
  tbody.innerHTML = "";
  if (rows.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="6" style="text-align:center;color:var(--muted);padding:24px">Henuz kayit yok.</td>`;
    tbody.appendChild(tr);
    return;
  }
  for (const r of rows) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.id}</td>
      <td>${escapeHtml(r.ad)}</td>
      <td>${escapeHtml(r.soyad)}</td>
      <td>${escapeHtml(r.tc)}</td>
      <td>${escapeHtml(r.created_at)}</td>
      <td>
        <button class="btn btn-secondary btn-sm" data-action="view" data-id="${r.id}">Goruntule</button>
        <a class="btn btn-primary btn-sm" href="/admin/api/export/${r.id}">Excel</a>
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
  const qMap = Object.fromEntries(questions.map((q) => [q.id, q]));

  const dl = document.createElement("dl");
  dl.className = "answers";
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

  root.innerHTML = "";
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  backdrop.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <h2>${escapeHtml(r.ad)} ${escapeHtml(r.soyad)}</h2>
      <p style="color:var(--muted);margin-top:-6px">TC: ${escapeHtml(r.tc)} — ${escapeHtml(r.created_at)}</p>
    </div>
  `;
  const modal = backdrop.querySelector(".modal");
  modal.appendChild(dl);
  const closeRow = document.createElement("div");
  closeRow.className = "close-row";
  closeRow.innerHTML = `
    <a class="btn btn-primary btn-sm" href="/admin/api/export/${r.id}">Excel Indir</a>
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
  if (!confirm("Bu kaydi silmek istediginize emin misiniz?")) return;
  const res = await fetch(`/admin/api/responses/${id}`, { method: "DELETE" });
  if (res.ok) {
    await loadData();
  } else {
    alert("Silme basarisiz.");
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
  await fetch("/admin/logout", { method: "POST" });
  window.location.href = "/admin/login.html";
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  if (!q) {
    renderTable(allResponses);
    return;
  }
  const filtered = allResponses.filter(
    (r) =>
      r.ad.toLowerCase().includes(q) ||
      r.soyad.toLowerCase().includes(q) ||
      r.tc.includes(q)
  );
  renderTable(filtered);
});

loadData();
