# Shinena — Play Console Data Safety form

Copy the answers below into Play Console → App content → Data safety.

## App practices

### Data collection

**Personal info**
- Email address — Required. Account creation / login. Shared with service providers for authentication.
- Name — Optional. Profile display name.
- User ID — Required. Account identification. Processed internally.
- Phone number — Not collected.
- Audio — Required for recitation scoring. User-initiated speech input for Hebrew speech recognition, processed on-device when possible, transcript sent to server only for proprietary content scoring. Not sold. Retained for 30 days then deleted.

**Device or other IDs**
- Device ID — Required. Crash reporting / analytics. Not shared.
- Android advertising ID — Not collected.

**App activity**
- In-app actions — Required. Verse progress, XP, streaks, badges, leaderboard rankings, recitation logs with accuracy, duration, XP earned.
- Product interaction — Required. Which books/chapters are opened, time spent, review intervals.
- Audio — Required. See Audio above.

**Other**
- Country — Optional. Used for per-country leaderboard. User selectable.
- Account deletion request — Handled via `https://shinena.cia.org.il/delete-account.html`.

### Data sharing

- Shared with service providers: authentication provider only if Google Sign-In is used.
- Shared for advertising: No.
- Shared with third parties: No.

### Data security

- Data is encrypted in transit via TLS.
- Sensitive data is encrypted at rest in the backend SQLite/MySQL database.
- Users can request data deletion via the account deletion page.

### Data retention

- Account data retained until deletion request.
- Recitation logs and transcripts retained for 30 days for scoring audits, then purged.
- SM-2 progress retained while account exists.

## Special categories

The app does not collect sensitive personal data such as health, financial, precise location, or religious affiliation. The app is about Torah study content, which is public domain.

## Data safety summary for store listing

- **Data collected:** Email, name, user ID, country, device ID, in-app actions, product interaction, audio for recitation.
- **Data shared:** Only with authentication provider if Google Sign-In is used.
- **Security practices:** Encryption in transit, encryption at rest, user-accessible deletion.
- **No ads, no in-app purchases.**

## Permissions needed

- `android.permission.INTERNET` — fetch backend for accounts, sync, proprietary texts.
- `android.permission.RECORD_AUDIO` — recite aloud for scoring.
- No location, camera, contacts or SMS permissions.

## Account deletion

Privacy policy: `https://shinena.cia.org.il/privacy.html`
Account deletion page: `https://shinena.cia.org.il/delete-account.html`

Contact: `hello@shinena.app`
