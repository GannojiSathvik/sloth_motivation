'use strict';

const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');

const ROOT = __dirname;
const PAGE_ROUTES = new Set(['/', '/index.html', '/timetable', '/journal', '/progress', '/fuel']);
const PUBLIC_FILES = new Set(['/style.css', '/app.js']);
const MIME_TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' };

function createServer() {
  return http.createServer(async (request, response) => {
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
  const port = Number(process.env.PORT) || 4174;
  createServer().listen(port, '127.0.0.1', () => console.log(`SlothMotivate is running at http://127.0.0.1:${port}`));
}

module.exports = { createServer };
