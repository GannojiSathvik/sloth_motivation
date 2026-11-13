import { createClient } from '@supabase/supabase-js';

let client, hooks, userId = null, version = 0, ready = false, syncing = false, pending = false, conflict = false;
let debounce, lastSaved = '', hydration = 0, queuedSession;
const TABLE = 'sloth_workspaces';
const text = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
function status(label, message) {
  text('cloud-status', label);
  if (message !== undefined) text('account-message', message);
  text('account-sync-status',label);
  const resolution=document.getElementById('cloud-resolution');if(resolution)resolution.hidden=!conflict;
}
function snapshot() {
  const state = hooks.getState();
  const keys=['todos','tasks','journal','goals','history','workLogs','focusSessions','plannerPreferences','dailyReviews','workSession','focus','pomodoroMinutes','workMode','calendarContent'];
  return JSON.parse(JSON.stringify(Object.fromEntries(keys.filter(key=>state[key]!==undefined).map(key=>[key,state[key]]))));
}
function accountView(user) {
  document.getElementById('account-signed-out').hidden = Boolean(user);
  document.getElementById('account-signed-in').hidden = !user;
  text('account-user-email', user?.email || '');
  text('profile-name', user ? 'My cloud workspace' : 'My workspace');
  text('account-link-label', user ? 'My account' : 'Cloud account');
}
async function hydrate(session) {
  if(syncing){queuedSession=session;return;}
  const attempt = ++hydration;
  ready = false; clearTimeout(debounce);
  const nextId = session?.user?.id || null;
  if (!nextId) {
    hooks.switchAccount(null, null);
    userId = null; version = 0; lastSaved = ''; conflict = false;
    accountView(null); status('Saved on this device', 'Your work is saved locally. Sign in to enable private cloud saving.');
    return;
  }
  status('Connecting…', 'Loading your private workspace…');
  let data,error;
  try{({data,error}=await client.from(TABLE).select('data, version').eq('user_id',nextId).maybeSingle());}catch(cause){error=cause;}
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
  if (!userId) return;
  const current = JSON.stringify(snapshot());
  if (current === lastSaved) {if(ready&&!syncing&&!conflict)localStorage.removeItem(`sm_cloud_dirty:${userId}`);return;}
  pending = true;
  localStorage.setItem(`sm_cloud_dirty:${userId}`, 'true');
  if(conflict)return;
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
  if (serialized === lastSaved) { localStorage.removeItem(`sm_cloud_dirty:${userId}`); pending = false; status('Saved to Supabase', 'Your workspace is up to date.'); return; }
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
    if(queuedSession!==undefined){const session=queuedSession;queuedSession=undefined;await hydrate(session);return;}
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
async function signIn() {
  const button = document.getElementById('account-google');
  if (button.disabled) return;
  if (!client) { status('Local mode', 'Cloud sign-in is not connected yet. Your work is saved on this device.'); return; }
  if (hooks.hasActiveWork()) { status('Saved locally', 'Finish and save your current task before signing in.'); return; }
  button.disabled = true;
  localStorage.setItem('sm_import_guest_once','true');
  status('Connecting…', 'Opening Google sign-in…');
  try {
    const config = await (await fetch('/api/config')).json();
    const response = await fetch(`${config.supabaseUrl}/auth/v1/settings`, { headers: { apikey: config.supabasePublishableKey } });
    if (!response.ok) throw new Error('Could not check sign-in availability. Please try again.');
    const settings = await response.json();
    if (!settings.external?.google) throw new Error('Google sign-in setup is not finished yet. Your work is still saved on this device.');
    const { error } = await client.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/account` }
    });
    if (error) throw error;
  } catch (error) {
    status('Sign-in needs attention', error.message || 'Could not connect to Google. Please try again.');
  } finally { button.disabled = false; }
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
    client = createClient(config.supabaseUrl, config.supabasePublishableKey, { auth: { flowType: 'pkce', detectSessionInUrl: true } });
    client.auth.onAuthStateChange((event, session) => {
      if (['INITIAL_SESSION','SIGNED_IN','SIGNED_OUT','TOKEN_REFRESHED'].includes(event)) setTimeout(() => { if(session?.user?.id===userId&&ready){refreshCloud();return;} hydrate(session).catch(() => status('Saved locally', 'Could not connect to cloud storage. Please try again.')); }, 0);
    });
    window.addEventListener('online', refreshCloud);
    window.addEventListener('focus',refreshCloud);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')refreshCloud();});
    setInterval(()=>{if(document.visibilityState==='visible')refreshCloud();},15000);
  } catch { status('Saved on this device', 'Could not connect to Supabase. Your local workspace is available.'); }
}
async function getAccessToken() {
  if (!client) return null;
  const { data } = await client.auth.getSession();
  return data.session?.access_token || null;
}
let refreshing=false;
async function refreshCloud(){
  if(!client||!userId||syncing||refreshing||conflict)return;
  refreshing=true;
  try{
    if(!ready){const {data}=await client.auth.getSession();await hydrate(data.session);return;}
    if(localStorage.getItem(`sm_cloud_dirty:${userId}`)==='true'){await syncNow();return;}
    const owner=userId,attempt=hydration;
    const {data,error}=await client.from(TABLE).select('data, version').eq('user_id',owner).maybeSingle();
    if(owner!==userId||attempt!==hydration||syncing)return;
    if(error){status('Saved locally · retry sync','Unable to reach cloud storage. Your local copy is safe.');return;}
    if(!data||data.version===version)return;
    if(localStorage.getItem(`sm_cloud_dirty:${owner}`)==='true')return;
    // Never overwrite a form the user is currently filling out.
    if(hooks.isEditing?.()){status('Update available','Finish editing to load your latest cloud data.');return;}
    ready=false;hooks.switchAccount(owner,data.data);version=data.version;
    localStorage.setItem(`sm_cloud_version:${owner}`,String(version));lastSaved=JSON.stringify(snapshot());ready=true;
    status('Synced','Latest changes loaded from your account.');
  }catch{status('Saved locally · retry sync','Could not reach cloud storage. We will retry when you return.');}
  finally{refreshing=false;}
}
window.cloud = { getAccessToken, init, queueSave, syncNow, refreshCloud, reloadCloud, signIn, signOut, currentUser:()=>userId };
