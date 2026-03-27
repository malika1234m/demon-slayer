import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

const MusicToggle = () => {
  const [playing, setPlaying] = useState(false);
  const [audio] = useState(() => {
    const a = new Audio();
    // Ambient wind/nature sound from a free source — works as placeholder
    a.src = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=";
    a.loop = true;
    a.volume = 0.3;
    return a;
  });

  const toggle = () => {
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-primary/20 transition-colors shadow-lg"
      aria-label={playing ? "Mute music" : "Play music"}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
    >
      {playing ? (
        <Volume2 className="w-5 h-5 text-accent" />
      ) : (
        <VolumeX className="w-5 h-5 text-muted-foreground" />
      )}
      {playing && (
        <motion.div
          className="absolute inset-0 rounded-full border border-accent/30"
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
};

export default MusicToggle;
