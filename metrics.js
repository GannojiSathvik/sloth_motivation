/* Shared, deterministic accounting. All intervals are half-open [start, end). */
(function(root) {
  const minute = 60000;
  function union(ranges) {
    const sorted=ranges.filter(r=>Number.isFinite(r[0])&&r[1]>r[0]).map(r=>r.slice()).sort((a,b)=>a[0]-b[0]);
    return sorted.reduce((out,r)=>{const last=out[out.length-1];if(last&&r[0]<=last[1])last[1]=Math.max(last[1],r[1]);else out.push(r);return out;},[]);
  }
  function subtract(ranges,cuts) {
    return union(cuts).reduce((parts,cut)=>parts.flatMap(r=>cut[1]<=r[0]||cut[0]>=r[1]?[r]:[[r[0],Math.min(r[1],cut[0])],[Math.max(r[0],cut[1]),r[1]]].filter(x=>x[1]>x[0])),union(ranges));
  }
  const length=ranges=>union(ranges).reduce((s,r)=>s+r[1]-r[0],0);
  function bounds(date) {const a=new Date(date+'T00:00:00');const b=new Date(a);b.setDate(b.getDate()+1);return [+a,+b];}
  const clip=(ranges,b)=>ranges.map(r=>[Math.max(r[0],b[0]),Math.min(r[1],b[1])]).filter(r=>r[1]>r[0]);
  function session(log,now) {
    const end=log.endedAt||log.pausedAt||now, start=log.startedAt;
    if(!Number.isFinite(start)||end<=start)return {ranges:[],pause:[],ratio:1};
    const whole=[[start,end]];
    const pause=clip(log.pauseIntervals||[],[start,end]);
    const ranges=subtract(whole,pause);
    const span=length(ranges);
    // Old sessions and manual aggregate corrections lack exact pause timestamps.
    const legacyPause=log.pauseIntervals?0:Math.min(span,log.pausedMs||0);
    const available=Math.max(0,span-legacyPause);
    const distractions=Math.min(available,Math.max(0,log.distractedMs||0));
    return {ranges,pause,ratio:span?available/span:0,distractionRatio:span?distractions/span:0};
  }
  function daily(state,date,now=Date.now()) {
    const b=bounds(date), logs=[...(state.workLogs||[])];
    if(state.workSession&&!logs.some(l=>l.id===state.workSession.id))logs.push(state.workSession);
    let workMs=0,breakMs=0,distractedMs=0;let occupied=[];
    for(const log of logs) {
      const s=session(log,now);const fresh=subtract(clip(s.ranges,b),occupied);const span=length(fresh);
      workMs+=span*Math.max(0,s.ratio-(s.distractionRatio||0));distractedMs+=span*(s.distractionRatio||0);
      breakMs+=length(subtract(clip(s.pause,b),occupied))+span*(1-s.ratio);
      occupied=union([...occupied,...clip(s.ranges,b),...clip(s.pause,b)]);
    }
    for(const f of state.focusSessions||[]) {
      if(f.intervals) {const fresh=subtract(clip(f.intervals,b),occupied);if(f.mode==='short'||f.mode==='long')breakMs+=length(fresh);else workMs+=length(fresh);occupied=union([...occupied,...fresh]);}
      else if(f.date===date&&!f.overlapsWork)workMs+=(f.minutes||0)*minute;
    }
    const tasks=(state.tasks||[]).filter(t=>t.date===date&&t.category!=='break');
    const planned=tasks.filter(t=>t.status!=='rescheduled');
    const done=planned.filter(t=>t.status==='done').length;
    const partial=planned.filter(t=>t.status==='partial').length;
    const missed=planned.filter(t=>t.status==='skipped'||(t.status!=='done'&&t.status!=='partial'&&+new Date(date+'T'+t.end)<=now)).length;
    const ranges=planned.map(t=>[+new Date(date+'T'+t.start),+new Date(date+'T'+t.end)]);
    const elapsed=clip(ranges,[b[0],Math.min(b[1],now)]);
    return {workMs,breakMs,distractedMs,plannedMs:length(ranges),untrackedMs:length(subtract(elapsed,occupied)),done,partial,missed,total:planned.length,pending:planned.length-done-partial-missed,completion:planned.length?Math.round(done/planned.length*100):0};
  }
  const api={union,subtract,length,bounds,session,daily};if(typeof module!=='undefined')module.exports=api;else root.TimeMetrics=api;
})(globalThis);
