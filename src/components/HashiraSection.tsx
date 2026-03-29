import { useState, useRef, useEffect } from "react";

interface Hashira {
  name: string;
  title: string;
  kanji: string;
  desc: string;
  tags: string[];
  element: string;
  color: string;
}

const hashiraData: Hashira[] = [
  { name: "Gyomei Himejima", title: "Stone Hashira", kanji: "岩柱", desc: "Widely acknowledged as the strongest Hashira — a towering, gentle giant who is completely blind yet possesses unmatched physical power. His weapon is a flail and axe, not a conventional sword.", tags: ["Stone Breathing", "Flail & Axe", "Demon Slayer Mark"], element: "stone", color: "#8b7355" },
  { name: "Sanemi Shinazugawa", title: "Wind Hashira", kanji: "風柱", desc: "Fierce, aggressive, and battle-hardened. Sanemi bears countless scars and possesses rare Marechi blood — so intoxicating to demons that it paralyzes them.", tags: ["Wind Breathing", "Marechi Blood", "Scarred Veteran"], element: "wind", color: "#6ee7b7" },
  { name: "Giyu Tomioka", title: "Water Hashira", kanji: "水柱", desc: "The first Hashira encountered by Tanjiro — stoic, solitary, and extraordinarily skilled. He created a unique 11th form of Water Breathing that no one else knows.", tags: ["Water Breathing", "11th Form (Unique)", "Half-and-Half Haori"], element: "water", color: "#60a5fa" },
  { name: "Kyojuro Rengoku", title: "Flame Hashira", kanji: "炎柱", desc: "Radiant, passionate, and utterly devoted. Rengoku's burning spirit inspires everyone around him. He faces Upper Rank Three Akaza in one of the most celebrated battles in anime history.", tags: ["Flame Breathing", "Mugen Train Arc", "Blazing Spirit"], element: "flame", color: "#fb923c" },
  { name: "Obanai Iguro", title: "Serpent Hashira", kanji: "蛇柱", desc: "Cold, meticulous and unforgiving of weakness — yet fiercely devoted to Mitsuri. His twisted blade mimics the sinuous path of a serpent. Always accompanied by his white snake, Kaburamaru.", tags: ["Serpent Breathing", "Twisted Blade", "Kaburamaru"], element: "serpent", color: "#a78bfa" },
  { name: "Mitsuri Kanroji", title: "Love Hashira", kanji: "恋柱", desc: "Warm, emotional, and deceptively powerful. Mitsuri possesses eight times the muscle density of a normal person, granting her explosive strength.", tags: ["Love Breathing", "Hyper-Dense Muscles", "Whip Blade"], element: "love", color: "#f472b6" },
  { name: "Muichiro Tokito", title: "Mist Hashira", kanji: "霞柱", desc: "A child prodigy who achieved Hashira status in just two months — an unprecedented feat. Initially emotionless due to amnesia, but awakens fearsome power when reconnecting with his past.", tags: ["Mist Breathing", "Child Prodigy", "Demon Slayer Mark"], element: "mist", color: "#e2e8f0" },
  { name: "Tengen Uzui", title: "Sound Hashira", kanji: "音柱", desc: "A flamboyant ex-shinobi with three kunoichi wives. His Sound Breathing lets him read a demon's 'score' — transforming a battle into a musical composition.", tags: ["Sound Breathing", "Shinobi Origin", "Twin Cleavers"], element: "sound", color: "#fbbf24" },
  { name: "Shinobu Kocho", title: "Insect Hashira", kanji: "蟲柱", desc: "Seemingly cheerful and gentle — but harbors deep, cold rage beneath her smile. Unable to behead demons, she instead stores lethal Wisteria poison in her blade.", tags: ["Insect Breathing", "Wisteria Poison", "Butterfly Mansion"], element: "insect", color: "#c084fc" },
];

const elements = ["all", ...new Set(hashiraData.map((h) => h.element))];

const HashiraSection = () => {
  const [filter, setFilter] = useState("all");
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const filtered = filter === "all" ? hashiraData : hashiraData.filter((h) => h.element === filter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible((prev) => new Set(prev).add(Number(e.target.getAttribute("data-idx"))));
          }
        });
      },
      { threshold: 0.1 }
    );
    refs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, [filter]);

  return (
    <section id="hashira" className="relative py-24" style={{ background: "linear-gradient(180deg, hsl(240 10% 4%), hsl(240 10% 6%), hsl(240 10% 4%))" }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <p className="section-eyebrow mb-3">THE NINE PILLARS</p>
          <h2 className="font-heading text-4xl sm:text-5xl mb-4">
            The <span className="accent-text">Hashira</span>
          </h2>
          <p className="text-foreground/60 font-body text-lg max-w-2xl mx-auto">
            The strongest demon slayers in existence — nine elite warriors who serve directly under Master Kagaya Ubuyashiki as humanity's last line of defense.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" role="tablist" aria-label="Filter by element">
          {elements.map((el) => (
            <button
              key={el}
              role="tab"
              aria-selected={filter === el}
              onClick={() => { setFilter(el); setVisible(new Set()); }}
              className={`px-4 py-2 rounded-full text-xs font-heading tracking-wider transition-all duration-300 capitalize ${
                filter === el
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "glass-card text-foreground/60 hover:text-foreground hover:bg-muted"
              }`}
            >
              {el}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((h, i) => (
            <div
              key={h.name}
              ref={(el) => { refs.current[i] = el; }}
              data-idx={i}
              className={`glass-card p-6 group hover:scale-[1.02] transition-all duration-500 relative overflow-hidden ${
                visible.has(i) ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1 opacity-70"
                style={{ background: `linear-gradient(90deg, transparent, ${h.color}, transparent)` }}
              />
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-display shrink-0"
                  style={{ background: `${h.color}20`, color: h.color }}
                >
                  {h.kanji.charAt(0)}
                </div>
                <div>
                  <h3 className="font-heading text-lg text-foreground">{h.name}</h3>
                  <p className="text-sm font-heading" style={{ color: h.color }}>{h.title} — {h.kanji}</p>
                </div>
              </div>
              <p className="text-foreground/60 font-body text-sm leading-relaxed mb-4">{h.desc}</p>
              <div className="flex flex-wrap gap-2">
                {h.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-full font-heading tracking-wide"
                    style={{ background: `${h.color}15`, color: h.color }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HashiraSection;
