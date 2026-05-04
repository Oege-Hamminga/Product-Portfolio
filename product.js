/* ── Resolve vehicle from URL ─────────────────────────────────────── */
const params = new URLSearchParams(location.search);
const qBrand = params.get("brand") || "";
const qVan   = params.get("van")   || "";

const vehicleProducts = products.filter(p => p.brand === qBrand && p.van === qVan);

if (!vehicleProducts.length) {
  document.body.innerHTML = `<div style="padding:80px;text-align:center;font-family:sans-serif">
    <h2 style="text-transform:uppercase;letter-spacing:2px">Vehicle Not Found</h2>
    <p style="margin:16px 0;color:#666">The vehicle you requested does not exist.</p>
    <a href="index.html" style="color:#CC0000;font-weight:700">← Back to Portfolio</a>
  </div>`;
  throw new Error("Vehicle not found: " + qBrand + " " + qVan);
}

const firstP = vehicleProducts[0];
const meta   = BRAND_META[firstP.brand] || { color: "#333", abbr: firstP.brand.slice(0,3).toUpperCase() };

/* ── Page title & breadcrumb ─────────────────────────────────────── */
document.title = `Snoeks – ${firstP.brand} ${firstP.van}`;
document.getElementById("bc-brand").textContent   = firstP.brand;
document.getElementById("bc-product").textContent = firstP.van;

/* ── Vehicle image ────────────────────────────────────────────────── */
const textCol = meta.textDark ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.92)";
const vanCol  = meta.textDark ? "rgba(0,0,0,0.5)"  : "rgba(255,255,255,0.55)";

const fallbackEl = document.getElementById("vp-fallback");
fallbackEl.style.background = `linear-gradient(135deg,${meta.color} 0%,${meta.color}99 100%)`;
document.getElementById("vp-abbr").textContent = meta.abbr;
document.getElementById("vp-abbr").style.color = textCol;
document.getElementById("vp-van").textContent  = firstP.van;
document.getElementById("vp-van").style.color  = vanCol;

const imgUrl  = VAN_IMAGES[firstP.van] || null;
const photoEl = document.getElementById("vehicle-photo");
if (imgUrl) {
  photoEl.src = imgUrl;
  photoEl.alt = `${firstP.brand} ${firstP.van}`;
  photoEl.onerror = () => { photoEl.style.display = "none"; fallbackEl.style.display = "flex"; };
  fallbackEl.style.display = "none";
} else {
  photoEl.style.display = "none";
  fallbackEl.style.display = "flex";
}

/* ── Meta panel (static fields) ───────────────────────────────────── */
document.getElementById("meta-eyebrow").textContent = firstP.segment;
document.getElementById("meta-title").textContent   = `${firstP.brand} ${firstP.van}`;
document.getElementById("m-brand").textContent      = firstP.brand;
document.getElementById("m-van").textContent        = firstP.van;
document.getElementById("m-segment").textContent    = firstP.segment;

/* ── Product Type Selector ────────────────────────────────────────── */
const uniqueTypes = [...new Set(vehicleProducts.map(p => p.type))];
const typeBtnsEl  = document.getElementById("type-selector-btns");
const fitBtnsEl   = document.getElementById("fitment-selector-btns");

typeBtnsEl.innerHTML = uniqueTypes.map(t =>
  `<button class="sel-btn" data-type="${t}">${TYPE_ICON[t] || "📦"} ${t}</button>`
).join("");

let currentProduct = null;

typeBtnsEl.addEventListener("click", e => {
  const btn = e.target.closest(".sel-btn[data-type]");
  if (!btn) return;
  const type = btn.dataset.type;

  typeBtnsEl.querySelectorAll(".sel-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.type === type)
  );

  const availFitments = [...new Set(
    vehicleProducts.filter(p => p.type === type).map(p => p.fitment)
  )];

  fitBtnsEl.innerHTML = availFitments.map(f =>
    `<button class="sel-btn sel-btn--fitment" data-fitment="${f}">${f}</button>`
  ).join("");

  document.getElementById("step-fitment").classList.remove("selector-step--locked");
  document.getElementById("pp-icon").textContent  = TYPE_ICON[type] || "📦";
  document.getElementById("pp-type").textContent  = type;
  document.getElementById("pp-label").textContent = "Choose fitment below";
  document.getElementById("m-type").textContent   = type;
  document.getElementById("m-fitment").innerHTML  = "—";
  document.getElementById("m-part").textContent   = "—";
  document.getElementById("meta-eyebrow").textContent = firstP.segment;
  lockTabs();
});

fitBtnsEl.addEventListener("click", e => {
  const btn = e.target.closest(".sel-btn[data-fitment]");
  if (!btn) return;
  const fitment = btn.dataset.fitment;

  // Determine selected type from active type button
  const activeTypeBtn = typeBtnsEl.querySelector(".sel-btn.active");
  if (!activeTypeBtn) return;

  fitBtnsEl.querySelectorAll(".sel-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.fitment === fitment)
  );

  const product = vehicleProducts.find(
    p => p.type === activeTypeBtn.dataset.type && p.fitment === fitment
  );
  if (product) unlockAndPopulate(product);
});

/* ── Tab switching ────────────────────────────────────────────────── */
document.querySelector(".tabs-bar").addEventListener("click", e => {
  const btn = e.target.closest(".tab-btn");
  if (!btn) return;
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
});

/* ── BOM module event listeners (registered once) ────────────────── */
const bomModulesEl = document.getElementById("bom-modules-list");
let bomState = {};

bomModulesEl.addEventListener("change", e => {
  const cb = e.target.closest("input[type=checkbox]");
  if (!cb || !currentProduct) return;
  bomState[cb.dataset.module] = cb.checked;
  cb.closest("label").classList.toggle("active", cb.checked);
  refreshBOMToggleBtn();
  renderBOMTable();
});

document.getElementById("bom-toggle-all").addEventListener("click", () => {
  if (!currentProduct) return;
  const cbs  = [...bomModulesEl.querySelectorAll("input[type=checkbox]")];
  const allOn = cbs.every(cb => cb.checked);
  cbs.forEach(cb => {
    cb.checked = !allOn;
    bomState[cb.dataset.module] = !allOn;
    cb.closest("label").classList.toggle("active", !allOn);
  });
  refreshBOMToggleBtn();
  renderBOMTable();
});

/* ── Tabs lock / unlock ───────────────────────────────────────────── */
function lockTabs() {
  document.getElementById("tabs-lock").classList.remove("hidden");
}

function unlockAndPopulate(product) {
  currentProduct = product;

  const TYPE_CODE = { "Crew Cab":"CC", "Flex Cab":"FC", "Partition Wall":"PW" };
  const fitCls = product.fitment === "OEM" ? "fitment-badge--oem" : "fitment-badge--afterfit";

  document.getElementById("m-fitment").innerHTML =
    `<span class="fitment-badge ${fitCls}">${product.fitment}</span>`;
  document.getElementById("m-type").textContent = product.type;
  document.getElementById("m-part").textContent =
    `SNK-${meta.abbr}-${TYPE_CODE[product.type] || "XX"}-${String(product.id).padStart(3,"0")}`;
  document.getElementById("meta-eyebrow").textContent =
    `${product.segment} · ${product.fitment}`;
  document.getElementById("pp-label").textContent =
    product.fitment === "OEM" ? "OEM Fitment" : "After-fit Conversion";

  populateMarket(product);
  populateBOM(product);
  populateImages(product);

  document.getElementById("tabs-lock").classList.add("hidden");
}

/* ── Market Presence ─────────────────────────────────────────────── */
function populateMarket(product) {
  const md = MARKET_DATA[product.type];
  if (!md) return;

  document.getElementById("market-grid").innerHTML = `
    <div class="mkt-card">
      <div class="mkt-card-icon">🌍</div>
      <h3>Active Regions</h3>
      <div class="mkt-tags">${md.regions.map(r => `<span class="mkt-tag">${r}</span>`).join("")}</div>
    </div>
    <div class="mkt-card">
      <div class="mkt-card-icon">🏭</div>
      <h3>OEM Partners</h3>
      ${md.oemBrands.length
        ? `<div class="mkt-tags">${md.oemBrands.map(b => `<span class="mkt-tag mkt-tag--oem">${b}</span>`).join("")}</div>`
        : `<p class="mkt-empty">Not available as OEM</p>`}
    </div>
    <div class="mkt-card">
      <div class="mkt-card-icon">🔧</div>
      <h3>After-fit Brands</h3>
      ${md.afterfitBrands.length
        ? `<div class="mkt-tags">${md.afterfitBrands.map(b => `<span class="mkt-tag mkt-tag--afterfit">${b}</span>`).join("")}</div>`
        : `<p class="mkt-empty">Not available as after-fit</p>`}
    </div>
    <div class="mkt-card">
      <div class="mkt-card-icon">🏗</div>
      <h3>Key Applications</h3>
      <ul class="mkt-list">${md.applications.map(a => `<li>${a}</li>`).join("")}</ul>
    </div>
    <div class="mkt-card">
      <div class="mkt-card-icon">✅</div>
      <h3>Certifications</h3>
      <ul class="mkt-list">${md.certifications.map(c => `<li>${c}</li>`).join("")}</ul>
    </div>
    <div class="mkt-card">
      <div class="mkt-card-icon">📊</div>
      <h3>Volume &amp; Launch</h3>
      <p class="mkt-stat">FY25 volume: <strong>${md.unitsFY25}</strong></p>
      <p class="mkt-stat">In market since: <strong>${md.launchYear}</strong></p>
    </div>
  `;
}

/* ── BOM Configurator ────────────────────────────────────────────── */
function populateBOM(product) {
  const modules = BOM_MODULES[product.type] || [];
  bomState = {};
  modules.forEach(m => { bomState[m.id] = m.defaultOn; });

  bomModulesEl.innerHTML = modules.map(m => `
    <label class="bom-module-check${m.defaultOn ? " active" : ""}">
      <input type="checkbox" data-module="${m.id}"${m.defaultOn ? " checked" : ""}>
      <span class="bom-module-label">${m.label}</span>
      <span class="bom-module-count">${m.parts.length} part${m.parts.length !== 1 ? "s" : ""}</span>
    </label>
  `).join("");

  refreshBOMToggleBtn();
  renderBOMTable();
}

function refreshBOMToggleBtn() {
  if (!currentProduct) return;
  const modules = BOM_MODULES[currentProduct.type] || [];
  const allOn   = modules.every(m => bomState[m.id]);
  document.getElementById("bom-toggle-all").textContent = allOn ? "Deselect All" : "Select All";
}

function renderBOMTable() {
  if (!currentProduct) return;
  const modules  = BOM_MODULES[currentProduct.type] || [];
  const allParts = BOM_DATA[currentProduct.type]    || [];

  const activeParts = new Set();
  const partToModule = {};
  modules.forEach(m => {
    if (bomState[m.id]) m.parts.forEach(pid => { activeParts.add(pid); partToModule[pid] = m.label; });
  });

  const visible = allParts.filter(r => activeParts.has(r.part));
  document.getElementById("bom-body").innerHTML = visible.map(r => `
    <tr>
      <td>${r.part}</td>
      <td>${r.description}</td>
      <td>${r.qty}</td>
      <td>${r.unit}</td>
      <td><span class="bom-module-badge">${partToModule[r.part] || ""}</span></td>
    </tr>`).join("");

  document.getElementById("bom-part-count").textContent =
    `${visible.length} part${visible.length !== 1 ? "s" : ""} in configuration`;
}

/* ── Marketing Images ─────────────────────────────────────────────── */
function populateImages(product) {
  const vehicleImgUrl = VAN_IMAGES[product.van] || "";
  const imgLabels = [
    { label:"Exterior – 3/4 Front",   icon:"🚐" },
    { label:"Exterior – Side View",   icon:"🚌" },
    { label:"Interior – Cabin",       icon:"🪑" },
    { label:"Interior – Detail",      icon:"🔩" },
    { label:"Installation Diagram",   icon:"📐" },
    { label:"Product Close-up",       icon:"🔍" },
  ];

  document.getElementById("marketing-gallery").innerHTML = `
    <div class="gallery-hero">
      ${vehicleImgUrl
        ? `<img src="${vehicleImgUrl}" alt="${product.brand} ${product.van}" loading="lazy"
                onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
        : ""}
      <div class="gallery-hero-fallback" style="background:linear-gradient(135deg,${meta.color} 0%,${meta.color}99 100%);${vehicleImgUrl ? "display:none" : ""}">
        <span style="font-size:3rem;font-weight:900;color:rgba(255,255,255,0.9)">${meta.abbr}</span>
        <span style="font-size:0.75rem;color:rgba(255,255,255,0.6);letter-spacing:3px;text-transform:uppercase">${product.van}</span>
      </div>
      <div class="gallery-hero-label">${product.brand} ${product.van} – ${product.type} (${product.fitment})</div>
    </div>
    <div class="gallery-grid">
      ${imgLabels.map(item => `
        <div class="gallery-tile">
          <div class="gallery-tile-inner">
            <div class="gallery-tile-icon">${item.icon}</div>
            <div class="gallery-tile-label">${item.label}</div>
            <div class="gallery-tile-badge">Coming Soon</div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}
