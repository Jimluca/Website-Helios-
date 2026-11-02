// Gezondheidscheck voor Coolify (zoals /up in de Helios-app): de server draait en antwoordt.
export function GET() {
  return new Response("ok", { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}
