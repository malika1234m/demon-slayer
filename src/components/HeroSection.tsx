import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax BG with mouse movement */}
      <motion.div
        className="absolute inset-[-20px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundAttachment: "fixed",
        }}
        animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      </motion.div>

      {/* Fog layers */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[200px]"
          style={{
            background: "linear-gradient(to top, hsl(240 10% 4%), transparent)",
          }}
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 left-0 right-0 h-[100px] opacity-20"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(0 80% 55% / 0.1), transparent)",
          }}
          animate={{ x: [-100, 100, -100] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating kanji decorations */}
      {["滅", "鬼", "刃", "炎", "水"].map((k, i) => (
        <motion.span
          key={k}
          className="absolute font-display text-4xl text-foreground/5 pointer-events-none select-none"
          style={{
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }}
        >
          {k}
        </motion.span>
      ))}

      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          className="section-eyebrow mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          A N I M E &nbsp; F A N &nbsp; E X P E R I E N C E
        </motion.p>

        <div className="overflow-hidden mb-2">
          <motion.h1
            className="font-display text-6xl sm:text-8xl lg:text-[10rem] leading-none text-foreground"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            DEMON
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-6">
          <motion.h1
            className="font-display text-6xl sm:text-8xl lg:text-[10rem] leading-none flame-text"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            SLAYER
          </motion.h1>
        </div>

        {/* Sword slash line */}
        <motion.div
          className="h-px w-full max-w-md mx-auto mb-8"
          style={{ background: "linear-gradient(90deg, transparent, hsl(0 80% 55%), transparent)" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
        />

        <motion.p
          className="text-lg sm:text-xl text-foreground/60 italic font-body max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          "No matter how many people you may lose, you have no choice but to go on living.
          No matter how devastating the blows may be."
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <motion.a
            href="#characters"
            className="px-10 py-4 rounded-lg bg-primary text-primary-foreground font-heading text-sm tracking-wider transition-all duration-300 shadow-lg shadow-primary/30 relative overflow-hidden group"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(0 80% 55% / 0.5)" }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10">Enter the Demon Slayer World</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.a>
          <motion.a
            href="#breathing"
            className="px-10 py-4 rounded-lg border border-foreground/20 text-foreground font-heading text-sm tracking-wider hover:bg-foreground/5 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Discover Breathing Styles
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2.5 bg-primary rounded-full mt-2"
            animate={{ opacity: [1, 0.3, 1], y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
