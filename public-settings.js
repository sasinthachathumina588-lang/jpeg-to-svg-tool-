export async function onRequestGet({ env }) {
  const row = await env.DB.prepare("SELECT value FROM settings WHERE key = ?").bind("public").first();
  let settings = {};
  if (row?.value) { try { settings = JSON.parse(row.value); } catch {} }
  return Response.json(settings, { headers: { "Cache-Control": "no-store" } });
}
