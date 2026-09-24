// Pre-launch gate: fails while anything the brief says "must resolve before launch" is still open.
// Run with `npm run check:launch`.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const problems = [];

const metricsSrc = readFileSync('src/data/metrics.ts', 'utf8');
for (const m of metricsSrc.matchAll(/(\w+):\s*\{[^}]*?verified:\s*false/g)) {
  problems.push(`Metric "${m[1]}" is unverified (src/data/metrics.ts)`);
}

const siteSrc = readFileSync('src/data/site.ts', 'utf8');
if (/resume:\s*''/.test(siteSrc)) problems.push('Résumé link is empty (src/data/site.ts)');
if (readFileSync('astro.config.mjs', 'utf8').includes('example.com')) {
  problems.push('`site` in astro.config.mjs is still example.com');
}

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}
for (const file of walk('src/pages')) {
  const src = readFileSync(file, 'utf8');
  const placeholders = (src.match(/<Placeholder\b/g) || []).length;
  const todos = (src.match(/class="todo"/g) || []).length;
  if (placeholders || todos) problems.push(`${file}: ${placeholders} image placeholder(s), ${todos} copy placeholder(s)`);
  const emptyUrls = (src.match(/url: ''/g) || []).length;
  if (emptyUrls) problems.push(`${file}: ${emptyUrls} empty link(s)`);
}

if (problems.length) {
  console.error(`Not ready to launch (${problems.length}):\n` + problems.map((p) => `  - ${p}`).join('\n'));
  process.exit(1);
}
console.log('Ready to launch.');
