export function GET() {
  return Response.json({
    geminiConfigured: false,
    storageMode: 'local',
    plannerRequiresSignIn: false,
  }, { headers: { 'Cache-Control': 'no-store' } });
}
