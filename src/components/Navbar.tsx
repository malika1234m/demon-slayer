import { useState, useEffect } from "react";
import { Sun, Moon, ChevronUp, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const sections = ["home", "characters", "swords", "breathing", "hashira", "legends", "demons", "arcs", "gallery"];
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 600);
      const sorted = [...sections].reverse();
      for (const id of sorted) {
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
            ? "bg-background/85 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.04)]"
            : "bg-transparent"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg flame-text tracking-wider">鬼滅の刃</span>
              <span className="text-[9px] text-muted-foreground/60 tracking-[0.2em] font-heading mt-0.5">
                KIMETSU NO YAIBA
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {links.map((l) => {
              const isActive = activeSection === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`relative px-3 py-1.5 text-[11px] font-heading tracking-[0.12em] uppercase transition-colors duration-200 rounded-md ${
                      isActive
                        ? "text-foreground"
                        : "text-foreground/50 hover:text-foreground/80"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-md"
                        style={{ background: "hsl(var(--primary) / 0.12)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{l.label}</span>
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg glass-card hover:bg-primary/10 transition-colors"
              aria-label="Toggle theme"
            >
              {isLight
                ? <Moon className="w-4 h-4 text-foreground/70" />
                : <Sun className="w-4 h-4 text-accent/80" />}
            </button>

            <button
              className="lg:hidden p-2 rounded-lg glass-card text-foreground/70 hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen
                  ? <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="w-4 h-4" /></motion.span>
                  : <motion.span key="open"  initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-4 h-4" /></motion.span>}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="lg:hidden border-t border-white/[0.06] bg-background/95 backdrop-blur-2xl overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <ul className="flex flex-col gap-1 px-6 py-4">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block py-2 px-3 rounded-lg text-sm font-heading tracking-wider transition-colors ${
                        activeSection === l.href.slice(1)
                          ? "text-primary bg-primary/8"
                          : "text-foreground/60 hover:text-foreground hover:bg-white/5"
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
            className="fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-primary/15 transition-colors"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.1 }}
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-4 h-4 text-foreground/60" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
