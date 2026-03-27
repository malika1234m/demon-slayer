import { useEffect, useRef } from "react";

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    let x = 0, y = 0, cx = 0, cy = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const animate = () => {
      cx += (x - cx) * 0.15;
      cy += (y - cy) * 0.15;
      el.style.transform = `translate(${cx - 150}px, ${cy - 150}px)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    const raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[300px] h-[300px] pointer-events-none z-[60] opacity-30 hidden md:block"
      style={{
        background: "radial-gradient(circle, hsl(0 80% 55% / 0.15), transparent 70%)",
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
};

export default CursorGlow;
