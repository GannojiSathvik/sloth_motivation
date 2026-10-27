const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { createServer } = require('../server');

test('local APIs keep server secrets private and reject cross-site planning', async () => {
  const server = createServer({ env: { GEMINI_API_KEY: 'private-test-key', SUPABASE_URL: 'https://example.supabase.co', SUPABASE_PUBLISHABLE_KEY: 'public-test-key' }, planGenerator: async () => ({ blocks: [] }) });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  try {
    const config = await (await fetch(`${url}/api/config`)).text();
    assert.ok(!config.includes('private-test-key'));
    assert.equal(JSON.parse(config).geminiConfigured, true);
    for (const route of ['/.env', '/planner.js', '/cloud.js', '/package.json']) assert.equal((await fetch(url + route)).status, 404);
    assert.equal((await fetch(`${url}/api/plan`, { method: 'POST', headers: { Origin: 'https://other.example', 'Content-Type': 'application/json' }, body: '{}' })).status, 403);
    assert.equal((await fetch(`${url}/api/plan`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' })).status, 200);
    assert.equal((await fetch(`${url}/planner`)).status, 200);
  } finally { await new Promise(resolve => server.close(resolve)); }
});

test('hosted planner requires sign-in before calling Gemini', async () => {
  const oldUrl = process.env.SUPABASE_URL, oldKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  process.env.SUPABASE_URL = 'https://example.supabase.co';
  process.env.SUPABASE_PUBLISHABLE_KEY = 'test-public-key';
  try {
    const { POST } = await import('../api/plan.mjs');
    const result = await POST(new Request('https://sloth.example/api/plan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' }));
    assert.equal(result.status, 401);
    assert.match((await result.json()).error, /Sign in/);
  } finally {
    if (oldUrl === undefined) delete process.env.SUPABASE_URL; else process.env.SUPABASE_URL = oldUrl;
    if (oldKey === undefined) delete process.env.SUPABASE_PUBLISHABLE_KEY; else process.env.SUPABASE_PUBLISHABLE_KEY = oldKey;
  }
});

test('deployment publishes only browser files and keeps API routes separate', () => {
  const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  assert.equal(config.outputDirectory, 'dist');
  assert.ok(config.rewrites.every(rule => !rule.source.includes('*') && !rule.source.startsWith('/api')));
  assert.ok(!fs.existsSync('dist/.env'));
  assert.ok(!fs.existsSync('dist/planner.js'));
});
