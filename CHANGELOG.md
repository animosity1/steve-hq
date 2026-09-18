# CHANGELOG

## Visual + UX rebuild (2026-09-18)

Total restyle of STEVE HQ. Same modules and data logic. New look only.

### Direction
- Motions street grit + Gamdom red/black luxury + phone-first ops
- Not Notion. Not cyberpunk HUD. Not generic SaaS admin cards.

### Layout
- **Mobile:** sticky top strip (brand, clock, LIVE, export/import) + fixed bottom tab bar (Home / Cal / Remind / Cash / Team / Gamdom)
- **Desktop:** fixed left rail with bold Archivo Black wordmarks (HOME, CAL, REMIND, CASH, TEAM, GAMDOM), content full-bleed beside it
- Sheet-style modal on phone, centered dialog on desktop

### Visual system
- Fonts: Archivo Black (display) + Space Grotesk (UI) + JetBrains Mono (money/clock)
- Accents: Gamdom red `#e10600`, Motions yellow `#ffe566`, money green used sparingly
- Big page titles, less chrome, fewer hard borders, soft inset lines
- Status pills clipped like Twitch/Kick badges
- Ledger totals + table restyled as betting-slip / receipt energy
- Reminders and lists read more like iMessage bubbles (esp. on phone)
- Roster cards feel like talent cards with live stripe
- Countdown war-room block keeps red/yellow heat

### Files touched
- `styles.css` rewritten
- `index.html` shell adjusted for rail + bottom tabs (IDs / data hooks preserved)
- `app.js` tiny hook fixes: multi-brand seed reset, all `.clock` nodes update
- Modules unchanged: Home, Calendar, Reminders, Ledger, Roster, Gamdom, localStorage CRUD, `#MotionSteveReminders` export, JSON import/export, seed data

### Not in this pass
- No deploy
- No logic/feature changes beyond layout hooks above
