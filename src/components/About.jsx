import {
  motion,
  useMotionValue,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GraduationCap, Sparkles, Star } from "lucide-react";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

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
      className={`font-cartoon uppercase text-white px-0 inline-block leading-[0.85] ${className}`}
    >
      Moundir
    </motion.h2>
  );
}

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
    <div className="absolute top-2 left-2 z-30 rounded-md border border-white/10 bg-white/10 backdrop-blur-md px-2 py-1 text-[3vw] sm:text-[1.8vw] md:text-[1vw] uppercase tracking-wider text-white/80 pointer-events-none">
      Appuyer
    </div>
  );
}

function ParcoursCard({
  className = "", titleSize = "text-3xl xl:text-[3.8vw]", bodySize = "text-lg xl:text-[1.8vw]", mode = "hover", compact = false, padding = "p-8",
  revealTitleSize = "text-xl xl:text-[2.5vw]", revealYearSize = "text-sm xl:text-[1.2vw]", revealDescSize = "text-sm xl:text-[1.5vw]",
  revealPadding = "p-6", revealGap = "gap-5 xl:gap-8", iconClass = "w-12 h-12 xl:w-[2.8vw] xl:h-[2.8vw]",
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
      className={`relative bg-[#0c0c0c] ${padding} overflow-hidden rounded-md flex flex-col justify-center select-none ${isClickMode ? "cursor-pointer" : ""} ${className}`}
    >
      <AnimatedFrame hoverColor="#facc15" />
      <BandsYellow />
      {isClickMode && !open && <TapHint />}

      <motion.div variants={contentBlurVariants} className="relative z-0 flex flex-col items-center text-start justify-center h-full w-full">
        <h2 className={`${titleSize} uppercase leading-none ${compact ? "" : "mb-6"} text-white`}>
          Parcours académique ?
        </h2>
        {!compact && (
          <p className={`${bodySize} text-white leading-relaxed max-w-xl mx-auto`}>
            <Highlight delay={0.5}>5 ans d'études</Highlight> à l'Université Ahmed Ben Bella — Oran 1. <br />
            Une expérience <Highlight delay={0.9}>pleine de projets concrets</Highlight> et d'apprentissage intensif.
          </p>
        )}
      </motion.div>

      <motion.div variants={revealVariants} className={`absolute inset-0 z-20 ${revealPadding} flex flex-col justify-center ${revealGap} bg-yellow-400/20 backdrop-blur-md`}>
        <div className="flex items-start gap-2 sm:gap-3 w-full">
          <GraduationCap className={`text-black flex-shrink-0 mt-1 ${iconClass}`} strokeWidth={2.5} />
          <div className="flex-1">
            <div className="flex items-baseline justify-between gap-1 flex-wrap w-full">
              <span className={`${revealTitleSize} font-black uppercase leading-none text-black drop-shadow-md`}>Licence Informatique</span>
              <span className={`${revealYearSize} font-bold text-white drop-shadow-md`}>2021 — 2024</span>
            </div>
            <p className={`${revealDescSize} font-bold text-black mt-1 leading-tight`}>Spécialité Systèmes d'Information</p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-white/20 my-1 rounded-full" />
        <div className="flex items-start gap-2 sm:gap-3 w-full">
          <GraduationCap className={`text-black flex-shrink-0 mt-1 ${iconClass}`} strokeWidth={2.5} />
          <div className="flex-1">
            <div className="flex items-baseline justify-between gap-1 flex-wrap w-full">
              <span className={`${revealTitleSize} font-black uppercase leading-none text-black drop-shadow-md`}>Master 2 — SITW</span>
              <span className={`${revealYearSize} font-bold text-white drop-shadow-md`}>2024 — 2026</span>
            </div>
            <p className={`${revealDescSize} font-bold text-black mt-1 leading-tight`}>Systèmes d'Information & Technologie Web</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TechKey({ tech, mode = "hover", isActive, onClick, sizeClass = "w-16 h-16 xl:w-[4.4vw] xl:h-[4.4vw]", nameSize = "text-[9px] xl:text-[0.6vw]" }) {
  const [restRotate] = useState(() => (Math.random() * 6 - 3).toFixed(1));
  const isClickMode = mode === "click";

  const keyVariants = {
    rest: { rotate: Number(restRotate), y: 0, scale: 1, boxShadow: "0 4px 0 #000, 0 4px 10px rgba(0,0,0,.4)", borderColor: "#2a2a2a" },
    hover: { rotate: 0, y: -8, scale: 1.1, boxShadow: `0 14px 0 #000, 0 20px 25px rgba(0,0,0,.5), 0 0 22px ${tech.color}`, borderColor: tech.color },
  };

  return (
    <motion.div
      initial="rest"
      whileHover={!isClickMode ? "hover" : undefined}
      animate={isClickMode ? (isActive ? "hover" : "rest") : undefined}
      onClick={isClickMode ? onClick : undefined}
      whileTap={isClickMode ? { scale: 1.05 } : { scale: 0.95 }}
      variants={keyVariants}
      transition={{ duration: 0.35, ease: [0.2, 0.9, 0.3, 1.3] }}
      className={`tech-key relative flex flex-col items-center justify-center rounded-lg border-2 bg-[#1a1a1a] select-none ${isClickMode ? "cursor-pointer" : "cursor-default"} ${sizeClass}`}
    >
      <motion.img src={tech.icon} alt={tech.name} variants={{ rest: { filter: "grayscale(1) brightness(1.4)" }, hover: { filter: "none" } }} className="w-[45%] h-[45%] object-contain pointer-events-none" />
      <motion.span variants={{ rest: { opacity: 0, y: 6 }, hover: { opacity: 1, y: 0 } }} className={`absolute -bottom-5 font-cartoon tracking-wide whitespace-nowrap ${nameSize}`} style={{ color: tech.color }}>
        {tech.name}
      </motion.span>
    </motion.div>
  );
}

function TechCard({ className = "", titleSize = "text-2xl xl:text-[3.2vw]", titleContainerClass = "text-center mb-4 lg:mb-6", gridContainerClass = "justify-center content-start", mode = "hover", keySizeClass, keyNameSize, gapClass = "gap-4 xl:gap-5", showTitle = true, titlePosition = "top" }) {
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    if (mode !== "click") return;
    const handleOutsideClick = (e) => { if (!e.target.closest(".tech-key")) setActiveKey(null); };
    document.addEventListener("pointerdown", handleOutsideClick);
    return () => document.removeEventListener("pointerdown", handleOutsideClick);
  }, [mode]);

  const titleEl = showTitle && (
    <h2 className={`relative z-30 ${titleSize} uppercase text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] ${titleContainerClass}`}>
      Technologies et <Highlight className="ml-1 md:ml-2" delay={0.2}>Mes compétences</Highlight>
    </h2>
  );

  const gridEl = (
    <div className={`relative z-0 flex flex-wrap ${gridContainerClass} ${gapClass}`}>
      {techs.map((tech) => (
        <TechKey key={tech.name} tech={tech} mode={mode} isActive={activeKey === tech.name} onClick={() => setActiveKey(activeKey === tech.name ? null : tech.name)} sizeClass={keySizeClass} nameSize={keyNameSize} />
      ))}
    </div>
  );

  return (
    <div className={`relative flex flex-col ${className}`}>
      <Star className="absolute top-2 right-2 md:top-4 md:right-4 w-10 h-10 md:w-16 md:h-16 text-yellow-400 rotate-[15deg] z-40 drop-shadow-lg pointer-events-none" fill="#facc15" strokeWidth={1.5} />
      {titlePosition === "top" ? <>{titleEl}{gridEl}</> : <>{gridEl}{titleEl}</>}
    </div>
  );
}

function IntroOverlay({ startAnimation }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (startAnimation) {
      setPhase(1);
      const t = setTimeout(() => setPhase(2), 1500);
      return () => clearTimeout(t);
    }
  }, [startAnimation]);

  const phrases = [ "Je suis qui ?", "Who am I?", "¿Quién soy?", "?? ??? ?", "Wer bin ich?", "Chi sono?", "Qui je suis ?", "Je suis qui ?", "Who am I?", "Chi sono?" ];

  return (
    <motion.div exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} className="absolute inset-0 z-50 bg-[#080808] overflow-hidden flex items-center justify-center pointer-events-none">
      <div className="absolute w-[200vw] h-[200vh] flex flex-wrap gap-5 md:gap-7 justify-center content-center rotate-[-35deg]">
        {Array.from({ length: 130 }).map((_, i) => {
          const hasText = i % 4 === 0;
          const stacked = i % 6 === 0;
          return (
            <div key={i} className="relative w-24 h-24 md:w-36 md:h-36">
              {stacked && phase >= 1 && <div className={`absolute -bottom-3 -right-3 w-full h-full rounded-xl border-2 transition-all duration-300 ${phase === 1 ? "border-yellow-400/25 border-dashed" : "border-yellow-400/60 bg-yellow-400/30"}`} />}
              <div className={`relative w-full h-full flex items-center justify-center rounded-xl border-2 transition-all duration-300 ${phase === 0 ? "border-transparent bg-transparent" : phase === 1 ? "border-yellow-400/50 border-dashed bg-transparent" : "border-yellow-400 border-solid bg-yellow-400"}`}>
                {phase === 1 && <span className={`font-black text-center leading-tight px-1.5 text-lg md:text-2xl transition-opacity duration-300 text-white ${hasText ? "opacity-100" : "opacity-0"}`}>{phrases[i % phrases.length]}</span>}
                {phase === 2 && <motion.span initial={{ scale: 0.2, opacity: 0, rotate: -15 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 11, delay: (i % 10) * 0.02 }} className="font-black text-black text-4xl md:text-6xl" style={{ WebkitTextStroke: "1.5px #000" }}>?</motion.span>}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function BackgroundGrid() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
      <div className="absolute w-[200vw] h-[200vh] flex flex-wrap gap-4 md:gap-6 justify-center content-center rotate-[-35deg]">
        {Array.from({ length: 160 }).map((_, i) => (
          <div key={i} className="w-24 h-24 md:w-32 md:h-32 border-2 border-dashed border-[#151515] rounded-xl" />
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

  const leftColRef = useRef(null);
  const rawPlaqueX = useMotionValue(0);
  const rawPlaqueY = useMotionValue(0);
  const plaqueX = useSpring(rawPlaqueX, { stiffness: 40, damping: 15, mass: 0.8 });
  const plaqueY = useSpring(rawPlaqueY, { stiffness: 40, damping: 15, mass: 0.8 });

  const handleMouseMove = (e) => {
    if (showOverlay || !leftColRef.current) return;
    const rect = leftColRef.current.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    const maxX = rect.width * 0.35; 
    const maxY = rect.height * 0.42;
    rawPlaqueX.set(clamp(dx * 0.55, -maxX, maxX));
    rawPlaqueY.set(clamp(dy * 0.6, -maxY, maxY));
  };

  const mobileTopRef = useRef(null);
  const rawPlaqueXM = useMotionValue(0);
  const rawPlaqueYM = useMotionValue(0);
  const plaqueXM = useSpring(rawPlaqueXM, { stiffness: 45, damping: 14, mass: 0.6 });
  const plaqueYM = useSpring(rawPlaqueYM, { stiffness: 45, damping: 14, mass: 0.6 });

  const handlePointerMoveMobile = (e) => {
    if (showOverlay || !mobileTopRef.current) return;
    const rect = mobileTopRef.current.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    const maxX = rect.width * 0.24; 
    const maxY = rect.height * 0.35; 
    rawPlaqueXM.set(clamp(dx, -maxX, maxX));
    rawPlaqueYM.set(clamp(dy, -maxY, maxY));
  };

  return (
    // LA CORRECTION EST ICI : Une div globale qui détient le `ref` pour mobile ET desktop
    <div ref={sectionRef} className="w-full h-full relative">
      
      {/* DESKTOP */}
      <section className="hidden md:flex relative w-full h-screen bg-[#080808] overflow-hidden font-cartoon text-white flex-row px-4 py-4 gap-2">
        <AnimatePresence>
          {showOverlay && <IntroOverlay key="intro" startAnimation={isInView} />}
        </AnimatePresence>
        <BackgroundGrid />

        <div ref={leftColRef} onMouseMove={handleMouseMove} className="relative flex-1 h-full flex flex-col justify-center items-start pl-4 z-10">
          <motion.p initial={{ opacity: 0, y: 8 }} animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }} transition={{ duration: 0.35, delay: 0.05 }} className="relative z-10 text-4xl lg:text-5xl xl:text-[3.2vw] uppercase tracking-wide text-white/70 mb-2 mt-6">
            {smallIntro}
          </motion.p>
          <div className="relative inline-block select-none">
            <GiantName isVisible={!showOverlay} className="relative z-10 text-[10vw] xl:text-[12vw] mb-3 p-1" />
            <motion.div style={{ x: plaqueX, y: plaqueY }} initial={{ opacity: 0, scale: 0.2, rotate: -25 }} animate={!showOverlay ? { opacity: 1, scale: 1, rotate: -6 } : { opacity: 0 }} transition={{ type: "spring", stiffness: 65, damping: 14, delay: 0.7 }} className="absolute z-20 top-[-6%] left-[-4%] w-[45%] h-[110%] bg-white rounded-[20px] mix-blend-difference pointer-events-none" />
          </div>
          <RevealParagraph segments={introSegments} isVisible={!showOverlay} className="relative z-10 text-5xl xl:text-[2.8vw] text-start leading-tight normal-case max-w-[95%]" />
        </div>

        <div className="flex flex-col flex-1 h-full py-2 gap-4 z-10">
          <ParcoursCard className="flex-[0.45]" mode="hover" />
          <TechCard className="flex-[0.55]" mode="hover" keySizeClass="w-14 h-14 xl:w-[4.4vw] xl:h-[4.4vw]" keyNameSize="text-[9px] xl:text-[0.6vw]" />
        </div>
      </section>

      {/* MOBILE */}
      <section className="flex md:hidden relative w-full h-[100dvh] bg-[#080808] overflow-hidden font-cartoon text-white flex-col px-4 py-3 gap-2">
        <AnimatePresence>
          {showOverlay && <IntroOverlay key="intro-mobile" startAnimation={isInView} />}
        </AnimatePresence>
        <BackgroundGrid />

        <div ref={mobileTopRef} onPointerMove={handlePointerMoveMobile} onPointerDown={handlePointerMoveMobile} style={{ touchAction: "none" }} className="relative flex-shrink-0 flex flex-col mt-3 justify-center z-10 pt-8 pb-2">
          <motion.div style={{ x: plaqueXM, y: plaqueYM }} initial={{ opacity: 0, scale: 0.2 }} animate={!showOverlay ? { opacity: 1, scale: 1, rotate: -3 } : { opacity: 0 }} transition={{ type: "spring", stiffness: 65, damping: 14, delay: 0.5 }} className="absolute z-20 top-[35%] left-[24%] w-[52%] h-[25%] bg-white rounded-[18px] mix-blend-difference pointer-events-none" />
          <motion.p initial={{ opacity: 0, y: 6 }} animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }} transition={{ duration: 0.3, delay: 0.05 }} className="relative z-10 text-[6vw] sm:text-[5vw] uppercase tracking-wide text-white/70">
            {smallIntro}
          </motion.p>
          <div className="relative inline-block select-none self-start z-10">
            <GiantName isVisible={!showOverlay} className="relative z-10 text-[20vw] sm:text-[15vw] p-2 mb-3 w-fit" />
          </div>
          <RevealParagraph segments={introSegments} isVisible={!showOverlay} className="relative z-10 text-[4.5vw] sm:text-[3.6vw] leading-snug normal-case" />
        </div>

        <div className="relative flex-1 min-h-0 z-10 mt-1">
          <motion.div initial={{ opacity: 0, rotate: 5, y: 20 }} animate={!showOverlay ? { opacity: 1, rotate: 2, y: 0 } : {}} transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.3 }} className="absolute bottom-0 right-0 w-[92%] sm:w-[86%] h-[86%] sm:h-[84%] z-10">
            <TechCard className="w-full h-full bg-[#0c0c0c] border-2 border-dashed border-white/10 rounded-xl px-3 pt-4 pb-3 justify-between" mode="click" titlePosition="bottom" showTitle titleSize="text-[5.5vw] sm:text-[4vw]" titleContainerClass="text-right w-full mt-2" gridContainerClass="justify-end mt-[30%] content-center" keySizeClass="w-[12.5vw] h-[12.5vw] sm:w-[10vw] sm:h-[10vw]" keyNameSize="text-[1.8vw] sm:text-[1.5vw]" gapClass="gap-3 sm:gap-4" />
          </motion.div>
          <motion.div initial={{ opacity: 0, rotate: -6, y: -10 }} animate={!showOverlay ? { opacity: 1, rotate: -3, y: 0 } : {}} transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.45 }} className="absolute top-0 left-0 w-[62%] sm:w-[45%] h-[38%] sm:h-[35%] z-20 shadow-[8px_8px_0_rgba(0,0,0,.5)]">
            <ParcoursCard className="w-full h-full" mode="click" compact padding="p-4" titleSize="text-[5.5vw] sm:text-[4.5vw]" revealTitleSize="text-sm sm:text-base" revealYearSize="text-[10px] sm:text-xs" revealDescSize="text-xs" revealPadding="p-3" revealGap="gap-1 sm:gap-2" iconClass="w-6 h-6 sm:w-8 sm:h-8" />
          </motion.div>
        </div>
      </section>

    </div>
  );
}