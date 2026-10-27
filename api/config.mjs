export function GET() {
  return Response.json({
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabasePublishableKey: process.env.SUPABASE_PUBLISHABLE_KEY || '',
    plannerRequiresSignIn: true,
  }, { headers: { 'Cache-Control': 'no-store' } });
}
