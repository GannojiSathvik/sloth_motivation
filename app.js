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
let state = {
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
  localStorage.setItem('sm_state', JSON.stringify(state));
}

function load() {
  const raw = localStorage.getItem('sm_state');
  if (raw) {
    const loaded = JSON.parse(raw);
    state = { ...state, ...loaded };
  }
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
  dashboard: { path: '/', title: 'Overview' },
  timetable: { path: '/timetable', title: 'Timetable' },
  journal: { path: '/journal', title: 'Journal' },
  progress: { path: '/progress', title: 'My progress' },
  quotes: { path: '/fuel', title: 'Daily fuel' },
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
    const active = link.dataset.page === page;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  setText('page-breadcrumb', PAGES[page].title);
  document.title = `${PAGES[page].title} — SlothMotivate`;

  if (page === 'dashboard') updateDashboard();
  if (page === 'timetable') renderTimetable();
  if (page === 'journal') renderJournal();
  if (page === 'progress') renderProgress();
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
  const dp = document.getElementById('timetable-date');
  document.getElementById('task-date').value = dp.value || todayStr();
  if (!document.getElementById('tab-timetable').classList.contains('active')) document.getElementById('task-date').value = todayStr();
  openModal('modal-add-task');
}

function saveTask() {
  const name = document.getElementById('task-name').value.trim();
  const start = document.getElementById('task-start').value;
  const end   = document.getElementById('task-end').value;
  const date  = document.getElementById('task-date').value;
  if (!name || !start || !end || !date) {
    alert('Please fill in Name, Start, End, and Date.');
    return;
  }
  if (end <= start) { showToast('Choose an end time after the start time.'); return; }
  const linksRaw = document.getElementById('task-links').value.trim();
  const links = linksRaw ? linksRaw.split('\n').map(l => l.trim()).filter(Boolean) : [];

  state.tasks.push({
    id: Date.now(),
    name,
    desc: document.getElementById('task-desc').value.trim(),
    start,
    end,
    category: document.getElementById('task-category').value,
    links,
    date,
    status: 'pending',
  });
  save();
  closeModal('modal-add-task');
  clearForm(['task-name','task-desc','task-start','task-end','task-links']);
  renderTimetable();
  updateDashboard();
  showToast('Time block added. Make a little room for progress.');
}

function clearForm(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function renderTimetable() {
  const dp = document.getElementById('timetable-date');
  if (!dp.value) dp.value = todayStr();
  const date = dp.value;

  const dayTasks = state.tasks.filter(t => t.date === date);
  const axis  = document.getElementById('time-axis');
  const blocksWrap = document.getElementById('blocks-wrap');
  axis.innerHTML = '';
  blocksWrap.innerHTML = '';

  // Now line
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();

  for (let h = 0; h < 24; h++) {
    const label = document.createElement('div');
    label.className = 'time-axis-label';
    label.textContent = `${String(h).padStart(2,'0')}:00`;
    axis.appendChild(label);

    const row = document.createElement('div');
    row.className = 'hour-row';
    blocksWrap.appendChild(row);
  }

  // Draw task blocks
  dayTasks.forEach(task => {
    const [sh, sm] = task.start.split(':').map(Number);
    const [eh, em] = task.end.split(':').map(Number);
    const startMins = sh * 60 + sm;
    const endMins   = eh * 60 + em;
    const durationMins = endMins - startMins;
    if (durationMins <= 0) return;

    const block = document.createElement('div');
    block.className = `task-block cat-${task.category} status-${task.status}`;
    block.style.top    = (startMins / 60) * 60 + 'px';
    block.style.height = (durationMins / 60) * 60 + 'px';
    block.style.position = 'absolute';

    const statusEmoji = task.status === 'done' ? '✅' : task.status === 'skipped' ? '⛔' : '';
    block.innerHTML = `
      <div class="task-block-name">${statusEmoji} ${escHtml(task.name)}</div>
      <div class="task-block-time">${task.start} – ${task.end}</div>
      <div class="task-block-actions">
        <button class="task-block-btn tbb-done"  onclick="setTaskStatus(${task.id}, 'done')">✅ Done</button>
        <button class="task-block-btn tbb-skip"  onclick="setTaskStatus(${task.id}, 'skipped')">⛔ Skip</button>
        <button class="task-block-btn tbb-del"   onclick="deleteTask(${task.id})">🗑</button>
      </div>
    `;
    blocksWrap.appendChild(block);
  });

  // Draw now line (only for today)
  if (date === todayStr()) {
    const line = document.createElement('div');
    line.className = 'now-line';
    line.style.top = (nowMins / 60) * 60 + 'px';
    blocksWrap.appendChild(line);
  }
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
  const categories = { focus: 'Focus', learning: 'Learning', exercise: 'Exercise', admin: 'Admin' };
  const completed = state.tasks.filter(t => t.date === todayStr() && t.status === 'done');
  const totals = Object.keys(categories).map(category => completed.filter(t => t.category === category).reduce((sum, t) => sum + taskDuration(t), 0));
  const scale = Math.max(60, ...totals);
  document.getElementById('compare-bars').innerHTML = Object.values(categories).map((label, i) => `<div class="compare-bar-row"><span class="compare-bar-label">${label}</span><div class="compare-bar-track"><div class="compare-bar-fill" style="width:${totals[i] / scale * 100}%"></div></div><span class="compare-value">${totals[i]} min</span></div>`).join('');
}

function renderTimeInvested() {
  const done = state.tasks.filter(t => t.status === 'done');
  const skipped = state.tasks.filter(t => t.status === 'skipped');
  const focusDone = done.filter(t => t.category === 'focus' || t.category === 'learning');

  let totalMins = 0, focusMins = 0, wastedMins = 0;
  done.forEach(t => { totalMins += taskDuration(t); });
  focusDone.forEach(t => { focusMins += taskDuration(t); });
  skipped.forEach(t => { wastedMins += taskDuration(t); });

  document.getElementById('total-hours').textContent = minsToH(totalMins);
  document.getElementById('focus-hours').textContent = minsToH(focusMins);
  document.getElementById('wasted-hours').textContent = minsToH(wastedMins);
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
  const dayTasks = state.tasks.filter(t => t.date === today);

  const done  = dayTasks.filter(t => t.status === 'done').length;
  const skip  = dayTasks.filter(t => t.status === 'skipped').length;
  const total = dayTasks.length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

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
  setText('pending-count', total - done - skip);

  // Save score to history
  state.history[today] = pct;
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
      return sh*60+sm > currentMins && t.status === 'pending';
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
    <div class="upcoming-item cat-${escAttr(t.category)}"><span class="schedule-marker"></span><div class="schedule-copy"><span class="upcoming-title">${escHtml(t.name)}</span><span class="upcoming-time">${t.start} – ${t.end}</span></div><span class="schedule-duration">${taskDuration(t)} min</span></div>
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
    const level = score === 0 ? 0 : score < 25 ? 1 : score < 50 ? 2 : score < 75 ? 3 : 4;
    cells.push(`<div class="hm-cell${i === 0 ? ' today' : ''}" data-level="${level}" tabindex="0" aria-label="${key}: ${score}% completed" title="${key}: ${score}% completed"></div>`);
  }
  container.innerHTML = cells.join('');
}

function computeStreak() {
  let streak = 0;
  const d = new Date();
  if (!(state.history[todayStr()] > 0)) d.setDate(d.getDate() - 1);
  while (true) {
    const key = localDate(d);
    const score = state.history[key] || 0;
    if (score > 0) { streak++; d.setDate(d.getDate() - 1); }
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
function toggleFocus() {
  if (state.focus.endAt) {
    state.focus.remaining = Math.max(0, Math.ceil((state.focus.endAt - Date.now()) / 1000));
    state.focus.endAt = null;
  } else {
    if (state.focus.completed || state.focus.remaining <= 0) state.focus = { remaining: FOCUS_SECONDS, endAt: null, completed: false };
    state.focus.endAt = Date.now() + state.focus.remaining * 1000;
  }
  save();
  renderFocus();
}
function resetFocus() {
  state.focus = { remaining: FOCUS_SECONDS, endAt: null, completed: false };
  save();
  renderFocus();
  showToast('A fresh 25 minutes. Start when you’re ready.');
}
function renderFocus() {
  let remaining = state.focus.endAt ? Math.max(0, Math.ceil((state.focus.endAt - Date.now()) / 1000)) : state.focus.remaining;
  if (state.focus.endAt && remaining === 0) {
    const finishedAt = state.focus.endAt;
    state.focus = { remaining: 0, endAt: null, completed: true };
    state.focusSessions.push({ date: localDate(new Date(finishedAt)), minutes: 25 });
    save();
    updateOverviewMetrics();
    showToast('25 minutes, just for you. Session complete — take a breath.');
  }
  setText('focus-time', `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`);
  const running = Boolean(state.focus.endAt);
  setText('focus-button-label', running ? 'Pause session' : state.focus.completed ? 'Start another session' : remaining < FOCUS_SECONDS ? 'Resume session' : 'Start focus session');
  setText('focus-play-icon', running ? 'Ⅱ' : '▶');
  setText('focus-state', running ? 'YOU’RE MAKING SPACE' : state.focus.completed ? 'BEAUTIFULLY DONE' : remaining < FOCUS_SECONDS ? 'TAKE YOUR TIME' : 'A MOMENT FOR YOU');
  document.getElementById('focus-ring').style.strokeDashoffset = 666 * (1 - remaining / FOCUS_SECONDS);
  document.getElementById('focus-toggle').setAttribute('aria-pressed', String(running));
}
function updateOverviewMetrics() {
  const today = todayStr();
  const tasks = state.tasks.filter(t => t.date === today);
  const done = tasks.filter(t => t.status === 'done').length;
  const pct = tasks.length ? done / tasks.length * 100 : 0;
  setText('task-total', tasks.length);
  setText('completion-note', done ? `${done} small win${done === 1 ? '' : 's'}` : 'A clean slate');
  document.getElementById('completion-fill').style.width = `${pct}%`;
  document.getElementById('sidebar-progress-fill').style.width = `${pct}%`;
  const minutes = state.focusSessions.filter(s => s.date === today).reduce((sum, s) => sum + s.minutes, 0);
  setText('daily-focus', minutes >= 60 ? (minutes / 60).toFixed(1) : minutes);
  setText('daily-focus-unit', minutes >= 60 ? 'hrs' : 'min');
  setText('dashboard-streak', state.streak);
  setText('streak-note', state.streak ? 'Consistency looks good on you' : 'Your next chapter starts today');
  let activeDays = 0;
  for (let i = 0; i < 30; i++) {
    const date = new Date(); date.setDate(date.getDate() - i);
    if (state.history[localDate(date)] > 0) activeDays++;
  }
  setText('active-days', activeDays);
  document.getElementById('streak-week').innerHTML = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(); date.setDate(date.getDate() - 6 + i);
    const complete = state.history[localDate(date)] > 0;
    const label = date.toLocaleDateString([], { weekday: 'short' });
    return `<span class="${complete ? 'complete' : ''}" title="${label}: ${complete ? 'active' : 'no completed tasks'}">${complete ? '✓' : label[0]}</span>`;
  }).join('');
}

// ═══════════════════════════════════════
// INIT
// ═══════════════════════════════════════
function init() {
  load();

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
  console.log('SlothMotivate ready.');
}

document.addEventListener('DOMContentLoaded', init);
