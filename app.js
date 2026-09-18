/* STEVE HQ · Operator Desk
   Built for @stevewilldoit by @optikz1 */

(function () {
  "use strict";

  const STORAGE_KEY = "steve-hq-v6";
  const TZ = "America/Chicago";
  const CHALLENGE_END = new Date("2026-09-25T23:59:00-05:00");

  // ---------- helpers ----------
  const uid = () =>
    crypto.randomUUID
      ? crypto.randomUUID()
      : "id-" + Date.now() + "-" + Math.random().toString(36).slice(2, 9);

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function fmtMoney(n) {
    const num = Number(n) || 0;
    return (
      "$" +
      num.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    );
  }

  function todayISO() {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: TZ,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
  }

  function formatCTDate(d = new Date()) {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: TZ,
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(d);
  }

  function formatCTClock(d = new Date()) {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: TZ,
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZoneName: "short",
    }).format(d);
  }

  function parseLocalDate(iso) {
    if (!iso) return null;
    const [y, m, day] = iso.split("-").map(Number);
    return new Date(y, m - 1, day);
  }

  function startOfWeekCT(isoDate) {
    const d = parseLocalDate(isoDate || todayISO());
    const day = d.getDay();
    d.setDate(d.getDate() - day);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function endOfWeekCT(isoDate) {
    const s = startOfWeekCT(isoDate);
    const e = new Date(s);
    e.setDate(e.getDate() + 6);
    e.setHours(23, 59, 59, 999);
    return e;
  }

  function inThisWeek(iso) {
    if (!iso) return false;
    const d = parseLocalDate(iso);
    const s = startOfWeekCT();
    const e = endOfWeekCT();
    return d >= s && d <= e;
  }

  function toast(msg, type = "ok") {
    const el = $("#toast");
    el.textContent = msg;
    el.className = "toast " + type;
    el.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
      el.hidden = true;
    }, 2600);
  }

  // ---------- seed data (Sep 2026) ----------
  function seedData() {
    return {
      version: 6,
      events: [
        {
          id: uid(),
          title: "#gamdom100k challenge ends",
          date: "2026-09-25",
          time: "23:59",
          type: "Challenge",
          notes: "Winner payout window. Lock slots 1-10 before close.",
        },
        {
          id: uid(),
          title: "Rams box available window",
          date: "2026-09-20",
          time: "",
          type: "IRL",
          notes: "Confirm handoff + guest list. Keep Steve looped.",
        },
        {
          id: uid(),
          title: "Lions / Bills watch notes",
          date: "2026-09-21",
          time: "",
          type: "Stream",
          notes: "Capture any Motions / stream angles if Steve goes live around the game.",
        },
        {
          id: uid(),
          title: "Motion drop (placeholder)",
          date: "2026-09-28",
          time: "",
          type: "Other",
          notes: "Removable placeholder. Replace with real drop date when locked.",
        },
      ],
      reminders: [
        {
          id: uid(),
          text: "Rams box handoff: confirm seats + who owns the guest list",
          due: "2026-09-19",
          priority: "FIRE",
          status: "OPEN",
          related: "Steve",
        },
        {
          id: uid(),
          text: "#gamdom100k push: daily Code Steve hits + winner slot hygiene",
          due: "2026-09-25",
          priority: "FIRE",
          status: "OPEN",
          related: "Gamdom",
        },
        {
          id: uid(),
          text: "Adukes books sync: pull latest numbers into ledger",
          due: "2026-09-18",
          priority: "FIRE",
          status: "OPEN",
          related: "Adukes",
        },
        {
          id: uid(),
          text: "Shane Stoffer stocks check: status ping only",
          due: "2026-09-20",
          priority: "NORMAL",
          status: "OPEN",
          related: "Personal",
        },
        {
          id: uid(),
          text: "Duolingo streak check (Steve)",
          due: "2026-09-18",
          priority: "NORMAL",
          status: "OPEN",
          related: "Steve",
        },
        {
          id: uid(),
          text: "Abby hour: protect the block on calendar",
          due: "2026-09-19",
          priority: "NORMAL",
          status: "OPEN",
          related: "Personal",
        },
        {
          id: uid(),
          text: "Corvette raffle rules lock (eligibility + draw date)",
          due: "2026-09-22",
          priority: "FIRE",
          status: "OPEN",
          related: "Gamdom",
        },
      ],
      ledger: [
        {
          id: uid(),
          date: "2026-09-17",
          who: "Video challenge $10k - Bente_pro / BENTEGER",
          amount: 10000,
          category: "Challenge",
          status: "CONFIRMED",
          notes: "Steve post: YOU WIN 10k. Source https://x.com/stevewilldoit/status/2100738032164876649",
          owner: "Steve",
        },
        {
          id: uid(),
          date: "2026-09-17",
          who: "Video challenge $10k - NingYizhuo_GMIT",
          amount: 10000,
          category: "Challenge",
          status: "CONFIRMED",
          notes: "Steve post: get 10k. Source https://x.com/stevewilldoit/status/2100736446873120790",
          owner: "Steve",
        },
        {
          id: uid(),
          date: "2026-09-17",
          who: "Video challenge $10k - HY100P / DRAGON",
          amount: 10000,
          category: "Challenge",
          status: "CONFIRMED",
          notes: "Steve post: You get $10,000. Source https://x.com/stevewilldoit/status/2100735647489130830",
          owner: "Steve",
        },
        {
          id: uid(),
          date: "2026-09-17",
          who: "Chiefs win giveaway $12.5k (via Adukes)",
          amount: 12500,
          category: "Giveaway",
          status: "SENT",
          notes: "Steve: pick the winner for $12,500 for chiefs win (@kingadukes). Source posts: chiefs / gamdom #2. Adukes handled payout.",
          owner: "Adukes",
        },
        {
          id: uid(),
          date: "2026-09-17",
          who: "@thefirstdanny - Steve $5,000",
          amount: 5000,
          category: "Giveaway",
          status: "SENT",
          notes: "User-confirmed: Steve sent $5,000 to @thefirstdanny this week.",
          owner: "Steve",
        },
        {
          id: uid(),
          date: "2026-09-17",
          who: "@0xwale - Steve $500",
          amount: 500,
          category: "Giveaway",
          status: "SENT",
          notes: "User-confirmed: Steve sent $500 to @0xwale. Kick exists but not on streamer roster.",
          owner: "Steve",
        },


        {
          id: uid(),
          date: "2026-09-17",
          who: "Other Steve video challenge winners (this week)",
          amount: 10000,
          category: "Challenge",
          status: "SENT",
          notes: "Steve said ~$40k already out on his video challenge picks. 3 named $10k = $30k. This $10k = remainder until Adukes confirms remaining names. Separate from Adukes $12.5k row.",
          owner: "Adukes",
        },
        {
          id: uid(),
          date: "2026-09-18",
          who: "Adukes owes chat $500 (tweet)",
          amount: 500,
          category: "Giveaway",
          status: "OPEN",
          notes: "Adukes: owe $500 from a tweet / comment gamdom names. Not paid yet.",
          owner: "Adukes",
        },
        {
          id: uid(),
          date: "2026-09-18",
          who: "#gamdom100k remaining pool (ends Sep 25)",
          amount: 100000,
          category: "Challenge",
          status: "OPEN",
          notes: "Ten $10k slots still open for the new challenge. Not sent yet. Do not count in money-out-this-week.",
          owner: "Steve",
        },
        {
          id: uid(),
          date: "2026-09-18",
          who: "Corvette raffle (TBD)",
          amount: 0,
          category: "Giveaway",
          status: "OPEN",
          notes: "Rules not locked. No cash out yet.",
          owner: "Steve",
        },
      ],
      roster: [
        {
          id: uid(),
          name: "Steve Will Do It",
          handle: "@stevewilldoit",
          kick: "https://kick.com/stevewilldoit",
          role: "Principal",
          status: "Active",
          gamdomCode: "STEVE",
          lastTouch: "2026-09-18",
          notes: "Principal. Kick flagship. Everything routes through Steve.",
        },
        {
          id: uid(),
          name: "King ADukes",
          handle: "@kingadukes",
          kick: "https://kick.com/adukes",
          role: "Ops",
          status: "Active",
          gamdomCode: "",
          lastTouch: "2026-09-18",
          notes: "Ops / Partner. Creative controls w/ Wolf. Books + giveaways. Kick streams.",
        },
        {
          id: uid(),
          name: "Trillz",
          handle: "@Trillz",
          kick: "https://kick.com/trilla",
          role: "Streamer",
          status: "Active",
          gamdomCode: "STEVE",
          lastTouch: "2026-09-18",
          notes: "Steve Kick team. Channel title Trilla, X @Trillz. User-confirmed.",
        },
        {
          id: uid(),
          name: "Willdoittv",
          handle: "@willdoittv",
          kick: "https://kick.com/goldencloverx",
          role: "Streamer",
          status: "Active",
          gamdomCode: "STEVE",
          lastTouch: "2026-09-16",
          notes: "Steve Kick team. Adukes: @Willdoittv IS LIVE kick.com/goldencloverx.",
        },
        {
          id: uid(),
          name: "Itsrosebro",
          handle: "@itsrosebro",
          kick: "https://kick.com/itsrosebro",
          role: "Streamer",
          status: "Active",
          gamdomCode: "STEVE",
          lastTouch: "2026-09-18",
          notes: "Steve Kick team. User-confirmed.",
        },
        {
          id: uid(),
          name: "XXTHEREV",
          handle: "@XXTHEREV",
          kick: "https://kick.com/xxrev",
          role: "Streamer",
          status: "Active",
          gamdomCode: "STEVE",
          lastTouch: "2026-09-18",
          notes: "Steve Kick team / leader of the streamers (Steve post). Kick slug XXREV.",
        },
        {
          id: uid(),
          name: "Wolf",
          handle: "@itswolflive",
          kick: "https://kick.com/itswolflive",
          role: "Streamer",
          status: "Active",
          gamdomCode: "STEVE",
          lastTouch: "2026-09-18",
          notes: "Steve Kick team / creator lead. Steve offered head of creators + $25k/week trial. Wolf: wont let you or the team down.",
        },
        {
          id: uid(),
          name: "Beekay",
          handle: "@gamdom_beekay",
          kick: "",
          role: "Partner",
          status: "Active",
          gamdomCode: "Gamdom",
          lastTouch: "2026-09-15",
          notes: "Gamdom partner / tag. NOT a Steve Kick streamer.",
        },
        {
          id: uid(),
          name: "optikz1",
          handle: "@optikz1",
          kick: "",
          role: "PA",
          status: "Active",
          gamdomCode: "",
          lastTouch: "2026-09-18",
          notes: "Assistant. Day 0 desk owner. Not a Kick streamer.",
        },
      ],
      gamdom: {
        push:
          "Biggest Code Steve push of the week: #gamdom100k endgame. Drive deposit + play volume with clean CTAs into Sep 25 close.",
        rg: "18+ only. Play responsibly. Gambling involves risk. Never chase losses. Set limits and stick to them.",
        status:
          "Code Steve is the flagship promo. Challenge war room live. Winner slots open for locking. Keep Motions and stream reads aligned.",
        winners: Array.from({ length: 10 }, () => ""),
        checklist: [
          { id: uid(), text: "Pin #gamdom100k end date on streams", done: false },
          { id: uid(), text: "Confirm Code Steve CTA copy (no overclaims)", done: true },
          { id: uid(), text: "Responsible gambling line in every major push", done: true },
          { id: uid(), text: "Lock winner slots 1-10 before Sep 25 11:59pm CT", done: false },
          { id: uid(), text: "Payout path synced with Adukes", done: false },
          { id: uid(), text: "Post-challenge recap plan", done: false },
        ],
      },
    };
  }

  // ---------- state ----------
  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.version === 6) return parsed;
      }
    } catch (_) {}
    const s = seedData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return s;
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function resetToSeed() {
    state = seedData();
    save();
    renderAll();
    toast("Reset to Day 0 seed");
  }

  // ---------- navigation ----------
  function switchTab(name) {
    $$(".tab").forEach((t) => {
      const on = t.dataset.tab === name;
      t.classList.toggle("active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    $$(".panel").forEach((p) => {
      const on = p.id === "panel-" + name;
      p.classList.toggle("active", on);
      p.hidden = !on;
    });
    if (name === "home") renderHome();
    if (name === "calendar") renderCalendar();
    if (name === "reminders") renderReminders();
    if (name === "ledger") renderLedger();
    if (name === "roster") renderRoster();
    if (name === "gamdom") renderGamdom();
  }

  // ---------- countdown ----------
  function updateCountdown() {
    const now = new Date();
    let diff = CHALLENGE_END - now;
    const ended = diff <= 0;
    if (ended) diff = 0;

    const totalSec = Math.floor(diff / 1000);
    const d = Math.floor(totalSec / 86400);
    const h = Math.floor((totalSec % 86400) / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;

    const pad = (n) => String(n).padStart(2, "0");

    const set = (id, val) => {
      const el = $(id);
      if (el) el.textContent = val;
    };

    set("#cd-d", pad(d));
    set("#cd-h", pad(h));
    set("#cd-m", pad(m));
    set("#cd-s", pad(s));
    set("#cd2-d", pad(d));
    set("#cd2-h", pad(h));
    set("#cd2-m", pad(m));
    set("#cd2-s", pad(s));

    const status = $("#countdown-status");
    if (status) {
      status.textContent = ended
        ? "Challenge window closed. Move to payout mode."
        : d === 0
          ? "Final day. Lock winners and CTAs."
          : d <= 3
            ? "Inside final 72 hours. Push hard."
            : "War room active.";
    }
  }

  function tickClock() {
    const t = formatCTClock();
    $$(".clock").forEach((el) => {
      el.textContent = t;
    });
    updateCountdown();
  }

  // ---------- HOME ----------
  function renderHome() {
    $("#today-strip").textContent =
      formatCTDate() + " · America/Chicago · Day 0 desk live";

    const open = state.reminders
      .filter((r) => r.status === "OPEN")
      .sort((a, b) => {
        if (a.priority === "FIRE" && b.priority !== "FIRE") return -1;
        if (b.priority === "FIRE" && a.priority !== "FIRE") return 1;
        return (a.due || "").localeCompare(b.due || "");
      })
      .slice(0, 5);

    const ul = $("#home-reminders");
    if (!open.length) {
      ul.innerHTML =
        '<li class="list-item"><div><div class="title">All clear</div><div class="meta">No open reminders due. Nice.</div></div></li>';
    } else {
      ul.innerHTML = open
        .map(
          (r) => `
        <li class="list-item">
          <div>
            <div class="title">${esc(r.text)}</div>
            <div class="meta">Due ${esc(r.due || "-")} · ${esc(r.related)}</div>
          </div>
          <span class="badge ${r.priority === "FIRE" ? "badge-fire" : "badge-normal"}">${r.priority}</span>
        </li>`
        )
        .join("");
    }

    // Money out this week = already sent (SENT + CONFIRMED only). OPEN promises stay out of the total.
    const weekSent = state.ledger.filter(
      (row) => inThisWeek(row.date) && (row.status === "SENT" || row.status === "CONFIRMED") && Number(row.amount) > 0
    );
    const weekSum = weekSent.reduce((s, r) => s + (Number(r.amount) || 0), 0);
    $("#home-money-week").textContent = fmtMoney(weekSum);
    $("#home-money-detail").textContent =
      weekSent.length +
      " payout(s) this week · SENT + CONFIRMED only (serious books)";

    const liveOrCall = state.roster.filter(
      (p) => p.status === "Live" || p.status === "Active"
    );
    const chips = $("#home-streamers");
    if (!liveOrCall.length) {
      chips.innerHTML =
        '<span class="muted small">No one marked Live / Active yet.</span>';
    } else {
      chips.innerHTML = liveOrCall
        .map((p) => {
          const cls =
            p.status === "Live" ? "live" : p.status === "Active" ? "oncall" : "";
          const label = p.status === "Live" ? "Live" : "On call";
          return `<div class="streamer-chip ${cls}"><span class="dot"></span>${esc(
            p.name
          )} · ${label}</div>`;
        })
        .join("");
    }
  }

  // ---------- CALENDAR ----------
  let calYear = 2026;
  let calMonth = 8; // Sep 0-index

  function renderCalendar() {
    const label = new Date(calYear, calMonth, 1).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
    $("#cal-month-label").textContent = label;

    const first = new Date(calYear, calMonth, 1);
    const startPad = first.getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const today = todayISO();

    const eventsByDate = {};
    state.events.forEach((e) => {
      if (!eventsByDate[e.date]) eventsByDate[e.date] = [];
      eventsByDate[e.date].push(e);
    });

    const grid = $("#cal-grid");
    grid.innerHTML = "";

    const prevDays = new Date(calYear, calMonth, 0).getDate();
    for (let i = startPad - 1; i >= 0; i--) {
      const cell = document.createElement("div");
      cell.className = "cal-day other";
      cell.innerHTML = `<div class="num">${prevDays - i}</div>`;
      grid.appendChild(cell);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const iso = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const cell = document.createElement("div");
      cell.className = "cal-day" + (iso === today ? " today" : "");
      const evs = eventsByDate[iso] || [];
      cell.innerHTML =
        `<div class="num">${d}</div>` +
        evs
          .slice(0, 2)
          .map((e) => `<span class="cal-dot" title="${esc(e.title)}">${esc(e.title)}</span>`)
          .join("") +
        (evs.length > 2
          ? `<span class="cal-dot">+${evs.length - 2}</span>`
          : "");
      cell.addEventListener("click", () => {
        if (evs.length === 1) openEventModal(evs[0].id);
        else if (evs.length === 0) openEventModal(null, iso);
      });
      grid.appendChild(cell);
    }

    const totalCells = startPad + daysInMonth;
    const rem = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 1; i <= rem; i++) {
      const cell = document.createElement("div");
      cell.className = "cal-day other";
      cell.innerHTML = `<div class="num">${i}</div>`;
      grid.appendChild(cell);
    }

    const upcoming = [...state.events]
      .filter((e) => e.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date) || (a.time || "").localeCompare(b.time || ""));

    $("#cal-upcoming-count").textContent = upcoming.length + " upcoming";
    const list = $("#cal-upcoming");
    if (!upcoming.length) {
      list.innerHTML =
        '<li class="list-item"><div><div class="title">Nothing upcoming</div><div class="meta">Add an event to fill the month.</div></div></li>';
    } else {
      list.innerHTML = upcoming
        .map(
          (e) => `
        <li class="list-item">
          <div style="flex:1;min-width:0">
            <div class="title">${esc(e.title)}</div>
            <div class="meta">${esc(e.date)}${e.time ? " · " + esc(e.time) : ""} · ${esc(e.type)}</div>
          </div>
          <span class="badge badge-type">${esc(e.type)}</span>
          <div class="actions">
            <button type="button" class="btn btn-ghost btn-sm" data-edit-event="${e.id}">Edit</button>
            <button type="button" class="btn btn-danger-ghost" data-del-event="${e.id}">Del</button>
          </div>
        </li>`
        )
        .join("");
    }
  }

  // ---------- REMINDERS ----------
  let reminderFilter = "OPEN";

  function renderReminders() {
    let rows = [...state.reminders];
    if (reminderFilter === "OPEN") rows = rows.filter((r) => r.status === "OPEN");
    else if (reminderFilter === "DONE") rows = rows.filter((r) => r.status === "DONE");
    else if (reminderFilter === "FIRE")
      rows = rows.filter((r) => r.priority === "FIRE" && r.status === "OPEN");

    rows.sort((a, b) => {
      if (a.priority === "FIRE" && b.priority !== "FIRE") return -1;
      if (b.priority === "FIRE" && a.priority !== "FIRE") return 1;
      return (a.due || "").localeCompare(b.due || "");
    });

    const tbody = $("#reminders-table tbody");
    const empty = $("#reminders-empty");
    if (!rows.length) {
      tbody.innerHTML = "";
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    tbody.innerHTML = rows
      .map(
        (r) => `
      <tr>
        <td><span class="badge ${r.priority === "FIRE" ? "badge-fire" : "badge-normal"}">${r.priority}</span></td>
        <td>${esc(r.text)}</td>
        <td>${esc(r.due || "-")}</td>
        <td>${esc(r.related)}</td>
        <td><span class="badge ${r.status === "DONE" ? "badge-done" : "badge-open"}">${r.status}</span></td>
        <td class="actions">
          <button type="button" class="btn btn-ghost btn-sm" data-toggle-reminder="${r.id}">${r.status === "OPEN" ? "Done" : "Reopen"}</button>
          <button type="button" class="btn btn-ghost btn-sm" data-edit-reminder="${r.id}">Edit</button>
          <button type="button" class="btn btn-danger-ghost" data-del-reminder="${r.id}">Del</button>
        </td>
      </tr>`
      )
      .join("");
  }

  function exportMotionReminders() {
    const open = state.reminders
      .filter((r) => r.status === "OPEN")
      .sort((a, b) => {
        if (a.priority === "FIRE" && b.priority !== "FIRE") return -1;
        if (b.priority === "FIRE" && a.priority !== "FIRE") return 1;
        return (a.due || "").localeCompare(b.due || "");
      });

    const lines = [];
    lines.push("#MotionSteveReminders");
    lines.push("");
    lines.push("Operator: @optikz1");
    lines.push("Date: " + formatCTDate());
    lines.push("");

    const fire = open.filter((r) => r.priority === "FIRE");
    const normal = open.filter((r) => r.priority === "NORMAL");

    if (fire.length) {
      lines.push("FIRE");
      fire.forEach((r, i) => {
        lines.push(`${i + 1}. ${r.text} (due ${r.due || "TBD"} · ${r.related})`);
      });
      lines.push("");
    }

    if (normal.length) {
      lines.push("NORMAL");
      normal.forEach((r, i) => {
        lines.push(`${i + 1}. ${r.text} (due ${r.due || "TBD"} · ${r.related})`);
      });
      lines.push("");
    }

    if (!open.length) {
      lines.push("No open items. Board is clean.");
      lines.push("");
    }

    lines.push("Stay locked. Protect the principal. Win the day.");
    lines.push("");
    lines.push("#MotionSteveReminders");

    const text = lines.join("\n");
    navigator.clipboard
      .writeText(text)
      .then(() => toast("Copied #MotionSteveReminders"))
      .catch(() => {
        // fallback
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          toast("Copied #MotionSteveReminders");
        } catch (_) {
          toast("Copy failed. Select and copy manually.", "err");
          prompt("Copy this:", text);
        }
        ta.remove();
      });
  }

  // ---------- LEDGER ----------
  function renderLedger() {
    const totals = { OPEN: 0, SENT: 0, CONFIRMED: 0 };
    state.ledger.forEach((r) => {
      if (totals[r.status] !== undefined) totals[r.status] += Number(r.amount) || 0;
    });

    $("#ledger-totals").innerHTML = `
      <div class="total-card open"><div class="label">Open total</div><div class="value">${fmtMoney(totals.OPEN)}</div></div>
      <div class="total-card sent"><div class="label">Sent total</div><div class="value">${fmtMoney(totals.SENT)}</div></div>
      <div class="total-card confirmed"><div class="label">Confirmed total</div><div class="value">${fmtMoney(totals.CONFIRMED)}</div></div>
    `;

    const rows = [...state.ledger].sort((a, b) =>
      (b.date || "").localeCompare(a.date || "")
    );
    const tbody = $("#ledger-table tbody");
    const empty = $("#ledger-empty");

    if (!rows.length) {
      tbody.innerHTML = "";
      empty.hidden = false;
      return;
    }
    empty.hidden = true;

    const statusBadge = (s) => {
      if (s === "OPEN") return "badge-open";
      if (s === "SENT") return "badge-sent";
      return "badge-confirmed";
    };

    tbody.innerHTML = rows
      .map(
        (r) => `
      <tr>
        <td>${esc(r.date)}</td>
        <td>${esc(r.who)}</td>
        <td class="amount">${fmtMoney(r.amount)}</td>
        <td>${esc(r.category)}</td>
        <td><span class="badge ${statusBadge(r.status)}">${esc(r.status)}</span></td>
        <td>${esc(r.owner)}</td>
        <td>${esc(r.notes || "")}</td>
        <td class="actions">
          <button type="button" class="btn btn-ghost btn-sm" data-edit-ledger="${r.id}">Edit</button>
          <button type="button" class="btn btn-danger-ghost" data-del-ledger="${r.id}">Del</button>
        </td>
      </tr>`
      )
      .join("");
  }

  // ---------- ROSTER ----------
  let rosterQuery = "";

  function renderRoster() {
    const q = rosterQuery.trim().toLowerCase();
    let people = [...state.roster];
    if (q) {
      people = people.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(q) ||
          (p.handle || "").toLowerCase().includes(q)
      );
    }

    const grid = $("#roster-grid");
    const empty = $("#roster-empty");

    if (!people.length) {
      grid.innerHTML = "";
      empty.hidden = false;
      return;
    }
    empty.hidden = true;

    const statusBadge = (s) => {
      if (s === "Live") return "badge-live";
      if (s === "Away") return "badge-away";
      return "badge-active";
    };

    grid.innerHTML = people
      .map(
        (p) => `
      <article class="roster-card ${p.status === "Live" ? "live-border" : ""}">
        <div class="roster-top">
          <div>
            <div class="roster-name">${esc(p.name)}</div>
            <div class="roster-handle">${esc(p.handle || "no handle")}</div>
          </div>
          <span class="badge ${statusBadge(p.status)}">${esc(p.status)}</span>
        </div>
        <div class="roster-meta">
          <span class="badge badge-type">${esc(p.role)}</span>
          ${p.gamdomCode ? `<span class="badge badge-normal">${esc(p.gamdomCode)}</span>` : ""}
          ${p.kick ? `<a class="kick-link" href="${esc(p.kick)}" target="_blank" rel="noopener">Kick ↗</a>` : `<span class="muted small">No Kick</span>`}
        </div>
        <div class="roster-notes">${esc(p.notes || "No notes yet.")}</div>
        <div class="roster-foot">
          <span class="muted small">Last touch ${esc(p.lastTouch || "-")}</span>
          <div class="actions">
            <button type="button" class="toggle-live ${p.status === "Live" ? "on" : ""}" data-live="${p.id}">
              ${p.status === "Live" ? "Live ●" : "Mark Live"}
            </button>
            <button type="button" class="btn btn-ghost btn-sm" data-edit-roster="${p.id}">Edit</button>
            <button type="button" class="btn btn-danger-ghost" data-del-roster="${p.id}">Del</button>
          </div>
        </div>
      </article>`
      )
      .join("");
  }

  // ---------- GAMDOM ----------
  function renderGamdom() {
    const g = state.gamdom;
    $("#gamdom-push").value = g.push || "";
    $("#gamdom-rg").value = g.rg || "";
    $("#gamdom-status").value = g.status || "";

    const slots = $("#winner-slots");
    slots.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      const wrap = document.createElement("div");
      wrap.className = "winner-slot";
      wrap.innerHTML = `
        <span class="slot-num">#${i + 1}</span>
        <input type="text" data-winner="${i}" placeholder="Winner name / handle" value="${escAttr(g.winners[i] || "")}" />
      `;
      slots.appendChild(wrap);
    }

    const cl = $("#promo-checklist");
    cl.innerHTML = (g.checklist || [])
      .map(
        (c) => `
      <li class="${c.done ? "done" : ""}">
        <input type="checkbox" data-check="${c.id}" ${c.done ? "checked" : ""} />
        <span class="check-label">${esc(c.text)}</span>
        <button type="button" class="btn btn-danger-ghost" data-del-check="${c.id}">Del</button>
      </li>`
      )
      .join("");
  }

  // ---------- MODAL ----------
  let modalMode = null;
  let modalId = null;

  function openModal(title, fieldsHtml) {
    $("#modal-title").textContent = title;
    $("#modal-form").innerHTML = fieldsHtml;
    $("#modal").hidden = false;
    const first = $("#modal-form input, #modal-form select, #modal-form textarea");
    if (first) setTimeout(() => first.focus(), 50);
  }

  function closeModal() {
    $("#modal").hidden = true;
    modalMode = null;
    modalId = null;
    $("#modal-form").innerHTML = "";
  }

  function field(label, name, type, value, opts) {
    if (type === "select") {
      const options = (opts || [])
        .map(
          (o) =>
            `<option value="${escAttr(o)}" ${o === value ? "selected" : ""}>${esc(o)}</option>`
        )
        .join("");
      return `<label class="field"><span>${label}</span><select name="${name}">${options}</select></label>`;
    }
    if (type === "textarea") {
      return `<label class="field"><span>${label}</span><textarea name="${name}" rows="3">${esc(value || "")}</textarea></label>`;
    }
    return `<label class="field"><span>${label}</span><input type="${type}" name="${name}" value="${escAttr(value || "")}" ${type === "number" ? 'step="1" min="0"' : ""} /></label>`;
  }

  function openReminderModal(id) {
    modalMode = "reminder";
    modalId = id;
    const r = id ? state.reminders.find((x) => x.id === id) : null;
    openModal(r ? "Edit reminder" : "New reminder", [
      field("Text", "text", "text", r?.text || ""),
      field("Due date", "due", "date", r?.due || todayISO()),
      field("Priority", "priority", "select", r?.priority || "NORMAL", ["FIRE", "NORMAL"]),
      field("Status", "status", "select", r?.status || "OPEN", ["OPEN", "DONE"]),
      field("Related to", "related", "select", r?.related || "Steve", [
        "Steve",
        "Adukes",
        "Gamdom",
        "Motion",
        "Personal",
      ]),
    ].join(""));
  }

  function openLedgerModal(id) {
    modalMode = "ledger";
    modalId = id;
    const r = id ? state.ledger.find((x) => x.id === id) : null;
    openModal(r ? "Edit ledger row" : "New ledger row", [
      field("Date", "date", "date", r?.date || todayISO()),
      field("Who / What", "who", "text", r?.who || ""),
      field("Amount", "amount", "number", r?.amount ?? ""),
      field("Category", "category", "select", r?.category || "Other", [
        "Challenge",
        "Giveaway",
        "Personal",
        "Gamdom",
        "Other",
      ]),
      field("Status", "status", "select", r?.status || "OPEN", [
        "OPEN",
        "SENT",
        "CONFIRMED",
      ]),
      field("Owner", "owner", "select", r?.owner || "optikz", [
        "Steve",
        "Adukes",
        "optikz",
      ]),
      field("Notes", "notes", "textarea", r?.notes || ""),
    ].join(""));
  }

  function openEventModal(id, presetDate) {
    modalMode = "event";
    modalId = id;
    const r = id ? state.events.find((x) => x.id === id) : null;
    openModal(r ? "Edit event" : "New event", [
      field("Title", "title", "text", r?.title || ""),
      field("Date", "date", "date", r?.date || presetDate || todayISO()),
      field("Time (optional)", "time", "time", r?.time || ""),
      field("Type", "type", "select", r?.type || "Other", [
        "Stream",
        "Challenge",
        "Travel",
        "IRL",
        "Other",
      ]),
      field("Notes", "notes", "textarea", r?.notes || ""),
    ].join(""));
  }

  function openRosterModal(id) {
    modalMode = "roster";
    modalId = id;
    const r = id ? state.roster.find((x) => x.id === id) : null;
    openModal(r ? "Edit person" : "Add person", [
      field("Name", "name", "text", r?.name || ""),
      field("X handle", "handle", "text", r?.handle || ""),
      field("Kick URL", "kick", "text", r?.kick || ""),
      field("Role", "role", "select", r?.role || "Streamer", [
        "Principal",
        "PA",
        "Streamer",
        "Ops",
        "Partner",
        "Creator",
      ]),
      field("Status", "status", "select", r?.status || "Active", [
        "Active",
        "Live",
        "Away",
      ]),
      field("Gamdom code notes", "gamdomCode", "text", r?.gamdomCode || ""),
      field("Last touch", "lastTouch", "date", r?.lastTouch || todayISO()),
      field("Notes", "notes", "textarea", r?.notes || ""),
    ].join(""));
  }

  function formData() {
    const fd = new FormData($("#modal-form"));
    const obj = {};
    for (const [k, v] of fd.entries()) obj[k] = typeof v === "string" ? v.trim() : v;
    return obj;
  }

  function onModalSubmit(e) {
    e.preventDefault();
    const data = formData();

    if (modalMode === "reminder") {
      if (!data.text) return toast("Reminder text required", "err");
      if (modalId) {
        const r = state.reminders.find((x) => x.id === modalId);
        Object.assign(r, data);
      } else {
        state.reminders.push({ id: uid(), ...data });
      }
      save();
      closeModal();
      renderReminders();
      renderHome();
      toast("Reminder saved");
    }

    if (modalMode === "ledger") {
      if (!data.who) return toast("Who / What required", "err");
      data.amount = Number(data.amount) || 0;
      if (modalId) {
        const r = state.ledger.find((x) => x.id === modalId);
        Object.assign(r, data);
      } else {
        state.ledger.push({ id: uid(), ...data });
      }
      save();
      closeModal();
      renderLedger();
      renderHome();
      toast("Ledger row saved");
    }

    if (modalMode === "event") {
      if (!data.title || !data.date) return toast("Title and date required", "err");
      if (modalId) {
        const r = state.events.find((x) => x.id === modalId);
        Object.assign(r, data);
      } else {
        state.events.push({ id: uid(), ...data });
      }
      save();
      closeModal();
      renderCalendar();
      toast("Event saved");
    }

    if (modalMode === "roster") {
      if (!data.name) return toast("Name required", "err");
      if (modalId) {
        const r = state.roster.find((x) => x.id === modalId);
        Object.assign(r, data);
      } else {
        state.roster.push({ id: uid(), ...data });
      }
      save();
      closeModal();
      renderRoster();
      renderHome();
      toast("Roster updated");
    }
  }

  // ---------- escape ----------
  function esc(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escAttr(s) {
    return esc(s).replace(/'/g, "&#39;");
  }

  // ---------- export / import ----------
  function exportJSON() {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "steve-hq-backup-" + todayISO() + ".json";
    a.click();
    URL.revokeObjectURL(a.href);
    toast("JSON exported");
  }

  function importJSON(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!parsed || typeof parsed !== "object") throw new Error("bad");
        if (!parsed.events || !parsed.reminders || !parsed.ledger || !parsed.roster) {
          throw new Error("missing keys");
        }
        parsed.version = 1;
        if (!parsed.gamdom) parsed.gamdom = seedData().gamdom;
        state = parsed;
        save();
        renderAll();
        toast("Backup imported");
      } catch (_) {
        toast("Invalid backup file", "err");
      }
    };
    reader.readAsText(file);
  }

  function renderAll() {
    const active = $(".tab.active");
    switchTab(active ? active.dataset.tab : "home");
    tickClock();
  }

  // ---------- events ----------
  function bind() {
    $$(".tab").forEach((t) =>
      t.addEventListener("click", () => switchTab(t.dataset.tab))
    );

    document.addEventListener("keydown", (e) => {
      if (e.target.matches("input, textarea, select")) return;
      const map = { "1": "home", "2": "calendar", "3": "reminders", "4": "ledger", "5": "roster", "6": "gamdom" };
      if (map[e.key]) switchTab(map[e.key]);
      if (e.key === "Escape") closeModal();
    });

    $$("[data-goto]").forEach((a) =>
      a.addEventListener("click", (e) => {
        e.preventDefault();
        switchTab(a.dataset.goto);
      })
    );

    $$("[data-qa]").forEach((b) =>
      b.addEventListener("click", () => {
        const q = b.dataset.qa;
        if (q === "reminder") {
          switchTab("reminders");
          openReminderModal(null);
        } else if (q === "ledger") {
          switchTab("ledger");
          openLedgerModal(null);
        } else if (q === "event") {
          switchTab("calendar");
          openEventModal(null);
        }
      })
    );

    $("#btn-add-reminder").addEventListener("click", () => openReminderModal(null));
    $("#btn-add-ledger").addEventListener("click", () => openLedgerModal(null));
    $("#btn-add-event").addEventListener("click", () => openEventModal(null));
    $("#btn-add-roster").addEventListener("click", () => openRosterModal(null));
    $("#btn-export-motion").addEventListener("click", exportMotionReminders);

    $("#btn-export-json").addEventListener("click", exportJSON);
    $("#btn-import-json").addEventListener("click", () => $("#import-file").click());
    $("#import-file").addEventListener("change", (e) => {
      const f = e.target.files?.[0];
      if (f) importJSON(f);
      e.target.value = "";
    });

    $("#modal-close").addEventListener("click", closeModal);
    $("#modal-cancel").addEventListener("click", closeModal);
    $("#modal").addEventListener("click", (e) => {
      if (e.target === $("#modal")) closeModal();
    });
    $("#modal-form").addEventListener("submit", onModalSubmit);

    $("#cal-prev").addEventListener("click", () => {
      calMonth--;
      if (calMonth < 0) {
        calMonth = 11;
        calYear--;
      }
      renderCalendar();
    });
    $("#cal-next").addEventListener("click", () => {
      calMonth++;
      if (calMonth > 11) {
        calMonth = 0;
        calYear++;
      }
      renderCalendar();
    });

    $("#reminder-filters").addEventListener("click", (e) => {
      const chip = e.target.closest("[data-filter]");
      if (!chip) return;
      reminderFilter = chip.dataset.filter;
      $$("#reminder-filters .chip").forEach((c) =>
        c.classList.toggle("active", c === chip)
      );
      renderReminders();
    });

    $("#reminders-table").addEventListener("click", (e) => {
      const t = e.target.closest("[data-edit-reminder],[data-del-reminder],[data-toggle-reminder]");
      if (!t) return;
      if (t.dataset.editReminder) openReminderModal(t.dataset.editReminder);
      if (t.dataset.delReminder) {
        if (confirm("Delete this reminder?")) {
          state.reminders = state.reminders.filter((r) => r.id !== t.dataset.delReminder);
          save();
          renderReminders();
          renderHome();
          toast("Deleted");
        }
      }
      if (t.dataset.toggleReminder) {
        const r = state.reminders.find((x) => x.id === t.dataset.toggleReminder);
        if (r) {
          r.status = r.status === "OPEN" ? "DONE" : "OPEN";
          save();
          renderReminders();
          renderHome();
        }
      }
    });

    $("#ledger-table").addEventListener("click", (e) => {
      const t = e.target.closest("[data-edit-ledger],[data-del-ledger]");
      if (!t) return;
      if (t.dataset.editLedger) openLedgerModal(t.dataset.editLedger);
      if (t.dataset.delLedger) {
        if (confirm("Delete this ledger row?")) {
          state.ledger = state.ledger.filter((r) => r.id !== t.dataset.delLedger);
          save();
          renderLedger();
          renderHome();
          toast("Deleted");
        }
      }
    });

    $("#cal-upcoming").addEventListener("click", (e) => {
      const edit = e.target.closest("[data-edit-event]");
      const del = e.target.closest("[data-del-event]");
      if (edit) openEventModal(edit.dataset.editEvent);
      if (del && confirm("Delete this event?")) {
        state.events = state.events.filter((r) => r.id !== del.dataset.delEvent);
        save();
        renderCalendar();
        toast("Deleted");
      }
    });

    $("#roster-search").addEventListener("input", (e) => {
      rosterQuery = e.target.value;
      renderRoster();
    });

    $("#roster-grid").addEventListener("click", (e) => {
      const live = e.target.closest("[data-live]");
      const edit = e.target.closest("[data-edit-roster]");
      const del = e.target.closest("[data-del-roster]");
      if (live) {
        const p = state.roster.find((x) => x.id === live.dataset.live);
        if (p) {
          p.status = p.status === "Live" ? "Active" : "Live";
          p.lastTouch = todayISO();
          save();
          renderRoster();
          renderHome();
        }
      }
      if (edit) openRosterModal(edit.dataset.editRoster);
      if (del && confirm("Remove this person from roster?")) {
        state.roster = state.roster.filter((r) => r.id !== del.dataset.delRoster);
        save();
        renderRoster();
        renderHome();
        toast("Removed");
      }
    });

    $("#btn-save-gamdom").addEventListener("click", () => {
      state.gamdom.push = $("#gamdom-push").value;
      state.gamdom.rg = $("#gamdom-rg").value;
      state.gamdom.status = $("#gamdom-status").value;
      save();
      $("#gamdom-save-hint").textContent = "Saved.";
      setTimeout(() => {
        $("#gamdom-save-hint").textContent = "";
      }, 2000);
      toast("Gamdom panel saved");
    });

    $("#btn-save-winners").addEventListener("click", () => {
      $$("[data-winner]").forEach((inp) => {
        const i = Number(inp.dataset.winner);
        state.gamdom.winners[i] = inp.value.trim();
      });
      save();
      toast("Winners saved");
    });

    $("#promo-checklist").addEventListener("change", (e) => {
      const cb = e.target.closest("[data-check]");
      if (!cb) return;
      const item = state.gamdom.checklist.find((c) => c.id === cb.dataset.check);
      if (item) {
        item.done = cb.checked;
        save();
        renderGamdom();
      }
    });

    $("#promo-checklist").addEventListener("click", (e) => {
      const del = e.target.closest("[data-del-check]");
      if (!del) return;
      state.gamdom.checklist = state.gamdom.checklist.filter(
        (c) => c.id !== del.dataset.delCheck
      );
      save();
      renderGamdom();
    });

    $("#btn-add-check").addEventListener("click", () => {
      const text = prompt("Checklist item:");
      if (!text || !text.trim()) return;
      state.gamdom.checklist.push({ id: uid(), text: text.trim(), done: false });
      save();
      renderGamdom();
    });

    // Hidden: double-click brand to reset seed (dev convenience)
    $$(".brand").forEach((el) => {
      el.addEventListener("dblclick", () => {
        if (confirm("Reset STEVE HQ to Day 0 seed data? This overwrites local storage.")) {
          resetToSeed();
        }
      });
    });
  }

  // ---------- boot ----------
  bind();
  switchTab("home");
  tickClock();
  setInterval(tickClock, 1000);
})();
