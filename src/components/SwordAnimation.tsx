import { useEffect, useRef } from "react";

interface SwordAnimationProps {
  style: string;
  glow: string;
  isVisible: boolean;
}

const SwordAnimation = ({ style, glow, isVisible }: SwordAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = 160 * dpr;
    canvas.height = 120 * dpr;
    ctx.scale(dpr, dpr);

    let t = 0;

    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };

    const rgb = hexToRgb(glow);

    const drawBlade = (ctx: CanvasRenderingContext2D, t: number) => {
      const cx = 80;
      const cy = 60;

      ctx.clearRect(0, 0, 160, 120);

      // Glow pulse
      const pulseAlpha = 0.15 + Math.sin(t * 2) * 0.1;
      const glowRadius = 40 + Math.sin(t * 3) * 5;
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
      gradient.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${pulseAlpha})`);
      gradient.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 160, 120);

      ctx.save();
      ctx.translate(cx, cy);

      switch (style) {
        case "Water / Sun":
          drawDualBlade(ctx, t, rgb);
          break;
        case "Thunder":
          drawThunderBlade(ctx, t, rgb);
          break;
        case "Beast":
          drawDualSerrated(ctx, t, rgb);
          break;
        case "Water":
          drawWaterBlade(ctx, t, rgb);
          break;
        case "Insect":
          drawNeedleBlade(ctx, t, rgb);
          break;
        case "Flame":
          drawFlameBlade(ctx, t, rgb);
          break;
        case "Love":
          drawWhipBlade(ctx, t, rgb);
          break;
        case "Mist":
          drawMistBlade(ctx, t, rgb);
          break;
        default:
          drawDefaultBlade(ctx, t, rgb);
      }

      ctx.restore();
    };

    const drawDefaultBlade = (ctx: CanvasRenderingContext2D, t: number, c: { r: number; g: number; b: number }) => {
      const sway = Math.sin(t * 1.5) * 3;
      ctx.rotate((sway * Math.PI) / 180);

      // Blade
      ctx.beginPath();
      ctx.moveTo(0, -45);
      ctx.lineTo(3, -10);
      ctx.lineTo(3, 15);
      ctx.lineTo(-3, 15);
      ctx.lineTo(-3, -10);
      ctx.closePath();
      ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.8)`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},1)`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Guard
      ctx.beginPath();
      ctx.ellipse(0, 15, 8, 3, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.6)`;
      ctx.fill();

      // Handle
      ctx.fillStyle = "#2a2a2a";
      ctx.fillRect(-2, 18, 4, 20);

      // Wrap
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.3)`;
        ctx.fillRect(-3, 19 + i * 4, 6, 2);
      }
    };

    const drawDualBlade = (ctx: CanvasRenderingContext2D, t: number, c: { r: number; g: number; b: number }) => {
      const sway = Math.sin(t * 1.2) * 2;
      ctx.rotate((sway * Math.PI) / 180);

      // Blade body
      ctx.beginPath();
      ctx.moveTo(0, -48);
      ctx.lineTo(4, -8);
      ctx.lineTo(4, 12);
      ctx.lineTo(-4, 12);
      ctx.lineTo(-4, -8);
      ctx.closePath();

      // Alternating color effect (water blue ↔ sun red)
      const blend = (Math.sin(t * 2) + 1) / 2;
      const r2 = Math.round(c.r * (1 - blend) + 220 * blend);
      const g2 = Math.round(c.g * (1 - blend) + 60 * blend);
      const b2 = Math.round(c.b * (1 - blend) + 60 * blend);
      ctx.fillStyle = `rgba(${r2},${g2},${b2},0.85)`;
      ctx.fill();

      // Edge gleam
      const gleamY = -48 + ((t * 30) % 60);
      const gleamGrad = ctx.createLinearGradient(0, gleamY - 5, 0, gleamY + 5);
      gleamGrad.addColorStop(0, "rgba(255,255,255,0)");
      gleamGrad.addColorStop(0.5, "rgba(255,255,255,0.6)");
      gleamGrad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gleamGrad;
      ctx.fillRect(-3, gleamY - 5, 6, 10);

      // Wheel tsuba
      ctx.beginPath();
      ctx.arc(0, 14, 7, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},0.7)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4;
        ctx.beginPath();
        ctx.moveTo(0, 14);
        ctx.lineTo(Math.cos(a) * 7, 14 + Math.sin(a) * 7);
        ctx.stroke();
      }

      // Handle
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(-2.5, 21, 5, 18);
    };

    const drawThunderBlade = (ctx: CanvasRenderingContext2D, t: number, c: { r: number; g: number; b: number }) => {
      // Vibration effect
      const vib = Math.sin(t * 20) * (Math.sin(t * 3) > 0.5 ? 1.5 : 0);
      ctx.translate(vib, 0);

      ctx.beginPath();
      ctx.moveTo(0, -48);
      ctx.lineTo(3, -8);
      ctx.lineTo(3, 12);
      ctx.lineTo(-3, 12);
      ctx.lineTo(-3, -8);
      ctx.closePath();
      ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.9)`;
      ctx.fill();

      // Lightning crackling along blade
      ctx.beginPath();
      ctx.moveTo(0, -45);
      for (let y = -45; y < 10; y += 6) {
        const x = (Math.random() - 0.5) * 6 * Math.sin(t * 8 + y);
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(255,255,200,${0.5 + Math.sin(t * 6) * 0.3})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Guard
      ctx.beginPath();
      ctx.arc(0, 14, 6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.5)`;
      ctx.fill();

      // Handle
      ctx.fillStyle = "#222";
      ctx.fillRect(-2, 20, 4, 18);

      // Yellow wrap
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.4)`;
        ctx.fillRect(-3, 21 + i * 4, 6, 2);
      }
    };

    const drawDualSerrated = (ctx: CanvasRenderingContext2D, t: number, c: { r: number; g: number; b: number }) => {
      const sway = Math.sin(t * 2) * 4;

      for (let side = -1; side <= 1; side += 2) {
        ctx.save();
        ctx.translate(side * 12, 0);
        ctx.rotate((sway * side * Math.PI) / 180);

        // Serrated blade
        ctx.beginPath();
        ctx.moveTo(0, -42);
        for (let y = -42; y < 10; y += 5) {
          ctx.lineTo(side * (3 + Math.sin(y * 0.5) * 2), y);
          ctx.lineTo(side * 1, y + 2.5);
        }
        ctx.lineTo(side * 1, 10);
        ctx.lineTo(-side * 2, 10);
        ctx.lineTo(-side * 2, -42);
        ctx.closePath();
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.7)`;
        ctx.fill();

        // No guard (Inosuke style)

        // Handle wrapped in cloth
        ctx.fillStyle = "#333";
        ctx.fillRect(-2, 12, 4, 16);

        ctx.restore();
      }
    };

    const drawWaterBlade = (ctx: CanvasRenderingContext2D, t: number, c: { r: number; g: number; b: number }) => {
      const sway = Math.sin(t * 1.3) * 2;
      ctx.rotate((sway * Math.PI) / 180);

      // Water ripple effect on blade
      ctx.beginPath();
      ctx.moveTo(0, -48);
      ctx.lineTo(3.5, -8);
      ctx.lineTo(3.5, 12);
      ctx.lineTo(-3.5, 12);
      ctx.lineTo(-3.5, -8);
      ctx.closePath();
      ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.8)`;
      ctx.fill();

      // Water flow lines
      for (let i = 0; i < 3; i++) {
        const y = -40 + ((t * 25 + i * 20) % 52);
        ctx.beginPath();
        ctx.moveTo(-2, y);
        ctx.quadraticCurveTo(Math.sin(t * 3 + i) * 3, y + 4, 2, y + 8);
        ctx.strokeStyle = `rgba(255,255,255,${0.2 + Math.sin(t + i) * 0.1})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Hexagon tsuba
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3 - Math.PI / 6;
        const x = Math.cos(a) * 8;
        const y = 14 + Math.sin(a) * 8;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},0.7)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(-2, 22, 4, 18);
    };

    const drawNeedleBlade = (ctx: CanvasRenderingContext2D, t: number, c: { r: number; g: number; b: number }) => {
      const sway = Math.sin(t * 1.8) * 2;
      ctx.rotate((sway * Math.PI) / 180);

      // Thin needle blade
      ctx.beginPath();
      ctx.moveTo(0, -50);
      ctx.lineTo(1.5, -15);
      ctx.lineTo(2, 12);
      ctx.lineTo(-2, 12);
      ctx.lineTo(-1.5, -15);
      ctx.closePath();
      ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.85)`;
      ctx.fill();

      // Poison drip effect
      const dripY = -50 + ((t * 15) % 62);
      ctx.beginPath();
      ctx.arc(0, dripY, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180,100,255,${0.4 + Math.sin(t * 4) * 0.2})`;
      ctx.fill();

      // Butterfly tsuba
      for (let side = -1; side <= 1; side += 2) {
        ctx.beginPath();
        ctx.ellipse(side * 6, 13, 5, 3, (side * 20 * Math.PI) / 180, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${0.3 + Math.sin(t * 2) * 0.1})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},0.6)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      ctx.fillStyle = "#222";
      ctx.fillRect(-1.5, 18, 3, 18);
    };

    const drawFlameBlade = (ctx: CanvasRenderingContext2D, t: number, c: { r: number; g: number; b: number }) => {
      const sway = Math.sin(t * 1.5) * 1.5;
      ctx.rotate((sway * Math.PI) / 180);

      // Blade
      ctx.beginPath();
      ctx.moveTo(0, -48);
      ctx.lineTo(4, -6);
      ctx.lineTo(4, 12);
      ctx.lineTo(-4, 12);
      ctx.lineTo(-4, -6);
      ctx.closePath();

      const flameGrad = ctx.createLinearGradient(0, -48, 0, 12);
      flameGrad.addColorStop(0, `rgba(255,200,50,0.9)`);
      flameGrad.addColorStop(0.5, `rgba(${c.r},${c.g},${c.b},0.85)`);
      flameGrad.addColorStop(1, `rgba(200,50,30,0.8)`);
      ctx.fillStyle = flameGrad;
      ctx.fill();

      // Flame particles rising from blade
      for (let i = 0; i < 5; i++) {
        const px = (Math.sin(t * 3 + i * 1.5) * 8);
        const py = -48 + Math.sin(t * 2 + i) * 5 - i * 3;
        const size = 1.5 + Math.sin(t * 4 + i) * 0.5;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,${150 + i * 20},50,${0.3 + Math.sin(t * 3 + i) * 0.2})`;
        ctx.fill();
      }

      // Flame tsuba
      ctx.beginPath();
      for (let i = 0; i < 12; i++) {
        const a = (i * Math.PI) / 6;
        const r = 6 + Math.sin(a * 3 + t * 3) * 2;
        const x = Math.cos(a) * r;
        const y = 14 + Math.sin(a) * r;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.4)`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},0.7)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(-2.5, 22, 5, 18);
    };

    const drawWhipBlade = (ctx: CanvasRenderingContext2D, t: number, c: { r: number; g: number; b: number }) => {
      // Flexible whip-like sword
      ctx.beginPath();
      ctx.moveTo(0, -48);
      for (let y = -48; y < 12; y += 2) {
        const wave = Math.sin((y * 0.08) + t * 3) * (8 * ((y + 48) / 60));
        ctx.lineTo(wave, y);
      }
      ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},0.85)`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Sparkle along blade
      for (let i = 0; i < 4; i++) {
        const sy = -48 + ((t * 20 + i * 15) % 60);
        const sx = Math.sin((sy * 0.08) + t * 3) * (8 * ((sy + 48) / 60));
        ctx.beginPath();
        ctx.arc(sx, sy, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.5 + Math.sin(t * 5 + i) * 0.3})`;
        ctx.fill();
      }

      // Round guard
      ctx.beginPath();
      ctx.arc(0, 14, 6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.4)`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},0.6)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = "#222";
      ctx.fillRect(-2, 20, 4, 16);
    };

    const drawMistBlade = (ctx: CanvasRenderingContext2D, t: number, c: { r: number; g: number; b: number }) => {
      const sway = Math.sin(t * 0.8) * 2;
      ctx.rotate((sway * Math.PI) / 180);

      // Ethereal blade
      ctx.beginPath();
      ctx.moveTo(0, -48);
      ctx.lineTo(3, -8);
      ctx.lineTo(3, 12);
      ctx.lineTo(-3, 12);
      ctx.lineTo(-3, -8);
      ctx.closePath();
      ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${0.5 + Math.sin(t * 1.5) * 0.15})`;
      ctx.fill();

      // Mist particles drifting
      for (let i = 0; i < 6; i++) {
        const mx = Math.sin(t * 0.7 + i * 1.2) * 20;
        const my = -30 + Math.cos(t * 0.5 + i * 0.8) * 20;
        const mr = 3 + Math.sin(t + i) * 1.5;
        ctx.beginPath();
        ctx.arc(mx, my, mr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${0.08 + Math.sin(t * 0.8 + i) * 0.04})`;
        ctx.fill();
      }

      // Round tsuba
      ctx.beginPath();
      ctx.arc(0, 14, 6, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},0.5)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(-2, 20, 4, 18);
    };

    const animate = () => {
      t += 0.016;
      drawBlade(ctx, t);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, [style, glow, isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="w-[160px] h-[120px]"
      style={{ imageRendering: "auto" }}
    />
  );
};

export default SwordAnimation;
