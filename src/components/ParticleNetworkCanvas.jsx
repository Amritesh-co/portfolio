import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 72;
const MAX_DIST = 140;       // px — max distance to draw a connecting line
const SPEED = 0.35;         // base movement speed
const DOT_R = 1.8;          // dot radius
const PRIMARY = '139,92,246';   // violet-500
const SECONDARY = '99,102,241'; // indigo-500

function rand(min, max) { return Math.random() * (max - min) + min; }

export function ParticleNetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w, h, particles;

    function mkParticle() {
      return {
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-SPEED, SPEED),
        vy: rand(-SPEED, SPEED),
        color: Math.random() > 0.5 ? PRIMARY : SECONDARY,
      };
    }

    function init() {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
      particles = Array.from({ length: PARTICLE_COUNT }, mkParticle);
    }

    init();
    const ro = new ResizeObserver(init);
    ro.observe(canvas.parentElement);

    let raf;

    function tick() {
      raf = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, w, h);

      // move + bounce
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      // draw edges
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > MAX_DIST) continue;
          const alpha = (1 - dist / MAX_DIST) * 0.35;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${particles[i].color},${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // draw dots
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, DOT_R, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},0.7)`;
        ctx.fill();
      }
    }

    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.5 }}
    />
  );
}
