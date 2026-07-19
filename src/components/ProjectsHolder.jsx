import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./ProjectCard";

// --- IMPORTS ASSETS (identiques à l'existant) ---
import logo1 from "../assets/logo1.jpg";
import back1 from "../assets/back1.jpg";
import back1Vid from "../assets/back1.mp4";
import phone1 from "../assets/phone1.jpg";
import phone1Vid from "../assets/phone1.mp4";

import logo2 from "../assets/logo2.png";
import back2 from "../assets/back2.jpg";
import back2Vid from "../assets/back2.mp4";
import phone2 from "../assets/phone2.jpg";
import phone2Vid from "../assets/phone2.mp4";

import logo3 from "../assets/logo.png";
import backve from "../assets/back.jpg";
import backveVid from "../assets/backve.mp4";
import phoneve from "../assets/phoneve.jpg";
import phoneveVid from "../assets/phoneve.mp4";

import back41 from "../assets/back4-1.jpg";
import logo4 from "../assets/logo4.png";
import back4Vid from "../assets/back4.mp4";

import logo14 from "../assets/logo14.png";
import back14 from "../assets/back14.jpg";
import phone14 from "../assets/phone14.jpg";
import back14Vid from "../assets/back14.mp4";
import phone14Vid from "../assets/phone14.mp4";

// ============================================================
// DONNÉES PROJETS
// NOTE : j'ai simplifié le double-mode violet/vert de MyNewLife
// et MyNewStyle (cycle automatique toutes les 5s) — avec le nouveau
// système hover/tap + vidéo réelle, ce gimmick de couleur n'a plus
// vraiment sa place. Dis-moi si tu veux que je le réintègre autrement.
// ============================================================
const projects = [
  {
    id: "01", title: "MaResturant", tech: "React / Node.js / MongoDB",
    desc: "Portail gastronomique haut de gamme, parcours immersif et accents rouges.",
    link: "https://ma-resturant.vercel.app/", font: "cursive", accent: "#b91c1c", titleColor: "#fff",
    logo: logo1, poster: back1, video: back1Vid, posterM: phone1, videoM: phone1Vid,
  },
  {
    id: "02", title: "RecommandIT", tech: "Python / Node.js / React / MongoDB",
    desc: "Moteur de recommandation de films basé sur le machine learning, interface épurée.",
    link: "https://recommand-it.vercel.app/", font: "'Parisienne', cursive", accent: "#1e293b", titleColor: "#fff",
    logo: logo2, poster: back2, video: back2Vid, posterM: phone2, videoM: phone2Vid,
  },
  {
    id: "03", title: "MyNewLife", tech: "Fullstack / React / Node.js / MongoDB",
    desc: "Organisation numérique et gestion de vie au quotidien pour un futur plus serein.",
    link: "https://my-new-life-blond.vercel.app/", font: "'Lobster', cursive", accent: "#365314", titleColor: "#fff",
    logo: logo3, poster: backve, video: backveVid, posterM: phoneve, videoM: phoneveVid,
  },
  {
    id: "04", title: "MyNewStyle", tech: "Next.js / Tailwind / Framer Motion",
    desc: "Interface tech durable explorant des transitions fluides entre univers organiques.",
    link: "#", font: "cursive", accent: "#22c55e", titleColor: "#fff",
    logo: logo4, poster: back41, video: back4Vid, posterM: back41, videoM: null,
  },
  {
    id: "05", title: "Unicheck", tech: "React / Tailwind / Spring Boot / PostgreSQL",
    desc: "Présence académique par QR dynamique et vérification GPS, contrôle admin centralisé.",
    link: "https://unicheck-drab.vercel.app", font: "'Manrope', sans-serif", accent: "#022017", titleColor: "#fff",
    logo: logo14, poster: back14, video: back14Vid, posterM: phone14, videoM: phone14Vid,
  },
];

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

// ============================================================
// OVERLAY D'INTRODUCTION — même mécanique que About, thème ROUGE.
// Le "?" est remplacé par 🚀 (référence directe aux projets/sites
// lancés), comme demandé.
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
    "Mes projets ?", "My Projects?", "Mis Proyectos?", "مشاريعي ؟", "Meine Projekte?", "I Miei Progetti?",
    "Mes projets ?", "My Projects?",
  ];

  return (
    <motion.div
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="absolute inset-0 z-50 bg-[#080808] overflow-hidden flex items-center justify-center pointer-events-none"
    >
      <div className="absolute w-[200vw] h-[200vh] flex flex-wrap gap-5 md:gap-7 justify-center content-center rotate-[-35deg]">
        {Array.from({ length: 130 }).map((_, i) => {
          const hasText = i % 4 === 0;
          const stacked = i % 6 === 0;
          return (
            <div key={i} className="relative w-24 h-24 md:w-36 md:h-36">
              {stacked && phase >= 1 && (
                <div
                  className={`absolute -bottom-3 -right-3 w-full h-full rounded-xl border-2 transition-all duration-300 ${
                    phase === 1 ? "border-red-400/25 border-dashed" : "border-red-400/60 bg-red-500/30"
                  }`}
                />
              )}
              <div
                className={`relative w-full h-full flex items-center justify-center rounded-xl border-2 transition-all duration-300 ${
                  phase === 0
                    ? "border-transparent bg-transparent"
                    : phase === 1
                    ? "border-red-400/50 border-dashed bg-transparent"
                    : "border-red-500 border-solid bg-red-500"
                }`}
              >
                {phase === 1 && (
                  <span
                    className={`font-black text-center leading-tight px-1.5 text-lg md:text-2xl transition-opacity duration-300 text-white ${
                      hasText ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {phrases[i % phrases.length]}
                  </span>
                )}
                {phase === 2 && (
                  <motion.span
                    initial={{ scale: 0.2, opacity: 0, rotate: -15 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 11, delay: (i % 10) * 0.02 }}
                    className="text-4xl md:text-6xl"
                  >
                    🚀
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
// FAN MOBILE — positions façon éventail de cartes à jouer
// ============================================================
const fanVariants = {
  front: { x: "0%", rotate: 0, scale: 1, opacity: 1, zIndex: 30 },
  right: { x: "62%", rotate: 12, scale: 0.86, opacity: 0.55, zIndex: 20 },
  left: { x: "-62%", rotate: -12, scale: 0.86, opacity: 0.55, zIndex: 20 },
  hidden: { x: "0%", rotate: 0, scale: 0.7, opacity: 0, zIndex: 0 },
};

function getFanPosition(idx, front, count) {
  const rel = (idx - front + count) % count;
  if (rel === 0) return "front";
  if (rel === 1) return "right";
  if (rel === count - 1) return "left";
  return "hidden";
}

export default function ProjectsHolder() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [showOverlay, setShowOverlay] = useState(true);
  const [front, setFront] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowOverlay(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const shift = (dir) => setFront((f) => (f + dir + projects.length) % projects.length);

  return (
    <div ref={sectionRef} className="w-full h-full relative">
      {/* ============================================================
          DESKTOP (>= md)
          ============================================================ */}
      <section className="hidden md:flex relative w-full h-screen bg-[#080808] overflow-hidden font-cartoon text-white flex-row px-6 py-6 gap-6">
        <AnimatePresence>
          {showOverlay && <IntroOverlay key="intro" startAnimation={isInView} />}
        </AnimatePresence>
        <BackgroundGrid />

        {/* Gauche — titre géant + intro */}
        <div className="relative flex-[0.32] h-full flex flex-col justify-center z-10">
          <GiantTitle isVisible={!showOverlay} className="text-[6vw] xl:text-[5vw] mb-4">
            MES
            <br />
            <span className="text-red-500">PROJETS</span>
          </GiantTitle>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="relative z-10 text-sm xl:text-[1vw] text-white/70 leading-relaxed max-w-[90%] normal-case"
          >
            5 sites actuellement en ligne, déployés via Render et Vercel — n'hésite pas à cliquer pour les visiter.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="relative z-10 mt-3 text-[10px] xl:text-[0.75vw] font-mono text-red-400 border-l-2 border-red-500 pl-2 normal-case"
          >
            ⚠ Render peut mettre quelques secondes à démarrer (cold start) — patiente un instant si la page met du temps à charger.
          </motion.p>
        </div>

        {/* Droite — grille 3x2, la dernière carte comble la case vide */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={!showOverlay ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative flex-[0.68] h-full grid grid-cols-3 grid-rows-2 gap-3 z-10"
        >
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              variant="desktop"
              className={idx === projects.length - 1 ? "col-span-2" : ""}
            />
          ))}
        </motion.div>
      </section>

      {/* ============================================================
          MOBILE / TABLETTE (< md)
          ============================================================ */}
      <section className="flex md:hidden relative w-full h-[100dvh] bg-[#080808] overflow-hidden font-cartoon text-white flex-col px-4 py-4 gap-2">
        <AnimatePresence>
          {showOverlay && <IntroOverlay key="intro-mobile" startAnimation={isInView} />}
        </AnimatePresence>
        <BackgroundGrid />

        {/* Haut */}
        <div className="relative flex-shrink-0 flex flex-col items-center text-center z-10 pt-6 pb-2">
          <GiantTitle isVisible={!showOverlay} className="text-[13vw] sm:text-[10vw] md:text-[7.5vw]">
            MES <span className="text-red-500">PROJETS</span>
          </GiantTitle>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="relative z-10 mt-2 text-[3.2vw] sm:text-[2.2vw] md:text-[1.6vw] text-white/70 normal-case"
          >
            5 sites en ligne via Render & Vercel.
          </motion.p>
        </div>

        {/* Fan de cartes */}
        <div className="relative flex-1 min-h-0 flex items-center justify-center z-10">
          <button
            onClick={() => shift(-1)}
            aria-label="Projet précédent"
            className="absolute left-1 z-40 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="relative w-[70%] max-w-[280px] aspect-[4/5]">
            {projects.map((project, idx) => {
              const pos = getFanPosition(idx, front, projects.length);
              return (
                <motion.div
                  key={project.id}
                  initial={false}
                  animate={fanVariants[pos]}
                  transition={{ type: "spring", stiffness: 220, damping: 26 }}
                  className="absolute inset-0"
                  style={{ pointerEvents: pos === "front" ? "auto" : "none" }}
                >
                  <ProjectCard project={project} variant="mobile" active={pos === "front"} />
                </motion.div>
              );
            })}
          </div>

          <button
            onClick={() => shift(1)}
            aria-label="Projet suivant"
            className="absolute right-1 z-40 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Dots */}
        <div className="relative flex-shrink-0 flex justify-center gap-1.5 pb-3 z-10">
          {projects.map((_, idx) => (
            <span
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === front ? "bg-red-500" : "bg-white/20"}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}