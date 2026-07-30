import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Compass, Map, Mountain, Waves, Anchor, Skull, TreePine } from "lucide-react";

// ============================================================
// DONNÉES — 7 étapes, positions adaptées pour AUCUN débordement
// ============================================================
const evolutionSteps = [
  { 
    id: "01", 
    title: "Fondations & Logique", 
    subtitle: "Algorithmique pure", 
    desc: "Compréhension de la complexité algorithmique, du calcul scientifique et des bases de données relationnelles.", 
    techs: ["Algorithmique","C", "Matlab", "MySQL"], 
    x: 15, y: 15, mx: 25, my: 12 
  },
  { 
    id: "02", 
    title: "Web Traditionnel & POO", 
    subtitle: "L'interface prend forme", 
    desc: "Apprentissage de la POO avec Java et création des premières interfaces visuelles et systèmes CRUD.", 
    techs: ["HTML/CSS", "vanila js", "PHP","java"], 
    x: 35, y: 38, mx: 75, my: 27 
  },
  { 
    id: "03", 
    title: "Python & Data", 
    subtitle: "Calculs & Recommandation", 
    desc: "Manipulation de données, calculs avancés et création de tableaux de bord interactifs.", 
    techs: ["Python","Csv", "Pandas", "Streamlit"], 
    x: 60, y: 20, mx: 35, my: 35 
  },
  { 
    id: "04", 
    title: "Passion Frontend", 
    subtitle: "L'ère React & BaaS", 
    desc: "Spécialisation dans la création d'interfaces dynamiques. Utilisation de Backend-as-a-Service et premiers déploiements cloud.", 
    techs: ["React", "Supabase", "Vercel"], 
    x: 82, y: 45, mx: 82, my: 53 
  },
  { 
    id: "05", 
    title: "Data Analysis & Infra", 
    subtitle: "Modèles & Conteneurs", 
    desc: "Analyse de données (K-Means, ACP) et initiation à la conteneurisation pour les environnements de base de données.", 
    techs: ["Machine Learning", "Docker", "PostgreSQL"], 
    x: 65, y: 65, mx: 15, my: 62 
  },
  { 
    id: "06", 
    title: "Fullstack JavaScript", 
    subtitle: "De l'UI à l'API", 
    desc: "Développement d'applications complètes de bout en bout avec Node.js, et hébergement web fluide.", 
    techs: ["Node.js", "MongoDB", "Express"], 
    x: 45, y: 80, mx: 71, my: 76 
  },
  { 
    id: "07", 
    title: "Fullstack Avancé", 
    subtitle: "Architecture & Déploiement", 
    desc: "Création de Web Services robustes en Spring Boot et maîtrise de la mise en production sur des serveurs cloud.", 
    techs: ["Spring Boot", "Web Services", "Render"], 
    x: 22, y: 58, mx: 20, my: 88 
  },
];

// ============================================================
// ANIMATIONS ET STYLES DU HOVER
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
// LOGIQUE DE POSITIONNEMENT
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
    <span className={`inline-block bg-green-500 text-black  py-0.3 mx-1  font-black font-cartoon uppercase tracking-wide whitespace-nowrap ${className}`}>
      {children}
    </span>
  );
}

// ============================================================
// BACKGROUND GRID — OPTIMISÉ
// Avant : 160 <div> React montés en permanence (coûteux sur mobile,
// surtout multiplié par 6 sections qui restent toutes montées dans le DOM).
// Après : un seul <div>, motif dessiné une fois en SVG et répété par le
// navigateur via background-image (aucun calcul JS/React, juste du
// compositing GPU). Rendu visuel identique (carrés pointillés verts,
// rotation -35°), coût quasi nul.
// ============================================================
function BackgroundGrid() {
  return (
    <div
      className="absolute -inset-[60%] z-0 pointer-events-none rotate-[-35deg] opacity-50
                 bg-[length:112px_112px] md:bg-[length:152px_152px]
                 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%27112%27%20height=%27112%27%3E%3Crect%20x=%278%27%20y=%278%27%20width=%2796%27%20height=%2796%27%20rx=%2712%27%20fill=%27none%27%20stroke=%27%2322c55e%27%20stroke-opacity=%270.12%27%20stroke-width=%272%27%20stroke-dasharray=%276%204%27/%3E%3C/svg%3E')]
                 md:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%27152%27%20height=%27152%27%3E%3Crect%20x=%2712%27%20y=%2712%27%20width=%27128%27%20height=%27128%27%20rx=%2716%27%20fill=%27none%27%20stroke=%27%2322c55e%27%20stroke-opacity=%270.12%27%20stroke-width=%272%27%20stroke-dasharray=%276%204%27/%3E%3C/svg%3E')]"
    />
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

const TORN_CLIP = "polygon(2% 4%,8% 1%,15% 3%,22% 0%,30% 2%,40% 0%,50% 3%,60% 1%,70% 3%,80% 0%,90% 2%,98% 4%,99% 12%,97% 22%,100% 32%,98% 42%,100% 52%,97% 62%,99% 72%,96% 82%,99% 92%,97% 98%,90% 99%,80% 97%,70% 100%,60% 98%,50% 100%,40% 97%,30% 99%,20% 97%,10% 100%,2% 97%,0% 90%,3% 80%,0% 70%,2% 60%,0% 50%,3% 40%,0% 30%,2% 20%,0% 10%)";

function Parchment() {
  return (
    <>
      <div className="absolute inset-0 -z-10 opacity-90" style={{ background: "linear-gradient(135deg,#a67c52,#8b643a)", clipPath: TORN_CLIP, transform: "rotate(1.6deg) scale(1.02)", filter: "blur(2px)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 18% 28%, rgba(90,65,40,.18), transparent 26%), radial-gradient(circle at 82% 68%, rgba(90,65,40,.15), transparent 30%), radial-gradient(circle at 55% 15%, rgba(90,65,40,.12), transparent 22%), radial-gradient(circle at 30% 85%, rgba(90,65,40,.14), transparent 24%), linear-gradient(135deg, #ebd8af, #dfc99b 55%, #d4b882)", clipPath: TORN_CLIP, boxShadow: "inset 0 0 120px rgba(60,40,15,.5), inset 0 0 30px rgba(60,40,15,.4)", transform: "rotate(-1.4deg)" }} />
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-25" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, clipPath: TORN_CLIP, transform: "rotate(-1.4deg)" }} />
    </>
  );
}

function Pin() {
  return (
    <div className="absolute z-30 w-[22px] h-[22px] bg-green-500 shadow-lg" style={{ top: -12, left: "50%", borderRadius: "50% 50% 50% 0", transform: "translateX(-50%) rotate(-45deg)" }}>
      <div className="absolute w-3 h-3 rounded-full bg-[#0c0c0c]" style={{ top: 5, left: 6 }} />
    </div>
  );
}

function WaxSeal({ count, total }) {
  return (
    <div className="absolute top-[6%] right-[5%] z-30 w-[60px] h-[60px] rounded-full bg-green-500 border-[3px] border-dashed border-black/25 flex flex-col items-center justify-center shadow-xl rotate-[12deg]">
      <span className="text-black text-xl leading-none font-cartoon">{count}</span>
      <span className="text-black text-[6px] uppercase font-bold font-cartoon tracking-wide">/ {total} lieux</span>
    </div>
  );
}

// ============================================================
// DESSINS ET ICÔNES DE LA CARTE AU TRÉSOR (ÉPIQUE)
// ============================================================
function MapDoodles({ isMobile }) {
  if (isMobile) {
    return (
      <div className="absolute inset-0 pointer-events-none z-[4] text-[#3f2d1c] opacity-60">
        <Waves className="absolute w-16 h-16 top-[6%] left-[55%]" strokeWidth={2} />
        <Skull className="absolute w-20 h-20 top-[18%] left-[2%] rotate-12" strokeWidth={2} />
        <Anchor className="absolute w-16 h-16 top-[30%] left-[75%] rotate-12" strokeWidth={2} />
        <Mountain className="absolute w-14 h-14 top-[82%] left-[35%]" strokeWidth={1.5} />

        {/* Le Coffre (Mobile) */}
        <svg className="absolute w-24 h-24 drop-shadow-xl z-10" style={{ top: '55%', left: '45%', transform: 'translate(-50%, -50%) rotate(-5deg)' }} viewBox="0 0 64 64" fill="none" stroke="#3f2d1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="32" cy="14" r="3" fill="#eab308" stroke="#3f2d1c" />
          <circle cx="25" cy="16" r="2.5" fill="#eab308" stroke="#3f2d1c" />
          <circle cx="39" cy="16" r="2.5" fill="#eab308" stroke="#3f2d1c" />
          <path d="M29 11l3-3 3 3-3 3z" fill="#eab308" stroke="#3f2d1c" strokeWidth="1.5" />
          <path d="M12 30v20c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V30" fill="#dfc99b" fillOpacity="0.6" />
          <path d="M10 24h44v8H10z" fill="#b08d57" />
          <path d="M12 32h40v20H12z" />
          <line x1="12" y1="38" x2="52" y2="38" strokeWidth="1.5" opacity="0.7" />
          <line x1="12" y1="46" x2="52" y2="46" strokeWidth="1.5" opacity="0.7" />
          <path d="M20 32v20M44 32v20" strokeWidth="3" strokeLinecap="square" />
          <path d="M10 24c0-10 7-14 22-14s22 4 22 14" fill="#ebd8af" fillOpacity="0.8" />
          <path d="M10 24c0-10 7-14 22-14s22 4 22 14" strokeWidth="2.5" />
          <path d="M32 10v22" strokeWidth="3" />
          <rect x="27" y="22" width="10" height="12" rx="2" fill="#3f2d1c" />
          <circle cx="32" cy="27" r="2" fill="#ebd8af" />
          <path d="M32 29v3" stroke="#ebd8af" strokeWidth="1.5" />
        </svg>

        {/* Le grand X final */}
        <div className="absolute font-cartoon text-red-700/80 text-[6rem] font-black drop-shadow-sm -translate-x-1/2 -translate-y-1/2 rotate-12" style={{ top: '75%', left: '70%' }}>X</div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-[4] text-[#3f2d1c] opacity-65">
      <Mountain className="absolute w-36 h-36 bottom-[6%] left-[10%]" strokeWidth={1.5} />
      <TreePine className="absolute w-16 h-16 bottom-[12%] left-[55%]" strokeWidth={1.5} />
      <TreePine className="absolute w-12 h-12 bottom-[18%] left-[62%]" strokeWidth={1.5} />
      
      <Waves className="absolute w-20 h-20 top-[8%] left-[24%] opacity-70" strokeWidth={2} />
      <Anchor className="absolute w-18 h-18 bottom-[31%] left-[82%] -rotate-12 opacity-70" strokeWidth={2} />
      
      <svg className="absolute w-28 h-28 drop-shadow-sm" style={{ top: '10%', left: '48%', transform: 'translate(-50%, -50%) rotate(-5deg)' }} viewBox="0 0 64 64" fill="none" stroke="#3f2d1c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 42 Q 32 50 50 42 L 46 52 Q 32 58 18 52 Z" fill="#b08d57" fillOpacity="0.8" />
        <line x1="26" y1="44" x2="26" y2="12" strokeWidth="2.5" />
        <line x1="42" y1="46" x2="42" y2="20" strokeWidth="2.5" />
        <path d="M26 12 Q 38 22 26 36 Z" fill="#ebd8af" fillOpacity="0.9" />
        <path d="M42 20 Q 52 28 42 40 Z" fill="#ebd8af" fillOpacity="0.9" />
        <path d="M8 42 L 56 42" strokeWidth="2" />
        <path d="M10 52 Q 15 48 25 52 T 45 52 T 55 52" stroke="#3f2d1c" strokeWidth="1.5" />
      </svg>

      {/* Épées Croisées Perfectionnées */}
      <svg className="absolute w-24 h-24 drop-shadow-sm" style={{ top: '40%', left: '15%', transform: 'translate(-50%, -50%) rotate(12deg)' }} viewBox="0 0 64 64" fill="none" stroke="#3f2d1c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <g>
          <circle cx="12" cy="52" r="2.5" fill="#3f2d1c" />
          <path d="M 12 52 L 18 46" strokeWidth="2.5" />
          <path d="M 16 50 C 13 46, 15 42, 22 42 C 22 44, 20 48, 16 50 Z" fill="#b08d57" strokeWidth="1.2" />
          <path d="M 21 43 Q 32 30, 52 12 C 42 22, 30 35, 19 41 Z" fill="#ebd8af" fillOpacity="0.7" strokeWidth="1.8" />
          <path d="M 21 42 Q 32 30, 52 12" strokeWidth="1" strokeDasharray="1 1" opacity="0.6" />
        </g>
        <g>
          <circle cx="12" cy="12" r="2.5" fill="#3f2d1c" />
          <path d="M 12 12 L 18 18" strokeWidth="2.5" />
          <path d="M 16 14 C 13 18, 15 22, 22 22 C 22 20, 20 16, 16 14 Z" fill="#b08d57" strokeWidth="1.2" />
          <path d="M 21 21 Q 32 34, 52 52 C 42 42, 30 29, 19 23 Z" fill="#ebd8af" fillOpacity="0.7" strokeWidth="1.8" />
          <path d="M 21 22 Q 32 34, 52 52" strokeWidth="1" strokeDasharray="1 1" opacity="0.6" />
        </g>
      </svg>

      {/* Kraken Perfectionné */}
      <svg className="absolute w-32 h-32 drop-shadow-md" style={{ top: '25%', left: '85%', transform: 'translate(-50%, -50%)' }} viewBox="0 0 64 64" fill="none" stroke="#3f2d1c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 18 54 Q 10 32, 22 18 Q 30 8, 42 12 Q 48 15, 42 22 Q 34 26, 28 32 Q 22 40, 26 54 Z" fill="#b08d57" fillOpacity="0.5" />
        <circle cx="20" cy="30" r="1.5" fill="#3f2d1c" />
        <circle cx="25" cy="22" r="1.5" fill="#3f2d1c" />
        <circle cx="32" cy="16" r="1.5" fill="#3f2d1c" />
        <circle cx="39" cy="16" r="1.2" fill="#3f2d1c" />
        <path d="M 8 54 Q 2 40, 10 30 Q 16 22, 12 16 Q 8 22, 4 34 Q 2 44, 12 54 Z" fill="#a67c52" fillOpacity="0.4" />
        <path d="M 34 54 Q 40 42, 52 38 Q 60 36, 56 30 Q 48 32, 42 40 Q 36 46, 38 54 Z" fill="#a67c52" fillOpacity="0.4" />
        <circle cx="48" cy="37" r="1.2" fill="#3f2d1c" />
        <circle cx="43" cy="42" r="1.2" fill="#3f2d1c" />
        <path d="M 2 54 Q 10 50, 18 54 T 34 54 T 50 54 T 62 54" strokeWidth="2" />
        <path d="M 6 58 Q 14 55, 22 58 T 38 58 T 54 58" strokeWidth="1" opacity="0.6" />
      </svg>

      {/* Le Coffre au Trésor Géant */}
      <svg className="absolute w-36 h-36 -rotate-12 drop-shadow-2xl z-10 pointer-events-none" style={{ top: '48%', left: '52%', transform: 'translate(-50%, -50%) rotate(-8deg)' }} viewBox="0 0 64 64" fill="none" stroke="#3f2d1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="14" r="3" fill="#eab308" stroke="#3f2d1c" />
        <circle cx="25" cy="16" r="2.5" fill="#eab308" stroke="#3f2d1c" />
        <circle cx="39" cy="16" r="2.5" fill="#eab308" stroke="#3f2d1c" />
        <path d="M29 11l3-3 3 3-3 3z" fill="#eab308" stroke="#3f2d1c" strokeWidth="1.5" />
        <path d="M12 30v20c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V30" fill="#dfc99b" fillOpacity="0.6" />
        <path d="M10 24h44v8H10z" fill="#b08d57" />
        <path d="M12 32h40v20H12z" />
        <line x1="12" y1="38" x2="52" y2="38" strokeWidth="1.5" opacity="0.7" />
        <line x1="12" y1="46" x2="52" y2="46" strokeWidth="1.5" opacity="0.7" />
        <path d="M20 32v20M44 32v20" strokeWidth="3" strokeLinecap="square" />
        <path d="M10 24c0-10 7-14 22-14s22 4 22 14" fill="#ebd8af" fillOpacity="0.8" />
        <path d="M10 24c0-10 7-14 22-14s22 4 22 14" strokeWidth="2.5" />
        <path d="M32 10v22" strokeWidth="3" />
        <rect x="27" y="22" width="10" height="12" rx="2" fill="#3f2d1c" />
        <circle cx="32" cy="27" r="2" fill="#ebd8af" />
        <path d="M32 29v3" stroke="#ebd8af" strokeWidth="1.5" />
        <circle cx="16" cy="28" r="1.2" fill="#3f2d1c" />
        <circle cx="48" cy="28" r="1.2" fill="#3f2d1c" />
        <circle cx="16" cy="42" r="1.2" fill="#3f2d1c" />
        <circle cx="48" cy="42" r="1.2" fill="#3f2d1c" />
      </svg>

      {/* Le Trésor "X" Final */}
      <div className="absolute font-cartoon text-red-700/80 text-[8rem] font-black drop-shadow-sm -translate-x-1/2 -translate-y-1/2 -rotate-12" style={{ top: '60%', left: '25%' }}>X</div>
    </div>
  );
}

// ============================================================
// MARQUEUR D'ÉTAPE ET PANNEAU
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
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[3px] border-[#3f2d1c] flex items-center justify-center font-cartoon text-xl sm:text-2xl shadow-xl cursor-pointer"
      >
        {step.id}
      </motion.div>

      <p className="mt-1 font-cartoon text-[11px] sm:text-[13px] uppercase tracking-wide text-[#3f2d1c] text-center max-w-[100px] sm:max-w-[110px] mx-auto font-bold">
        {step.title}
      </p>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            style={isMobile ? getMobilePanelStyle(step.mx, step.my) : getDesktopPanelStyle(step.x, step.y)}
            className="absolute z-50 min-h-[170px] flex flex-col items-start justify-start pt-3 pb-5 px-5 bg-[#0c0c0c] rounded-lg shadow-2xl pointer-events-auto cursor-default"
            onClick={(e) => isMobile && e.stopPropagation()} 
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
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
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
// LOGIQUE DE COURBES EN VAGUE (S-CURVES) AU LIEU DE LIGNES DIRECTES
// ============================================================
const generateWavyPath = (steps, isMobile) => {
  if (steps.length === 0) return "";
  let path = `M ${isMobile ? steps[0].mx : steps[0].x} ${isMobile ? steps[0].my : steps[0].y}`;
  
  for (let i = 0; i < steps.length - 1; i++) {
    const p1 = { x: isMobile ? steps[i].mx : steps[i].x, y: isMobile ? steps[i].my : steps[i].y };
    const p2 = { x: isMobile ? steps[i+1].mx : steps[i+1].x, y: isMobile ? steps[i+1].my : steps[i+1].y };
    
    // Distance entre les points
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Vecteur perpendiculaire pour créer la "vague" (décalage)
    const nx = -dy / dist;
    const ny = dx / dist;
    
    // Alterner la direction pour chaque segment pour que ce soit organique (S-curve)
    const dir = i % 2 === 0 ? 1 : -1;
    const curve = dist * 0.35; // Intensité de la vague proportionnelle à la distance
    
    // Calcul de points de contrôle de courbe de bézier en forme de 'S' (comme sur l'image)
    const cp1x = p1.x + dx * 0.3 + nx * curve * dir;
    const cp1y = p1.y + dy * 0.3 + ny * curve * dir;
    
    const cp2x = p2.x - dx * 0.3 - nx * curve * dir;
    const cp2y = p2.y - dy * 0.3 - ny * curve * dir;
    
    path += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x},${p2.y}`;
  }
  return path;
};

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

  // Appel de notre nouvelle fonction au lieu du simple join
  const routeDesktop = generateWavyPath(evolutionSteps, false);
  const routeMobile = generateWavyPath(evolutionSteps, true);

  return (
    <div ref={sectionRef} className="relative w-full h-[100dvh] bg-[#080808] font-cartoon text-white overflow-hidden select-none">
      <AnimatePresence>
        {showOverlay && <EvolutionIntroOverlay key="intro-evolution" startAnimation={isInView} />}
      </AnimatePresence>

      <BackgroundGrid />

      {/* ============================================================
          ================  VERSION DESKTOP (>= lg)  ================
          ============================================================ */}
      <div className="hidden lg:flex relative z-10 w-full h-full flex-row py-12 pl-3 pr-12 gap-10">
        <div className="relative flex-[0.34] h-full flex flex-col justify-end pb-12">
          <GiantTitle isVisible={!showOverlay} className="text-[7.5vw] mb-4">
            MON<br /><span className="bg-green-500 text-black px-1">ÉVOLUTION</span>
          </GiantTitle>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }} transition={{ duration: 0.4, delay: 0.4 }} className="font-cartoon text-xl text-white/80 leading-relaxed max-w-[95%] uppercase space-y-4">
            <p>
              Chaque étape ici raconte une partie de 
              <Highlight className="text-[1.1em]">mon apprentissage</Highlight>. 
              Des premières lignes de code aux architectures complexes — une véritable carte de mon 
              <Highlight className="text-[1.1em]">parcours technique</Highlight>, 
              à explorer lieu par lieu.
            </p>
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

            {/* TRACÉ DESKTOP : Transformation en 'path' avec le nouveau 'd' pour la courbure ------- */}
            <svg className="absolute inset-0 w-full h-full z-[6] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path 
                d={routeDesktop} 
                fill="none" 
                stroke="#3f2d1c" 
                strokeOpacity="0.6" 
                strokeWidth="4" 
                strokeDasharray="12 12" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                vectorEffect="non-scaling-stroke" 
              />
            </svg>

            {evolutionSteps.map((step) => (
              <StepMarker key={step.id} step={step} isMobile={false} isActive={activeDesktop === step.id} onEnter={() => { setActiveDesktop(step.id); markDiscovered(step.id); }} onLeave={() => setActiveDesktop(null)} />
            ))}

            <WaxSeal count={discovered.size} total={evolutionSteps.length} />
          </motion.div>
        </div>
      </div>

      {/* ============================================================
          ================  VERSION MOBILE (< lg)  ===================
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

            {/* TRACÉ MOBILE : Transformation en 'path' avec courbure ____ */}
            <svg className="absolute inset-0 w-full h-full z-[6] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path 
                d={routeMobile} 
                fill="none" 
                stroke="#3f2d1c" 
                strokeOpacity="0.6" 
                strokeWidth="4" 
                strokeDasharray="12 12"
                strokeLinecap="round" 
                strokeLinejoin="round" 
                vectorEffect="non-scaling-stroke" 
              />
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