const products = [
  // Electronics
  { id: 1,  name: "Wireless Noise-Cancelling Headphones", category: "Electronics", price: 249, rating: 4.7, emoji: "🎧" },
  { id: 2,  name: "4K Smart TV 55\"",                      category: "Electronics", price: 799, rating: 4.5, emoji: "📺" },
  { id: 3,  name: "Mechanical Gaming Keyboard",            category: "Electronics", price: 129, rating: 4.3, emoji: "⌨️" },
  { id: 4,  name: "Portable Bluetooth Speaker",            category: "Electronics", price: 89,  rating: 4.6, emoji: "🔊" },
  { id: 5,  name: "Smartphone 128GB",                      category: "Electronics", price: 699, rating: 4.4, emoji: "📱" },
  { id: 6,  name: "Laptop Stand & USB Hub",                category: "Electronics", price: 59,  rating: 4.2, emoji: "💻" },

  // Clothing
  { id: 7,  name: "Classic Denim Jacket",                  category: "Clothing",    price: 89,  rating: 4.4, emoji: "🧥" },
  { id: 8,  name: "Running Sneakers",                      category: "Clothing",    price: 119, rating: 4.6, emoji: "👟" },
  { id: 9,  name: "Merino Wool Sweater",                   category: "Clothing",    price: 75,  rating: 4.5, emoji: "🧶" },
  { id: 10, name: "Slim-Fit Chinos",                       category: "Clothing",    price: 55,  rating: 3.9, emoji: "👖" },
  { id: 11, name: "Cotton Graphic T-Shirt",                category: "Clothing",    price: 29,  rating: 4.1, emoji: "👕" },
  { id: 12, name: "Leather Wallet",                        category: "Clothing",    price: 45,  rating: 4.8, emoji: "👛" },

  // Home & Garden
  { id: 13, name: "Smart LED Floor Lamp",                  category: "Home & Garden", price: 79, rating: 4.3, emoji: "💡" },
  { id: 14, name: "Indoor Herb Garden Kit",                category: "Home & Garden", price: 39, rating: 4.7, emoji: "🌿" },
  { id: 15, name: "Bamboo Cutting Board Set",              category: "Home & Garden", price: 34, rating: 4.5, emoji: "🪵" },
  { id: 16, name: "Robot Vacuum Cleaner",                  category: "Home & Garden", price: 349, rating: 4.4, emoji: "🤖" },
  { id: 17, name: "Scented Soy Candle Set",                category: "Home & Garden", price: 28, rating: 4.8, emoji: "🕯️" },
  { id: 18, name: "Stainless Steel Cookware Set",          category: "Home & Garden", price: 189, rating: 4.6, emoji: "🍳" },

  // Sports
  { id: 19, name: "Yoga Mat Premium",                      category: "Sports",      price: 49,  rating: 4.7, emoji: "🧘" },
  { id: 20, name: "Adjustable Dumbbell Set",               category: "Sports",      price: 229, rating: 4.5, emoji: "🏋️" },
  { id: 21, name: "Cycling Helmet",                        category: "Sports",      price: 79,  rating: 4.4, emoji: "🪖" },
  { id: 22, name: "Tennis Racket Pro",                     category: "Sports",      price: 159, rating: 4.2, emoji: "🎾" },
  { id: 23, name: "Foam Roller & Massage Kit",             category: "Sports",      price: 35,  rating: 4.6, emoji: "🫀" },
  { id: 24, name: "Waterproof Hiking Backpack",            category: "Sports",      price: 109, rating: 4.8, emoji: "🎒" },

  // Books
  { id: 25, name: "The Design of Everyday Things",         category: "Books",       price: 18,  rating: 4.8, emoji: "📘" },
  { id: 26, name: "Atomic Habits",                         category: "Books",       price: 16,  rating: 4.9, emoji: "📗" },
  { id: 27, name: "Deep Work",                             category: "Books",       price: 15,  rating: 4.6, emoji: "📙" },
  { id: 28, name: "The Pragmatic Programmer",              category: "Books",       price: 42,  rating: 4.7, emoji: "📕" },
  { id: 29, name: "Sapiens: A Brief History",              category: "Books",       price: 17,  rating: 4.5, emoji: "📓" },
  { id: 30, name: "Zero to One",                           category: "Books",       price: 14,  rating: 4.3, emoji: "📒" },
];

// State
let state = {
  category: "all",
  maxPrice: 1000,
  minRating: 0,
  sort: "default",
  cartCount: 0,
};

// Elements
const grid         = document.getElementById("product-grid");
const noResults    = document.getElementById("no-results");
const resultsCount = document.getElementById("results-count");
const priceRange   = document.getElementById("price-range");
const priceDisplay = document.getElementById("price-display");
const priceValue   = document.getElementById("price-value");
const sortSelect   = document.getElementById("sort-select");
const resetBtn     = document.getElementById("reset-btn");
const cartCount    = document.getElementById("cart-count");
const toast        = document.getElementById("toast");

// Stars helper
function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}

// Render products
function render() {
  let filtered = products.filter(p => {
    const catOk    = state.category === "all" || p.category === state.category;
    const priceOk  = p.price <= state.maxPrice;
    const ratingOk = p.rating >= state.minRating;
    return catOk && priceOk && ratingOk;
  });

  // Sort
  if (state.sort === "price-asc")    filtered.sort((a, b) => a.price - b.price);
  if (state.sort === "price-desc")   filtered.sort((a, b) => b.price - a.price);
  if (state.sort === "rating-desc")  filtered.sort((a, b) => b.rating - a.rating);

  // Update count label
  resultsCount.textContent = filtered.length === products.length
    ? `Showing all ${products.length} products`
    : `Showing ${filtered.length} of ${products.length} products`;

  // Show/hide no-results
  if (filtered.length === 0) {
    grid.innerHTML = "";
    noResults.classList.remove("hidden");
    return;
  }
  noResults.classList.add("hidden");

  grid.innerHTML = filtered.map(p => `
    <div class="product-card" data-id="${p.id}">
      <div class="product-image">${p.emoji}</div>
      <div class="product-body">
        <span class="product-category">${p.category}</span>
        <div class="product-name">${p.name}</div>
        <div class="product-rating">
          <span class="stars">${renderStars(p.rating)}</span>
          <span>${p.rating}</span>
        </div>
        <div class="product-price">$${p.price}</div>
      </div>
      <button class="add-to-cart" data-id="${p.id}">Add to Cart</button>
    </div>
  `).join("");
}

// Category chips
document.getElementById("category-chips").addEventListener("click", e => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  chip.classList.add("active");
  state.category = chip.dataset.value;
  render();
});

// Price range
priceRange.addEventListener("input", () => {
  state.maxPrice = Number(priceRange.value);
  priceDisplay.textContent = `$${state.maxPrice}`;
  priceValue.textContent   = `$${state.maxPrice}`;
  render();
});

// Rating stars
document.getElementById("rating-stars").addEventListener("click", e => {
  const btn = e.target.closest(".star-btn");
  if (!btn) return;
  document.querySelectorAll(".star-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  state.minRating = Number(btn.dataset.value);
  render();
});

// Sort
sortSelect.addEventListener("change", () => {
  state.sort = sortSelect.value;
  render();
});

// Reset
resetBtn.addEventListener("click", () => {
  state.category  = "all";
  state.maxPrice  = 1000;
  state.minRating = 0;
  state.sort      = "default";

  priceRange.value           = 1000;
  priceDisplay.textContent   = "$1000";
  priceValue.textContent     = "$500";
  sortSelect.value           = "default";

  document.querySelectorAll(".chip").forEach(c =>
    c.classList.toggle("active", c.dataset.value === "all")
  );
  document.querySelectorAll(".star-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.value === "0")
  );

  render();
});

// Add to cart
grid.addEventListener("click", e => {
  if (!e.target.classList.contains("add-to-cart")) return;
  state.cartCount++;
  cartCount.textContent = state.cartCount;
  showToast();
});

let toastTimer;
function showToast() {
  toast.classList.remove("hidden");
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.classList.add("hidden"), 300);
  }, 2000);
}

// Initial render
render();
