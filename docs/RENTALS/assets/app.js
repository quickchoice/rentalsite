const categories = [
  { id: "baby", name: "Baby Equipment" },
  { id: "beach", name: "Beach Gear" },
  { id: "access", name: "Handicap Options" }
];

const products = [
  {
    id: "crib-01",
    name: "Premium Travel Crib",
    categoryId: "baby",
    pricePerDay: 14,
    imageUrl: "https://placeholder.example/baby-crib.jpg",
    shortDescription: "Sleep-safe, hotel-ready crib.",
    longDescription: "A calm, neutral crib with fresh linens and breathable sides.",
    specs: ["Fits 0-3 yrs", "Easy fold", "Mattress included"]
  },
  {
    id: "highchair-01",
    name: "Wipe-Clean High Chair",
    categoryId: "baby",
    pricePerDay: 9,
    imageUrl: "https://placeholder.example/baby-highchair.jpg",
    shortDescription: "Comfortable seating, easy cleanup.",
    longDescription: "Sturdy chair with removable tray and soft straps.",
    specs: ["3-point harness", "Tray included", "Lightweight"]
  },
  {
    id: "stroller-01",
    name: "Lightweight Stroller",
    categoryId: "baby",
    pricePerDay: 12,
    imageUrl: "https://placeholder.example/baby-stroller.jpg",
    shortDescription: "Smooth city & boardwalk rides.",
    longDescription: "Easy glide wheels, shade canopy, and compact fold.",
    specs: ["Recline seat", "Sun canopy", "Under-basket"]
  },
  {
    id: "monitor-01",
    name: "Audio Baby Monitor",
    categoryId: "baby",
    pricePerDay: 7,
    imageUrl: "https://placeholder.example/baby-monitor.jpg",
    shortDescription: "Clear audio with night light.",
    longDescription: "Reliable audio monitor for naps and bedtime.",
    specs: ["Night light", "Long range", "Two units"]
  },
  {
    id: "bouncer-01",
    name: "Soothing Baby Bouncer",
    categoryId: "baby",
    pricePerDay: 8,
    imageUrl: "https://placeholder.example/baby-bouncer.jpg",
    shortDescription: "Soft support with gentle motion.",
    longDescription: "Neutral bouncer with simple fold and washable cover.",
    specs: ["Machine-washable", "Lightweight", "Harness"]
  },
  {
    id: "tub-01",
    name: "Infant Bath Tub",
    categoryId: "baby",
    pricePerDay: 6,
    imageUrl: "https://placeholder.example/baby-tub.jpg",
    shortDescription: "Safe bathing setup.",
    longDescription: "Contoured tub for easy bathing and quick drainage.",
    specs: ["Non-slip base", "Drain plug", "0-12 months"]
  },
  {
    id: "wagon-01",
    name: "Beach Wagon",
    categoryId: "beach",
    pricePerDay: 12,
    imageUrl: "https://placeholder.example/beach-wagon.jpg",
    shortDescription: "Hauls towels, toys, and snacks.",
    longDescription: "Durable wheels and a sturdy frame for soft sand.",
    specs: ["Folds flat", "All-terrain wheels", "Cup holder"]
  },
  {
    id: "chair-01",
    name: "Comfort Beach Chair",
    categoryId: "beach",
    pricePerDay: 6,
    imageUrl: "https://placeholder.example/beach-chair.jpg",
    shortDescription: "Recline-ready coastal comfort.",
    longDescription: "Adjustable back with wood-tone accents.",
    specs: ["5 positions", "Lightweight", "Shoulder strap"]
  },
  {
    id: "umbrella-01",
    name: "Wide Beach Umbrella",
    categoryId: "beach",
    pricePerDay: 8,
    imageUrl: "https://placeholder.example/beach-umbrella.jpg",
    shortDescription: "Big shade, easy setup.",
    longDescription: "UV protection with sand anchor.",
    specs: ["UPF 50+", "Vent top", "Carry bag"]
  },
  {
    id: "toy-01",
    name: "Sand Toy Kit",
    categoryId: "beach",
    pricePerDay: 4,
    imageUrl: "https://placeholder.example/beach-toys.jpg",
    shortDescription: "Buckets, shovels, and molds.",
    longDescription: "A tidy set for beach play.",
    specs: ["10 pieces", "Lightweight", "Mesh bag"]
  },
  {
    id: "shower-01",
    name: "Portable Beach Shower",
    categoryId: "beach",
    pricePerDay: 7,
    imageUrl: "https://placeholder.example/beach-shower.jpg",
    shortDescription: "Quick rinse before heading in.",
    longDescription: "Solar-warm bag shower for sandy feet.",
    specs: ["5-gallon bag", "Easy hang", "No power"]
  },
  {
    id: "walker-01",
    name: "Rolling Walker",
    categoryId: "access",
    pricePerDay: 10,
    imageUrl: "https://placeholder.example/access-walker.jpg",
    shortDescription: "Stable and easy to maneuver.",
    longDescription: "Comfortable handles with a small storage pouch.",
    specs: ["Height adjustable", "Brakes", "Foldable"]
  }
];

const bundles = [
  {
    id: "bundle-baby",
    name: "Baby Sleep Set",
    items: [{ productId: "crib-01", qty: 1 }, { productId: "monitor-01", qty: 1 }],
    pricePerDay: 18,
    imageUrl: "https://placeholder.example/bundle-baby.jpg",
    description: "Crib + monitor for peaceful nights."
  },
  {
    id: "bundle-beach",
    name: "Beach Day Set",
    items: [{ productId: "chair-01", qty: 2 }, { productId: "umbrella-01", qty: 1 }],
    pricePerDay: 16,
    imageUrl: "https://placeholder.example/bundle-beach.jpg",
    description: "Shade and seating for two."
  },
  {
    id: "bundle-family",
    name: "Family Comfort Set",
    items: [{ productId: "wagon-01", qty: 1 }, { productId: "toy-01", qty: 1 }],
    pricePerDay: 14,
    imageUrl: "https://placeholder.example/bundle-family.jpg",
    description: "Carry-all plus play set."
  }
];

const storage = {
  get(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const state = {
  orderMeta: storage.get("qc_order_meta", {
    startDate: "",
    endDate: ""
  }),
  contact: storage.get("qc_contact", {
    fullName: "",
    email: "",
    phone: "",
    notes: ""
  }),
  cart: storage.get("qc_cart", [])
};

const rentalsBase = window.location.pathname.toLowerCase().includes("/rentals/") ? "." : "RENTALS";
const rentalsPath = path => `${rentalsBase}/${path}`;
const SESSION_FIRST_ADD_KEY = "qc_first_add_done";
let badgeCountCache = state.cart.reduce((sum, line) => sum + line.qty, 0);
let interactionVersion = 0;
let autoOpenTimer = null;
const parseDateLocal = value => {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
};

function saveState() {
  storage.set("qc_order_meta", state.orderMeta);
  storage.set("qc_contact", state.contact);
  storage.set("qc_cart", state.cart);
}

function getDays() {
  const { startDate, endDate } = state.orderMeta;
  if (!startDate || !endDate) return 1;
  const start = parseDateLocal(startDate);
  const end = parseDateLocal(endDate);
  if (!start || !end) return 1;
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return Math.max(1, diff);
}

function formatMoney(value) {
  return `$${value.toFixed(0)}`;
}

function getProductById(id) {
  return products.find(p => p.id === id);
}

function cartSubtotal() {
  const days = getDays();
  return state.cart.reduce((sum, line) => {
    const item = getProductById(line.productId);
    if (!item) return sum;
    return sum + item.pricePerDay * line.qty * days;
  }, 0);
}

function animateCartBadgeBounce() {
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    el.classList.remove("badge-bounce");
    void el.offsetWidth;
    el.classList.add("badge-bounce");
  });
}

function closeCartDrawer() {
  document.querySelector("[data-cart-drawer]")?.classList.remove("open");
  document.body.classList.remove("cart-open");
}

function spawnBubblePop(button) {
  if (!button) return;
  const burst = document.createElement("span");
  burst.className = "bubble-pop-layer";
  for (let i = 0; i < 8; i++) {
    const dot = document.createElement("span");
    dot.className = "bubble-pop-dot";
    const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.25;
    const distance = 12 + Math.random() * 18;
    dot.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    dot.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
    dot.style.animationDelay = `${i * 0.01}s`;
    burst.appendChild(dot);
  }
  button.appendChild(burst);
  setTimeout(() => burst.remove(), 360);
}

function openCartDrawer() {
  document.querySelector("[data-cart-drawer]")?.classList.add("open");
  document.body.classList.add("cart-open");
  document.querySelectorAll("[data-cart-open]").forEach(btn => {
    btn.classList.remove("is-pop");
    void btn.offsetWidth;
    btn.classList.add("is-pop");
    spawnBubblePop(btn);
  });
}

function scheduleCartAutoOpen(shouldOpen) {
  if (!shouldOpen) return;
  if (autoOpenTimer) clearTimeout(autoOpenTimer);
  const marker = interactionVersion;
  autoOpenTimer = setTimeout(() => {
    if (marker !== interactionVersion) return;
    openCartDrawer();
  }, 200);
}

function addItemsToCart(items = []) {
  if (!items.length) return;
  const wasEmpty = state.cart.length === 0;
  const firstAddThisSession = sessionStorage.getItem(SESSION_FIRST_ADD_KEY) !== "1";

  items.forEach(({ productId, qty = 1 }) => {
    const existing = state.cart.find(line => line.productId === productId);
    if (existing) existing.qty += qty;
    else state.cart.push({ productId, qty });
  });

  sessionStorage.setItem(SESSION_FIRST_ADD_KEY, "1");
  saveState();
  renderCart();
  scheduleCartAutoOpen((wasEmpty && state.cart.length > 0) || firstAddThisSession);
}

function addToCart(productId, qty = 1) {
  addItemsToCart([{ productId, qty }]);
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(line => line.productId !== productId);
  saveState();
  renderCart();
}

function updateQty(productId, delta) {
  const line = state.cart.find(l => l.productId === productId);
  if (!line) return;
  line.qty = Math.max(1, line.qty + delta);
  saveState();
  renderCart();
}

function renderCart() {
  const count = state.cart.reduce((sum, line) => sum + line.qty, 0);
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    el.textContent = count;
  });
  if (count > badgeCountCache) animateCartBadgeBounce();
  badgeCountCache = count;

  document.querySelectorAll("[data-cart-subtotal]").forEach(el => {
    el.textContent = formatMoney(cartSubtotal());
  });

  document.querySelectorAll("[data-cart-items]").forEach(container => {
    container.innerHTML = "";
    if (!state.cart.length) {
      container.innerHTML = "<p class='muted'>Your cart is empty.</p>";
      return;
    }
    state.cart.forEach(line => {
      const item = getProductById(line.productId);
      if (!item) return;
      const row = document.createElement("div");
      row.className = "cart-line";
      row.innerHTML = `
        <div>
          <strong>${item.name}</strong><br/>
          <span class="muted">${formatMoney(item.pricePerDay)}/day</span>
        </div>
        <div class="cart-actions">
          <button data-dec="${item.id}">-</button>
          <span>${line.qty}</span>
          <button data-inc="${item.id}">+</button>
          <button data-remove="${item.id}">Remove</button>
        </div>
      `;
      container.appendChild(row);
    });
  });
  document.querySelectorAll("[data-meta-dates]").forEach(el => {
    const { startDate, endDate } = state.orderMeta;
    el.textContent = startDate && endDate ? `${startDate} → ${endDate} (${getDays()} Days)` : "—";
  });
}

function bindCartControls() {
  document.addEventListener("click", () => {
    interactionVersion += 1;
  }, true);

  document.body.addEventListener("click", e => {
    const target = e.target;
    const openBtn = target.closest("[data-cart-open]");
    if (openBtn) {
      openCartDrawer();
    }
    if (target.closest("[data-cart-close]") || target.closest("[data-cart-backdrop]")) {
      closeCartDrawer();
    }
    const drawer = document.querySelector("[data-cart-drawer]");
    if (drawer?.classList.contains("open") && !target.closest("[data-cart-drawer]") && !target.closest("[data-cart-open]")) closeCartDrawer();
    if (target.matches("[data-inc]")) updateQty(target.dataset.inc, 1);
    if (target.matches("[data-dec]")) updateQty(target.dataset.dec, -1);
    if (target.matches("[data-remove]")) removeFromCart(target.dataset.remove);
    if (target.closest("[data-checkout-nav]")) {
      if (!state.cart.length) window.location.href = rentalsPath("empty-cart.html");
      else window.location.href = rentalsPath("summary.html");
    }
    if (target.closest("[data-nav-back]")) {
      if (window.history.length > 1) window.history.back();
      else window.location.href = rentalsPath("category.html?cat=baby");
    }
  });
}

function bindOrderMetaForms() {
  document.querySelectorAll("[data-order-meta-form]").forEach(form => {
    const errorEl = form.querySelector("[data-form-error]");
    form.startDate.value = state.orderMeta.startDate || "";
    form.endDate.value = state.orderMeta.endDate || "";

    form.addEventListener("submit", e => {
      e.preventDefault();
      const startDate = form.startDate.value;
      const endDate = form.endDate.value;

      if (!startDate || !endDate) {
        if (errorEl) errorEl.textContent = "Please select start and end dates.";
        return;
      }
      state.orderMeta = { startDate, endDate };
      saveState();
      if (errorEl) errorEl.textContent = "";
      renderCart();
      if (document.body.dataset.page === "checkout") {
        window.location.href = rentalsPath("category.html?cat=baby");
      }
    });
  });
}

function runShoppingButtonLoading(button, action) {
  if (!button || button.dataset.loading === "1") return;
  const original = button.textContent.trim();
  button.dataset.loading = "1";
  button.classList.add("is-loading");
  button.innerHTML = `<span class="btn-spinner" aria-hidden="true"></span><span>Loading</span>`;
  setTimeout(() => {
    action();
    button.classList.remove("is-loading");
    button.dataset.loading = "0";
    button.textContent = original;
  }, 300);
}

function setupCategoryPicker(currentCategoryId) {
  const picker = document.querySelector("[data-category-picker]");
  const menu = document.querySelector("[data-category-menu]");
  if (!picker || !menu) return;

  menu.innerHTML = "";
  categories.forEach(cat => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "category-option";
    item.dataset.cat = cat.id;
    item.textContent = cat.name;
    if (cat.id === currentCategoryId) item.classList.add("active");
    menu.appendChild(item);
  });

  const closeMenu = () => {
    picker.setAttribute("aria-expanded", "false");
    menu.hidden = true;
  };

  picker.addEventListener("click", () => {
    const expanded = picker.getAttribute("aria-expanded") === "true";
    picker.setAttribute("aria-expanded", String(!expanded));
    menu.hidden = expanded;
  });

  menu.addEventListener("click", e => {
    const option = e.target.closest(".category-option");
    if (!option) return;
    window.location.href = rentalsPath(`category.html?cat=${option.dataset.cat}`);
  });

  document.addEventListener("click", e => {
    if (!picker.contains(e.target) && !menu.contains(e.target)) closeMenu();
  });
}

function renderCategoryPage() {
  if (document.body.dataset.page !== "category") return;
  const params = new URLSearchParams(window.location.search);
  const catId = params.get("cat") || "baby";
  const cat = categories.find(c => c.id === catId) || categories[0];

  document.querySelector("[data-category-title]").textContent = cat.name;
  document.querySelector("[data-category-badge]").textContent = "I'm looking for...";
  document.querySelector("[data-category-intro]").textContent =
    cat.id === "baby"
      ? "Clean, comfort-first essentials delivered to your rental."
      : cat.id === "beach"
      ? "Soft-sand ready, light-to-carry beach gear."
      : "Accessibility rentals for a safe, easy stay.";
  setupCategoryPicker(cat.id);

  const bundleGrid = document.querySelector("[data-bundles-grid]");
  bundleGrid.innerHTML = "";
  bundles.forEach(bundle => {
    const card = document.createElement("div");
    card.className = "bundle-card";
    card.innerHTML = `
      <div class="card-image" style="background-image:url('${bundle.imageUrl}')"></div>
      <strong>${bundle.name}</strong>
      <span class="muted">${bundle.description}</span>
      <span class="price">${formatMoney(bundle.pricePerDay)}/day</span>
      <button class="btn primary shop-btn" data-bundle-add="${bundle.id}">Add bundle</button>
    `;
    bundleGrid.appendChild(card);
  });

  const productGrid = document.querySelector("[data-products-grid]");
  const searchInput = document.querySelector("[data-product-search]");
  const sortSelect = document.querySelector("[data-product-sort]");

  function renderProducts() {
    const term = searchInput.value.toLowerCase();
    let list = products.filter(p => p.categoryId === cat.id && p.name.toLowerCase().includes(term));
    if (sortSelect.value === "price-asc") list = list.sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sortSelect.value === "price-desc") list = list.sort((a, b) => b.pricePerDay - a.pricePerDay);

    productGrid.innerHTML = "";
    list.forEach(item => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="card-image" style="background-image:url('${item.imageUrl}')"></div>
        <strong>${item.name}</strong>
        <span class="muted">${item.shortDescription}</span>
        <span class="price">${formatMoney(item.pricePerDay)}/day</span>
        <div class="card-actions">
          <button class="btn primary shop-btn" data-add="${item.id}">Quick add</button>
          <a class="btn secondary" href="product.html?id=${item.id}">View details</a>
        </div>
      `;
      productGrid.appendChild(card);
    });
  }

  searchInput.addEventListener("input", renderProducts);
  sortSelect.addEventListener("change", renderProducts);
  renderProducts();

  document.body.addEventListener("click", e => {
    const addBtn = e.target.closest("[data-add]");
    if (addBtn) {
      runShoppingButtonLoading(addBtn, () => addToCart(addBtn.dataset.add, 1));
    }
    const bundleBtn = e.target.closest("[data-bundle-add]");
    if (bundleBtn) {
      const bundle = bundles.find(b => b.id === bundleBtn.dataset.bundleAdd);
      if (!bundle) return;
      runShoppingButtonLoading(bundleBtn, () => addItemsToCart(bundle.items));
    }
  });
}

function renderProductPage() {
  if (document.body.dataset.page !== "product") return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = getProductById(id) || products[0];

  document.querySelector("[data-product-name]").textContent = product.name;
  document.querySelector("[data-product-price]").textContent = `${formatMoney(product.pricePerDay)}/day`;
  document.querySelector("[data-product-short]").textContent = product.shortDescription;
  document.querySelector("[data-product-long]").textContent = product.longDescription;
  document.querySelector("[data-product-category]").textContent =
    categories.find(c => c.id === product.categoryId)?.name || "Category";

  const imageEl = document.querySelector("[data-product-image]");
  imageEl.style.backgroundImage = `url('${product.imageUrl}')`;

  const specsEl = document.querySelector("[data-product-specs]");
  specsEl.innerHTML = "";
  product.specs.forEach(spec => {
    const li = document.createElement("li");
    li.textContent = spec;
    specsEl.appendChild(li);
  });

  const qtyInput = document.querySelector("[data-qty-input]");
  document.querySelector("[data-qty-inc]").addEventListener("click", () => qtyInput.value = Number(qtyInput.value) + 1);
  document.querySelector("[data-qty-dec]").addEventListener("click", () => qtyInput.value = Math.max(1, Number(qtyInput.value) - 1));
  document.querySelector("[data-add-to-cart]").addEventListener("click", () => addToCart(product.id, Number(qtyInput.value)));

  document.querySelector("[data-back-to-category]").href = rentalsPath(`category.html?cat=${product.categoryId}`);
}

function renderCheckoutPage() {
  if (document.body.dataset.page !== "checkout") return;
  const errorEl = document.querySelector("[data-form-error]");
  const nextBtn = document.querySelector("[data-go-shopping]");
  const form = document.querySelector("[data-order-meta-form]");
  if (!nextBtn || !form) return;

  nextBtn.addEventListener("click", () => {
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const startDate = form.startDate.value;
    const endDate = form.endDate.value;
    if (!startDate || !endDate) {
      if (errorEl) errorEl.textContent = "Please select start and end dates.";
      return;
    }
    state.orderMeta = { startDate, endDate };
    saveState();
    if (errorEl) errorEl.textContent = "";
    window.location.href = rentalsPath("category.html?cat=baby");
  });
}

function renderSummaryPage() {
  if (document.body.dataset.page !== "summary") return;
  const checkoutError = document.querySelector("[data-checkout-error]");
  const submitBtn = document.querySelector("[data-checkout-submit]");
  const summaryDates = document.querySelector("[data-summary-dates]");
  const { startDate, endDate } = state.orderMeta;
  if (summaryDates) summaryDates.textContent = startDate && endDate ? `${startDate} → ${endDate}` : "—";

  submitBtn?.addEventListener("click", async () => {
    const { startDate, endDate } = state.orderMeta;
    if (!startDate || !endDate) {
      checkoutError.textContent = "Please add trip details before paying.";
      return;
    }
    if (!state.cart.length) {
      checkoutError.textContent = "Your cart is empty.";
      return;
    }
    checkoutError.textContent = "";
    await startStripeCheckout(state.cart, state.orderMeta);
    alert("Stripe checkout stub. Connect backend to proceed.");
  });
}

function initCarousel() {
  const track = document.querySelector("[data-carousel-track]");
  if (!track) return;
  const slides = Array.from(track.children);
  if (slides.length < 2) return;
  let index = 0;
  setInterval(() => {
    index = (index + 1) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  }, 3000);
}

function initCalendar() {
  const calendars = document.querySelectorAll("[data-calendar]");
  if (!calendars.length) return;

  const instances = [];

  calendars.forEach(cal => {
    const grid = cal.querySelector("[data-cal-grid]");
    const monthLabel = cal.querySelector("[data-cal-month]");
    const selectedLabel = cal.querySelector("[data-cal-selected]");
    const prevBtn = cal.querySelector("[data-cal-prev]");
    const nextBtn = cal.querySelector("[data-cal-next]");
    const form = cal.closest("form");
    const startInput = form?.querySelector("input[name='startDate']");
    const endInput = form?.querySelector("input[name='endDate']");

    let viewDate = new Date();

    function formatDate(d) {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    function sameDay(a, b) {
      return a && b && a.toDateString() === b.toDateString();
    }

    function render() {
      const start = parseDateLocal(state.orderMeta.startDate);
      const end = parseDateLocal(state.orderMeta.endDate);
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const startDay = firstDay.getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      monthLabel.textContent = firstDay.toLocaleString("en-US", { month: "long", year: "numeric" });
      grid.innerHTML = "";

      for (let i = 0; i < startDay; i++) {
        const empty = document.createElement("div");
        empty.className = "cal-day inactive";
        empty.textContent = "";
        grid.appendChild(empty);
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "cal-day";
        btn.innerHTML = `<span class="cal-day-num">${day}</span>`;
        btn.dataset.date = formatDate(date);

        const hasSelection = !!start;
        const inRange = start && end && date >= start && date <= end;
        if (!hasSelection) btn.classList.add("no-selection");
        if (inRange) btn.classList.add("range");
        if (sameDay(date, start)) btn.classList.add("selected", "start");
        if (sameDay(date, end)) btn.classList.add("selected", "end");

        btn.addEventListener("click", event => {
          const currentStart = parseDateLocal(state.orderMeta.startDate);
          const currentEnd = parseDateLocal(state.orderMeta.endDate);
          if (!start || (start && end)) {
            state.orderMeta.startDate = formatDate(date);
            state.orderMeta.endDate = "";
          } else if (date < start) {
            state.orderMeta.startDate = formatDate(date);
            state.orderMeta.endDate = "";
          } else {
            state.orderMeta.endDate = formatDate(date);
          }
          saveState();
          updateSelected();
          renderAllCalendars();
          renderCart();
          const calendarRect = cal.getBoundingClientRect();
          const clickPoint = {
            x: event.clientX - calendarRect.left,
            y: event.clientY - calendarRect.top
          };
          celebrateCalendarSelection(cal, selectedLabel, btn.dataset.date, clickPoint);
        });
        grid.appendChild(btn);
      }
      renderRangeEnergy(grid);
    }

    function updateSelected() {
      const start = parseDateLocal(state.orderMeta.startDate);
      const end = parseDateLocal(state.orderMeta.endDate);
      if (startInput) startInput.value = start ? formatDate(start) : "";
      if (endInput) endInput.value = end ? formatDate(end) : "";
      if (start && end) {
        selectedLabel.textContent = `${formatDate(start)} → ${formatDate(end)}`;
      } else if (start) {
        selectedLabel.textContent = `Start: ${formatDate(start)} — select end date`;
      } else {
        selectedLabel.textContent = "Pick start and end dates";
      }
    }

    prevBtn?.addEventListener("click", () => {
      viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
      render();
    });
    nextBtn?.addEventListener("click", () => {
      viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
      render();
    });

    instances.push({ render, updateSelected });
  });

  function renderAllCalendars() {
    instances.forEach(i => {
      i.updateSelected();
      i.render();
    });
  }

  renderAllCalendars();
}

function renderRangeEnergy(grid) {
  if (!grid) return;
  if (grid._rangeEnergyRaf) {
    cancelAnimationFrame(grid._rangeEnergyRaf);
    grid._rangeEnergyRaf = null;
  }
  grid.querySelectorAll(".range-energy-strip").forEach(el => el.remove());
  const inRange = Array.from(grid.querySelectorAll(".cal-day.range:not(.inactive)"));
  if (!inRange.length) return;

  const rows = new Map();
  inRange.forEach(cell => {
    const key = String(cell.offsetTop);
    if (!rows.has(key)) rows.set(key, []);
    rows.get(key).push(cell);
  });

  const orderedRows = Array.from(rows.entries())
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([top, cells]) => {
      cells.sort((a, b) => a.offsetLeft - b.offsetLeft);
      const first = cells[0];
      const last = cells[cells.length - 1];
      if (!first || !last) return null;
      const beamHeight = Math.round(first.offsetHeight * 1.2);
      const centerY = Number(top) + first.offsetHeight / 2;
      const firstIsRangeStart = first.classList.contains("start");
      const lastIsRangeEnd = last.classList.contains("end");
      const left = firstIsRangeStart
        ? first.offsetLeft + first.offsetWidth / 2
        : first.offsetLeft;
      const right = lastIsRangeEnd
        ? last.offsetLeft + last.offsetWidth / 2
        : last.offsetLeft + last.offsetWidth;
      return { first, last, left, right, centerY, beamHeight };
    })
    .filter(Boolean);

  if (!orderedRows.length) return;

  const strip = document.createElement("span");
  strip.className = "range-energy-strip";
  grid.appendChild(strip);

  const baseDurationMs = 1140;
  const tail = 464;
  const cycleMs = baseDurationMs * orderedRows.length;
  const startAt = performance.now();

  function tick(now) {
    if (!grid.isConnected) return;
    const elapsed = (now - startAt) % cycleMs;
    const rowIndex = Math.floor(elapsed / baseDurationMs);
    const rowElapsed = elapsed - rowIndex * baseDurationMs;
    const progress = rowElapsed / baseDurationMs;
    const row = orderedRows[rowIndex] || orderedRows[0];
    const rowWidth = Math.max(2, row.right - row.left);

    strip.style.left = `${row.left}px`;
    strip.style.top = `${row.centerY - row.beamHeight / 2}px`;
    strip.style.width = `${rowWidth}px`;
    strip.style.height = `${row.beamHeight}px`;
    strip.style.backgroundPosition = `${-tail + progress * (rowWidth + tail * 2)}px 0`;

    grid._rangeEnergyRaf = requestAnimationFrame(tick);
  }

  grid._rangeEnergyRaf = requestAnimationFrame(tick);
}

function celebrateCalendarSelection(calendar, selectedLabel, clickedDate, clickPoint) {
  if (!calendar || !selectedLabel) return;
  selectedLabel.classList.add("celebrate");
  const hasCompleteRange = !!(state.orderMeta.startDate && state.orderMeta.endDate);
  if (hasCompleteRange) {
    const rangeKey = `${state.orderMeta.startDate}|${state.orderMeta.endDate}`;
    const clickedEnd = clickedDate && clickedDate === state.orderMeta.endDate;
    if (clickedEnd && calendar.dataset.lastBurstKey !== rangeKey) {
      calendar.dataset.lastBurstKey = rangeKey;
      spawnCalendarConfetti(calendar, clickedDate, clickPoint);
    }
  }
  setTimeout(() => {
    selectedLabel.classList.remove("celebrate");
  }, 850);
}

function spawnCalendarConfetti(calendar, endDateValue, clickPoint) {
  const layer = document.createElement("div");
  layer.className = "confetti-layer";
  const colors = ["#2f7fd3", "#f07b63", "#f4a83a", "#67c98c", "#8a8df0", "#ffffff"];
  const pieces = 28;
  const targetDay = endDateValue
    ? calendar.querySelector(`.cal-day[data-date='${endDateValue}']`)
    : null;
  const originX = clickPoint && Number.isFinite(clickPoint.x)
    ? clickPoint.x
    : (targetDay ? targetDay.offsetLeft + targetDay.offsetWidth / 2 : calendar.clientWidth / 2);
  const originY = clickPoint && Number.isFinite(clickPoint.y)
    ? clickPoint.y
    : (targetDay ? targetDay.offsetTop + targetDay.offsetHeight / 2 : calendar.clientHeight / 2);

  for (let i = 0; i < pieces; i++) {
    const part = document.createElement("span");
    part.className = "confetti-piece";
    const angle = (Math.PI * 2 * i) / pieces + Math.random() * 0.18;
    const distance = 34 + Math.random() * 48;
    part.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    part.style.setProperty("--dy", `${Math.sin(angle) * distance - 10}px`);
    part.style.setProperty("--rot", `${Math.round((Math.random() - 0.5) * 540)}deg`);
    part.style.background = colors[i % colors.length];
    if (Math.random() > 0.5) part.style.borderRadius = "2px";
    part.style.left = `${originX}px`;
    part.style.top = `${originY}px`;
    layer.appendChild(part);
  }
  calendar.appendChild(layer);
  setTimeout(() => layer.remove(), 900);
}

function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length || !("IntersectionObserver" in window)) {
    targets.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  targets.forEach(el => observer.observe(el));
}

function initCountUp() {
  const counters = document.querySelectorAll("[data-count-to]");
  if (!counters.length) return;
  const ordered = Array.from(counters);
  setTimeout(async () => {
    for (const counter of ordered) {
      await animateCounter(counter);
      if ((counter.dataset.countKey || "") === "rating") {
        await runStarSlam();
      }
      if ((counter.dataset.countKey || "") === "speed") {
        showClockSpin();
      }
    }
  }, 300);
}

function animateCounter(counter) {
  return new Promise(resolve => {
    const target = Number(counter.dataset.countTo || 0);
    const suffix = counter.dataset.countSuffix || "";
    let value = 0;
    const totalTicks = 28;
    const step = Math.max(1, Math.ceil(target / totalTicks));
    const timer = setInterval(() => {
      value = Math.min(target, value + step);
      counter.childNodes[0].nodeValue = `${value}${suffix}`;
      if (value < target) return;
      clearInterval(timer);
      resolve();
    }, 32);
  });
}

function runStarSlam() {
  const stars = document.querySelectorAll("[data-slam-stars] span");
  if (!stars.length) return Promise.resolve();
  return new Promise(resolve => {
    stars.forEach((star, idx) => {
      setTimeout(() => {
        star.classList.add("slam");
        if (idx === stars.length - 1) {
          setTimeout(resolve, 300);
        }
      }, idx * 110);
    });
  });
}

function showClockSpin() {
  const clock = document.querySelector("[data-mini-clock]");
  if (!clock) return;
  clock.classList.add("show");
  clock.classList.add("spin");
  setTimeout(() => {
    clock.classList.remove("spin");
  }, 1000);
}

function initSocialProof() {
  const items = Array.from(document.querySelectorAll(".testimonial"));
  if (items.length > 1) {
    let idx = 0;
    setInterval(() => {
      items[idx].classList.remove("active");
      idx = (idx + 1) % items.length;
      items[idx].classList.add("active");
    }, 3800);
  }

  const liveBooking = document.querySelector("[data-live-booking]");
  if (!liveBooking) return;
  const updates = [
    "A family just booked a crib.",
    "A guest just added a beach wagon.",
    "A booking just added a high chair."
  ];
  let notice = 0;
  setInterval(() => {
    notice = (notice + 1) % updates.length;
    liveBooking.textContent = updates[notice];
  }, 4300);
}

function enforceDateRangeBeforeShopping() {
  const page = document.body.dataset.page;
  const requiresDates = page === "category" || page === "product" || page === "summary";
  const hasDates = !!(state.orderMeta.startDate && state.orderMeta.endDate);
  if (!requiresDates || hasDates) return false;
  window.location.href = rentalsPath("checkout.html");
  return true;
}

function init() {
  if (enforceDateRangeBeforeShopping()) return;
  bindCartControls();
  bindOrderMetaForms();
  renderCategoryPage();
  renderProductPage();
  renderCheckoutPage();
  renderSummaryPage();
  initCarousel();
  initCalendar();
  initScrollReveal();
  initCountUp();
  initSocialProof();
  renderCart();
}

document.addEventListener("DOMContentLoaded", init);


