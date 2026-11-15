// Public browser configuration; database access remains protected by authentication and RLS.
// Keep the pair together so an override never uses a key from a different project.
const publicProject = {
  url: 'https://tpxutrqowbufwztpzori.supabase.co',
  key: 'sb_publishable_-88trKfhYiUDMd42HDoCJg_d8JV8C8f',
};
export function GET() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';
  const useDefault = !url && !key;
  return Response.json({
    geminiConfigured: false,
    storageMode: 'cloud',
    supabaseUrl: useDefault ? publicProject.url : url,
    supabasePublishableKey: useDefault ? publicProject.key : key,
    plannerRequiresSignIn: false,
  }, { headers: { 'Cache-Control': 'no-store' } });
}
