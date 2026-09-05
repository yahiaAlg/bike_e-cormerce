/* ===========================================================
   ARKO — STORE LOGIC
   Cart, wishlist, compare — all localStorage-based.
   Shared across every page.
=========================================================== */

const ARKO_STORE = (function () {
  const CART_KEY = 'arko_cart';
  const WISH_KEY = 'arko_wishlist';
  const COMPARE_KEY = 'arko_compare';
  const RECENT_KEY = 'arko_recent';

  function read(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; }
    catch { return []; }
  }
  function write(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
    updateBadges();
  }

  /* ---- CART ---- */
  function getCart() { return read(CART_KEY); }

  function addToCart(id, qty, options) {
    qty = qty || 1;
    options = options || {};
    var cart = getCart();
    var key = id + JSON.stringify(options);
    var existing = cart.find(function (c) { return c.key === key; });
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ key: key, id: id, qty: qty, options: options, addedAt: Date.now() });
    }
    write(CART_KEY, cart);
  }

  function removeFromCart(key) {
    var cart = getCart().filter(function (c) { return c.key !== key; });
    write(CART_KEY, cart);
  }

  function updateCartQty(key, qty) {
    var cart = getCart();
    var item = cart.find(function (c) { return c.key === key; });
    if (item) {
      item.qty = Math.max(1, qty);
      write(CART_KEY, cart);
    }
  }

  function clearCart() { write(CART_KEY, []); }

  function cartCount() {
    return getCart().reduce(function (s, c) { return s + c.qty; }, 0);
  }

  function cartTotal() {
    return getCart().reduce(function (s, c) {
      var p = getProductById(c.id);
      var price = p ? p.price : 0;
      var optPrice = 0;
      if (c.options && c.options.upgrades) {
        optPrice = c.options.upgrades.reduce(function (sum, u) { return sum + (u.price || 0); }, 0);
      }
      return s + (price + optPrice) * c.qty;
    }, 0);
  }

  /* ---- WISHLIST ---- */
  function getWishlist() { return read(WISH_KEY); }

  function toggleWishlist(id) {
    var wish = getWishlist();
    var idx = wish.indexOf(id);
    if (idx > -1) { wish.splice(idx, 1); }
    else { wish.push(id); }
    write(WISH_KEY, wish);
    return idx === -1;
  }

  function inWishlist(id) { return getWishlist().indexOf(id) > -1; }

  function removeFromWishlist(id) {
    var wish = getWishlist().filter(function (w) { return w !== id; });
    write(WISH_KEY, wish);
  }

  /* ---- COMPARE ---- */
  function getCompare() { return read(COMPARE_KEY); }

  function toggleCompare(id) {
    var comp = getCompare();
    var idx = comp.indexOf(id);
    if (idx > -1) {
      comp.splice(idx, 1);
    } else {
      if (comp.length >= 4) return false;
      comp.push(id);
    }
    write(COMPARE_KEY, comp);
    return true;
  }

  function inCompare(id) { return getCompare().indexOf(id) > -1; }

  function removeFromCompare(id) {
    var comp = getCompare().filter(function (c) { return c !== id; });
    write(COMPARE_KEY, comp);
  }

  /* ---- RECENTLY VIEWED ---- */
  function addRecent(id) {
    var recent = read(RECENT_KEY).filter(function (r) { return r !== id; });
    recent.unshift(id);
    if (recent.length > 8) recent = recent.slice(0, 8);
    write(RECENT_KEY, recent);
  }

  function getRecent() { return read(RECENT_KEY); }

  /* ---- BADGES ---- */
  function updateBadges() {
    var cartN = cartCount();
    var wishN = getWishlist().length;
    var compN = getCompare().length;
    document.querySelectorAll('[data-cart-count]').forEach(function (el) {
      el.textContent = cartN;
      el.style.display = cartN > 0 ? 'flex' : 'none';
    });
    document.querySelectorAll('[data-wish-count]').forEach(function (el) {
      el.textContent = wishN;
      el.style.display = wishN > 0 ? 'flex' : 'none';
    });
    document.querySelectorAll('[data-compare-count]').forEach(function (el) {
      el.textContent = compN;
      el.style.display = compN > 0 ? 'flex' : 'none';
    });
  }

  return {
    getCart: getCart,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    updateCartQty: updateCartQty,
    clearCart: clearCart,
    cartCount: cartCount,
    cartTotal: cartTotal,
    getWishlist: getWishlist,
    toggleWishlist: toggleWishlist,
    inWishlist: inWishlist,
    removeFromWishlist: removeFromWishlist,
    getCompare: getCompare,
    toggleCompare: toggleCompare,
    inCompare: inCompare,
    removeFromCompare: removeFromCompare,
    addRecent: addRecent,
    getRecent: getRecent,
    updateBadges: updateBadges
  };
})();
