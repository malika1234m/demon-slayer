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
  { owner: "Tanjiro Kamado", name: "Black Katana", desc: "A rare, jet-black Nichirin blade. Black blades are considered a bad omen — yet Tanjiro's channels both Water and Hinokami Kagura (Sun Breathing), glowing blue or blazing crimson depending on technique.", style: "Water / Sun", tsuba: "Wheel", color: "Black → Red", glow: "#4facfe" },
  { owner: "Zenitsu Agatsuma", name: "Yellow Lightning Blade", desc: "A brilliant yellow blade crackling with lightning patterns. Perfectly tuned for Zenitsu's Thunder Breathing, allowing devastating speed in a single strike — all executed while asleep.", style: "Thunder", tsuba: "Circular", color: "Yellow", glow: "#ffd700" },
  { owner: "Inosuke Hashibira", name: "Dual Serrated Blades", desc: "Twin grey-blue serrated Nichirin swords that Inosuke ground down himself to create jagged edges. Designed not to slice, but to tear — brutal and unconventional.", style: "Beast", tsuba: "None", color: "Grey-Blue", glow: "#4ade80" },
  { owner: "Giyu Tomioka", name: "Blue Water Katana", desc: "A classic deep-blue Nichirin katana featuring a hexagonal tsuba. Represents the calm, powerful flow of Water Breathing — precise, defensive, and devastatingly effective.", style: "Water", tsuba: "Hexagon", color: "Blue", glow: "#60a5fa" },
  { owner: "Shinobu Kocho", name: "Lavender Needle Blade", desc: "A slender, needle-like lavender blade — the only Nichirin sword with a hollowed tip for injecting Wisteria poison. She kills with toxins instead of beheading.", style: "Insect", tsuba: "Butterfly", color: "Lavender", glow: "#c084fc" },
  { owner: "Kyojuro Rengoku", name: "Flame Katana", desc: "A red-yellow flame-patterned katana blazing with the power of Flame Breathing. Its guard bears a flame motif, channeling Rengoku's burning passion.", style: "Flame", tsuba: "Flame", color: "Red-Yellow", glow: "#fb923c" },
  { owner: "Mitsuri Kanroji", name: "Whip Katana", desc: "An extraordinarily long, ultra-thin and flexible Nichirin blade — a whip-katana unlike any other. Its flexibility exploits Mitsuri's unique physiology.", style: "Love", tsuba: "Round", color: "Pink-Green", glow: "#f472b6" },
  { owner: "Muichiro Tokito", name: "White Mist Blade", desc: "A pure-white Nichirin blade — ethereal and mysterious. Reflects the elusive, unpredictable nature of Mist Breathing. Muichiro mastered it in just two months.", style: "Mist", tsuba: "Round", color: "White", glow: "#e2e8f0" },
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

        {/* Banner */}
        <div className="glass-card p-8 mb-16 max-w-4xl mx-auto">
          <h3 className="font-heading text-2xl mb-4 text-foreground">The Legend of the Nichirin</h3>
          <p className="text-foreground/70 font-body leading-relaxed mb-6">
            Forged from <strong className="text-accent">Scarlet Crimson Iron Sand</strong> collected from high mountain ore deposits constantly bathed in sunlight, Nichirin blades are the only weapons capable of permanently slaying demons.
          </p>
          <ul className="space-y-2 text-foreground/70 font-body">
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /> Engraved with <em>"Destroyer of Demons"</em> (Akki Messatsu)</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-accent" /> Color reflects the wielder's breathing style</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500" /> Unique tsuba (handguard) for each slayer</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500" /> Turn crimson-red when a Hashira reaches their peak</li>
          </ul>
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
                className="h-32 flex items-center justify-center relative overflow-hidden"
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
