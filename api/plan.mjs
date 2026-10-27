import { createClient } from '@supabase/supabase-js';
import planner from '../planner.js';

const recent = new Map();
const reply = (error, status) => Response.json({ error }, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return reply('Open the planner from this app.', 403);
  if (!request.headers.get('content-type')?.startsWith('application/json')) return reply('Use JSON for planning requests.', 415);
  const { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) return reply('Cloud sign-in needs to be connected before using the hosted AI planner.', 503);
  const token = request.headers.get('authorization')?.match(/^Bearer (.+)$/)?.[1];
  if (!token) return reply('Sign in on the Cloud account page to use the AI planner.', 401);
  const client = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await client.auth.getUser(token);
  if (error || !data.user) return reply('Please sign in again to use the AI planner.', 401);
  const now = Date.now();
  for (const [id, at] of recent) if (now - at > 60000) recent.delete(id);
  if (now - (recent.get(data.user.id) || 0) < 10000) return reply('Wait a few seconds before generating another plan.', 429);
  recent.set(data.user.id, now);
  try {
    const body = await request.text();
    if (Buffer.byteLength(body) > 40000) return reply('Your planning brief is too long.', 413);
    let input;
    try { input = JSON.parse(body); } catch { return reply('Send a valid planning request.', 400); }
    const plan = await planner.generatePlan(input, { signal: request.signal });
    return Response.json(plan, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return reply(error instanceof planner.PlannerError ? error.message : 'Planning could not finish. Please try again.', error instanceof planner.PlannerError ? error.status : 500);
  }
}
