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
- 🧘 **Peaceful Pomodoro**: 25-minute calm focus timer that doesn’t panic.
- 🗓️ **Daily Rhythm Timetable**: Block time without breaking your spirit.
- 📓 **Reflective Journal**: Jot down your thoughts, wins, and the snacks you consumed.
- 📈 **Gentle Progress & Heatmap**: A 30-day activity grid that celebrates showing up.
- ⚡ **Daily Fuel**: Quotes to remind you that even sloths get things done eventually.
- ⏱️ **Start → finish → reflect**: Automatic elapsed time, pause exclusion, and planned-versus-actual comparison. Record what you did and where you worked.
- ✦ **Gemini planner**: Describe your day, review an editable schedule around existing commitments, then add it to your timetable.
- 🔒 **Optional private cloud saving**: Supabase accounts sync tasks, goals, work logs, and reflections. Signed-out work stays in browser storage. Active timers stay on the device where they started.

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
| 🏡 **Overview** | `/` | Daily stats, focus timer, upcoming schedule, and summaries across your workspace |
| ⏱️ **Work & reflect** | `/work` | Start a task, track elapsed time, and save your reflection |
| 📅 **Timetable** | `/timetable` | Time-blocking without the anxiety |
| 📖 **Journal** | `/journal` | Space to reflect, breathe, and celebrate micro-wins |
| 📊 **My Progress** | `/progress` | 30-day activity heatmap and your glorious streak |
| ✦ **AI planner** | `/planner` | Describe priorities, preview and edit blocks, then add them |
| 🔒 **Cloud account** | `/account` | Sign in, sync, and manage your private workspace |
| 💡 **Daily Fuel** | `/fuel` | Wisdom and motivation when the couch is calling your name |

---

## Cloud storage setup

1. Choose a Supabase project and apply `supabase/schema.sql` once. The table is named `sloth_workspaces` to keep this app separate from other apps.
2. Add `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` to `.env`, then restart the server. Use a publishable key, never a service-role key.
3. Enable Google under Supabase Authentication → Sign In / Providers using a Google OAuth Web client ID and secret. Add the app’s `/account` URL to Supabase’s redirect allow list. Open **Cloud account** and choose **Continue with Google**. On first sign-in to an empty workspace, this device's local work is copied to your account.

Row-level security restricts every row to its owner. Changes save automatically with version checks to prevent overwriting changes from another device. If there is a conflict, the account page offers “Load latest cloud version,” which backs up the local copy first. Offline work remains on the device; use **Sync now** after reconnecting. Browser storage is not encrypted, so sign out on shared devices and use separate browser profiles.

## Hosting on Vercel

The build publishes only browser assets in `dist/`. The `/api/config` and `/api/plan` functions run on the server, and navigation routes keep working on direct visits. Set `GEMINI_API_KEY`, `GEMINI_MODEL`, `SUPABASE_URL`, and `SUPABASE_PUBLISHABLE_KEY` in Vercel's project environment settings before redeploying. Local `.env` values are never uploaded.

The hosted AI planner requires a valid Supabase sign-in. Its short request cooldown is per function instance; configure provider quotas for a publicly available deployment. The local planner runs without sign-in on loopback only.

When you generate a plan, your planning brief, selected goals, and existing commitments for that date are sent to Gemini. Work reflections are saved to Supabase only when you sign in; they are not sent to Gemini. Plans remain drafts until you accept them. Time tracking measures elapsed time between your clicks, not keyboard activity or proof of work.

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

Finish & reflect stops timing before asking what you did, where you worked, whether it was worthwhile, mistakes or obstacles, and one lesson for next time. Reflections appear in the journal; the latest three lessons are available on Work & reflect, with the latest lesson summarized on Overview. Older logs remain compatible. To-dos and reflections use the existing private Supabase workspace, so no new table migration is needed.
