import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  title: string;
  category: string;
  color: string;
  icon: string;
  desc: string;
}

const gallery: GalleryItem[] = [
  { title: "Tanjiro's Water Breathing", category: "Techniques", color: "#60a5fa", icon: "🌊", desc: "The graceful arcs of Water Breathing Form 10: Constant Flux" },
  { title: "Rengoku's Last Stand", category: "Iconic Moments", color: "#fb923c", icon: "🔥", desc: "Set Your Heart Ablaze — the Flame Hashira's final battle" },
  { title: "Nezuko's Awakening", category: "Characters", color: "#f472b6", icon: "🌸", desc: "The moment Nezuko conquers the sun" },
  { title: "Zenitsu's Thunderclap", category: "Techniques", color: "#fbbf24", icon: "⚡", desc: "Godspeed — the ultimate Thunder Breathing technique" },
  { title: "Mugen Train Sunset", category: "Iconic Moments", color: "#ef4444", icon: "🚂", desc: "Dawn breaks over the Mugen Train wreckage" },
  { title: "Shinobu's Butterfly Dance", category: "Techniques", color: "#c084fc", icon: "🦋", desc: "Dance of the Bee Sting — a lethal injection" },
  { title: "Gyomei's Prayer", category: "Characters", color: "#8b7355", icon: "📿", desc: "The Stone Hashira in meditative focus" },
  { title: "Muzan's Final Form", category: "Iconic Moments", color: "#ef4444", icon: "👹", desc: "The Demon King's most terrifying transformation" },
  { title: "Inosuke's Beast Sense", category: "Techniques", color: "#4ade80", icon: "🐗", desc: "Spatial Awareness — sensing everything in range" },
  { title: "Entertainment District Night", category: "Iconic Moments", color: "#e879f9", icon: "🎭", desc: "The dazzling lights of Yoshiwara hide demons within" },
  { title: "Mitsuri's Love Breathing", category: "Techniques", color: "#f472b6", icon: "💗", desc: "The whip-sword dances with impossible flexibility" },
  { title: "Yoriichi's Sun", category: "Characters", color: "#ef4444", icon: "☀️", desc: "The greatest demon slayer who ever lived" },
];

const categories = ["All", ...new Set(gallery.map((g) => g.category))];

const GallerySection = () => {
  const [filter, setFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = filter === "All" ? gallery : gallery.filter((g) => g.category === filter);

  return (
    <section ref={sectionRef} id="gallery" className="relative py-24" style={{ background: "linear-gradient(180deg, hsl(240 10% 4%), hsl(240 10% 6%), hsl(240 10% 4%))" }}>
      <div className="container mx-auto px-6">
        <div className={`text-center mb-12 ${visible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="section-eyebrow mb-3">VISUAL JOURNEY</p>
          <h2 className="font-heading text-4xl sm:text-5xl mb-4">
            Scene <span className="accent-text">Gallery</span>
          </h2>
          <p className="text-foreground/60 font-body text-lg max-w-2xl mx-auto">
            Relive the most breathtaking moments from the world of Demon Slayer.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-heading tracking-wider transition-all duration-300 ${
                filter === cat
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "glass-card text-foreground/60 hover:text-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`glass-card group cursor-pointer overflow-hidden relative ${i === 0 || i === 5 ? "md:col-span-2 md:row-span-2" : ""}`}
                onClick={() => setSelectedItem(item)}
                whileHover={{ scale: 1.03 }}
              >
                {/* Colored gradient background */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ background: `linear-gradient(135deg, ${item.color}12, ${item.color}05)` }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at center, ${item.color}25, transparent 70%)` }}
                />

                <div className={`relative flex flex-col items-center justify-center text-center p-6 ${i === 0 || i === 5 ? "min-h-[200px] md:min-h-[280px]" : "min-h-[150px]"}`}>
                  <motion.span
                    className={`${i === 0 || i === 5 ? "text-6xl" : "text-4xl"} mb-3 block`}
                    whileHover={{ scale: 1.3, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {item.icon}
                  </motion.span>
                  <h4 className="font-heading text-sm text-foreground mb-1">{item.title}</h4>
                  <span className="text-[10px] font-heading text-muted-foreground tracking-wider">{item.category}</span>
                </div>

                {/* Hover border glow */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 30px ${item.color}15, 0 0 20px ${item.color}10` }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
            <motion.div
              className="glass-card p-8 max-w-lg w-full relative overflow-hidden"
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: `linear-gradient(90deg, transparent, ${selectedItem.color}, transparent)` }}
              />
              <div className="text-center">
                <motion.span
                  className="text-7xl block mb-4"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {selectedItem.icon}
                </motion.span>
                <h3 className="font-heading text-2xl mb-2" style={{ color: selectedItem.color }}>{selectedItem.title}</h3>
                <span className="text-xs font-heading text-muted-foreground tracking-wider block mb-4">{selectedItem.category}</span>
                <p className="text-foreground/70 font-body leading-relaxed">{selectedItem.desc}</p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-foreground/40 hover:text-foreground transition-colors text-lg"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
