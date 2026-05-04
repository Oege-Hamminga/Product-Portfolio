const state = { brand: "all", type: "all", segment: "all", sort: "default" };

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

sortSelect.addEventListener("change", () => { state.sort = sortSelect.value; render(); });

document.getElementById("reset-btn").addEventListener("click", () => {
  state.brand = state.type = state.segment = "all";
  state.sort = "default";
  sortSelect.value = "default";
  ["brand-chips","type-chips","segment-chips"].forEach(id => {
    document.querySelectorAll(`#${id} .chip`).forEach(c =>
      c.classList.toggle("active", c.dataset.value === "all")
    );
  });
  render();
});

const SEGMENT_ORDER = { "F1": 0, "K1": 1, "K2/3": 2 };

function render() {
  const sorted = [...products].sort((a, b) => {
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
    const ok = (state.brand   === "all" || p.brand   === state.brand)
            && (state.segment === "all" || p.segment === state.segment)
            && (state.type    === "all" || p.type    === state.type);
    if (ok) { seen.add(key); filtered.push(p); }
  }

  const totalVehicles = new Set(products.map(p => `${p.brand}|${p.van}`)).size;
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
    const imgUrl  = VAN_IMAGES[p.van] || "";
    const fbStyle = `background:linear-gradient(135deg,${meta.color} 0%,${meta.color}bb 100%)`;

    const vehicleTypes = [...new Set(
      products.filter(q => q.brand === p.brand && q.van === p.van).map(q => q.type)
    )];
    const typeBadges = vehicleTypes.map(t =>
      `<span class="badge badge--type">${t}</span>`
    ).join("");

    return `
    <a class="product-card" href="product.html?brand=${encodeURIComponent(p.brand)}&van=${encodeURIComponent(p.van)}">
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
    </a>`;
  }).join("");
}

render();
