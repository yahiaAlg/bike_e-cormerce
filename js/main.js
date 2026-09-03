/* ============================================================
   ARKO — main.js
   Combined interaction layer extracted from index.html.
============================================================ */

/* ---------- IMAGE MODULE (js/images.js) ---------- */
/* ===========================================================
   IMAGE MODULE  (js/images.js)
   source.unsplash.com (the old random-keyword redirect) has been
   permanently shut down, so it can no longer resolve any image —
   every img[data-q] was silently falling back to the placeholder
   SVG. Fixed by mapping each data-q keyword to a specific,
   verified Unsplash CDN asset (images.unsplash.com/photo-<id>),
   which is a stable, key-free hotlink Unsplash still serves.
   To swap in official campaign photography later, just replace
   the id string on the right — the data-q keys/markup don't change.
=========================================================== */
(function () {
  // key: data-q keyword -> Unsplash CDN path (credit: photographer, unsplash.com/license)
  var MEDIA = {
    "enduro motorcycle dirt trail forest": "photo-1582092722992-b2f960bafbfb", // Jeremy Bishop
    "motocross rider mud action": "photo-1606497058128-19b758a3dd88", // Alina Rubo
    "electric dirt bike studio yellow": "photo-1597479434905-db73b8789725", // Robin Thunholm
    "electric motorcycle battery closeup": "photo-1525012758503-e9e7c93032b5", // Taras Chernus
    "motorcycle forest silence mist": "photo-1562732401-e7768620c4c9", // Josiah Ness
    "motorcycle mechanic garage minimal": "photo-1525013066836-c6090f0ad9d8", // Taras Chernus
    "dirt bike wheelie action dust": "photo-1502163736820-9bfa4575afcf", // Mohammad Faruque
    "mountain trail motorcycle distance": "photo-1505807514643-8521e260c67e", // Simon Moog
    "enduro rider rocky terrain": "photo-1585210256590-fc52fd1e8348", // Davide Zanotti
    "motorcycle forest trees light": "photo-1692317799913-8908255e6f6a", // Jasper Garratt
    "dirt bike jump forest action": "photo-1517258307935-9764dad5d7de", // Darren Nunis
    "off road motorcycle rocky path": "photo-1605121476668-ae388fa8fe27", // Tucker Scott
    "motorcycle riding forest road trail wide":
      "photo-1435244837924-21c508f9db25", // Gabriel Sanchez
    "electric dirt bike front studio": "photo-1660337294765-2a20770826aa", // Trent Haaland
    "dirt bike side profile studio": "photo-1542550546-88afdd84b64f", // Andraz Lazic
    "motorcycle rider action forest": "photo-1606497058128-19b758a3dd88", // Alina Rubo
    "dirt bike mud splash action": "flagged/photo-1566353820556-a53008aa8392", // Lital Levy
    "motorcycle suspension closeup detail": "photo-1525013066836-c6090f0ad9d8", // Taras Chernus
    "electric motorcycle wheel closeup": "photo-1505807514643-8521e260c67e", // Simon Moog
    "motorcycle sunset silhouette trail": "photo-1615572766543-06c21416eb05", // Mert Ceyhan
  };

  function placeholderSVG(w, h) {
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="' +
      w +
      '" height="' +
      h +
      '" viewBox="0 0 ' +
      w +
      " " +
      h +
      '">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#1c1c1c"/><stop offset="1" stop-color="#0b0b0b"/></linearGradient></defs>' +
      '<rect width="100%" height="100%" fill="url(#g)"/>' +
      '<g stroke="#2a2a2a" stroke-width="1" fill="none">' +
      '<path d="M0,' +
      h * 0.7 +
      " Q " +
      w * 0.3 +
      "," +
      h * 0.5 +
      " " +
      w +
      "," +
      h * 0.65 +
      '"/>' +
      '<path d="M0,' +
      h * 0.82 +
      " Q " +
      w * 0.4 +
      "," +
      h * 0.6 +
      " " +
      w +
      "," +
      h * 0.8 +
      '"/>' +
      "</g>" +
      '<circle cx="' +
      w / 2 +
      '" cy="' +
      h / 2 +
      '" r="3" fill="#F2E900"/>' +
      "</svg>";
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }
  function resolve(img) {
    var q = img.getAttribute("data-q");
    if (!q) return;
    var parts = q.split(",");
    var query = parts[0],
      w = parts[1] || 1200,
      h = parts[2] || 900;
    var id = MEDIA[query];
    img.src = id
      ? "https://images.unsplash.com/" +
        id +
        "?auto=format&fit=crop&q=80&w=" +
        w +
        "&h=" +
        h
      : placeholderSVG(w, h);
    img.loading = img.loading || "lazy";
    img.onerror = function () {
      img.onerror = null;
      img.src = placeholderSVG(w, h);
    };
  }
  document.querySelectorAll("img[data-q]").forEach(resolve);
  var heroImg = document.getElementById("heroImg");
  if (heroImg) {
    heroImg.loading = "eager";
  }

  /* Exposed so pages that inject markup at runtime (product cards,
     quick view, cart drawer, compare tray, etc.) can resolve any new
     img[data-q] elements without duplicating the resolver logic. */
  window.ARKOImages = {
    resolveAll: function (root) {
      (root || document).querySelectorAll("img[data-q]").forEach(resolve);
    },
  };
})();

/* ---------- MAIN (js/main.js) — nav, reveal, counters, battery scrub ---------- */
/* ===========================================================
   MAIN  (js/main.js)
   Nav, mobile menu, hero timeline, reveals, counters, battery.
=========================================================== */
(function () {
  gsap.registerPlugin(ScrollTrigger);
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Nav scroll state ---- */
  var nav = document.getElementById("siteNav");
  ScrollTrigger.create({
    start: "top -80",
    end: 99999,
    toggleClass: { targets: nav, className: "is-scrolled" },
  });

  /* ---- Mobile menu ---- */
  var burger = document.getElementById("burgerBtn");
  var menu = document.getElementById("mobileMenu");
  burger.addEventListener("click", function () {
    var open = menu.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      menu.classList.remove("is-open");
      document.body.style.overflow = "";
    });
  });

  /* ---- Split hero title into per-letter reveal (line based) ---- */
  document.querySelectorAll(".hero-title .line span").forEach(function (el) {});

  /* ---- Page load timeline ---- */
  var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.to(".hero-title .line span", { yPercent: 0, duration: 1.1, stagger: 0.12 })
    .to(".hero-kicker", { opacity: 1, y: 0, duration: 0.7 }, "-=.9")
    .to(".hero-sub", { opacity: 1, y: 0, duration: 0.7 }, "-=.7")
    .to(".hero-actions", { opacity: 1, y: 0, duration: 0.7 }, "-=.6")
    .to(".hero-media img", { scale: 1, duration: 2.4, ease: "power2.out" }, 0);

  gsap.set([".hero-kicker", ".hero-sub", ".hero-actions"], {
    opacity: 0,
    y: 20,
  });

  /* ---- Generic reveal on scroll ---- */
  document.querySelectorAll("[data-reveal]").forEach(function (el) {
    if (el.closest(".hero")) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      },
    );
  });
  document.querySelectorAll("[data-reveal-img] img").forEach(function (img) {
    gsap.fromTo(
      img,
      { scale: 1.18 },
      {
        scale: 1,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: img, start: "top 90%" },
      },
    );
  });

  /* ---- Counters ---- */
  document.querySelectorAll(".counter").forEach(function (el) {
    var target = parseFloat(el.getAttribute("data-target"));
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: function () {
        var obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: function () {
            el.textContent = Math.round(obj.v);
          },
        });
      },
    });
  });

  /* ---- Parallax on section media ---- */
  gsap.utils.toArray(".intro-media, .model-media").forEach(function (el) {
    if (reduced) return;
    gsap.to(el.querySelector("img"), {
      yPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  /* ---- Battery swap scrubbed sequence ---- */
  var batterySection = document.getElementById("battery");
  if (batterySection) {
    var bTl = gsap.timeline({
      scrollTrigger: {
        trigger: batterySection,
        start: "top top",
        end: "+=140%",
        scrub: 1,
        pin: true,
      },
    });
    bTl
      .to("#batteryOld", {
        yPercent: 0,
        top: "56%",
        y: "-160%",
        opacity: 1,
        duration: 0.3,
      })
      .to("#batteryOld", { y: "40%", opacity: 0.2, duration: 0.35 })
      .to("#batteryGlow", { opacity: 1, duration: 0.2 }, "-=.15")
      .to(
        "#batteryNew",
        { y: "0%", top: "56%", opacity: 1, duration: 0.35 },
        "-=.1",
      )
      .to("#batteryGlow", { opacity: 0, duration: 0.3 })
      .to("#batteryProgress", { width: "100%", duration: 1 }, 0);
  }

  /* ---- Cinematic image micro-scale on enter ---- */
  gsap.utils
    .toArray(".cine-media img, .final-media img")
    .forEach(function (img) {
      gsap.fromTo(
        img,
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: img.closest("section"),
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

  /* ---- Cine play/sound toggle (decorative, no real video asset) ---- */
  var playBtn = document.getElementById("cinePlay");
  var soundBtn = document.getElementById("cineSound");
  if (playBtn) {
    playBtn.addEventListener("click", function () {
      var icon = playBtn.querySelector("i");
      var playing = icon.classList.contains("bx-pause");
      icon.classList.toggle("bx-play", playing);
      icon.classList.toggle("bx-pause", !playing);
    });
  }
  if (soundBtn) {
    soundBtn.addEventListener("click", function () {
      var icon = soundBtn.querySelector("i");
      var on = icon.classList.contains("bx-volume-full");
      icon.classList.toggle("bx-volume-full", !on);
      icon.classList.toggle("bx-volume-mute", on);
    });
  }

  /* ---- Newsletter (no backend — acknowledge locally) ---- */
  var form = document.getElementById("newsletterForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector("button");
      var icon = btn.querySelector("i");
      icon.className = "bx bx-check";
      form.querySelector("input").value = "";
      setTimeout(function () {
        icon.className = "bx bx-right-arrow-alt";
      }, 2200);
    });
  }

  /* ---- Smooth in-page anchor scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        gsap.to(window, {
          duration: 1.1,
          ease: "power3.inOut",
          scrollTo: { y: target, offsetY: 70 },
        });
      }
    });
  });
})();

/* ---------- HORIZONTAL SCROLL FEATURES ---------- */
/* ===========================================================
   HORIZONTAL SCROLL FEATURES  (js/carousel.js — feature track)
=========================================================== */
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var track = document.getElementById("hTrack");
  var pin = document.getElementById("hScrollPin");
  var dots = document.querySelectorAll("#hProgress span");
  if (!track || !pin) return;

  gsap.matchMedia().add("(min-width: 861px)", function () {
    var panels = track.querySelectorAll(".h-panel");
    var total = panels.length;
    var getDistance = function () {
      return track.scrollWidth - window.innerWidth;
    };

    var tween = gsap.to(track, {
      x: function () {
        return -getDistance();
      },
      ease: "none",
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: function () {
          return "+=" + getDistance() * 1.1;
        },
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          var i = Math.min(total - 1, Math.floor(self.progress * total));
          dots.forEach(function (d, idx) {
            d.classList.toggle("active", idx <= i);
          });
        },
      },
    });
    return function () {
      tween.kill();
    };
  });

  gsap.matchMedia().add("(max-width: 860px)", function () {
    // On mobile the track becomes a natural horizontal swipe strip.
    track.style.overflowX = "auto";
    track.style.scrollSnapType = "x mandatory";
    pin.style.height = "auto";
    track.querySelectorAll(".h-panel").forEach(function (p) {
      p.style.scrollSnapAlign = "start";
      p.style.height = "80vh";
    });
  });
})();

/* ---------- TRAIL MAP ---------- */
/* ===========================================================
   TRAIL MAP  (js/map.js)
=========================================================== */
(function () {
  var path = document.getElementById("routePath");
  var marker = document.getElementById("routeMarker");
  var pin = document.getElementById("mapPin");
  var points = document.querySelectorAll(".route-point-group");
  var stageEl = document.getElementById("mcStage");
  var textEl = document.getElementById("mcText");
  if (!path || !marker || !pin) return;

  var len = path.getTotalLength();
  path.style.strokeDasharray = len;
  path.style.strokeDashoffset = len;

  var stops = [
    {
      label: "Start",
      text: "Battery charged, tyres checked. The trail hasn't been ridden yet — that's the best part.",
    },
    {
      label: "Forest",
      text: "Tight single-track and low light. Instant torque makes the tricky lines feel simple.",
    },
    {
      label: "Valley",
      text: "Open ground, longer sightlines. Time to open the throttle and let the RVX stretch out.",
    },
    {
      label: "Ridge",
      text: "Loose rock and elevation. Long-travel suspension keeps both wheels talking to the ground.",
    },
    {
      label: "Summit",
      text: "Silence, and a view that was worth every switchback. Swap the battery, ride back down.",
    },
  ];
  var pointPositions = [];
  points.forEach(function (g) {
    var c = g.querySelector("circle");
    pointPositions.push({
      x: parseFloat(c.getAttribute("cx")),
      y: parseFloat(c.getAttribute("cy")),
      el: g,
    });
  });

  function nearestStopIndex(progress) {
    var target = progress * len;
    var best = 0,
      bestDiff = Infinity;
    pointPositions.forEach(function (p, i) {
      // approximate stop position along path by sampling
      var samplePt = path.getPointAtLength(
        (i / (pointPositions.length - 1)) * len,
      );
      var diff = Math.abs(samplePt.x - p.x) + Math.abs(samplePt.y - p.y);
    });
    return Math.min(
      stops.length - 1,
      Math.round(progress * (stops.length - 1)),
    );
  }

  ScrollTrigger.create({
    trigger: pin,
    start: "top top",
    end: "+=220%",
    scrub: 1,
    pin: true,
    invalidateOnRefresh: true,
    onUpdate: function (self) {
      var progress = self.progress;
      var drawLen = len * progress;
      path.style.strokeDashoffset = len - drawLen;
      var pt = path.getPointAtLength(drawLen);
      marker.setAttribute("cx", pt.x);
      marker.setAttribute("cy", pt.y);

      var idx = nearestStopIndex(progress);
      pointPositions.forEach(function (p, i) {
        var active =
          i <= Math.floor(progress * (pointPositions.length - 1) + 0.001);
        p.el
          .querySelector(".route-point")
          .classList.toggle("active", i === idx || (active && i === idx));
        p.el.querySelector(".route-label").classList.toggle("active", i <= idx);
      });
      var stop = stops[idx];
      if (stop && stageEl.textContent !== stop.label) {
        stageEl.textContent = stop.label;
        textEl.textContent = stop.text;
      }
    },
  });
})();

/* ---------- PRODUCT CAROUSEL ---------- */
/* ===========================================================
   PRODUCT CAROUSEL  (js/carousel.js — image carousel)
=========================================================== */
(function () {
  var slides = Array.from(document.querySelectorAll("#carouselStage .c-slide"));
  var dotsWrap = document.getElementById("carouselDots");
  var curEl = document.getElementById("cCur");
  var totalEl = document.getElementById("cTotal");
  var prevBtn = document.getElementById("cPrev");
  var nextBtn = document.getElementById("cNext");
  if (!slides.length) return;

  var index = 0;
  totalEl.textContent = String(slides.length).padStart(2, "0");

  slides.forEach(function (_, i) {
    var b = document.createElement("button");
    b.className = "c-dot" + (i === 0 ? " is-active" : "");
    b.setAttribute("aria-label", "Go to image " + (i + 1));
    b.addEventListener("click", function () {
      goTo(i);
    });
    dotsWrap.appendChild(b);
  });
  var dots = Array.from(dotsWrap.children);

  function goTo(i) {
    var next = (i + slides.length) % slides.length;
    if (next === index) return;
    var curSlide = slides[index],
      nextSlide = slides[next];
    gsap
      .timeline()
      .to(
        curSlide.querySelector("img"),
        { scale: 1.06, duration: 0.5, ease: "power2.in" },
        0,
      )
      .set(curSlide, { className: "c-slide" })
      .set(nextSlide, { className: "c-slide is-active" })
      .fromTo(
        nextSlide.querySelector("img"),
        { scale: 1.12, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "power3.out" },
        0,
      )
      .fromTo(nextSlide, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0);
    index = next;
    curEl.textContent = String(index + 1).padStart(2, "0");
    dots.forEach(function (d, di) {
      d.classList.toggle("is-active", di === index);
    });
  }

  prevBtn.addEventListener("click", function () {
    goTo(index - 1);
  });
  nextBtn.addEventListener("click", function () {
    goTo(index + 1);
  });
  document.addEventListener("keydown", function (e) {
    var stage = document.getElementById("carouselStage");
    var rect = stage.getBoundingClientRect();
    var visible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!visible) return;
    if (e.key === "ArrowRight") goTo(index + 1);
    if (e.key === "ArrowLeft") goTo(index - 1);
  });
})();

/* ---------- ScrollToPlugin substitute ---------- */
/* ScrollToPlugin substitute (avoid extra CDN dependency) */
if (window.gsap && !gsap.plugins?.scrollTo) {
  gsap.registerPlugin({
    name: "scrollTo",
    init: function () {},
  });
}

/* ---------- scrollTo shim ---------- */
/* Lightweight scrollTo shim used by main.js anchor handler */
(function () {
  if (!window.gsap) return;
  var orig = gsap.to;
  gsap.to = function (target, vars) {
    if (vars && vars.scrollTo) {
      var y = vars.scrollTo.y;
      var offset = vars.scrollTo.offsetY || 0;
      var el = typeof y === "string" ? document.querySelector(y) : y;
      var top = el
        ? el.getBoundingClientRect().top + window.scrollY - offset
        : 0;
      window.scrollTo({ top: top, behavior: "smooth" });
      return { kill: function () {} };
    }
    return orig.apply(gsap, arguments);
  };
})();
