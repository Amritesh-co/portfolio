import { useEffect, useRef } from "react";

/**
 * Helper to convert hex color to rgb components
 * @param {string} hex 
 * @returns {string} "r,g,b"
 */
const hexToRgb = (hex) => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("");
  }
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
    : "124,101,230"; // fallback brand color
};

export const ParticleNetworkBackground = ({
  particleColor = "brand",
  lineColor = "brand",
  particleCount = 80,
  minRadius = 1.5,
  maxRadius = 4.5,
  maxDistance = 120,
  moveSpeed = 0.4,
  mouseInteraction = true,
  pulseEnabled = true,
  pulseSpeed = 0.005,
  lineOpacity = 0.2,
  particleOpacity = 0.8,
  mouseRadius = 150,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let mousePosition = null;
    let pulseAngle = 0;

    // Handle resizing
    const handleResize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.clientWidth : window.innerWidth;
      canvas.height = parent ? parent.clientHeight : window.innerHeight;
    };

    // Initialize particles
    const createParticles = () => {
      particles = [];
      const sizeRange = maxRadius - minRadius;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          dx: (Math.random() - 0.5) * moveSpeed,
          dy: (Math.random() - 0.5) * moveSpeed,
          radius: Math.random() * sizeRange + minRadius,
        });
      }
    };

    // Event listeners
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mousePosition = null;
    };

    // Initial setup
    handleResize();
    createParticles();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Animation Loop
    const animate = () => {
      // Determine brand color dynamically based on light/dark mode
      const isDark = document.documentElement.classList.contains("dark");
      const defaultBrandColor = isDark ? "#7d66e6" : "#7362d6";
      
      const resolvedParticleColor = particleColor === "brand" ? defaultBrandColor : particleColor;
      const resolvedLineColor = lineColor === "brand" ? defaultBrandColor : lineColor;
      const rgbColor = hexToRgb(resolvedLineColor);

      // Clear the canvas (transparent background)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update particles
      particles.forEach((particle) => {
        // Pulse animation
        if (pulseEnabled) {
          pulseAngle += pulseSpeed / particleCount; // divide to slow down and smooth across frames
          const pulseScale = Math.sin(pulseAngle + particle.radius) * 0.3 + 1;
          particle.currentRadius = particle.radius * pulseScale;
        } else {
          particle.currentRadius = particle.radius;
        }

        // Move particle
        particle.x += particle.dx;
        particle.y += particle.dy;

        // Mouse interaction (repulsion)
        if (mouseInteraction && mousePosition) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseRadius) {
            const force = (mouseRadius - distance) / mouseRadius;
            const angle = Math.atan2(dy, dx);
            const repelX = Math.cos(angle) * force * 0.4;
            const repelY = Math.sin(angle) * force * 0.4;
            particle.dx -= repelX;
            particle.dy -= repelY;
          }
        }

        // Boundary collision (bounce)
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.dx = -particle.dx;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.dy = -particle.dy;
        }

        // Limit speed to moveSpeed
        const speed = Math.sqrt(particle.dx * particle.dx + particle.dy * particle.dy);
        if (speed > moveSpeed) {
          particle.dx = (particle.dx / speed) * moveSpeed;
          particle.dy = (particle.dy / speed) * moveSpeed;
        }
      });

      // Draw connections first (behind particles)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${rgbColor}, ${opacity * lineOpacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      ctx.fillStyle = resolvedParticleColor;
      ctx.globalAlpha = particleOpacity;
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.currentRadius || particle.radius,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    particleColor,
    lineColor,
    particleCount,
    minRadius,
    maxRadius,
    maxDistance,
    moveSpeed,
    mouseInteraction,
    pulseEnabled,
    pulseSpeed,
    lineOpacity,
    particleOpacity,
    mouseRadius,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
