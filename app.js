/* Shinena homepage wiring: config links, store badges, contact stub, HE/EN. */
(function () {
  "use strict";
  var cfg = window.SHINENA_HOME || {};

  function $(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  // ---- Outbound links from config ----
  $("[data-app-link]").forEach(function (a) {
    if (cfg.APP_URL) a.href = cfg.APP_URL;
  });
  var donate = document.querySelector("[data-donate-link]");
  if (donate) {
    if (cfg.DONATE_URL && cfg.DONATE_URL !== "#") donate.href = cfg.DONATE_URL;
    else donate.setAttribute("aria-disabled", "true");
  }

  // ---- Store badges: real URL or "soon" state ----
  function storeState(name, url) {
    var btn = document.querySelector('[data-store="' + name + '"]');
    if (!btn) return;
    if (url && url !== "#") {
      btn.href = url;
    } else {
      btn.href = "#get";
      btn.classList.add("soon");
      btn.addEventListener("click", function (ev) {
        ev.preventDefault();
        toast(currentLang === "he" ? "בקרוב בחנות — עקבו אחרינו!" : "Coming soon to the store!");
      });
    }
  }
  // TODO(store): direct APK link can go live anytime via ANDROID_APK_URL.
  storeState("android-apk", cfg.ANDROID_APK_URL);
  storeState("play", cfg.PLAY_STORE_URL);
  storeState("ios", cfg.APP_STORE_URL);

  // ---- Contact form: backend later, mailto for now ----
  var form = document.getElementById("contactForm");
  var note = document.getElementById("contactNote");
  if (form) {
    if (cfg.CONTACT_ACTION && cfg.CONTACT_ACTION !== "#") {
      form.action = cfg.CONTACT_ACTION;
    } else {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var data = new FormData(form);
        var subject = encodeURIComponent("Shinena contact: " + (data.get("name") || ""));
        var body = encodeURIComponent((data.get("message") || "") + "\n\n— " + (data.get("email") || ""));
        window.location.href = "mailto:" + (cfg.CONTACT_EMAIL || "") + "?subject=" + subject + "&body=" + body;
        if (note) note.textContent = currentLang === "he" ? "נפתחה תוכנת המייל — שלחו את ההודעה משם." : "Mail app opened — send from there.";
      });
    }
  }

  // ---- Toast ----
  var toastEl = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.style.cssText = "position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1c1917;color:#fff;padding:10px 18px;border-radius:12px;font-weight:700;z-index:99";
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.style.display = "block";
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.style.display = "none"; }, 2500);
  }

  // ---- HE/EN toggle (minimal dictionary; Hebrew is default) ----
  var currentLang = document.documentElement.lang || "he";
  var STR = { en: {
  "q1": "Is Shinena really free?",
  "a1": "Yes. Shinena is free, with no ads and no in-app purchases. Donations help fund servers and new texts.",
  "q2": "Can I study offline?",
  "a2": "Yes. The texts (about 11 MB) download once on first launch, then the app works with no signal.",
  "q3": "Which texts are included?",
  "a3": "All 63 tractates of the Mishna, the complete Tanakh, the Babylonian Talmud, the Rambam and the Shulchan Arukh.",
  "q4": "How does Shinena check my recitation?",
  "a4": "You recite into the mic. Hebrew speech recognition compares what you said to the text word by word, including niqqud, and shows exactly where you slipped.",
  "q5": "What is SM-2?",
  "a5": "A spaced-repetition method. The algorithm works out when each passage should come back, based on how well you knew it, so you review just before you forget.",
  "q6": "Which devices does it run on?",
  "a6": "You can play now in the browser on a phone, tablet or computer, and there is an Android beta build. Store versions are on the way.",
  "q7": "Is my recording stored?",
  "a7": "Your recording does not leave your device unless you ask us to score it. Full details are in the privacy policy.",
  "f1t": "Recite out loud, checked live",
  "f1d": "Hebrew speech recognition that understands niqqud. Every word is checked as you speak, so you know right away where you slipped.",
  "f2t": "Adventure map",
  "f2d": "Every chapter is a stage on a winding trail. Unlock the next one, and each world has its own scenery: Mishna, Tanakh and Talmud.",
  "f3t": "Graded hints",
  "f3d": "From the first letter of each word up to a full recitation. Start with help and take it away step by step.",
  "f4t": "Smart reviews (SM-2)",
  "f4d": "The algorithm decides when each passage returns, based on how well you knew it. Ten minutes a day is enough.",
  "f5t": "Streaks, badges and ranks",
  "f5d": "A daily goal, streaks, badges and achievements. Leaderboards split by country, subject and book, so there is always someone at your level.",
  "f6t": "14 themes",
  "f6d": "From Jerusalem Stone to Pixel Arcade. Switch any time, your progress stays.",
  "g1": "Home: one clear next step",
  "g2": "Adventure map",
  "g3": "Pick a passage and level",
  "g4": "The recitation arena",
  "g5": "Graded hints",
  "g6": "Progress and reviews",
  "g7": "14 themes",
  "sp1a": "Green stage: learned well",
  "sp1b": "Orange stage: due for review",
  "sp1c": "Every book has its own scenery",
  "sp1e": "THE MAP",
  "sp1t": "Your journey, one stage at a time",
  "sp1p": "Instead of a list of chapters, there is a whole world. Every mishna is a stop on the trail, and the stage colour shows what you learned and what is due for review.",
  "sp2a": "Hebrew voice recognition, with niqqud",
  "sp2b": "Score, XP and combos",
  "sp2c": "Manual typing works too",
  "sp2e": "THE ARENA",
  "sp2t": "You recite, Shinena listens",
  "sp2p": "Tap the mic and recite. The transcript appears live and missed words are marked, so you know what to strengthen next time.",
  "sp3a": "Daily goal and streak",
  "sp3b": "Accuracy and progress over time",
  "sp3c": "One button: \"Review now\"",
  "sp3e": "REVIEWS",
  "sp3t": "Review at exactly the right time",
  "sp3p": "The SM-2 method works out when each passage should return. You see a daily goal, a streak and accuracy, and the app shows what is worth reviewing today.",
  "au1t": "Students and teens",
  "au1d": "Memorise for tests without the boredom. Stars and ranks turn it into a game.",
  "au2t": "Parents and teachers",
  "au2d": "A fun way to practise together. Daily goals and streaks keep everyone going.",
  "au3t": "Adults and Gemara learners",
  "au3d": "Ten minutes on the train or on a break, and learning that lasts for years.",
  "skip": "Skip to content",
  "tag": "Learn. Memorise. Remember.",
  "nHow": "How it works",
  "nFeat": "Features",
  "nShots": "Screenshots",
  "nLib": "Library",
  "nFaq": "FAQ",
  "nGet": "Download",
  "playNow": "Start learning",
  "kicker": "✦ Torah memorisation, like a game",
  "h1": "Learn. Memorise. Remember.",
  "lede": "Shinena is a free app for memorising Mishna, Tanakh, Gemara and more. Recite out loud, Shinena checks every word live, and you earn stars and XP on the way to the next chapter.",
  "cta1": "Start learning",
  "cta2": "Get it for Android",
  "tk1": "Free, no ads, no purchases",
  "tk2": "Works offline",
  "tk3": "Hebrew and English interface",
  "bubble": "Word by word, step by step!",
  "st1": "Mishna tractates",
  "st2": "Books of Tanakh",
  "st3": "Themes",
  "st4": "Ads",
  "howT": "Three steps to a recitation that sticks",
  "howS": "No long setup. Open, pick and go.",
  "s1t": "Pick a passage",
  "s1d": "Tractate, chapter and mishna, or book, chapter and verse. A short passage or a whole chapter, at a level that suits you.",
  "s2t": "Recite out loud",
  "s2d": "Tap the mic and recite. Shinena compares every word to the text, marks what slipped and gives a score.",
  "s3t": "Review on time",
  "s3d": "Finish a stage, collect stars, and SM-2 brings the passage back just before you forget it.",
  "fT": "Everything you need to keep learning",
  "gT": "A look inside the app",
  "gS": "Real screenshots from the new version. Scroll sideways for more.",
  "lbE": "THE LIBRARY",
  "lbT": "The whole library in your pocket",
  "lbS": "All texts download once on first launch (about 11 MB), then everything works with no connection. On the bus, on a flight or with no signal.",
  "c1": "Mishna · 63 tractates",
  "c2": "Tanakh · 39 books",
  "c3": "Babylonian Talmud",
  "c4": "Rambam · Mishneh Torah",
  "c5": "Shulchan Arukh · four Turim",
  "lbC": "Try it now, free",
  "auT": "Who it is for",
  "vT": "Shinena in 60 seconds",
  "vS": "A quick look: recitation, the map and smart reviews.",
  "faqT": "Frequently asked questions",
  "gtT": "Start now, for free",
  "gtS": "The browser app is fully playable now. Store versions are on the way.",
  "gtB": "Play in the browser",
  "apkT": "Android (direct beta)",
  "apkD": "Manual APK install file",
  "soon": "Soon",
  "soon2": "Soon",
  "dnT": "Love it? Help Shinena grow 💛",
  "dnS": "Shinena is free and stays free. Your gift funds servers, recordings and new texts.",
  "dnB": "Secure donation",
  "ctT": "Contact",
  "cName": "Name",
  "cEmail": "Email",
  "cMsg": "Message",
  "cSend": "Send",
  "rights": "© Shinena - joyful Torah learning",
  "openApp": "Open the app",
  "nDon": "Donate",
  "nCon": "Contact",
  "brand": "Shinena",
  "delLink": "How do I delete my account?",
  "privLink": "Privacy policy",
  "nPriv": "Privacy",
  "nDel": "Delete Account"
} };
  var btn = document.getElementById("langToggle");
  function applyLang(l) {
    currentLang = l;
    document.documentElement.lang = l;
    document.documentElement.dir = l === "he" ? "rtl" : "ltr";
    if (btn) btn.textContent = l === "he" ? "EN" : "עב";
    if (l === "en") {
      $("[data-i18n]").forEach(function (el) {
        var k = el.getAttribute("data-i18n");
        if (STR.en[k]) el.textContent = STR.en[k];
      });
      // Swap privacy link target for English store listing
      var priv = document.querySelector('[data-i18n="navPrivacy"]');
      if (priv && priv.getAttribute("data-i18n-href")) priv.href = priv.getAttribute("data-i18n-href");
      var priv2 = document.querySelector('[data-i18n="navPrivacy2"]');
      if (priv2 && priv2.getAttribute("data-i18n-href")) priv2.href = priv2.getAttribute("data-i18n-href");
      var del = document.querySelector('[data-i18n="navDeleteAccount"]');
      if (del && del.getAttribute("data-i18n-href")) del.href = del.getAttribute("data-i18n-href");
    } else {
      location.reload();
    }
  }
  if (btn) btn.addEventListener("click", function () {
    applyLang(currentLang === "he" ? "en" : "he");
  });
})();

/* Journey landing extras: reveal-on-scroll + gallery arrows */
(function () {
  "use strict";
  var els = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("in"); });
  }
  var g = document.getElementById("gallery");
  function step(dir) {
    if (!g) return;
    var rtl = getComputedStyle(g).direction === "rtl";
    g.scrollBy({ left: dir * (rtl ? -1 : 1) * 270, behavior: "smooth" });
  }
  var p = document.getElementById("galPrev"), n = document.getElementById("galNext");
  if (p) p.addEventListener("click", function () { step(-1); });
  if (n) n.addEventListener("click", function () { step(1); });
})();

/* Sectional progressional scrolling: one section per wheel / arrow key, with a progress rail.
   Tall sections keep normal scrolling inside them, then hand off to the next section. */
(function () {
  "use strict";

  var sections = Array.prototype.slice.call(document.querySelectorAll("main > section"));
  if (!sections.length) return;

  var header = document.querySelector(".site-header");
  var mqReduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
  var mqCoarse = window.matchMedia && window.matchMedia("(pointer: coarse)");

  var currentIndex = 0;
  var busyUntil = 0;
  var anim = null;
  var rail, track, fill, curEl, dots = [];

  function reduce() { return !!(mqReduce && mqReduce.matches); }
  function coarse() { return !!(mqCoarse && mqCoarse.matches); }
  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
  function headH() { return header ? header.offsetHeight : 0; }
  function rectTop(el) { return el.getBoundingClientRect().top + window.pageYOffset; }
  function sectionTop(i) { return Math.max(0, rectTop(sections[i]) - headH()); }
  function maxScroll() { return Math.max(0, document.documentElement.scrollHeight - window.innerHeight); }
  function viewH() { return Math.max(200, window.innerHeight - headH()); }

  function labelFor(sec) {
    var h = sec.querySelector("h1,h2,h3");
    return ((h && h.textContent) || "Section").replace(/\s+/g, " ").trim().slice(0, 44);
  }

  function buildRail() {
    rail = document.createElement("nav");
    rail.className = "pg-rail";
    rail.setAttribute("aria-label", "Section navigation");
    rail.innerHTML = '<div class="pg-count" aria-hidden="true"><span class="pg-cur">1</span><span>/</span><span class="pg-total">' + sections.length + '</span></div>' +
      '<div class="pg-track"><div class="pg-line"></div><div class="pg-fill"></div></div>';
    curEl = rail.querySelector(".pg-cur");
    track = rail.querySelector(".pg-track");
    fill = rail.querySelector(".pg-fill");

    sections.forEach(function (sec, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "pg-dot";
      b.setAttribute("data-label", labelFor(sec));
      b.setAttribute("aria-label", b.getAttribute("data-label"));
      b.addEventListener("click", function () { goTo(i); });
      track.appendChild(b);
      dots.push(b);
    });
    document.body.appendChild(rail);
  }

  function updateUI(i) {
    if (curEl) curEl.textContent = String(i + 1);
    dots.forEach(function (d, j) {
      var on = j === i;
      d.classList.toggle("active", on);
      if (on) d.setAttribute("aria-current", "true");
      else d.removeAttribute("aria-current");
    });
  }

  function dotCenter(i) {
    var d = dots[i];
    return d ? d.offsetTop + d.offsetHeight / 2 - 6 : 0;
  }

  // Smoothly move the rail's progress fill to the position matching a scroll offset.
  function setFillForY(y) {
    if (!fill || !dots.length) return;
    var tops = [], i;
    for (i = 0; i < sections.length; i++) tops.push(sectionTop(i));
    var frac = sections.length - 1;
    for (i = 0; i < sections.length - 1; i++) {
      if (y < tops[i + 1]) {
        var span = tops[i + 1] - tops[i];
        frac = span > 0 ? i + clamp((y - tops[i]) / span, 0, 1) : i;
        break;
      }
    }
    var a = Math.min(Math.floor(frac), dots.length - 1);
    var b = Math.min(a + 1, dots.length - 1);
    var h1 = dotCenter(a), h2 = dotCenter(b);
    fill.style.height = Math.max(0, h1 + (h2 - h1) * (frac - a)) + "px";
  }

  function syncHeader() {
    document.documentElement.style.setProperty("--pg-header", headH() + "px");
  }

  function syncIndex() {
    var y = window.pageYOffset + headH() + 12;
    var idx = 0;
    for (var i = 0; i < sections.length; i++) if (rectTop(sections[i]) <= y) idx = i;
    currentIndex = idx;
    updateUI(idx);
  }

  function cancelAnim() {
    if (!anim) return;
    clearTimeout(anim.timer);
    anim = null;
    document.documentElement.style.scrollBehavior = "";
  }

  // Custom eased scroll animation (browser "smooth" scroll is abrupt and ignores easing).
  function animateTo(target, duration) {
    target = clamp(target, 0, maxScroll());
    var start = window.pageYOffset;
    var dist = target - start;
    cancelAnim();

    if (Math.abs(dist) < 2) {
      window.scrollTo(0, target);
      setFillForY(target);
      busyUntil = performance.now() + 140;
      return;
    }

    var dur = duration || clamp(Math.abs(dist) * 0.6, 500, 900);
    // Keep a visible glide for everyone; just shorten it when reduced motion is requested.
    if (reduce()) dur = Math.min(dur, 320);
    var t0 = performance.now();
    var root = document.documentElement;
    root.style.scrollBehavior = "auto"; // override the CSS smooth scroll while animating
    var a = { timer: 0, expected: start };
    anim = a;
    busyUntil = t0 + dur + 80;

    function frame() {
      if (anim !== a) return;
      var now = performance.now();
      var p = Math.min(1, (now - t0) / dur);
      // easeInOutCubic: gentle start, quick middle, soft landing
      var e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      a.expected = start + dist * e;
      window.scrollTo(0, a.expected);
      setFillForY(a.expected);
      if (p < 1) {
        a.timer = setTimeout(frame, 16);
      } else {
        window.scrollTo(0, target);
        anim = null;
        root.style.scrollBehavior = "";
      }
    }
    a.timer = setTimeout(frame, 16);
  }

  function goTo(i) {
    i = clamp(i, 0, sections.length - 1);
    currentIndex = i;
    updateUI(i);
    animateTo(sectionTop(i));
  }

  function step(dir) {
    var now = performance.now();
    if (now < busyUntil) return;

    var i = clamp(currentIndex, 0, sections.length - 1);
    var sec = sections[i];
    var top = sectionTop(i);
    var vh = viewH();
    var maxY = (i === sections.length - 1)
      ? maxScroll()
      : Math.max(top, top + sec.offsetHeight - vh);
    var y = window.pageYOffset;

    if (dir > 0 && y < maxY - 8) {
      animateTo(Math.min(y + vh * 0.9, maxY), 520);
      return;
    }
    if (dir > 0 && i === sections.length - 1 && y >= maxY - 8) return;

    if (dir < 0 && y > top + 8) {
      animateTo(Math.max(y - vh * 0.9, top), 520);
      return;
    }
    goTo(i + dir);
  }

  function isTypingTarget(t) {
    if (!t) return false;
    if (t.isContentEditable) return true;
    var tag = t.tagName;
    return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tag === "VIDEO";
  }

  buildRail();
  syncHeader();
  syncIndex();
  setFillForY(window.pageYOffset);

  if (!coarse()) {
    window.addEventListener("wheel", function (e) {
      if (e.ctrlKey || e.metaKey) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.2) return;
      if (isTypingTarget(e.target)) return;
      e.preventDefault();
      if (performance.now() < busyUntil) return;
      step(e.deltaY > 0 ? 1 : -1);
    }, { passive: false });
  }

  document.addEventListener("keydown", function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    var t = e.target, k = e.key;
    if (isTypingTarget(t)) return;
    if (k === " " && t && (t.tagName === "BUTTON" || t.tagName === "A" || t.tagName === "SUMMARY")) return;
    if (k === "ArrowDown" || k === "PageDown" || k === " ") { e.preventDefault(); step(1); }
    else if (k === "ArrowUp" || k === "PageUp") { e.preventDefault(); step(-1); }
    else if (k === "Home") { e.preventDefault(); goTo(0); }
    else if (k === "End") { e.preventDefault(); goTo(sections.length - 1); }
  });

  // Touch scrolling should always win over an in-progress animation.
  document.addEventListener("touchstart", function () {
    if (anim) { cancelAnim(); busyUntil = 0; }
  }, { passive: true });

  var ticking = false;
  window.addEventListener("scroll", function () {
    setFillForY(window.pageYOffset);
    if (ticking) return;
    ticking = true;
    setTimeout(function () {
      ticking = false;
      if (performance.now() < busyUntil) return;
      syncIndex();
    }, 30);
  }, { passive: true });

  var resizeT;
  window.addEventListener("resize", function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(function () {
      syncHeader();
      updateUI(currentIndex);
      setFillForY(window.pageYOffset);
    }, 120);
  });

  // Keep anchor navigation and the language toggle in sync.
  Array.prototype.slice.call(document.querySelectorAll('a[href^="#"]')).forEach(function (a) {
    a.addEventListener("click", function () {
      var id = a.getAttribute("href").slice(1);
      if (!id) return;
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].id === id) { cancelAnim(); busyUntil = performance.now() + 560; currentIndex = i; updateUI(i); break; }
      }
    });
  });
  var langBtn = document.getElementById("langToggle");
  if (langBtn) langBtn.addEventListener("click", function () {
    sections.forEach(function (sec, i) {
      var l = labelFor(sec);
      dots[i].setAttribute("data-label", l);
      dots[i].setAttribute("aria-label", l);
    });
  });
})();
