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

const _vm = getVehicleMeta(firstP.brand, firstP.van);
document.getElementById("m-vantype").textContent     = _vm.vanType     || "—";
document.getElementById("m-marketintro").textContent = _vm.marketIntro || "—";

/* ── Product Type Selector ────────────────────────────────────────── */
const uniqueTypes = [...new Set(vehicleProducts.map(p => p.type))];
const typeBtnsEl  = document.getElementById("type-selector-btns");
const fitBtnsEl   = document.getElementById("fitment-selector-btns");

typeBtnsEl.innerHTML = uniqueTypes.map(t =>
  `<button class="sel-btn" data-type="${t}">${t}</button>`
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
  document.getElementById("pp-type").textContent  = type;
  document.getElementById("pp-label").textContent = "Choose fitment below";
  document.getElementById("m-type").textContent   = type;
  document.getElementById("m-fitment").innerHTML  = "—";
  document.getElementById("m-part").textContent   = "—";
  document.getElementById("meta-eyebrow").textContent = firstP.segment;

  /* Reset product image placeholder */
  document.getElementById("product-photo").style.display = "none";
  document.getElementById("pp-fallback").style.display   = "flex";

  lockTabs();
});

fitBtnsEl.addEventListener("click", e => {
  const btn = e.target.closest(".sel-btn[data-fitment]");
  if (!btn) return;
  const fitment = btn.dataset.fitment;

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

/* ── BOM module event listeners ──────────────────────────────────── */
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
  const cbs   = [...bomModulesEl.querySelectorAll("input[type=checkbox]")];
  const allOn = cbs.every(cb => cb.checked);
  cbs.forEach(cb => {
    cb.checked = !allOn;
    bomState[cb.dataset.module] = !allOn;
    cb.closest("label").classList.toggle("active", !allOn);
  });
  refreshBOMToggleBtn();
  renderBOMTable();
});

/* ── Configurator reset ───────────────────────────────────────────── */
document.getElementById("cfg-reset").addEventListener("click", () => {
  if (!currentProduct) return;
  cfgState     = {};
  blockingState = {};
  renderConfigurator(currentProduct);
  applyConfiguratorToBOM(currentProduct);
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

  /* ── Product image (Snoeks conversion photo) ──────────────────── */
  const productImgUrl = getProductImage(product);
  const productPhotoEl = document.getElementById("product-photo");
  const ppFallbackEl   = document.getElementById("pp-fallback");
  const ppTypeEl       = document.getElementById("pp-type");
  const ppLabelEl      = document.getElementById("pp-label");

  ppTypeEl.textContent  = product.type;
  ppLabelEl.textContent = product.fitment === "OEM" ? "OEM Fitment" : "After-fit Conversion";

  if (productImgUrl) {
    productPhotoEl.src = productImgUrl;
    productPhotoEl.alt = `${product.brand} ${product.van} – ${product.type}`;
    productPhotoEl.onerror = () => {
      productPhotoEl.style.display = "none";
      ppFallbackEl.style.display   = "flex";
    };
    productPhotoEl.style.display = "block";
    ppFallbackEl.style.display   = "none";
  } else {
    productPhotoEl.style.display = "none";
    ppFallbackEl.style.display   = "flex";
  }

  populateMarket(product);
  populateBOM(product);
  populateMarketingTools(product);

  document.getElementById("tabs-lock").classList.add("hidden");
}

/* ═══════════════════════════════════════════════════════════════════════
   MARKET PRESENCE
═══════════════════════════════════════════════════════════════════════ */
function populateMarket(product) {
  const md = getMarketData(product);
  const el = document.getElementById("market-content");

  if (!md) {
    el.innerHTML = `<p class="mkt-empty-msg">No market data available for this product.</p>`;
    return;
  }

  const isAfterfit   = product.fitment === "After-fit";
  const countryTag   = c => `<span class="mkt-country-tag">${c}</span>`;

  const cocSection = isAfterfit ? `
    <div class="mkt-section">
      <div class="mkt-section-header">
        <div class="mkt-section-title">CoC Availability</div>
        <div class="mkt-section-sub">Certificate of Conformity – aligned with active markets</div>
      </div>
      <div class="mkt-country-tags">
        ${md.cocMarkets && md.cocMarkets.length
          ? md.cocMarkets.map(countryTag).join("")
          : `<span class="mkt-empty">Not yet available</span>`}
      </div>
    </div>
  ` : "";

  el.innerHTML = `
    <div class="mkt-overview-row">
      <div class="mkt-stat-card">
        <div class="mkt-stat-label">Market Introduction</div>
        <div class="mkt-stat-value">${md.introYear}</div>
      </div>
      <div class="mkt-stat-card">
        <div class="mkt-stat-label">Starting Price</div>
        <div class="mkt-stat-value">${md.pricingNote}</div>
      </div>
      <div class="mkt-stat-card">
        <div class="mkt-stat-label">FY25 Volume</div>
        <div class="mkt-stat-value">${md.unitsFY25}</div>
      </div>
      <div class="mkt-stat-card">
        <div class="mkt-stat-label">Fitment Type</div>
        <div class="mkt-stat-value">${product.fitment}</div>
      </div>
    </div>

    <div class="mkt-sections">
      <div class="mkt-section">
        <div class="mkt-section-header">
          <div class="mkt-section-title">Active Markets</div>
          <div class="mkt-section-sub">Countries where this product is commercially available</div>
        </div>
        <div class="mkt-country-tags">
          ${md.activeMarkets.length
            ? md.activeMarkets.map(countryTag).join("")
            : `<span class="mkt-empty">No active markets listed</span>`}
        </div>
      </div>

      ${cocSection}
    </div>
  `;
}

/* ═══════════════════════════════════════════════════════════════════════
   BOM CONFIGURATOR  (generic + vehicle-specific with blocking questions)
═══════════════════════════════════════════════════════════════════════ */
let cfgState      = {};
let blockingState = {};

function renderConfigurator(product) {
  const cfg      = getConfigurator(product);
  const el       = document.getElementById("cfg-questions");
  const blockSec = document.getElementById("cfg-blocking-section");
  const bomCfg   = document.getElementById("bom-configurator");

  if (!cfg) {
    el.innerHTML = "";
    blockSec.style.display = "none";
    return;
  }

  /* ── Blocking questions ──────────────────────────────────────── */
  const blocking = cfg.blockingQuestions || [];
  if (blocking.length > 0) {
    blockSec.style.display = "block";
    const blockingQEl = document.getElementById("cfg-blocking-questions");

    blockingQEl.innerHTML = blocking.map(q => `
      <div class="cfg-question" data-q="${q.id}">
        <div class="cfg-question-label">${q.label}</div>
        <div class="cfg-options">
          ${q.options.map(opt => `
            <button class="cfg-opt-btn${blockingState[q.id] === opt.value ? " active" : ""}"
                    data-q="${q.id}" data-val="${opt.value}">
              ${opt.label}
            </button>
          `).join("")}
        </div>
      </div>
    `).join("");

    /* Wire click handler freshly (remove then add to avoid duplicates) */
    blockingQEl.removeEventListener("click", _blockingClickHandler);
    _blockingClickHandler = e => handleBlockingClick(e, product, cfg);
    blockingQEl.addEventListener("click", _blockingClickHandler);

    updateBlockingLock(product, cfg);
  } else {
    blockSec.style.display = "none";
    bomCfg.classList.remove("cfg-blocked");
  }

  /* ── Regular questions ───────────────────────────────────────── */
  el.innerHTML = cfg.questions.map(q => `
    <div class="cfg-question" data-q="${q.id}">
      <div class="cfg-question-label">${q.label}</div>
      <div class="cfg-options">
        ${q.options.map(opt => `
          <button class="cfg-opt-btn${cfgState[q.id] === opt.value ? " active" : ""}"
                  data-q="${q.id}" data-val="${opt.value}">
            ${opt.label}
          </button>
        `).join("")}
      </div>
    </div>
  `).join("");

  /* Remove old listener, add fresh one */
  el.removeEventListener("click", _cfgClickHandler);
  _cfgClickHandler = e => handleCfgClick(e, product, cfg);
  el.addEventListener("click", _cfgClickHandler);

  updateCfgStatus(product, cfg);
}

/* Stored listener references so we can remove them cleanly */
let _cfgClickHandler      = null;
let _blockingClickHandler = null;

function handleBlockingClick(e, product, cfg) {
  const btn = e.target.closest(".cfg-opt-btn[data-q]");
  if (!btn) return;

  const qId = btn.dataset.q;
  const val  = btn.dataset.val;
  blockingState[qId] = val;

  document.querySelectorAll(`#cfg-blocking-questions .cfg-opt-btn[data-q="${qId}"]`).forEach(b =>
    b.classList.toggle("active", b.dataset.val === val)
  );

  updateBlockingLock(product, cfg);
  applyConfiguratorToBOM(product);
}

function handleCfgClick(e, product, cfg) {
  const btn = e.target.closest(".cfg-opt-btn[data-q]");
  if (!btn || !currentProduct) return;

  const qId = btn.dataset.q;
  const val  = btn.dataset.val;
  cfgState[qId] = val;

  document.querySelectorAll(`#cfg-questions .cfg-opt-btn[data-q="${qId}"]`).forEach(b =>
    b.classList.toggle("active", b.dataset.val === val)
  );

  updateCfgStatus(currentProduct, cfg);
  applyConfiguratorToBOM(currentProduct);
}

function updateBlockingLock(product, cfg) {
  const blocking     = cfg.blockingQuestions || [];
  const allAnswered  = blocking.every(q => blockingState[q.id] !== undefined);
  document.getElementById("bom-configurator").classList.toggle("cfg-blocked", !allAnswered);
}

function updateCfgStatus(product, cfg) {
  if (!cfg) return;
  const blocking  = cfg.blockingQuestions || [];
  const totalQ    = cfg.questions.length + blocking.length;
  const answered  = cfg.questions.filter(q => cfgState[q.id] !== undefined).length
                  + blocking.filter(q => blockingState[q.id] !== undefined).length;
  const statusEl  = document.getElementById("cfg-status");

  if (answered === totalQ) {
    statusEl.textContent = "✓ Configuration complete – BOM updated";
    statusEl.classList.add("cfg-status--done");
  } else {
    statusEl.textContent = `${answered} of ${totalQ} questions answered`;
    statusEl.classList.remove("cfg-status--done");
  }
}

function applyConfiguratorToBOM(product) {
  const cfg = getConfigurator(product);
  if (!cfg) return;

  const activeModules = new Set(cfg.alwaysActive || []);

  /* Apply blocking question activations first */
  (cfg.blockingQuestions || []).forEach(q => {
    const val = blockingState[q.id];
    if (val === undefined) return;
    const opt = q.options.find(o => o.value === val);
    if (opt) opt.activates.forEach(m => activeModules.add(m));
  });

  /* Apply regular question activations */
  cfg.questions.forEach(q => {
    const val = cfgState[q.id];
    if (val === undefined) return;
    const opt = q.options.find(o => o.value === val);
    if (opt) opt.activates.forEach(m => activeModules.add(m));
  });

  const modules = getBOMModules(product);
  modules.forEach(m => { bomState[m.id] = activeModules.has(m.id); });

  refreshModuleCheckboxes();
  refreshBOMToggleBtn();
  renderBOMTable();
}

function refreshModuleCheckboxes() {
  bomModulesEl.querySelectorAll("input[type=checkbox]").forEach(cb => {
    const isOn = bomState[cb.dataset.module] === true;
    cb.checked = isOn;
    cb.closest("label").classList.toggle("active", isOn);
  });
}

/* ── BOM population ──────────────────────────────────────────────── */
function populateBOM(product) {
  const modules = getBOMModules(product);
  cfgState      = {};
  blockingState  = {};
  bomState      = {};
  modules.forEach(m => { bomState[m.id] = false; });

  bomModulesEl.innerHTML = modules.map(m => `
    <label class="bom-module-check">
      <input type="checkbox" data-module="${m.id}">
      <span class="bom-module-label">${m.label}</span>
      <span class="bom-module-count">${m.parts.length} part${m.parts.length !== 1 ? "s" : ""}</span>
    </label>
  `).join("");

  renderConfigurator(product);
  refreshBOMToggleBtn();
  renderBOMTable();
}

function refreshBOMToggleBtn() {
  if (!currentProduct) return;
  const modules = getBOMModules(currentProduct);
  const allOn   = modules.length > 0 && modules.every(m => bomState[m.id]);
  document.getElementById("bom-toggle-all").textContent = allOn ? "Deselect All" : "Select All";
}

function renderBOMTable() {
  if (!currentProduct) return;
  const modules  = getBOMModules(currentProduct);
  const allParts = getBOMParts(currentProduct);

  const activeParts  = new Set();
  const partToModule = {};
  modules.forEach(m => {
    if (bomState[m.id]) m.parts.forEach(pid => { activeParts.add(pid); partToModule[pid] = m.label; });
  });

  const visible = allParts.filter(r => activeParts.has(r.part));

  if (visible.length === 0) {
    document.getElementById("bom-body").innerHTML =
      `<tr><td colspan="5" class="bom-empty-row">
        Answer the configurator questions above to generate your parts list.
       </td></tr>`;
    document.getElementById("bom-part-count").textContent = "No parts in configuration";
    return;
  }

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

/* ═══════════════════════════════════════════════════════════════════════
   MARKETING TOOLS
═══════════════════════════════════════════════════════════════════════ */
function populateMarketingTools(product) {
  const tools = getMarketingTools(product);
  const el    = document.getElementById("marketing-tools-content");

  /* Prefer the Snoeks product conversion image; fall back to vehicle image */
  const heroImgUrl   = getProductImage(product) || VAN_IMAGES[product.van] || "";
  const heroImgLabel = getProductImage(product)
    ? `${product.brand} ${product.van} – ${product.type} (${product.fitment})`
    : `${product.brand} ${product.van}`;

  const docCard = (title, filename, type) => `
    <a class="mkt-doc-card" href="${filename}" target="_blank" rel="noopener">
      <div class="mkt-doc-info">
        <div class="mkt-doc-type">${type}</div>
        <div class="mkt-doc-title">${title}</div>
      </div>
      <div class="mkt-doc-arrow">↗</div>
    </a>
  `;

  const hasDocuments = tools.brochures.length > 0 || tools.priceLists.length > 0;

  el.innerHTML = `
    <div class="mkt-tools-layout">

      <div class="mkt-tools-docs">
        <div class="mkt-tools-section-title">Brochures &amp; Price Lists</div>

        ${hasDocuments ? `
          <div class="mkt-docs-list">
            ${tools.brochures.map(b  => docCard(b.title,  b.filename,  `Brochure · ${b.lang}`)).join("")}
            ${tools.priceLists.map(pl => docCard(pl.title, pl.filename, `Price List · ${pl.lang}`)).join("")}
          </div>
        ` : `
          <div class="mkt-no-docs">
            <p>No documents are available for this product yet.</p>
            <button class="action-btn" style="margin-top:12px">Request Documents</button>
          </div>
        `}
      </div>

      <div class="mkt-tools-images">
        <div class="mkt-tools-section-title">Product Photography</div>
        <div class="gallery-hero">
          ${heroImgUrl
            ? `<img src="${heroImgUrl}" alt="${heroImgLabel}" loading="lazy"
                    onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
            : ""}
          <div class="gallery-hero-fallback" style="background:linear-gradient(135deg,${meta.color} 0%,${meta.color}99 100%);${heroImgUrl ? "display:none" : ""}">
            <span style="font-size:3rem;font-weight:900;color:rgba(255,255,255,0.9)">${meta.abbr}</span>
            <span style="font-size:0.72rem;color:rgba(255,255,255,0.55);letter-spacing:3px;text-transform:uppercase">${product.van}</span>
          </div>
          <div class="gallery-hero-label">${heroImgLabel}</div>
        </div>
        <div class="gallery-thumbs">
          ${["Interior – Cabin","Installation Diagram","Product Close-up"].map(lbl => `
            <div class="gallery-thumb">
              <div class="gallery-thumb-inner">
                <div class="gallery-thumb-label">${lbl}</div>
                <div class="gallery-thumb-badge">Coming Soon</div>
              </div>
            </div>
          `).join("")}
        </div>
        <div class="gallery-footer">
          <button class="action-btn">Request Hi-Res Assets</button>
          <button class="action-btn action-btn--outline" onclick="window.print()">Print Sheet</button>
        </div>
      </div>

    </div>
  `;
}
