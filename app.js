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
