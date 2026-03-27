import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BreathingStyle {
  name: string;
  kanji: string;
  desc: string;
  practitioner: string;
  forms: number;
  color: string;
  icon: string;
  signature: string;
}

const styles: BreathingStyle[] = [
  { name: "Water", kanji: "水の呼吸", desc: "Flowing and adaptive — the most common style. Its movements mirror the relentless force of water, shifting between calm defense and crashing offense.", practitioner: "Tanjiro Kamado / Giyu Tomioka", forms: 11, color: "#60a5fa", icon: "🌊", signature: "Eleventh Form: Dead Calm" },
  { name: "Flame", kanji: "炎の呼吸", desc: "Bold and devastating — one of the most powerful fundamental styles. Each strike blazes with unstoppable force, embodying the spirit of fire.", practitioner: "Kyojuro Rengoku", forms: 9, color: "#fb923c", icon: "🔥", signature: "Ninth Form: Rengoku" },
  { name: "Thunder", kanji: "雷の呼吸", desc: "Blinding speed — practitioners channel lightning-fast movements. The first form alone can generate devastating power with a single focused strike.", practitioner: "Zenitsu Agatsuma", forms: 7, color: "#fbbf24", icon: "⚡", signature: "Thunderclap and Flash: Godspeed" },
  { name: "Beast", kanji: "獣の呼吸", desc: "Wild and unpredictable — self-taught by Inosuke through pure survival instinct. Its erratic movements make it impossible to read.", practitioner: "Inosuke Hashibira", forms: 10, color: "#4ade80", icon: "🐗", signature: "Spatial Awareness" },
  { name: "Insect", kanji: "蟲の呼吸", desc: "Precise and lethal — compensates for inability to behead with devastating Wisteria poison delivered through a needle-thin blade.", practitioner: "Shinobu Kocho", forms: 4, color: "#c084fc", icon: "🦋", signature: "Dance of the Centipede" },
  { name: "Mist", kanji: "霞の呼吸", desc: "Ethereal and disorienting — creates afterimages and confuses opponents with its elusive, fog-like movements and sudden devastating strikes.", practitioner: "Muichiro Tokito", forms: 7, color: "#94a3b8", icon: "🌫️", signature: "Obscuring Clouds" },
  { name: "Love", kanji: "恋の呼吸", desc: "Flexible and powerful — derived from Flame Breathing. Uses a unique whip-katana that exploits Mitsuri's incredible muscle density.", practitioner: "Mitsuri Kanroji", forms: 6, color: "#f472b6", icon: "💗", signature: "Cat-Legged Winds of Love" },
  { name: "Sound", kanji: "音の呼吸", desc: "Explosive and rhythmic — reads an opponent's attacks as a musical score, predicting movements and creating devastating counter-rhythms.", practitioner: "Tengen Uzui", forms: 5, color: "#e879f9", icon: "🎵", signature: "Musical Score Technique" },
  { name: "Serpent", kanji: "蛇の呼吸", desc: "Sinuous and unpredictable — the blade follows a winding serpentine path. Strikes come from impossible angles, mimicking a snake's coiling motion.", practitioner: "Obanai Iguro", forms: 5, color: "#a78bfa", icon: "🐍", signature: "Twin-Headed Reptile" },
  { name: "Stone", kanji: "岩の呼吸", desc: "Overwhelming force — the most physically demanding style. Combines a spiked flail and axe for devastating area attacks and impenetrable defense.", practitioner: "Gyomei Himejima", forms: 5, color: "#8b7355", icon: "🪨", signature: "Volcanic Rock: Rapid Conquest" },
  { name: "Wind", kanji: "風の呼吸", desc: "Aggressive and relentless — generates violent slashing cyclones. Each form creates powerful gales that cut through enemies with razor wind.", practitioner: "Sanemi Shinazugawa", forms: 9, color: "#6ee7b7", icon: "🌪️", signature: "Black Wind Mountain Mist" },
  { name: "Sun", kanji: "日の呼吸", desc: "The original breathing style — from which all others descend. Created by Yoriichi Tsugikuni, the most powerful demon slayer to ever live. It is the only style Muzan truly fears.", practitioner: "Yoriichi Tsugikuni / Tanjiro (Hinokami Kagura)", forms: 13, color: "#ef4444", icon: "☀️", signature: "Thirteenth Form: Continuous Cycle" },
];

const BreathingStylesSection = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const s = styles[active];

  return (
    <section ref={sectionRef} id="breathing" className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(240 10% 4%), hsl(240 12% 6%), hsl(240 10% 4%))" }}>
      {/* Animated background aura */}
      <AnimatePresence mode="wait">
        <motion.div
          key={s.name}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
            style={{ background: s.color }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="section-eyebrow mb-3">TOTAL CONCENTRATION</p>
          <h2 className="font-heading text-4xl sm:text-5xl mb-4">
            Breathing <span className="accent-text">Styles</span>
          </h2>
          <p className="text-foreground/60 font-body text-lg max-w-2xl mx-auto">
            Master the art of Total Concentration Breathing — techniques passed down through generations to combat demons.
          </p>
        </div>

        {/* Style selectors */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {styles.map((st, i) => (
            <button
              key={st.name}
              onClick={() => setActive(i)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-heading tracking-wider transition-all duration-300 ${
                active === i
                  ? "shadow-lg scale-105"
                  : "glass-card text-foreground/50 hover:text-foreground"
              }`}
              style={active === i ? { background: `${st.color}25`, color: st.color, boxShadow: `0 0 20px ${st.color}30` } : {}}
            >
              <span>{st.icon}</span>
              <span className="hidden sm:inline">{st.name}</span>
            </button>
          ))}
        </div>

        {/* Active style display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-card overflow-hidden relative">
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }}
              />

              {/* Main content */}
              <div className="grid md:grid-cols-2 gap-0">
                {/* Visual side */}
                <div className="relative h-64 md:h-auto flex items-center justify-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${s.color}08, ${s.color}03)` }}>
                  {/* Animated circles */}
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full border"
                      style={{ borderColor: `${s.color}20` }}
                      animate={{
                        width: [60 + i * 30, 100 + i * 40, 60 + i * 30],
                        height: [60 + i * 30, 100 + i * 40, 60 + i * 30],
                        rotate: [0, 360],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                  <motion.span
                    className="text-7xl relative z-10"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {s.icon}
                  </motion.span>
                  <motion.p
                    className="absolute bottom-4 font-display text-3xl opacity-20"
                    style={{ color: s.color }}
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {s.kanji}
                  </motion.p>
                </div>

                {/* Info side */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-heading text-3xl" style={{ color: s.color }}>{s.name}</h3>
                  </div>
                  <p className="font-heading text-sm text-muted-foreground mb-4">{s.kanji}</p>
                  <p className="text-foreground/70 font-body leading-relaxed mb-6">{s.desc}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="glass-card p-3 rounded-lg">
                      <span className="text-xs text-muted-foreground font-heading block">Forms</span>
                      <strong className="text-xl font-heading" style={{ color: s.color }}>{s.forms}</strong>
                    </div>
                    <div className="glass-card p-3 rounded-lg">
                      <span className="text-xs text-muted-foreground font-heading block">Signature</span>
                      <strong className="text-xs font-heading text-foreground">{s.signature}</strong>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs text-muted-foreground font-heading block">Practitioner</span>
                    <span
                      className="inline-block text-sm px-3 py-1.5 rounded-full font-heading tracking-wide"
                      style={{ background: `${s.color}15`, color: s.color }}
                    >
                      {s.practitioner}
                    </span>
                  </div>

                  {/* Power bar */}
                  <div className="mt-6">
                    <div className="flex justify-between text-xs font-heading text-muted-foreground mb-1">
                      <span>Power Level</span>
                      <span>{Math.round((s.forms / 13) * 100)}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}80)` }}
                        initial={{ width: "0%" }}
                        animate={{ width: `${(s.forms / 13) * 100}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BreathingStylesSection;
