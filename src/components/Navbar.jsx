// components/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import SlotReel from "./SlotReel";

// ============================================================
// BALAYAGE DE COULEUR — même technique que les bandes du Hero
// (AnimatedFrame / MobileCard) : le fond reste sur l'ANCIENNE
// couleur, 4 bandes diagonales de la NOUVELLE couleur balaient
// depuis le haut et le bas et se referment au centre. Une fois
// refermées, la nouvelle couleur devient le nouveau fond stable
// (via onAnimationComplete), prête pour le prochain changement.
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
      {/* Fond stable — reste sur l'ancienne couleur pendant le balayage */}
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

function Navbar({ sections, activeIndex, onNavigate, isDesktop }) {
  const prevIndex = useRef(activeIndex);
  const [direction, setDirection] = useState(1);

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
    if (!isDesktop) {
      requestAnimationFrame(() => {
        document.getElementById(target.id)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  const goUp = () => canGoUp && move(activeIndex - 1);
  const goDown = () => canGoDown && move(activeIndex + 1);

  return (
    <div className="fixed top-3 md:top-6 left-3 md:left-6 z-[100] pointer-events-none">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 140, damping: 18 }}
        className="
          relative pointer-events-auto flex items-center
          rounded-full select-none overflow-hidden shadow-2xl shadow-black/40
          pl-0.5 pr-3 py-0.5 gap-0.5
          md:pl-1 md:pr-5 md:py-1 md:gap-1
        "
      >
        <ColorSweep targetColor={current.color} />

        {/* Flèches haut/bas — plus petites sur mobile */}
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

        {/* Nom de section — effet machine à sous, VRAIMENT centré */}
        <div className="relative z-10 flex-1 flex justify-center">
          <SlotReel
            text={current.label}
            direction={direction}
            className={`
              h-[1.1em] font-cartoon uppercase tracking-tight text-center
              transition-colors duration-300 ${textColor}
              text-lg min-w-[80px]
              md:text-xl md:min-w-[150px]
            `}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default Navbar;