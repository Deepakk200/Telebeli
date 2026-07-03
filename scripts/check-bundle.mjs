import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

/**
 * Per-route-group bundle budget gate. Next 16 (Turbopack) emits no
 * app-build-manifest.json, so this reads each prerendered route's HTML in
 * .next/server/app and sums the raw bytes of the /_next/static JS it loads
 * (script src + preload links, deduped) — the initial-JS payload per route.
 * Budgets are raw (uncompressed) — stable across gzip settings and ~3x wire size.
 */
/* Turbopack strips route groups from output paths, so groups are matched by
   URL shape: /dashboard* is the ops surface, every other public route is
   marketing. Error shells (/_global-error, /_not-found) are exempt. */
const isDashboard = (k) => k === "/dashboard" || k.startsWith("/dashboard/");
const BUDGETS = [
  // route match → max raw JS bytes for the heaviest route in the group.
  // Regression ceilings snapshot at M1 (dashboard 1347 KB, marketing 1394 KB
  // measured 2026-07-03) + ~8% headroom; ratchet down as perf milestones land.
  { group: "dashboard", match: isDashboard, maxBytes: 1450 * 1024 },
  { group: "marketing", match: (k) => !isDashboard(k) && !k.startsWith("/_"), maxBytes: 1500 * 1024 },
];

const appDir = join(".next", "server", "app");

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.name.endsWith(".html") ? [full] : [];
  });
}

function routeJsBytes(htmlPath) {
  const html = readFileSync(htmlPath, "utf8");
  const refs = new Set(
    [...html.matchAll(/\/_next\/(static\/[^"'\s]+\.js)/g)].map((m) => m[1]),
  );
  let bytes = 0;
  for (const ref of refs) {
    try {
      bytes += statSync(join(".next", ref)).size;
    } catch {
      // chunk referenced but not on disk (e.g. dev artifact) — skip
    }
  }
  return bytes;
}

let failed = false;
for (const budget of BUDGETS) {
  let worst = { route: null, bytes: 0 };
  for (const file of htmlFiles(appDir)) {
    const route = "/" + relative(appDir, file).split(sep).join("/").replace(/\.html$/, "");
    if (!budget.match(route)) continue;
    const bytes = routeJsBytes(file);
    if (bytes > worst.bytes) worst = { route, bytes };
  }
  if (!worst.route) continue;
  const kb = (worst.bytes / 1024).toFixed(0);
  const maxKb = (budget.maxBytes / 1024).toFixed(0);
  const over = worst.bytes > budget.maxBytes;
  console.log(
    `${over ? "FAIL" : "ok"}  ${budget.group}: ${worst.route} = ${kb} KB (budget ${maxKb} KB)`,
  );
  if (over) failed = true;
}

process.exit(failed ? 1 : 0);
