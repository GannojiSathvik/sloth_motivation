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
  assert.match(a.element('toast').textContent, /end time after/);
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
