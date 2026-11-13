export function GET() {
  return Response.json({
    geminiConfigured: false,
    storageMode: 'cloud',
    supabaseUrl: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    supabasePublishableKey: process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '',
    plannerRequiresSignIn: false,
  }, { headers: { 'Cache-Control': 'no-store' } });
}
