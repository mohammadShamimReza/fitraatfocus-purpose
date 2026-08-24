#!/usr/bin/env node
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const docsApi = join(repoRoot, "docs", "api");

function count(dir) {
  return readdirSync(join(docsApi, dir)).filter((n) => n.endsWith('.md') && !n.endsWith('map.md')).length;
}

console.log('DOCUMENTATION STATUS');
console.log('APIs documented:', count('endpoints'));
console.log('Schemas documented:', count('schemas'));
console.log('Models documented:', count('models'));
