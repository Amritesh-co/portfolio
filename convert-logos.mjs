import sharp from "sharp";
import { mkdirSync, readFileSync, readdirSync } from "fs";
import { join } from "path";
import * as simpleIcons from "simple-icons";

const inputDir = "./public/logos";
const outputDir = "./public/logos/png";
mkdirSync(outputDir, { recursive: true });

const colorMap = {
  "anthropic":    "siAnthropic",
  "cloudflare":   "siCloudflare",
  "css3":         "siCss3",
  "docker":       "siDocker",
  "express":      "siExpress",
  "fastapi":      "siFastapi",
  "firebase":     "siFirebase",
  "flask":        "siFlask",
  "git":          "siGit",
  "github":       "siGithub",
  "html5":        "siHtml5",
  "java":         "siJava",
  "javascript":   "siJavascript",
  "langchain":    null,
  "langgraph":    null,
  "linux":        "siLinux",
  "mongodb":      "siMongodb",
  "mysql":        "siMysql",
  "nextcloud":    "siNextcloud",
  "nextjs":       "siNextdotjs",
  "nodejs":       "siNodedotjs",
  "numpy":        "siNumpy",
  "nvidia-nim":   "siNvidia",
  "ollama":       "siOllama",
  "openai":       "siOpenai",
  "openrouter":   null,
  "pandas":       "siPandas",
  "python":       "siPython",
  "pytorch":      "siPytorch",
  "qdrant":       "siQdrant",
  "react":        "siReact",
  "redis":        "siRedis",
  "scikit-learn": "siScikitlearn",
  "tailscale":    "siTailscale",
  "tailwindcss":  "siTailwindcss",
  "tensorflow":   "siTensorflow",
  "typescript":   "siTypescript",
  "ubuntu":       "siUbuntu",
  "vite":         "siVite",
};

const fallbackColors = {
  "langchain":    "1C3C3C",
  "langgraph":    "1C3C3C",
  "openrouter":   "6467F2",
  "ollama":       "EFEFEF",
  "flask":        "EFEFEF",
  "express":      "EFEFEF",
  "github":       "EFEFEF",
};

function getColor(slug) {
  const key = colorMap[slug];
  if (key && simpleIcons[key]) return simpleIcons[key].hex;
  return fallbackColors[slug] || "888888";
}

const files = readdirSync(inputDir).filter(f => f.endsWith(".svg"));

for (const file of files) {
  const slug = file.replace(".svg", "");
  const color = getColor(slug);

  let svg = readFileSync(join(inputDir, file), "utf8");
  // Replace existing fill or inject new one on root SVG element
  if (/fill="[^"]*"/.test(svg.match(/<svg[^>]*>/)?.[0] || "")) {
    svg = svg.replace(/(<svg[^>]*?) fill="[^"]*"/, `$1 fill="#${color}"`);
  } else {
    svg = svg.replace(/(<svg[^>]*?)>/, `$1 fill="#${color}">`);
  }

  await sharp(Buffer.from(svg))
    .resize(256, 256, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(outputDir, `${slug}.png`));

  console.log(`✓ ${slug} (#${color})`);
}

console.log(`\nDone: ${files.length} logos converted with brand colors.`);
