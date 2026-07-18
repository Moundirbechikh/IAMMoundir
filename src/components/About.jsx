import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GraduationCap } from "lucide-react";

// Fonction utilitaire pour contraindre une valeur entre un min et un max
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

// ============================================================
// HIGHLIGHT — clip-path jaune
// ============================================================
function Highlight({ children, delay = 0, className = "" }) {
  return (
    <span className={`relative inline-block z-10 ${className}`}>
      <motion.span
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 0.45, delay, ease: [0.65, 0, 0.35, 1] }}
        className="absolute inset-0 bg-yellow-400"
      />
      <span className="relative text-black px-1.5 font-black inline-block">
        {children}
      </span>
    </span>
  );
}

// ============================================================
// NOM GÉANT "MOUNDIR" - Fond blanc et texte noir pour l'inversion
// ============================================================
function GiantName({ isVisible, className = "" }) {
  return (
    <motion.h2
      initial={{ opacity: 0, scale: 0.7, y: 30 }}
      animate={
        isVisible
          ? { opacity: 1, scale: 1, y: [0, 0, -4, 0] }
          : { opacity: 0, scale: 0.7, y: 30 }
      }
      transition={{
        opacity: { type: "spring", stiffness: 55, damping: 12, delay: 0.1 },
        scale: { type: "spring", stiffness: 55, damping: 12, delay: 0.1 },
        y: { duration: 4.5, delay: 1, repeat: Infinity, ease: "easeInOut" },
      }}
      className={`font-cartoon uppercase bg-white text-black px-0 inline-block leading-[0.85] ${className}`}
    >
      Moundir
    </motion.h2>
  );
}

// ============================================================
// PARAGRAPHE
// ============================================================
function RevealParagraph({ segments, className = "", isVisible = false }) {
  let wordIndex = 0;
  return (
    <p className={className}>
      {segments.map((seg, si) =>
        seg.t.split(" ").map((w, wi) => {
          const delay = isVisible ? 0.1 + wordIndex * 0.02 : 0;
          wordIndex += 1;
          return (
            <motion.span
              key={`${si}-${wi}`}
              initial={{ opacity: 0, y: 8 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.35, delay, ease: [0.65, 0, 0.35, 1] }}
              className="inline-block mr-[0.25em] text-white"
            >
              {w}
            </motion.span>
          );
        })
      )}
    </p>
  );
}

const smallIntro = "Je suis";
const introSegments = [
  { t: "développeur Full Stack." },
  { t: "Je transforme vos idées en applications web modernes, fluides et performantes." },
  { t: "De la conception d'interfaces intuitives à l'architecture backend robuste," },
  { t: "je crée des expériences numériques immersives de bout en bout." },
];

// ============================================================
// TECHNOLOGIES
// ============================================================
const techs = [
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/white", color: "#F7DF1E" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/white", color: "#61DAFB" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/white", color: "#339933" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/white", color: "#3776AB" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", color: "#E76F00" },
  { name: "PHP", icon: "https://cdn.simpleicons.org/php/white", color: "#777BB4" },
  { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/white", color: "#E34F26" },
  { name: "CSS3", icon: "https://cdn.simpleicons.org/css/white", color: "#1572B6" },
  { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/white", color: "#06B6D4" },
  { name: "Spring Boot", icon: "https://cdn.simpleicons.org/springboot/white", color: "#6DB33F" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/white", color: "#336791" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/white", color: "#4479A1" },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/white", color: "#47A248" },
  { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase/white", color: "#3ECF8E" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/white", color: "#F05032" },
];

// ============================================================
// SUPPORTS VISUELS
// ============================================================
const barOuterTop = { rest: { scaleY: 0 }, hover: { scaleY: 1, transition: { duration: 0.45, ease: "easeInOut" } } };
const barOuterBottom = { rest: { scaleY: 0 }, hover: { scaleY: 1, transition: { duration: 0.45, ease: "easeInOut" } } };
const barInnerTop = { rest: { scaleY: 0 }, hover: { scaleY: 1, transition: { duration: 0.45, ease: "easeInOut", delay: 0.2 } } };
const barInnerBottom = { rest: { scaleY: 0 }, hover: { scaleY: 1, transition: { duration: 0.45, ease: "easeInOut", delay: 0.2 } } };
const contentBlurVariants = {
  rest: { filter: "blur(0px)", opacity: 1, transition: { duration: 0.4 } },
  hover: { filter: "blur(6px)", opacity: 0.3, transition: { duration: 0.4 } },
};
const revealVariants = {
  rest: { opacity: 0, y: 12, pointerEvents: "none" },
  hover: { opacity: 1, y: 0, pointerEvents: "auto" },
};

function AnimatedFrame({ hoverColor = "#facc15" }) {
  const frameVariants = {
    rest: { stroke: "#ffffff", opacity: 0.3, transition: { duration: 0.3 } },
    hover: { stroke: hoverColor, opacity: 1, transition: { duration: 0.3 } },
  };
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
      <motion.rect
        x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)"
        fill="none" strokeWidth="2" strokeDasharray="8 6"
        variants={frameVariants}
      />
    </svg>
  );
}

function BandsYellow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      <div className="absolute w-[260%] h-[260%] top-[-80%] left-[-80%] rotate-[-35deg] flex flex-col">
        <motion.div variants={barOuterTop} className="w-full h-[25%] bg-yellow-400 origin-top" />
        <motion.div variants={barInnerTop} className="w-full h-[25%] bg-yellow-400 origin-top" />
        <motion.div variants={barInnerBottom} className="w-full h-[25%] bg-yellow-400 origin-bottom" />
        <motion.div variants={barOuterBottom} className="w-full h-[25%] bg-yellow-400 origin-bottom" />
      </div>
    </div>
  );
}

function TapHint() {
  return (
    <div className="absolute top-2 right-2 z-30 rounded-md border border-white/10 bg-white/10 backdrop-blur-md px-2 py-1 text-[2.4vw] sm:text-[1.2vw] uppercase tracking-wider text-white/80 pointer-events-none">
      Toucher
    </div>
  );
}

// ============================================================
// CARTE PARCOURS
// ============================================================
function ParcoursCard({
  className = "",
  titleSize = "text-3xl xl:text-[3.8vw]",
  bodySize = "text-lg xl:text-[1.8vw]",
  mode = "hover",
}) {
  const [open, setOpen] = useState(false);
  const isClickMode = mode === "click";

  return (
    <motion.div
      initial="rest"
      whileHover={!isClickMode ? "hover" : undefined}
      animate={isClickMode ? (open ? "hover" : "rest") : undefined}
      onClick={isClickMode ? () => setOpen((v) => !v) : undefined}
      whileTap={isClickMode ? { scale: 0.97 } : undefined}
      className={`relative bg-[#0c0c0c] p-6 lg:p-8 overflow-hidden rounded-md flex flex-col justify-center select-none ${
        isClickMode ? "cursor-pointer" : ""
      } ${className}`}
    >
      <AnimatedFrame hoverColor="#facc15" />
      <BandsYellow />
      {isClickMode && !open && <TapHint />}

      <motion.div variants={contentBlurVariants} className="relative z-0 flex flex-col items-center text-start justify-center h-full w-full">
        <h2 className={`${titleSize} uppercase leading-none mb-4 lg:mb-6 text-white text-center`}>
          Parcours académique ?
        </h2>
        <p className={`${bodySize} text-white leading-relaxed max-w-xl mx-auto text-center`}>
          <Highlight delay={0.5}>5 ans d'études</Highlight> à l'Université Ahmed Ben Bella — Oran 1. <br />
          Une expérience <Highlight delay={0.9}>pleine de projets concrets</Highlight> et d'apprentissage intensif.
        </p>
      </motion.div>

      <motion.div variants={revealVariants} className="absolute inset-0 z-20 p-4 lg:p-6 flex flex-col justify-center gap-4 xl:gap-8 bg-yellow-400/90 backdrop-blur-sm">
        <div className="flex items-center gap-3 lg:gap-4">
          <GraduationCap size={36} className="text-black flex-shrink-0 lg:w-[48px] lg:h-[48px]" strokeWidth={2.5} />
          <div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-base lg:text-xl xl:text-[2vw] font-black uppercase leading-none text-black">Licence Informatique</span>
              <span className="text-xs xl:text-[1vw] font-bold text-black/80">2021 — 2024</span>
            </div>
            <p className="text-xs xl:text-[1.2vw] font-medium text-black mt-1 leading-tight">Spécialité Systèmes d'Information</p>
          </div>
        </div>
        <div className="flex items-center gap-3 lg:gap-4">
          <GraduationCap size={36} className="text-black flex-shrink-0 lg:w-[48px] lg:h-[48px]" strokeWidth={2.5} />
          <div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-base lg:text-xl xl:text-[2vw] font-black uppercase leading-none text-black">Master 2 — SITW</span>
              <span className="text-xs xl:text-[1vw] font-bold text-black/80">2024 — 2026</span>
            </div>
            <p className="text-xs xl:text-[1.2vw] font-medium text-black mt-1 leading-tight">Systèmes d'Information & Technologie Web</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================
// KEYCAP (Touche)
// ============================================================
function TechKey({
  tech,
  mode = "hover",
  sizeClass = "w-16 h-16 xl:w-[4.4vw] xl:h-[4.4vw]",
  nameSize = "text-[9px] xl:text-[0.6vw]",
}) {
  const [active, setActive] = useState(false);
  const [restRotate] = useState(() => (Math.random() * 6 - 3).toFixed(1));
  const isClickMode = mode === "click";

  const keyVariants = {
    rest: {
      rotate: Number(restRotate),
      y: 0,
      scale: 1,
      boxShadow: "0 4px 0 #000, 0 4px 10px rgba(0,0,0,.4)",
      borderColor: "#2a2a2a",
    },
    hover: {
      rotate: 0,
      y: -8,
      scale: 1.1,
      boxShadow: `0 14px 0 #000, 0 20px 25px rgba(0,0,0,.5), 0 0 22px ${tech.color}`,
      borderColor: tech.color,
    },
  };

  return (
    <motion.div
      initial="rest"
      whileHover={!isClickMode ? "hover" : undefined}
      animate={isClickMode ? (active ? "hover" : "rest") : undefined}
      onClick={isClickMode ? () => setActive((v) => !v) : undefined}
      whileTap={isClickMode ? { scale: 1.05 } : { scale: 0.95 }}
      variants={keyVariants}
      transition={{ duration: 0.35, ease: [0.2, 0.9, 0.3, 1.3] }}
      className={`relative flex flex-col items-center justify-center rounded-lg border-2 bg-[#1a1a1a] select-none ${
        isClickMode ? "cursor-pointer" : "cursor-default"
      } ${sizeClass}`}
    >
      <motion.img
        src={tech.icon}
        alt={tech.name}
        variants={{ rest: { filter: "grayscale(1) brightness(1.4)" }, hover: { filter: "none" } }}
        className="w-[45%] h-[45%] object-contain pointer-events-none"
      />
      <motion.span
        variants={{ rest: { opacity: 0, y: 6 }, hover: { opacity: 1, y: 0 } }}
        className={`absolute -bottom-5 font-cartoon tracking-wide whitespace-nowrap ${nameSize}`}
        style={{ color: tech.color }}
      >
        {tech.name}
      </motion.span>
    </motion.div>
  );
}

// ============================================================
// CARTE TECHNOLOGIES
// ============================================================
function TechCard({
  className = "",
  titleSize = "text-2xl xl:text-[3.2vw]",
  titleContainerClass = "text-center mb-4 lg:mb-6",
  gridContainerClass = "justify-center content-start",
  mode = "hover",
  keySizeClass,
  keyNameSize,
  gapClass = "gap-4 xl:gap-5",
}) {
  return (
    <div className={`relative flex flex-col ${className}`}>
      <h2 className={`relative z-30 ${titleSize} uppercase text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] ${titleContainerClass}`}>
        Technologies et Mes compétences
      </h2>
      <div className={`relative z-0 flex flex-wrap ${gridContainerClass} ${gapClass}`}>
        {techs.map((tech) => (
          <TechKey key={tech.name} tech={tech} mode={mode} sizeClass={keySizeClass} nameSize={keyNameSize} />
        ))}
      </div>
    </div>
  );
}

// ============================================================
// OVERLAY D'INTRODUCTION (Effet Fill Jaune + Pointillés)
// ============================================================
function IntroOverlay({ startAnimation }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (startAnimation) {
      setPhase(1);
      const t = setTimeout(() => setPhase(2), 1500);
      return () => clearTimeout(t);
    }
  }, [startAnimation]);

  const phrases = [
    "Je suis qui ?", "Who am I?", "¿Quién soy?", "من أنا؟",
    "Wer bin ich?", "Chi sono?", "Qui je suis ?", "私は誰ですか？"
  ];

  return (
    <motion.div
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="absolute inset-0 z-50 bg-[#000000] overflow-hidden flex items-center justify-center pointer-events-none"
    >
      <div className="absolute w-[250vw] h-[250vh] flex flex-wrap gap-2 md:gap-4 justify-center content-center rotate-[-25deg] scale-110">
        {Array.from({ length: 180 }).map((_, i) => {
          const hasText = i % 9 === 0;
          const text = hasText ? phrases[(i / 9) % phrases.length] : "";

          return (
            <div key={i} className="relative w-20 h-20 md:w-32 md:h-32">
              <div
                className={`relative w-full h-full flex items-center justify-center rounded-xl md:rounded-2xl border-[2px] md:border-[3px] border-dashed transition-all duration-300 ${
                  phase === 0 ? "border-transparent" : "border-yellow-400/60"
                }`}
              >
                {/* Effet Fill Jaune au lancement */}
                {phase >= 1 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: hasText ? 0.8 : 0.2 }}
                    transition={{ duration: 0.4, delay: (i % 10) * 0.05 }}
                    className="absolute inset-0 bg-yellow-400 rounded-xl md:rounded-2xl"
                  />
                )}
                {phase >= 1 && hasText && (
                  <span className="relative z-10 font-cartoon text-black text-center leading-tight px-2 text-sm md:text-xl">
                    {text}
                  </span>
                )}
                {phase === 2 && i % 14 === 0 && (
                  <motion.span
                    initial={{ scale: 0.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 11, delay: (i % 5) * 0.1 }}
                    className="absolute z-10 inset-0 flex items-center justify-center font-black text-black text-5xl md:text-7xl opacity-40"
                  >
                    ?
                  </motion.span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ============================================================
// GRILLE DE FOND (En pointillés)
// ============================================================
function BackgroundGrid() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
      <div className="absolute w-[200vw] h-[200vh] flex flex-wrap gap-4 md:gap-6 justify-center content-center rotate-[-35deg]">
        {Array.from({ length: 160 }).map((_, i) => (
          <div key={i} className="w-24 h-24 md:w-32 md:h-32 border-[2px] border-dashed border-[#222222] rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowOverlay(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // ============================================================
  // PLAQUE DESKTOP — Strictement contrainte à la zone
  // ============================================================
  const leftColRef = useRef(null);
  const rawPlaqueX = useMotionValue(0);
  const rawPlaqueY = useMotionValue(0);
  const plaqueX = useSpring(rawPlaqueX, { stiffness: 60, damping: 20, mass: 0.5 });
  const plaqueY = useSpring(rawPlaqueY, { stiffness: 60, damping: 20, mass: 0.5 });

  const handleMouseMove = (e) => {
    if (showOverlay || !leftColRef.current) return;
    const rect = leftColRef.current.getBoundingClientRect();
    
    // On calcule la position locale de la souris
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Tailles de la plaque en pixels (équivalent à 15vw et 22vh)
    const pw = window.innerWidth * 0.15; 
    const ph = window.innerHeight * 0.22;
    
    // Clamp strict: ne peut jamais dépasser 0 (top/left) ou rect.width - pw (bottom/right)
    rawPlaqueX.set(clamp(x - pw / 2, 0, rect.width - pw));
    rawPlaqueY.set(clamp(y - ph / 2, 0, rect.height - ph));
  };

  // ============================================================
  // PLAQUE MOBILE — Strictement contrainte
  // ============================================================
  const mobileTopRef = useRef(null);
  const rawPlaqueXM = useMotionValue(0);
  const rawPlaqueYM = useMotionValue(0);
  const plaqueXM = useSpring(rawPlaqueXM, { stiffness: 60, damping: 20, mass: 0.5 });
  const plaqueYM = useSpring(rawPlaqueYM, { stiffness: 60, damping: 20, mass: 0.5 });

  const handlePointerMoveMobile = (e) => {
    if (showOverlay || !mobileTopRef.current) return;
    const rect = mobileTopRef.current.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const pw = rect.width * 0.40; // 40% de la largeur
    const ph = rect.height * 0.30; // 30% de la hauteur
    
    rawPlaqueXM.set(clamp(x - pw / 2, 0, rect.width - pw));
    rawPlaqueYM.set(clamp(y - ph / 2, 0, rect.height - ph));
  };

  return (
    <>
      {/* ============================================================
          DESKTOP (>= lg)
          ============================================================ */}
      <section
        ref={sectionRef}
        className="hidden lg:flex relative w-full h-screen bg-[#080808] overflow-hidden font-cartoon text-white flex-row px-4 py-4 gap-2"
      >
        <AnimatePresence>
          {showOverlay && <IntroOverlay key="intro" startAnimation={isInView} />}
        </AnimatePresence>
        
        <BackgroundGrid />

        <div
          ref={leftColRef}
          onMouseMove={handleMouseMove}
          className="relative flex-1 h-full flex flex-col justify-center items-start pl-4 z-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="relative z-10 text-3xl xl:text-[1.8vw] uppercase tracking-wide text-white/70 my-2"
          >
            {smallIntro}
          </motion.p>

          {/* MOUNDIR : Fond blanc et écriture noire (Inversion active) */}
          <GiantName isVisible={!showOverlay} className="relative z-10 text-[10vw] xl:text-[12vw] mb-3 p-1" />

          <RevealParagraph
            segments={introSegments}
            isVisible={!showOverlay}
            className="relative z-10 text-5xl xl:text-[2.8vw] text-start leading-tight normal-case max-w-[95%]"
          />

          {/* PLAQUE BLANCHE mix-blend-difference */}
          <motion.div
            style={{ x: plaqueX, y: plaqueY }}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={!showOverlay ? { opacity: 1, scale: 1 } : { opacity: 0 }}
            transition={{ type: "spring", stiffness: 65, damping: 14, delay: 0.2 }}
            className="absolute z-20 top-0 left-0 w-[15vw] h-[22vh] bg-white rounded-3xl mix-blend-difference pointer-events-none"
          />
        </div>

        <div className="flex flex-col flex-1 h-full py-4 pr-4 gap-6 z-10 overflow-hidden relative">
          {/* Animation de collision au lancement (Top/Left vers Centre) */}
          <motion.div
            initial={{ x: '100%', y: '-50%', rotate: 15 }}
            animate={!showOverlay ? { x: 0, y: 0, rotate: 0 } : {}}
            transition={{ type: "spring", mass: 1.2, stiffness: 100, damping: 14 }}
            className="flex-[0.45] w-full"
          >
            <ParcoursCard className="w-full h-full" mode="hover" />
          </motion.div>
          
          {/* Animation de collision au lancement (Bottom/Right vers Centre) */}
          <motion.div
            initial={{ x: '100%', y: '50%', rotate: -15 }}
            animate={!showOverlay ? { x: 0, y: 0, rotate: 0 } : {}}
            transition={{ type: "spring", mass: 1.2, stiffness: 100, damping: 14 }}
            className="flex-[0.55] w-full"
          >
            <TechCard
              className="w-full h-full"
              mode="hover"
              keySizeClass="w-16 h-16 xl:w-[4.8vw] xl:h-[4.8vw]"
              keyNameSize="text-[10px] xl:text-[0.7vw]"
            />
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          MOBILE / TABLETTE (< lg)
          ============================================================ */}
      <section
        className="flex lg:hidden relative w-full h-[100dvh] bg-[#080808] overflow-hidden font-cartoon text-white flex-col px-4 py-3 gap-2"
      >
        <AnimatePresence>
          {showOverlay && <IntroOverlay key="intro-mobile" startAnimation={isInView} />}
        </AnimatePresence>
        
        <BackgroundGrid />

        <div
          ref={mobileTopRef}
          onPointerMove={handlePointerMoveMobile}
          onPointerDown={handlePointerMoveMobile}
          style={{ touchAction: "none" }}
          className="relative flex-[0_0_40%] flex flex-col justify-center z-10 pt-16 pb-4"
        >
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="relative z-10 text-[4.5vw] uppercase tracking-wide text-white/70"
          >
            {smallIntro}
          </motion.p>

          {/* MOUNDIR en inversion mobile aussi */}
          <GiantName isVisible={!showOverlay} className="relative z-10 text-[20vw] p-3 mb-3 w-fit" />

          <RevealParagraph
            segments={introSegments}
            isVisible={!showOverlay}
            className="relative z-10 text-[4.5vw] sm:text-[4vw] leading-snug normal-case"
          />

          <motion.div
            style={{ x: plaqueXM, y: plaqueYM }}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={!showOverlay ? { opacity: 1, scale: 1, rotate: -6 } : { opacity: 0 }}
            transition={{ type: "spring", stiffness: 65, damping: 14, delay: 0.2 }}
            className="absolute z-20 top-[-6%] left-[-4%] w-[40%] h-[30%] bg-white rounded-[20px] mix-blend-difference pointer-events-none"
          />
        </div>

        <div className="relative flex-1 min-h-0 w-full z-10">
          {/* TechCard Mobile - Décalée avec animation de collision */}
          <motion.div
            initial={{ x: "100%", y: "100%", rotate: 20 }}
            animate={!showOverlay ? { x: 0, y: 0, rotate: 2 } : {}}
            transition={{ type: "spring", stiffness: 90, damping: 13 }}
            className="absolute bottom-0 right-0 w-[85%] h-[85%] z-10"
          >
            <TechCard
              className="w-full h-full border-2 border-dashed border-white/10 rounded-xl px-2 py-4 justify-between"
              mode="click"
              titleSize="text-[4.5vw]"
              titleContainerClass="text-right w-[70%] ml-auto pr-2 mt-2" // Texte aligné à droite
              gridContainerClass="justify-center sm:justify-end content-end mt-auto pt-[45%] pb-2 mb-2" // Touches repoussées tout en bas
              keySizeClass="w-[10vw] h-[10vw]"
              keyNameSize="text-[2.2vw]"
              gapClass="gap-1.5 sm:gap-2"
            />
          </motion.div>

          {/* Parcours Mobile - Décalé avec animation de collision */}
          <motion.div
            initial={{ x: "-100%", y: "-100%", rotate: -20 }}
            animate={!showOverlay ? { x: 0, y: 0, rotate: -3 } : {}}
            transition={{ type: "spring", stiffness: 90, damping: 13 }}
            className="absolute top-[2%] left-0 w-[70%] h-[50%] z-20 shadow-[6px_6px_0_rgba(0,0,0,.6)]"
          >
            <ParcoursCard
              className="w-full h-full"
              mode="click"
              titleSize="text-[5vw]"
              bodySize="text-[2.6vw]"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}