import { useRef, useEffect, useState } from "react";
import SwordAnimation from "./SwordAnimation";

interface Sword {
  owner: string;
  name: string;
  desc: string;
  style: string;
  tsuba: string;
  color: string;
  glow: string;
}

const swords: Sword[] = [
  { owner: "Tanjiro Kamado", name: "Black Katana", desc: "A rare jet-black blade — channels both Water and Sun Breathing, blazing crimson or blue depending on technique.", style: "Water / Sun", tsuba: "Wheel", color: "Black → Red", glow: "#4facfe" },
  { owner: "Zenitsu Agatsuma", name: "Yellow Lightning Blade", desc: "Crackling yellow blade tuned for Thunder Breathing — one devastating strike, executed while asleep.", style: "Thunder", tsuba: "Circular", color: "Yellow", glow: "#ffd700" },
  { owner: "Inosuke Hashibira", name: "Dual Serrated Blades", desc: "Twin grey-blue Nichirin swords ground jagged by Inosuke himself — built to tear, not slice.", style: "Beast", tsuba: "None", color: "Grey-Blue", glow: "#4ade80" },
  { owner: "Giyu Tomioka", name: "Blue Water Katana", desc: "Deep-blue with hexagonal tsuba — the calm precision of Water Breathing made manifest.", style: "Water", tsuba: "Hexagon", color: "Blue", glow: "#60a5fa" },
  { owner: "Shinobu Kocho", name: "Lavender Needle Blade", desc: "The only Nichirin with a hollowed tip for injecting Wisteria poison — she kills with toxins, not beheading.", style: "Insect", tsuba: "Butterfly", color: "Lavender", glow: "#c084fc" },
  { owner: "Kyojuro Rengoku", name: "Flame Katana", desc: "Red-yellow flame-patterned blade with a flame-motif tsuba — Rengoku's burning spirit in steel.", style: "Flame", tsuba: "Flame", color: "Red-Yellow", glow: "#fb923c" },
  { owner: "Mitsuri Kanroji", name: "Whip Katana", desc: "Ultra-thin flexible Nichirin that bends like a whip — only Mitsuri's unique physiology can wield it.", style: "Love", tsuba: "Round", color: "Pink-Green", glow: "#f472b6" },
  { owner: "Muichiro Tokito", name: "White Mist Blade", desc: "Pure-white and ethereal — reflects the elusive, unpredictable nature of Mist Breathing.", style: "Mist", tsuba: "Round", color: "White", glow: "#e2e8f0" },
];

const SwordsSection = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-idx"));
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set(prev).add(idx));
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="swords" className="relative py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-eyebrow mb-3">FORGED FROM SCARLET CRIMSON ORE</p>
          <h2 className="font-heading text-4xl sm:text-5xl mb-4">
            Nichirin <span className="accent-text">Blades</span>
          </h2>
          <p className="text-foreground/60 font-body text-lg max-w-2xl mx-auto">
            Each blade changes color upon first being drawn — a reflection of the demon slayer's very soul and breathing style.
          </p>
        </div>

        {/* Stats strip */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 max-w-3xl mx-auto">
          {[
            { label: "Scarlet Crimson Ore", sub: "Forged from sunlight-bathed ore" },
            { label: "Akki Messatsu", sub: "\"Destroyer of Demons\" engraving" },
            { label: "Color = Breathing Style", sub: "Unique to each wielder" },
            { label: "Turns Crimson at Peak", sub: "Hashira Demon Slayer Mark" },
          ].map(({ label, sub }) => (
            <div key={label} className="glass-card px-5 py-3 text-center min-w-[150px]">
              <p className="font-heading text-xs text-foreground">{label}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {swords.map((sword, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              data-idx={i}
              className={`glass-card group hover:scale-[1.02] transition-all duration-500 overflow-hidden ${
                visibleCards.has(i) ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.1}s`, ["--glow" as string]: sword.glow }}
            >
              <div
                className="h-[210px] flex items-center justify-center relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${sword.glow}15, ${sword.glow}05)` }}
              >
                <SwordAnimation style={sword.style} glow={sword.glow} isVisible={visibleCards.has(i)} />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at center, ${sword.glow}20, transparent 70%)` }}
                />
              </div>
              <div className="p-5">
                <span
                  className="text-xs px-2 py-1 rounded-full font-heading tracking-wider"
                  style={{ background: `${sword.glow}15`, color: sword.glow }}
                >
                  {sword.owner}
                </span>
                <h3 className="font-heading text-lg mt-3 mb-2 text-foreground">{sword.name}</h3>
                <p className="text-foreground/60 font-body text-sm leading-relaxed mb-4">{sword.desc}</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    ["Style", sword.style],
                    ["Tsuba", sword.tsuba],
                    ["Color", sword.color],
                  ].map(([label, val]) => (
                    <div key={label} className="text-center">
                      <span className="text-muted-foreground block">{label}</span>
                      <strong className="text-foreground">{val}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SwordsSection;
