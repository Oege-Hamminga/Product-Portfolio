/* ── Resolve vehicle from URL ─────────────────────────────────────── */
const params = new URLSearchParams(location.search);
const qBrand = params.get("brand") || "";
const qVan   = params.get("van")   || "";

function getLocalCustomProducts() {
  try { return JSON.parse(localStorage.getItem('snoeks_custom_products')) || []; } catch(e) { return []; }
}
const vehicleProducts = [...products, ...getLocalCustomProducts()].filter(p => p.brand === qBrand && p.van === qVan);

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

const imgUrl  = getVanImageOverride(firstP.van) || VAN_IMAGES[firstP.van] || null;
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

wireVehicleImageEdit();

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
const typeBtnsEl  = document.getElementById("type-selector-btns");
const fitBtnsEl   = document.getElementById("fitment-selector-btns");

const SELECTOR_HIDDEN_KEY = `snoeks_sel_hidden_${qBrand}|${qVan}`;
function getSelectorHidden() {
  try { return new Set(JSON.parse(localStorage.getItem(SELECTOR_HIDDEN_KEY)) || []); } catch(e) { return new Set(); }
}
function saveSelectorHidden(set) {
  localStorage.setItem(SELECTOR_HIDDEN_KEY, JSON.stringify([...set]));
}
function getEffectiveProducts() {
  const hidden = getSelectorHidden();
  return vehicleProducts.filter(p => !hidden.has(`${p.type}|${p.fitment}`));
}

function renderTypeSelector() {
  const uniqueTypes = [...new Set(getEffectiveProducts().map(p => p.type))];
  typeBtnsEl.innerHTML = uniqueTypes.map(t =>
    `<button class="sel-btn" data-type="${t}">${t}</button>`
  ).join("");
}

renderTypeSelector();
wireSelectorEdit();

let currentProduct = null;

typeBtnsEl.addEventListener("click", e => {
  const btn = e.target.closest(".sel-btn[data-type]");
  if (!btn) return;
  const type = btn.dataset.type;

  typeBtnsEl.querySelectorAll(".sel-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.type === type)
  );

  const availFitments = [...new Set(
    getEffectiveProducts().filter(p => p.type === type).map(p => p.fitment)
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

/* ── Configurator reset (BOM removed; guard in case element still exists) ── */
const cfgResetBtn = document.getElementById("cfg-reset");
if (cfgResetBtn) cfgResetBtn.addEventListener("click", () => {
  if (!currentProduct) return;
  cfgState      = {};
  blockingState = {};
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
  const productImgUrl = getProductImageOverride(product) || getProductImage(product);
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
  populateMarketingTools(product);

  document.getElementById("tabs-lock").classList.add("hidden");

  /* ── Meta edit button is shown via CSS (body.pm-unlocked) ───── */

  /* ── Wire meta edit button ────────────────────────────────────── */
  const metaEditBtn = document.getElementById('meta-edit-btn');
  metaEditBtn.onclick = null;
  metaEditBtn.addEventListener('click', function() {
    if (metaUnlocked) {
      const ov = loadMetaOverride(currentProduct);
      document.querySelectorAll('.meta-edit-input').forEach(inp => {
        const field = inp.dataset.field;
        if (field === 'm-brand')       ov.brand       = inp.value;
        if (field === 'm-van')         ov.van          = inp.value;
        if (field === 'm-segment')     ov.segment      = inp.value;
        if (field === 'm-vantype')     ov.vanType      = inp.value;
        if (field === 'm-marketintro') ov.marketIntro  = inp.value;
      });
      saveMetaOverride(currentProduct, ov);
      metaUnlocked = false;
      this.textContent = 'Edit';
      renderMetaTable(currentProduct, false);
      return;
    }
    showMktPasswordPrompt(this, () => {
      metaUnlocked = true;
      metaEditBtn.textContent = 'Done';
      renderMetaTable(currentProduct, true);
    });
  });

  /* ── Wire image edits ─────────────────────────────────────────── */
  wireProductImageEdit(product);

  /* ── Render meta table with any saved overrides ───────────────── */
  renderMetaTable(product, false);
}

/* ═══════════════════════════════════════════════════════════════════════
   IMAGE OVERRIDE HELPERS
═══════════════════════════════════════════════════════════════════════ */

function getVanImageOverride(van) {
  return localStorage.getItem(`snoeks_img_van_${van}`) || null;
}
function getProductImageOverride(product) {
  return localStorage.getItem(`snoeks_img_prod_${product.brand}|${product.van}|${product.type}|${product.fitment}`) || null;
}

function wireVehicleImageEdit() {
  const vehicleEditBtn     = document.getElementById('vehicle-img-edit-btn');
  const vehicleOverlay     = document.getElementById('vehicle-img-edit-overlay');
  const vehicleUploadInput = document.getElementById('vehicle-img-upload');
  const vehicleRemoveBtn   = document.getElementById('vehicle-img-remove');

  if (vehicleEditBtn) {
    vehicleEditBtn.onclick = function() {
      if (vehicleOverlay.style.display !== 'none') { vehicleOverlay.style.display = 'none'; return; }
      showMktPasswordPrompt(this, () => {
        vehicleOverlay.style.display = 'flex';
        vehicleRemoveBtn.style.display = getVanImageOverride(firstP.van) ? 'inline-block' : 'none';
      });
    };
  }

  if (vehicleUploadInput) {
    vehicleUploadInput.onchange = function() {
      const file = this.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(e) {
        localStorage.setItem(`snoeks_img_van_${firstP.van}`, e.target.result);
        const photoEl = document.getElementById('vehicle-photo');
        const fallbackEl = document.getElementById('vp-fallback');
        photoEl.src = e.target.result;
        photoEl.style.display = 'block';
        fallbackEl.style.display = 'none';
        vehicleRemoveBtn.style.display = 'inline-block';
        vehicleUploadInput.value = '';
      };
      reader.readAsDataURL(file);
    };
  }

  if (vehicleRemoveBtn) {
    vehicleRemoveBtn.onclick = function() {
      localStorage.removeItem(`snoeks_img_van_${firstP.van}`);
      const photoEl = document.getElementById('vehicle-photo');
      const fallbackEl = document.getElementById('vp-fallback');
      const origUrl = VAN_IMAGES[firstP.van] || null;
      if (origUrl) { photoEl.src = origUrl; photoEl.style.display = 'block'; fallbackEl.style.display = 'none'; }
      else { photoEl.style.display = 'none'; fallbackEl.style.display = 'flex'; }
      vehicleRemoveBtn.style.display = 'none';
      vehicleOverlay.style.display = 'none';
    };
  }
}

function wireProductImageEdit(product) {
  const productEditBtn     = document.getElementById('product-img-edit-btn');
  const productOverlay     = document.getElementById('product-img-edit-overlay');
  const productUploadInput = document.getElementById('product-img-upload');
  const productRemoveBtn   = document.getElementById('product-img-remove');

  if (productEditBtn) {
    productEditBtn.onclick = function() {
      if (productOverlay.style.display !== 'none') { productOverlay.style.display = 'none'; return; }
      showMktPasswordPrompt(this, () => {
        productOverlay.style.display = 'flex';
        productRemoveBtn.style.display = getProductImageOverride(product) ? 'inline-block' : 'none';
      });
    };
  }

  if (productUploadInput) {
    productUploadInput.onchange = function() {
      const file = this.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(e) {
        const key = `snoeks_img_prod_${product.brand}|${product.van}|${product.type}|${product.fitment}`;
        localStorage.setItem(key, e.target.result);
        const photoEl = document.getElementById('product-photo');
        const ppFallback = document.getElementById('pp-fallback');
        photoEl.src = e.target.result;
        photoEl.style.display = 'block';
        ppFallback.style.display = 'none';
        productRemoveBtn.style.display = 'inline-block';
        productUploadInput.value = '';
      };
      reader.readAsDataURL(file);
    };
  }

  if (productRemoveBtn) {
    productRemoveBtn.onclick = function() {
      const key = `snoeks_img_prod_${product.brand}|${product.van}|${product.type}|${product.fitment}`;
      localStorage.removeItem(key);
      const photoEl = document.getElementById('product-photo');
      const ppFallback = document.getElementById('pp-fallback');
      const origUrl = getProductImage(product);
      if (origUrl) { photoEl.src = origUrl; photoEl.style.display = 'block'; ppFallback.style.display = 'none'; }
      else { photoEl.style.display = 'none'; ppFallback.style.display = 'flex'; }
      productRemoveBtn.style.display = 'none';
      productOverlay.style.display = 'none';
    };
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   SELECTOR EDIT
═══════════════════════════════════════════════════════════════════════ */

let selectorEditUnlocked = false;

function wireSelectorEdit() {
  const editBtn = document.getElementById('selector-edit-btn');
  if (!editBtn) return;
  editBtn.addEventListener('click', function() {
    if (selectorEditUnlocked) {
      selectorEditUnlocked = false;
      this.textContent = 'Edit';
      document.getElementById('selector-edit-panel').style.display = 'none';
      renderTypeSelector();
      return;
    }
    showMktPasswordPrompt(this, () => {
      selectorEditUnlocked = true;
      editBtn.textContent = 'Done';
      document.getElementById('selector-edit-panel').style.display = 'block';
      renderSelectorEditPanel();
    });
  });
}

function renderSelectorEditPanel() {
  const panel = document.getElementById('selector-edit-panel');
  if (!panel) return;
  const effProds = getEffectiveProducts();
  const allCombos = effProds.map(p => ({ type: p.type, fitment: p.fitment, key: `${p.type}|${p.fitment}` }));
  // Deduplicate
  const seen = new Set();
  const uniqueCombos = allCombos.filter(c => { if (seen.has(c.key)) return false; seen.add(c.key); return true; });

  panel.innerHTML = `
    <div class="sel-edit-panel">
      <div class="sel-edit-title">Product Combinations</div>
      <div class="sel-edit-combos">
        ${uniqueCombos.length
          ? uniqueCombos.map(c => `
              <div class="sel-edit-combo-row">
                <span class="sel-edit-type">${c.type}</span>
                <span class="sel-edit-sep">+</span>
                <span class="sel-edit-fit">${c.fitment}</span>
                <button class="sel-edit-rm" data-key="${c.key}">✕ Remove</button>
              </div>`).join('')
          : '<p class="sel-edit-empty">No combinations. Add one below.</p>'}
      </div>
      <div class="sel-edit-add-form">
        <div class="sel-edit-add-title">Add combination</div>
        <div class="sel-edit-add-row">
          <select class="sel-edit-select" id="sel-add-type">
            <option value="">— Type —</option>
            <option value="Crew Cab">Crew Cab</option>
            <option value="Flex Cab">Flex Cab</option>
            <option value="Partition Wall">Partition Wall</option>
          </select>
          <select class="sel-edit-select" id="sel-add-fitment">
            <option value="">— Fitment —</option>
            <option value="OEM">OEM</option>
            <option value="After-fit">After-fit</option>
          </select>
          <button class="plant-add-btn" id="sel-add-btn">+ Add</button>
        </div>
      </div>
    </div>`;

  panel.querySelectorAll('.sel-edit-rm').forEach(btn => {
    btn.addEventListener('click', () => {
      const hidden = getSelectorHidden();
      hidden.add(btn.dataset.key);
      saveSelectorHidden(hidden);
      renderSelectorEditPanel();
      renderTypeSelector();
    });
  });

  panel.querySelector('#sel-add-btn').addEventListener('click', () => {
    const type    = panel.querySelector('#sel-add-type').value;
    const fitment = panel.querySelector('#sel-add-fitment').value;
    if (!type || !fitment) return;
    const key = `${type}|${fitment}`;
    const alreadyExists = vehicleProducts.find(p => p.type === type && p.fitment === fitment);
    if (alreadyExists) {
      const hidden = getSelectorHidden();
      hidden.delete(key);
      saveSelectorHidden(hidden);
    } else {
      const customs = getLocalCustomProducts();
      const newProd = { brand: qBrand, van: qVan, segment: firstP.segment, type, fitment };
      customs.push(newProd);
      localStorage.setItem('snoeks_custom_products', JSON.stringify(customs));
      vehicleProducts.push(newProd);
    }
    renderSelectorEditPanel();
    renderTypeSelector();
  });
}

function showIntroPop(anchor, INTRO_KEY, currentVal, el) {
  const existing = document.getElementById('mkt-intro-pop');
  if (existing) { existing.remove(); return; }
  const pop = document.createElement('div');
  pop.id = 'mkt-intro-pop';
  pop.className = 'matrix-cell-popover';
  pop.style.minWidth = '200px';
  pop.innerHTML = `
    <div style="font-size:0.72rem;color:rgba(255,255,255,0.5);margin-bottom:6px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;">Market Introduction Year</div>
    <div class="mcp-pw-form">
      <input class="mcp-pw-input" type="text" placeholder="e.g. 2019" value="${currentVal === '—' ? '' : currentVal}" style="width:70px"/>
      <button class="mcp-pw-submit">Save</button>
    </div>`;
  pop.addEventListener('click', e => e.stopPropagation());
  pop.querySelector('.mcp-pw-submit').addEventListener('click', () => {
    const newVal = pop.querySelector('.mcp-pw-input').value.trim() || '—';
    localStorage.setItem(INTRO_KEY, newVal);
    const valEl = el.querySelector('#mkt-intro-year-val');
    if (valEl) valEl.textContent = newVal;
    pop.remove();
  });
  pop.querySelector('.mcp-pw-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') pop.querySelector('.mcp-pw-submit').click();
  });
  const r = anchor.getBoundingClientRect();
  pop.style.cssText += `;position:fixed;top:${r.bottom+6}px;left:${Math.max(8,r.right-210)}px;z-index:9999`;
  document.body.appendChild(pop);
  setTimeout(() => pop.querySelector('.mcp-pw-input').focus(), 50);
  function outside(e) { if (!pop.contains(e.target) && e.target !== anchor) { pop.remove(); document.removeEventListener('click', outside); } }
  setTimeout(() => document.addEventListener('click', outside), 0);
}

/* ═══════════════════════════════════════════════════════════════════════
   META TABLE EDITING
═══════════════════════════════════════════════════════════════════════ */

let metaUnlocked = false;

function loadMetaOverride(product) {
  try { return JSON.parse(localStorage.getItem(`snoeks_vmeta_${product.brand}|${product.van}`)) || {}; } catch(e) { return {}; }
}
function saveMetaOverride(product, data) {
  localStorage.setItem(`snoeks_vmeta_${product.brand}|${product.van}`, JSON.stringify(data));
}

function renderMetaTable(product, editing) {
  const ov = loadMetaOverride(product);
  const _vm = getVehicleMeta(product.brand, product.van);
  const fields = [
    { id: 'm-brand',       label: 'Brand',          val: ov.brand       || product.brand },
    { id: 'm-van',         label: 'Van Model',       val: ov.van         || product.van },
    { id: 'm-segment',     label: 'Segment',         val: ov.segment     || product.segment },
    { id: 'm-vantype',     label: 'Van Type',        val: ov.vanType     || _vm.vanType || '—' },
    { id: 'm-marketintro', label: 'Market Intro',    val: ov.marketIntro || _vm.marketIntro || '—' },
    { id: 'm-type',        label: 'Product Type',    val: document.getElementById('m-type').textContent || '—' },
    { id: 'm-fitment',     label: 'Market Segment',  val: product.fitment },
  ];
  const tbody = document.querySelector('.meta-table tbody') || document.querySelector('.meta-table');
  if (!tbody) return;
  tbody.innerHTML = fields.map(f => `
    <tr>
      <td>${f.label}</td>
      <td id="${f.id}">${editing && f.id !== 'm-type' && f.id !== 'm-fitment'
        ? `<input class="meta-edit-input" data-field="${f.id}" value="${f.val.replace(/"/g,'&quot;')}"/>`
        : f.val}
      </td>
    </tr>`).join('');
}

/* ═══════════════════════════════════════════════════════════════════════
   MARKET PRESENCE
═══════════════════════════════════════════════════════════════════════ */

let mktUnlocked = window.isPMUnlocked ? window.isPMUnlocked() : false;

// Stay in sync when header login changes
document.addEventListener('pm-lock-change', function(e) { mktUnlocked = e.detail.unlocked; });

function showMktPasswordPrompt(anchor, onSuccess) {
  if (window.isPMUnlocked && window.isPMUnlocked()) { mktUnlocked = true; onSuccess(); return; }
  const existing = document.getElementById('mkt-pw-pop');
  if (existing) { existing.remove(); return; }
  const pop = document.createElement('div');
  pop.id = 'mkt-pw-pop';
  pop.className = 'matrix-cell-popover';
  pop.style.minWidth = '200px';
  pop.innerHTML = `
    <div style="font-size:0.72rem;color:rgba(255,255,255,0.5);margin-bottom:6px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;">Password required</div>
    <div class="mcp-pw-form">
      <input class="mcp-pw-input" type="password" placeholder="Enter password" />
      <button class="mcp-pw-submit">OK</button>
    </div>
    <div class="mcp-pw-error" style="display:none">Incorrect password</div>
  `;
  pop.addEventListener('click', e => e.stopPropagation());
  function tryUnlock() {
    if (pop.querySelector('.mcp-pw-input').value === 'PM26') {
      mktUnlocked = true;
      pop.remove();
      onSuccess();
    } else {
      pop.querySelector('.mcp-pw-error').style.display = 'block';
      pop.querySelector('.mcp-pw-input').value = '';
      pop.querySelector('.mcp-pw-input').focus();
    }
  }
  pop.querySelector('.mcp-pw-submit').addEventListener('click', tryUnlock);
  pop.querySelector('.mcp-pw-input').addEventListener('keydown', e => { if (e.key === 'Enter') tryUnlock(); });
  const rect = anchor.getBoundingClientRect();
  pop.style.position = 'fixed';
  pop.style.top  = (rect.bottom + 6) + 'px';
  pop.style.left = Math.max(8, rect.right - 210) + 'px';
  pop.style.zIndex = '9999';
  document.body.appendChild(pop);
  setTimeout(() => pop.querySelector('.mcp-pw-input').focus(), 50);
  function outsideClick(e) {
    if (!pop.contains(e.target) && e.target !== anchor) {
      pop.remove();
      document.removeEventListener('click', outsideClick);
    }
  }
  setTimeout(() => document.addEventListener('click', outsideClick), 0);
}

function populateMarket(product) {
  const el = document.getElementById("market-content");
  if (!el) return;
  const md = getMarketData(product);
  if (!md) {
    el.innerHTML = `<p class="mkt-empty-msg">No market data available for this product.</p>`;
    return;
  }

  const isOEM = product.fitment === "OEM";
  const MKT_KEY    = `snoeks_mkt_${product.brand}|${product.van}|${product.type}|${product.fitment}`;
  const PLANTS_KEY = `snoeks_plants_${product.brand}|${product.van}|${product.type}|${product.fitment}`;
  const INTRO_KEY = `snoeks_intro_${product.brand}|${product.van}|${product.type}|${product.fitment}`;
  const introYear = localStorage.getItem(INTRO_KEY) || md.introYear || "—";

  /* ── OEM ──────────────────────────────────────────────────────── */
  if (isOEM) {
    let plants = [];
    try { plants = JSON.parse(localStorage.getItem(PLANTS_KEY)) || []; } catch(e) {}
    if (!plants.length) {
      plants = (md.shippingDestinations || []).map(d => ({
        name: d.name || d.country,
        country: d.country,
        introYear: d.introYear || md.introYear || "—"
      }));
    }

    function savePlants() { localStorage.setItem(PLANTS_KEY, JSON.stringify(plants)); }

    function renderPlantRows() {
      if (!plants.length) return `<tr><td colspan="4" class="mkt-empty-row">No plants defined.</td></tr>`;
      return plants.map((p, i) => `<tr>
        <td>${p.name || "—"}</td>
        <td>${p.country}</td>
        <td>${p.introYear || "—"}</td>
        <td>${mktUnlocked ? `<button class="plant-remove-btn" data-idx="${i}">✕</button>` : ''}</td>
      </tr>`).join('');
    }

    el.innerHTML = `
      <div class="mkt-overview-row">
        <div class="mkt-stat-card">
          <div class="mkt-stat-label">Market Introduction</div>
          <div style="display:flex;align-items:center;gap:6px">
            <div class="mkt-stat-value" id="mkt-intro-year-val">${introYear}</div>
            <button class="mkt-intro-edit-icon" id="mkt-intro-edit-icon" title="Edit year">✎</button>
          </div>
        </div>
        <div class="mkt-stat-card">
          <div class="mkt-stat-label">Customer</div>
          <div class="mkt-stat-value">OEM — via vehicle manufacturer</div>
        </div>
        <div class="mkt-stat-card">
          <div class="mkt-stat-label">Plants</div>
          <div class="mkt-stat-value" id="mkt-plant-count">${plants.length} location${plants.length !== 1 ? 's' : ''}</div>
        </div>
      </div>

      <div class="mkt-section">
        <div class="mkt-section-header mkt-section-header--flex">
          <div>
            <div class="mkt-section-title">Active Plants</div>
            <div class="mkt-section-sub">Registered manufacturing plants for this product</div>
          </div>
          <button class="mkt-edit-btn" id="oem-edit-btn">${mktUnlocked ? 'Done' : 'Edit'}</button>
        </div>
        <div class="plant-table-wrap">
          <table class="plant-table">
            <thead><tr><th>Plant Name</th><th>Country / Location</th><th>Introduction</th><th></th></tr></thead>
            <tbody id="plant-table-body">${renderPlantRows()}</tbody>
          </table>
        </div>
        <div class="plant-add-form" id="plant-add-form" style="display:${mktUnlocked ? 'flex' : 'none'}">
          <input class="plant-input" id="pi-name"    placeholder="Plant name" />
          <input class="plant-input" id="pi-country" placeholder="Country / Location" />
          <input class="plant-input plant-input--narrow" id="pi-year" placeholder="Intro year" />
          <button class="plant-add-btn" id="pi-add-btn">+ Add Plant</button>
        </div>
      </div>
    `;

    function refreshPlantUI() {
      const tbody = el.querySelector('#plant-table-body');
      if (tbody) tbody.innerHTML = renderPlantRows();
      const cnt = el.querySelector('#mkt-plant-count');
      if (cnt) cnt.textContent = plants.length + ' location' + (plants.length !== 1 ? 's' : '');
      wireRemoveBtns();
    }

    function wireRemoveBtns() {
      el.querySelectorAll('.plant-remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          plants.splice(parseInt(this.dataset.idx), 1);
          savePlants();
          refreshPlantUI();
        });
      });
    }
    wireRemoveBtns();

    const introEditIconOEM = el.querySelector('#mkt-intro-edit-icon');
    if (introEditIconOEM) {
      introEditIconOEM.addEventListener('click', function() {
        const curVal = (el.querySelector('#mkt-intro-year-val') || {}).textContent || introYear;
        showMktPasswordPrompt(this, () => { showIntroPop(this, INTRO_KEY, curVal, el); });
      });
    }

    el.querySelector('#pi-add-btn').addEventListener('click', function() {
      const name    = el.querySelector('#pi-name').value.trim();
      const country = el.querySelector('#pi-country').value.trim();
      const year    = el.querySelector('#pi-year').value.trim();
      if (!country) { el.querySelector('#pi-country').focus(); return; }
      plants.push({ name: name || country, country, introYear: year || "—" });
      savePlants();
      refreshPlantUI();
      ['#pi-name','#pi-country','#pi-year'].forEach(s => { el.querySelector(s).value = ''; });
    });

    const oemEditBtn = el.querySelector('#oem-edit-btn');
    oemEditBtn.addEventListener('click', function() {
      if (mktUnlocked) {
        mktUnlocked = false;
        this.textContent = 'Edit';
        el.querySelector('#plant-add-form').style.display = 'none';
        refreshPlantUI();
        return;
      }
      showMktPasswordPrompt(this, () => {
        this.textContent = 'Done';
        el.querySelector('#plant-add-form').style.display = 'flex';
        refreshPlantUI();
      });
    });

  /* ── After-fit ────────────────────────────────────────────────── */
  } else {
    const ALL_COUNTRIES = [
      {code:"NL",name:"Netherlands"   },
      {code:"BE",name:"Belgium"       },
      {code:"DE",name:"Germany"       },
      {code:"FR",name:"France"        },
      {code:"ES",name:"Spain"         },
      {code:"GB",name:"United Kingdom"},
      {code:"IT",name:"Italy"         },
      {code:"CZ",name:"Czech Republic"},
      {code:"DK",name:"Denmark"       },
      {code:"AT",name:"Austria"       },
      {code:"PL",name:"Poland"        },
      {code:"SE",name:"Sweden"        },
      {code:"FI",name:"Finland"       },
      {code:"PT",name:"Portugal"      },
      {code:"HU",name:"Hungary"       },
      {code:"EE",name:"Estonia"       },
      {code:"LT",name:"Lithuania"     },
      {code:"LV",name:"Latvia"        },
      {code:"RO",name:"Romania"       },
      {code:"SI",name:"Slovenia"      },
      {code:"SK",name:"Slovakia"      },
      {code:"BG",name:"Bulgaria"      },
    ];

    // Normalise homologation to array (migrates old single-string values)
    function normalizeHomol(v) {
      if (Array.isArray(v)) return v;
      if (!v || v === '—') return [];
      return [v];
    }

    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(MKT_KEY)) || {}; } catch(e) {}
    const cd = md.countryData || {};
    const countryState = {};
    ALL_COUNTRIES.forEach(c => {
      const base = cd[c.code] || { active: false, homologation: [] };
      const s = saved[c.code] || { active: base.active, homologation: normalizeHomol(base.homologation) };
      s.homologation = normalizeHomol(s.homologation);
      if (!s.customers) s.customers = [];
      if (!s.notes) s.notes = '';
      countryState[c.code] = s;
    });

    function saveState() { localStorage.setItem(MKT_KEY, JSON.stringify(countryState)); }

    function certClass(v) {
      return v === 'YES' ? 'ct-cert--yes' : v === 'NO' ? 'ct-cert--no' : 'ct-cert--interest';
    }

    const activeCount = ALL_COUNTRIES.filter(c => countryState[c.code].active).length;

    // ── Homologation notes stored separately per product (not per country)
    const HOMOL_KEY = `snoeks_homol_${product.brand}|${product.van}|${product.type}|${product.fitment}`;
    let homolNotes = { CoC: '', GWC: '', IVA: '' };
    try { homolNotes = Object.assign({ CoC: '', GWC: '', IVA: '' }, JSON.parse(localStorage.getItem(HOMOL_KEY)) || {}); } catch(e) {}
    function saveHomolNotes() { localStorage.setItem(HOMOL_KEY, JSON.stringify(homolNotes)); }

    function renderPresenceRows(locked) {
      return ALL_COUNTRIES.map(c => {
        const st = countryState[c.code];
        const customers = st.customers || [];

        const customerRows = st.active ? customers.map((cu, ci) => `
          <tr class="ct-customer-row">
            <td class="ct-cust-indent">↳</td>
            <td class="ct-cust-name" colspan="2">${cu.name || '—'} <span class="ct-cust-loc-inline">${cu.location ? '· ' + cu.location : ''}</span></td>
            <td><span class="ct-cert ${certClass(cu.certified)}">${cu.certified}</span></td>
            <td>${locked ? '' : `<button class="cust-remove-btn" data-country="${c.code}" data-cidx="${ci}">✕</button>`}</td>
          </tr>`).join('') : '';

        const addRow = (!locked && st.active) ? `
          <tr class="ct-customer-add-row" data-country="${c.code}">
            <td class="ct-cust-indent"></td>
            <td><input class="cust-input" placeholder="Customer name" data-role="name"/></td>
            <td><input class="cust-input" placeholder="Location" data-role="loc"/></td>
            <td>
              <select class="cust-cert-sel">
                <option value="YES">YES</option><option value="NO">NO</option><option value="INTEREST">INTEREST</option>
              </select>
            </td>
            <td><button class="cust-add-btn" data-country="${c.code}">+</button></td>
          </tr>` : '';

        return `
          <tr class="ct-country-row${st.active ? ' ct-country-row--active' : ''}" data-country="${c.code}">
            <td class="ct-code">${c.code}</td>
            <td class="ct-name">${c.name}</td>
            <td class="ct-active">
              <select class="ct-select ct-select--status" data-field="active" ${locked ? 'disabled' : ''}>
                <option value="true"  ${st.active  ? 'selected':''}>Active</option>
                <option value="false" ${!st.active ? 'selected':''}>Not active</option>
              </select>
            </td>
            <td class="ct-cust-count">${customers.length ? customers.length + ' customer' + (customers.length > 1 ? 's' : '') : (st.active ? '—' : '')}</td>
            <td></td>
          </tr>
          ${customerRows}
          ${addRow}`;
      }).join('');
    }

    el.innerHTML = `
      <div class="mkt-overview-row">
        <div class="mkt-stat-card">
          <div class="mkt-stat-label">Market Introduction</div>
          <div style="display:flex;align-items:center;gap:6px">
            <div class="mkt-stat-value" id="mkt-intro-year-val">${introYear}</div>
            <button class="mkt-intro-edit-icon" id="mkt-intro-edit-icon" title="Edit year">✎</button>
          </div>
        </div>
        <div class="mkt-stat-card">
          <div class="mkt-stat-label">Channel</div>
          <div class="mkt-stat-value">After-fit conversion</div>
        </div>
        <div class="mkt-stat-card">
          <div class="mkt-stat-label">Active Markets</div>
          <div class="mkt-stat-value" id="mkt-active-count">${activeCount} countries</div>
        </div>
      </div>

      <!-- ── Section 1: Market Presence ── -->
      <div class="mkt-section">
        <div class="mkt-section-header mkt-section-header--flex">
          <div>
            <div class="mkt-section-title">Market Presence</div>
            <div class="mkt-section-sub">Active countries and customers per market</div>
          </div>
          <button class="mkt-edit-btn" id="af-edit-btn">${mktUnlocked ? 'Done' : 'Edit'}</button>
        </div>
        <div class="country-table-wrap">
          <table class="country-table">
            <thead><tr><th></th><th>Country</th><th>Status</th><th>Customers</th><th></th></tr></thead>
            <tbody id="country-table-body">${renderPresenceRows(!mktUnlocked)}</tbody>
          </table>
        </div>
      </div>

      <!-- ── Section 2: Homologation ── -->
      <div class="mkt-section mkt-homol-section">
        <div class="mkt-section-header">
          <div class="mkt-section-title">Homologation</div>
          <div class="mkt-section-sub">Type-approval methods applicable to this product</div>
        </div>
        <div class="homol-cols">
          <div class="homol-col">
            <div class="homol-col-title">Certificate of Conformity <span class="homol-col-abbr">(CoC)</span></div>
            <textarea class="homol-textarea" id="homol-coc" placeholder="Add CoC information…" ${mktUnlocked ? '' : 'readonly'}>${homolNotes.CoC}</textarea>
          </div>
          <div class="homol-col">
            <div class="homol-col-title">Goedkeuring Wijziging Constructie <span class="homol-col-abbr">(GWC)</span></div>
            <textarea class="homol-textarea" id="homol-gwc" placeholder="Add GWC information…" ${mktUnlocked ? '' : 'readonly'}>${homolNotes.GWC}</textarea>
          </div>
          <div class="homol-col">
            <div class="homol-col-title">Individual Vehicle Approval <span class="homol-col-abbr">(IVA)</span></div>
            <textarea class="homol-textarea" id="homol-iva" placeholder="Add IVA information…" ${mktUnlocked ? '' : 'readonly'}>${homolNotes.IVA}</textarea>
          </div>
        </div>
      </div>
    `;

    const introEditIconAF = el.querySelector('#mkt-intro-edit-icon');
    if (introEditIconAF) {
      introEditIconAF.addEventListener('click', function() {
        const curVal = (el.querySelector('#mkt-intro-year-val') || {}).textContent || introYear;
        showMktPasswordPrompt(this, () => { showIntroPop(this, INTRO_KEY, curVal, el); });
      });
    }

    function refreshTable(locked) {
      el.querySelector('#country-table-body').innerHTML = renderPresenceRows(locked);
      const cnt = el.querySelector('#mkt-active-count');
      if (cnt) cnt.textContent = ALL_COUNTRIES.filter(c => countryState[c.code].active).length + ' countries';
      wireTableEvents(locked);
      wireHomolTextareas(locked);
    }

    function wireTableEvents(locked) {
      el.querySelectorAll('.ct-select--status').forEach(sel => {
        sel.addEventListener('change', function() {
          const row  = this.closest('tr[data-country]');
          if (!row) return;
          countryState[row.dataset.country].active = (this.value === 'true');
          saveState();
          refreshTable(locked);
        });
      });
      el.querySelectorAll('.cust-add-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const code = this.dataset.country;
          const row  = this.closest('tr');
          const name = row.querySelector('[data-role="name"]').value.trim();
          const loc  = row.querySelector('[data-role="loc"]').value.trim();
          const cert = row.querySelector('.cust-cert-sel').value;
          if (!name) { row.querySelector('[data-role="name"]').focus(); return; }
          countryState[code].customers.push({ name, location: loc, certified: cert });
          saveState();
          refreshTable(false);
        });
      });
      el.querySelectorAll('.cust-remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          countryState[this.dataset.country].customers.splice(parseInt(this.dataset.cidx), 1);
          saveState();
          refreshTable(false);
        });
      });
    }

    function wireHomolTextareas(locked) {
      ['coc','gwc','iva'].forEach(key => {
        const ta = el.querySelector(`#homol-${key}`);
        if (!ta) return;
        ta.readOnly = locked;
        ta.addEventListener('input', function() {
          homolNotes[key.toUpperCase()] = this.value;
          saveHomolNotes();
        });
      });
    }

    wireTableEvents(!mktUnlocked);
    wireHomolTextareas(!mktUnlocked);

    const afEditBtn = el.querySelector('#af-edit-btn');
    afEditBtn.addEventListener('click', function() {
      if (mktUnlocked) {
        mktUnlocked = false;
        this.textContent = 'Edit';
        refreshTable(true);
        return;
      }
      showMktPasswordPrompt(this, () => {
        this.textContent = 'Done';
        refreshTable(false);
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
    if (qVehicle)  qVehicle.innerHTML  = "<p style='color:rgba(0,0,0,0.4);font-size:0.8rem;padding:12px 0'>No configurator available for this product.</p>";
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
      statusEl.textContent = "⚠ Configuration not possible for this specification";
      statusEl.classList.remove("cfg-status--done");
    } else if (allDone) {
      statusEl.textContent = "✓ Configuration complete — code generated";
      statusEl.classList.add("cfg-status--done");
    } else {
      statusEl.textContent = `${answeredQ} of ${totalQ} questions answered`;
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
    if (qcVal) qcVal.textContent = "Answer all questions to generate the code";
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
    bodyEl.innerHTML = `<tr><td colspan="4" class="bom-empty-row">No parts available for this product.</td></tr>`;
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

  if (countEl) countEl.textContent = `${parts.length} part${parts.length !== 1 ? "s" : ""}`;
}

function populateBOM(product) {
  cfgState      = {};
  blockingState = {};

  // Hide BOM result until code is generated
  const bomResultEl = document.getElementById("bom-result");
  if (bomResultEl) bomResultEl.style.display = "none";

  // Reset quickcode to pending
  const qcEl  = document.getElementById("quickcode-display");
  const qcVal = document.getElementById("quickcode-value");
  if (qcEl)  qcEl.classList.add("quickcode-display--pending");
  if (qcVal) qcVal.textContent = "Answer all questions to generate the code";

  renderConfigurator(product);
}

/* ═══════════════════════════════════════════════════════════════════════
   MARKETING TOOLS
═══════════════════════════════════════════════════════════════════════ */
function populateMarketingTools(product) {
  const el  = document.getElementById("marketing-tools-content");
  const KEY = `snoeks_mktlinks_${product.brand}|${product.van}|${product.type}|${product.fitment}`;
  let toolsUnlocked = false;

  const heroImgUrl   = getProductImage(product) || VAN_IMAGES[product.van] || "";
  const heroImgLabel = getProductImage(product)
    ? `${product.brand} ${product.van} – ${product.type} (${product.fitment})`
    : `${product.brand} ${product.van}`;

  function loadLinks() {
    try { return JSON.parse(localStorage.getItem(KEY)) || { brochures: [], priceLists: [], workInstructions: [] }; }
    catch(e) { return { brochures: [], priceLists: [], workInstructions: [] }; }
  }

  function saveLinks(data) { localStorage.setItem(KEY, JSON.stringify(data)); }

  function render() {
    const data = loadLinks();

    const docSection = (key, eyebrow, title) => {
      const items = data[key] || [];

      const buttons = items.length
        ? items.map((item, i) => `
            <div class="mkt-link-row">
              <button class="mkt-link-btn" data-url="${encodeURIComponent(item.url || '')}">${item.title || 'Open Document'}</button>
              ${toolsUnlocked ? `<button class="mkt-link-del" data-key="${key}" data-idx="${i}">✕</button>` : ""}
            </div>`).join("")
        : `<div class="mkt-doc-empty">
             <div class="mkt-doc-empty-icon">📄</div>
             <div class="mkt-doc-empty-text">No ${title.toLowerCase()} available yet${toolsUnlocked ? " — add one below" : ""}</div>
           </div>`;

      const addForm = toolsUnlocked ? `
        <div class="mkt-link-add-form">
          <input class="mkt-link-input" placeholder="Button label" data-role="ltitle" data-key="${key}"/>
          <input class="mkt-link-input mkt-link-input--url" placeholder="https://…" data-role="lurl" data-key="${key}"/>
          <button class="plant-add-btn mkt-link-add" data-key="${key}">+ Add</button>
        </div>` : "";

      return `
        <div class="mkt-doc-section">
          <div class="mkt-doc-section-header">
            <div class="mkt-doc-section-eyebrow">${eyebrow}</div>
            <div class="mkt-doc-section-title">${title}</div>
          </div>
          <div class="mkt-doc-section-body">
            ${buttons}
            ${addForm}
          </div>
        </div>`;
    };

    el.innerHTML = `
      <div class="mkt-tools-layout">

        ${product.fitment !== "OEM" ? `
        <div class="mkt-tools-docs">
          <div class="mkt-tools-section-header-row">
            <div class="mkt-tools-section-title">Documents</div>
            <button class="mkt-edit-btn" id="mkt-tools-edit-btn">${toolsUnlocked ? "Done" : "Edit"}</button>
          </div>
          <div class="mkt-doc-sections">
            ${docSection("brochures",        "01", "Brochures")}
            ${docSection("priceLists",       "02", "Price Lists")}
            ${docSection("workInstructions", "03", "Work Instructions")}
          </div>
        </div>
        ` : ""}

        <div class="mkt-tools-images">
          <div class="mkt-tools-section-header-row">
            <div class="mkt-tools-section-title">Product Photography</div>
            <button class="mkt-edit-btn" id="mkt-gallery-edit-btn">${toolsUnlocked ? "Done" : "Edit"}</button>
          </div>
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
          <div class="gallery-uploads" id="gallery-uploads-grid"></div>
          ${toolsUnlocked ? `
          <label class="gallery-upload-btn">
            <input type="file" accept="image/*" multiple id="gallery-file-input" style="display:none"/>
            + Upload Images
          </label>` : ""}
        </div>

      </div>`;

    // Render uploaded images grid
    (function renderGallery() {
      const GKEY = `snoeks_gallery_${product.brand}|${product.van}|${product.type}|${product.fitment}`;
      let imgs = [];
      try { imgs = JSON.parse(localStorage.getItem(GKEY)) || []; } catch(e) {}
      const grid = el.querySelector("#gallery-uploads-grid");
      if (!grid) return;
      grid.innerHTML = imgs.length
        ? imgs.map((img, i) => `
            <div class="gallery-upload-tile">
              <img src="${img.dataUrl}" alt="${img.name}" loading="lazy"/>
              <div class="gallery-upload-overlay">
                <a class="gallery-upload-action" href="${img.dataUrl}" download="${img.name}">↓ Download</a>
                ${toolsUnlocked ? `<button class="gallery-upload-del" data-idx="${i}">✕</button>` : ""}
              </div>
              <div class="gallery-upload-name">${img.name}</div>
            </div>`).join("")
        : toolsUnlocked ? "" : `<p class="mkt-doc-empty-text" style="padding:10px 0;color:var(--text-muted);font-style:italic">No additional images uploaded yet.</p>`;

      // Delete image
      grid.querySelectorAll(".gallery-upload-del").forEach(btn => {
        btn.addEventListener("click", () => {
          let imgs = []; try { imgs = JSON.parse(localStorage.getItem(GKEY)) || []; } catch(e) {}
          imgs.splice(parseInt(btn.dataset.idx), 1);
          localStorage.setItem(GKEY, JSON.stringify(imgs));
          renderGallery();
        });
      });
    })();

    // File upload handler
    const fileInput = el.querySelector("#gallery-file-input");
    if (fileInput) {
      fileInput.addEventListener("change", () => {
        const GKEY = `snoeks_gallery_${product.brand}|${product.van}|${product.type}|${product.fitment}`;
        let imgs = []; try { imgs = JSON.parse(localStorage.getItem(GKEY)) || []; } catch(e) {}
        const files = Array.from(fileInput.files);
        let loaded = 0;
        files.forEach(file => {
          const reader = new FileReader();
          reader.onload = e => {
            imgs.push({ name: file.name, dataUrl: e.target.result });
            loaded++;
            if (loaded === files.length) {
              localStorage.setItem(GKEY, JSON.stringify(imgs));
              const grid = el.querySelector("#gallery-uploads-grid");
              if (grid) {
                // Re-run gallery render in place without full page re-render
                fileInput.value = "";
                render();
              }
            }
          };
          reader.readAsDataURL(file);
        });
      });
    }

    // Open document URL
    el.querySelectorAll(".mkt-link-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const url = decodeURIComponent(btn.dataset.url || "");
        if (url) window.open(url, "_blank", "noopener,noreferrer");
      });
    });

    // Delete document link
    el.querySelectorAll(".mkt-link-del").forEach(btn => {
      btn.addEventListener("click", () => {
        const d = loadLinks();
        d[btn.dataset.key].splice(parseInt(btn.dataset.idx), 1);
        saveLinks(d);
        render();
      });
    });

    // Add document link
    el.querySelectorAll(".mkt-link-add").forEach(btn => {
      btn.addEventListener("click", () => {
        const key  = btn.dataset.key;
        const form = btn.closest(".mkt-link-add-form");
        const title = form.querySelector("[data-role='ltitle']").value.trim();
        const url   = form.querySelector("[data-role='lurl']").value.trim();
        if (!url) { form.querySelector("[data-role='lurl']").focus(); return; }
        const d = loadLinks();
        if (!d[key]) d[key] = [];
        d[key].push({ title: title || "Document", url });
        saveLinks(d);
        render();
      });
    });

    // Edit / Done — shared between docs and gallery
    el.querySelectorAll("#mkt-tools-edit-btn, #mkt-gallery-edit-btn").forEach(editBtn => {
      editBtn.addEventListener("click", function() {
        if (toolsUnlocked) { toolsUnlocked = false; render(); return; }
        showMktPasswordPrompt(this, () => { toolsUnlocked = true; render(); });
      });
    });
  }

  render();
}
