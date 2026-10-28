const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');

function app() {
  const elements = new Map();
  const storage = new Map();
  const location = { pathname: '/' };
  const routeHistory = [];
  const browserWindow = {
    location,
    history: { pushState(data, title, url) { routeHistory.push(url); location.pathname = url; } },
    addEventListener() {}, scrollTo() {}
  };
  const element = id => {
    if (!elements.has(id)) elements.set(id, {
      textContent: '', innerHTML: '', value: '', hidden: false,
      style: { setProperty() {} }, classList: { add() {}, remove() {}, contains() { return false; } },
      setAttribute() {}, appendChild() {}, focus() {}, querySelector() { return null; }
    });
    return elements.get(id);
  };
  const context = vm.createContext({
    console, Date, Math, URL,
    document: { getElementById: element, querySelectorAll: () => [], querySelector: () => null, addEventListener() {}, createElement: () => element(Symbol()), body: { style: {} } },
    window: browserWindow, localStorage: { setItem: (k,v) => storage.set(k,v), getItem: k => storage.get(k) ?? null },
    setTimeout: () => 1, clearTimeout() {}, setInterval() {}, alert() {}
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8'), context);
  return { run: code => vm.runInContext(code, context), element, storage, routeHistory };
}

test('existing saved tasks survive adding focus-session state', () => {
  const a = app();
  a.storage.set('sm_state', JSON.stringify({ tasks: [{ id: 7, name: 'Existing task' }], history: {} }));
  a.run('load()');
  assert.equal(a.run('state.tasks[0].name'), 'Existing task');
  assert.equal(a.run('state.focus.remaining'), 1500);
  assert.equal(a.run('state.focusSessions.length'), 0);
});

test('focus start, pause, resume and reset preserve the right time', () => {
  const a = app();
  a.run('toggleFocus()');
  assert.ok(a.run('state.focus.endAt > Date.now()'));
  a.run('state.focus.endAt = Date.now() + 123000; toggleFocus()');
  assert.equal(a.run('state.focus.endAt'), null);
  assert.ok(a.run('state.focus.remaining >= 122 && state.focus.remaining <= 123'));
  a.run('toggleFocus()');
  assert.ok(a.run('state.focus.endAt - Date.now() <= 123000'));
  a.run('resetFocus()');
  assert.equal(a.element('focus-time').textContent, '25:00');
  assert.equal(a.run('state.focus.endAt'), null);
});

test('an elapsed session is recorded once, even after repeated renders and reload', () => {
  const a = app();
  a.run('state.focus.endAt = Date.now() - 1000; renderFocus(); renderFocus(); load(); renderFocus()');
  assert.equal(a.run('state.focusSessions.length'), 1);
  assert.equal(a.run('state.focusSessions[0].minutes'), 25);
  assert.equal(a.element('daily-focus').textContent, 25);
  assert.equal(a.element('focus-time').textContent, '00:00');
});

test('a late-opened session is credited to the local date it finished', () => {
  const a = app();
  a.run('const finish = new Date(); finish.setDate(finish.getDate() - 1); state.focus.endAt = finish.getTime(); renderFocus()');
  assert.equal(a.run('state.focusSessions[0].date'), a.run('localDate(finish)'));
  assert.equal(a.element('daily-focus').textContent, 0);
});

test('local calendar dates do not use the UTC date near midnight', () => {
  const a = app();
  assert.equal(a.run('localDate(new Date(2026, 9, 27, 0, 15))'), '2026-10-27');
});

test('yesterday’s streak survives until today’s first completed task', () => {
  const a = app();
  a.run('const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1); state.history[localDate(yesterday)] = 75; computeStreak()');
  assert.equal(a.run('state.streak'), 1);
});

test('invalid time ranges cannot create an invisible block', () => {
  const a = app();
  a.element('task-name').value = 'Test';
  a.element('task-start').value = '12:00';
  a.element('task-end').value = '11:00';
  a.element('task-date').value = '2026-10-27';
  a.run('saveTask()');
  assert.equal(a.run('state.tasks.length'), 0);
  assert.match(a.element('task-error').textContent, /end time after/);
});

test('daily balance renders actual completed duration consistently', () => {
  const a = app();
  a.run("state.tasks = [{ date: todayStr(), start: '10:00', end: '11:30', category: 'focus', status: 'done' }]; renderCompareBars()");
  const first = a.element('compare-bars').innerHTML;
  assert.match(first, /90 min/);
  a.run('renderCompareBars()');
  assert.equal(a.element('compare-bars').innerHTML, first);
});

test('each navigation destination has a stable URL, including direct links', () => {
  const a = app();
  for (const [url, page] of [['/', 'dashboard'], ['/timetable', 'timetable'], ['/journal/', 'journal'], ['/progress', 'progress'], ['/fuel', 'quotes']]) {
    assert.equal(a.run(`pageFromPath(${JSON.stringify(url)})`), page);
  }
  assert.equal(a.run("pageFromPath('/missing')"), null);
});

test('navigation updates URL and page title without duplicate history entries', () => {
  const a = app();
  a.run("navigateToPage('journal'); navigateToPage('journal')");
  assert.deepEqual(a.routeHistory, ['/journal']);
  assert.equal(a.run('document.title'), 'Journal — SlothMotivate');
  assert.equal(a.element('page-breadcrumb').textContent, 'Journal');
  a.run("navigateToPage('progress')");
  assert.deepEqual(a.routeHistory, ['/journal', '/progress']);
  assert.equal(a.run('document.title'), 'My progress — SlothMotivate');
});

test('work tracking measures elapsed time and excludes pauses', () => {
  const a = app();
  assert.equal(a.run('workElapsed({startedAt:1000,pausedMs:2000,endedAt:11000})'), 8000);
  assert.equal(a.run('workElapsed({startedAt:1000,pausedMs:1000,pausedAt:6000}, 9000)'), 4000);
  assert.equal(a.run('workElapsed({startedAt:1000,pausedMs:0}, 61000)'), 60000);
});

test('work duration survives crossing midnight and compares to planned minutes', () => {
  const a = app();
  assert.equal(a.run("workComparison({startedAt:new Date(2026,9,27,23,50).getTime(),endedAt:new Date(2026,9,28,0,20).getTime(),pausedMs:300000,plannedMinutes:30}).actualMs"), 1500000);
  assert.match(a.run("workComparison({startedAt:1000,endedAt:601000,pausedMs:0,plannedMinutes:25}).label"), /15 min under/);
});

test('finishing freezes the end time until the work reflection is saved', () => {
  const a = app();
  a.run("state.workSession={id:1,taskId:7,taskName:'Test',plannedMinutes:25,startedAt:Date.now()-60000,pausedMs:0,endedAt:null}; finishWork()");
  const end = a.run('state.workSession.endedAt');
  a.run('finishWork()');
  assert.equal(a.run('state.workSession.endedAt'), end);
  assert.equal(a.run('state.workLogs.length'), 0);
});

test('saving a reflection records work and marks its task once', () => {
  const a = app();
  a.run("state.tasks=[{id:7,name:'Practice',date:todayStr(),start:'09:00',end:'09:25',status:'pending',links:[],category:'focus'}]; state.workSession={id:1,taskId:7,taskName:'Practice',plannedMinutes:25,startedAt:Date.now()-60000,endedAt:Date.now(),pausedMs:0}");
  a.element('work-did').value='Solved one problem';
  a.element('work-where').value='LeetCode';
  a.element('work-outcome').value='done';
  a.run('saveWorkLog(); saveWorkLog()');
  assert.equal(a.run('state.workLogs.length'),1);
  assert.equal(a.run('state.tasks[0].status'),'done');
  assert.equal(a.run('state.workSession'),null);
  assert.equal(a.run('state.workLogs[0].where'),'LeetCode');
});

test('to-do capture persists, snoozes and archives without deleting', () => {
  const a=app(); a.element('todo-name').value='Read chapter'; a.element('todo-minutes').value='20'; a.element('todo-date').value=a.run('todayStr()');
  a.run('saveTodo(); load()'); assert.equal(a.run('state.todos.length'),1); assert.equal(a.run('todoDue(state.todos[0])'),true);
  a.run("changeTodo(state.todos[0].id,'tomorrow')"); assert.equal(a.run('todoDue(state.todos[0])'),false);
  a.run("changeTodo(state.todos[0].id,'archive')"); assert.equal(a.run('sortedTodos().length'),0);
  a.run("changeTodo(state.todos[0].id,'archive')"); assert.equal(a.run('sortedTodos().length'),1);
});
test('saved task starts timing, saves lessons, and completes only after reflection', () => {
  const a=app(); a.run("state.todos=[{id:1,name:'Arrays',notes:'Practice',minutes:25,date:'',done:false,archived:false}]; startTodo(1)");
  assert.equal(a.run('state.workSession.todoId'),1); assert.ok(a.run('state.workSession.startedAt > 0'));
  a.run("changeTodo(1,'archive')"); assert.equal(a.run('state.todos[0].archived'),false);
  a.run('finishWork()'); assert.equal(a.run('state.todos[0].done'),false);
  a.element('work-did').value='Solved a problem'; a.element('work-where').value='Desk'; a.element('work-outcome').value='done';
  a.element('work-worth').value='partly'; a.element('work-mistakes').value='Missed an edge case'; a.element('work-lesson').value='Test empty inputs';
  a.run('saveWorkLog(); load(); renderWorkLessons()');
  assert.equal(a.run('state.todos[0].done'),true); assert.equal(a.run('state.workLogs[0].worth'),'partly');
  assert.match(a.element('work-lessons-list').innerHTML,/Test empty inputs/);
});
test('old work logs render without reflection fields and user lessons are escaped', () => {
  const a=app(); assert.equal(a.run("reflectionDetails({})"),'');
  assert.match(a.run("reflectionDetails({lesson:'<script>bad</script>'})"), /&lt;script&gt;/);
});

test('time-block form supplies valid defaults and explains missing names inline', () => {
  const a=app(); a.run('openAddTask()');
  assert.ok(a.element('task-start').value<a.element('task-end').value);
  assert.ok(a.element('task-date').value);
  a.run('saveTask()'); assert.equal(a.run('state.tasks.length'),0);
  assert.match(a.element('task-error').textContent,/task name/);
  a.element('task-name').value='Practice DP'; a.run('saveTask()');
  assert.equal(a.run('state.tasks.length'),1);
});
test('overview summarizes reminders and reflections and work has its own route', () => {
  const a=app(); a.run("state.todos=[{id:1,name:'Study',date:todayStr(),minutes:25}]; state.workLogs=[{taskName:'DP',lesson:'Check base cases',date:todayStr()}]; renderOverviewFeatures()");
  assert.match(a.element('overview-features').innerHTML,/1 reminders due/);
  assert.match(a.element('overview-features').innerHTML,/Check base cases/);
  assert.equal(a.run("pageFromPath('/work')"),'work');
  assert.equal(a.run('PAGES.dashboard.title'),'Overview');
});

test('Pomodoro offers breaks, excludes break minutes and returns to focus', () => {
  const a=app(); a.run('state.focus.endAt=Date.now()-100; renderFocus(); toggleFocus()');
  assert.equal(a.run('focusMode()'),'short'); assert.equal(a.run('state.focus.rounds'),1);
  a.run('state.focus.endAt=Date.now()-100; renderFocus(); load(); renderFocus()');
  assert.equal(a.run('state.focusSessions.length'),1);
  a.run('toggleFocus()'); assert.equal(a.run('focusMode()'),'focus');
});
test('fourth completed focus offers long break and mode changes cannot discard running time', () => {
  const a=app(); a.run("state.focus.rounds=3; toggleFocus(); selectFocusMode('short')");
  assert.equal(a.run('focusMode()'),'focus');
  a.run('state.focus.endAt=Date.now()-100; renderFocus(); toggleFocus()');
  assert.equal(a.run('focusMode()'),'long'); assert.equal(a.run('state.focus.remaining'),900);
  a.run('toggleFocus(); resetFocus()'); assert.equal(a.run('state.focus.rounds'),4);
});
test('local-only HTML loads no Supabase client or account sign-in form', () => {
  const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
  assert.ok(!html.includes('src="/assets/cloud.js"')); assert.ok(!html.includes('account-google'));
});
