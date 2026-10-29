const {test}=require('node:test');
const assert=require('node:assert/strict');
const M=require('../metrics');
const ms=s=>+new Date(s), min=60000;
const base={tasks:[],workLogs:[],focusSessions:[]};
test('overnight work is split at local midnight, exact pauses stay on their day',()=>{
 const log={startedAt:ms('2026-10-28T23:30'),endedAt:ms('2026-10-29T00:30'),pausedMs:10*min,pauseIntervals:[[ms('2026-10-28T23:40'),ms('2026-10-28T23:50')]]};
 const s={...base,workLogs:[log]};
 assert.equal(M.daily(s,'2026-10-28').workMs,20*min);assert.equal(M.daily(s,'2026-10-29').workMs,30*min);assert.equal(M.daily(s,'2026-10-28').breakMs,10*min);
});
test('aggregate corrections and distractions are bounded and allocated proportionally',()=>{
 const s={...base,workLogs:[{startedAt:ms('2026-10-28T23:30'),endedAt:ms('2026-10-29T00:30'),pausedMs:10*min,distractedMs:20*min}]};
 for(const d of ['2026-10-28','2026-10-29']){const m=M.daily(s,d);assert.ok(Math.abs(m.workMs-15*min)<.001);assert.equal(m.distractedMs,10*min);assert.ok(Math.abs(m.breakMs-5*min)<.001);}
});
test('overlapping work and Pomodoro contribute only their non-overlapping time',()=>{
 const s={...base,workLogs:[{startedAt:ms('2026-10-29T10:00'),endedAt:ms('2026-10-29T10:30'),pauseIntervals:[]}],focusSessions:[{mode:'focus',intervals:[[ms('2026-10-29T10:20'),ms('2026-10-29T10:45')]]}]};
 assert.equal(M.daily(s,'2026-10-29').workMs,45*min);
});
test('missed tasks are not distractions and future scheduled gaps are not untracked',()=>{
 const s={...base,tasks:[{date:'2026-10-29',start:'09:00',end:'10:00',status:'pending',category:'focus'},{date:'2026-10-29',start:'15:00',end:'16:00',status:'pending',category:'focus'}]};
 const m=M.daily(s,'2026-10-29',ms('2026-10-29T12:00'));assert.equal(m.missed,1);assert.equal(m.pending,1);assert.equal(m.distractedMs,0);assert.equal(m.untrackedMs,60*min);
});
test('breaks and deliberately rescheduled work do not inflate completion',()=>{
 const s={...base,tasks:['done','partial','rescheduled'].map(status=>({date:'2026-10-29',start:'09:00',end:'10:00',status,category:'focus'})).concat({date:'2026-10-29',start:'10:00',end:'10:15',status:'done',category:'break'})};
 const m=M.daily(s,'2026-10-29');assert.equal(m.total,2);assert.equal(m.completion,50);assert.equal(m.partial,1);assert.equal(m.plannedMs,60*min);
});
