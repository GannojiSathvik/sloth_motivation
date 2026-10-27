'use strict';

const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { generatePlan, PlannerError } = require('./planner');

const ROOT = __dirname;
const PAGE_ROUTES = new Set(['/', '/index.html', '/timetable', '/journal', '/progress', '/fuel', '/planner', '/account']);
const PUBLIC_FILES = new Set(['/style.css', '/app.js']);
const MIME_TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' };

function json(response, status, value) {
  response.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  response.end(JSON.stringify(value));
}
async function readJson(request) {
  let body = '';
  for await (const chunk of request) {
    body += chunk;
    if (Buffer.byteLength(body) > 40000) throw new PlannerError('Your planning brief is too long.', 413);
  }
  try { return JSON.parse(body); } catch { throw new PlannerError('Send a valid planning request.'); }
}
function createServer({ planGenerator = generatePlan, env = process.env } = {}) {
  let planning = false;
  let lastPlanAt = 0;
  return http.createServer(async (request, response) => {
    const requestPath = new URL(request.url, 'http://localhost').pathname;
    // This personal app only serves loopback hosts; no cross-site API access.
    const host = request.headers.host || '';
    if (!/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host)) { json(response, 403, { error: 'Use the local app URL.' }); return; }
    if (requestPath.startsWith('/api/')) {
      const origin = request.headers.origin;
      if ((origin && origin !== `http://${host}`) || request.headers['sec-fetch-site'] === 'cross-site') { json(response, 403, { error: 'Open the planner from this app.' }); return; }
      if (requestPath === '/api/config' && request.method === 'GET') {
        json(response, 200, { geminiConfigured: Boolean(env.GEMINI_API_KEY), supabaseUrl: env.SUPABASE_URL || '', supabasePublishableKey: env.SUPABASE_PUBLISHABLE_KEY || '' }); return;
      }
      if (requestPath === '/api/plan' && request.method === 'POST') {
        if (!request.headers['content-type']?.startsWith('application/json')) { json(response, 415, { error: 'Use JSON for planning requests.' }); return; }
        if (planning || Date.now() - lastPlanAt < 3000) { json(response, 429, { error: 'A plan is already being prepared. Please wait a moment.' }); return; }
        planning = true;
        const controller = new AbortController();
        response.on('close', () => { if (!response.writableEnded) controller.abort(); });
        try {
          const input = await readJson(request);
          lastPlanAt = Date.now();
          json(response, 200, await planGenerator(input, { env, signal: controller.signal }));
        } catch (error) {
          if (!response.destroyed) json(response, error instanceof PlannerError ? error.status : 500, { error: error instanceof PlannerError ? error.message : 'Planning could not finish. Please try again.' });
        } finally { planning = false; }
        return;
      }
      json(response, 404, { error: 'Endpoint not found.' }); return;
    }
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      const route = pathname.replace(/\/+$/, '') || '/';
      let filename;
      if (PAGE_ROUTES.has(route)) filename = 'index.html';
      else if (PUBLIC_FILES.has(pathname)) filename = pathname.slice(1);
      else if (pathname.startsWith('/assets/') && !pathname.includes('..') && !pathname.includes('\\')) filename = pathname.slice(1);
      else {
        response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end(request.method === 'HEAD' ? '' : '<!doctype html><html lang="en"><title>Page not found — SlothMotivate</title><h1>Page not found</h1><p><a href="/">Back to your workspace</a></p></html>');
        return;
      }
      const contents = await fs.readFile(path.join(ROOT, filename));
      response.writeHead(200, { 'Content-Type': MIME_TYPES[path.extname(filename)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
      response.end(request.method === 'HEAD' ? undefined : contents);
    } catch (error) {
      response.writeHead(error.code === 'ENOENT' ? 404 : error instanceof URIError ? 400 : 500);
      response.end();
    }
  });
}

if (require.main === module) {
  try { process.loadEnvFile(path.join(ROOT, '.env')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const port = Number(process.env.PORT) || 4174;
  createServer().listen(port, '127.0.0.1', () => console.log(`SlothMotivate is running at http://127.0.0.1:${port}`));
}

module.exports = { createServer };
