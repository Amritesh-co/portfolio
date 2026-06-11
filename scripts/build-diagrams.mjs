// Compile all .d2 files under src/diagrams/ to public/diagrams/ then fix SVG dimensions.
// Usage: node scripts/build-diagrams.mjs [optional/path/to/file.d2]
import { execSync } from 'child_process';
import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, extname, dirname, relative, basename } from 'path';

const SRC = 'src/diagrams';
const OUT = 'public/diagrams';
const THEME = 200;

function compile(src) {
  const rel   = relative(SRC, src);
  const out   = join(OUT, rel.replace(/\.d2$/, '.svg'));
  mkdirSync(dirname(out), { recursive: true });
  execSync(`d2 --theme ${THEME} "${src}" "${out}"`, { stdio: 'inherit' });
  fixSvg(out);
}

function fixSvg(path) {
  let src = readFileSync(path, 'utf8');
  if (/^<svg[^>]+\bwidth="/.test(src) || /^<\?xml[^?]*\?>\s*<svg[^>]+\bwidth="/.test(src)) return;
  const m = src.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
  if (!m) return;
  const [, w, h] = m;
  src = src.replace(/(<svg\b[^>]*)(>)/, `$1 width="${Math.round(w)}" height="${Math.round(h)}"$2`);
  writeFileSync(path, src);
  console.log(`  → fixed dimensions ${Math.round(w)}×${Math.round(h)}`);
}

function walkAndCompile(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) { walkAndCompile(full); continue; }
    if (extname(entry) === '.d2') compile(full);
  }
}

const target = process.argv[2];
target ? compile(target) : walkAndCompile(SRC);
