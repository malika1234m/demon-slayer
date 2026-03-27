import { useEffect, useRef } from "react";

const EmberParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createEmber = () => {
      const ember = document.createElement("div");
      const size = Math.random() * 4 + 2;
      ember.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, hsl(25 95% 55%), hsl(0 80% 50%));
        border-radius: 50%;
        bottom: -10px;
        left: ${Math.random() * 100}%;
        animation: float-ember ${Math.random() * 6 + 6}s linear forwards;
        pointer-events: none;
        filter: blur(${Math.random() > 0.5 ? 1 : 0}px);
      `;
      container.appendChild(ember);
      setTimeout(() => ember.remove(), 12000);
    };

    const interval = setInterval(createEmber, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
};

export default EmberParticles;
