import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Arc {
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  episodes: string;
  highlights: string[];
  color: string;
  icon: string;
}

const arcs: Arc[] = [
  { num: "01", title: "Final Selection", subtitle: "Survival on Mt. Fujikasane", desc: "Tanjiro faces seven days of demon-infested survival alongside fellow candidates. Here he confronts the Hand Demon — a creature that has killed thirteen of Urokodaki's students.", episodes: "Ep 1–5", highlights: ["Tanjiro's Training", "Hand Demon Battle", "Nezuko's Box"], color: "#60a5fa", icon: "⛰️" },
  { num: "02", title: "Asakusa Arc", subtitle: "First Encounter with Muzan", desc: "Tanjiro tracks the scent of Muzan Kibutsuji to the streets of Asakusa — their first encounter. Tamayo and Yushiro are introduced as demon allies.", episodes: "Ep 6–10", highlights: ["Muzan Encounter", "Tamayo & Yushiro", "Arrow & Temari Demons"], color: "#c084fc", icon: "🌃" },
  { num: "03", title: "Natagumo Mountain", subtitle: "The Spider Family", desc: "A haunted mountain crawling with spider demons controlled by Lower Rank Five — Rui. Here Tanjiro first unleashes Hinokami Kagura, and the Hashira make their dramatic debut.", episodes: "Ep 15–21", highlights: ["Rui Battle", "Hinokami Kagura Awakens", "Giyu & Shinobu Arrive"], color: "#4ade80", icon: "🕸️" },
  { num: "04", title: "Mugen Train", subtitle: "The Flame That Never Dies", desc: "The most acclaimed arc in anime history. Tanjiro, Zenitsu, Inosuke join Rengoku aboard the Infinity Train to face Lower Rank One — Enmu. Rengoku's final stand against Akaza is legendary.", episodes: "Movie + Ep 1–7 S2", highlights: ["Enmu's Dream Trap", "Rengoku vs Akaza", "Set Your Heart Ablaze"], color: "#fb923c", icon: "🚂" },
  { num: "05", title: "Entertainment District", subtitle: "Sound Hashira's Flamboyant Battle", desc: "Tengen Uzui leads the trio undercover into Yoshiwara to hunt Upper Rank Six — the sibling demons Daki & Gyutaro. One of the most visually spectacular battles in the series.", episodes: "S2 Ep 8–18", highlights: ["Uzui vs Gyutaro", "Nezuko's Demon Form", "Daki & Gyutaro's Past"], color: "#f472b6", icon: "🎭" },
  { num: "06", title: "Swordsmith Village", subtitle: "Two Upper Ranks Attack", desc: "Upper Ranks Four and Five simultaneously assault the hidden swordsmith village. Muichiro and Mitsuri awaken their Demon Slayer Marks while Tanjiro discovers the origin of his blade.", episodes: "S3 Ep 1–11", highlights: ["Muichiro's Awakening", "Hantengu's Clones", "Mitsuri vs Zohakuten"], color: "#fbbf24", icon: "⚔️" },
  { num: "07", title: "Hashira Training", subtitle: "Preparing for the Final War", desc: "All remaining Hashira conduct brutal training to prepare every slayer for the inevitable confrontation with Muzan. The calm before the ultimate storm.", episodes: "S4", highlights: ["All Hashira Unite", "Mark Training", "Muzan's Plan Revealed"], color: "#ef4444", icon: "🏋️" },
];

const ArcsSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible((p) => new Set(p).add(Number(e.target.getAttribute("data-idx"))));
        });
      },
      { threshold: 0.1 }
    );
    refs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="arcs" className="relative py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-eyebrow mb-3">THE JOURNEY CONTINUES</p>
          <h2 className="font-heading text-4xl sm:text-5xl mb-4">
            Story <span className="accent-text">Arcs</span>
          </h2>
          <p className="text-foreground/60 font-body text-lg max-w-2xl mx-auto">
            From Final Selection to the ultimate battle — follow Tanjiro's journey through every arc.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {arcs.map((arc, i) => (
            <div
              key={arc.title}
              ref={(el) => { refs.current[i] = el; }}
              data-idx={i}
              className={`${visible.has(i) ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <motion.div
                className="glass-card overflow-hidden cursor-pointer group relative"
                onClick={() => setExpanded(expanded === i ? null : i)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-80"
                  style={{ background: `linear-gradient(90deg, transparent, ${arc.color}, transparent)` }}
                />

                {/* Header */}
                <div className="p-5 relative">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${arc.color}08, transparent 70%)` }}
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl">{arc.icon}</span>
                      <span className="font-display text-2xl opacity-20" style={{ color: arc.color }}>{arc.num}</span>
                    </div>
                    <h3 className="font-heading text-lg text-foreground mb-1">{arc.title}</h3>
                    <p className="text-xs font-heading text-muted-foreground mb-2">{arc.subtitle}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-heading tracking-wide" style={{ background: `${arc.color}15`, color: arc.color }}>
                      {arc.episodes}
                    </span>
                  </div>
                </div>

                {/* Expandable detail */}
                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-glass-border pt-4">
                        <p className="text-foreground/60 font-body text-sm leading-relaxed mb-4">{arc.desc}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {arc.highlights.map((h) => (
                            <span key={h} className="text-[10px] px-2 py-0.5 rounded-full font-heading tracking-wide" style={{ background: `${arc.color}15`, color: arc.color }}>
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArcsSection;
