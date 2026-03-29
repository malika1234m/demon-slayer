import { motion } from "framer-motion";

const SocialIcon = ({ children, label, href }: { children: React.ReactNode; label: string; href: string }) => (
  <motion.a
    href={href}
    aria-label={label}
    className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-foreground/40 hover:text-foreground/80 transition-colors"
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.a>
);

const Footer = () => {
  return (
    <footer className="relative border-t border-white/[0.05] bg-background py-16 overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-6 relative">
        {/* Quote */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="font-display text-xl sm:text-3xl flame-text leading-relaxed max-w-2xl mx-auto">
            "Set Your Heart Ablaze"
          </p>
          <p className="text-muted-foreground/50 font-heading text-[10px] tracking-[0.25em] mt-3 uppercase">
            Kyojuro Rengoku — Flame Hashira
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="font-display text-2xl flame-text">鬼滅の刃</span>
            <p className="font-heading text-[10px] text-foreground/40 tracking-[0.18em] mt-1 uppercase">
              Demon Slayer: Kimetsu no Yaiba
            </p>
            <p className="text-sm text-muted-foreground/60 mt-4 font-body leading-relaxed max-w-xs">
              A fan-made tribute to the world created by Koyoharu Gotouge.
              All characters and content belong to their respective owners.
            </p>

            {/* SVG social icons */}
            <div className="flex gap-2 mt-6">
              <SocialIcon label="X / Twitter" href="#">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </SocialIcon>

              <SocialIcon label="YouTube" href="#">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </SocialIcon>

              <SocialIcon label="Discord" href="#">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.12.12 18.18.15 18.23c2.19 1.609 4.313 2.585 6.39 3.226.073.022.134-.01.155-.073.486-.665.919-1.367 1.292-2.108a.071.071 0 0 0-.04-.098 13.12 13.12 0 0 1-1.872-.892.072.072 0 0 1-.007-.121c.126-.094.252-.192.372-.291a.073.073 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.073.073 0 0 1 .078.01c.12.099.246.198.373.292a.072.072 0 0 1-.006.12 12.298 12.298 0 0 1-1.873.892.073.073 0 0 0-.039.099 13.87 13.87 0 0 0 1.29 2.107.074.074 0 0 0 .154.074 19.63 19.63 0 0 0 6.395-3.226.072.072 0 0 0 .03-.057c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                </svg>
              </SocialIcon>

              <SocialIcon label="Reddit" href="#">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-heading text-[10px] tracking-[0.2em] text-foreground/40 uppercase mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {[
                ["#characters", "Characters"],
                ["#swords", "Nichirin Blades"],
                ["#breathing", "Breathing Styles"],
                ["#hashira", "The Hashira"],
                ["#arcs", "Story Arcs"],
                ["#gallery", "Gallery"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-sm text-muted-foreground/55 hover:text-foreground/75 transition-colors font-body">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 className="font-heading text-[10px] tracking-[0.2em] text-foreground/40 uppercase mb-4">More</h4>
            <ul className="space-y-2.5">
              {[
                ["#legends", "Former Hashira"],
                ["#demons", "Upper Rank Demons"],
                ["#home", "Back to Top"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-sm text-muted-foreground/55 hover:text-foreground/75 transition-colors font-body">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground/40 font-body">
            © 2024 Demon Slayer Fan Site — For fan purposes only. Not affiliated with Shueisha or ufotable.
          </p>
          <p className="text-[10px] text-muted-foreground/30 font-heading tracking-[0.2em] uppercase">
            Kimetsu no Yaiba
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
