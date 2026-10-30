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
    console, Date, Math, URL, AbortController,
    document: { getElementById: element, querySelectorAll: () => [], querySelector: () => null, addEventListener() {}, createElement: () => element(Symbol()), body: { style: {} } },
    window: browserWindow, localStorage: { setItem: (k,v) => storage.set(k,v), getItem: k => storage.get(k) ?? null },
    setTimeout: () => 1, clearTimeout() {}, setInterval() {}, alert() {}
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../metrics.js'), 'utf8'), context);
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
  assert.equal(a.run('document.title'), 'Progress — SlothMotivate');
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
  a.run('prepareCorrections(state.workSession); saveWorkLog(); saveWorkLog()');
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
  a.run('state.workSession.startedAt-=60000; finishWork()'); assert.equal(a.run('state.todos[0].done'),false);
  a.element('work-did').value='Solved a problem'; a.element('work-where').value='Desk'; a.element('work-outcome').value='done';
  a.element('work-learned').value='Sliding window'; a.element('work-focus').value='mixed'; a.element('work-rating').value='4'; a.element('work-worth').value='partly'; a.element('work-mistakes').value='Missed an edge case'; a.element('work-lesson').value='Test empty inputs';
  a.run('saveWorkLog(); load(); renderWorkLessons()');
  assert.equal(a.run('state.todos[0].done'),true); assert.equal(a.run('state.workLogs[0].worth'),'partly');
  assert.match(a.element('work-lessons-list').innerHTML,/Test empty inputs/); assert.equal(a.run('state.workLogs[0].learned'),'Sliding window'); assert.equal(a.run('state.workLogs[0].rating'),4); assert.equal(a.run('state.workLogs[0].focus'),'mixed');
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
  assert.equal(a.run('PAGES.dashboard.title'),'Dashboard');
});

test('Pomodoro offers breaks, excludes break minutes and returns to focus', () => {
  const a=app(); a.run('state.focus.endAt=Date.now()-100; renderFocus(); toggleFocus()');
  assert.equal(a.run('focusMode()'),'short'); assert.equal(a.run('state.focus.rounds'),1);
  a.run('state.focus.endAt=Date.now()-100; renderFocus(); load(); renderFocus()');
  assert.equal(a.run("state.focusSessions.filter(s=>s.mode==='focus').length"),1);
  assert.equal(a.run("state.focusSessions.filter(s=>s.mode==='short').length"),1);
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


test('planner never silently truncates a full-day request to the remaining afternoon', async () => {
  const a=app();
  a.run("const RealDate=Date; Date=class extends RealDate { constructor(...args) { super(...(args.length?args:[2026,9,28,15,43,0])); } }; var requests=0; fetch=async()=>{requests++; return {ok:true,json:async()=>({date:'2026-10-28',summary:'Plan',blocks:[],unscheduled:[]})};};");
  for (const [id,value] of Object.entries({'planner-date':'2026-10-28','planner-brief':'Plan a student interview preparation day','planner-start':'09:00','planner-end':'18:00','planner-focus':'50'})) a.element(id).value=value;
  await a.run('generateDailyPlan()');
  assert.equal(a.run('requests'),0);
  assert.match(a.element('planner-error').textContent,/already passed|earlier than/);
  assert.equal(a.element('planner-start').value,'09:00');
});

test('custom work starts with only a name, without inventing a time target',()=>{
 const a=app();a.element('work-name').value='Read chapter';a.run('startWork()');assert.equal(a.run('state.workSession.plannedMinutes'),0);assert.equal(a.run('state.workSession.taskName'),'Read chapter');
});
test('carry forward preserves the old result and does not duplicate on repeated clicks',()=>{
 const a=app();a.run("state.tasks=[{id:1,name:'Read',date:'2025-01-01',start:'09:00',end:'10:00',status:'partial',category:'focus'}];carryTask(1,'today');carryTask(1,'today')");
 assert.equal(a.run('state.todos.length'),1);assert.equal(a.run('state.tasks[0].status'),'partial');assert.equal(a.run('state.tasks[0].date'),'2025-01-01');assert.equal(a.run('state.todos[0].date'),a.run('todayStr()'));
});
test('corrections reject impossible deductions and retain original timing',()=>{
 const a=app();a.run('state.workSession={startedAt:Date.now()-3600000,endedAt:Date.now(),pausedMs:0,pauseIntervals:[]};prepareCorrections(state.workSession)');
 a.element('correct-break').value='70';assert.equal(a.run('applyCorrections(state.workSession)'),false);
 a.element('correct-break').value='10';a.element('correct-distraction').value='5';assert.equal(a.run('applyCorrections(state.workSession)'),true);assert.equal(a.run('state.workSession.pausedMs'),600000);assert.ok(a.run('state.workSession.originalTiming'));
});
test('availability supports 12-hour windows, rejects overlaps, and formats midnight correctly',()=>{
 const a=app();assert.equal(a.run("parseAvailability('10 AM - 1 PM, 4 PM - 6 PM')[1].start"),'16:00');assert.throws(()=>a.run("parseAvailability('10 AM - 1 PM, 12 PM - 2 PM')"));assert.equal(a.run("formatTime('00:05')"),'12:05 AM');assert.equal(a.run("formatTime('12:00')"),'12:00 PM');
});
test('applying a replan retains prior blocks and protects newly completed work',()=>{
 const a=app();a.run("state.tasks=[{id:1,name:'Old',date:todayStr(),start:'09:00',end:'10:00',status:'pending',category:'focus'}];plannerDraft={date:todayStr(),start:'11:00',end:'13:00',blocks:[{name:'New',desc:'Done when: one problem solved',start:'11:00',end:'12:00',category:'focus'}],replaceIds:[1]};acceptDailyPlan()");
 assert.equal(a.run('state.tasks.length'),2);assert.equal(a.run('state.tasks[0].status'),'rescheduled');assert.equal(a.run('state.tasks[1].expected'),'one problem solved');
 a.run("state.tasks[1].status='done';plannerDraft={date:todayStr(),start:'13:00',end:'14:00',blocks:[{name:'Again',start:'13:00',end:'14:00'}],replaceIds:[state.tasks[1].id]};acceptDailyPlan()");assert.equal(a.run('state.tasks.length'),2);assert.match(a.element('planner-error').textContent,/changed or started/);
});
test('day rollover preserves logs and tasks while date selectors move to today',()=>{
 const a=app();a.run("workflowDate='2025-01-01';state.tasks=[{id:1,name:'Old',date:'2025-01-01',start:'09:00',end:'10:00',status:'pending'}]");a.element('timetable-date').value='2025-01-01';a.run('renderDailySummary()');assert.equal(a.element('timetable-date').value,a.run('todayStr()'));assert.equal(a.run('state.tasks.length'),1);
});

test('task Pomodoro starts a named work session and pauses both clocks together',()=>{
 const a=app();a.element('pomodoro-task-name').value='Arrays';a.run('toggleTaskPomodoro()');assert.equal(a.run('state.workSession.pomodoro'),true);assert.ok(a.run('state.focus.endAt'));
 a.run('toggleTaskPomodoro()');assert.ok(a.run('state.workSession.pausedAt'));assert.equal(a.run('state.focus.endAt'),null);
 a.run('toggleTaskPomodoro()');assert.equal(a.run('state.workSession.pausedAt'),null);assert.ok(a.run('state.focus.endAt'));
});
test('task Pomodoro deadline stops work and opens reflection without double-counting',()=>{
 const a=app();a.element('pomodoro-task-name').value='Arrays';a.run('toggleTaskPomodoro(); state.workSession.startedAt=Date.now()-1500000;state.focus.segmentStart=state.workSession.startedAt;state.focus.endAt=Date.now()-1;renderFocus()');
 assert.ok(a.run('state.workSession.endedAt'));assert.equal(a.run('state.focus.endAt'),null);assert.ok(a.element('correct-end').value);assert.ok(a.run('TimeMetrics.daily(state,todayStr()).workMs<=1500000'));
});

test('50-minute Pomodoro persists and uses its own duration for task and session credit',()=>{
 const a=app();a.run('setPomodoroLength(50);load()');assert.equal(a.run('state.focus.remaining'),3000);a.element('pomodoro-task-name').value='Deep work';a.run('toggleTaskPomodoro()');assert.equal(a.run('state.workSession.plannedMinutes'),50);
 a.run('setPomodoroLength(25)');assert.equal(a.run('state.pomodoroMinutes'),50);
 a.run('state.workSession.startedAt=Date.now()-3000000;state.focus.segmentStart=state.workSession.startedAt;state.focus.endAt=Date.now()-1;renderFocus()');assert.equal(a.run('state.focusSessions[0].minutes'),50);assert.ok(a.run('state.workSession.endedAt'));
});
test('calendar puts overlapping events side by side and reuses lanes for adjacent events',()=>{
 const a=app();a.run("var lanes=calendarLanes([{id:1,start:'09:00',end:'10:00'},{id:2,start:'09:30',end:'10:30'},{id:3,start:'10:30',end:'11:00'}])");assert.equal(a.run('lanes[0].columns'),2);assert.notEqual(a.run('lanes[0].lane'),a.run('lanes[1].lane'));assert.equal(a.run('lanes[2].columns'),1);
});
test('calendar slot prefills a half-hour block on the selected date',()=>{
 const a=app();a.run("openCalendarSlot('2026-11-02',15)");assert.equal(a.element('task-date').value,'2026-11-02');assert.equal(a.element('task-start').value,'15:00');assert.equal(a.element('task-end').value,'15:30');
});

test('reminders persist images and links, reject unsafe links, and can be searched',()=>{
 const a=app();a.element('todo-name').value='DSA reference';a.element('todo-links').value='javascript:alert(1)';a.run('saveTodo()');assert.equal(a.run('state.todos.length'),0);
 a.element('todo-links').value='https://example.com/arrays';a.run("reminderImages=['data:image/png;base64,aGVsbG8='];saveTodo();load()");assert.equal(a.run('state.todos[0].images.length'),1);assert.equal(a.run('state.todos[0].links[0]'),'https://example.com/arrays');
 a.element('todo-search').value='arrays';a.run('renderTodos()');assert.match(a.element('todo-list').innerHTML,/DSA reference/);
 a.element('todo-search').value='missing';a.run('renderTodos()');assert.doesNotMatch(a.element('todo-list').innerHTML,/DSA reference/);
 a.run("state.workMode='pomodoro';startTodo(state.todos[0].id)");assert.equal(a.run('state.workMode'),'stopwatch');assert.equal(a.run('state.workSession.links.length'),1);
});
test('reminder storage failure keeps the previous saved items and the draft',()=>{
 const a=app();a.element('todo-name').value='Draft';a.run("localStorage.setItem=()=>{throw new Error('quota')};saveTodo()");assert.equal(a.run('state.todos.length'),0);assert.equal(a.element('todo-name').value,'Draft');assert.match(a.element('todo-error').textContent,/storage is full/);
});

test('tasks and reminders have separate routes and lists without losing old resources',()=>{const a=app();a.run("state.todos=[{id:1,name:'Task',done:false},{id:2,name:'Reference',links:['https://example.com']},{id:3,name:'Note',kind:'reminder'}];renderTaskList();renderTodos()");assert.equal(a.run("pageFromPath('/reminders')"),'reminders');assert.match(a.element('tasks-action-list').innerHTML,/>Task</);assert.doesNotMatch(a.element('tasks-action-list').innerHTML,/Reference|Note/);assert.match(a.element('todo-list').innerHTML,/Reference/);assert.match(a.element('todo-list').innerHTML,/Note/);});

test('saved work appears at actual times without duplicating planned tasks or metrics',()=>{
 const a=app();a.run("state.tasks=[{id:7,name:'DSA',date:'2026-10-30',start:'09:00',end:'10:00',status:'done'}];state.workLogs=[{id:7,taskId:7,taskName:'DSA',startedAt:+new Date('2026-10-30T14:10:00'),endedAt:+new Date('2026-10-30T15:00:00'),actualMs:2400000,pausedMs:600000,outcome:'done',did:'Arrays'}]");
 assert.equal(a.run("calendarRecordedWork('2026-10-30')[0].start"),'14:10');assert.equal(a.run("calendarRecordedWork('2026-10-30')[0].end"),'15:00');
 a.element('timetable-date').value='2026-10-30';a.run('renderTimetable();renderTimetable()');assert.match(a.element('blocks-wrap').innerHTML,/Actual · DSA/);assert.match(a.element('blocks-wrap').innerHTML,/Planned · DSA/);assert.equal(a.run('state.tasks.length'),1);assert.equal(a.run('state.workLogs.length'),1);
 a.run('openRecordedWork(0)');assert.match(a.element('calendar-event-content').innerHTML,/Arrays/);assert.match(a.element('calendar-event-content').innerHTML,/pauses/);
});
test('recorded calendar sessions split at midnight and exclude invalid or unfinished logs',()=>{
 const a=app();a.run("state.workLogs=[{taskName:'Late work',startedAt:+new Date('2026-10-30T23:30:00'),endedAt:+new Date('2026-10-31T00:30:00')},{taskName:'Unfinished',startedAt:Date.now(),endedAt:null}]");
 assert.equal(a.run("calendarRecordedWork('2026-10-30')[0].end"),'24:00');assert.equal(a.run("calendarRecordedWork('2026-10-31')[0].start"),'00:00');assert.equal(a.run("calendarRecordedWork('2026-10-31')[0].end"),'00:30');assert.equal(a.run("calendarRecordedWork('2026-11-01').length"),0);
 a.run("state.workLogs[0].endedAt=+new Date('2026-10-31T00:00:00')");assert.equal(a.run("calendarRecordedWork('2026-10-31').length"),0);
});
