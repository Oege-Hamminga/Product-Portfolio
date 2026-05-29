const state = { brand: "all", type: "all", segment: "all", fitment: "all", sort: "default" };

// ── Custom / hidden vehicles ────────────────────────────────────────
const CUSTOM_KEY  = 'snoeks_custom_products';
const HIDDEN_KEY  = 'snoeks_hidden_products';
const MATRIX_HID  = 'snoeks_matrix_hidden';

function getCustomProducts() {
  try { return JSON.parse(localStorage.getItem(CUSTOM_KEY)) || []; } catch(e) { return []; }
}
function getHiddenSet() {
  try { return new Set(JSON.parse(localStorage.getItem(HIDDEN_KEY)) || []); } catch(e) { return new Set(); }
}
function getAllProducts() {
  const hidden = getHiddenSet();
  const base = products.filter(p => !hidden.has(`${p.brand}|${p.van}`));
  return [...base, ...getCustomProducts().filter(p => !hidden.has(`${p.brand}|${p.van}`))];
}

// Shared cascade-delete helper: wipes all data for a brand|van key
function deleteVehicleData(bv) {
  // Remove from custom products
  try {
    const cp = JSON.parse(localStorage.getItem(CUSTOM_KEY) || '[]');
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(cp.filter(p => `${p.brand}|${p.van}` !== bv)));
  } catch(e) {}
  // Hide in product grid and matrix panel builders
  try {
    const gh = new Set(JSON.parse(localStorage.getItem(HIDDEN_KEY) || '[]'));
    gh.add(bv); localStorage.setItem(HIDDEN_KEY, JSON.stringify([...gh]));
  } catch(e) {}
  try {
    const mh = new Set(JSON.parse(localStorage.getItem(MATRIX_HID) || '[]'));
    mh.add(bv); localStorage.setItem(MATRIX_HID, JSON.stringify([...mh]));
  } catch(e) {}
  // Wipe per-product localStorage keys
  ['Crew Cab','Flex Cab','Partition Wall'].forEach(t => {
    ['OEM','After-fit'].forEach(f => {
      const k = `${bv}|${t}|${f}`;
      ['snoeks_plants_','snoeks_mkt_','snoeks_intro_','snoeks_img_prod_'].forEach(pfx =>
        localStorage.removeItem(pfx + k));
    });
  });
  const vanPart = bv.split('|')[1] || '';
  localStorage.removeItem(`snoeks_vmeta_${bv}`);
  if (vanPart) localStorage.removeItem(`snoeks_img_van_${vanPart}`);
  localStorage.removeItem(`snoeks_sel_hidden_${bv}`);
  // Remove from OEM plant assignments
  try {
    const plants = JSON.parse(localStorage.getItem('snoeks_oem_plants') || '[]');
    plants.forEach(pl => { pl.products = (pl.products||[]).filter(k => !k.startsWith(bv+'|')); });
    localStorage.setItem('snoeks_oem_plants', JSON.stringify(plants));
  } catch(e) {}
}

// Startup: purge any vehicle whose name contains the word "test"
(function purgeTestVehicles() {
  try {
    const cp = JSON.parse(localStorage.getItem(CUSTOM_KEY) || '[]');
    const testBVs = new Set(
      cp.filter(p => /\btest\b/i.test(`${p.brand} ${p.van}`)).map(p => `${p.brand}|${p.van}`)
    );
    testBVs.forEach(bv => deleteVehicleData(bv));
  } catch(e) {}
})();

const grid         = document.getElementById("product-grid");
const noResults    = document.getElementById("no-results");
const resultsCount = document.getElementById("results-count");
const sortSelect   = document.getElementById("sort-select");

function wireChips(containerId, stateKey) {
  document.getElementById(containerId).addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    document.querySelectorAll(`#${containerId} .chip`).forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    state[stateKey] = chip.dataset.value;
    render();
  });
}

wireChips("brand-chips",   "brand");
wireChips("type-chips",    "type");
wireChips("segment-chips", "segment");
wireChips("fitment-chips", "fitment");

sortSelect.addEventListener("change", () => { state.sort = sortSelect.value; render(); });

document.getElementById("reset-btn").addEventListener("click", () => {
  state.brand = state.type = state.segment = state.fitment = "all";
  state.sort = "default";
  sortSelect.value = "default";
  ["brand-chips","type-chips","segment-chips","fitment-chips"].forEach(id => {
    document.querySelectorAll(`#${id} .chip`).forEach(c =>
      c.classList.toggle("active", c.dataset.value === "all")
    );
  });
  render();
});

const SEGMENT_ORDER = { "F1": 0, "K1": 1, "K2/3": 2 };

function render() {
  const allProds = getAllProducts();
  const sorted = [...allProds].sort((a, b) => {
    if (state.sort === "brand-az") return a.brand.localeCompare(b.brand) || a.van.localeCompare(b.van);
    if (state.sort === "segment")  return SEGMENT_ORDER[a.segment] - SEGMENT_ORDER[b.segment] || a.brand.localeCompare(b.brand);
    return 0;
  });

  // Deduplicate by brand+van while applying filters
  const seen     = new Set();
  const filtered = [];
  for (const p of sorted) {
    const key = `${p.brand}|${p.van}`;
    if (seen.has(key)) continue;
    const vehicleProds = allProds.filter(q => `${q.brand}|${q.van}` === key);
    const ok = (state.brand   === "all" || p.brand   === state.brand)
            && (state.segment === "all" || p.segment === state.segment)
            && (state.type    === "all" || p.type    === state.type)
            && (state.fitment === "all" || vehicleProds.some(q => q.fitment === state.fitment));
    if (ok) { seen.add(key); filtered.push(p); }
  }

  const totalVehicles = new Set(allProds.map(p => `${p.brand}|${p.van}`)).size;
  resultsCount.textContent = filtered.length === totalVehicles
    ? `All ${totalVehicles} vehicles`
    : `${filtered.length} of ${totalVehicles} vehicles`;

  if (filtered.length === 0) {
    grid.innerHTML = "";
    noResults.classList.remove("hidden");
    return;
  }
  noResults.classList.add("hidden");

  grid.innerHTML = filtered.map(p => {
    const meta    = BRAND_META[p.brand] || { color: "#333", abbr: p.brand.slice(0,3).toUpperCase() };
    const textCol = meta.textDark ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.92)";
    const vanCol  = meta.textDark ? "rgba(0,0,0,0.5)"  : "rgba(255,255,255,0.55)";
    const imgUrl  = localStorage.getItem('snoeks_img_van_' + p.van) || VAN_IMAGES[p.van] || "";
    const fbStyle = `background:linear-gradient(135deg,${meta.color} 0%,${meta.color}bb 100%)`;

    const vehicleTypes = [...new Set(
      allProds.filter(q => q.brand === p.brand && q.van === p.van).map(q => q.type)
    )];
    const typeBadges = vehicleTypes.map(t =>
      `<span class="badge badge--type">${t}</span>`
    ).join("");

    const deleteBtn = gridEditUnlocked
      ? `<button class="vehicle-delete-btn" data-key="${p.brand}|${p.van}">✕ Remove</button>`
      : '';

    return `
    <a class="product-card${gridEditUnlocked ? ' product-card--editing' : ''}" href="product.html?brand=${encodeURIComponent(p.brand)}&van=${encodeURIComponent(p.van)}">
      <div class="card-image">
        ${imgUrl
          ? `<img src="${imgUrl}" alt="${p.brand} ${p.van}" loading="lazy"
                  onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
          : ""}
        <div class="card-img-fallback" style="${fbStyle};${imgUrl ? "display:none" : ""}">
          <div class="ci-abbr" style="color:${textCol}">${meta.abbr}</div>
          <div class="ci-van"  style="color:${vanCol}">${p.van}</div>
        </div>
        <span class="ci-segment">${p.segment}</span>
      </div>
      <div class="card-body">
        <div class="card-badges">${typeBadges}</div>
        <div class="card-brand">${p.brand}</div>
        <div class="card-van">${p.van}</div>
        <div class="card-cta">Select Product →</div>
      </div>
      ${deleteBtn}
    </a>`;
  }).join("");
}

let gridEditUnlocked = false;

function showGridPw(anchor, onSuccess) {
  const ex = document.getElementById('grid-pw-pop');
  if (ex) { ex.remove(); return; }
  const pop = document.createElement('div');
  pop.id = 'grid-pw-pop';
  pop.className = 'matrix-cell-popover';
  pop.style.minWidth = '200px';
  pop.innerHTML = `
    <div style="font-size:0.72rem;color:rgba(255,255,255,0.5);margin-bottom:6px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;">Password required</div>
    <div class="mcp-pw-form">
      <input class="mcp-pw-input" type="password" placeholder="Enter password"/>
      <button class="mcp-pw-submit">OK</button>
    </div>
    <div class="mcp-pw-error" style="display:none">Incorrect password</div>`;
  pop.addEventListener('click', e => e.stopPropagation());
  function tryUnlock() {
    if (pop.querySelector('.mcp-pw-input').value === 'PM26') {
      pop.remove(); onSuccess();
    } else {
      pop.querySelector('.mcp-pw-error').style.display = 'block';
      pop.querySelector('.mcp-pw-input').value = '';
      pop.querySelector('.mcp-pw-input').focus();
    }
  }
  pop.querySelector('.mcp-pw-submit').addEventListener('click', tryUnlock);
  pop.querySelector('.mcp-pw-input').addEventListener('keydown', e => { if (e.key === 'Enter') tryUnlock(); });
  const r = anchor.getBoundingClientRect();
  pop.style.cssText = `position:fixed;top:${r.bottom+6}px;left:${Math.max(8,r.right-210)}px;z-index:9999`;
  document.body.appendChild(pop);
  setTimeout(() => pop.querySelector('.mcp-pw-input').focus(), 50);
  function outside(e) { if (!pop.contains(e.target) && e.target !== anchor) { pop.remove(); document.removeEventListener('click', outside); } }
  setTimeout(() => document.addEventListener('click', outside), 0);
}

render();

document.getElementById('vehicle-grid-edit-btn').addEventListener('click', function() {
  if (gridEditUnlocked) {
    gridEditUnlocked = false;
    this.textContent = 'Edit Vehicles';
    document.getElementById('add-vehicle-form').style.display = 'none';
    render();
    return;
  }
  showGridPw(this, () => {
    gridEditUnlocked = true;
    document.getElementById('vehicle-grid-edit-btn').textContent = 'Done';
    document.getElementById('add-vehicle-form').style.display = 'flex';
    render();
  });
});

document.getElementById('product-grid').addEventListener('click', e => {
  const delBtn = e.target.closest('.vehicle-delete-btn');
  if (!delBtn || !gridEditUnlocked) return;
  e.preventDefault();
  deleteVehicleData(delBtn.dataset.key);
  render();
});

document.getElementById('avf-add-btn').addEventListener('click', () => {
  const brand   = document.getElementById('avf-brand').value.trim();
  const van     = document.getElementById('avf-van').value.trim();
  const segment = document.getElementById('avf-segment').value;
  const types   = [...document.querySelectorAll('.avf-type-cb:checked')].map(c => c.value);
  const fits    = [...document.querySelectorAll('.avf-fit-cb:checked')].map(c => c.value);
  if (!brand || !van || !types.length || !fits.length) return;
  const customs = getCustomProducts();
  types.forEach(type => fits.forEach(fitment => {
    customs.push({ brand, van, segment, type, fitment });
  }));
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(customs));
  document.getElementById('avf-brand').value = '';
  document.getElementById('avf-van').value = '';
  render();
});
