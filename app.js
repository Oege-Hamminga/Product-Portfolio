const state = { brand: "all", fitment: "all", type: "all", segment: "all", sort: "default" };

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
wireChips("fitment-chips", "fitment");
wireChips("type-chips",    "type");
wireChips("segment-chips", "segment");

sortSelect.addEventListener("change", () => { state.sort = sortSelect.value; render(); });

document.getElementById("reset-btn").addEventListener("click", () => {
  state.brand = state.fitment = state.type = state.segment = "all";
  state.sort = "default";
  sortSelect.value = "default";
  ["brand-chips","fitment-chips","type-chips","segment-chips"].forEach(id => {
    document.querySelectorAll(`#${id} .chip`).forEach(c =>
      c.classList.toggle("active", c.dataset.value === "all")
    );
  });
  render();
});

const SEGMENT_ORDER = { "F1": 0, "K1": 1, "K2/3": 2 };

function render() {
  let filtered = products.filter(p => {
    return (state.brand   === "all" || p.brand   === state.brand)
        && (state.fitment === "all" || p.fitment === state.fitment)
        && (state.type    === "all" || p.type    === state.type)
        && (state.segment === "all" || p.segment === state.segment);
  });

  if (state.sort === "brand-az") {
    filtered.sort((a, b) => a.brand.localeCompare(b.brand) || a.van.localeCompare(b.van));
  } else if (state.sort === "segment") {
    filtered.sort((a, b) => SEGMENT_ORDER[a.segment] - SEGMENT_ORDER[b.segment] || a.brand.localeCompare(b.brand));
  }

  const total = products.length;
  resultsCount.textContent = filtered.length === total
    ? `All ${total} products`
    : `${filtered.length} of ${total} products`;

  if (filtered.length === 0) {
    grid.innerHTML = "";
    noResults.classList.remove("hidden");
    return;
  }
  noResults.classList.add("hidden");

  grid.innerHTML = filtered.map(p => {
    const meta     = BRAND_META[p.brand] || { color: "#333", abbr: p.brand.slice(0,3).toUpperCase() };
    const textCol  = meta.textDark ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.92)";
    const vanCol   = meta.textDark ? "rgba(0,0,0,0.5)"  : "rgba(255,255,255,0.55)";
    const fitCls   = p.fitment === "OEM" ? "ci-fitment--oem" : "ci-fitment--afterfit";
    return `
    <a class="product-card" href="product.html?id=${p.id}">
      <div class="card-image" style="background:linear-gradient(135deg,${meta.color} 0%,${meta.color}bb 100%)">
        <div class="ci-abbr" style="color:${textCol}">${meta.abbr}</div>
        <div class="ci-van"  style="color:${vanCol}">${p.van}</div>
        <span class="ci-fitment ${fitCls}">${p.fitment}</span>
      </div>
      <div class="card-body">
        <div class="card-badges">
          <span class="badge badge--type">${p.type}</span>
          <span class="badge badge--segment">${p.segment}</span>
        </div>
        <div class="card-brand">${p.brand}</div>
        <div class="card-van">${p.van}</div>
        <div class="card-cta">View details →</div>
      </div>
    </a>`;
  }).join("");
}

render();
