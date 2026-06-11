// Post-process D2-compiled SVGs: inject width/height onto the outer <svg> so
// browsers load them with correct intrinsic dimensions when used as <img>.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

function fixDir(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) { fixDir(full); continue; }
    if (extname(entry) !== '.svg') continue;

    let src = readFileSync(full, 'utf8');
    // Already has explicit width on outer element — skip
    if (/^<\?xml[^?]*\?>\s*<svg[^>]+\bwidth="/.test(src) ||
        /^<svg[^>]+\bwidth="/.test(src)) continue;

    // Extract W H from the outer viewBox="0 0 W H"
    const m = src.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
    if (!m) continue;
    const [, w, h] = m;

    // Inject width/height right after the opening <svg tag's last attribute
    src = src.replace(
      /(<svg\b[^>]*)(>)/,
      `$1 width="${Math.round(w)}" height="${Math.round(h)}"$2`
    );
    writeFileSync(full, src);
    console.log(`fixed: ${full}  (${w}×${h})`);
  }
}

fixDir('public/diagrams');
