# שיננא (Shinena) - landing page

Static site (no build step): `index.html`, `styles.css`, `app.js`, `config.js`. Deploy the folder as-is (Vercel / GitHub Pages; the existing `.github/workflows/static.yml` still works).

## What changed in this version
- **New look (Journey UX):** mint paper background, deep-green hero, gold call-to-action button, rounded cards, Heebo + Baloo 2 type, the real mascot art from the app.
- **New Hebrew-first marketing copy:** hero, 3-step "how it works", 6 features, 3 deep-dive sections with real screenshots (map, arena, reviews), screenshot carousel, library section, audience cards, 60-second video, FAQ (7 questions), download, donate, contact. Full English version behind the EN button (all strings in `app.js`).
- **Store assets used on the page:** new app screenshots (`assets/img/app-*.webp`), the promo video (`assets/video/shinena-promo.mp4`, 720p, loads only on play), mascot art. The full-size store files are in `graphics/` (icon_512x512.png, feature_graphic_1024x500.png, screenshots-mobile/, screenshots-desktop/).
- **SEO:** keyword-rich title and meta description, canonical, hreflang, Open Graph + Twitter card (`og-image.png`, 1200x630), JSON-LD (SoftwareApplication/MobileApplication named שיננא, WebSite, FAQPage, VideoObject), semantic HTML with one h1, alt text on every image, `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, favicon set from the new icon, `lang="he" dir="rtl"`.
- **Speed:** WebP images (about 20-45 KB each), lazy-loaded below the fold, hero image preloaded, video `preload="none"`, no JS framework.
- **Legal pages** (privacy, delete account, HE + EN) keep their text; they now use the new header, footer and styles, plus canonical and favicon.

## Things to check before going live
- `config.js` is unchanged: `PLAY_STORE_URL` and `APP_STORE_URL` are still `"#"` (buttons show "soon"). Put the real URLs there when the store pages exist.
- `DONATE_URL` is still `"#"`; `ANDROID_APK_URL` points to `/Shinena-beta.apk`, which is not in this folder.
- Canonical and sitemap URLs assume `https://shinena.vercel.app/`. Change them if the production domain differs.
- Stat numbers (63 tractates, 39 books of Tanakh, 14 themes) come from the app's own picker and theme list.
