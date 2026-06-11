import { useEffect, useRef } from 'react';

// Each fragment: { text, tokens: [{text, color}] }
// Colors tuned to portfolio dark theme
const K = '#c084fc'; // keyword — violet
const F = '#7dd3fc'; // function/identifier — sky
const S = '#86efac'; // string — emerald
const N = '#fb923c'; // number/value — amber
const P = '#94a3b8'; // punctuation/muted
const C = '#64748b'; // comment — slate

const FRAGMENTS = [
  [{ t: 'const', c: K }, { t: ' fn ', c: F }, { t: '= async () => {}', c: P }],
  [{ t: 'git commit', c: F }, { t: ' -m ', c: P }, { t: '"feat: add auth"', c: S }],
  [{ t: 'npm run', c: F }, { t: ' build', c: K }],
  [{ t: 'docker compose', c: F }, { t: ' up -d', c: P }],
  [{ t: 'import', c: K }, { t: ' { useState }', c: F }, { t: " from 'react'", c: S }],
  [{ t: 'export default', c: K }, { t: ' Component', c: F }],
  [{ t: 'await', c: K }, { t: ' Promise', c: F }, { t: '.all([])', c: P }],
  [{ t: 'class ', c: K }, { t: 'Agent', c: F }, { t: ' extends ', c: K }, { t: 'Base', c: F }],
  [{ t: 'ssh ', c: F }, { t: 'ubuntu@', c: P }, { t: '192.168.1.1', c: N }],
  [{ t: 'kubectl apply', c: F }, { t: ' -f ', c: P }, { t: 'deploy.yaml', c: S }],
  [{ t: 'cargo build', c: F }, { t: ' --release', c: K }],
  [{ t: '// TODO: ', c: C }, { t: 'fix edge case', c: C }],
  [{ t: 'try', c: K }, { t: ' { }', c: P }, { t: ' catch', c: K }, { t: ' (e)', c: P }],
  [{ t: 'SELECT', c: K }, { t: ' * ', c: P }, { t: 'FROM', c: K }, { t: ' users', c: F }],
  [{ t: 'def ', c: K }, { t: '__init__', c: F }, { t: '(self):', c: P }],
  [{ t: '< ', c: P }, { t: 'Component', c: F }, { t: ' />', c: P }],
  [{ t: '[].map(', c: P }, { t: 'x', c: F }, { t: ' => ', c: K }, { t: 'x', c: F }, { t: ')', c: P }],
  [{ t: '200 ', c: N }, { t: 'OK', c: S }],
  [{ t: '404 ', c: N }, { t: 'Not Found', c: C }],
  [{ t: '#[derive(', c: P }, { t: 'Debug', c: F }, { t: ')]', c: P }],
  [{ t: 'fn ', c: K }, { t: 'main', c: F }, { t: '() -> ', c: P }, { t: 'Result', c: F }, { t: '<()>', c: P }],
  [{ t: 'if __name__', c: F }, { t: ' == ', c: P }, { t: '"__main__"', c: S }],
  [{ t: '{ ...', c: P }, { t: 'spread', c: F }, { t: ' }', c: P }],
  [{ t: 'type ', c: K }, { t: 'Props', c: F }, { t: ' = {', c: P }],
  [{ t: 'git push', c: F }, { t: ' origin main', c: P }],
  [{ t: 'npm install', c: F }, { t: ' --save-dev', c: K }],
  [{ t: 'useEffect', c: F }, { t: '(() => {}, [])', c: P }],
  [{ t: 'console', c: F }, { t: '.log(', c: P }, { t: '"debug"', c: S }, { t: ')', c: P }],
  [{ t: 'return', c: K }, { t: ' <', c: P }, { t: 'div', c: F }, { t: '>', c: P }],
  [{ t: 'ENV ', c: K }, { t: 'NODE_ENV', c: F }, { t: '=production', c: S }],
];

const FONT = '13px "Fira Code", "Courier New", monospace';
const FONT_SM = '11px "Fira Code", "Courier New", monospace';
const FONT_LG = '15px "Fira Code", "Courier New", monospace';

function rand(a, b) { return Math.random() * (b - a) + a; }

function mkSprite(w, h) {
  const tmpl = FRAGMENTS[Math.floor(Math.random() * FRAGMENTS.length)];
  const size = Math.random();
  const font = size < 0.3 ? FONT_SM : size > 0.8 ? FONT_LG : FONT;
  const speed = rand(0.18, 0.55);
  const opacity = rand(0.12, 0.38);
  return {
    tokens: tmpl,
    font,
    x: rand(0, w),
    y: rand(0, h),
    speed,
    opacity,
  };
}

export function CodeFragmentsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w, h, sprites;

    function init() {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
      sprites = Array.from({ length: 70 }, () => mkSprite(w, h));
    }

    init();
    const ro = new ResizeObserver(init);
    ro.observe(canvas.parentElement);

    let raf;

    function tick() {
      raf = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, w, h);

      for (const s of sprites) {
        ctx.font = s.font;
        ctx.globalAlpha = s.opacity;

        let cx = s.x;
        for (const tok of s.tokens) {
          ctx.fillStyle = tok.c;
          ctx.fillText(tok.t, cx, s.y);
          cx += ctx.measureText(tok.t).width;
        }

        ctx.globalAlpha = 1;

        s.y -= s.speed;
        // wrap: reappear at bottom with a new random x when it exits the top
        if (s.y < -20) {
          Object.assign(s, mkSprite(w, h));
          s.y = h + 10;
        }
      }
    }

    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none blur-[1.5px]"
    />
  );
}
