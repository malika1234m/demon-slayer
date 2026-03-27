import { useState, useEffect } from "react";
import { Sun, Moon, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 600);

      // Active section detection
      const sections = ["home", "characters", "swords", "breathing", "hashira", "legends", "demons", "arcs", "gallery"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    setIsLight((v) => {
      document.documentElement.classList.toggle("light", !v);
      return !v;
    });
  };

  const links = [
    { href: "#characters", label: "Characters" },
    { href: "#swords", label: "Swords" },
    { href: "#breathing", label: "Breathing" },
    { href: "#hashira", label: "Hashira" },
    { href: "#arcs", label: "Arcs" },
    { href: "#gallery", label: "Gallery" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg"
            : "bg-transparent"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <a href="#home" className="flex flex-col">
            <span className="font-display text-xl flame-text">鬼滅の刃</span>
            <span className="text-[10px] text-muted-foreground tracking-widest font-heading">
              Kimetsu no Yaiba
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-6">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`text-xs font-heading tracking-wider transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left ${
                    activeSection === l.href.slice(1)
                      ? "text-primary after:scale-x-100 after:origin-left"
                      : "text-foreground/60 hover:text-foreground after:scale-x-0"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full glass-card hover:bg-primary/20 transition-colors"
              aria-label="Toggle theme"
            >
              {isLight ? <Moon className="w-4 h-4 text-foreground" /> : <Sun className="w-4 h-4 text-accent" />}
            </button>

            <button
              className="lg:hidden text-foreground text-xl p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={{ rotate: mobileOpen ? 90 : 0 }}
                className="block"
              >
                {mobileOpen ? "✕" : "☰"}
              </motion.span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="flex flex-col items-center gap-4 py-6">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-sm font-heading tracking-wider transition-colors ${
                        activeSection === l.href.slice(1) ? "text-primary" : "text-foreground/60 hover:text-foreground"
                      }`}
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-primary/20 transition-colors shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.1 }}
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5 text-foreground/60" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
