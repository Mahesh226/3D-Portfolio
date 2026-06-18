import { useEffect, useRef, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  twinkle: number;
  pulseOffset: number;
}

interface NeuralNetBackgroundProps {
  /** Number of nodes. Default 70 */
  nodeCount?: number;
  /** Max distance to draw a connection line. Default 110 */
  connectionDist?: number;
  /** Mouse influence radius. Default 100 */
  mouseRadius?: number;
  /** Base node color. Default #7000ff */
  colorBase?: string;
  /** Highlighted node color near cursor. Default #00f0ff */
  colorHot?: string;
  /** Line color base. Default #7000ff */
  lineColorBase?: string;
  /** Line color when near cursor. Default #00f0ff */
  lineColorHot?: string;
  /** Overall opacity multiplier 0–1. Default 1 */
  opacity?: number;
  /** className applied to the canvas */
  className?: string;
}

export default function NeuralNetBackground({
  nodeCount = 70,
  connectionDist = 110,
  mouseRadius = 100,
  colorBase = '#7000ff',
  colorHot = '#00f0ff',
  lineColorBase = '#7000ff',
  lineColorHot = '#00f0ff',
  opacity = 1,
  className,
}: NeuralNetBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const tRef = useRef(0);

  const hexToRgb = useCallback((hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r},${g},${b}`;
  }, []);

  const rgbBase = hexToRgb(colorBase);
  const rgbHot = hexToRgb(colorHot);
  const rgbLineBase = hexToRgb(lineColorBase);
  const rgbLineHot = hexToRgb(lineColorHot);

  const initNodes = useCallback((w: number, h: number) => {
    nodesRef.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.7,
      twinkle: Math.random() * Math.PI * 2,
      pulseOffset: Math.random() * Math.PI * 2,
    }));
  }, [nodeCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement!;

    const resize = () => {
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      initNodes(width, height);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    parent.addEventListener('mousemove', onMouseMove);
    parent.addEventListener('mouseleave', onMouseLeave);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) { rafRef.current = requestAnimationFrame(draw); return; }

      tRef.current += 0.014;
      const t = tRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = opacity;

      const nodes = nodesRef.current;

      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.twinkle += 0.022;
        n.pulseOffset += 0.008;
      });

      /* ── Draw connection lines ── */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d >= connectionDist) continue;

          const dma = Math.sqrt((a.x - mx) ** 2 + (a.y - my) ** 2);
          const dmb = Math.sqrt((b.x - mx) ** 2 + (b.y - my) ** 2);
          const nearCursor = dma < mouseRadius || dmb < mouseRadius;

          const strength = 1 - d / connectionDist;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);

          if (nearCursor) {
            ctx.strokeStyle = `rgba(${rgbLineHot},${(strength * 0.85).toFixed(2)})`;
            ctx.lineWidth = 1.1;
          } else {
            ctx.strokeStyle = `rgba(${rgbLineBase},${(strength * 0.22).toFixed(2)})`;
            ctx.lineWidth = 0.5;
          }
          ctx.stroke();
        }
      }

      /* ── Draw nodes ── */
      nodes.forEach(n => {
        const dm = Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2);
        const nearCursor = dm < mouseRadius;
        const twinkleAlpha = 0.5 + 0.5 * Math.sin(n.twinkle);
        const pulse = 0.7 + 0.3 * Math.sin(n.pulseOffset + t);

        if (nearCursor) {
          /* Outer glow ring */
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgbHot},0.06)`;
          ctx.fill();

          /* Mid ring */
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgbHot},0.12)`;
          ctx.fill();

          /* Core */
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgbHot},${(twinkleAlpha * pulse).toFixed(2)})`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgbBase},${(twinkleAlpha * 0.55).toFixed(2)})`;
          ctx.fill();
        }
      });

      /* ── Cursor dot ── */
      if (mx > 0 && my > 0) {
        ctx.beginPath();
        ctx.arc(mx, my, 3, 0, Math.PI * 2);
        ctx.fillStyle = colorHot;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mx, my, 16, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rgbHot},0.25)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mx, my, 30, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rgbHot},0.08)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      parent.removeEventListener('mousemove', onMouseMove);
      parent.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [initNodes, connectionDist, mouseRadius, colorHot, rgbBase, rgbHot, rgbLineBase, rgbLineHot, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
