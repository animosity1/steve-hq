# STEVE HQ

Operator desk for Steve Will Do It's world. Built for **@stevewilldoit** by **@optikz1**.

Motions × Gamdom phone-first ops desk: calendar, reminders, money-out ledger, roster, and #gamdom100k war room. Bottom tabs on mobile, bold left rail on desktop. All data lives in your browser (`localStorage`). No server. No deploy required.

## Open locally

```bash
cd /workspace/steve-hq
# any static server works; examples:
python3 -m http.server 8080
# then open http://localhost:8080
```

Or open `index.html` directly in a browser (file://). Prefer a local server if clipboard export is blocked by the browser.

## Modules

| Key | Tab | What it does |
|-----|-----|--------------|
| `1` | Home | Today strip (America/Chicago), #gamdom100k countdown, next reminders, weekly money out, Live / On call chips, quick adds |
| `2` | Calendar | Month view (defaults Sep 2026) + upcoming list. Types: Stream / Challenge / Travel / IRL / Other |
| `3` | Reminders | FIRE/NORMAL · OPEN/DONE · related tags. Export **#MotionSteveReminders** paste for Eddie |
| `4` | Cash (Ledger) | Money out with OPEN / SENT / CONFIRMED totals |
| `5` | Team (Roster) | Talent cards, search, Mark Live toggle |
| `6` | Gamdom | Code Steve panel, winner slots 1-10, promo checklist, plain-text refs |

## Seed context (Sep 2026)

Preloaded so Day 0 looks alive:

- `#gamdom100k` ends **Sep 25, 2026 11:59pm CT**
- Open loops: Rams box, Adukes books, Shane Stoffer, Duolingo, Abby hour, Corvette rules
- Ledger: 10x10k pool, ~40k challenge spend + Adukes $12.5k SENT, Corvette TBD, Code Steve giveaway note, video challenge winners
- Roster: Steve, King ADukes, Beekay, Willdoittv, @optikz1

Double-click the **SW** brand mark to reset local data back to this seed.

## Backup

- **Export** (top bar): download JSON snapshot
- **Import**: restore from a previous export

## Files

```
steve-hq/
  index.html
  styles.css
  app.js
  README.md
  CHANGELOG.md
```

## Brand notes

- Colors: dark slate `#0c1110`, neon green `#3dff6a` primary, restrained gold `#e8c547` for rare urgency
- Gamdom mark is **text only** (no logos)
- Footer: `built for @stevewilldoit by @optikz1 · Day 0 desk`
