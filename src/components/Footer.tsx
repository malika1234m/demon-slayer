import { motion } from "framer-motion";

const socialLinks = [
  { label: "Twitter", icon: "𝕏", href: "#" },
  { label: "Discord", icon: "💬", href: "#" },
  { label: "Reddit", icon: "📡", href: "#" },
  { label: "YouTube", icon: "▶", href: "#" },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-background py-16 overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-6 relative">
        {/* Quote banner */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="font-display text-2xl sm:text-4xl flame-text leading-relaxed max-w-3xl mx-auto">
            "Set Your Heart Ablaze"
          </p>
          <p className="text-muted-foreground font-heading text-xs tracking-widest mt-4">— KYOJURO RENGOKU</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <span className="font-display text-3xl flame-text">鬼滅の刃</span>
            <p className="font-heading text-sm text-foreground/70 mt-2">Demon Slayer: Kimetsu no Yaiba</p>
            <p className="text-xs text-muted-foreground mt-4 font-body max-w-sm">
              A fan-made tribute to the extraordinary world created by Koyoharu Gotouge.
              All characters and content belong to their respective owners.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-foreground/50 hover:text-primary transition-colors"
                  whileHover={{ scale: 1.15, boxShadow: "0 0 15px hsl(0 80% 55% / 0.3)" }}
                  aria-label={s.label}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm tracking-wider text-foreground mb-4">Explore</h4>
            <ul className="space-y-2">
              {[
                ["#characters", "Characters"],
                ["#swords", "Nichirin Blades"],
                ["#breathing", "Breathing Styles"],
                ["#hashira", "The Hashira"],
                ["#arcs", "Story Arcs"],
                ["#gallery", "Gallery"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-muted-foreground hover:text-primary transition-colors font-body text-sm">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm tracking-wider text-foreground mb-4">More</h4>
            <ul className="space-y-2">
              {[
                ["#legends", "Former Hashira"],
                ["#demons", "Upper Rank Demons"],
                ["#home", "Back to Top"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-muted-foreground hover:text-primary transition-colors font-body text-sm">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-body">
            © 2024 Demon Slayer Fan Site. For fan purposes only. Not affiliated with Shueisha or ufotable.
          </p>
          <p className="text-xs text-muted-foreground font-heading tracking-widest">
            鬼滅の刃 • KIMETSU NO YAIBA
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
