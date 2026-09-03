/* ============================================================
   ARKO — ecommerce.js
   Shared commerce interaction layer, loaded after js/main.js and
   js/data.js on every catalog/commerce page. Owns: cart / wishlist
   / compare state (localStorage-backed), toast notifications, the
   header mega-menu, search overlay and mini-cart drawer. Page-
   specific scripts (js/shop.js, js/product.js...) read/write this
   state instead of keeping their own.
============================================================ */
(function () {
  var STORAGE_KEYS = { cart: "arko_cart", wishlist: "arko_wishlist", compare: "arko_compare" };

  function load(key) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }

  var state = {
    cart: load(STORAGE_KEYS.cart),
    wishlist: load(STORAGE_KEYS.wishlist),
    compare: load(STORAGE_KEYS.compare)
  };

  /* ---------- Cart ---------- */
  function cartLineKey(productId, variant) {
    return productId + "::" + (variant ? JSON.stringify(variant) : "");
  }
  function addToCart(productId, opts) {
    opts = opts || {};
    var qty = opts.qty || 1;
    var variant = opts.variant || {};
    var key = cartLineKey(productId, variant);
    var line = state.cart.find(function (l) { return l.key === key; });
    if (line) {
      line.qty += qty;
    } else {
      state.cart.push({ key: key, productId: productId, type: opts.type || "motorcycle", variant: variant, qty: qty });
    }
    save(STORAGE_KEYS.cart, state.cart);
    refreshBadges();
    renderCartDrawer();
    return line || state.cart[state.cart.length - 1];
  }
  function removeFromCart(key) {
    state.cart = state.cart.filter(function (l) { return l.key !== key; });
    save(STORAGE_KEYS.cart, state.cart);
    refreshBadges();
    renderCartDrawer();
  }
  function setCartQty(key, qty) {
    var line = state.cart.find(function (l) { return l.key === key; });
    if (!line) return;
    line.qty = Math.max(1, qty);
    save(STORAGE_KEYS.cart, state.cart);
    refreshBadges();
    renderCartDrawer();
  }
  function cartCount() {
    return state.cart.reduce(function (n, l) { return n + l.qty; }, 0);
  }
  function cartTotal() {
    return state.cart.reduce(function (sum, l) {
      var p = window.ARKO.getMotorcycle(l.productId) || window.ARKO.getAccessory(l.productId);
      if (!p) return sum;
      var base = p.price;
      if (l.variant && l.variant.batteryDelta) base += l.variant.batteryDelta;
      return sum + base * l.qty;
    }, 0);
  }

  /* ---------- Wishlist ---------- */
  function isWishlisted(productId) { return state.wishlist.indexOf(productId) !== -1; }
  function toggleWishlist(productId) {
    var idx = state.wishlist.indexOf(productId);
    var added;
    if (idx === -1) { state.wishlist.push(productId); added = true; }
    else { state.wishlist.splice(idx, 1); added = false; }
    save(STORAGE_KEYS.wishlist, state.wishlist);
    refreshBadges();
    return added;
  }

  /* ---------- Compare ---------- */
  var COMPARE_LIMIT = 4;
  function isComparing(productId) { return state.compare.indexOf(productId) !== -1; }
  function toggleCompare(productId) {
    var idx = state.compare.indexOf(productId);
    if (idx !== -1) {
      state.compare.splice(idx, 1);
      save(STORAGE_KEYS.compare, state.compare);
      renderCompareTray();
      return { added: false, full: false };
    }
    if (state.compare.length >= COMPARE_LIMIT) {
      renderCompareTray();
      return { added: false, full: true };
    }
    state.compare.push(productId);
    save(STORAGE_KEYS.compare, state.compare);
    renderCompareTray();
    return { added: true, full: false };
  }
  function removeCompare(productId) {
    state.compare = state.compare.filter(function (id) { return id !== productId; });
    save(STORAGE_KEYS.compare, state.compare);
    renderCompareTray();
  }

  /* ---------- Badges ---------- */
  function refreshBadges() {
    document.querySelectorAll("#cartCount, .nav-cart-count").forEach(function (el) {
      var n = cartCount();
      el.textContent = n;
      el.classList.toggle("is-visible", n > 0);
    });
    document.querySelectorAll("#wishlistCount, .nav-wishlist-count").forEach(function (el) {
      var n = state.wishlist.length;
      el.textContent = n;
      el.classList.toggle("is-visible", n > 0);
    });
  }

  /* ---------- Toasts ---------- */
  var toastHost = null;
  function ensureToastHost() {
    if (toastHost) return toastHost;
    toastHost = document.createElement("div");
    toastHost.className = "toast-host";
    toastHost.setAttribute("aria-live", "polite");
    document.body.appendChild(toastHost);
    return toastHost;
  }
  function toast(msg, opts) {
    opts = opts || {};
    var host = ensureToastHost();
    var el = document.createElement("div");
    el.className = "toast" + (opts.type ? " toast-" + opts.type : "");
    el.innerHTML =
      '<i class="bx ' + (opts.icon || "bx-check-circle") + '"></i>' +
      '<span>' + msg + "</span>" +
      (opts.actionLabel ? '<a href="' + opts.actionHref + '" class="toast-action">' + opts.actionLabel + "</a>" : "") +
      '<button class="toast-close" aria-label="Dismiss"><i class="bx bx-x"></i></button>';
    host.appendChild(el);
    requestAnimationFrame(function () { el.classList.add("is-visible"); });
    var remove = function () {
      el.classList.remove("is-visible");
      setTimeout(function () { el.remove(); }, 350);
    };
    el.querySelector(".toast-close").addEventListener("click", remove);
    setTimeout(remove, 4200);
  }

  /* ---------- Mega menu ---------- */
  function initMegaMenu() {
    var items = document.querySelectorAll(".nav-item.has-mega");
    items.forEach(function (item) {
      var trigger = item.querySelector(".nav-mega-trigger");
      var menu = item.querySelector(".mega-menu");
      if (!trigger || !menu) return;
      var open = false;
      var setOpen = function (v) {
        open = v;
        item.classList.toggle("is-open", open);
        trigger.setAttribute("aria-expanded", open ? "true" : "false");
      };
      item.addEventListener("mouseenter", function () { setOpen(true); });
      item.addEventListener("mouseleave", function () { setOpen(false); });
      trigger.addEventListener("click", function (e) {
        if (window.innerWidth <= 860) return;
        e.preventDefault();
        setOpen(!open);
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") setOpen(false);
      });
    });
  }

  /* ---------- Search overlay ---------- */
  function initSearchOverlay() {
    var toggle = document.getElementById("searchToggle");
    var overlay = document.getElementById("searchOverlay");
    if (!toggle || !overlay) return;
    var input = overlay.querySelector("input");
    var closeBtn = overlay.querySelector(".search-close");
    var open = function () {
      overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
      setTimeout(function () { input && input.focus(); }, 150);
    };
    var close = function () {
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
    };
    toggle.addEventListener("click", open);
    closeBtn && closeBtn.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    var form = overlay.querySelector("form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var q = input.value.trim();
        window.location.href = "search.html" + (q ? "?q=" + encodeURIComponent(q) : "");
      });
    }
  }

  /* ---------- Cart drawer ---------- */
  function renderCartDrawer() {
    var body = document.getElementById("cartDrawerBody");
    var footer = document.getElementById("cartDrawerFooter");
    if (!body) return;
    if (!state.cart.length) {
      body.innerHTML =
        '<div class="drawer-empty">' +
        '<i class="bx bx-shopping-bag"></i>' +
        "<p>Your cart is empty.</p>" +
        '<a href="shop.html" class="btn-line">Browse the range <i class="bx bx-right-arrow-alt"></i></a>' +
        "</div>";
      if (footer) footer.style.display = "none";
      return;
    }
    if (footer) footer.style.display = "";
    body.innerHTML = state.cart
      .map(function (l) {
        var p = window.ARKO.getMotorcycle(l.productId) || window.ARKO.getAccessory(l.productId);
        if (!p) return "";
        var unit = p.price + (l.variant && l.variant.batteryDelta ? l.variant.batteryDelta : 0);
        return (
          '<div class="drawer-line" data-key="' + l.key + '">' +
          '<div class="drawer-line-media"><img data-q="' + p.image + ',200,200" alt="' + p.name + '"></div>' +
          '<div class="drawer-line-info">' +
          "<p class=\"drawer-line-name\">" + p.name + "</p>" +
          (l.variant && l.variant.color ? '<p class="drawer-line-variant">' + l.variant.color + (l.variant.batteryLabel ? " · " + l.variant.batteryLabel : "") + "</p>" : "") +
          '<div class="qty-stepper qty-stepper-sm">' +
          '<button class="qty-dec" aria-label="Decrease quantity"><i class="bx bx-minus"></i></button>' +
          '<span>' + l.qty + "</span>" +
          '<button class="qty-inc" aria-label="Increase quantity"><i class="bx bx-plus"></i></button>' +
          "</div>" +
          "</div>" +
          '<div class="drawer-line-price mono-num">' + window.ARKO.formatPrice(unit * l.qty) + "</div>" +
          '<button class="drawer-line-remove" aria-label="Remove item"><i class="bx bx-trash"></i></button>' +
          "</div>"
        );
      })
      .join("");
    var totalEl = document.getElementById("cartDrawerTotal");
    if (totalEl) totalEl.textContent = window.ARKO.formatPrice(cartTotal());

    body.querySelectorAll(".drawer-line").forEach(function (lineEl) {
      var key = lineEl.getAttribute("data-key");
      var line = state.cart.find(function (l) { return l.key === key; });
      lineEl.querySelector(".qty-inc").addEventListener("click", function () { setCartQty(key, line.qty + 1); });
      lineEl.querySelector(".qty-dec").addEventListener("click", function () {
        if (line.qty <= 1) { removeFromCart(key); } else { setCartQty(key, line.qty - 1); }
      });
      lineEl.querySelector(".drawer-line-remove").addEventListener("click", function () { removeFromCart(key); });
    });
  }

  function initCartDrawer() {
    var toggle = document.getElementById("cartToggle");
    var drawer = document.getElementById("cartDrawer");
    var scrim = document.getElementById("cartDrawerScrim");
    if (!toggle || !drawer) return;
    var open = function () {
      renderCartDrawer();
      drawer.classList.add("is-open");
      scrim && scrim.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };
    var close = function () {
      drawer.classList.remove("is-open");
      scrim && scrim.classList.remove("is-open");
      document.body.style.overflow = "";
    };
    toggle.addEventListener("click", open);
    var closeBtn = drawer.querySelector(".drawer-close");
    closeBtn && closeBtn.addEventListener("click", close);
    scrim && scrim.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    window.ARKO.openCartDrawer = open;
  }

  /* ---------- Compare tray ---------- */
  function renderCompareTray() {
    var tray = document.getElementById("compareTray");
    if (!tray) return;
    if (!state.compare.length) {
      tray.classList.remove("is-visible");
      return;
    }
    tray.classList.add("is-visible");
    var thumbs = tray.querySelector(".compare-tray-thumbs");
    thumbs.innerHTML = state.compare
      .map(function (id) {
        var p = window.ARKO.getMotorcycle(id);
        if (!p) return "";
        return (
          '<div class="compare-tray-thumb" data-id="' + id + '">' +
          '<img data-q="' + p.image + ',160,160" alt="' + p.name + '">' +
          '<button aria-label="Remove ' + p.name + ' from compare"><i class="bx bx-x"></i></button>' +
          "</div>"
        );
      })
      .join("");
    if (window.ARKOImages) window.ARKOImages.resolveAll(thumbs);
    thumbs.querySelectorAll("button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        removeCompare(btn.parentElement.getAttribute("data-id"));
      });
    });
    var countEl = tray.querySelector(".compare-tray-count");
    if (countEl) countEl.textContent = state.compare.length + " / " + COMPARE_LIMIT;
    var link = tray.querySelector(".compare-tray-cta");
    if (link) link.href = "compare.html?ids=" + state.compare.join(",");
  }

  function initCompareTray() {
    var tray = document.getElementById("compareTray");
    if (!tray) return;
    var clear = tray.querySelector(".compare-tray-clear");
    clear && clear.addEventListener("click", function () {
      state.compare = [];
      save(STORAGE_KEYS.compare, state.compare);
      renderCompareTray();
    });
    renderCompareTray();
  }

  /* ---------- Public API ---------- */
  window.ARKO = window.ARKO || {};
  window.ARKO.cartState = state;
  window.ARKO.addToCart = addToCart;
  window.ARKO.removeFromCart = removeFromCart;
  window.ARKO.setCartQty = setCartQty;
  window.ARKO.cartCount = cartCount;
  window.ARKO.cartTotal = cartTotal;
  window.ARKO.isWishlisted = isWishlisted;
  window.ARKO.toggleWishlist = toggleWishlist;
  window.ARKO.isComparing = isComparing;
  window.ARKO.toggleCompare = toggleCompare;
  window.ARKO.compareIds = function () { return state.compare.slice(); };
  window.ARKO.toast = toast;
  window.ARKO.renderCartDrawer = renderCartDrawer;
  window.ARKO.renderCompareTray = renderCompareTray;

  document.addEventListener("DOMContentLoaded", function () {
    refreshBadges();
    initMegaMenu();
    initSearchOverlay();
    initCartDrawer();
    initCompareTray();
  });
})();
