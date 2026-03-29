import { useRef, useEffect, useState } from "react";

interface Demon {
  rank: string;
  name: string;
  kanji: string;
  art: string;
  hook: string;
  traits: string[];
  color: string;
}

const demons: Demon[] = [
  { rank: "Upper Rank I",       name: "Kokushibo",       kanji: "黒死牟",       art: "Moon Breathing",            hook: "Yoriichi's twin brother — chose immortality over humanity, wielding Moon Breathing with sixteen crescent blade forms from his own flesh.",     traits: ["Moon Breathing", "16 Forms", "Former Slayer", "Multiple Eyes"],       color: "#ef4444" },
  { rank: "Upper Rank II",      name: "Doma",             kanji: "童磨",         art: "Cryogenic Blood Demon Art", hook: "Cult leader who has never felt a genuine emotion — his ice Blood Art conjures blizzards that shred everything within range.",                  traits: ["Ice Blood Art", "Killed Kanae", "Cult Leader", "Emotionally Hollow"], color: "#22d3ee" },
  { rank: "Upper Rank III",     name: "Akaza",            kanji: "猗窩座",       art: "Destructive Death",         hook: "A pure martial artist who fights bare-handed — he murdered Rengoku on the Mugen Train and hunts only the strong.",                            traits: ["No Weapons", "Killed Rengoku", "Martial Arts", "Hates Weakness"],    color: "#f97316" },
  { rank: "Upper Rank IV",      name: "Hantengu",         kanji: "半天狗",       art: "Emotion-Split Clones",      hook: "His Blood Art splits emotions into powerful demon clones — yet his terrifying true form is a screaming, helpless coward.",                    traits: ["Clone Art", "Zohakuten Form", "Fear / Anger / Joy", "True Coward"],  color: "#d946ef" },
  { rank: "Upper Rank V",       name: "Gyokko",           kanji: "玉壺",         art: "Vase Blood Demon Art",      hook: "Teleports through ornate ceramic vases and sculpts grotesque 'art' from his victims' bodies — calling it his masterpiece.",                   traits: ["Vase Teleport", "Fish Spawn", "Narcissist Artist", "Aquatic Form"],  color: "#4ade80" },
  { rank: "Upper Rank VI",      name: "Daki & Gyutaro",  kanji: "堕姫/妓夫太郎", art: "Sash & Sickle Arts",        hook: "Siblings sharing one Upper Rank body — nearly unstoppable together, their tragic origin makes them the most human of monsters.",               traits: ["Shared Rank", "Sash & Sickle", "Entertainment District", "Siblings"], color: "#fb7185" },
  { rank: "Notable — Lower V",  name: "Rui",              kanji: "累",           art: "Thread Blood Demon Art",    hook: "Craved family so desperately he enslaved demons on Mt. Natagumo — bound together by nearly invisible razor-wire threads.",                      traits: ["Steel Threads", "Mt. Natagumo", "False Family", "Lower Rank V"],     color: "#fbbf24" },
  { rank: "Notable — Lower I",  name: "Enmu",             kanji: "魘夢",         art: "Dream Manipulation",        hook: "The last surviving Lower Rank, granted Muzan's blood — traps victims in paradise dreams while silently destroying their souls.",               traits: ["Dream Art", "Mugen Train", "Muzan's Blood", "Soul Destruction"],    color: "#818cf8" },
];

const DemonsSection = () => {
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible((prev) => new Set(prev).add(Number(e.target.getAttribute("data-idx"))));
        });
      },
      { threshold: 0.1 }
    );
    refs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="demons" className="relative py-24" style={{ background: "linear-gradient(180deg, hsl(240 10% 4%), hsl(0 10% 5%), hsl(240 10% 4%))" }}>
      <div className="container mx-auto px-6">

        <div className="text-center mb-10">
          <p className="section-eyebrow mb-3">TWELVE KIZUKI</p>
          <h2 className="font-heading text-4xl sm:text-5xl mb-4">
            Upper Rank <span className="accent-text">Demons</span>
          </h2>
          <p className="text-foreground/60 font-body text-lg max-w-xl mx-auto">
            Born from human despair, empowered by Muzan's blood — the most terrifying beings alive.
          </p>
        </div>

        {/* Muzan identity — visual, no paragraph */}
        <div className="glass-card-elevated mb-12 max-w-3xl mx-auto overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="relative flex flex-col sm:flex-row items-center gap-6 p-7">
            <div
              className="shrink-0 w-16 h-16 rounded-xl flex items-center justify-center font-display text-3xl"
              style={{ background: "hsl(0 80% 55% / 0.12)", color: "hsl(0 80% 60%)" }}
            >
              鬼
            </div>
            <div className="text-center sm:text-left">
              <span className="text-[10px] font-heading tracking-[0.22em] text-primary/60 uppercase">Demon King — 鬼舞辻無惨</span>
              <h3 className="font-heading text-2xl sm:text-3xl text-foreground mt-1">Muzan Kibutsuji</h3>
              <p className="text-foreground/50 font-body text-sm mt-1.5 max-w-sm">
                Progenitor of all demons. His one weakness is sunlight — and anyone who speaks his name.
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3 justify-center sm:justify-start">
                {["All Demons Fear Him", "Killed Tanjiro's Family", "Turned Nezuko", "Seeks Sunlight Immunity"].map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full font-heading"
                    style={{ background: "hsl(0 80% 55% / 0.12)", color: "hsl(0 80% 65%)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Demon grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {demons.map((demon, i) => (
            <div
              key={demon.name}
              ref={(el) => { refs.current[i] = el; }}
              data-idx={i}
              className={`glass-card group hover:scale-[1.02] transition-all duration-500 relative overflow-hidden ${
                visible.has(i) ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="h-px opacity-60" style={{ background: `linear-gradient(90deg, transparent, ${demon.color}, transparent)` }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: `radial-gradient(circle at 50% 0%, ${demon.color}10, transparent 65%)` }} />

              <div className="relative p-5">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[10px] font-heading tracking-wider text-muted-foreground leading-tight">{demon.rank}</span>
                  <span className="font-display text-lg opacity-20" style={{ color: demon.color }}>{demon.kanji}</span>
                </div>
                <h3 className="font-heading text-lg mb-0.5" style={{ color: demon.color }}>{demon.name}</h3>
                <p className="text-[11px] font-heading text-muted-foreground mb-3">{demon.art}</p>
                <p className="text-foreground/60 font-body text-sm leading-relaxed mb-4">{demon.hook}</p>
                <div className="flex flex-wrap gap-1.5">
                  {demon.traits.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full font-heading"
                      style={{ background: `${demon.color}15`, color: demon.color }}>
                      {t}
                    </span>
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

export default DemonsSection;
