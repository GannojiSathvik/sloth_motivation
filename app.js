/* ═══════════════════════════════════════════════════════════
   SlothMotivate — app.js  (All Logic)
   ═══════════════════════════════════════════════════════════ */

'use strict';

// ═══════════════════════════════════════
// QUOTES DATABASE
// ═══════════════════════════════════════
const QUOTES = [
  // Steve Jobs
  {
    text: "Your time is limited, so don't waste it living someone else's life. Don't let the noise of others' opinions drown out your own inner voice.",
    author: "Steve Jobs",
    title: "Co-Founder & CEO, Apple",
    company: "APPLE",
    emoji: "🍎",
    tag: "jobs",
    glow: "#A273FF",
    glow2: "#6C63FF"
  },
  {
    text: "Deciding what not to do is as important as deciding what to do. Focus is about saying no to a thousand good ideas.",
    author: "Steve Jobs",
    title: "Co-Founder & CEO, Apple",
    company: "APPLE",
    emoji: "🍎",
    tag: "jobs",
    glow: "#A273FF",
    glow2: "#6C63FF"
  },
  {
    text: "Stay hungry. Stay foolish. Never settle for the status quo when you can invent the future.",
    author: "Steve Jobs",
    title: "Co-Founder & CEO, Apple",
    company: "APPLE",
    emoji: "🍎",
    tag: "jobs",
    glow: "#A273FF",
    glow2: "#6C63FF"
  },
  {
    text: "The people who are crazy enough to think they can change the world are the ones who do.",
    author: "Steve Jobs",
    title: "Co-Founder & CEO, Apple",
    company: "APPLE",
    emoji: "🍎",
    tag: "jobs",
    glow: "#A273FF",
    glow2: "#6C63FF"
  },

  // Bill Gates
  {
    text: "Most people overestimate what they can do in one year and underestimate what they can do in ten years.",
    author: "Bill Gates",
    title: "Co-Founder, Microsoft",
    company: "MICROSOFT",
    emoji: "🪟",
    tag: "gates",
    glow: "#00A4EF",
    glow2: "#7FBA00"
  },
  {
    text: "Patience is a key element of success. If you show up every day with relentlessness, compounding takes over.",
    author: "Bill Gates",
    title: "Co-Founder, Microsoft",
    company: "MICROSOFT",
    emoji: "🪟",
    tag: "gates",
    glow: "#00A4EF",
    glow2: "#FFB900"
  },
  {
    text: "It's fine to celebrate success, but it is far more important to heed the brutal lessons of failure.",
    author: "Bill Gates",
    title: "Co-Founder, Microsoft",
    company: "MICROSOFT",
    emoji: "🪟",
    tag: "gates",
    glow: "#00A4EF",
    glow2: "#F25022"
  },

  // Jeff Bezos
  {
    text: "If you double the number of experiments you do per year, you're going to double your inventiveness and velocity.",
    author: "Jeff Bezos",
    title: "Founder, Amazon & Blue Origin",
    company: "AMAZON",
    emoji: "📦",
    tag: "bezos",
    glow: "#FF9900",
    glow2: "#146EB4"
  },
  {
    text: "I knew that if I failed I wouldn't regret that, but I knew the one thing I might regret is not trying at all.",
    author: "Jeff Bezos",
    title: "Founder, Amazon & Blue Origin",
    company: "AMAZON",
    emoji: "📦",
    tag: "bezos",
    glow: "#FF9900",
    glow2: "#FF6B9D"
  },
  {
    text: "One of the huge mistakes people make is trying to force passion on themselves. You don't choose your passions; your passions choose you.",
    author: "Jeff Bezos",
    title: "Founder, Amazon & Blue Origin",
    company: "AMAZON",
    emoji: "📦",
    tag: "bezos",
    glow: "#FF9900",
    glow2: "#00E5FF"
  },

  // Jensen Huang
  {
    text: "I do not wish you happiness. I wish you suffering and hardship, because character is not built from easy wins; it is forged by people who suffered.",
    author: "Jensen Huang",
    title: "Founder & CEO, NVIDIA",
    company: "NVIDIA",
    emoji: "🟢",
    tag: "jensen",
    glow: "#76B900",
    glow2: "#00E676"
  },
  {
    text: "Run, don't walk. Either you are running for food, or you are running from becoming food.",
    author: "Jensen Huang",
    title: "Founder & CEO, NVIDIA",
    company: "NVIDIA",
    emoji: "🟢",
    tag: "jensen",
    glow: "#76B900",
    glow2: "#A273FF"
  },
  {
    text: "Software is eating the world, but AI is eating software. The only moat is execution speed and constant reinvention.",
    author: "Jensen Huang",
    title: "Founder & CEO, NVIDIA",
    company: "NVIDIA",
    emoji: "🟢",
    tag: "jensen",
    glow: "#76B900",
    glow2: "#00A4EF"
  },

  // Mark Zuckerberg
  {
    text: "The biggest risk is not taking any risk. In a world that is changing rapidly, the only strategy guaranteed to fail is not taking risks.",
    author: "Mark Zuckerberg",
    title: "Founder & CEO, Meta",
    company: "META",
    emoji: "🔵",
    tag: "zuck",
    glow: "#0668E1",
    glow2: "#6C63FF"
  },
  {
    text: "Ideas don't come out fully formed. They only become clear as you build them. You just have to get started right now.",
    author: "Mark Zuckerberg",
    title: "Founder & CEO, Meta",
    company: "META",
    emoji: "🔵",
    tag: "zuck",
    glow: "#0668E1",
    glow2: "#00E5FF"
  },
  {
    text: "Move fast and build relentlessly. Unless you are breaking your own assumptions, you are moving too slow.",
    author: "Mark Zuckerberg",
    title: "Founder & CEO, Meta",
    company: "META",
    emoji: "🔵",
    tag: "zuck",
    glow: "#0668E1",
    glow2: "#FF6B9D"
  },

  // Sam Altman
  {
    text: "A big secret is that you can bend the world to your will a surprising percentage of the time — most people don't even try.",
    author: "Sam Altman",
    title: "CEO, OpenAI",
    company: "OPENAI",
    emoji: "🤖",
    tag: "altman",
    glow: "#10A37F",
    glow2: "#00E5FF"
  },
  {
    text: "Hard work compounds like interest. The earlier you do it in your career, the more time you have for the benefits to pay off exponentially.",
    author: "Sam Altman",
    title: "CEO, OpenAI",
    company: "OPENAI",
    emoji: "🤖",
    tag: "altman",
    glow: "#10A37F",
    glow2: "#6C63FF"
  },
  {
    text: "Extreme success is a power-law outcome. Aim for long-term exponential growth rather than linear comfort.",
    author: "Sam Altman",
    title: "CEO, OpenAI",
    company: "OPENAI",
    emoji: "🤖",
    tag: "altman",
    glow: "#10A37F",
    glow2: "#FFD700"
  },

  // Elon Musk (Tech Architecture / Relentless Execution)
  {
    text: "Work like hell. Put in 80 to 100 hour weeks every week. This improves the odds of success. If other people are putting in 40-hour work weeks and you're putting in 100-hour work weeks, even if you're doing the same thing, you will achieve in 4 months what it takes them a year to achieve.",
    author: "Elon Musk",
    title: "CEO, Tesla · SpaceX · xAI",
    company: "TESLA / SPACEX / xAI",
    emoji: "🚀",
    tag: "musk",
    glow: "#E82127",
    glow2: "#FF9900"
  },
  {
    text: "Think until your brain hurts. When you really think hard about something until it hurts, that's when you start solving the problems other people thought were impossible.",
    author: "Elon Musk",
    title: "CEO, Tesla · SpaceX · xAI",
    company: "TESLA / SPACEX / xAI",
    emoji: "🚀",
    tag: "musk",
    glow: "#E82127",
    glow2: "#6C63FF"
  },
  {
    text: "Boil things down to their most fundamental truths, reason up from there, and assess whether what you're doing is physically possible. Never reason by analogy.",
    author: "Elon Musk",
    title: "CEO, Tesla · SpaceX · xAI",
    company: "TESLA / SPACEX / xAI",
    emoji: "🚀",
    tag: "musk",
    glow: "#E82127",
    glow2: "#00E5FF"
  },
  {
    text: "Being an entrepreneur is like eating glass and staring into the abyss of death. You have to have a high pain threshold and relentless obsession.",
    author: "Elon Musk",
    title: "CEO, Tesla · SpaceX · xAI",
    company: "TESLA / SPACEX / xAI",
    emoji: "🚀",
    tag: "musk",
    glow: "#E82127",
    glow2: "#FF3366"
  },
  {
    text: "I think it's very important to have a feedback loop, where you're constantly thinking about what you've done and how you could be doing it better.",
    author: "Elon Musk",
    title: "CEO, Tesla · SpaceX · xAI",
    company: "TESLA / SPACEX / xAI",
    emoji: "🚀",
    tag: "musk",
    glow: "#E82127",
    glow2: "#76B900"
  },

  // Computing Legends
  {
    text: "Focus is a matter of deciding what things you're not going to do. The best code is the code you didn't have to write.",
    author: "John Carmack",
    title: "Legendary Game Architect & Pioneer",
    company: "ID SOFTWARE / OCULUS",
    emoji: "🎮",
    tag: "other",
    glow: "#A273FF",
    glow2: "#00E5FF"
  },
  {
    text: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
    title: "Creator of Linux & Git",
    company: "LINUX FOUNDATION",
    emoji: "🐧",
    tag: "other",
    glow: "#FCC624",
    glow2: "#6C63FF"
  },
  {
    text: "Sometimes it is the people no one can imagine anything of who do the things no one can imagine.",
    author: "Alan Turing",
    title: "Father of Modern Computing & AI",
    company: "BLETCHLEY PARK",
    emoji: "🧠",
    tag: "other",
    glow: "#00E5FF",
    glow2: "#6C63FF"
  },
  {
    text: "Don't be a know-it-all; be a learn-it-all. The future belongs to those who continuously absorb and adapt.",
    author: "Satya Nadella",
    title: "Chairman & CEO, Microsoft",
    company: "MICROSOFT",
    emoji: "⚡",
    tag: "other",
    glow: "#00A4EF",
    glow2: "#A273FF"
  },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
    title: "Pioneer of OOP & GUI",
    company: "XEROX PARC",
    emoji: "💡",
    tag: "other",
    glow: "#FFD700",
    glow2: "#FF6B9D"
  }
];

// AI Coach responses categorized
const AI_RESPONSES = {
  skip: [
    "Okay, you skipped it. Now what? You have two choices: wallow in regret or GET BACK UP. Which one moves you forward? 💪",
    "Every champion has skipped sessions. The difference? They got back up FASTER. What's stopping you right now?",
    "You didn't lose — you just took an unplanned break. The question is: can you make up for it in the next hour?",
    "Goggins said: 'The most important thing is what you do AFTER you fail.' What are you going to do RIGHT NOW?",
    "One skip doesn't define you. A pattern of skips does. Break the pattern TODAY.",
  ],
  lazy: [
    "Laziness is just fear in disguise. Fear of failure, fear of effort. Name what you're actually afraid of.",
    "Think about where you want to be in 5 years. Is lying around getting you there? Even 20 minutes of work > 0.",
    "Elon works 80+ hours a week. Your competitor is working right now. What are YOU doing?",
    "The 2-minute rule: just START the task for 2 minutes. That's all. You'll almost always keep going.",
    "You're not lazy — you're overwhelmed. Break it into the ONE smallest possible step. What is it?",
  ],
  procrastinate: [
    "Procrastination is lying to your future self. Your future self WILL be angry at you. Stop the theft.",
    "You're procrastinating because the task feels big. Make it tiny. What's the first 5-minute action?",
    "Every minute you delay, someone else is getting ahead. This is not a drill — this is your life.",
    "Start ugly. Start messy. Start scared. Just START. Done beats perfect every time.",
    "The cost of procrastination compounds daily. You're paying interest on borrowed time.",
  ],
  motivation: [
    "You're here because you WANT to be better. That desire? It's your superpower. Now USE it. 🔥",
    "Remember why you started. That person who set these goals — they believed in you. Don't let them down.",
    "Progress is not always visible. But every hour of focus compounds. Trust the process.",
    "You're building the version of yourself that your future life depends on. Every session matters.",
    "The gap between where you are and where you want to be is filled ONLY by consistent daily action.",
  ],
  general: [
    "What's on your mind? Tell me what you're struggling with and we'll figure it out together.",
    "Break it down. What's the ONE thing that would move the needle most right now?",
    "You've got this. I'm here to help you think it through. What's going on?",
  ],
  musk: [
    "Elon Musk mode activated: 'Work like hell. Put in 80 to 100 hour weeks every week. If someone works 40 hours and you work 100, you achieve in 4 months what takes them a year.' Outwork everyone. 🚀",
    "Elon Musk: 'Think until your brain hurts. When you really think hard about something until it hurts, that's when you start solving the problems other people thought were impossible.' 🧠💥",
    "Elon Musk: 'Boil things down to the most fundamental truths and reason up from there.' Don't copy others — what is the bedrock physics of your problem?",
    "Elon Musk: 'If something is important enough, you do it even if the odds are not in your favor.' Stop overthinking, start executing.",
  ],
};

// ═══════════════════════════════════════
// STATE
// ═══════════════════════════════════════
let activeStorageKey = 'sm_state';
let state = {
  workSession: null,
  workLogs: [],
  plannerPreferences: {},
  todos: [],
  focus: { remaining: 1500, endAt: null, completed: false },
  focusSessions: [],
  tasks: [],       // { id, name, desc, start, end, category, links, date, status: 'pending'|'done'|'skipped' }
  journal: [],     // { id, time, date, text, rating }
  goals: [],       // { id, name, target, current, unit, deadline }
  history: {},     // { 'YYYY-MM-DD': score (0-100) }
  streak: 0,
  currentQuoteIdx: 0,
  quoteFilter: 'all',
  currentJournalRating: 3,
};

// ═══════════════════════════════════════
// PERSISTENCE
// ═══════════════════════════════════════
function save() {
  localStorage.setItem(activeStorageKey, JSON.stringify(state));
}

function load() {
  const selected=localStorage.getItem('sm_local_workspace');
  if (selected==='sm_state' || selected?.startsWith('sm_state:')) activeStorageKey=selected;
  const raw = localStorage.getItem(activeStorageKey);
  if (raw) {
    const loaded = JSON.parse(raw);
    state = { ...state, ...loaded };
  }
  if (!Number.isInteger(state.focus.rounds)) state.focus.rounds=state.focusSessions.filter(s=>!s.mode||s.mode==='focus').length;
  // Ensure today exists in history
  const today = todayStr();
  if (!state.history[today]) state.history[today] = 0;
}

function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
function todayStr() { return localDate(); }

// ═══════════════════════════════════════
// CLOCK
// ═══════════════════════════════════════
function updateClock() {
  const now = new Date();
  const timeEl = document.getElementById('live-time');
  const dateEl = document.getElementById('live-date');
  if (!timeEl) return;

  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');
  timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  dateEl.textContent = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

// ═══════════════════════════════════════
// PAGE ROUTING
// ═══════════════════════════════════════
const PAGES = {
  dashboard: { path: '/', title: 'Dashboard' },
  work: { path: '/work', title: 'Focus' },
  timetable: { path: '/timetable', title: 'Timetable' },
  journal: { path: '/journal', title: 'Journal' },
  progress: { path: '/progress', title: 'Progress' },
  quotes: { path: '/fuel', title: 'Daily fuel' },
  planner: { path: '/planner', title: 'Planner' },
  todos: { path: '/todos', title: 'Tasks' },
  account: { path: '/account', title: 'Local storage' },
};

function pageFromPath(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/index.html') return 'dashboard';
  return Object.keys(PAGES).find(page => PAGES[page].path === path) || null;
}

function renderPage(page, { focus = true } = {}) {
  if (!PAGES[page]) return;
  document.querySelectorAll('.modal-overlay.open').forEach(modal => closeModal(modal.id));
  document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
  const panel = document.getElementById('tab-' + page);
  panel.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(link => {
    const active = link.dataset.page === ({timetable:'planner',journal:'progress',quotes:'progress'}[page] || page);
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  setText('page-breadcrumb', PAGES[page].title);
  document.title = `${PAGES[page].title} — SlothMotivate`;

  if (page === 'dashboard') updateDashboard();
  if (page === 'work') renderWork();
  if (page === 'account') renderLocalStorage();
  if (page === 'timetable') renderTimetable();
  if (page === 'journal') renderJournal();
  if (page === 'planner') initPlanner();
  if (page === 'todos') renderTodos();
  if (page === 'progress') { renderProgress(); renderDailyReview(); }
  if (page === 'quotes') renderFuelSlide();
  else if (fuelTimer) {
    clearTimeout(fuelTimer);
    fuelTimer = null;
  }
  if (focus) {
    // Announce the newly opened page to keyboard and screen-reader users.
    const heading = panel.querySelector('h1') || panel;
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

function navigateToPage(page) {
  if (!PAGES[page]) return;
  if (window.location.pathname !== PAGES[page].path) {
    window.history.pushState({ page }, '', PAGES[page].path);
  }
  renderPage(page);
}

function setupRouting() {
  document.addEventListener('click', event => {
    const link = event.target.closest('a[data-page]');
    if (!link || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
        link.target === '_blank' || link.hasAttribute('download')) return;
    event.preventDefault();
    navigateToPage(link.dataset.page);
  });
  window.addEventListener('popstate', () => {
    renderPage(pageFromPath(window.location.pathname) || 'dashboard');
  });
  renderPage(pageFromPath(window.location.pathname) || 'dashboard', { focus: false });
}

// ═══════════════════════════════════════
// MODAL HELPERS
// ═══════════════════════════════════════
let modalReturnFocus = null;
function openModal(id) {
  modalReturnFocus = document.activeElement;
  const overlay = document.getElementById(id);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  overlay.querySelector('input, textarea, button')?.focus();
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
  modalReturnFocus?.focus();
}

// ═══════════════════════════════════════
// TIMETABLE
// ═══════════════════════════════════════
function openAddTask() {
  editingTaskId=null;
  clearForm(['task-name','task-desc','task-expected','task-start','task-end','task-links']);
  const dp = document.getElementById('timetable-date');
  document.getElementById('task-date').value = dp.value || todayStr();
  if (!document.getElementById('tab-timetable').classList.contains('active')) document.getElementById('task-date').value = todayStr();
  setTaskError('');
  const now = new Date();
  const minute = Math.min(1409, now.getHours()*60+now.getMinutes());
  const time = m => `${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`;
  if (!document.getElementById('task-start').value) document.getElementById('task-start').value=time(minute);
  if (!document.getElementById('task-end').value) document.getElementById('task-end').value=time(minute+30);
  syncTimeControls();
  openModal('modal-add-task');
}

function saveTask() {
  const name = document.getElementById('task-name').value.trim();
  const start = document.getElementById('task-start').value;
  const end   = document.getElementById('task-end').value;
  const date  = document.getElementById('task-date').value;
  if (!name || !start || !end || !date) {
    const missing = !name ? ['task-name','Add a task name.'] : !start ? ['task-start','Choose a start time.'] : !end ? ['task-end','Choose an end time.'] : ['task-date','Choose a date.'];
    setTaskError(missing[1],missing[0]);
    return;
  }
  if (end <= start) { setTaskError('Choose an end time after the start time.','task-end'); return; }
  setTaskError('');
  if(state.tasks.some(t=>t.id!==editingTaskId&&t.date===date&&!['skipped','rescheduled'].includes(t.status)&&start<t.end&&end>t.start)){setTaskError('This overlaps another block. Choose a free time.','task-start');return;}
  const linksRaw = document.getElementById('task-links').value.trim();
  const links = linksRaw ? linksRaw.split('\n').map(l => l.trim()).filter(Boolean) : [];

  const savedTask={
    id: editingTaskId || Date.now(),
    name,
    desc: document.getElementById('task-desc').value.trim(),
    start,
    end,
    category: document.getElementById('task-category').value,
    links,
    date,
    status: state.tasks.find(t=>t.id===editingTaskId)?.status || 'pending',
    expected: document.getElementById('task-expected').value.trim(),
  };
  if(editingTaskId)state.tasks=state.tasks.map(t=>t.id===editingTaskId?{...t,...savedTask,scheduleEdits:[...(t.scheduleEdits||[]),{date:t.date,start:t.start,end:t.end,name:t.name,expected:t.expected,changedAt:Date.now()}]}:t);else state.tasks.push(savedTask);
  editingTaskId=null;
  save();
  closeModal('modal-add-task');
  clearForm(['task-name','task-desc','task-start','task-end','task-links']);
  renderTimetable();
  updateDashboard();
  showToast('Time block saved. Make a little room for progress.');
}

function clearForm(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function renderTimetable() {
  const dp=document.getElementById('timetable-date'); if(!dp.value)dp.value=todayStr();
  const date=dp.value;
  const days=Array.from({length:7},(_,i)=>{const d=new Date(date+'T12:00:00');d.setDate(d.getDate()-((d.getDay()+6)%7)+i);return localDate(d);});
  document.getElementById('time-axis').innerHTML=`<div class="week-strip">${days.map(d=>`<button class="day-choice ${d===date?'selected':''}" onclick="chooseScheduleDay('${d}')"><span>${new Date(d+'T12:00:00').toLocaleDateString('en-US',{weekday:'short'})}</span><strong>${Number(d.slice(-2))}</strong><small>${state.tasks.filter(t=>t.date===d&&t.status!=='rescheduled').length} blocks</small></button>`).join('')}</div>`;
  const tasks=state.tasks.filter(t=>t.date===date).slice().sort((a,b)=>a.start.localeCompare(b.start));
  document.getElementById('blocks-wrap').innerHTML=tasks.length?tasks.map(t=>`<article class="agenda-item status-${t.status}"><div class="agenda-time">${formatTime(t.start)}<small>${formatTime(t.end)}</small></div><div><span class="small-pill">${escHtml(taskLabel(t))} · ${taskDuration(t)} min</span><h3>${escHtml(t.name)}</h3><p>${escHtml(t.expected||t.desc||'Add an outcome to make this block easier to finish.')}</p>${t.expected&&t.desc?`<details><summary>Steps & resources</summary><p>${escHtml(t.desc)}</p></details>`:''}</div><div class="agenda-actions">${['pending','partial'].includes(t.status)?`<button class="btn btn-primary" onclick="startWork(${t.id})">${t.category==='break'?'Take a break':'Start'}</button>`:''}<button class="text-button" onclick="editTask(${t.id})">Edit</button><button class="text-button" onclick="setTaskStatus(${t.id},'done')">Done</button><button class="text-button" onclick="setTaskStatus(${t.id},'skipped')">Skip</button></div></article>`).join(''):'<div class="schedule-empty"><h2>A little room for possibility.</h2><p>Describe your available hours and let AI arrange your day.</p><a href="/planner" data-page="planner" class="btn btn-primary">Plan my day</a></div>';
}

function setTaskStatus(id, status) {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;
  task.status = status;
  save();
  renderTimetable();
  updateDashboard();
  showToast(status === 'done' ? 'One more step forward. Nicely done.' : 'Block skipped. Your next step is still ahead.');
}

function deleteTask(id) {
  state.tasks = state.tasks.filter(t => t.id !== id);
  save();
  renderTimetable();
  updateDashboard();
}

// ═══════════════════════════════════════
// JOURNAL
// ═══════════════════════════════════════
function openJournalEntry() {
  const now = new Date();
  document.getElementById('journal-time').value = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  document.getElementById('journal-entry-date').value = todayStr();
  const dp = document.getElementById('journal-date');
  if (dp.value) document.getElementById('journal-entry-date').value = dp.value;
  openModal('modal-journal');
}

function setRating(val) {
  state.currentJournalRating = val;
  document.getElementById('journal-rating').value = val;
  document.querySelectorAll('.rating-btn').forEach(b => {
    b.classList.toggle('selected', parseInt(b.dataset.val) === val);
  });
}

function saveJournalEntry() {
  const text = document.getElementById('journal-text').value.trim();
  const time = document.getElementById('journal-time').value;
  const date = document.getElementById('journal-entry-date').value;
  if (!text) { alert('Write something first!'); return; }

  state.journal.push({
    id: Date.now(),
    time, date, text,
    rating: state.currentJournalRating,
  });
  save();
  closeModal('modal-journal');
  document.getElementById('journal-text').value = '';
  renderJournal();
  showToast('Reflection saved. Thanks for checking in.');
}

function renderJournal() {
  renderWorkHistory();
  const dp = document.getElementById('journal-date');
  if (!dp.value) dp.value = todayStr();
  const date = dp.value;

  const entries = state.journal.filter(j => j.date === date).sort((a,b) => a.time.localeCompare(b.time));
  const container = document.getElementById('journal-timeline');

  if (entries.length === 0) {
    container.innerHTML = '<div class="empty-state">No journal entries for this date. Start logging! 📓</div>';
    return;
  }

  const ratingEmoji = ['','😴','😐','👍','🔥','🚀'];
  container.innerHTML = entries.map(e => `
    <div class="journal-entry">
      <div class="journal-time-col">${e.time}</div>
      <div class="journal-card">
        <div class="journal-card-header">
          <strong style="font-size:0.85rem">${e.time} entry</strong>
          <span class="rating-badge">${ratingEmoji[e.rating] || ''}</span>
        </div>
        <p class="journal-card-text">${escHtml(e.text)}</p>
      </div>
    </div>
  `).join('');
}

// ═══════════════════════════════════════
// PROGRESS
// ═══════════════════════════════════════
function openAddGoal() {
  document.getElementById('goal-deadline').value = '';
  openModal('modal-add-goal');
}

function saveGoal() {
  const name    = document.getElementById('goal-name').value.trim();
  const target  = parseFloat(document.getElementById('goal-target').value);
  const current = parseFloat(document.getElementById('goal-current').value) || 0;
  const unit    = document.getElementById('goal-unit').value.trim();
  const deadline= document.getElementById('goal-deadline').value;
  if (!name || !Number.isFinite(target) || target <= 0 || current < 0) { alert('Fill in goal name and target.'); return; }

  state.goals.push({ id: Date.now(), name, target, current, unit, deadline });
  save();
  closeModal('modal-add-goal');
  renderProgress();
}

function updateGoalProgress(id) {
  const goal = state.goals.find(g => g.id === id);
  if (!goal) return;
  const val = parseFloat(prompt(`Current progress for "${goal.name}" (${goal.unit})?\nCurrent: ${goal.current}`, goal.current));
  if (Number.isFinite(val) && val >= 0) {
    goal.current = val;
    save();
    renderProgress();
  }
}

function renderProgress() {
  renderGoals();
  renderWeekBars();
  renderCompareBars();
  renderTimeInvested();
}

function renderGoals() {
  const container = document.getElementById('goals-list');
  if (state.goals.length === 0) {
    container.innerHTML = '<div class="empty-state">No goals yet. Add one! 🎯</div>';
    return;
  }
  container.innerHTML = state.goals.map(g => {
    const pct = Math.max(0, Math.min(100, Math.round((g.current / g.target) * 100)));
    const daysLeft = g.deadline ? Math.max(0, Math.round((new Date(g.deadline) - new Date()) / 86400000)) : null;
    return `
      <div class="goal-item">
        <div class="goal-header">
          <span class="goal-name">${escHtml(g.name)}</span>
          <span class="goal-pct">${pct}%</span>
        </div>
        <div class="goal-bar-wrap"><div class="goal-bar" style="width:${pct}%"></div></div>
        <div class="goal-meta">
          ${g.current} / ${g.target} ${escHtml(g.unit || '')}
          ${daysLeft !== null ? `· ${daysLeft} days left` : ''}
          &nbsp;<button class="goal-update-btn" onclick="updateGoalProgress(${g.id})">Update</button>
        </div>
      </div>
    `;
  }).join('');
}

function renderWeekBars() {
  const container = document.getElementById('week-bars');
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const now = new Date();
  const dayOfWeek = (now.getDay() + 6) % 7; // 0=Mon

  container.innerHTML = days.map((d, i) => {
    const date = new Date(now);
    date.setDate(now.getDate() - dayOfWeek + i);
    const key = localDate(date);
    const score = state.history[key] || 0;
    return `
      <div class="week-bar-wrap">
        <span class="week-bar-val">${score}%</span>
        <div class="week-bar-inner">
          <div class="week-bar-fill" style="height:${score}%"></div>
        </div>
        <span class="week-bar-label">${d}</span>
      </div>
    `;
  }).join('');
}

function renderCompareBars() {
  const m=TimeMetrics.daily(state,todayStr());
  const values=[m.plannedMs,m.workMs,m.distractedMs,m.breakMs].map(n=>Math.round(n/60000));
  const max=Math.max(1,...values);
  document.getElementById('compare-bars').innerHTML=['Planned','Work','Distractions','Breaks'].map((label,i)=>`<div class="compare-bar-row"><span>${label}</span><div class="compare-bar-track"><div class="compare-bar-fill" style="width:${values[i]/max*100}%"></div></div><span>${values[i]} min</span></div>`).join('');
}
function renderTimeInvested() {
  const m=TimeMetrics.daily(state,todayStr());
  setText('total-hours',minsToH(m.workMs/60000));setText('focus-hours',minsToH(m.breakMs/60000));setText('wasted-hours',minsToH(m.distractedMs/60000));
}

function taskDuration(t) {
  const [sh,sm] = t.start.split(':').map(Number);
  const [eh,em] = t.end.split(':').map(Number);
  return Math.max(0, (eh*60+em) - (sh*60+sm));
}

function minsToH(m) { return (m / 60).toFixed(1) + 'h'; }

// ═══════════════════════════════════════
// FUEL — Grok-style Full-Screen Slideshow Engine
// ═══════════════════════════════════════
let fuelFilterTag = 'all';
let fuelIndex = 0;
let fuelTimer = null;
const FUEL_SLIDE_DURATION = 8000; // 8 seconds per slide

function getFuelQuotes() {
  if (fuelFilterTag === 'all') return QUOTES;
  return QUOTES.filter(q => q.tag === fuelFilterTag);
}

function fuelFilter(tag, btn) {
  fuelFilterTag = tag;
  fuelIndex = 0;
  document.querySelectorAll('.fuel-pill').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderFuelSlide();
}

function fuelPrev() {
  const list = getFuelQuotes();
  if (!list.length) return;
  fuelIndex = (fuelIndex - 1 + list.length) % list.length;
  renderFuelSlide();
}

function fuelNext() {
  const list = getFuelQuotes();
  if (!list.length) return;
  fuelIndex = (fuelIndex + 1) % list.length;
  renderFuelSlide();
}

function fuelGoTo(idx) {
  const list = getFuelQuotes();
  if (idx >= 0 && idx < list.length) {
    fuelIndex = idx;
    renderFuelSlide();
  }
}

function resetFuelTimer() {
  if (fuelTimer) {
    clearTimeout(fuelTimer);
    fuelTimer = null;
  }
  const fill = document.getElementById('fuel-progress-fill');
  if (fill) {
    fill.classList.remove('running');
    void fill.offsetWidth; // force reflow
    fill.classList.add('running');
  }
  fuelTimer = setTimeout(() => {
    fuelNext();
  }, FUEL_SLIDE_DURATION);
}

function renderFuelSlide() {
  const list = getFuelQuotes();
  if (!list.length) return;
  if (fuelIndex >= list.length) fuelIndex = 0;
  const q = list[fuelIndex];

  const stage      = document.getElementById('fuel-stage');
  const slideInner = document.querySelector('.fuel-slide-inner');
  const labelEl    = document.getElementById('fuel-label');
  const quoteEl    = document.getElementById('fuel-quote');
  const avatarEl   = document.getElementById('fuel-avatar');
  const nameEl     = document.getElementById('fuel-author-name');
  const titleEl    = document.getElementById('fuel-author-title');
  const counterEl  = document.getElementById('fuel-counter');
  const dotsEl     = document.getElementById('fuel-dots');

  if (!quoteEl) return;

  // Set ambient dynamic glow color
  const glow1 = q.glow || '#6C63FF';
  const glow2 = q.glow2 || '#FF6B9D';
  if (stage) {
    stage.style.setProperty('--glow-color', glow1);
    stage.style.setProperty('--glow-color2', glow2);
  }

  // Populate data
  labelEl.textContent   = `${q.company || 'TECH TITAN'} · WISDOM`;
  quoteEl.textContent   = q.text;
  avatarEl.textContent  = q.emoji || '⚡';
  avatarEl.style.boxShadow = `0 0 25px ${glow1}55`;
  nameEl.textContent    = q.author;
  titleEl.textContent   = q.title || 'Pioneer';

  // Counter
  if (counterEl) {
    counterEl.textContent = `${fuelIndex + 1} / ${list.length}`;
  }

  // Dots
  if (dotsEl) {
    dotsEl.innerHTML = list.map((_, i) => `
      <button class="fuel-dot ${i === fuelIndex ? 'active' : ''}" onclick="fuelGoTo(${i})" title="Go to quote ${i + 1}"></button>
    `).join('');
  }

  // Re-trigger slide animation
  if (slideInner) {
    slideInner.style.animation = 'none';
    void slideInner.offsetWidth; // trigger reflow
    slideInner.style.animation = 'enter 0.55s cubic-bezier(.4,0,.2,1) both';
  }

  // Restart auto-progress bar
  resetFuelTimer();
}

function renderQuotes() {
  renderFuelSlide();
}

// Dashboard mini quote widget
function nextQuote() {
  state.currentQuoteIdx = (state.currentQuoteIdx + 1) % QUOTES.length;
  renderMainQuote();
}

function renderMainQuote() {
  const q = QUOTES[state.currentQuoteIdx] || QUOTES[0];
  const avatarEl = document.getElementById('quote-avatar');
  const textEl   = document.getElementById('main-quote-text');
  const authorEl = document.getElementById('main-quote-author');
  if (!textEl) return;
  if (avatarEl) avatarEl.textContent = q.emoji;
  textEl.textContent   = `"${q.text}"`;
  if (authorEl) authorEl.textContent = `— ${q.author} (${q.company || q.title || ''})`;
}

// ═══════════════════════════════════════
// TICKER
// ═══════════════════════════════════════
function renderTicker() {
  const el = document.getElementById('quote-ticker-text');
  const shuffled = [...QUOTES].sort(() => Math.random() - 0.5).slice(0, 8);
  const text = shuffled.map(q => `✦ "${q.text}" — ${q.author}`).join('    ');
  el.textContent = text + '    ' + text; // double for seamless loop
}

// ═══════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════
function updateDashboard() {
  const today = todayStr();
  const dayTasks = state.tasks.filter(t => t.date === today && t.category !== 'break' && t.status !== 'rescheduled');

  const metrics=TimeMetrics.daily(state,today);
  const done=metrics.done, skip=metrics.missed, total=metrics.total, pct=metrics.completion;

  // Update sidebar score
  const sideScore = document.getElementById('sidebar-score');
  if (sideScore) sideScore.textContent = pct + '%';

  // Ring
  const circumference = 502;
  const offset = circumference - (circumference * pct / 100);
  const ring = document.getElementById('ring-fill');
  if (ring) ring.style.strokeDashoffset = offset;
  const ringPct = document.getElementById('ring-pct');
  if (ringPct) ringPct.textContent = pct + '%';

  // Stat counts
  setText('done-count', done);
  setText('procrastinated-count', skip);
  setText('pending-count', metrics.pending);

  // Save score to history
  rebuildHistory();
  save();

  // Current task
  updateCurrentTask();

  // Upcoming
  renderUpcoming();

  // Heatmap
  renderHeatmap();

  // Streak
  computeStreak();
  updateOverviewMetrics();
  renderWork();
  renderDailySummary();
  renderCarryForward();
}

function updateCurrentTask() {
  const now = new Date();
  const currentMins = now.getHours() * 60 + now.getMinutes();
  const today = todayStr();

  const active = state.tasks.find(t => {
    if (t.date !== today || t.status !== 'pending') return false;
    const [sh,sm] = t.start.split(':').map(Number);
    const [eh,em] = t.end.split(':').map(Number);
    const startMins = sh * 60 + sm;
    const endMins   = eh * 60 + em;
    return currentMins >= startMins && currentMins < endMins;
  });

  const titleEl = document.getElementById('current-task-title');
  const descEl  = document.getElementById('current-task-desc');
  const linksEl = document.getElementById('current-links');
  const pillEl  = document.getElementById('current-block-label');

  if (active) {
    if (titleEl) titleEl.textContent = active.name;
    if (descEl)  descEl.textContent  = active.desc || 'Focus up. You got this.';
    if (pillEl)  pillEl.textContent  = `${active.start} – ${active.end} · ${active.name}`;
    if (linksEl) linksEl.innerHTML = active.links.filter(l => /^https?:\/\//i.test(l)).map(l => `<a href="${escAttr(l)}" target="_blank" rel="noopener noreferrer">${escHtml(shortUrl(l))} ↗</a>`).join('');
    window._activeTaskId = active.id;
  } else {
    if (titleEl) titleEl.textContent = 'One thing at a time.';
    if (descEl)  descEl.textContent  = 'Give yourself 25 quiet minutes. A small start can change the whole day.';
    if (pillEl)  pillEl.textContent  = 'Your next small step starts here';
    if (linksEl) linksEl.innerHTML   = '';
    window._activeTaskId = null;
  }
  document.getElementById('current-actions').hidden = !active;
}

function markCurrentDone() {
  if (!window._activeTaskId) return;
  setTaskStatus(window._activeTaskId, 'done');
}

function markCurrentSkipped() {
  if (!window._activeTaskId) return;
  setTaskStatus(window._activeTaskId, 'skipped');
}

function renderUpcoming() {
  const now = new Date();
  const currentMins = now.getHours() * 60 + now.getMinutes();
  const today = todayStr();

  const upcoming = state.tasks
    .filter(t => {
      if (t.date !== today) return false;
      const [sh,sm] = t.start.split(':').map(Number);
      return ['pending','partial'].includes(t.status);
    })
    .sort((a,b) => a.start.localeCompare(b.start))
    .slice(0, 4);

  const container = document.getElementById('upcoming-list');
  if (!container) return;

  if (upcoming.length === 0) {
    container.innerHTML = '<div class="schedule-empty"><svg class="icon"><use href="#i-calendar"/></svg><h3>A little room for possibility.</h3><p>No upcoming blocks. Give your next good intention a place in your day.</p></div>';
    return;
  }
  container.innerHTML = upcoming.map(t => `
    <div class="upcoming-item cat-${escAttr(t.category)}"><span class="schedule-marker"></span><div class="schedule-copy"><span class="upcoming-title">${escHtml(t.name)}</span><span class="upcoming-time">${formatTime(t.start)} – ${formatTime(t.end)}</span></div><span class="schedule-duration">${escHtml(taskLabel(t))}</span><button class="text-button" onclick="startWork(${t.id})">Start ↗</button></div>
  `).join('');
}

function renderHeatmap() {
  const container = document.getElementById('heatmap-grid');
  if (!container) return;
  const cells = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = localDate(d);
    const score = state.history[key] || 0;
    const level = score === 0 ? (TimeMetrics.daily(state,key).workMs>0?1:0) : score < 25 ? 1 : score < 50 ? 2 : score < 75 ? 3 : 4;
    cells.push(`<div class="hm-cell${i === 0 ? ' today' : ''}" data-level="${level}" tabindex="0" aria-label="${key}: ${score}% completed" title="${key}: ${score}% completed"></div>`);
  }
  container.innerHTML = cells.join('');
}

function computeStreak() {
  let streak = 0;
  const d = new Date();
  const active=date=>{const m=TimeMetrics.daily(state,date);return m.done>0||m.workMs>0||(state.history[date]||0)>0;};
  if (!active(todayStr())) d.setDate(d.getDate() - 1);
  while (true) {
    const key = localDate(d);
    if (active(key)) { streak++; d.setDate(d.getDate() - 1); }
    else break;
  }
  state.streak = streak;
  const el = document.getElementById('streak-count');
  if (el) el.textContent = streak;
}

// ═══════════════════════════════════════
// AI COACH
// ═══════════════════════════════════════
function openAIMotivator(context) {
  openModal('modal-ai');
  if (context === 'skip') {
    setTimeout(() => {
      const r = randomFrom(AI_RESPONSES.skip);
      appendAIMessage(r, 'bot');
    }, 600);
  }
}

function sendToAI() {
  const input = document.getElementById('ai-input');
  const msg = input.value.trim();
  if (!msg) return;

  appendAIMessage(msg, 'user');
  input.value = '';

  // Show typing
  const chatEl = document.getElementById('ai-chat');
  const typingId = 'typing-' + Date.now();
  chatEl.insertAdjacentHTML('beforeend', `
    <div class="ai-msg ai-msg-bot" id="${typingId}">
      <div class="ai-avatar">🤖</div>
      <div class="ai-typing">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>
  `);
  chatEl.scrollTop = chatEl.scrollHeight;

  // Choose response
  const lower = msg.toLowerCase();
  let pool;
  if (/elon|musk|100 hour|brain hurt|outsmart|outwork/.test(lower)) pool = AI_RESPONSES.musk;
  else if (/skip|skipped|miss|missed/.test(lower))          pool = AI_RESPONSES.skip;
  else if (/lazy|tired|can't|cant|don't|dont/.test(lower)) pool = AI_RESPONSES.lazy;
  else if (/procrastinat/.test(lower))                  pool = AI_RESPONSES.procrastinate;
  else if (/motivat|inspire|push|goal/.test(lower))     pool = AI_RESPONSES.motivation;
  else                                                   pool = AI_RESPONSES.general;

  setTimeout(() => {
    document.getElementById(typingId)?.remove();
    appendAIMessage(randomFrom(pool), 'bot');
  }, 1200 + Math.random() * 800);
}

function appendAIMessage(text, role) {
  const chatEl = document.getElementById('ai-chat');
  if (!chatEl) return;
  const isUser = role === 'user';
  chatEl.insertAdjacentHTML('beforeend', `
    <div class="ai-msg ${isUser ? 'ai-msg-user' : 'ai-msg-bot'}">
      <div class="ai-avatar">${isUser ? '😤' : '🤖'}</div>
      <div class="ai-bubble">${escHtml(text)}</div>
    </div>
  `);
  chatEl.scrollTop = chatEl.scrollHeight;
}

// ═══════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════
function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function escAttr(s) {
  return String(s).replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function shortUrl(url) {
  try { return new URL(url).hostname.replace('www.',''); } catch { return url; }
}

// Focus sessions use a wall-clock deadline so background tabs do not lose time.
const FOCUS_SECONDS = 25 * 60;
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 4200);
}
const POMODORO_MODES = { focus: { seconds:1500, label:'Focus' }, short: { seconds:300, label:'Short break' }, long: { seconds:900, label:'Long break' } };
function focusMode() { return POMODORO_MODES[state.focus.mode] ? state.focus.mode : 'focus'; }
function nextFocusMode() { return focusMode()==='focus' ? ((state.focus.rounds||0)%4===0 ? 'long':'short') : 'focus'; }
function selectFocusMode(mode) {
  if (!POMODORO_MODES[mode]) return;
  if(state.workSession&&!state.workSession.endedAt&&!state.workSession.pausedAt&&mode!=='focus'){showToast('Finish and reflect on your task before switching to a break.');return;}
  if (state.focus.endAt) { showToast('Pause the timer before switching modes.'); return; }
  state.focus={mode,remaining:POMODORO_MODES[mode].seconds,endAt:null,completed:false,rounds:state.focus.rounds||0};
  save(); renderFocus();
}
function toggleFocus() {
  // Settle a deadline before handling a click, even when the tab was asleep.
  renderFocus();
  if (state.focus.endAt) {
    if (state.focus.segmentStart) (state.focus.intervals ||= []).push([state.focus.segmentStart,Date.now()]);
    state.focus.segmentStart=null;
    state.focus.remaining=Math.max(0,Math.ceil((state.focus.endAt-Date.now())/1000)); state.focus.endAt=null;
  } else {
    if (state.focus.completed || state.focus.remaining<=0) selectFocusMode(nextFocusMode());
    state.focus.segmentStart=Date.now();
    state.focus.endAt=Date.now()+state.focus.remaining*1000;
    if (state.workSession && focusMode()==='focus') state.focus.overlapsWork=true;
  }
  save(); renderFocus();
}
function resetFocus() {
  if(state.workSession?.pomodoro&&!state.workSession.endedAt){finishWork();return;}
  const mode=focusMode(), rounds=state.focus.rounds||0;
  state.focus={mode,rounds,remaining:POMODORO_MODES[mode].seconds,endAt:null,completed:false};
  save(); renderFocus(); showToast('Timer reset. Start when you’re ready.');
}
function renderFocus() {
  const mode=focusMode(), settings=POMODORO_MODES[mode];
  const remaining=state.focus.endAt?Math.max(0,Math.ceil((state.focus.endAt-Date.now())/1000)):state.focus.remaining;
  if (state.focus.endAt && remaining===0) {
    const finishedAt=state.focus.endAt, overlapsWork=Boolean(state.focus.overlapsWork);
    const rounds=(state.focus.rounds||0)+(mode==='focus'?1:0);
    const intervals=state.focus.segmentStart ? [...(state.focus.intervals||[]),[state.focus.segmentStart,finishedAt]] : null;
    state.focus={mode,rounds,remaining:0,endAt:null,completed:true};
    if (mode==='focus' || intervals) state.focusSessions.push({date:localDate(new Date(finishedAt)),minutes:settings.seconds/60,overlapsWork,mode,...(intervals?{intervals}:{})});
    if (mode==='focus' && state.workSession?.pomodoro && !state.workSession.endedAt) {state.workSession.endedAt=finishedAt;finishWork();}
    save(); updateOverviewMetrics();
    showToast(mode==='focus'?'Focus complete. Take a well-earned break.':'Break complete. Ready for another small step?');
  }
  const running=Boolean(state.focus.endAt);
  setText('focus-time',`${String(Math.floor(remaining/60)).padStart(2,'0')}:${String(remaining%60).padStart(2,'0')}`);
  setText('focus-button-label',running?'Pause':state.focus.completed?`Start ${POMODORO_MODES[nextFocusMode()].label.toLowerCase()}`:remaining<settings.seconds?'Resume':`Start ${settings.label.toLowerCase()}`);
  setText('focus-play-icon',running?'Ⅱ':'▶');
  setText('focus-state',state.focus.completed?'SESSION COMPLETE':running?settings.label.toUpperCase():remaining<settings.seconds?'PAUSED':settings.label.toUpperCase());
  setText('pomodoro-rounds',`${state.focus.rounds||0} focus sessions · long break after every 4`);
  setText('pomodoro-mode-label',`${settings.seconds/60} MIN ${settings.label.toUpperCase()}`);
  document.getElementById('focus-ring').style.strokeDashoffset=666*(1-remaining/settings.seconds);
  document.getElementById('focus-toggle').setAttribute('aria-pressed',String(running));
  for (const key of Object.keys(POMODORO_MODES)) {
    const button=document.getElementById('pomodoro-'+key); if (!button) continue;
    button.setAttribute('aria-pressed',String(key===mode)); button.disabled=running;
  }
}
function updateOverviewMetrics() {
  const today = todayStr();
  const tasks = state.tasks.filter(t => t.date === today && t.category !== 'break' && t.status !== 'rescheduled');
  const done = tasks.filter(t => t.status === 'done').length;
  const pct = tasks.length ? done / tasks.length * 100 : 0;
  setText('task-total', tasks.length);
  setText('completion-note', done ? `${done} small win${done === 1 ? '' : 's'}` : 'A clean slate');
  document.getElementById('completion-fill').style.width = `${pct}%`;
  document.getElementById('sidebar-progress-fill').style.width = `${pct}%`;
  const dailyWorkMs=TimeMetrics.daily(state,today).workMs;
  const minutes = Math.floor(dailyWorkMs / 60000);
  setText('daily-focus', minutes >= 60 ? (minutes / 60).toFixed(1) : minutes===0&&dailyWorkMs>0 ? '<1' : minutes);
  setText('daily-focus-unit', minutes >= 60 ? 'hrs' : 'min');
  setText('dashboard-streak', state.streak);
  setText('streak-note', state.streak ? 'Consistency looks good on you' : 'Your next chapter starts today');
  let activeDays = 0;
  for (let i = 0; i < 30; i++) {
    const date = new Date(); date.setDate(date.getDate() - i);
    if (TimeMetrics.daily(state,localDate(date)).workMs>0 || state.history[localDate(date)]>0) activeDays++;
  }
  setText('active-days', activeDays);
  document.getElementById('streak-week').innerHTML = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(); date.setDate(date.getDate() - 6 + i);
    const complete = state.history[localDate(date)] > 0 || TimeMetrics.daily(state,localDate(date)).workMs>0;
    const label = date.toLocaleDateString([], { weekday: 'short' });
    return `<span class="${complete ? 'complete' : ''}" title="${label}: ${complete ? 'active' : 'no completed tasks'}">${complete ? '✓' : label[0]}</span>`;
  }).join('');
}

// The active work session is deliberately independent of the optional Pomodoro timer.
function workElapsed(session, now = Date.now()) {
  if (!session) return 0;
  const stop = session.endedAt || session.pausedAt || now;
  return Math.max(0, stop - session.startedAt - (session.pausedMs || 0));
}
function clockDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60].map(n => String(n).padStart(2, '0')).join(':');
}
function durationLabel(ms) {
  const seconds = Math.floor(ms / 1000);
  return seconds < 60 ? `${seconds} sec` : `${Math.floor(seconds / 60)} min${seconds % 60 ? ` ${seconds % 60} sec` : ''}`;
}
function workComparison(session) {
  const actual = workElapsed(session);
  const planned = (session.plannedMinutes || 0) * 60000;
  const difference = actual - planned;
  return { actualMs: actual, plannedMs: planned, differenceMs: difference,
    label: !session.plannedMinutes ? 'No time target — recorded work only' : Math.abs(difference) < 1000 ? 'Right on your planned time' : `${durationLabel(Math.abs(difference))} ${difference > 0 ? 'over' : 'under'} your planned time` };
}
function renderWork() {
  const session = state.workSession;
  const picker = document.getElementById('work-picker');
  if (!picker) return;
  picker.hidden = Boolean(session);
  document.getElementById('work-running-title').hidden = !session;
  document.getElementById('work-start').hidden = Boolean(session);
  document.getElementById('work-pause').hidden = !session || Boolean(session.endedAt);
  document.getElementById('work-finish').hidden = !session;
  setText('work-elapsed', clockDuration(workElapsed(session)));
  setText('work-status', !session ? 'READY WHEN YOU ARE' : session.endedAt ? 'ONE LAST REFLECTION' : session.pausedAt ? 'TAKING A BREATHER' : 'YOU’RE WORKING ON');
  setText('work-title', session?.taskName || '');
  setText('work-started', session ? `Started ${new Date(session.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · ${session.plannedMinutes ? session.plannedMinutes+' min planned' : 'No time limit'}` : '');
  setText('work-caption', session?.endedAt ? 'Timer stopped. Your reflection is waiting to be saved.' : session?.pausedAt ? 'Paused. Rest time is excluded from your work log.' : session ? 'Tracking automatically, even if you switch pages.' : 'Time starts when you do. Pauses don’t count.');
  setText('work-pause', session?.pausedAt ? 'Resume' : 'Pause');
  setText('work-finish', session?.endedAt ? 'Finish your reflection ↗' : 'Finish & reflect ↗');
  const select = document.getElementById('work-task');
  const selected = select.value;
  const pending = state.tasks.filter(t => t.date === todayStr() && t.category!=='break' && ['pending','partial'].includes(t.status)).sort((a,b) => a.start.localeCompare(b.start));
  const options = '<option value="">Something else / a new task</option>' + pending.map(t => `<option value="${t.id}">${escHtml(t.name)} · ${formatTime(t.start)}</option>`).join('');
  if (select.innerHTML !== options) {
    select.innerHTML = options;
    select.value = pending.some(t => String(t.id) === selected) ? selected : '';
    selectWorkTask();
  }
  document.getElementById('today-work-list').innerHTML = pending.length ? pending.slice(0, 6).map(t => `<div class="today-work-item"><div><strong>${escHtml(t.name)}</strong><small>${formatTime(t.start)} – ${formatTime(t.end)} · ${taskDuration(t)} min planned</small></div><button class="text-button" onclick="startWork(${t.id})" ${session ? 'disabled' : ''}>Start ↗</button></div>`).join('') : '<div class="schedule-empty"><h3>A small start is enough.</h3><p>Add a task yourself, or let the AI planner map out your day.</p><a class="text-button" href="/planner" data-page="planner">Plan my day ↗</a></div>';
  renderWorkDetails();
  renderReminderNudge();
  renderWorkLessons();
  renderOverviewFeatures();
  const latest = state.workLogs[state.workLogs.length - 1];
  document.getElementById('recent-work-strip').innerHTML = latest ? `<span>LAST SESSION</span><strong>${escHtml(latest.taskName)}</strong><span>${durationLabel(latest.actualMs)} tracked · ${escHtml(latest.where)}</span><a class="text-button" href="/journal" data-page="journal">View work log ↗</a>` : '';
}
function selectWorkTask() {
  const select = document.getElementById('work-task');
  const chosen=state.tasks.find(t=>String(t.id)===select.value);
  if(chosen)document.getElementById('work-expected').value=chosen.expected||'';
  document.getElementById('work-custom').hidden = Boolean(select.value);
  renderWorkDetails();
}
function renderWorkDetails() {
  const session = state.workSession;
  const task = session || state.tasks.find(t => String(t.id) === document.getElementById('work-task').value);
  const links = (task?.links || []).filter(url => /^https?:\/\//i.test(url));
  const el = document.getElementById('work-details');
  el.hidden = !task?.desc && !links.length;
  el.innerHTML = `${task?.desc ? `<p>${escHtml(task.desc)}</p>` : ''}${links.length ? `<div class="work-resource-links">${links.map(url => `<a href="${escAttr(url)}" target="_blank" rel="noopener noreferrer">Open ${escHtml(shortUrl(url))} ↗</a>`).join('')}</div>` : ''}`;
}
function startWork(taskId) {
  if (state.workSession) { showToast('Finish your current session before starting another.'); return; }
  const selected = taskId || Number(document.getElementById('work-task').value);
  let task = state.tasks.find(t => t.id === selected && ['pending','partial'].includes(t.status));
  if(task?.category==='break'){navigateToPage('work');chooseWorkMode('pomodoro');selectFocusMode(taskDuration(task)>=15?'long':'short');return;}
  const now = Date.now();
  let plannedMinutes;
  if (task) plannedMinutes = taskDuration(task);
  else {
    const name = document.getElementById('work-name').value.trim();
    plannedMinutes = Number(document.getElementById('work-planned').value);
    if (!name || !Number.isFinite(plannedMinutes) || plannedMinutes < 0 || plannedMinutes > 1440) { showToast('Name your task. A time target is optional.'); return; }
    // Unscheduled work can cross midnight without inventing a timetable block.
    task = { id: null, name };
  }
  if (state.focus.endAt) state.focus.overlapsWork = true;
  state.workSession = { id: now, taskId: task.id, taskName: task.name, desc: task.desc || '', links: task.links || [], plannedMinutes, startedAt: now, endedAt: null, pausedAt: null, pausedMs: 0, pauseIntervals: [], expected: task.expected || document.getElementById('work-expected').value.trim() };
  save();
  navigateToPage('work');
  renderWork();
}
function pauseWork() {
  const session = state.workSession;
  if (!session || session.endedAt) return;
  if(session.pomodoro&&Boolean(state.focus.endAt)===!Boolean(session.pausedAt))toggleFocus();
  if (session.pausedAt) { (session.pauseIntervals ||= []).push([session.pausedAt,Date.now()]); session.pausedMs += Date.now() - session.pausedAt; session.pausedAt = null; }
  else session.pausedAt = Date.now();
  save(); renderWork();
}
function finishWork() {
  const session = state.workSession;
  if (!session) return;
  if(session.pomodoro&&state.focus.endAt)toggleFocus();
  if (!session.endedAt) {
    const now = Date.now();
    if (session.pausedAt) { (session.pauseIntervals ||= []).push([session.pausedAt,now]); session.pausedMs += now - session.pausedAt; session.pausedAt = null; }
    session.endedAt = now;
    save();
  }
  const comparison = workComparison(session);
  document.getElementById('work-log-summary').innerHTML = `<strong>${escHtml(session.taskName)}</strong><div><span>Started</span><span>${new Date(session.startedAt).toLocaleString()}</span></div><div><span>Finished</span><span>${new Date(session.endedAt).toLocaleString()}</span></div><div><span>Tracked work</span><b>${durationLabel(comparison.actualMs)}</b></div><div><span>Planned</span><span>${session.plannedMinutes ? session.plannedMinutes+' min' : 'No target'}</span></div><p>${comparison.label}${session.pausedMs ? ` · ${durationLabel(session.pausedMs)} paused` : ''}</p>`;
  prepareCorrections(session);
  renderWork(); openModal('modal-work-log');
}
function saveWorkLog() {
  const session = state.workSession;
  if (!session?.endedAt) return;
  const did = document.getElementById('work-did').value.trim();
  const where = document.getElementById('work-where').value.trim();
  if (!did || !where) { showToast('Tell us what you did and where you worked.'); return; }
  if (!applyCorrections(session)) return;
  const outcome = ['done','partial','pending'].includes(document.getElementById('work-outcome').value) ? document.getElementById('work-outcome').value : 'pending';
  const comparison = workComparison(session);
  comparison.actualMs = Math.max(0,comparison.actualMs-(session.distractedMs||0));
  comparison.differenceMs = comparison.actualMs-comparison.plannedMs;
  comparison.label = session.plannedMinutes ? durationLabel(Math.abs(comparison.differenceMs))+' '+(comparison.differenceMs>=0?'over':'under')+' planned work time' : 'No time target';
  state.workLogs.push({ ...session, ...comparison, id: session.id, did, where, outcome, worth: ['yes','partly','no'].includes(document.getElementById('work-worth').value) ? document.getElementById('work-worth').value : 'yes', mistakes: document.getElementById('work-mistakes').value.trim(), lesson: document.getElementById('work-lesson').value.trim(), date: localDate(new Date(session.startedAt)) });
  const task = state.tasks.find(t => t.id === session.taskId);
  if (task) task.status = outcome;
  const todo = state.todos.find(item => item.id === session.todoId);
  if (todo) todo.done = outcome === 'done';
  state.workSession = null;
  save(); closeModal('modal-work-log');
  clearForm(['work-did', 'work-where', 'work-name', 'work-expected', 'work-mistakes', 'work-lesson']);
  document.getElementById('work-worth').value='yes';
  document.getElementById('work-outcome').value='done';
  updateDashboard(); renderWork(); renderJournal();
  showToast('Work logged. Your time comparison is saved automatically.');
}
function renderWorkHistory() {
  const date = document.getElementById('journal-date').value || todayStr();
  const logs = state.workLogs.filter(log => log.startedAt < TimeMetrics.bounds(date)[1] && log.endedAt > TimeMetrics.bounds(date)[0]).slice().reverse();
  const container = document.getElementById('work-history');
  if (!container) return;
  container.innerHTML = logs.length ? `<h2 class="card-title">Your tracked work</h2>` + logs.map(log => `<article class="card work-log-card"><div class="card-heading"><h3>${escHtml(log.taskName)}</h3><span class="small-pill">${durationLabel(log.actualMs)} tracked</span></div><p>${escHtml(log.did)}</p>${reflectionDetails(log)}<div class="work-log-meta"><span>Where: ${escHtml(log.where)}</span><span>${new Date(log.startedAt).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})} → ${new Date(log.endedAt).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</span></div><div class="work-log-meta"><span>${log.plannedMinutes ? log.plannedMinutes+' min planned' : 'No time target'} · ${escHtml(log.label)}</span><span>${log.outcome === 'done' ? 'Completed' : 'More to do'}</span></div></article>`).join('') : '';
}

let plannerDraft = null;
let replanIds = [];
let plannerRevision = null;
let plannerController = null;
let plannerReady = false;
function initPlanner() {
  const preferences = state.plannerPreferences || {};
  const date = document.getElementById('planner-date');
  if (!date.value) {
    date.value = todayStr(); date.min = todayStr();
    document.getElementById('planner-brief').value = preferences.brief || '';
    document.getElementById('planner-detail-context').value = preferences.context || '';
    document.getElementById('planner-start').value = preferences.start || '09:00';
    document.getElementById('planner-end').value = preferences.end || '18:00';
    document.getElementById('planner-energy').value = preferences.energy || 'balanced';
    document.getElementById('planner-focus').value = preferences.focusMinutes || 50;
  }
  updatePlannerContext();
  if (!plannerReady) fetch('/api/config').then(r => r.json()).then(config => { plannerReady = true; setText('planner-connection', config.geminiConfigured ? 'Gemini connected' : 'Gemini setup needed'); }).catch(() => setText('planner-connection', 'Connection unavailable'));
}
function updatePlannerContext() {
  replanIds=[];plannerRevision=null;
  const date = document.getElementById('planner-date').value;
  const count = state.tasks.filter(t => t.date === date && !['skipped','rescheduled'].includes(t.status)).length;
  setText('planner-context', count ? `${count} existing block${count === 1 ? '' : 's'} will be kept in place. Your new plan fits around them.` : 'A clean slate. We’ll include focus time, breaks, and breathing room.');
}
function fillPlannerExample() { document.getElementById('planner-brief').value = 'Study DSA for 90 minutes, make progress on my coding project, and take a 30-minute walk. Keep lunch free from 13:00 to 14:00. Include breaks and leave some breathing room.'; }
function plannerError(message) { const el = document.getElementById('planner-error'); el.textContent = message; el.hidden = !message; }
function cancelDailyPlan() { plannerController?.abort(); }
async function generateDailyPlan() {
  if (plannerController) return;
  plannerError('');
  const date = document.getElementById('planner-date').value;
  const request = {
    date, brief: document.getElementById('planner-brief').value.trim(),
    context: document.getElementById('planner-detail-context').value.trim(),
    start: document.getElementById('planner-start').value, end: document.getElementById('planner-end').value,
    energy: document.getElementById('planner-energy').value, focusMinutes: Number(document.getElementById('planner-focus').value),
    commitments: state.tasks.filter(t => t.date === date && !['skipped','rescheduled'].includes(t.status) && !replanIds.includes(t.id)).map(t => ({name:t.name,start:t.start,end:t.end})),
    goals: document.getElementById('planner-use-goals').checked ? state.goals.slice(0,20).map(g => `${g.name} (${g.current}/${g.target} ${g.unit || ''}${g.deadline ? ', due '+g.deadline : ''})`.slice(0,300)) : []
  };
  try {request.availability=parseAvailability(document.getElementById('planner-windows').value,request.start,request.end);} catch(e){plannerError(e.message);return;}
  if (request.availability.length) { request.start=request.availability[0].start;request.end=request.availability[request.availability.length-1].end; }
  request.sourceTasks=state.tasks.filter(t=>replanIds.includes(t.id)&&t.date===date).map(t=>({id:String(t.id),name:t.name}));
  const originalBrief=request.brief, originalContext=request.context;
  const todos=state.todos.filter(t=>!t.done&&!t.archived&&t.date===date).slice(0,10).map(t=>t.name);
  if(todos.length)request.context=(request.context+'\nTasks to consider today: '+todos.join('; ')).slice(0,500);
  if(plannerRevision) request.brief=('Requested change: '+document.getElementById('planner-revision').value.trim()+'\nOriginal request: '+request.brief.slice(0,1000)+'\nRevise this proposed schedule: '+JSON.stringify(plannerRevision.blocks.map(b=>({name:b.name,start:b.start,end:b.end})))).slice(0,3000);
  if(replanIds.length)request.brief=(request.brief+'\nRearrange these unfinished tasks into the available time: '+state.tasks.filter(t=>replanIds.includes(t.id)).map(t=>t.name).join('; ')).slice(0,3000);
  if (!request.brief || date < todayStr() || request.start >= request.end) { plannerError('Describe your priorities, choose today or a future date, and set a valid time window.'); return; }
  if (date === todayStr()) {
    const now = new Date(), minute = now.getHours()*60+now.getMinutes()+1;
    const currentTime = `${String(Math.floor(minute/60)).padStart(2,'0')}:${String(minute%60).padStart(2,'0')}`;
    if (request.start < currentTime) { plannerError('Your chosen start time has already passed. Choose Remaining today, Tomorrow, or adjust your hours before generating.'); return; }
    if (request.start >= request.end) { plannerError('That time window has already passed. Choose later hours or plan tomorrow.'); return; }
  }
  state.plannerPreferences = { brief: originalBrief, context: originalContext, start: request.start, end: request.end, energy: request.energy, focusMinutes: request.focusMinutes };
  save();
  plannerController = new AbortController();
  document.getElementById('planner-fields').disabled = true;
  document.getElementById('planner-generate').disabled = true;
  document.getElementById('planner-cancel').hidden = false;
  const oldDraft = plannerDraft;
  plannerDraft = null;
  document.getElementById('planner-preview').innerHTML = '<div class="planner-placeholder"><div class="planning-loader">✦</div><h2>Making room for what matters…</h2><p>Gemini is fitting your priorities around your day, with time to breathe.</p></div>';
  try {
    const headers = { 'Content-Type': 'application/json' };
    const response = await fetch('/api/plan', { method:'POST', headers, body:JSON.stringify(request), signal:plannerController.signal });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Planning could not finish. Try again.');
    plannerDraft = { ...result, start: request.start, end: request.end, availability:request.availability, replaceIds:replanIds.slice() };
    plannerRevision=null;
    renderPlannerDraft();
  } catch(error) {
    plannerDraft = oldDraft;
    plannerError(error.name === 'AbortError' ? 'Generation cancelled. Your saved timetable is unchanged.' : error.message);
    if (plannerDraft) renderPlannerDraft();
    else document.getElementById('planner-preview').innerHTML = '<div class="planner-placeholder"><svg class="icon"><use href="#i-spark"/></svg><h2>Let’s try that again.</h2><p>Your timetable hasn’t changed. Adjust your brief or try generating again.</p></div>';
  } finally {
    plannerController = null;
    document.getElementById('planner-fields').disabled = false;
    document.getElementById('planner-generate').disabled = false;
    document.getElementById('planner-cancel').hidden = true;
  }
}
function renderPlannerDraft() {
  const draft = plannerDraft;
  if (!draft) return;
  const categories = {focus:'Focus',learning:'Learning',exercise:'Exercise',break:'Break',social:'Social',admin:'Admin',other:'Other'};
  document.getElementById('planner-refine').hidden=false;
  document.getElementById('planner-preview').innerHTML = `<div class="card-heading"><h2 class="card-title">Your proposed day</h2><span class="small-pill">${escHtml(draft.date)} · Gemini</span></div><p class="planner-summary">${escHtml(draft.summary)}</p><div class="planner-blocks">${draft.blocks.map((block,i) => `<div class="planner-block"><div class="planner-block-top"><span class="planner-block-number">${String(i+1).padStart(2,'0')}</span><input class="input" aria-label="Task ${i+1} name" maxlength="200" value="${escHtml(block.name)}" oninput="editPlanBlock(${i}, 'name', this.value)"/><button class="text-button" onclick="removePlanBlock(${i})" aria-label="Remove task ${i+1}">✕</button></div><div class="planner-block-times"><input class="input" type="time" aria-label="Task ${i+1} start" value="${block.start}" oninput="editPlanBlock(${i}, 'start', this.value)"/><span>→</span><input class="input" type="time" aria-label="Task ${i+1} end" value="${block.end}" oninput="editPlanBlock(${i}, 'end', this.value)"/><select class="input" aria-label="Task ${i+1} category" oninput="editPlanBlock(${i}, 'category', this.value)">${Object.entries(categories).map(([key,label]) => `<option value="${key}" ${block.category===key?'selected':''}>${label}</option>`).join('')}</select></div><p>${escHtml(block.desc)}</p></div>`).join('')}</div>${draft.unscheduled.length?`<div class="planner-unscheduled"><strong>For another day</strong><ul>${draft.unscheduled.map(item=>`<li>${escHtml(item)}</li>`).join('')}</ul></div>`:''}<div class="planner-accept"><p>${draft.replaceIds?.length ? 'Replaces '+draft.replaceIds.length+' unfinished blocks. Completed work stays intact; previous blocks remain in history. Any original task without a replacement returns to Tasks / Later.' : 'Existing tasks stay in place. These new blocks will be added.'}</p><button class="btn btn-primary" onclick="acceptDailyPlan()" ${draft.blocks.length?'':'disabled'}>Apply timetable · ${draft.blocks.length} blocks ↗</button></div>`;
  installTimeControls();
}
function editPlanBlock(index, field, value) { if (plannerDraft?.blocks[index]) plannerDraft.blocks[index][field] = value.trim(); }
function removePlanBlock(index) { plannerDraft?.blocks.splice(index,1); renderPlannerDraft(); }
function acceptDailyPlan() {
  if (!plannerDraft?.blocks.length) return;
  const draft = plannerDraft;
  const blocks = draft.blocks.slice().sort((a,b)=>a.start.localeCompare(b.start));
  if ((draft.replaceIds||[]).some(id=>{const t=state.tasks.find(t=>t.id===id);return !t||t.date!==draft.date||!['pending','partial'].includes(t.status)||state.workSession?.taskId===id;})){plannerError('A task changed or started after this preview. Generate a fresh plan before applying.');return;}
  const existing = state.tasks.filter(t=>t.date===draft.date && !['skipped','rescheduled'].includes(t.status) && !(draft.replaceIds||[]).includes(t.id));
  const validTime = t=>/^([01]\d|2[0-3]):[0-5]\d$/.test(t);
  for (let i=0;i<blocks.length;i++) {
    const block=blocks[i];
    if (!block.name || !validTime(block.start) || !validTime(block.end) || block.start>=block.end || block.start<draft.start || block.end>draft.end) { plannerError('Check your edited task names and times. Keep each block inside the original time window.'); return; }
    if (draft.availability?.length && !draft.availability.some(w=>block.start>=w.start&&block.end<=w.end)){plannerError('Keep each block inside one of your available windows.');return;}
    if ((i && block.start<blocks[i-1].end) || existing.some(t=>block.start<t.end && block.end>t.start)) { plannerError('Some blocks overlap one another or a task added since this plan was generated. Adjust their times first.'); return; }
  }
  const base = Math.max(Date.now(), ...state.tasks.map(t=>Number(t.id)||0)) + 1;
  for(const task of state.tasks)if((draft.replaceIds||[]).includes(task.id)){task.previousStatus=task.status;task.rescheduledAt=Date.now();task.status='rescheduled';task.carryDecision='replanned';}
  const notScheduled=state.tasks.filter(t=>(draft.replaceIds||[]).includes(t.id)&&!blocks.some(b=>String(b.sourceTaskId)===String(t.id)||b.name===t.name));
  for(const t of notScheduled)state.todos.push({id:Math.max(Date.now(),...state.todos.map(x=>x.id||0))+1,name:t.name,notes:t.expected||t.desc||'',date:'',minutes:taskDuration(t),done:false,archived:false,sourceTaskId:t.id});
  replanIds=[];plannerRevision=null;
  state.tasks.push(...blocks.map((block,i)=>({...block,id:base+i,date:draft.date,links:[],status:'pending',source:'gemini',expected:(block.desc.match(/Done when:\s*(.+)/i)?.[1]||'').slice(0,500)})));
  save(); plannerDraft = null;
  document.getElementById('planner-refine').hidden=true;
  document.getElementById('planner-preview').innerHTML = '<div class="planner-placeholder"><h2>Your day is ready.</h2><p>Your blocks are now in the timetable. Head to Work & reflect to start a task.</p><a class="btn btn-primary" href="/work" data-page="work">Start working ↗</a></div>';
  document.getElementById('timetable-date').value=draft.date;
  updateDashboard(); navigateToPage('timetable');
  showToast(`${blocks.length} blocks added. Your day has a little more direction.`);
}

// ═══════════════════════════════════════
// INIT
// ═══════════════════════════════════════
function init() {
  load();
  initWorkflow();

  // Set today's date in pickers
  const today = todayStr();
  const dp1 = document.getElementById('timetable-date');
  const dp2 = document.getElementById('journal-date');
  if (dp1) dp1.value = today;
  if (dp2) dp2.value = today;

  document.querySelectorAll('.modal').forEach((modal, index) => {
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    const heading = modal.querySelector('h2');
    heading.id = `dialog-title-${index}`;
    modal.setAttribute('aria-labelledby', heading.id);
    modal.querySelector('.modal-close')?.setAttribute('aria-label', 'Close dialog');
  });
  document.querySelectorAll('.modal-body label').forEach(label => {
    const control = label.nextElementSibling;
    if (control?.matches('input, textarea, select')) label.htmlFor = control.id;
  });
  document.querySelectorAll('.nav-item').forEach(button => {
    const label = button.querySelector('span')?.textContent.trim() || button.textContent.trim();
    button.title = label;
    button.setAttribute('aria-label', label);
    button.setAttribute('aria-current', button.classList.contains('active') ? 'page' : 'false');
  });
  // Clock
  updateClock();
  setInterval(updateClock, 1000);

  // Quote index
  state.currentQuoteIdx = Math.floor(Math.random() * QUOTES.length);
  renderMainQuote();

  // Ticker
  renderTicker();

  // Dashboard
  updateDashboard();
  setInterval(updateDashboard, 60000); // refresh every minute

  // Render quotes
  // Fuel starts playing only when its tab is open.
  renderFocus();
  setInterval(renderFocus, 1000);

  // Default rating button
  setRating(3);

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
    }
    const dialog = document.querySelector('.modal-overlay.open');
    if (dialog && e.key === 'Tab') {
      const controls = [...dialog.querySelectorAll('button, input:not([type=hidden]), textarea, select, a[href]')].filter(el => !el.disabled);
      const first = controls[0], last = controls[controls.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    if (dialog) return;
    const quotesTab = document.getElementById('tab-quotes');
    if (quotesTab && quotesTab.classList.contains('active')) {
      if (e.key === 'ArrowLeft') {
        fuelPrev();
      } else if (e.key === 'ArrowRight') {
        fuelNext();
      }
    }
  });

  // Touch & swipe navigation for Fuel slideshow
  const fuelStage = document.getElementById('fuel-stage');
  if (fuelStage) {
    let touchStartX = 0;
    let touchEndX = 0;
    fuelStage.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    fuelStage.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 40) {
        if (diff < 0) fuelNext();
        else fuelPrev();
      }
    }, { passive: true });
  }

  setupRouting();
  setInterval(() => {
    if (state.workSession) {
      setText('work-elapsed', clockDuration(workElapsed(state.workSession)));
    }
  }, 1000);
  console.log('SlothMotivate ready.');
}

document.addEventListener('DOMContentLoaded', init);

let editingTodoId = null;
function todoDue(t) { return !t.done && !t.archived && Boolean(t.date) && t.date <= todayStr(); }
function sortedTodos() { return state.todos.filter(t=>!t.done&&!t.archived).slice().sort((a,b)=>(a.date||'9999').localeCompare(b.date||'9999') || a.id-b.id); }
function resetTodoForm() {
  editingTodoId=null; clearForm(['todo-name','todo-notes','todo-date']);
  document.getElementById('todo-minutes').value='';
  document.getElementById('todo-cancel').hidden=true; setText('todo-form-title','Save a thought');
}
function saveTodo() {
  const name=document.getElementById('todo-name').value.trim(), date=document.getElementById('todo-date').value, minutes=Number(document.getElementById('todo-minutes').value);
  if (!name || !Number.isInteger(minutes) || minutes<0 || minutes>1440) { showToast('Name your task. A time target is optional.'); return; }
  if (date && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)))) { showToast('Choose a valid date.'); return; }
  const fields={name,date,minutes,notes:document.getElementById('todo-notes').value.trim()};
  const item=state.todos.find(t=>t.id===editingTodoId);
  if (item) Object.assign(item,fields);
  else state.todos.push({id:Math.max(Date.now(),...state.todos.map(t=>Number(t.id)||0))+1,...fields,done:false,archived:false});
  save(); resetTodoForm(); renderTodos(); renderReminderNudge(); showToast('Saved for later.');
}
function editTodo(id) {
  const item=state.todos.find(t=>t.id===id); if (!item) return;
  editingTodoId=id;
  for (const key of ['name','notes','date','minutes']) document.getElementById('todo-'+key).value=item[key]||'';
  setText('todo-form-title','Edit your task'); document.getElementById('todo-cancel').hidden=false;
  document.getElementById('todo-name').focus(); document.getElementById('todo-name').scrollIntoView?.({block:'center',behavior:'smooth'});
}
function changeTodo(id,action) {
  const t=state.todos.find(t=>t.id===id); if (!t) return;
  if (state.workSession?.todoId===id) { showToast('Finish your current session first.'); return; }
  if (action==='done') t.done=!t.done;
  if (action==='archive') t.archived=!t.archived;
  if (action==='tomorrow') { const d=new Date(); d.setDate(d.getDate()+1); t.date=localDate(d); }
  save(); renderTodos(); renderReminderNudge();
}
function startTodo(id) {
  if (state.workSession) { showToast('Finish your current session first.'); return; }
  const t=state.todos.find(t=>t.id===id&&!t.done&&!t.archived); if (!t) return;
  const now=Date.now(); if (state.focus.endAt) state.focus.overlapsWork=true;
  state.workSession={id:now,taskId:null,todoId:id,taskName:t.name,desc:t.notes||'',links:[],plannedMinutes:t.minutes||0,startedAt:now,endedAt:null,pausedAt:null,pausedMs:0,pauseIntervals:[],expected:t.notes||''};
  save(); navigateToPage('work');
}
function suggestTodo() {
  const all=sortedTodos(), due=all.filter(todoDue), pool=due.length?due:all;
  if (!pool.length) { setText('todo-suggestion-text','Your list is clear. Add something you want to do later.'); return; }
  const t=pool[Math.floor(Math.random()*pool.length)];
  document.getElementById('todo-suggestion-text').innerHTML=`<strong>${escHtml(t.name)}</strong> · ${t.minutes ? t.minutes+' min' : 'No time target'} <button class="text-button" onclick="startTodo(${t.id})">Start this ↗</button>`;
}
function renderTodos() {
  const filter=document.getElementById('todo-filter').value||'open';
  const items=state.todos.filter(t=>filter==='archived'?t.archived:!t.archived&&(filter==='done'?t.done:!t.done&&(filter==='due'?todoDue(t):filter==='later'?!todoDue(t):true))).slice().sort((a,b)=>(a.date||'9999').localeCompare(b.date||'9999'));
  setText('todo-count',`${items.length} items`); setText('todo-suggestion-text','Pick something you’ve been meaning to do.');
  document.getElementById('todo-list').innerHTML=items.length?items.map(t=>`<article class="card todo-item"><div class="card-heading"><h3>${escHtml(t.name)}</h3><span class="small-pill">${t.done?'Completed':t.date?(todoDue(t)?'Due · ':'')+escHtml(t.date):'Someday'}</span></div><p>${escHtml(t.notes||'')}</p><div class="todo-actions"><span>${t.minutes ? t.minutes+' min' : 'No time target'}</span>${!t.done&&!t.archived?`<button class="btn btn-primary" onclick="startTodo(${t.id})">Start ↗</button><button class="text-button" onclick="changeTodo(${t.id},'tomorrow')">Tomorrow</button>`:''}${!t.archived?`<button class="text-button" onclick="changeTodo(${t.id},'done')">${t.done?'Reopen':'Mark done'}</button>`:''}<button class="text-button" onclick="editTodo(${t.id})">Edit</button><button class="text-button" onclick="changeTodo(${t.id},'archive')">${t.archived?'Restore':'Archive'}</button></div></article>`).join(''):'<div class="card todo-item"><h3>A little breathing room.</h3><p>No items in this view. Save a task for later or try another view.</p></div>';
}
function renderReminderNudge() {
  const el=document.getElementById('today-reminders'); if (!el) return;
  const all=sortedTodos(),due=all.filter(todoDue),t=due[0]||all[0];
  el.innerHTML=t?`<div><span class="eyebrow">${due.length?`${due.length} REMINDERS DUE`:'SAVED FOR LATER'}</span><strong>${escHtml(t.name)}</strong></div><button class="text-button" onclick="startTodo(${t.id})">Start ↗</button><a class="text-button" href="/todos" data-page="todos">See your list ↗</a>`:'<a class="text-button" href="/todos" data-page="todos">Something on your mind? Save it for later ↗</a>';
}
function reflectionDetails(log) {
  const worth={yes:'Worthwhile',partly:'Partly worthwhile',no:'Not worthwhile this time'}[log.worth];
  return `${worth?`<p class="reflection-detail"><strong>${worth}</strong></p>`:''}${log.mistakes?`<p class="reflection-detail"><strong>Mistakes / obstacles:</strong> ${escHtml(log.mistakes)}</p>`:''}${log.lesson?`<p class="reflection-detail"><strong>Next time:</strong> ${escHtml(log.lesson)}</p>`:''}`;
}
function renderWorkLessons() {
  const lessons=state.workLogs.filter(l=>l.lesson||l.mistakes).slice(-3).reverse();
  document.getElementById('work-lessons-list').innerHTML=lessons.length?lessons.map(l=>`<div class="lesson-item"><strong>${escHtml(l.taskName)}</strong>${reflectionDetails(l)}</div>`).join(''):'<p>After a session, save a lesson here to remember before your next task.</p>';
}

function setTaskError(message, field) {
  const el=document.getElementById('task-error'); el.textContent=message; el.hidden=!message;
  for (const id of ['task-name','task-start','task-end','task-date']) document.getElementById(id).setAttribute('aria-invalid',String(id===field));
  if (field) document.getElementById(field).focus();
}
function renderOverviewFeatures() {
  const el=document.getElementById('overview-features'); if (!el) return;
  const open=sortedTodos(), due=open.filter(todoDue), logs=state.workLogs.filter(l=>l.date===todayStr());
  const lesson=state.workLogs.slice().reverse().find(l=>l.lesson||l.mistakes);
  const session=state.workSession;
  const cards=[
    {page:'work',path:'/work',label:session?'SESSION IN PROGRESS':'WORK & REFLECT',title:session?session.taskName:`${logs.length} sessions today`,body:session?'Your timer is saved. Continue your task or finish your reflection.':'Start a task, track your time, and capture what you learned.',action:session?'Continue session':'Start working'},
    {page:'todos',path:'/todos',label:'TO-DO & REMINDERS',title:`${open.length} things to do`,body:due.length?`${due.length} reminders due · ${due[0].name}`:'A home for the things you want to come back to.',action:'Open your list'},
    {page:'journal',path:'/journal',label:'REFLECTIONS & LESSONS',title:lesson?'Remember for next time':'Make your progress count',body:lesson?(lesson.lesson||lesson.mistakes):'Your work logs, mistakes, and lessons all have a place here.',action:'Read your journal'},
    {page:'planner',path:'/planner',label:'AI PLANNER',title:'Give your day a little direction',body:`${state.tasks.filter(t=>t.date===todayStr()&&t.source==='gemini').length} AI-planned blocks today. Build a plan around what matters.`,action:'Plan with Gemini'}
  ];
  el.innerHTML=cards.map(c=>`<a class="card overview-feature" href="${c.path}" data-page="${c.page}"><span class="eyebrow">${c.label}</span><h2>${escHtml(c.title)}</h2><p>${escHtml(c.body)}</p><span class="text-button">${c.action} ↗</span></a>`).join('');
}

function renderLocalStorage() {
  const select=document.getElementById('local-workspace'); if (!select) return;
  const keys=['sm_state'];
  for (let i=0;i<localStorage.length;i++) { const key=localStorage.key(i); if (key?.startsWith('sm_state:')) keys.push(key); }
  select.innerHTML=keys.map((key,index)=>`<option value="${escAttr(key)}">${index===0?'This browser’s workspace':`Previously cached account ${index}`}</option>`).join('');
  select.value=activeStorageKey;
}
function useLocalWorkspace() {
  if (state.workSession || state.focus.endAt) { showToast('Finish your work session and pause the Pomodoro timer before switching.'); return; }
  const key=document.getElementById('local-workspace').value;
  if (key!=='sm_state' && !key.startsWith('sm_state:')) return;
  const raw=localStorage.getItem(key); if (!raw) { showToast('No saved entries in that workspace yet.'); return; }
  try {
    const data=JSON.parse(raw);
    if (!Array.isArray(data.tasks)) throw new Error('Invalid workspace');
    activeStorageKey=key; localStorage.setItem('sm_local_workspace',key);
    state={...state,tasks:[],todos:[],journal:[],goals:[],history:{},workLogs:[],focusSessions:[],workSession:null,focus:{remaining:1500,endAt:null,completed:false},...data};
    updateDashboard(); renderFocus(); showToast('Local workspace loaded. Nothing was sent to Supabase.');
  } catch { showToast('This saved workspace could not be loaded. Your data is unchanged.'); }
}
function exportLocalWorkspace() {
  const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob), link=document.createElement('a');
  link.href=url; link.download=`slothmotivate-${todayStr()}.json`; link.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

function setPlannerDay(choice) {
  const now=new Date();
  if (choice==='tomorrow') {
    now.setDate(now.getDate()+1); document.getElementById('planner-date').value=localDate(now);
  } else {
    const minutes=now.getHours()*60+now.getMinutes()+1;
    if (minutes>1424) { plannerError('There is less than 15 minutes left today. Choose Tomorrow.'); return; }
    document.getElementById('planner-date').value=localDate(now);
    document.getElementById('planner-start').value=`${String(Math.floor(minutes/60)).padStart(2,'0')}:${String(minutes%60).padStart(2,'0')}`;
    if (document.getElementById('planner-end').value<=document.getElementById('planner-start').value) document.getElementById('planner-end').value='23:59';
  }
  plannerError(''); updatePlannerContext(); syncTimeControls();
  return true;
}

// Daily workflow: old records remain readable; new fields are additive.
let editingTaskId=null;
let workflowDate=null;
function formatTime(time) { const [h,m]=String(time).split(':').map(Number);return `${h%12||12}:${String(m||0).padStart(2,'0')} ${h>=12?'PM':'AM'}`; }
function taskLabel(t) {
  if(t.status==='done')return 'Completed';if(t.status==='partial')return 'Partly completed';if(t.status==='rescheduled')return 'Rescheduled';if(t.status==='skipped')return 'Skipped';
  return +new Date(t.date+'T'+t.end)<Date.now()?'Missed':'Planned';
}
function chooseScheduleDay(date){document.getElementById('timetable-date').value=date;renderTimetable();}
function shiftScheduleDay(delta){const d=new Date(document.getElementById('timetable-date').value+'T12:00:00');d.setDate(d.getDate()+delta);chooseScheduleDay(localDate(d));}
function editTask(id){const task=state.tasks.find(t=>t.id===id);if(!task)return;openAddTask();editingTaskId=id;for(const [field,key] of Object.entries({name:'name',desc:'desc',expected:'expected',start:'start',end:'end',date:'date',category:'category'}))document.getElementById('task-'+field).value=task[key]||'';document.getElementById('task-links').value=(task.links||[]).join('\n');syncTimeControls();}
function localInputTime(ms){const d=new Date(ms);return localDate(d)+'T'+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')+':'+String(d.getSeconds()).padStart(2,'0');}
function prepareCorrections(s){
  document.getElementById('correct-start').value=localInputTime(s.startedAt);document.getElementById('correct-end').value=localInputTime(s.endedAt);
  document.getElementById('correct-break').value=Number(((s.pausedMs||0)/60000).toFixed(3));document.getElementById('correct-distraction').value=Number(((s.distractedMs||0)/60000).toFixed(3));
  setText('reflection-expected',s.expected?'Expected: '+s.expected:'No expected outcome set. Record what you achieved below.');
  setText('correction-error','');
}
function applyCorrections(s){
  const startValue=document.getElementById('correct-start').value,endValue=document.getElementById('correct-end').value;
  const start=startValue===localInputTime(s.startedAt)?s.startedAt:+new Date(startValue),end=endValue===localInputTime(s.endedAt)?s.endedAt:+new Date(endValue);
  const rawBreak=Number(document.getElementById('correct-break').value),distraction=Number(document.getElementById('correct-distraction').value)*60000;
  const pause=rawBreak===Number(((s.pausedMs||0)/60000).toFixed(3))?(s.pausedMs||0):rawBreak*60000;
  if(!Number.isFinite(start)||!Number.isFinite(end)||!Number.isFinite(pause)||!Number.isFinite(distraction)||start>=end||end>Date.now()+1000||pause<0||distraction<0||pause+distraction>end-start){setText('correction-error','Check your start/end and deductions. Breaks plus distractions cannot exceed the session, and the end cannot be in the future.');return false;}
  if(state.workLogs.some(l=>start<l.endedAt&&end>l.startedAt)){setText('correction-error','These times overlap another work session. Adjust them so work is not counted twice.');return false;}
  if(start!==s.startedAt||end!==s.endedAt||pause!==(s.pausedMs||0)) {s.originalTiming ||= {startedAt:s.startedAt,endedAt:s.endedAt,pausedMs:s.pausedMs};delete s.pauseIntervals;}
  Object.assign(s,{startedAt:start,endedAt:end,pausedMs:pause,distractedMs:distraction});return true;
}
function rebuildHistory(){
  const dates=new Set([todayStr(),...state.tasks.map(t=>t.date),...state.workLogs.map(l=>l.date),...state.focusSessions.map(l=>l.date)]);
  // Include every local day touched by an overnight session.
  for(const l of state.workLogs){const d=new Date(l.startedAt);for(let n=0;n<366&&+d<l.endedAt;n++){dates.add(localDate(d));d.setHours(0,0,0,0);d.setDate(d.getDate()+1);}}
  for(const date of dates){const m=TimeMetrics.daily(state,date);state.history[date]=m.completion;}
}
function renderDailySummary(){
  const el=document.getElementById('daily-accounting');if(!el)return;
  if(workflowDate&&workflowDate!==todayStr()){const old=workflowDate;for(const id of ['timetable-date','journal-date','planner-date','review-date']){const input=document.getElementById(id);if(input?.value===old)input.value=todayStr();}if(!state.focus.endAt)state.focus.rounds=0;}
  workflowDate=todayStr();
  const m=TimeMetrics.daily(state,todayStr());const min=n=>n>0&&n<60000?'<1 min':`${Math.floor(n/60000)} min`;
  el.innerHTML=`<div class="card-heading"><div><div class="eyebrow">AN HONEST LOOK AT TODAY</div><h2>Intention meets reality.</h2></div><a class="text-button" href="/progress" data-page="progress">Review my day ↗</a></div><div class="accounting-grid">${[['Planned',m.plannedMs],['Recorded work',m.workMs],['Reported distractions',m.distractedMs],['Breaks',m.breakMs],['Untracked scheduled time',m.untrackedMs]].map(([label,n])=>`<div><strong>${min(n)}</strong><span>${label}</span></div>`).join('')}</div><p>${m.done} completed · ${m.partial} partly completed · ${m.missed} missed or skipped · ${m.pending} upcoming</p><details><summary>How is this calculated?</summary><p>Work = elapsed tracked time minus pauses and reported distractions. Overlapping timers count once. Completion = completed planned work tasks ÷ planned work tasks; breaks and deliberately rescheduled blocks are excluded. Partial tasks are shown separately. Untracked = elapsed scheduled time without a session, not assumed wasted time. Overnight sessions split at local midnight. Aggregate corrections and distractions are distributed proportionally across a session because their exact timestamps are unknown. Older Pomodoros without timestamps retain their original daily totals. A streak day has a completed task or recorded work; it is not a productivity score.</p></details>`;
}
function carryCandidates(){return state.tasks.filter(t=>t.date<todayStr()&&['pending','partial'].includes(t.status)&&!t.carryDecision&&t.category!=='break');}
function renderCarryForward(){const el=document.getElementById('carry-forward');if(!el)return;const items=carryCandidates();el.hidden=!items.length;el.innerHTML=`<div class="eyebrow">UNFINISHED, NOT FORGOTTEN</div><h2>What comes with you today?</h2><p>Yesterday’s record stays intact. Choose what deserves your attention next.</p>${items.map(t=>`<div class="carry-row"><div><strong>${escHtml(t.name)}</strong><small>${escHtml(t.date)} · ${escHtml(taskLabel(t))}</small></div><div><button class="btn btn-ghost" onclick="carryTask(${t.id},'today')">Today</button><button class="text-button" onclick="carryTask(${t.id},'later')">Later</button><button class="text-button" onclick="carryTask(${t.id},'drop')">Drop</button></div></div>`).join('')}`;const plannerCarry=document.getElementById('planner-carry');if(plannerCarry){plannerCarry.hidden=el.hidden;plannerCarry.innerHTML=el.innerHTML;}}
function carryTask(id,choice){const t=carryCandidates().find(t=>t.id===id);if(!t||!['today','later','drop'].includes(choice))return;t.carryDecision=choice;if(choice!=='drop')state.todos.push({id:Math.max(Date.now(),...state.todos.map(t=>t.id||0))+1,name:t.name,notes:t.expected||t.desc||'',date:choice==='today'?todayStr():'',minutes:taskDuration(t),done:false,archived:false,sourceTaskId:id});save();renderCarryForward();renderTodos();showToast(choice==='drop'?'Removed from carry-forward. History preserved.':'Added to Tasks. AI can include it when you plan.');}
function renderDailyReview(){const el=document.getElementById('daily-review-content');if(!el)return;const date=document.getElementById('review-date').value||todayStr();const m=TimeMetrics.daily(state,date);const logs=state.workLogs.filter(l=>l.startedAt<TimeMetrics.bounds(date)[1]&&l.endedAt>TimeMetrics.bounds(date)[0]);el.innerHTML=`<p>${m.done}/${m.total} planned tasks completed · ${m.partial} partial · ${m.missed} missed or skipped.</p><p>${Math.round(m.plannedMs/60000)} min planned · ${Math.round(m.workMs/60000)} min work · ${Math.round(m.distractedMs/60000)} min distractions.</p>${logs.map(l=>`<article class="review-item"><h3>${escHtml(l.taskName)}</h3><p><b>Expected:</b> ${escHtml(l.expected||'Not set')}</p><p><b>Achieved:</b> ${escHtml(l.did)}</p>${l.mistakes?`<p><b>Obstacle:</b> ${escHtml(l.mistakes)}</p>`:''}${l.lesson?`<p><b>Next time:</b> ${escHtml(l.lesson)}</p>`:''}</article>`).join('')||'<p>No saved work reflections for this day.</p>'}`;document.getElementById('review-improvement').value=state.dailyReviews?.[date]||'';}
function saveDailyReview(){const date=document.getElementById('review-date').value||todayStr();(state.dailyReviews ||= {})[date]=document.getElementById('review-improvement').value.trim();save();showToast('Your next-day improvement is saved.');}
function initWorkflow(){
  workflowDate=todayStr();document.getElementById('review-date').value=todayStr();
  installTimeControls();
  setInterval(()=>{syncTimeControls();if(workflowDate!==todayStr()){updateDashboard();renderTimetable();renderDailyReview();}},1000);
}
// Explicit AM/PM controls keep browser/OS locale from changing the time format.
function installTimeControls(){
  document.querySelectorAll('input[type="time"]').forEach(input=>{
    if(input.dataset.clockReady)return;input.dataset.clockReady='true';input.hidden=true;input.required=false;
    const box=document.createElement('div');box.className='clock-input';
    box.innerHTML=`<select aria-label="Hour">${Array.from({length:12},(_,i)=>`<option value="${i+1}">${i+1}</option>`).join('')}</select><span>:</span><select aria-label="Minute">${Array.from({length:60},(_,i)=>`<option value="${i}">${String(i).padStart(2,'0')}</option>`).join('')}</select><select aria-label="AM or PM"><option>AM</option><option>PM</option></select>`;
    input.after(box);const controls=box.querySelectorAll('select');
    controls.forEach(c=>c.addEventListener('change',()=>{const h=Number(controls[0].value)%12+(controls[2].value==='PM'?12:0);input.value=String(h).padStart(2,'0')+':'+String(controls[1].value).padStart(2,'0');input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));}));
  });syncTimeControls();
}
function syncTimeControls(){document.querySelectorAll('input[data-clock-ready]').forEach(input=>{const controls=input.nextElementSibling?.querySelectorAll('select');if(!controls?.length)return;const [h,m]=(input.value||'09:00').split(':').map(Number);controls[0].value=h%12||12;controls[1].value=m;controls[2].value=h>=12?'PM':'AM';});}
function chooseWorkMode(mode){document.getElementById('stopwatch-panel').hidden=mode!=='stopwatch';document.getElementById('pomodoro-panel').hidden=mode!=='pomodoro';document.querySelectorAll('[data-work-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.workMode===mode)));}

function parseAvailability(raw,start,end){
  if(!raw.trim())return [{start,end}];
  function parse(value){const m=value.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);if(!m||+m[1]<1||+m[1]>12||+(m[2]||0)>59)throw Error('Use times like 10 AM - 1 PM, 4 PM - 6 PM.');return String(+m[1]%12+(m[3].toUpperCase()==='PM'?12:0)).padStart(2,'0')+':'+(m[2]||'00');}
  const windows=raw.split(/[,;\n]/).filter(s=>s.trim()).map(s=>{const pair=s.split(/\s*(?:-|–|—|to)\s*/i);if(pair.length!==2)throw Error('Separate each available window with a comma.');return {start:parse(pair[0]),end:parse(pair[1])};}).sort((a,b)=>a.start.localeCompare(b.start));
  if(windows.length>8||windows.some((w,i)=>w.start>=w.end||(i&&w.start<windows[i-1].end)))throw Error('Use up to eight non-overlapping time windows on the same day.');return windows;
}
function reviseDailyPlan(){if(!plannerDraft||!document.getElementById('planner-revision').value.trim()){plannerError('Describe the change you want first.');return;}plannerRevision=plannerDraft;generateDailyPlan();}
function replanRemainingDay(){
  if(!setPlannerDay('remaining'))return;document.getElementById('planner-windows').value='';
  const date=document.getElementById('planner-date').value;
  replanIds=state.tasks.filter(t=>t.date===date&&['pending','partial'].includes(t.status)&&t.id!==state.workSession?.taskId).map(t=>t.id);
  if(!replanIds.length){plannerError('No unfinished blocks to rearrange. You can still create a new plan.');return;}
  if(!document.getElementById('planner-brief').value.trim())document.getElementById('planner-brief').value='Fit my unfinished tasks into the remaining day, with breaks. Explain anything that cannot fit.';
  setText('planner-context','Preview mode: '+replanIds.length+' unfinished blocks can move. Completed and running work stays in place.');
  generateDailyPlan();
}

function toggleTaskPomodoro(){
  if(state.workSession?.endedAt){finishWork();return;}
  if(focusMode()==='focus'&&!state.workSession&&!state.focus.completed){
    const name=document.getElementById('pomodoro-task-name').value.trim();if(!name){showToast('Name the task you want to focus on.');document.getElementById('pomodoro-task-name').focus();return;}
    document.getElementById('work-task').value='';document.getElementById('work-name').value=name;document.getElementById('work-planned').value='25';startWork();state.workSession.pomodoro=true;chooseWorkMode('pomodoro');
  } else if(focusMode()==='focus'&&state.workSession&&!state.workSession.pomodoro){showToast('Finish your stopwatch session before starting a task Pomodoro.');return;}
  if(state.focus.completed&&nextFocusMode()==='focus'&&!state.workSession){selectFocusMode('focus');toggleTaskPomodoro();return;}
  if(state.workSession?.pomodoro&&!state.workSession.endedAt&&focusMode()==='focus'){const s=state.workSession;if(state.focus.endAt)s.pausedAt=Date.now();else if(s.pausedAt){(s.pauseIntervals ||= []).push([s.pausedAt,Date.now()]);s.pausedMs+=Date.now()-s.pausedAt;s.pausedAt=null;}}
  toggleFocus();save();renderWork();
}
