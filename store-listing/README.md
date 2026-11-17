# Shinena — Google Play listing

Everything the Play Console needs for the Shinena app (`com.oyacorp.shinena`).
Copy it field by field into the Play Console.

**App details (Play Console → Grow → Store presence → Main store listing)**

| Field | Value |
|---|---|
| App name (≤ 30 chars) | `Shinena` |
| App name (HE) | `שיננא` |
| Short description (≤ 80 chars) | `Memorize Mishna, Tanakh and Gemara like a game — recite, score, advance.` |
| Short description (HE) | `שיננו משנה, תנ״ך וגמרא כמו במשחק — מדקלמים, מקבלים ציון, מתקדמים.` |
| Default language | English (United States) |
| Category | Education |
| Tags | Learning, Books & Reference, Education (optional) |
| Contact email | see `config.js` in the homepage repo |
| Privacy policy URL | `https://shinena.cia.org.il/privacy.html` |
| Account deletion URL | `https://shinena.cia.org.il/delete-account.html` |

**Full description** — see `listing-en.md` and `listing-he.md`.

**Graphics**

| Asset | Required | File |
|---|---|---|
| App icon | 512 × 512 PNG, 32-bit | `graphics/icon_512x512.png` |
| Feature graphic | 1024 × 500 PNG/JPEG | `graphics/feature_graphic_1024x500.png` |
| Phone screenshots | 2–8, 320–3840 px, 16:9 or 9:16 | `graphics/screenshots-mobile/` (1080x2160) and `graphics/screenshots-desktop/` (1080x1920) |

**Target audience & content rating**

The app is a study tool for Torah learners of all ages. Declare the target
audience in the Play Console and complete the IARC questionnaire. The app
contains no ads, no in-app purchases and no chat/UGC, so the questionnaire
answers are straightforward: no violence, no sexuality, no profanity, no
controlled substances, no gambling, no user-generated content, no location
sharing beyond an optional country for the leaderboard.

**Release notes (≤ 500 chars)** — see `release-notes.md`.

**First-run download (important for the review)**

The APK does not contain the textbook texts — they are ~11 MB of compressed
public-domain religious texts that the app downloads **once, right after the
first launch**, and then stores on the device so everything works offline from
then on. A reviewer sees a progress screen ("Downloading the texts…") before
the app opens; no account, no login and no personal data are needed for it.

The download comes from the project's own GitHub release
(`github.com/sniffis-commits/shinena-texts`, release `v1`) and contains JSON
text files only — no executable code. If the download cannot reach the
server, the app still opens and falls back to the regular text servers.

---

## Checklists before you hit "Save and review"

- [ ] The AAB is signed with the upload key and `versionCode` is **higher** than
      every version already uploaded (`bundletool validate --bundle=…`).
- [ ] The Data Safety form matches `data-safety.md` exactly — a mismatch is
      the most common cause of a rejected release.
- [ ] The privacy policy URL is live and reachable **without** a login, from
      outside the office network.
- [ ] The account-deletion URL is live (Play requires it for any app with
      an account).
- [ ] The screenshots show the real app, not mock-ups.
- [ ] The app bundle contains no dev tools: `VITE_SHOW_DEV_TOOLS=false` on the
      build machine.
