/* ── Resolve product from URL ─────────────────────────────────────── */
const id      = parseInt(new URLSearchParams(location.search).get("id"), 10);
const product = products.find(p => p.id === id);

if (!product) {
  document.body.innerHTML = `<div style="padding:80px;text-align:center;font-family:sans-serif">
    <h2 style="text-transform:uppercase;letter-spacing:2px">Product Not Found</h2>
    <p style="margin:16px 0;color:#666">The product you requested does not exist.</p>
    <a href="index.html" style="color:#CC0000;font-weight:700">← Back to Portfolio</a>
  </div>`;
  throw new Error("Product not found: " + id);
}

const meta = BRAND_META[product.brand] || { color: "#333", abbr: product.brand.slice(0,3).toUpperCase() };

/* ── Page title & breadcrumb ─────────────────────────────────────── */
document.title = `Snoeks – ${product.brand} ${product.van} ${product.type}`;
document.getElementById("bc-brand").textContent   = product.brand;
document.getElementById("bc-product").textContent = `${product.van} – ${product.type}`;

/* ── Vehicle image placeholder ────────────────────────────────────── */
const vehEl   = document.getElementById("vehicle-img");
const textCol = meta.textDark ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.92)";
const vanCol  = meta.textDark ? "rgba(0,0,0,0.5)"  : "rgba(255,255,255,0.55)";
vehEl.style.background = `linear-gradient(135deg,${meta.color} 0%,${meta.color}99 100%)`;
document.getElementById("vp-abbr").textContent  = meta.abbr;
document.getElementById("vp-abbr").style.color  = textCol;
document.getElementById("vp-van").textContent   = product.van;
document.getElementById("vp-van").style.color   = vanCol;

/* ── Product image placeholder ────────────────────────────────────── */
document.getElementById("pp-icon").textContent = TYPE_ICON[product.type] || "📦";
document.getElementById("pp-type").textContent = product.type;

/* ── Meta panel ────────────────────────────────────────────────────── */
document.getElementById("meta-eyebrow").textContent = `${product.segment} · ${product.fitment}`;
document.getElementById("meta-title").textContent   = `${product.brand} ${product.van}`;
document.getElementById("m-brand").textContent      = product.brand;
document.getElementById("m-van").textContent        = product.van;
document.getElementById("m-segment").textContent    = product.segment;
document.getElementById("m-type").textContent       = product.type;

const fitEl  = document.getElementById("m-fitment");
const fitCls = product.fitment === "OEM" ? "fitment-badge--oem" : "fitment-badge--afterfit";
fitEl.innerHTML = `<span class="fitment-badge ${fitCls}">${product.fitment}</span>`;

const TYPE_CODE = { "Crew Cab":"CC", "Flex Cab":"FC", "Partition Wall":"PW" };
document.getElementById("m-part").textContent =
  `SNK-${meta.abbr}-${TYPE_CODE[product.type] || "XX"}-${String(product.id).padStart(3,"0")}`;

/* ── BOM ────────────────────────────────────────────────────────────── */
const bom = BOM_DATA[product.type] || [];
document.getElementById("bom-body").innerHTML = bom.map(r => `
  <tr>
    <td>${r.part}</td>
    <td>${r.description}</td>
    <td>${r.qty}</td>
    <td>${r.unit}</td>
  </tr>`).join("");

/* ── Aftersales ─────────────────────────────────────────────────────── */
const as = AFTERSALES_DATA[product.type];
document.getElementById("as-warranty").textContent = as.warranty;
document.getElementById("as-service").textContent  = as.serviceInterval;
document.getElementById("as-spares").innerHTML     = as.spares.map(s => `<li>${s}</li>`).join("");
document.getElementById("as-contact").innerHTML    =
  `<a href="mailto:${as.contact}" style="color:var(--red);font-weight:700">${as.contact}</a>`;

/* ── Tabs ────────────────────────────────────────────────────────────── */
document.querySelector(".tabs-bar").addEventListener("click", e => {
  const btn = e.target.closest(".tab-btn");
  if (!btn) return;
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
});

/* ── Configurator ────────────────────────────────────────────────────── */
// Hide seat/upholstery groups for Partition Wall
if (product.type === "Partition Wall") {
  document.querySelectorAll("#cfg-seat-group").forEach(el => el.style.display = "none");
}

// Single-select groups
document.getElementById("tab-configurator").addEventListener("click", e => {
  const btn = e.target.closest(".cfg-opt");
  if (!btn) return;
  const group = btn.dataset.group;
  btn.closest(".config-options").querySelectorAll(".cfg-opt").forEach(o => o.classList.remove("active"));
  btn.classList.add("active");
  updateSummary();
});

function getVal(group) {
  const el = document.querySelector(`.cfg-opt.active[data-group="${group}"]`);
  return el ? el.dataset.val : "—";
}

function getExtras() {
  return [...document.querySelectorAll(".extra-check input:checked")]
    .map(cb => cb.dataset.extra);
}

function updateSummary() {
  const isPartition = product.type === "Partition Wall";
  const lines = [
    `<strong>Vehicle:</strong> ${product.brand} ${product.van} (${product.segment})`,
    `<strong>Body:</strong> ${getVal("length")} / ${getVal("roof")}`,
    `<strong>Sliding Doors:</strong> ${getVal("door")}`,
    `<strong>Powertrain:</strong> ${getVal("power")} – ${getVal("drive")}`,
    `<strong>Payload:</strong> ${getVal("payload")}`,
    `<strong>Interior Finish:</strong> ${getVal("finish")}`,
    `<strong>Window:</strong> ${getVal("window")}`,
    !isPartition ? `<strong>Seating:</strong> ${getVal("seat")} / ${getVal("upholstery")}` : null,
    `<strong>Floor:</strong> ${getVal("floor")}`,
  ].filter(Boolean);

  const extras = getExtras();
  if (extras.length) lines.push(`<strong>Options:</strong> ${extras.join(", ")}`);

  document.getElementById("cfg-summary-text").innerHTML = lines.join(" &nbsp;·&nbsp; ");
}

document.querySelectorAll(".extra-check input").forEach(cb =>
  cb.addEventListener("change", updateSummary)
);

document.getElementById("cfg-quote-btn").addEventListener("click", () => {
  alert(
    `Quotation request submitted for:\n` +
    `${product.brand} ${product.van} – ${product.type} (${product.fitment})\n\n` +
    `Our team will contact you within 1 business day.`
  );
});

updateSummary();
