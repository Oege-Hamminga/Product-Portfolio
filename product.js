const params = new URLSearchParams(location.search);
const id     = parseInt(params.get("id"), 10);
const product = products.find(p => p.id === id);

if (!product) {
  document.body.innerHTML = `<div style="padding:80px;text-align:center">
    <h2>Product not found.</h2>
    <a href="index.html">← Back to Portfolio</a>
  </div>`;
  throw new Error("Product not found");
}

const meta = BRAND_META[product.brand] || { color: "#444", abbr: product.brand.slice(0,3).toUpperCase() };

// Breadcrumb
document.getElementById("bc-brand").textContent   = product.brand;
document.getElementById("bc-product").textContent = `${product.van} – ${product.type}`;

// Page title
document.title = `Snoeks – ${product.brand} ${product.van} ${product.type}`;

// Vehicle placeholder
const vehEl = document.getElementById("vehicle-img");
const textCol = meta.textDark ? "#1A1F2E" : "rgba(255,255,255,0.9)";
const vanCol  = meta.textDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.65)";
vehEl.style.background = `linear-gradient(135deg, ${meta.color} 0%, ${meta.color}cc 100%)`;
document.getElementById("vp-brand-abbr").textContent = meta.abbr;
document.getElementById("vp-brand-abbr").style.color = textCol;
document.getElementById("vp-van-name").textContent   = product.van;
document.getElementById("vp-van-name").style.color   = vanCol;

// Product placeholder icon
const PRODUCT_ICON = { "Crew Cabin": "🚐", "Flex Cabin": "🔄", "Partition Wall": "🔩" };
document.getElementById("pp-icon").textContent     = PRODUCT_ICON[product.type] || "📦";
document.getElementById("pp-type-name").textContent = product.type;

// Meta panel
document.getElementById("meta-segment").textContent  = `Segment ${product.segment}`;
document.getElementById("detail-title").textContent  = `${product.brand} ${product.van} — ${product.type}`;
document.getElementById("m-brand").textContent       = product.brand;
document.getElementById("m-van").textContent         = product.van;
document.getElementById("m-segment").textContent     = product.segment;
document.getElementById("m-type").textContent        = product.type;

// Generate part series ID
const seriesMap = { "Crew Cabin": "CC", "Flex Cabin": "FC", "Partition Wall": "PW" };
const brandCode = meta.abbr;
const partSeries = `SNK-${brandCode}-${seriesMap[product.type]}-${String(product.id).padStart(3,"0")}`;
document.getElementById("m-part").textContent = partSeries;

// ── BOM ─────────────────────────────────────────
const bomRows = BOM_DATA[product.type] || [];
document.getElementById("bom-body").innerHTML = bomRows.map(row => `
  <tr>
    <td>${row.part}</td>
    <td>${row.description}</td>
    <td>${row.qty}</td>
    <td>${row.unit}</td>
  </tr>`).join("");

// ── Aftersales ──────────────────────────────────
const as = AFTERSALES_DATA[product.type];
document.getElementById("as-warranty").textContent = as.warranty;
document.getElementById("as-service").textContent  = as.serviceInterval;
document.getElementById("as-spares").innerHTML     = as.spares.map(s => `<li>${s}</li>`).join("");
document.getElementById("as-contact").innerHTML    = `<a href="mailto:${as.contact}" style="color:var(--orange)">${as.contact}</a>`;

// ── Tabs ────────────────────────────────────────
document.querySelector(".tabs-bar").addEventListener("click", e => {
  const btn = e.target.closest(".tab-btn");
  if (!btn) return;
  const tab = btn.dataset.tab;

  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));

  btn.classList.add("active");
  document.getElementById(`tab-${tab}`).classList.add("active");
});

// ── Configurator ─────────────────────────────────
// Hide seating group for Partition Wall
if (product.type === "Partition Wall") {
  document.getElementById("cfg-seat-group").style.display = "none";
}

function getSelected(groupId) {
  const active = document.querySelector(`#${groupId} .cfg-opt.active`);
  return active ? active.textContent.trim() : "—";
}

function updateSummary() {
  const finish  = getSelected("cfg-finish");
  const window_ = getSelected("cfg-window");
  const floor   = getSelected("cfg-floor");
  const seat    = product.type !== "Partition Wall" ? getSelected("cfg-seat") : null;

  let lines = [
    `<strong>Product:</strong> ${product.type} for ${product.brand} ${product.van}`,
    `<strong>Finish:</strong> ${finish}`,
    `<strong>Window:</strong> ${window_}`,
    `<strong>Floor:</strong> ${floor}`,
  ];
  if (seat) lines.push(`<strong>Seating:</strong> ${seat}`);

  document.getElementById("cfg-summary-text").innerHTML = lines.join("<br>");
}

document.querySelectorAll(".config-options").forEach(group => {
  group.addEventListener("click", e => {
    const opt = e.target.closest(".cfg-opt");
    if (!opt) return;
    group.querySelectorAll(".cfg-opt").forEach(o => o.classList.remove("active"));
    opt.classList.add("active");
    updateSummary();
  });
});

document.getElementById("cfg-request-btn").addEventListener("click", () => {
  alert(`Quotation request sent for:\n${product.brand} ${product.van} – ${product.type}\n\nOur team will contact you within 1 business day.`);
});

updateSummary();
