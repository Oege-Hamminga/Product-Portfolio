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
  /* fitment and part series removed */
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

/* ── Configurator reset ───────────────────────────────────────────── */
document.getElementById("cfg-reset").addEventListener("click", () => {
  if (!currentProduct) return;
  cfgState      = {};
  blockingState = {};
  populateBOM(currentProduct);
});

/* ── Tabs lock / unlock ───────────────────────────────────────────── */
function lockTabs() {
  document.getElementById("tabs-lock").classList.remove("hidden");
}

function unlockAndPopulate(product) {
  currentProduct = product;

  document.getElementById("m-type").textContent = product.type;
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
  const el = document.getElementById("market-content");
  if (!el) return;
  const md = getMarketData(product);
  if (!md) {
    el.innerHTML = `<p class="mkt-empty-msg">No market data available for this product.</p>`;
    return;
  }

  const isOEM = product.fitment === "OEM";
  const MKT_KEY = `snoeks_mkt_${product.brand}|${product.van}|${product.type}|${product.fitment}`;

  if (isOEM) {
    // ── OEM: intro year + image map with plant pinpoints ──
    const destinations = md.shippingDestinations || [];

    // Decide Europe Map vs World Map:
    // Use World map if any destination is outside Europe bounds (lat<30 or lat>72 or lng<-15 or lng>50)
    const useWorld = destinations.some(d => d.lat < 30 || d.lat > 72 || d.lng < -15 || d.lng > 50);
    const mapImg = useWorld ? "World map.png" : "Europe Map.png";

    // Coordinate formulas:
    // Europe Map: x=(lng+25)/70*100, y=(71-lat)/37*100
    // World Map (Mercator): x=(lng+180)/360*100, y=(90-lat)/180*100
    const destDots = destinations.map(d => {
      let x, y;
      if (useWorld) {
        x = ((d.lng + 180) / 360 * 100).toFixed(1);
        y = ((90 - d.lat) / 180 * 100).toFixed(1);
      } else {
        x = ((d.lng + 25) / 70 * 100).toFixed(1);
        y = ((71 - d.lat) / 37 * 100).toFixed(1);
      }
      return `<div class="map-dot" style="left:${x}%;top:${y}%" title="${d.country}">
        <span class="map-dot-ring"></span>
        <span class="map-dot-label">${d.country}</span>
      </div>`;
    }).join("");

    el.innerHTML = `
      <div class="mkt-overview-row">
        <div class="mkt-stat-card">
          <div class="mkt-stat-label">Market Introduction</div>
          <div class="mkt-stat-value">${md.introYear || "—"}</div>
        </div>
        <div class="mkt-stat-card">
          <div class="mkt-stat-label">Customer</div>
          <div class="mkt-stat-value">OEM — via vehicle manufacturer</div>
        </div>
        <div class="mkt-stat-card">
          <div class="mkt-stat-label">Plant(s)</div>
          <div class="mkt-stat-value">${destinations.length > 0 ? destinations.map(d=>d.country).join(", ") : "—"}</div>
        </div>
      </div>
      <div class="mkt-section">
        <div class="mkt-section-header">
          <div class="mkt-section-title">Plant(s)</div>
          <div class="mkt-section-sub">Manufacturing plants where OEM-configured vehicles are built</div>
        </div>
        <div class="map-img-frame">
          <img src="${mapImg}" alt="Plant locations map" class="map-bg-img" />
          ${destDots || `<span class="mkt-empty map-empty">No plant locations defined</span>`}
        </div>
      </div>
    `;
  } else {
    // ── After-fit: intro year + EU map + editable 22-country table ──
    const ALL_COUNTRIES = [
      {code:"NL",name:"Netherlands",  ex:42.7, ey:50.3},
      {code:"BE",name:"Belgium",      ex:42.0, ey:54.3},
      {code:"DE",name:"Germany",      ex:54.9, ey:50.0},
      {code:"FR",name:"France",       ex:39.1, ey:59.7},
      {code:"ES",name:"Spain",        ex:30.4, ey:82.7},
      {code:"GB",name:"United Kingdom",ex:35.6,ey:52.7},
      {code:"IT",name:"Italy",        ex:53.6, ey:78.6},
      {code:"CZ",name:"Czech Republic",ex:56.3,ey:56.5},
      {code:"DK",name:"Denmark",      ex:53.7, ey:41.4},
      {code:"AT",name:"Austria",      ex:59.1, ey:61.6},
      {code:"PL",name:"Poland",       ex:65.7, ey:50.8},
      {code:"SE",name:"Sweden",       ex:61.6, ey:31.6},
      {code:"FI",name:"Finland",      ex:71.4, ey:29.2},
      {code:"PT",name:"Portugal",     ex:22.7, ey:87.3},
      {code:"HU",name:"Hungary",      ex:62.9, ey:63.5},
      {code:"EE",name:"Estonia",      ex:71.1, ey:31.4},
      {code:"LT",name:"Lithuania",    ex:71.9, ey:44.1},
      {code:"LV",name:"Latvia",       ex:70.1, ey:38.1},
      {code:"RO",name:"Romania",      ex:73.0, ey:71.9},
      {code:"SI",name:"Slovenia",     ex:56.4, ey:67.3},
      {code:"SK",name:"Slovakia",     ex:60.1, ey:61.6},
      {code:"BG",name:"Bulgaria",     ex:69.0, ey:76.5},
    ];

    // Load saved edits from localStorage
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(MKT_KEY)) || {}; } catch(e){}

    const cd = md.countryData || {};
    const countryState = {};
    ALL_COUNTRIES.forEach(c => {
      const base = cd[c.code] || { active: false, homologation: "—" };
      countryState[c.code] = saved[c.code] || { active: base.active, homologation: base.homologation };
    });

    // Active country dots on EU map
    const activeDots = ALL_COUNTRIES
      .filter(c => countryState[c.code].active)
      .map(c => `<div class="map-dot map-dot--active" style="left:${c.ex}%;top:${c.ey}%" title="${c.name}">
        <span class="map-dot-ring"></span>
        <span class="map-dot-label">${c.code}</span>
      </div>`).join("");

    const rows = ALL_COUNTRIES.map(c => {
      const st = countryState[c.code];
      return `<tr data-country="${c.code}">
        <td class="ct-code">${c.code}</td>
        <td class="ct-name">${c.name}</td>
        <td class="ct-active">
          <select class="ct-select ct-select--status" data-field="active">
            <option value="true"  ${st.active ? 'selected':''}>Active</option>
            <option value="false" ${!st.active ? 'selected':''}>Not active</option>
          </select>
        </td>
        <td class="ct-homol">
          <select class="ct-select ct-select--homol" data-field="homologation">
            <option value="CoC" ${st.homologation==='CoC'?'selected':''}>CoC</option>
            <option value="GWC" ${st.homologation==='GWC'?'selected':''}>GWC</option>
            <option value="Both" ${st.homologation==='Both'?'selected':''}>Both</option>
            <option value="Other" ${st.homologation==='Other'?'selected':''}>Other</option>
            <option value="—" ${(st.homologation==='—'||!st.homologation)?'selected':''}>—</option>
          </select>
        </td>
      </tr>`;
    }).join("");

    const activeCount = ALL_COUNTRIES.filter(c => countryState[c.code].active).length;

    el.innerHTML = `
      <div class="mkt-overview-row">
        <div class="mkt-stat-card">
          <div class="mkt-stat-label">Market Introduction</div>
          <div class="mkt-stat-value">${md.introYear || "—"}</div>
        </div>
        <div class="mkt-stat-card">
          <div class="mkt-stat-label">Customer</div>
          <div class="mkt-stat-value">After-fit conversion</div>
        </div>
        <div class="mkt-stat-card">
          <div class="mkt-stat-label">Active Markets</div>
          <div class="mkt-stat-value" id="mkt-active-count">${activeCount} countries</div>
        </div>
      </div>
      <div class="mkt-section">
        <div class="mkt-section-header">
          <div class="mkt-section-title">Active Market Coverage</div>
          <div class="mkt-section-sub">Countries where this product is currently active</div>
        </div>
        <div class="map-img-frame map-img-frame--eu" id="af-map-frame">
          <img src="Europe Map.png" alt="Europe map" class="map-bg-img" />
          ${activeDots}
        </div>
      </div>
      <div class="mkt-section">
        <div class="mkt-section-header">
          <div class="mkt-section-title">Market &amp; Homologation Overview</div>
          <div class="mkt-section-sub">Edit active status and homologation method per country — changes are saved automatically</div>
        </div>
        <div class="country-table-wrap">
          <table class="country-table">
            <thead>
              <tr><th>Code</th><th>Country</th><th>Status</th><th>Homologation</th></tr>
            </thead>
            <tbody id="country-table-body">${rows}</tbody>
          </table>
        </div>
        <p class="mkt-homol-note">CoC = Certificate of Conformity (EU type approval). GWC = General Whole-vehicle Certification (national approval). Both = CoC primary, GWC fallback available.</p>
      </div>
    `;

    // Wire up selects — save changes and refresh EU map dots
    function refreshMapDots() {
      const frame = document.getElementById('af-map-frame');
      if (!frame) return;
      frame.querySelectorAll('.map-dot').forEach(d=>d.remove());
      ALL_COUNTRIES.filter(c => countryState[c.code].active).forEach(c => {
        const dot = document.createElement('div');
        dot.className = 'map-dot map-dot--active';
        dot.style.cssText = `left:${c.ex}%;top:${c.ey}%`;
        dot.title = c.name;
        dot.innerHTML = `<span class="map-dot-ring"></span><span class="map-dot-label">${c.code}</span>`;
        frame.appendChild(dot);
      });
      const cnt = document.getElementById('mkt-active-count');
      if (cnt) cnt.textContent = ALL_COUNTRIES.filter(c=>countryState[c.code].active).length + ' countries';
    }

    el.querySelectorAll('.ct-select').forEach(sel => {
      sel.addEventListener('change', function() {
        const row = this.closest('tr[data-country]');
        if (!row) return;
        const code = row.dataset.country;
        const field = this.dataset.field;
        if (field === 'active') countryState[code].active = (this.value === 'true');
        else countryState[code].homologation = this.value;
        localStorage.setItem(MKT_KEY, JSON.stringify(countryState));
        refreshMapDots();
      });
    });
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   BOM CONFIGURATOR — 3-section layout
═══════════════════════════════════════════════════════════════════════ */

// Question IDs that belong to the universal "Voertuig Configuratie" section
const UNIVERSAL_Q_IDS = new Set([
  "wielbasis","hoogte","schuifdeur","ramen_b","separatiewand","eerste_zitrij","bekleding"
]);

let cfgState      = {};  // answers for regular (universal + product) questions
let blockingState = {};  // answers for vehicle-specific blocking questions

function renderQBlock(questions, state, withIncompatible) {
  return questions.map(q => `
    <div class="cfg-question" data-q="${q.id}">
      <div class="cfg-question-label">${q.label}${q.note ? `<span class="cfg-q-note">${q.note}</span>` : ""}</div>
      <div class="cfg-options">
        ${q.options.map(opt => `
          <button class="cfg-opt-btn${state[q.id] === opt.value ? " active" : ""}${opt.incompatible ? " cfg-opt-incompatible" : ""}"
                  data-q="${q.id}" data-val="${opt.value}">
            ${opt.label}
          </button>
        `).join("")}
      </div>
    </div>
  `).join("");
}

let _vehicleClickHandler  = null;
let _specificClickHandler = null;
let _productClickHandler  = null;

function attachClickHandler(elId, stateKey, product, cfg) {
  const el = document.getElementById(elId);
  if (!el) return;
  const prev = elId === "cfg-questions-vehicle"  ? "_vehicleClickHandler"
             : elId === "cfg-questions-specific" ? "_specificClickHandler"
             :                                     "_productClickHandler";
  if (window[prev]) el.removeEventListener("click", window[prev]);
  const handler = e => {
    const btn = e.target.closest(".cfg-opt-btn[data-q]");
    if (!btn) return;
    const qId = btn.dataset.q;
    const val  = btn.dataset.val;
    if (stateKey === "blocking") blockingState[qId] = val;
    else                          cfgState[qId]      = val;
    el.querySelectorAll(`.cfg-opt-btn[data-q="${qId}"]`).forEach(b =>
      b.classList.toggle("active", b.dataset.val === val)
    );
    applyConfiguratorToBOM(product);
  };
  window[prev] = handler;
  el.addEventListener("click", handler);
}

function renderConfigurator(product) {
  const cfg = getConfigurator(product);

  const qVehicle  = document.getElementById("cfg-questions-vehicle");
  const secSpec   = document.getElementById("cfg-sec-specific");
  const qSpecific = document.getElementById("cfg-questions-specific");
  const qProduct  = document.getElementById("cfg-questions-product");
  const secNum    = document.getElementById("cfg-sec-product-num");

  if (!cfg) {
    if (qVehicle)  qVehicle.innerHTML  = "<p style='color:rgba(0,0,0,0.4);font-size:0.8rem;padding:12px 0'>Geen configurator beschikbaar voor dit product.</p>";
    if (qSpecific) qSpecific.innerHTML = "";
    if (qProduct)  qProduct.innerHTML  = "";
    if (secSpec)   secSpec.style.display = "none";
    return;
  }

  const blocking   = cfg.blockingQuestions || [];
  const universalQs = cfg.questions.filter(q => UNIVERSAL_Q_IDS.has(q.id));
  const productQs   = cfg.questions.filter(q => !UNIVERSAL_Q_IDS.has(q.id));

  // Section 1 — universal vehicle questions
  if (qVehicle) qVehicle.innerHTML = renderQBlock(universalQs, cfgState);

  // Section 2 — vehicle-specific blocking questions
  if (secSpec) {
    if (blocking.length > 0) {
      secSpec.style.display = "block";
      if (qSpecific) qSpecific.innerHTML = renderQBlock(blocking, blockingState);
      if (secNum) secNum.textContent = "3";
    } else {
      secSpec.style.display = "none";
      if (secNum) secNum.textContent = "2";
    }
  }

  // Section 3 — Snoeks product questions
  if (qProduct) qProduct.innerHTML = renderQBlock(productQs, cfgState);

  // Attach click handlers
  attachClickHandler("cfg-questions-vehicle",  "cfg",      product, cfg);
  attachClickHandler("cfg-questions-specific", "blocking", product, cfg);
  attachClickHandler("cfg-questions-product",  "cfg",      product, cfg);

  applyConfiguratorToBOM(product);
}

function applyConfiguratorToBOM(product) {
  const cfg = getConfigurator(product);
  if (!cfg) return;

  const blocking    = cfg.blockingQuestions || [];
  const universalQs = cfg.questions.filter(q => UNIVERSAL_Q_IDS.has(q.id));
  const productQs   = cfg.questions.filter(q => !UNIVERSAL_Q_IDS.has(q.id));
  const allRegularQs = [...universalQs, ...productQs];

  // Incompatibility check
  const isIncompatible = blocking.some(q => {
    const val = blockingState[q.id];
    if (val === undefined) return false;
    const opt = q.options.find(o => o.value === val);
    return opt && opt.incompatible;
  });
  const incompatEl = document.getElementById("cfg-incompatible-msg");
  if (incompatEl) incompatEl.style.display = isIncompatible ? "block" : "none";

  // Completeness check
  const allBlockAnswered = blocking.every(q => blockingState[q.id] !== undefined);
  const allCfgAnswered   = allRegularQs.every(q => cfgState[q.id] !== undefined);
  const allDone          = allBlockAnswered && allCfgAnswered && !isIncompatible;

  // Status text
  const totalQ    = blocking.length + allRegularQs.length;
  const answeredQ = blocking.filter(q => blockingState[q.id] !== undefined).length +
                    allRegularQs.filter(q => cfgState[q.id] !== undefined).length;
  const statusEl  = document.getElementById("cfg-status");
  if (statusEl) {
    if (isIncompatible) {
      statusEl.textContent = "⚠ Configuratie niet mogelijk voor deze specificatie";
      statusEl.classList.remove("cfg-status--done");
    } else if (allDone) {
      statusEl.textContent = "✓ Configuratie volledig — code gegenereerd";
      statusEl.classList.add("cfg-status--done");
    } else {
      statusEl.textContent = `${answeredQ} van ${totalQ} vragen beantwoord`;
      statusEl.classList.remove("cfg-status--done");
    }
  }

  // Quickcode
  const qcEl  = document.getElementById("quickcode-display");
  const qcVal = document.getElementById("quickcode-value");
  const bomResultEl = document.getElementById("bom-result");

  if (allDone) {
    const qc = computeQuickcode(product, cfgState, blockingState);
    if (qcVal) qcVal.textContent = qc || "—";
    if (qcEl)  qcEl.classList.remove("quickcode-display--pending");
    if (bomResultEl) {
      bomResultEl.style.display = "block";
      renderBOMTable(product);
    }
  } else {
    if (qcVal) qcVal.textContent = "Beantwoord alle vragen om de code te genereren";
    if (qcEl)  qcEl.classList.add("quickcode-display--pending");
    if (bomResultEl) bomResultEl.style.display = "none";
  }
}

function renderBOMTable(product) {
  const parts   = getBOMParts(product);
  const bodyEl  = document.getElementById("bom-body");
  const countEl = document.getElementById("bom-part-count");
  if (!bodyEl) return;

  if (!parts || parts.length === 0) {
    bodyEl.innerHTML = `<tr><td colspan="4" class="bom-empty-row">Geen onderdelen beschikbaar voor dit product.</td></tr>`;
    if (countEl) countEl.textContent = "";
    return;
  }

  bodyEl.innerHTML = parts.map(r => `
    <tr>
      <td class="bom-part-code">${r.part}</td>
      <td>${r.description}</td>
      <td>${r.qty}</td>
      <td>${r.unit}</td>
    </tr>`).join("");

  if (countEl) countEl.textContent = `${parts.length} onderdeel${parts.length !== 1 ? "en" : ""}`;
}

function populateBOM(product) {
  cfgState      = {};
  blockingState = {};

  // Show product image at top of BOM tab
  const heroWrap = document.getElementById("bom-product-hero");
  const heroImg  = document.getElementById("bom-product-hero-img");
  const imgUrl   = getProductImage(product);
  if (heroWrap && heroImg) {
    if (imgUrl) {
      heroImg.src = imgUrl;
      heroImg.alt = `${product.brand} ${product.van} – ${product.type}`;
      heroWrap.style.display = "block";
    } else {
      heroWrap.style.display = "none";
    }
  }

  // Hide BOM result until code is generated
  const bomResultEl = document.getElementById("bom-result");
  if (bomResultEl) bomResultEl.style.display = "none";

  // Reset quickcode to pending
  const qcEl  = document.getElementById("quickcode-display");
  const qcVal = document.getElementById("quickcode-value");
  if (qcEl)  qcEl.classList.add("quickcode-display--pending");
  if (qcVal) qcVal.textContent = "Beantwoord alle vragen om de code te genereren";

  renderConfigurator(product);
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
