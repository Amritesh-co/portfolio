import { useEffect, useRef } from 'react';

const CHARS = '01{}[]<>/\\;:=+*&|^~#@→∑λ∞const async fn';
const FONT_SIZE = 13;
const FPS_INTERVAL = 55; // ~18 fps — subtle, not distracting
// Trail fill matches hsl(222 47% 4%) ≈ #050914
const BG = 'rgba(5,9,20,0.18)';

export function CodeRainCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w, h, drops;

    function init() {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
      const cols = Math.floor(w / FONT_SIZE) + 1;
      // stagger starts so they don't all flood in at once
      drops = Array.from({ length: cols }, () => -Math.floor(Math.random() * (h / FONT_SIZE)));
    }

    init();

    const ro = new ResizeObserver(init);
    ro.observe(canvas.parentElement);

    let raf;
    let last = 0;

    function tick(ts) {
      raf = requestAnimationFrame(tick);
      if (ts - last < FPS_INTERVAL) return;
      last = ts;

      // fade trail — slightly transparent background wipe
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${FONT_SIZE}px "Fira Code", "Courier New", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        // bright violet head
        ctx.fillStyle = 'rgba(139,92,246,0.9)';
        ctx.fillText(char, x, y);

        // second char just behind — dimmer, creates a short glow trail
        if (drops[i] > 1) {
          const prevChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          ctx.fillStyle = 'rgba(167,139,250,0.4)';
          ctx.fillText(prevChar, x, y - FONT_SIZE);
        }

        if (y > h && Math.random() > 0.975) drops[i] = 0;
        else drops[i]++;
      }
    }

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.45 }}
    />
  );
}
