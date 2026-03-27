import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Character {
  name: string;
  role: string;
  breathing: string;
  bio: string;
  category: "Main" | "Hashira" | "Demon";
  color: string;
  icon: string;
  kanji: string;
}

const characters: Character[] = [
  { name: "Tanjiro Kamado", role: "Protagonist", breathing: "Water / Sun Breathing", bio: "A kindhearted boy turned fierce demon slayer. His empathy for even his enemies makes him unique — he fights with compassion and an unbreakable will.", category: "Main", color: "#60a5fa", icon: "⚔️", kanji: "竈門炭治郎" },
  { name: "Nezuko Kamado", role: "Demon Sister", breathing: "Blood Demon Art: Exploding Blood", bio: "Tanjiro's sister turned demon — yet she retains her humanity, protecting humans and fighting alongside her brother. She conquers the sun itself.", category: "Main", color: "#f472b6", icon: "🌸", kanji: "竈門禰豆子" },
  { name: "Zenitsu Agatsuma", role: "Thunder Swordsman", breathing: "Thunder Breathing", bio: "Cowardly when awake, lethal when asleep. Zenitsu mastered only one form — but perfected it to godlike levels. His Thunderclap and Flash is unmatched.", category: "Main", color: "#fbbf24", icon: "⚡", kanji: "我妻善逸" },
  { name: "Inosuke Hashibira", role: "Beast Warrior", breathing: "Beast Breathing (Self-Taught)", bio: "Raised by boars in the mountains, Inosuke is wild, aggressive, and fiercely competitive. His dual serrated blades and spatial awareness make him a force.", category: "Main", color: "#4ade80", icon: "🐗", kanji: "嘴平伊之助" },
  { name: "Giyu Tomioka", role: "Water Hashira", breathing: "Water Breathing", bio: "Stoic and solitary. He created the 11th Form: Dead Calm — a technique so perfect it stops all attacks within range.", category: "Hashira", color: "#3b82f6", icon: "🌊", kanji: "冨岡義勇" },
  { name: "Kyojuro Rengoku", role: "Flame Hashira", breathing: "Flame Breathing", bio: "Radiant and passionate. His final battle against Akaza aboard the Mugen Train is legendary. 'Set Your Heart Ablaze!'", category: "Hashira", color: "#fb923c", icon: "🔥", kanji: "煉獄杏寿郎" },
  { name: "Shinobu Kocho", role: "Insect Hashira", breathing: "Insect Breathing", bio: "Gentle smile hiding cold fury. She kills with Wisteria poison instead of beheading — the only Hashira who fights with chemistry.", category: "Hashira", color: "#c084fc", icon: "🦋", kanji: "胡蝶しのぶ" },
  { name: "Muichiro Tokito", role: "Mist Hashira", breathing: "Mist Breathing", bio: "Became Hashira in two months — a prodigy without equal. Initially emotionless, his awakened power is terrifying.", category: "Hashira", color: "#94a3b8", icon: "🌫️", kanji: "時透無一郎" },
  { name: "Mitsuri Kanroji", role: "Love Hashira", breathing: "Love Breathing", bio: "Eight times the muscle density of a normal person. Her whip-katana and explosive strength hide behind a warm, emotional exterior.", category: "Hashira", color: "#ec4899", icon: "💗", kanji: "甘露寺蜜璃" },
  { name: "Tengen Uzui", role: "Sound Hashira", breathing: "Sound Breathing", bio: "Ex-shinobi who reads battles as musical scores. Flamboyant, powerful, and wielding twin explosive cleavers.", category: "Hashira", color: "#e879f9", icon: "🎵", kanji: "宇髄天元" },
  { name: "Obanai Iguro", role: "Serpent Hashira", breathing: "Serpent Breathing", bio: "Cold and exacting, with a twisted blade that mirrors a serpent's path. Devoted to Mitsuri and accompanied by his snake Kaburamaru.", category: "Hashira", color: "#a78bfa", icon: "🐍", kanji: "伊黒小芭内" },
  { name: "Sanemi Shinazugawa", role: "Wind Hashira", breathing: "Wind Breathing", bio: "Scarred, fierce, and possessing rare Marechi blood that intoxicates demons. His rage masks deep love for his brother Genya.", category: "Hashira", color: "#6ee7b7", icon: "🌪️", kanji: "不死川実弥" },
  { name: "Gyomei Himejima", role: "Stone Hashira", breathing: "Stone Breathing", bio: "The strongest Hashira — a blind, gentle giant wielding a spiked flail and axe with unmatched physical power.", category: "Hashira", color: "#8b7355", icon: "🪨", kanji: "悲鳴嶼行冥" },
  { name: "Muzan Kibutsuji", role: "Demon King", breathing: "Progenitor — No Breathing", bio: "The first demon, source of all evil. He seeks perfect immortality and the conquest of sunlight. All demons bow before him.", category: "Demon", color: "#ef4444", icon: "👹", kanji: "鬼舞辻無惨" },
  { name: "Kokushibo", role: "Upper Rank One", breathing: "Moon Breathing (16 Forms)", bio: "Yoriichi's twin brother. Consumed by envy, he chose demonhood. His crescent blades grow from his own flesh.", category: "Demon", color: "#7c3aed", icon: "🌙", kanji: "黒死牟" },
  { name: "Akaza", role: "Upper Rank Three", breathing: "Destructive Death — Martial Arts", bio: "A pure martial artist who killed Rengoku. His tragic past as Hakuji makes him one of the most compelling villains.", category: "Demon", color: "#f97316", icon: "👊", kanji: "猗窩座" },
  { name: "Doma", role: "Upper Rank Two", breathing: "Cryogenic Blood Demon Art", bio: "Emotionally hollow, he leads a cult of followers he ultimately devours. His ice powers create blizzards of death.", category: "Demon", color: "#22d3ee", icon: "❄️", kanji: "童磨" },
];

const categoryColors = { Main: "#60a5fa", Hashira: "#fb923c", Demon: "#ef4444" };
const cats = ["All", "Main", "Hashira", "Demon"] as const;

const CharacterShowcase = () => {
  const [filter, setFilter] = useState<string>("All");
  const [flipped, setFlipped] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = filter === "All" ? characters : characters.filter((c) => c.category === filter);

  return (
    <section ref={sectionRef} id="characters" className="relative py-24" style={{ background: "linear-gradient(180deg, hsl(240 10% 4%), hsl(240 10% 5.5%), hsl(240 10% 4%))" }}>
      <div className="container mx-auto px-6">
        <div className={`text-center mb-12 ${visible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="section-eyebrow mb-3">THE WARRIORS</p>
          <h2 className="font-heading text-4xl sm:text-5xl mb-4">
            Character <span className="accent-text">Showcase</span>
          </h2>
          <p className="text-foreground/60 font-body text-lg max-w-2xl mx-auto">
            Heroes, pillars, and demons — every soul in the fight against darkness.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {cats.map((cat) => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setFlipped(null); }}
              className={`px-5 py-2.5 rounded-full text-xs font-heading tracking-wider transition-all duration-300 ${
                filter === cat
                  ? "shadow-lg scale-105"
                  : "glass-card text-foreground/50 hover:text-foreground"
              }`}
              style={filter === cat ? {
                background: `${cat === "All" ? "hsl(0 80% 55%)" : categoryColors[cat as keyof typeof categoryColors]}`,
                color: "white",
                boxShadow: `0 0 25px ${cat === "All" ? "hsl(0 80% 55% / 0.4)" : categoryColors[cat as keyof typeof categoryColors]}40`,
              } : {}}
            >
              {cat === "All" ? "All Characters" : cat}
              <span className="ml-1.5 opacity-60">
                ({cat === "All" ? characters.length : characters.filter((c) => c.category === cat).length})
              </span>
            </button>
          ))}
        </div>

        {/* Character Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map((char, i) => (
              <motion.div
                key={char.name}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="perspective-1000"
              >
                <motion.div
                  className="glass-card group cursor-pointer relative overflow-hidden"
                  onClick={() => setFlipped(flipped === i ? null : i)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Top bar */}
                  <div
                    className="h-0.5 opacity-70"
                    style={{ background: `linear-gradient(90deg, transparent, ${char.color}, transparent)` }}
                  />

                  {/* Front */}
                  <AnimatePresence mode="wait">
                    {flipped !== i ? (
                      <motion.div
                        key="front"
                        initial={{ rotateY: 90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: -90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 text-center"
                      >
                        {/* Aura background */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                          style={{ background: `radial-gradient(circle at 50% 30%, ${char.color}15, transparent 60%)` }}
                        />

                        <motion.span
                          className="text-4xl block mb-2 relative z-10"
                          whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {char.icon}
                        </motion.span>
                        <h4 className="font-heading text-sm text-foreground mb-0.5 relative z-10">{char.name}</h4>
                        <p className="text-[10px] font-heading tracking-wider relative z-10" style={{ color: char.color }}>{char.role}</p>
                        <p className="text-[9px] text-muted-foreground font-heading mt-1 opacity-50 relative z-10">{char.kanji}</p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="back"
                        initial={{ rotateY: -90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: 90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4"
                        style={{ background: `linear-gradient(135deg, ${char.color}08, transparent)` }}
                      >
                        <h4 className="font-heading text-xs mb-1" style={{ color: char.color }}>{char.name}</h4>
                        <p className="text-[10px] text-muted-foreground font-heading mb-2">{char.breathing}</p>
                        <p className="text-foreground/60 font-body text-[11px] leading-relaxed">{char.bio}</p>
                        <div className="mt-2 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: char.color }} />
                          <span className="text-[9px] font-heading tracking-wider" style={{ color: char.color }}>{char.category}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Hover border glow */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 20px ${char.color}10, 0 0 15px ${char.color}08` }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default CharacterShowcase;
