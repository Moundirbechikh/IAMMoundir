// components/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, X, Hand } from "lucide-react";
import SlotReel from "./SlotReel";

// ============================================================
// BALAYAGE DE COULEUR — inchangé
// ============================================================
function ColorSweep({ targetColor }) {
  const [baseColor, setBaseColor] = useState(targetColor);
  const [sweepKey, setSweepKey] = useState(0);
  const prevTarget = useRef(targetColor);

  useEffect(() => {
    if (targetColor !== prevTarget.current) {
      prevTarget.current = targetColor;
      setSweepKey((k) => k + 1);
    }
  }, [targetColor]);

  const isSweeping = targetColor !== baseColor;

  return (
    <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none z-0">
      <div className="absolute inset-0" style={{ backgroundColor: baseColor }} />
      {isSweeping && (
        <div className="absolute w-[300%] h-[300%] top-[-100%] left-[-100%] rotate-[-35deg] flex flex-col">
          <motion.div
            key={`${sweepKey}-outer-top`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut", delay: 0 }}
            style={{ backgroundColor: targetColor }}
            className="w-full h-[25%] origin-top"
          />
          <motion.div
            key={`${sweepKey}-inner-top`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut", delay: 0.12 }}
            style={{ backgroundColor: targetColor }}
            className="w-full h-[25%] origin-top"
          />
          <motion.div
            key={`${sweepKey}-inner-bottom`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut", delay: 0.12 }}
            style={{ backgroundColor: targetColor }}
            className="w-full h-[25%] origin-bottom"
          />
          <motion.div
            key={`${sweepKey}-outer-bottom`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut", delay: 0 }}
            onAnimationComplete={() => setBaseColor(targetColor)}
            style={{ backgroundColor: targetColor }}
            className="w-full h-[25%] origin-bottom"
          />
        </div>
      )}
    </div>
  );
}

// ============================================================
// BULLE D'ONBOARDING — Phrase dynamique en fonction de isDesktop
// ============================================================
function NavHint({ onClose, isDesktop }) {
  useEffect(() => {
    // Le message dure 6 secondes (6000 ms) APRÈS son apparition
    const timer = setTimeout(onClose, 6000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      // Animation : Scroll down pour entrer, Scroll up pour sortir
      initial={{ opacity: 0, scale: 0.85, y: -30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: -30, transition: { duration: 0.3 } }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="
        pointer-events-auto absolute top-[85%] left-0 z-[-1]
        w-[220px] md:w-[260px]
        bg-white/70 backdrop-blur-md text-black border border-white/40
        rounded-[26px] rounded-tl-[10px]
        pt-5 pb-4 px-4 md:pt-6 md:pb-5 md:px-5
        shadow-2xl shadow-black/40
      "
    >
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="absolute top-2.5 right-2.5 w-6 h-6 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-black transition-colors"
      >
        <X size={13} strokeWidth={3} />
      </button>

      <p className="font-cartoon uppercase leading-tight text-md md:text-lg tracking-tight pr-4 text-black flex items-center gap-2">
        Ceci est ta navbar <Hand size={18} strokeWidth={2.5} />
      </p>
      <p className="mt-1.5 text-[13px] md:text-md text-black leading-snug font-cartoon">
        {isDesktop
          ? "Utilise les flèches (ou scroll / swipe) pour changer de section, ou clique le X pour fermer ce message."
          : "Clique sur la navbar pour descendre."}
      </p>
    </motion.div>
  );
}

function Navbar({ sections, activeIndex, onNavigate, isDesktop }) {
  const prevIndex = useRef(activeIndex);
  const [direction, setDirection] = useState(1);
  
  // Initialement "false" pour cacher le hint au démarrage
  const [showHint, setShowHint] = useState(false);

  // Gérer l'apparition de la bulle après 4 secondes
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setShowHint(true);
    }, 4000);

    return () => clearTimeout(delayTimer);
  }, []);

  const closeHint = () => {
    setShowHint(false);
  };

  useEffect(() => {
    if (activeIndex !== prevIndex.current) {
      setDirection(activeIndex > prevIndex.current ? 1 : -1);
      prevIndex.current = activeIndex;
    }
  }, [activeIndex]);

  const current = sections[activeIndex];
  const canGoUp = activeIndex > 0;
  const canGoDown = activeIndex < sections.length - 1;

  const isLight = current.text === "light";
  const textColor = isLight ? "text-white" : "text-black";
  const iconColor = isLight ? "text-white" : "text-black";
  const iconHover = isLight ? "hover:bg-white/15" : "hover:bg-black/10";
  const iconDisabled = isLight ? "text-white/25" : "text-black/20";

  const move = (nextIdx) => {
    const target = sections[nextIdx];
    if (!target) return;
    onNavigate(nextIdx);
    // On ne fait plus de scrollIntoView ici, App.jsx gère le snap global.
  };

  const goUp = () => canGoUp && move(activeIndex - 1);
  const goDown = () => canGoDown && move(activeIndex + 1);

  return (
    <div className="fixed top-3 md:top-6 left-3 md:left-6 z-[100] pointer-events-none">
      <div className="relative">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 140, damping: 18 }}
          className="
            relative z-10 pointer-events-auto flex items-center
            rounded-full select-none overflow-hidden shadow-2xl shadow-black/40
            pl-0.5 pr-3 py-0.5 gap-0.5
            md:pl-1 md:pr-5 md:py-1 md:gap-1
          "
        >
          <ColorSweep targetColor={current.color} />

          {/* Flèches haut/bas */}
          <div className="relative z-10 flex flex-col">
            <button
              onClick={goUp}
              disabled={!canGoUp}
              aria-label="Section précédente"
              className={`flex items-center justify-center w-5 h-4 md:w-7 md:h-6 rounded-full transition-colors ${
                canGoUp ? `${iconColor} ${iconHover}` : iconDisabled
              }`}
            >
              <ChevronUp size={11} strokeWidth={3} className="md:hidden" />
              <ChevronUp size={15} strokeWidth={3} className="hidden md:block" />
            </button>
            <button
              onClick={goDown}
              disabled={!canGoDown}
              aria-label="Section suivante"
              className={`flex items-center justify-center w-5 h-4 md:w-7 md:h-6 rounded-full transition-colors ${
                canGoDown ? `${iconColor} ${iconHover}` : iconDisabled
              }`}
            >
              <ChevronDown size={11} strokeWidth={3} className="md:hidden" />
              <ChevronDown size={15} strokeWidth={3} className="hidden md:block" />
            </button>
          </div>

          {/* Nom de section — machine à sous, centré */}
          <div className="relative z-10 flex-1 flex justify-center">
            <SlotReel
              text={current.label}
              direction={direction}
              className={`
                h-[1.1em] font-cartoon uppercase tracking-tight text-center
                transition-colors duration-300 ${textColor}
                text-lg min-w-[80px]
                md:text-3xl md:min-w-[150px]
              `}
            />
          </div>
        </motion.div>

        {/* Bulle d'onboarding (apparait au bout de 4s) avec passage de isDesktop */}
        <AnimatePresence>
          {showHint && <NavHint onClose={closeHint} isDesktop={isDesktop} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Navbar;