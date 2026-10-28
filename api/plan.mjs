// Public hosted AI requests need abuse protection before cloud accounts are removed.
export async function POST() {
  return Response.json({ error: 'Hosted AI planning is paused in local-only mode. You can still plan manually, or use Gemini in the local app.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
}
