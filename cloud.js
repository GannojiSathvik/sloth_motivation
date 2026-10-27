import { createClient } from '@supabase/supabase-js';

let client, hooks, userId = null, version = 0, ready = false, syncing = false, pending = false, conflict = false;
let debounce, lastSaved = '', hydration = 0;
const TABLE = 'sloth_workspaces';
const text = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
function status(label, message) {
  text('cloud-status', label);
  if (message !== undefined) text('account-message', message);
}
function snapshot() {
  const state = hooks.getState();
  return { tasks: state.tasks, journal: state.journal, goals: state.goals, history: state.history, workLogs: state.workLogs, focusSessions: state.focusSessions, plannerPreferences: state.plannerPreferences };
}
function accountView(user) {
  document.getElementById('account-signed-out').hidden = Boolean(user);
  document.getElementById('account-signed-in').hidden = !user;
  text('account-user-email', user?.email || '');
  text('profile-name', user ? 'My cloud workspace' : 'My workspace');
  text('account-link-label', user ? 'My account' : 'Cloud account');
}
async function hydrate(session) {
  const attempt = ++hydration;
  ready = false; clearTimeout(debounce);
  const nextId = session?.user?.id || null;
  if (!nextId) {
    if (userId) hooks.switchAccount(null, null);
    userId = null; version = 0; lastSaved = ''; conflict = false;
    accountView(null); status('Saved on this device', 'Your work is saved locally. Sign in to enable private cloud saving.');
    return;
  }
  status('Connecting…', 'Loading your private workspace…');
  const { data, error } = await client.from(TABLE).select('data, version').eq('user_id', nextId).maybeSingle();
  if (attempt !== hydration) return;
  if (error) {
    status('Cloud unavailable', 'Could not load your cloud workspace. Your local work is safe. Check your connection, then try signing in again.');
    userId = nextId;
    hooks.switchAccount(nextId, null);
    accountView(session.user);
    return;
  }
  userId = nextId; version = data?.version || 0; conflict = false;
  const cachedVersion = Number(localStorage.getItem(`sm_cloud_version:${userId}`) || 0);
  const dirty = localStorage.getItem(`sm_cloud_dirty:${userId}`) === 'true';
  if (dirty && cachedVersion !== version && data) {
    hooks.switchAccount(userId, null); conflict = true;
    status('Sync needs attention', 'This device has unsaved changes and another device updated the cloud. Your local copy is preserved. Use “Load latest cloud version” to keep the cloud version; this first backs up your local copy on this device.');
  } else {
    hooks.switchAccount(userId, dirty ? null : data?.data || null);
    lastSaved = data && !dirty ? JSON.stringify(snapshot()) : '';
    status('Cloud connected', data ? 'Your private workspace is ready. Changes save automatically.' : 'Your local work is being saved to your private cloud workspace.');
  }
  if (!conflict) localStorage.setItem(`sm_cloud_version:${userId}`, String(version));
  accountView(session.user); ready = true;
  if (!conflict && (!data || dirty)) queueSave();
}
function queueSave() {
  if (!userId || conflict) return;
  const current = JSON.stringify(snapshot());
  if (current === lastSaved) return;
  pending = true;
  localStorage.setItem(`sm_cloud_dirty:${userId}`, 'true');
  if (!ready) { status('Saved locally · retry sync'); return; }
  status('Saving…');
  clearTimeout(debounce);
  debounce = setTimeout(syncNow, 700);
}
async function syncNow() {
  if (!client || !userId) return;
  if (!ready) { const { data } = await client.auth.getSession(); await hydrate(data.session); if (!ready) return; }
  if (conflict) { status('Sync needs attention', 'Another device changed this workspace. Load the latest cloud version before continuing to sync.'); return; }
  if (syncing) { pending = true; return; }
  clearTimeout(debounce);
  const data = snapshot();
  const serialized = JSON.stringify(data);
  if (serialized === lastSaved) { pending = false; status('Saved to Supabase', 'Your workspace is up to date.'); return; }
  syncing = true; pending = false;
  const owner = userId, nextVersion = version + 1;
  status('Saving…');
  try {
    const query = version === 0
      ? client.from(TABLE).insert({ user_id: owner, data, version: 1 })
      : client.from(TABLE).update({ data, version: nextVersion, updated_at: new Date().toISOString() }).eq('user_id', owner).eq('version', version);
    const { data: saved, error } = await query.select('version').single();
    if (owner !== userId) return;
    if (error) {
      if (['PGRST116', '23505'].includes(error.code)) {
        conflict = true;
        status('Sync needs attention', 'Another device updated your workspace. Your local copy is safe. Load the latest cloud version to resolve the conflict.');
      } else status('Saved locally · retry sync', 'Cloud saving failed. Your work remains saved on this device. Check your connection and use “Sync now” to retry.');
      return;
    }
    version = saved.version; lastSaved = serialized;
    localStorage.setItem(`sm_cloud_version:${owner}`, String(version));
    if (JSON.stringify(snapshot()) === serialized) localStorage.removeItem(`sm_cloud_dirty:${owner}`);
    else pending = true;
    status('Saved to Supabase', 'Your tasks, work logs, and reflections are saved to your private account.');
  } catch {
    status('Saved locally · retry sync', 'Cloud saving failed. Your work remains on this device. Use Sync now when your connection returns.');
  } finally {
    syncing = false;
    if (pending && !conflict) { pending = false; queueSave(); }
  }
}
async function reloadCloud() {
  if (!userId || !client || syncing) return;
  if (hooks.hasActiveWork()) { status('Saved locally', 'Finish and save your current work session before loading another version.'); return; }
  const owner = userId;
  const { data, error } = await client.from(TABLE).select('data, version').eq('user_id', owner).single();
  if (owner !== userId) return;
  if (error) { status('Cloud unavailable', 'Could not load the latest version. Your local work is untouched.'); return; }
  localStorage.setItem(`sm_backup:${userId}:${Date.now()}`, JSON.stringify(hooks.getState()));
  ready = false;
  hooks.switchAccount(userId, data.data);
  version = data.version; lastSaved = JSON.stringify(snapshot()); conflict = false; pending = false;
  localStorage.setItem(`sm_cloud_version:${userId}`, String(version));
  localStorage.removeItem(`sm_cloud_dirty:${userId}`);
  ready = true; status('Saved to Supabase', 'Latest cloud version loaded. Your previous local copy was backed up on this device.');
}
function credentials() {
  const form = document.getElementById('account-form');
  if (!form.reportValidity()) return null;
  return { email: document.getElementById('account-email').value.trim(), password: document.getElementById('account-password').value };
}
async function authenticate(create) {
  if (document.getElementById('account-signin').disabled) return;
  if (!client) { status('Local mode', 'Supabase is not configured yet. Your work is still saved locally.'); return; }
  if (hooks.hasActiveWork()) { status('Local mode', 'Finish and save your current task before switching accounts.'); return; }
  const input = credentials(); if (!input) return;
  document.getElementById('account-signin').disabled = true;
  document.getElementById('account-signup').disabled = true;
  status('Connecting…', create ? 'Creating your private account…' : 'Signing in…');
  try {
    const { data, error } = create ? await client.auth.signUp(input) : await client.auth.signInWithPassword(input);
    if (error) { status('Sign-in needs attention', error.message); return; }
    document.getElementById('account-password').value = '';
    if (create && !data.session) status('Check your email', 'Confirm your email using the message from Supabase, then return here and sign in.');
  } catch { status('Sign-in unavailable', 'Could not connect. Please check your connection and try again.');
  } finally { document.getElementById('account-signin').disabled = false; document.getElementById('account-signup').disabled = false; }
}
async function signOut() {
  if (hooks.hasActiveWork()) { status('Saved locally', 'Finish and save your current task before signing out.'); return; }
  await syncNow();
  if (syncing || conflict || localStorage.getItem(`sm_cloud_dirty:${userId}`) === 'true') { status('Sync needs attention', 'Save or resolve your pending cloud changes before signing out.'); return; }
  const { error } = await client.auth.signOut();
  if (error) status('Could not sign out', error.message);
}
async function init(callbacks) {
  hooks = callbacks;
  try {
    const response = await fetch('/api/config');
    const config = await response.json();
    if (!config.supabaseUrl || !config.supabasePublishableKey) { status('Saved on this device', 'Cloud storage is being connected. You can keep working locally for now.'); return; }
    client = createClient(config.supabaseUrl, config.supabasePublishableKey);
    client.auth.onAuthStateChange((event, session) => {
      if (['INITIAL_SESSION','SIGNED_IN','SIGNED_OUT'].includes(event)) setTimeout(() => hydrate(session).catch(() => status('Saved locally', 'Could not connect to cloud storage. Please try again.')), 0);
    });
    window.addEventListener('online', () => { if (userId) syncNow(); });
  } catch { status('Saved on this device', 'Could not connect to Supabase. Your local workspace is available.'); }
}
async function getAccessToken() {
  if (!client) return null;
  const { data } = await client.auth.getSession();
  return data.session?.access_token || null;
}
window.cloud = { getAccessToken, init, queueSave, syncNow, reloadCloud, signIn: () => authenticate(false), signUp: () => authenticate(true), signOut };
