import { useEffect, useRef } from 'react';

type Particle = {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
};

/** Soft warm shades that sit in the cream/peach desk background */
const SHADES = [
  '79, 50, 46',   // ink
  '110, 72, 67',  // ink2
  '158, 117, 112', // ink3
  '194, 157, 153', // ink4
  '212, 97, 82',  // accent (very soft via alpha)
  '227, 192, 184', // paper3
  '242, 218, 212', // paper2
];

type Props = {
  active?: boolean;
  reducedMotion?: boolean | null;
};

/** Tiny dust particles matching the hero paper tones; flee cursor at close range. */
export default function ParticleField({ active = true, reducedMotion = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, inside: false });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const rebuild = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      sizeRef.current = { w, h, dpr };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = w * h;
      // Denser full field of fine dust
      const target = Math.round(Math.min(4200, Math.max(1400, area / 550)));
      const cols = Math.round(Math.sqrt(target * (w / h)));
      const rows = Math.round(target / cols);
      const gapX = w / (cols + 1);
      const gapY = h / (rows + 1);

      const next: Particle[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const homeX = gapX * (c + 1) + (Math.random() - 0.5) * gapX * 0.85;
          const homeY = gapY * (r + 1) + (Math.random() - 0.5) * gapY * 0.85;
          const shade = SHADES[Math.floor(Math.random() * SHADES.length)];
          next.push({
            homeX,
            homeY,
            x: homeX,
            y: homeY,
            vx: 0,
            vy: 0,
            size: 0.55 + Math.random() * 0.95,
            color: shade,
            alpha: 0.28 + Math.random() * 0.28,
          });
        }
      }
      particlesRef.current = next;
    };

    rebuild();

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.inside = true;
    };
    const onLeave = () => {
      mouseRef.current.inside = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', rebuild);

    // Very close repulsion only — tight bubble around the cursor
    const RADIUS = 42;
    const RADIUS_SQ = RADIUS * RADIUS;
    const STRENGTH = 22;
    const SPRING = 0.14;
    const DAMP = 0.72;

    const tick = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      if (active) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const particles = particlesRef.current;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          if (!reducedMotion && mouseRef.current.inside) {
            const dx = p.x - mx;
            const dy = p.y - my;
            const dSq = dx * dx + dy * dy;
            if (dSq < RADIUS_SQ && dSq > 0.01) {
              const d = Math.sqrt(dSq);
              const force = (1 - d / RADIUS) * STRENGTH;
              p.vx += (dx / d) * force;
              p.vy += (dy / d) * force;
            }
          }

          p.vx += (p.homeX - p.x) * SPRING;
          p.vy += (p.homeY - p.y) * SPRING;
          p.vx *= DAMP;
          p.vy *= DAMP;
          p.x += p.vx;
          p.y += p.vy;

          ctx.beginPath();
          ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', rebuild);
    };
  }, [active, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`particle-field${active ? ' is-active' : ''}`}
      aria-hidden="true"
    />
  );
}
