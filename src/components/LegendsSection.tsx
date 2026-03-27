import { useRef, useEffect, useState } from "react";

interface Legend {
  era: string;
  name: string;
  title: string;
  body: string[];
  quote: string;
  tags: string[];
  color: string;
}

const legends: Legend[] = [
  { era: "MENTOR — RETIRED", name: "Sakonji Urokodaki", title: "Former Water Hashira", body: ["The masked guardian of Mt. Sagiri — Urokodaki shaped an entire generation of demon slayers. His red tengu mask hides a face weathered by decades of loss. He trained Giyu Tomioka and took Tanjiro Kamado under his wing.", "He felt personally responsible for every student killed by the Hand Demon — a demon who hunted down his former pupils."], quote: "If Tanjiro fails to kill the demon… I will commit seppuku out of shame.", tags: ["Water Breathing Grandmaster", "Tengu Mask", "Mt. Sagiri"], color: "#4facfe" },
  { era: "TRAGEDY — RETIRED AT 35", name: "Jigoro Kuwajima", title: "Former Thunder Hashira", body: ["Sharp-eyed and demanding, 'Gramps' trained two students — Zenitsu Agatsuma and Kaigaku. He lost his leg in battle and was forced to retire at age 35.", "When his senior student Kaigaku willingly became a demon, Jigoro committed ritual suicide — seppuku — taking responsibility for his student's betrayal."], quote: "Every master passes on their everything to their student. What Kaigaku did… was an unforgivable betrayal of that bond.", tags: ["Thunder Breathing", "Zenitsu's Master", "Died of Seppuku"], color: "#ffd700" },
  { era: "GRIEF & REDEMPTION", name: "Shinjuro Rengoku", title: "Former Flame Hashira", body: ["Father of Kyojuro, Shinjuro was once a proud and fiery Hashira. But the death of his wife and discovering Sun Breathing's superiority broke him.", "He became a bitter alcoholic — only when Tanjiro brought news of Kyojuro's dying message of love did Shinjuro begin to confront his grief."], quote: "Kyojuro… you were always the best of us.", tags: ["Flame Breathing", "Rengoku Family", "Path of Redemption"], color: "#fb923c" },
  { era: "FALLEN AT 17 — NEVER FORGOTTEN", name: "Kanae Kocho", title: "Former Flower Hashira", body: ["Kanae genuinely believed that humans and demons could coexist. Her compassion was boundless, even in the face of monsters.", "She was murdered by Upper Rank Two — Doma. She fought until dawn but her body failed at age 17."], quote: "I hope one day… demons and humans can live together in peace. Even after I am gone.", tags: ["Flower Breathing", "Butterfly Mansion", "Killed by Doma (UR2)"], color: "#f472b6" },
  { era: "RETIRED — STILL SERVING", name: "Tengen Uzui", title: "Former Sound Hashira (Retired)", body: ["After the catastrophic battle in the Entertainment District, Tengen lost his left eye and right hand fighting Upper Rank Six.", "He retired but never truly left the Corps — he led grueling physical conditioning courses for new slayers during the Hashira Training Arc."], quote: "Whether I live or die — it will be in the most flamboyant way possible.", tags: ["Sound Breathing", "Defeated UR6", "Hashira Training Arc"], color: "#fbbf24" },
];

const LegendsSection = () => {
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible((prev) => new Set(prev).add(Number(e.target.getAttribute("data-idx"))));
        });
      },
      { threshold: 0.15 }
    );
    refs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="legends" className="relative py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-eyebrow mb-3">THOSE WHO CAME BEFORE</p>
          <h2 className="font-heading text-4xl sm:text-5xl mb-4">
            Former <span className="accent-text">Hashira</span> Legends
          </h2>
          <p className="text-foreground/60 font-body text-lg max-w-2xl mx-auto">
            Their stories are written in sacrifice, grief, and the enduring will to protect humanity at any cost.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />

          {legends.map((legend, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={legend.name}
                ref={(el) => { refs.current[i] = el; }}
                data-idx={i}
                className={`relative mb-12 md:flex ${isLeft ? "md:justify-start" : "md:justify-end"} ${
                  visible.has(i) ? (isLeft ? "animate-slide-left" : "animate-slide-right") : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {/* Dot */}
                <div
                  className="hidden md:block absolute left-1/2 top-6 w-4 h-4 rounded-full -translate-x-1/2 z-10 border-2 border-background"
                  style={{ background: legend.color }}
                />

                <div className={`glass-card p-6 md:w-[45%] relative`}>
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 opacity-50"
                    style={{ background: `linear-gradient(90deg, transparent, ${legend.color}, transparent)` }}
                  />
                  <span className="text-xs font-heading tracking-widest text-muted-foreground">{legend.era}</span>
                  <h3 className="font-heading text-xl mt-2 text-foreground">{legend.name}</h3>
                  <p className="text-sm font-heading mb-3" style={{ color: legend.color }}>{legend.title}</p>
                  {legend.body.map((p, j) => (
                    <p key={j} className="text-foreground/60 font-body text-sm leading-relaxed mb-2">{p}</p>
                  ))}
                  <blockquote className="border-l-2 border-primary/40 pl-4 italic text-foreground/50 font-body text-sm my-4">
                    "{legend.quote}"
                  </blockquote>
                  <div className="flex flex-wrap gap-2">
                    {legend.tags.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded-full font-heading tracking-wide" style={{ background: `${legend.color}15`, color: legend.color }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LegendsSection;
