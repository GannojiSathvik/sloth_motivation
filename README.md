> Current mode: local browser storage. Supabase sync and sign-in are paused; existing cloud data is untouched. Download backups from Local storage. Gemini works in the local Node app; the public hosted planner is paused until an independent abuse-protection mechanism is configured. The cloud setup notes below are retained for future re-enablement.

# 🦥 SlothMotivate

> *"Why run when you can walk? Why walk when you can nap? And why stress when you can take one tiny step at a time?"*

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](#license)
[![Sloth-Approved](https://img.shields.io/badge/speed-leisurely-green.svg)](#philosophy)

Welcome to **SlothMotivate** — the anti-burnout productivity workspace built for humans who are tired of hyper-caffeinated productivity apps yelling at them to hustle 25 hours a day.

Here, we believe slow progress is still progress. A 1% step forward still beats falling off the tree.

---

## 🍃 Why SlothMotivate?

Most productivity apps:
- 🚨 47 push notifications telling you you're behind on life
- 📊 Complex 7-dimensional Gantt charts just to remember to drink water
- 💸 $19.99/month "Pro AI Quantum Plan" subscription

**SlothMotivate:**
- 🛋️ **Zero overwhelm**: Just one right next step.
- 🧘 **Peaceful Pomodoro**: 25- or 50-minute calm focus timer that doesn’t panic.
- 🗓️ **Daily Rhythm Timetable**: Block time without breaking your spirit.
- 📓 **Reflective Journal**: Jot down your thoughts, wins, and the snacks you consumed.
- 📈 **Gentle Progress & Heatmap**: A 30-day activity grid that celebrates showing up.
- ⚡ **Daily Fuel**: Quotes to remind you that even sloths get things done eventually.
- ⏱️ **Start → finish → reflect**: Automatic elapsed time, pause exclusion, and planned-versus-actual comparison. Record what you did and where you worked.
- ✦ **Gemini planner**: Describe your day, review an editable schedule around existing commitments, then add it to your timetable.
- 🔒 **Local saving**: Entries stay in this browser. Supabase and sign-in are paused; download a backup from Local storage.

---

## 🚀 Quickstart (Even a sloth can do this in 20 seconds)

### Prerequisites
- [Node.js](https://nodejs.org/) (v22 or newer).

### 1. Fire up the engine
```sh
npm ci
npm run build
cp .env.example .env
npm start
```
Add `GEMINI_API_KEY` to `.env` to enable AI planning. Keep it private; never use a browser-prefixed environment variable for this key.

### 2. Open in your browser
Point your favorite web browser to:
👉 **[http://127.0.0.1:4174](http://127.0.0.1:4174)**

*(Keep the same URL to keep your saved tasks, streaks, and reflections intact!)*

---

## 🗺️ Workspace Routes

| Page | Route | What you'll find |
| --- | --- | --- |
| **Dashboard** | `/` | Planned versus recorded time, outcomes, carry-forward, next actions |
| **Tasks** | `/todos` | To-dos, reminder dates, later items |
| **Focus** | `/work` | Stopwatch, task-linked Pomodoro, finish and reflect |
| **Planner** | `/planner` | AI previews, plain-language revisions, available windows, replanning |
| Timetable (Planner subpage) | `/timetable` | Week selector and editable AM/PM agenda |
| **Progress** | `/progress` | Daily review, saved next-day improvement, trends and goals |
| Reflections (Progress subpage) | `/journal` | Work logs and journal entries |
| Daily fuel (Progress subpage) | `/fuel` | Quotes |
| Local storage | `/account` | Backup and previously cached workspaces |

---

## Archived cloud storage setup (not active in the current app)

1. Choose a Supabase project and apply `supabase/schema.sql` once. The table is named `sloth_workspaces` to keep this app separate from other apps.
2. Add `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` to `.env`, then restart the server. Use a publishable key, never a service-role key.
3. Enable Google under Supabase Authentication → Sign In / Providers using a Google OAuth Web client ID and secret. Add the app’s `/account` URL to Supabase’s redirect allow list. Open **Cloud account** and choose **Continue with Google**. On first sign-in to an empty workspace, this device's local work is copied to your account.

Row-level security restricts every row to its owner. Changes save automatically with version checks to prevent overwriting changes from another device. If there is a conflict, the account page offers “Load latest cloud version,” which backs up the local copy first. Offline work remains on the device; use **Sync now** after reconnecting. Browser storage is not encrypted, so sign out on shared devices and use separate browser profiles.

## Hosting on Vercel

The build publishes only browser assets in `dist/`. The `/api/config` and `/api/plan` functions run on the server, and navigation routes keep working on direct visits. Set `GEMINI_API_KEY`, `GEMINI_MODEL`, `SUPABASE_URL`, and `SUPABASE_PUBLISHABLE_KEY` in Vercel's project environment settings before redeploying. Local `.env` values are never uploaded.

The hosted AI planner currently returns an explicit paused message. Adding environment variables alone does not enable it. The local planner runs without sign-in on loopback only. Public AI requires a separate abuse-protection design before re-enablement.

When you generate a plan, your planning brief, selected goals, and existing commitments for that date are sent to Gemini. Work reflections stay in local browser storage and are not sent to Gemini. Plans remain drafts until you accept them. Time tracking measures elapsed time between your clicks, not keyboard activity or proof of work.

## 🧪 Testing

We take our laziness seriously, which means our code has to be bulletproof so we never have to fix it twice:

```sh
npm test
```
Covers timer recovery, pauses, midnight boundaries, saved reflections, planning conflicts, provider errors, routing, and API access checks.

---

## 🦥 The Official Sloth Code of Conduct

1. **One thing at a time**: Multitasking is a myth invented by trees trying to distract us.
2. **Celebrate micro-steps**: Made your bed? You're a champion. Wrote one line of code? Genius.
3. **If you slip, don't worry**: The branch will still be there tomorrow. Resume your streak without guilt.

---

## 📜 License

ISC © [Gannoji Sathvik](https://github.com/GannojiSathvik) — Free to use, adapt, and chill with.

### Google sign-in configuration

Create a Web application OAuth client in Google Auth Platform. Its authorized redirect URI for this project is `https://tpxutrqowbufwztpzori.supabase.co/auth/v1/callback`. Save the client ID and secret in Supabase’s Google provider settings, never in frontend code. Use only the basic openid/email/profile scopes. If the Google app is in Testing, add your Google account as a test user.

In Supabase Authentication → URL Configuration, allow `http://127.0.0.1:4174/account`, `http://localhost:4174/account`, and the exact deployed HTTPS `/account` URL. Set Site URL to the deployed site when available. The browser uses PKCE and returns to the same app origin. Google sign-in must finish in the browser where it started.

## To-do, reminders, and learning from work

Use `/todos` to capture tasks with optional reminder dates and planned minutes. Due items appear on Work & reflect and are summarized on Overview; choose “Pick a task for me” when unsure what to do. Start opens the work timer immediately. Items can be completed, reopened, moved to tomorrow, or archived and restored. Reminders are in-app only, without background notifications.

Finish & reflect stops timing before asking what you did, where you worked, whether it was worthwhile, mistakes or obstacles, and one lesson for next time. Reflections appear in the journal; the latest three lessons are available on Work & reflect, with the latest lesson summarized on Overview. Older logs remain compatible. To-dos and reflections use local browser storage; no database setup is required.

## Pomodoro

Focus includes 25- and 50-minute task-linked Pomodoros, 5-minute short breaks, and 15-minute long breaks. Starting a focus round requires a task name and opens a work reflection at completion. After four completed focus sessions it offers a long break. Start the suggested phase when ready; phases never auto-start. Pause/resume and refresh recovery use saved deadlines. Breaks are excluded from focus statistics. The timer settles when the app returns from sleep; it does not issue background notifications with the browser closed.

## Daily accounting and data preservation

- Work time is elapsed tracked time minus pauses and self-reported distractions. Exact pause intervals are recorded for new sessions. Overlapping work/Pomodoro intervals count once.
- Local midnight splits sessions into the dates where the time occurred. Aggregate manual corrections, distractions, and legacy pause totals are allocated proportionally, because exact distraction timestamps are unknown.
- Completion is completed planned non-break tasks divided by planned non-break tasks. Partial, missed/skipped, and upcoming tasks are shown separately. Deliberately rescheduled blocks are excluded. Extra elapsed time never implies extra achievement.
- Untracked time is the elapsed portion of scheduled work without a recorded interval. It is not called wasted time. A running timer is not evidence of keyboard activity or attention.
- Daily totals roll over without deleting records. Carry-forward creates a linked to-do and leaves the original day intact. Replanning archives prior blocks in place; originals without a mapped replacement return to Later.
- Streaks count days with completed planned work or recorded work. Completion history is recomputed from retained tasks, while legacy history without underlying records remains readable.
- Old Pomodoros without interval timestamps retain original daily totals and their old overlap flag; precise retrospective splitting is impossible for those records.

Established product references informed the distinction between recorded time and classified productivity, rather than copying a proprietary score: [Toggl Summary Report](https://docs.toggl.com/summary-report-in-toggl), [RescueTime activity categories](https://help.rescuetime.com/article/456-managing-your-activities-categories-and-productivity-levels). This app uses the explicit formulas above, not a claimed industry-standard productivity algorithm.

AI can use multiple windows such as `10 AM - 1 PM, 4 PM - 6 PM`. Server and client validate bounds, gaps, and overlap. Preview edits never mutate saved tasks until Apply. Replanning protects completed/running work, and rejects a stale preview if those tasks changed. Review suggestions are currently your own recorded lessons and next-day adjustment; there is no hidden AI analysis of private journal entries.

The sidebar includes direct Timetable and Daily Fuel links. Timetable offers day/week calendar grids with 12-hour labels, clickable empty slots, and side-by-side overlapping events.

### Learning sessions and reminders
Starting a saved reminder starts its stopwatch immediately. Finish & reflect records what you did, what you learned, focus level, a 1–5 session rating, mistakes, and your next improvement. Pomodoro opens the same reflection when its focus round completes.

Tasks & reminders supports searchable notes, up to 20 HTTP(S) links, and up to 3 compressed reference images per item. Images remain in browser storage and backups; no upload service is used. Reminder storage failures preserve the draft and existing records. Dates surface reminders inside the app, not as background notifications.

Saved work sessions automatically appear in Timetable as Actual blocks alongside Planned blocks. These derive from work logs without creating extra tasks or changing metrics. Overnight sessions appear on both days. The block spans start to finish; its details show net tracked work, pauses, distractions, and the reflection.
