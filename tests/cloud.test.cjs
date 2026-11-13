const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');

function cloud() {
  const storage = new Map(), elements = new Map();
  const element = id => {
    if (!elements.has(id)) elements.set(id, { textContent: '', hidden: false });
    return elements.get(id);
  };
  const ctx = vm.createContext({ window: {}, document: { getElementById: element }, console, setTimeout: () => 1, clearTimeout() {},
    localStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key) } });
  vm.runInContext(fs.readFileSync('cloud.js', 'utf8').replace("import { createClient } from '@supabase/supabase-js';", ''), ctx);
  const run = code => vm.runInContext(code, ctx);
  run("hooks = { getState: () => ({ tasks: [{name:'Local task'}], workLogs: [], workSession: {startedAt:1} }), switchAccount: () => {}, hasActiveWork: () => false };");
  return { run, storage, element };
}

test('cloud snapshots include session timing but exclude auth credentials', () => {
  const c = cloud();
  const data = c.run('snapshot()');
  assert.equal(data.tasks[0].name, 'Local task');
  assert.equal(data.workSession.startedAt,1);
  assert.ok(!('password' in data));
});

test('conflicting offline edits remain protected across repeated sign-ins', async () => {
  const c = cloud();
  c.storage.set('sm_cloud_dirty:owner', 'true');
  c.storage.set('sm_cloud_version:owner', '1');
  c.run("client = { from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { data: { tasks: [] }, version: 2 }, error: null }) }) }) }) };");
  await c.run("hydrate({user:{id:'owner',email:'test@example.com'}})");
  assert.equal(c.run('conflict'), true);
  assert.equal(c.storage.get('sm_cloud_version:owner'), '1');
  await c.run("hydrate({user:{id:'owner',email:'test@example.com'}})");
  assert.equal(c.run('conflict'), true);
  assert.equal(c.storage.get('sm_cloud_version:owner'), '1');
});

test('network failure preserves local dirty work and allows retry', async () => {
  const c = cloud();
  c.run("userId = 'owner'; ready = true; version = 1; client = { from: () => { throw new Error('offline'); } }; queueSave();");
  await c.run('syncNow()');
  assert.equal(c.storage.get('sm_cloud_dirty:owner'), 'true');
  assert.equal(c.run('syncing'), false);
  assert.match(c.element('cloud-status').textContent, /Saved locally/);
});

test('Google sign-in redirects back to this app and requests only Google', async () => {
  const c = cloud();
  c.run(`window.location = { origin: 'http://127.0.0.1:4174' }; var oauthInput;
    client = { auth: { signInWithOAuth: async input => { oauthInput = input; return {error:null}; } } };
    fetch = async url => ({ ok:true, json:async () => url === '/api/config' ? {supabaseUrl:'https://example.supabase.co',supabasePublishableKey:'public'} : {external:{google:true}} });`);
  await c.run('signIn()');
  assert.equal(c.run('oauthInput.provider'), 'google');
  assert.equal(c.run('oauthInput.options.redirectTo'), 'http://127.0.0.1:4174/account');
});

test('disabled Google provider shows an actionable message without redirecting', async () => {
  const c = cloud();
  c.run(`client = { auth: { signInWithOAuth: () => {throw new Error('Must not redirect');} } };
    fetch = async url => ({ ok:true, json:async () => url === '/api/config' ? {supabaseUrl:'https://example.supabase.co',supabasePublishableKey:'public'} : {external:{google:false}} });`);
  await c.run('signIn()');
  assert.match(c.element('account-message').textContent, /setup is not finished/);
  assert.equal(c.element('account-google').disabled, false);
});

test('cloud snapshot includes daily reviews and the active task for reopening on another device',()=>{const c=cloud();c.run("hooks.getState=()=>({tasks:[],dailyReviews:{'2026-11-13':'Focus first'},workSession:{taskName:'DSA',startedAt:100},focus:{remaining:1500,endAt:null}})");const value=c.run('snapshot()');assert.equal(value.dailyReviews['2026-11-13'],'Focus first');assert.equal(value.workSession.taskName,'DSA');});
test('app connects cloud saves and loads the bundled auth client',()=>{const html=fs.readFileSync('index.html','utf8'),app=fs.readFileSync('app.js','utf8');assert.match(html,/src="\/assets\/cloud.js"/);assert.match(app,/window\.cloud\??\.queueSave/);assert.match(app,/window\.cloud\??\.init/);});

test('returning to the app pulls newer cloud data when local work is clean',async()=>{
 const c=cloud();c.run("userId='owner';ready=true;version=1;var loaded;hooks.switchAccount=(id,data)=>{loaded=data;hooks.getState=()=>data};client={from:()=>({select:()=>({eq:()=>({maybeSingle:async()=>({data:{version:2,data:{tasks:[{name:'From phone'}],dailyReviews:{today:'Practice'},workSession:{taskName:'Read'}}}})})})})}");
 await c.run('refreshCloud()');assert.equal(c.run('loaded.tasks[0].name'),'From phone');assert.equal(c.run('loaded.workSession.taskName'),'Read');assert.equal(c.storage.get('sm_cloud_version:owner'),'2');
});
test('a cloud fetch cannot overwrite edits made while it was in flight',async()=>{
 const c=cloud();c.run("userId='owner';ready=true;version=1;var loaded=false;var release;hooks.switchAccount=()=>{loaded=true};client={from:()=>({select:()=>({eq:()=>({maybeSingle:()=>new Promise(resolve=>{release=resolve})})})})}");
 const pull=c.run('refreshCloud()');c.storage.set('sm_cloud_dirty:owner','true');c.run("release({data:{version:2,data:{tasks:[]}}})");await pull;assert.equal(c.run('loaded'),false);assert.equal(c.storage.get('sm_cloud_dirty:owner'),'true');
});
test('cloud refresh waits for unsaved form edits',async()=>{
 const c=cloud();c.run("userId='owner';ready=true;version=1;var loaded=false;hooks.isEditing=()=>true;hooks.switchAccount=()=>{loaded=true};client={from:()=>({select:()=>({eq:()=>({maybeSingle:async()=>({data:{version:2,data:{tasks:[]}}})})})})}");await c.run('refreshCloud()');assert.equal(c.run('loaded'),false);assert.match(c.element('cloud-status').textContent,/Update available/);
});
test('successful save marks the current version clean and includes reviews',async()=>{
 const c=cloud();c.run("userId='owner';ready=true;version=1;hooks.getState=()=>({tasks:[{name:'DSA'}],dailyReviews:{today:'Try again'}});var sent;client={from:()=>({update:input=>{sent=input;return {eq:()=>({eq:()=>({select:()=>({single:async()=>({data:{version:2}})})})})}}})};queueSave()");await c.run('syncNow()');assert.equal(c.run('sent.data.dailyReviews.today'),'Try again');assert.equal(c.storage.get('sm_cloud_version:owner'),'2');assert.equal(c.storage.has('sm_cloud_dirty:owner'),false);
});
test('a rejected version update preserves local changes for explicit recovery',async()=>{
 const c=cloud();c.run("userId='owner';ready=true;version=1;client={from:()=>({update:()=>({eq:()=>({eq:()=>({select:()=>({single:async()=>({error:{code:'PGRST116'}})})})})})})};queueSave()");await c.run('syncNow()');assert.equal(c.run('conflict'),true);assert.equal(c.storage.get('sm_cloud_dirty:owner'),'true');assert.equal(c.run('version'),1);
});
