import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Compass, Map, Mountain, Waves, Anchor, Skull, TreePine } from "lucide-react";

// ============================================================
// DONNÉES — 7 étapes, positions adaptées pour AUCUN débordement
// ============================================================
const evolutionSteps = [
  { id: "01", title: "Fondations", subtitle: "Logique pure", desc: "Avant de peindre, il faut savoir fabriquer la toile. Apprentissage de l'architecture mémoire.", techs: ["Algo", "C", "Matlab"], x: 15, y: 15, mx: 25, my: 12 },
  { id: "02", title: "Virage Web", subtitle: "Premiers pixels", desc: "Découverte du navigateur, interfaces visuelles, compréhension du DOM sans framework.", techs: ["HTML5", "CSS3", "JS"], x: 35, y: 30, mx: 75, my: 26 },
  { id: "03", title: "Logiciel", subtitle: "Mécanique lourde", desc: "Création de vrais moteurs, jeux 2D et traitement de grosses bases de données.", techs: ["Java", "Python", "SQL"], x: 60, y: 20, mx: 25, my: 40 },
  { id: "04", title: "Fullstack", subtitle: "Écosystème", desc: "Architectures complètes, IA (NLP), plateformes de bout en bout.", techs: ["React", "Node", "Mongo"], x: 82, y: 45, mx: 75, my: 55 },
  { id: "05", title: "Avancées", subtitle: "BaaS & Front", desc: "Frameworks modernes SSR, BaaS pour le temps réel sécurisé.", techs: ["Next.js", "Firebase"], x: 65, y: 65, mx: 25, my: 70 },
  { id: "06", title: "Data Science", subtitle: "Données", desc: "Analyse statistique, clustering, réduction de dimension avancée.", techs: ["Streamlit", "K-Means"], x: 40, y: 85, mx: 75, my: 85 },
  { id: "07", title: "Cloud", subtitle: "Production", desc: "Environnements de production, serveurs, déploiement complet.", techs: ["Render", "Vercel"], x: 15, y: 65, mx: 25, my: 96 },
];

// ============================================================
// ANIMATIONS ET STYLES DU HOVER (Style Hero)
// ============================================================
const barOuterTop = { initial: { scaleY: 0 }, animate: { scaleY: 1, transition: { duration: 0.45, ease: "easeInOut", delay: 0 } } };
const barOuterBottom = { initial: { scaleY: 0 }, animate: { scaleY: 1, transition: { duration: 0.45, ease: "easeInOut", delay: 0 } } };
const barInnerTop = { initial: { scaleY: 0 }, animate: { scaleY: 1, transition: { duration: 0.45, ease: "easeInOut", delay: 0.15 } } };
const barInnerBottom = { initial: { scaleY: 0 }, animate: { scaleY: 1, transition: { duration: 0.45, ease: "easeInOut", delay: 0.15 } } };

function AnimatedFrame({ hoverColor = "#22c55e" }) {
  return (
    <svg className="absolute -inset-2 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
      <motion.rect 
        initial={{ stroke: "#3f2d1c", opacity: 0.5 }}
        animate={{ stroke: hoverColor, opacity: 1 }}
        transition={{ duration: 0.3 }}
        x="0.5" y="0.5" width="99" height="99" rx="4" fill="none" strokeWidth="1.5" strokeDasharray="6 4" vectorEffect="non-scaling-stroke" 
      />
    </svg>
  );
}

// ============================================================
// LOGIQUE DE POSITIONNEMENT (ANTI-DÉBORDEMENT)
// ============================================================
function getMobilePanelStyle(mx, my) {
  const style = { position: 'absolute', width: '220px' };
  if (mx < 50) style.left = '0%'; 
  else style.right = '0%';
  
  if (my <= 50) {
    style.top = '100%';
    style.marginTop = '15px';
  } else {
    style.bottom = '100%';
    style.marginBottom = '15px';
  }
  return style;
}

function getDesktopPanelStyle(x, y) {
  const style = { position: 'absolute', width: '250px' };
  if (x < 50) {
    style.left = '100%';
    style.marginLeft = '16px';
  } else {
    style.right = '100%';
    style.marginRight = '16px';
  }
  if (y < 50) style.top = '0%';
  else style.bottom = '0%';
  return style;
}

// ============================================================
// COMPOSANTS PARTAGÉS
// ============================================================
function Highlight({ children, className = "" }) {
  return (
    <span className={`inline-block bg-green-500 text-black px-2 rounded-sm font-black font-cartoon uppercase ${className}`}>
      {children}
    </span>
  );
}

function BackgroundGrid() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
      <div className="absolute w-[200vw] h-[200vh] flex flex-wrap gap-4 md:gap-6 justify-center content-center rotate-[-35deg] opacity-50">
        {Array.from({ length: 160 }).map((_, i) => (
          <div key={i} className="w-24 h-24 md:w-32 md:h-32 border-2 border-dashed border-green-500/10 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function GiantTitle({ isVisible, className = "", children }) {
  return (
    <motion.h2
      initial={{ opacity: 0, scale: 0.7, y: 30 }}
      animate={isVisible ? { opacity: 1, scale: 1, y: [0, 0, -4, 0] } : { opacity: 0, scale: 0.7, y: 30 }}
      transition={{
        opacity: { type: "spring", stiffness: 55, damping: 12, delay: 0.1 },
        scale: { type: "spring", stiffness: 55, damping: 12, delay: 0.1 },
        y: { duration: 4.5, delay: 1, repeat: Infinity, ease: "easeInOut" },
      }}
      className={`font-cartoon uppercase text-white px-0 inline-block leading-[0.85] ${className}`}
    >
      {children}
    </motion.h2>
  );
}

// Overlay d'intro
function EvolutionIntroOverlay({ startAnimation }) {
  const [phase, setPhase] = useState(0);
  const [itemCount, setItemCount] = useState(130);

  useEffect(() => {
    const update = () => setItemCount(window.innerWidth < 768 ? 70 : 130);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (startAnimation) {
      setPhase(1);
      const t = setTimeout(() => setPhase(2), 1100);
      return () => clearTimeout(t);
    }
  }, [startAnimation]);

  const phrases = ["Mon Évolution", "My Journey", "Mi Evolución", "Mein Werdegang"];

  return (
    <motion.div exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }} className="absolute inset-0 z-50 bg-[#080808] overflow-hidden flex items-center justify-center pointer-events-none">
      <div className="absolute w-[200vw] h-[200vh] flex flex-wrap gap-5 md:gap-7 justify-center content-center rotate-[-35deg]">
        {Array.from({ length: itemCount }).map((_, i) => {
          const hasText = i % 4 === 0;
          const stacked = i % 6 === 0;
          return (
            <div key={i} className="relative w-24 h-24 md:w-36 md:h-36">
              {stacked && phase >= 1 && <div className={`absolute -bottom-3 -right-3 w-full h-full rounded-xl border-2 transition-all duration-200 ${phase === 1 ? "border-green-400/25" : "border-green-400/60 bg-green-500/30"}`} />}
              <div className={`relative w-full h-full flex items-center justify-center rounded-xl border-2 transition-all duration-200 ${phase === 0 ? "border-transparent bg-transparent" : phase === 1 ? "border-green-400/50 bg-transparent" : "border-green-500 border-solid bg-green-500"}`}>
                {phase === 1 && <span className={`font-black font-cartoon uppercase text-center px-1.5 text-lg md:text-2xl text-white ${hasText ? "opacity-100" : "opacity-0"}`}>{phrases[i % phrases.length]}</span>}
                {phase === 2 && <motion.div initial={{ scale: 0.2, opacity: 0, rotate: -15 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ duration: 0.25 }}><Compass className="w-14 h-14 text-black" strokeWidth={2.2} /></motion.div>}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// Boussole placée à droite
function CompassRose({ size = 110, opacity = 0.28 }) {
  return (
    <div className="absolute right-[5%] bottom-[8%] pointer-events-none z-[5]" style={{ width: size, height: size, opacity }}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="46" fill="none" stroke="#3f2d1c" strokeWidth="2" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="#3f2d1c" strokeWidth="0.7" />
        <line x1="50" y1="4" x2="50" y2="96" stroke="#3f2d1c" strokeWidth="1.5" />
        <line x1="4" y1="50" x2="96" y2="50" stroke="#3f2d1c" strokeWidth="1.5" />
        <polygon points="50,14 56,50 50,86 44,50" fill="#3f2d1c" />
        <text x="50" y="12" textAnchor="middle" fontSize="9" fill="#3f2d1c" className="font-cartoon font-bold">N</text>
        <text x="50" y="94" textAnchor="middle" fontSize="7" fill="#3f2d1c" className="font-cartoon font-bold">S</text>
        <text x="90" y="53" textAnchor="middle" fontSize="7" fill="#3f2d1c" className="font-cartoon font-bold">E</text>
        <text x="10" y="53" textAnchor="middle" fontSize="7" fill="#3f2d1c" className="font-cartoon font-bold">O</text>
      </svg>
    </div>
  );
}

// Le Parchemin Ultra-Réaliste avec Grain/Bruit
const TORN_CLIP = "polygon(2% 4%,8% 1%,15% 3%,22% 0%,30% 2%,40% 0%,50% 3%,60% 1%,70% 3%,80% 0%,90% 2%,98% 4%,99% 12%,97% 22%,100% 32%,98% 42%,100% 52%,97% 62%,99% 72%,96% 82%,99% 92%,97% 98%,90% 99%,80% 97%,70% 100%,60% 98%,50% 100%,40% 97%,30% 99%,20% 97%,10% 100%,2% 97%,0% 90%,3% 80%,0% 70%,2% 60%,0% 50%,3% 40%,0% 30%,2% 20%,0% 10%)";

function Parchment() {
  return (
    <>
      <div className="absolute inset-0 -z-10 opacity-90" style={{ background: "linear-gradient(135deg,#a67c52,#8b643a)", clipPath: TORN_CLIP, transform: "rotate(1.6deg) scale(1.02)", filter: "blur(2px)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 18% 28%, rgba(90,65,40,.18), transparent 26%), radial-gradient(circle at 82% 68%, rgba(90,65,40,.15), transparent 30%), radial-gradient(circle at 55% 15%, rgba(90,65,40,.12), transparent 22%), radial-gradient(circle at 30% 85%, rgba(90,65,40,.14), transparent 24%), linear-gradient(135deg, #ebd8af, #dfc99b 55%, #d4b882)", clipPath: TORN_CLIP, boxShadow: "inset 0 0 120px rgba(60,40,15,.5), inset 0 0 30px rgba(60,40,15,.4)", transform: "rotate(-1.4deg)" }} />
      {/* Texture de grain mathématique pour le réalisme ultime */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-25" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, clipPath: TORN_CLIP, transform: "rotate(-1.4deg)" }} />
    </>
  );
}

function Pin() {
  return (
    <div className="absolute z-30 w-[22px] h-[22px] bg-green-500 shadow-lg" style={{ top: -12, left: "50%", borderRadius: "50% 50% 50% 0", transform: "translateX(-50%) rotate(-45deg)" }}>
      <div className="absolute w-2 h-2 rounded-full bg-[#0c0c0c]" style={{ top: 5, left: 5 }} />
    </div>
  );
}

// Sceau déplacé en HAUT À DROITE
function WaxSeal({ count, total }) {
  return (
    <div className="absolute top-[6%] right-[5%] z-30 w-[60px] h-[60px] rounded-full bg-green-500 border-[3px] border-dashed border-black/25 flex flex-col items-center justify-center shadow-xl rotate-[12deg]">
      <span className="text-black text-xl leading-none font-cartoon">{count}</span>
      <span className="text-black text-[6px] uppercase font-bold font-cartoon tracking-wide">/ {total} lieux</span>
    </div>
  );
}

// Décorations de la Chasse au Trésor (Dessins à l'encre)
function MapDoodles({ isMobile }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-[4] text-[#3f2d1c] opacity-40">
      {/* Montagnes au centre bas */}
      <Mountain className="absolute w-14 h-14 bottom-[15%] left-[45%]" strokeWidth={1} />
      <TreePine className="absolute w-8 h-8 bottom-[13%] left-[53%]" strokeWidth={1} />
      <TreePine className="absolute w-6 h-6 bottom-[17%] left-[41%]" strokeWidth={1} />
      
      {/* Océan & Danger */}
      <Waves className="absolute w-12 h-12 top-[60%] left-[85%]" strokeWidth={1.5} />
      <Anchor className="absolute w-8 h-8 top-[72%] left-[88%] -rotate-12" strokeWidth={1.2} />
      <Skull className="absolute w-10 h-10 top-[15%] left-[80%] rotate-12" strokeWidth={1.2} />
      
      {/* Le Trésor "X" sous l'étape Finale (07 Cloud) */}
      <div 
        className="absolute font-cartoon text-red-700/80 text-6xl font-black drop-shadow-sm -translate-x-1/2 -translate-y-1/2 rotate-12" 
        style={isMobile ? { top: '96%', left: '25%' } : { top: '65%', left: '15%' }}
      >
        X
      </div>
    </div>
  );
}

// ============================================================
// MARQUEUR D'ÉTAPE ET PANNEAU (ZÉRO BUG DE CARRÉ NOIR)
// ============================================================
function StepMarker({ step, isMobile, isActive, onEnter, onLeave, onClick }) {
  return (
    <div
      className="absolute"
      style={{ zIndex: isActive ? 60 : 20, top: `${isMobile ? step.my : step.y}%`, left: `${isMobile ? step.mx : step.x}%`, transform: "translate(-50%,-50%)" }}
      onMouseEnter={!isMobile ? onEnter : undefined}
      onMouseLeave={!isMobile ? onLeave : undefined}
      onClick={isMobile ? onClick : undefined}
    >
      <motion.div
        animate={{ scale: isActive ? 1.15 : 1, backgroundColor: isActive ? "#22c55e" : "#f4e9cf", color: isActive ? "#000" : "#3f2d1c" }}
        transition={{ duration: 0.2 }}
        className="relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full border-[2.5px] border-[#3f2d1c] flex items-center justify-center font-cartoon text-lg sm:text-xl shadow-lg cursor-pointer"
      >
        {step.id}
      </motion.div>

      <p className="mt-1 font-cartoon text-[10px] sm:text-[11px] uppercase tracking-wide text-[#3f2d1c] text-center max-w-[80px] sm:max-w-[90px] mx-auto">
        {step.title}
      </p>

      {/* AnimatePresence GARANTIT que le panneau disparaît complètement (fini le carré noir) */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={isMobile ? getMobilePanelStyle(step.mx, step.my) : getDesktopPanelStyle(step.x, step.y)}
            className="absolute z-50 min-h-[170px] flex flex-col items-start justify-start pt-3 pb-5 px-5 bg-[#0c0c0c] rounded-lg shadow-2xl pointer-events-auto cursor-default"
            onClick={(e) => isMobile && e.stopPropagation()} // Évite de fermer au clic sur le panneau
          >
            <AnimatedFrame hoverColor="#22c55e" />
            
            <div className="absolute -inset-2 overflow-hidden rounded-[4px] pointer-events-none z-10">
              <div className="absolute w-[260%] h-[260%] top-[-80%] left-[-80%] rotate-[-35deg] flex flex-col">
                <motion.div variants={barOuterTop} initial="initial" animate="animate" className="w-full h-[25%] bg-green-500 origin-top" />
                <motion.div variants={barInnerTop} initial="initial" animate="animate" className="w-full h-[25%] bg-green-500 origin-top" />
                <motion.div variants={barInnerBottom} initial="initial" animate="animate" className="w-full h-[25%] bg-green-500 origin-bottom" />
                <motion.div variants={barOuterBottom} initial="initial" animate="animate" className="w-full h-[25%] bg-green-500 origin-bottom" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="relative z-20 flex flex-col w-full h-full text-black"
            >
              <h3 className="font-cartoon uppercase text-3xl leading-none text-black mb-1">{step.title}</h3>
              <p className="font-cartoon uppercase text-[12px] tracking-wide text-black/80 mb-2 border-b border-black/20 pb-1">{step.subtitle}</p>
              <p className="font-cartoon text-[13px] leading-snug text-black/90 mb-3">{step.desc}</p>
              
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {step.techs.map((t) => (
                  <span key={t} className="font-cartoon uppercase text-[10px] bg-black text-white px-2 py-1 rounded-sm tracking-wide">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================
export default function Evolution() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [showOverlay, setShowOverlay] = useState(true);
  
  const [activeDesktop, setActiveDesktop] = useState(null);
  const [activeMobile, setActiveMobile] = useState(null);
  const [discovered, setDiscovered] = useState(new Set());

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowOverlay(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const markDiscovered = (id) => {
    setDiscovered((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const routeDesktop = evolutionSteps.map((s) => `${s.x},${s.y}`).join(" ");
  const routeMobile = evolutionSteps.map((s) => `${s.mx},${s.my}`).join(" ");

  return (
    <div ref={sectionRef} className="relative w-full h-[100dvh] bg-[#080808] font-cartoon text-white overflow-hidden select-none">
      <AnimatePresence>
        {showOverlay && <EvolutionIntroOverlay key="intro-evolution" startAnimation={isInView} />}
      </AnimatePresence>

      <BackgroundGrid />

      {/* ============================================================
          ================   VERSION DESKTOP (>= lg)   ================
          ============================================================ */}
      <div className="hidden lg:flex relative z-10 w-full h-full flex-row p-12 gap-10">
        <div className="relative flex-[0.34] h-full flex flex-col justify-end pb-12">
          <GiantTitle isVisible={!showOverlay} className="text-[7.5vw] mb-4">
            MON<br /><span className="bg-green-500 text-black px-1">ÉVOLUTION</span>
          </GiantTitle>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }} transition={{ duration: 0.4, delay: 0.4 }} className="font-cartoon text-xl text-white/80 leading-relaxed max-w-[95%] uppercase space-y-4">
            <p>Chaque étape ici raconte une partie de <Highlight className="text-sm">mon apprentissage.</Highlight> Des premières lignes de code aux architectures complexes — une véritable carte de mon <Highlight className="text-sm">parcours technique,</Highlight> à explorer lieu par lieu.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={!showOverlay ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.6 }} className="mt-6 flex items-center gap-2 text-white/40 uppercase text-xs tracking-widest font-cartoon">
            <Map className="w-5 h-5 text-green-500" /> Survole un lieu pour révéler l'étape
          </motion.div>
        </div>

        <div className="relative flex-[0.66] h-full flex items-center justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={!showOverlay ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }} transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.2 }} className="relative w-full h-[92%] max-w-[900px]">
            <Pin />
            <Parchment />
            <CompassRose />
            <MapDoodles isMobile={false} />

            {/* Tracé en Pointillés */}
            <svg className="absolute inset-0 w-full h-full z-[6] pointer-events-none" preserveAspectRatio="none">
              <polyline points={routeDesktop} fill="none" stroke="#5c4033" strokeOpacity="0.75" strokeWidth="4" strokeDasharray="10 10" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </svg>

            {evolutionSteps.map((step) => (
              <StepMarker key={step.id} step={step} isMobile={false} isActive={activeDesktop === step.id} onEnter={() => { setActiveDesktop(step.id); markDiscovered(step.id); }} onLeave={() => setActiveDesktop(null)} />
            ))}

            <WaxSeal count={discovered.size} total={evolutionSteps.length} />
          </motion.div>
        </div>
      </div>

      {/* ============================================================
          ================   VERSION MOBILE (< lg)   ===================
          ============================================================ */}
      <div className="flex lg:hidden relative z-10 w-full h-full flex-col px-4 pt-16 pb-3">
        <div className="flex-shrink-0 flex flex-col items-start z-10 pb-2">
          <motion.p initial={{ opacity: 0, y: 6 }} animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }} transition={{ duration: 0.3, delay: 0.05 }} className="relative z-10 text-[9vw] sm:text-[4vw] uppercase tracking-wide font-cartoon text-black bg-green-500 px-1 leading-none">Mon</motion.p>
          <GiantTitle isVisible={!showOverlay} className="text-[20vw] sm:text-[14vw] mb-2 text-white">ÉVOLUTION</GiantTitle>
          <motion.p initial={{ opacity: 0, y: 6 }} animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }} transition={{ duration: 0.4, delay: 0.4 }} className="font-cartoon text-[13px] text-white/80 uppercase mt-2 max-w-[95%] leading-snug">Une carte de mon parcours technique — touche un lieu pour le révéler.</motion.p>
        </div>

        <div className="relative flex-1 min-h-0 pt-4" onClick={() => setActiveMobile(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={!showOverlay ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }} transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.15 }} className="relative w-full h-full max-w-[420px] mx-auto">
            <Pin />
            <Parchment />
            <CompassRose size={70} opacity={0.22} />
            <MapDoodles isMobile={true} />

            <svg className="absolute inset-0 w-full h-full z-[6] pointer-events-none" preserveAspectRatio="none">
              <polyline points={routeMobile} fill="none" stroke="#5c4033" strokeOpacity="0.75" strokeWidth="3" strokeDasharray="8 8" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </svg>

            {evolutionSteps.map((step) => (
              <div key={step.id}>
                <StepMarker step={step} isMobile={true} isActive={activeMobile === step.id} onClick={(e) => { e.stopPropagation(); setActiveMobile((cur) => (cur === step.id ? null : step.id)); markDiscovered(step.id); }} />
              </div>
            ))}

            <WaxSeal count={discovered.size} total={evolutionSteps.length} />
          </motion.div>
        </div>

        <div className="flex-shrink-0 flex items-center justify-center gap-1.5 pt-3 pb-1 text-white/40 uppercase text-[10px] tracking-widest font-cartoon">
          <Map className="w-3 h-3 text-green-500" /> Touche chaque lieu
        </div>
      </div>
    </div>
  );
}