#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function parseCreateFileRoute(path, text) {
  const m = text.match(/createFileRoute\(\s*["'`]([^"'`]+)["'`]\s*\)/);
  if (!m) return null;
  return m[1];
}

const routeFiles = walk(join(repoRoot, "src", "routes"))
  .map((f) => relative(repoRoot, f))
  .filter((p) => p.endsWith(".tsx") || p.endsWith(".ts"))
  .filter((p) => !p.includes("/-components/"))
  .filter((p) => !p.endsWith("routeTree.gen.ts"));

const pages = [];
for (const rf of routeFiles) {
  const txt = readFileSync(join(repoRoot, rf), "utf8");
  const route = parseCreateFileRoute(rf, txt);
  if (!route) continue;
  pages.push({ route, file: rf });
}
pages.sort((a, b) => a.route.localeCompare(b.route));

const apiFiles = walk(join(repoRoot, "functions", "src", "routes"))
  .map((f) => relative(repoRoot, f))
  .filter((p) => p.endsWith(".ts"));

function parseApiEndpoints(path) {
  const txt = readFileSync(path, "utf8");
  const out = [];
  const rg = /\.(get|post|put|patch|delete)\(\s*["'`]([^"'`]+)["'`]/g;
  let m;
  while ((m = rg.exec(txt))) out.push(`${m[1].toUpperCase()} ${m[2]}`);
  return out;
}

const apis = [];
for (const f of apiFiles) {
  for (const e of parseApiEndpoints(join(repoRoot, f))) {
    apis.push({ endpoint: e, file: f });
  }
}
apis.sort((a, b) => a.endpoint.localeCompare(b.endpoint));

console.log("# Studio routes (src/routes)");
for (const p of pages) console.log(`- ${p.route} -> ${p.file}`);

console.log("\n# Studio function routes (module-local)");
for (const a of apis) console.log(`- ${a.endpoint} -> ${a.file}`);

console.log("\nNote: /v1 mounting lives in functions/src/routes/index.ts");
