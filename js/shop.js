/* ============================================================
   ARKO — shop.js
   Page-specific logic for shop.html: filtering, sorting, search
   and pagination over window.ARKO.motorcycles. Card markup, cart/
   wishlist/compare state and quick view all come from js/ecommerce.js
   — this file only ever computes "which ids, in which order" and
   hands off to window.ARKO.motoCardHTML().
============================================================ */
(function () {
  var ALL = window.ARKO.motorcycles;
  var PAGE_SIZE = 9;

  var state = {
    search: "",
    categories: [],
    availability: [],
    priceMax: 24000,
    rangeMin: 90,
    ratingMin: 0,
    sort: "featured",
    page: 1,
  };

  /* ---------- Read initial category from ?category= ---------- */
  var params = new URLSearchParams(window.location.search);
  var initialCategory = params.get("category");
  if (initialCategory) {
    state.categories = [initialCategory];
  }

  /* ---------- Elements ---------- */
  var grid = document.getElementById("productGrid");
  var resultsCount = document.getElementById("resultsCount");
  var pagination = document.getElementById("pagination");
  var searchInput = document.getElementById("shopSearch");
  var sortSelect = document.getElementById("sortSelect");
  var priceSlider = document.getElementById("filterPrice");
  var priceVal = document.getElementById("filterPriceVal");
  var rangeSlider = document.getElementById("filterRange");
  var rangeVal = document.getElementById("filterRangeVal");
  var ratingGroup = document.getElementById("filterRatingGroup");
  var clearBtn = document.getElementById("filterClear");
  var sidebar = document.getElementById("filterSidebar");
  var toggleMobile = document.getElementById("filterToggleMobile");
  var closeMobile = document.getElementById("filterCloseMobile");

  /* ---------- Pre-check category checkbox from URL ---------- */
  if (initialCategory) {
    var pre = document.querySelector(
      '.filter-check input[data-filter="category"][value="' +
        initialCategory +
        '"]',
    );
    if (pre) pre.checked = true;
  }

  /* ---------- Static facet counts (against full catalog) ---------- */
  function paintCounts() {
    document.querySelectorAll("[data-count-for]").forEach(function (el) {
      var key = el.getAttribute("data-count-for");
      var n = ALL.filter(function (m) {
        return m.category === key || m.availability === key;
      }).length;
      el.textContent = "(" + n + ")";
    });
  }
  paintCounts();

  /* ---------- Filter + sort ---------- */
  function getFiltered() {
    return ALL.filter(function (m) {
      if (state.categories.length && state.categories.indexOf(m.category) === -1)
        return false;
      if (
        state.availability.length &&
        state.availability.indexOf(m.availability) === -1
      )
        return false;
      if (m.price > state.priceMax) return false;
      if (m.specs.range < state.rangeMin) return false;
      if (m.rating < state.ratingMin) return false;
      if (state.search) {
        var q = state.search.toLowerCase();
        var haystack = (
          m.name +
          " " +
          m.categoryLabel +
          " " +
          m.tagline
        ).toLowerCase();
        if (haystack.indexOf(q) === -1) return false;
      }
      return true;
    });
  }

  function getSorted(list) {
    var out = list.slice();
    switch (state.sort) {
      case "price-asc":
        out.sort(function (a, b) {
          return a.price - b.price;
        });
        break;
      case "price-desc":
        out.sort(function (a, b) {
          return b.price - a.price;
        });
        break;
      case "rating":
        out.sort(function (a, b) {
          return b.rating - a.rating;
        });
        break;
      case "newest":
        out.sort(function (a, b) {
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        });
        break;
      default:
        out.sort(function (a, b) {
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        });
    }
    return out;
  }

  /* ---------- Render ---------- */
  function render() {
    var filtered = getSorted(getFiltered());
    var total = filtered.length;
    var maxPage = Math.max(1, Math.ceil(total / PAGE_SIZE));
    if (state.page > maxPage) state.page = maxPage;
    var start = (state.page - 1) * PAGE_SIZE;
    var pageItems = filtered.slice(start, start + PAGE_SIZE);

    resultsCount.textContent =
      total + (total === 1 ? " motorcycle" : " motorcycles");

    if (!pageItems.length) {
      grid.innerHTML =
        '<div class="state-block">' +
        '<i class="bx bx-search-alt"></i>' +
        "<h3>No motorcycles match those filters</h3>" +
        "<p>Try widening your price range or clearing a filter to see more of the range.</p>" +
        '<button class="btn-line" id="emptyClear">Clear all filters <i class="bx bx-right-arrow-alt"></i></button>' +
        "</div>";
      var emptyClear = document.getElementById("emptyClear");
      emptyClear && emptyClear.addEventListener("click", resetFilters);
    } else {
      grid.innerHTML = pageItems
        .map(function (m) {
          return window.ARKO.motoCardHTML(m);
        })
        .join("");
      if (window.ARKOImages) window.ARKOImages.resolveAll(grid);
    }

    renderPagination(maxPage);
  }

  function renderPagination(maxPage) {
    if (maxPage <= 1) {
      pagination.innerHTML = "";
      return;
    }
    var html = "";
    html +=
      '<button data-page="' +
      (state.page - 1) +
      '" aria-label="Previous page"' +
      (state.page === 1 ? " disabled" : "") +
      '><i class="bx bx-chevron-left"></i></button>';
    for (var i = 1; i <= maxPage; i++) {
      html +=
        '<button data-page="' +
        i +
        '" class="' +
        (i === state.page ? "is-active" : "") +
        '">' +
        i +
        "</button>";
    }
    html +=
      '<button data-page="' +
      (state.page + 1) +
      '" aria-label="Next page"' +
      (state.page === maxPage ? " disabled" : "") +
      '><i class="bx bx-chevron-right"></i></button>';
    pagination.innerHTML = html;
    pagination.querySelectorAll("button[data-page]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.page = parseInt(btn.getAttribute("data-page"), 10);
        render();
        document
          .getElementById("shopSection")
          .scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  /* ---------- Wire up controls ---------- */
  var searchDebounce;
  searchInput.addEventListener("input", function () {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(function () {
      state.search = searchInput.value.trim();
      state.page = 1;
      render();
    }, 220);
  });

  sortSelect.addEventListener("change", function () {
    state.sort = sortSelect.value;
    state.page = 1;
    render();
  });

  document
    .querySelectorAll('.filter-check input[data-filter="category"]')
    .forEach(function (cb) {
      cb.addEventListener("change", function () {
        state.categories = Array.from(
          document.querySelectorAll(
            '.filter-check input[data-filter="category"]:checked',
          ),
        ).map(function (el) {
          return el.value;
        });
        state.page = 1;
        render();
      });
    });

  document
    .querySelectorAll('.filter-check input[data-filter="availability"]')
    .forEach(function (cb) {
      cb.addEventListener("change", function () {
        state.availability = Array.from(
          document.querySelectorAll(
            '.filter-check input[data-filter="availability"]:checked',
          ),
        ).map(function (el) {
          return el.value;
        });
        state.page = 1;
        render();
      });
    });

  priceSlider.addEventListener("input", function () {
    state.priceMax = parseInt(priceSlider.value, 10);
    priceVal.textContent = window.ARKO.formatPrice(state.priceMax);
    state.page = 1;
    render();
  });

  rangeSlider.addEventListener("input", function () {
    state.rangeMin = parseInt(rangeSlider.value, 10);
    rangeVal.textContent = state.rangeMin + " km";
    state.page = 1;
    render();
  });

  ratingGroup.querySelectorAll("button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      ratingGroup.querySelectorAll("button").forEach(function (b) {
        b.classList.remove("is-active");
      });
      btn.classList.add("is-active");
      state.ratingMin = parseFloat(btn.getAttribute("data-rating"));
      state.page = 1;
      render();
    });
  });
  // Default active rating pill = "All"
  var allRatingBtn = ratingGroup.querySelector('[data-rating="0"]');
  if (allRatingBtn) allRatingBtn.classList.add("is-active");

  function resetFilters() {
    state.search = "";
    state.categories = [];
    state.availability = [];
    state.priceMax = 24000;
    state.rangeMin = 90;
    state.ratingMin = 0;
    state.sort = "featured";
    state.page = 1;
    searchInput.value = "";
    sortSelect.value = "featured";
    priceSlider.value = 24000;
    priceVal.textContent = "€24,000";
    rangeSlider.value = 90;
    rangeVal.textContent = "90 km";
    document
      .querySelectorAll('.filter-check input[type="checkbox"]')
      .forEach(function (cb) {
        cb.checked = false;
      });
    ratingGroup.querySelectorAll("button").forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-rating") === "0");
    });
    render();
  }
  clearBtn.addEventListener("click", resetFilters);

  /* ---------- Mobile filter drawer ---------- */
  function openSidebar() {
    sidebar.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeSidebar() {
    sidebar.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  toggleMobile.addEventListener("click", openSidebar);
  closeMobile.addEventListener("click", closeSidebar);
  document.addEventListener("click", function (e) {
    if (!sidebar.classList.contains("is-open")) return;
    if (sidebar.contains(e.target) || e.target === toggleMobile || toggleMobile.contains(e.target))
      return;
    closeSidebar();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSidebar();
  });

  render();
})();
