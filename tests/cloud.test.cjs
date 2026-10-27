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

test('cloud snapshots exclude active timers and auth credentials', () => {
  const c = cloud();
  const data = c.run('snapshot()');
  assert.equal(data.tasks[0].name, 'Local task');
  assert.ok(!('workSession' in data));
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
