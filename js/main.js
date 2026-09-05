/* ===========================================================
   ARKO — MAIN SHARED JS
   Injects header/footer, handles nav, toasts, GSAP reveals,
   product card rendering, and shared interactions.
=========================================================== */

/* ---- HEADER ---- */
function arkoHeader(active) {
  return `
  <nav class="nav" id="arkoNav">
    <a href="/index.html" class="nav-logo"><span class="dot"></span>ARKO</a>
    <div class="nav-links">
      <a href="/index.html" class="${active==='home'?'active':''}">Home</a>
      <div class="nav-mega-wrap">
        <span class="nav-link ${active==='shop'?'active':''}">Motorcycles <i class='bx bx-chevron-down'></i></span>
        <div class="nav-mega">
          <div>
            <h6>By Category</h6>
            <ul>
              <li><a href="/shop.html?category=Enduro">Enduro</a></li>
              <li><a href="/shop.html?category=Trail">Trail</a></li>
              <li><a href="/shop.html?category=Adventure">Adventure</a></li>
              <li><a href="/shop.html?category=Performance">Performance</a></li>
              <li><a href="/shop.html">View All</a></li>
            </ul>
          </div>
          <div>
            <h6>Featured</h6>
            <ul>
              <li><a href="/product.html?id=rvx">ARKO RVX</a></li>
              <li><a href="/product.html?id=rvx-pro">ARKO RVX Pro</a></li>
              <li><a href="/product.html?id=performance-rs">Performance RS</a></li>
              <li><a href="/configurator.html">Build Your Own</a></li>
            </ul>
          </div>
          <div>
            <h6>Tools</h6>
            <ul>
              <li><a href="/compare.html">Compare Models</a></li>
              <li><a href="/test-ride.html">Book a Test Ride</a></li>
              <li><a href="/dealers.html">Find a Dealer</a></li>
            </ul>
          </div>
        </div>
      </div>
      <a href="/accessories.html" class="${active==='accessories'?'active':''}">Accessories</a>
      <a href="/configurator.html" class="${active==='configurator'?'active':''}">Configurator</a>
      <a href="/dealers.html" class="${active==='dealers'?'active':''}">Dealers</a>
      <a href="/support.html" class="${active==='support'?'active':''}">Support</a>
    </div>
    <div class="nav-right">
      <a href="/search.html" class="icon-link" aria-label="Search"><i class='bx bx-search'></i></a>
      <a href="/account.html" class="icon-link" aria-label="Account"><i class='bx bx-user'></i></a>
      <a href="/wishlist.html" class="icon-link" aria-label="Wishlist"><i class='bx bx-heart'></i><span class="badge" data-wish-count style="display:none">0</span></a>
      <a href="/compare.html" class="icon-link" aria-label="Compare"><i class='bx bx-git-compare'></i><span class="badge" data-compare-count style="display:none">0</span></a>
      <a href="/cart.html" class="icon-link cart-link" aria-label="Cart"><i class='bx bx-cart'></i><span class="badge" data-cart-count style="display:none">0</span></a>
      <a href="/configurator.html" class="nav-cta"><i class='bx bx-plus-medical'></i>Build</a>
      <button class="nav-burger" id="navBurger"><span></span><span></span><span></span></button>
    </div>
  </nav>
  <div class="mobile-menu" id="mobileMenu">
    <a href="/index.html">Home</a>
    <a href="/shop.html">Motorcycles</a>
    <a href="/accessories.html">Accessories</a>
    <a href="/configurator.html">Configurator</a>
    <a href="/financing.html">Financing</a>
    <a href="/compare.html">Compare</a>
    <a href="/test-ride.html">Test Ride</a>
    <a href="/dealers.html">Dealers</a>
    <a href="/about.html">About</a>
    <a href="/stories.html">Stories</a>
    <a href="/support.html">Support</a>
    <a href="/contact.html">Contact</a>
    <a href="/account.html">Account</a>
    <div class="mm-foot">
      <a href="/cart.html" class="btn-volt btn-sm">Cart</a>
      <a href="/wishlist.html" class="btn-ghost btn-sm">Wishlist</a>
    </div>
  </div>
  `;
}

/* ---- FOOTER ---- */
function arkoFooter() {
  return `
  <footer class="footer">
    <div class="container-x">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="/index.html" class="nav-logo"><span class="dot"></span>ARKO</a>
          <p>Electric motorcycles built for terrain that doesn't forgive. Designed and assembled in Europe.</p>
          <div class="footer-social">
            <a href="#" aria-label="Instagram"><i class='bx bxl-instagram'></i></a>
            <a href="#" aria-label="YouTube"><i class='bx bxl-youtube'></i></a>
            <a href="#" aria-label="Facebook"><i class='bx bxl-facebook'></i></a>
            <a href="#" aria-label="X"><i class='bx bxl-twitter'></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h5>Motorcycles</h5>
          <ul>
            <li><a href="/shop.html?category=Enduro">Enduro</a></li>
            <li><a href="/shop.html?category=Trail">Trail</a></li>
            <li><a href="/shop.html?category=Adventure">Adventure</a></li>
            <li><a href="/shop.html?category=Performance">Performance</a></li>
            <li><a href="/configurator.html">Configurator</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Shop</h5>
          <ul>
            <li><a href="/accessories.html">Accessories</a></li>
            <li><a href="/accessories.html?category=Riding Gear">Riding Gear</a></li>
            <li><a href="/accessories.html?category=Chargers">Chargers</a></li>
            <li><a href="/accessories.html?category=Parts">Parts</a></li>
            <li><a href="/financing.html">Financing</a></li>
            <li><a href="/insurance.html">Insurance</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Company</h5>
          <ul>
            <li><a href="/about.html">About Us</a></li>
            <li><a href="/stories.html">Stories</a></li>
            <li><a href="/dealers.html">Find a Dealer</a></li>
            <li><a href="/contact.html">Contact</a></li>
            <li><a href="/service.html">Book a Service</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Newsletter</h5>
          <p style="color:#8c8c8c;font-size:.9rem;margin-bottom:14px">Get product updates and early access drops.</p>
          <form class="newsletter-form" onsubmit="arkoToast('Subscribed!','success');return false">
            <input type="email" placeholder="your@email.com" required>
            <button type="submit"><i class='bx bx-right-arrow-alt'></i></button>
          </form>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 ARKO Motors. All rights reserved.</p>
        <div class="footer-legal">
          <a href="/privacy.html">Privacy</a>
          <a href="/terms.html">Terms</a>
          <a href="/contact.html">Contact</a>
          <a href="/login.html">Sign In</a>
        </div>
      </div>
    </div>
  </footer>
  `;
}

/* ---- TOAST ---- */
function arkoToast(message, type) {
  type = type || 'default';
  var container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  var icon = 'bx-check';
  if (type === 'success') icon = 'bx-check-circle';
  if (type === 'error') icon = 'bx-x-circle';
  var toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.innerHTML = '<i class="bx ' + icon + '"></i><span>' + message + '</span>';
  container.appendChild(toast);
  requestAnimationFrame(function () { toast.classList.add('show'); });
  setTimeout(function () {
    toast.classList.remove('show');
    setTimeout(function () { toast.remove(); }, 400);
  }, 3000);
}

/* ---- STAR RATING HTML ---- */
function starRating(rating, size) {
  size = size || '.85rem';
  var html = '<span class="stars" style="font-size:' + size + '">';
  for (var i = 1; i <= 5; i++) {
    if (i <= Math.round(rating)) html += '<i class="bx bxs-star filled"></i>';
    else html += '<i class="bx bx-star empty"></i>';
  }
  html += '</span>';
  return html;
}

/* ---- PRODUCT CARD HTML ---- */
function productCardHTML(product) {
  var img = ARKO_IMG.search(product.image);
  var badge = '';
  if (product.badge) {
    var badgeClass = '';
    if (product.badge === 'Sale') badgeClass = 'sale';
    if (product.badge === 'New' || product.badge === 'Limited') badgeClass = 'dark';
    badge = '<span class="product-card-badge ' + badgeClass + '">' + product.badge + '</span>';
  }
  var oldPrice = product.oldPrice ? '<span class="old">' + formatPrice(product.oldPrice) + '</span>' : '';
  var colors = (product.colors || []).slice(0, 4).map(function (c) {
    return '<span class="swatch" style="background:' + c.hex + '" title="' + c.name + '"></span>';
  }).join('');
  var specs = product.specs;
  var specHTML = '';
  if (specs.range) specHTML += '<span><i class="bx bx-battery-charging"></i>' + specs.range + '</span>';
  if (specs.power) specHTML += '<span><i class="bx bx-bolt"></i>' + specs.power + '</span>';
  if (specs.weight) specHTML += '<span><i class="bx bx-weight"></i>' + specs.weight + '</span>';
  if (specs.topSpeed) specHTML += '<span><i class="bx bx-tachometer"></i>' + specs.topSpeed + '</span>';

  var wishActive = ARKO_STORE.inWishlist(product.id) ? 'active' : '';
  var compActive = ARKO_STORE.inCompare(product.id) ? 'active' : '';

  return `
  <div class="product-card" data-product-id="${product.id}" onclick="window.location.href='/product.html?id=${product.id}'">
    <div class="product-card-media">
      ${badge}
      <div class="product-card-actions">
        <button class="pc-action-btn ${wishActive}" onclick="event.stopPropagation();toggleWishlistUI(this,'${product.id}')" aria-label="Wishlist"><i class='bx bx-heart'></i></button>
        <button class="pc-action-btn ${compActive}" onclick="event.stopPropagation();toggleCompareUI(this,'${product.id}')" aria-label="Compare"><i class='bx bx-git-compare'></i></button>
        <button class="pc-action-btn" onclick="event.stopPropagation();quickView('${product.id}')" aria-label="Quick view"><i class='bx bx-show'></i></button>
      </div>
      <img src="${img}" alt="${product.name}" loading="lazy" />
    </div>
    <div class="product-card-body">
      <div class="product-card-cat">${product.category}</div>
      <div class="product-card-name">${product.name}</div>
      <div class="product-card-rating">${starRating(product.rating)}<span class="count">(${product.reviewCount})</span></div>
      <div class="product-card-specs">${specHTML}</div>
      ${colors ? '<div class="product-card-colors">' + colors + '</div>' : ''}
      <div class="product-card-availability ${product.availability}">${product.availability === 'in-stock' ? 'In Stock' : product.availability === 'pre-order' ? 'Pre-Order' : 'Out of Stock'}</div>
      <div class="product-card-footer">
        <div class="product-card-price">${formatPrice(product.price)}${oldPrice}</div>
      </div>
      <div class="product-card-cta">
        <button class="btn-volt btn-sm" onclick="event.stopPropagation();arkoAddToCart('${product.id}')"><i class='bx bx-cart'></i>Add to Cart</button>
        <a href="/product.html?id=${product.id}" class="btn-outline btn-sm" onclick="event.stopPropagation()">View</a>
      </div>
    </div>
  </div>`;
}

/* ---- WISHLIST / COMPARE UI TOGGLES ---- */
function toggleWishlistUI(btn, id) {
  var added = ARKO_STORE.toggleWishlist(id);
  if (added) {
    btn.classList.add('active');
    arkoToast('Added to wishlist', 'success');
  } else {
    btn.classList.remove('active');
    arkoToast('Removed from wishlist');
  }
}

function toggleCompareUI(btn, id) {
  var result = ARKO_STORE.toggleCompare(id);
  if (result === false) {
    arkoToast('Compare list is full (max 4)', 'error');
    return;
  }
  if (ARKO_STORE.inCompare(id)) {
    btn.classList.add('active');
    arkoToast('Added to compare', 'success');
  } else {
    btn.classList.remove('active');
    arkoToast('Removed from compare');
  }
}

/* ---- ADD TO CART ---- */
function arkoAddToCart(id, qty, options) {
  ARKO_STORE.addToCart(id, qty, options);
  arkoToast('Added to cart', 'success');
}

/* ---- QUICK VIEW MODAL ---- */
function quickView(id) {
  var p = getProductById(id);
  if (!p) return;
  var overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box">
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove()"><i class='bx bx-x'></i></button>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0">
        <div style="aspect-ratio:1;background:var(--charcoal)"><img src="${ARKO_IMG.search(p.image)}" style="width:100%;height:100%;object-fit:cover" alt="${p.name}" /></div>
        <div style="padding:36px">
          <div class="product-card-cat">${p.category}</div>
          <h2 style="font-size:1.8rem;font-weight:800;margin:8px 0">${p.name}</h2>
          <div style="margin-bottom:14px">${starRating(p.rating)} <span style="font-size:.85rem;color:#999">(${p.reviewCount} reviews)</span></div>
          <p style="color:#666;line-height:1.6;margin-bottom:20px">${p.description}</p>
          <div style="font-size:2rem;font-weight:800;margin-bottom:20px">${formatPrice(p.price)}</div>
          <div style="display:flex;gap:10px;margin-bottom:20px">
            ${p.specs.range ? '<span class="chip"><i class="bx bx-battery-charging"></i>' + p.specs.range + '</span>' : ''}
            ${p.specs.power ? '<span class="chip"><i class="bx bx-bolt"></i>' + p.specs.power + '</span>' : ''}
            ${p.specs.weight ? '<span class="chip"><i class="bx bx-weight"></i>' + p.specs.weight + '</span>' : ''}
          </div>
          <div style="display:flex;gap:10px">
            <button class="btn-volt" onclick="arkoAddToCart('${p.id}');this.closest('.modal-overlay').remove()"><i class='bx bx-cart'></i>Add to Cart</button>
            <a href="/product.html?id=${p.id}" class="btn-outline">Full Details</a>
          </div>
        </div>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  requestAnimationFrame(function () { overlay.classList.add('is-open'); });
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) overlay.remove();
  });
}

/* ---- INIT ---- */
function arkoInit(active) {
  // Inject header
  var headerSlot = document.querySelector('[data-header]');
  if (headerSlot) headerSlot.innerHTML = arkoHeader(active);

  // Inject footer
  var footerSlot = document.querySelector('[data-footer]');
  if (footerSlot) footerSlot.innerHTML = arkoFooter();

  // Mobile menu
  var burger = document.getElementById('navBurger');
  var menu = document.getElementById('mobileMenu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      menu.classList.toggle('is-open');
      burger.classList.toggle('is-open');
      if (burger.classList.contains('is-open')) {
        burger.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        burger.children[1].style.opacity = '0';
        burger.children[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        burger.children[0].style.transform = '';
        burger.children[1].style.opacity = '';
        burger.children[2].style.transform = '';
      }
    });
  }

  // Nav scroll
  var nav = document.getElementById('arkoNav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) nav.style.padding = '10px clamp(20px, 4vw, 56px)';
      else nav.style.padding = '';
    });
  }

  // Update badges
  ARKO_STORE.updateBadges();

  // GSAP reveals
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('[data-reveal]', { opacity: 1, y: 0 });
      gsap.set('[data-reveal-img] img', { scale: 1 });
      gsap.set('.split-line > span', { y: 0 });
    } else {
      gsap.utils.toArray('[data-reveal]').forEach(function (el) {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        });
      });
      gsap.utils.toArray('[data-reveal-img]').forEach(function (el) {
        var img = el.querySelector('img');
        if (img) {
          gsap.to(img, {
            scale: 1, duration: 1.4, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
          });
        }
      });
      gsap.utils.toArray('.split-line').forEach(function (el) {
        var span = el.querySelector('span');
        if (span) {
          gsap.to(span, {
            y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
          });
        }
      });
    }
  }
}

/* Auto-init on DOMContentLoaded */
document.addEventListener('DOMContentLoaded', function () {
  // If page has data-active attribute, use it
  var body = document.body;
  var active = body.getAttribute('data-active') || '';
  arkoInit(active);
});
