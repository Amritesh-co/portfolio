import sharp from "sharp";
import { mkdirSync, readFileSync, readdirSync } from "fs";
import { join } from "path";

const inputDir = "./public/logos";
const outputDir = "./public/logos/png";
mkdirSync(outputDir, { recursive: true });

const files = readdirSync(inputDir).filter(f => f.endsWith(".svg"));

for (const file of files) {
  const slug = file.replace(".svg", "");
  const svg = readFileSync(join(inputDir, file), "utf8");

  await sharp(Buffer.from(svg))
    .resize(256, 256, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(outputDir, `${slug}.png`));

  console.log(`✓ ${slug}`);
}

console.log(`\nDone: ${files.length} logos converted as-is.`);
