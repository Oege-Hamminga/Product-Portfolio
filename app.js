const state = { brand: "all", type: "all", segment: "all" };

const grid         = document.getElementById("product-grid");
const noResults    = document.getElementById("no-results");
const resultsCount = document.getElementById("results-count");

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

document.getElementById("reset-btn").addEventListener("click", () => {
  state.brand = state.type = state.segment = "all";
  ["brand-chips", "type-chips", "segment-chips"].forEach(id => {
    document.querySelectorAll(`#${id} .chip`).forEach(c =>
      c.classList.toggle("active", c.dataset.value === "all")
    );
  });
  render();
});

// Type → icon map for cards
const TYPE_ICON = {
  "Crew Cabin":     "🚐",
  "Flex Cabin":     "🔄",
  "Partition Wall": "🔩",
};

function render() {
  const filtered = products.filter(p => {
    const bOk = state.brand   === "all" || p.brand   === state.brand;
    const tOk = state.type    === "all" || p.type    === state.type;
    const sOk = state.segment === "all" || p.segment === state.segment;
    return bOk && tOk && sOk;
  });

  const total = products.length;
  resultsCount.textContent = filtered.length === total
    ? `Showing all ${total} products`
    : `Showing ${filtered.length} of ${total} products`;

  if (filtered.length === 0) {
    grid.innerHTML = "";
    noResults.classList.remove("hidden");
    return;
  }
  noResults.classList.add("hidden");

  grid.innerHTML = filtered.map(p => {
    const meta   = BRAND_META[p.brand] || { color: "#444", abbr: p.brand.slice(0, 3).toUpperCase() };
    const textCol = meta.textDark ? "#1A1F2E" : "rgba(255,255,255,0.9)";
    const vanCol  = meta.textDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)";
    return `
      <a class="product-card" href="product.html?id=${p.id}">
        <div class="card-image" style="background:linear-gradient(135deg,${meta.color} 0%,${meta.color}cc 100%)">
          <div class="ci-abbr" style="color:${textCol}">${meta.abbr}</div>
          <div class="ci-van"  style="color:${vanCol}">${p.van}</div>
        </div>
        <div class="card-body">
          <div class="card-badges">
            <span class="badge badge--type">${p.type}</span>
            <span class="badge badge--segment">${p.segment}</span>
          </div>
          <div class="card-brand">${p.brand}</div>
          <div class="card-van">${p.van}</div>
          <div class="card-cta">${TYPE_ICON[p.type] || "📦"} View details →</div>
        </div>
      </a>`;
  }).join("");
}

render();
