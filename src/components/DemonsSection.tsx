import { useRef, useEffect, useState } from "react";

interface Demon {
  rank: string;
  name: string;
  art: string;
  desc: string;
  traits: string[];
  color: string;
}

const demons: Demon[] = [
  { rank: "Upper Rank I", name: "Kokushibo", art: "Moon Breathing", desc: "Once a human — the twin brother of Yoriichi Tsugikuni. Envious and terrified of death, he chose demonhood. His Moon Breathing has sixteen forms and creates crescent-shaped blades from his flesh.", traits: ["Moon Breathing (16 Forms)", "Former Demon Slayer", "Yoriichi's Twin", "Multiple Eyes"], color: "#ef4444" },
  { rank: "Upper Rank II", name: "Doma", art: "Cryogenic Blood Demon Art", desc: "The most disturbing villain — a hollow entity who has never experienced genuine emotion, yet perfectly mimics warmth. He leads a cult he ultimately devours. His ice-based art creates blizzards and frozen carnage.", traits: ["Ice Blood Demon Art", "Killed Kanae Kocho", "Emotionally Hollow", "Cult Leader"], color: "#22d3ee" },
  { rank: "Upper Rank III", name: "Akaza", art: "Destructive Death — Martial Arts", desc: "A pure martial artist of terrifying power who fights entirely with his fists. His tragic backstory as Hakuji makes him one of the most complex demons. He personally defeats Rengoku on the Mugen Train.", traits: ["Destructive Death Art", "Defeated Rengoku", "Hateful of Weakness", "No Weapons"], color: "#f97316" },
  { rank: "Upper Rank IV", name: "Hantengu", art: "Emotion-Split Clones", desc: "His Blood Demon Art manifests emotions as powerful individual demon clones — fear, anger, pleasure, sorrow, and joy. Despite his grotesque power, Hantengu himself is a coward who screams innocence.", traits: ["Emotion Split Art", "Clone Manifestation", "Zohakuten Form", "Cowardly True Form"], color: "#d946ef" },
  { rank: "Upper Rank V", name: "Gyokko", art: "Vase Blood Demon Art", desc: "A narcissistic demon who considers himself a supreme artist. His art involves emerging from decorative vases and creating grotesque sculptures from victims' bodies.", traits: ["Vase Teleportation", "Fish Demon Spawn", "Narcissist Artist", "True Form: Aquatic"], color: "#4ade80" },
  { rank: "Upper Rank VI", name: "Daki & Gyutaro", art: "Sash & Sickle Blood Demon Arts", desc: "Siblings sharing a single Upper Rank. Their tragic backstory as starving children makes them sympathetic monsters. Together they were almost unstoppable in the Entertainment District.", traits: ["Shared Upper Rank", "Entertainment District Arc", "Sash & Sickle Arts", "Inseparable Siblings"], color: "#fb7185" },
  { rank: "Notable Demon", name: "Rui", art: "Thread Blood Demon Art — Lower Rank V", desc: "A lonely demon who desperately craved family bonds. He created a false 'family' on Mt. Natagumo, punishing members brutally when they failed. His steel-wire threads are nearly invisible.", traits: ["Steel Thread Art", "Mt. Natagumo", "Lower Rank V", "Craved Family"], color: "#fbbf24" },
  { rank: "Notable Demon", name: "Enmu", art: "Dream Manipulation — Lower Rank I", desc: "The last surviving Lower Rank, granted extra blood by Muzan. His art traps victims in blissful dreams while destroying their spiritual cores. He fused with the Mugen Train itself.", traits: ["Dream Manipulation", "Mugen Train Arc", "Lower Rank I", "Muzan's Favorite"], color: "#818cf8" },
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
          <p className="text-foreground/60 font-body text-lg max-w-2xl mx-auto">
            Born from human despair and empowered by Muzan's blood — the most terrifying beings in existence.
          </p>
        </div>

        {/* Muzan Banner */}
        <div className="glass-card p-8 mb-16 max-w-3xl mx-auto border-primary/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <div className="relative">
            <div className="text-center mb-4">
              <span className="text-3xl">♔</span>
              <h3 className="font-heading text-2xl text-foreground mt-2">Muzan Kibutsuji</h3>
              <p className="text-primary font-heading text-sm">The Demon King — 鬼舞辻無惨</p>
            </div>
            <p className="text-foreground/60 font-body text-center leading-relaxed">
              The progenitor of all demons and the embodiment of evil. Muzan killed Tanjiro's family and turned Nezuko into a demon. He seeks immunity to sunlight to become a truly perfect being — and annihilates anyone who speaks his name.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {demons.map((demon, i) => (
            <div
              key={demon.name}
              ref={(el) => { refs.current[i] = el; }}
              data-idx={i}
              className={`glass-card p-5 group hover:scale-[1.02] transition-all duration-500 relative overflow-hidden ${
                visible.has(i) ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${demon.color}, transparent)` }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: `radial-gradient(circle at 50% 0%, ${demon.color}10, transparent 60%)` }}
              />
              <div className="relative">
                <span className="text-xs font-heading tracking-wider text-muted-foreground">{demon.rank}</span>
                <h3 className="font-heading text-xl mt-1 mb-1" style={{ color: demon.color }}>{demon.name}</h3>
                <p className="text-xs font-heading text-muted-foreground mb-3">{demon.art}</p>
                <p className="text-foreground/60 font-body text-sm leading-relaxed mb-4">{demon.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {demon.traits.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full font-heading tracking-wide" style={{ background: `${demon.color}15`, color: demon.color }}>
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
