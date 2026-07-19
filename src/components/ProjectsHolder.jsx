import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PencilRuler, ArrowLeft, ArrowUpRight } from "lucide-react";
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
// `altAccent` sur MyNewLife = la carte "vibe" mobile alterne entre
// les deux couleurs (3s / 3s) tant qu'elle affiche ce projet.
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
    link: "https://my-new-life-blond.vercel.app/", font: "'Lobster', cursive",
    accent: "#365314", altAccent: "#6b21a8", titleColor: "#fff",
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
// OVERLAY D'INTRODUCTION — thème rouge, icône PencilRuler (plan /
// conception) à la place du "?" — noir, minimaliste, dans le thème.
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
                  <motion.div
                    initial={{ scale: 0.2, opacity: 0, rotate: -15 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 11, delay: (i % 10) * 0.02 }}
                  >
                    <PencilRuler className="w-9 h-9 md:w-14 md:h-14 text-black" strokeWidth={2.2} />
                  </motion.div>
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
// VIBE CARD — mobile : une carte à la fois, couleur + font du
// projet affiché, pour recréer son ambiance. Change toutes les 6s
// (le composant parent gère la rotation), transition douce.
// ============================================================
function VibeCard({ project, colorPhase }) {
  const bg = project.altAccent && colorPhase === 1 ? project.altAccent : project.accent;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${project.id}-${colorPhase}`}
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.96 }}
        transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
        style={{ backgroundColor: bg }}
        className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-5 text-center shadow-2xl"
      >
        <div className="w-14 h-14 bg-white rounded-lg p-2 shadow-lg mb-3 flex-shrink-0">
          <img src={project.logo} className="w-full h-full object-contain" alt="" loading="lazy" />
        </div>
        <h3
          className="text-2xl leading-none font-black mb-2"
          style={{ fontFamily: project.font, color: project.titleColor }}
        >
          {project.title}
        </h3>
        <p className="text-white/90 text-xs leading-snug px-2 line-clamp-3">{project.desc}</p>
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================================
// GALERIE DÉTAIL PLEIN ÉCRAN — swipe/scroll horizontal, un projet
// par écran, vidéo montée seulement pour l'écran actif, bouton
// retour en haut.
// ============================================================
function ProjectDetailGallery({ startIndex = 0, onClose }) {
  const scrollRef = useRef(null);
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    if (scrollRef.current) {
      const w = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({ left: startIndex * w, behavior: "auto" });
    }
  }, [startIndex]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.clientWidth;
    const idx = Math.round(scrollRef.current.scrollLeft / w);
    setCurrent(idx);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black"
    >
      <button
        onClick={onClose}
        className="absolute top-4 left-4 z-30 flex items-center gap-1.5 bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-3 py-2 text-white text-xs font-cartoon uppercase tracking-wide"
      >
        <ArrowLeft size={14} /> Retour
      </button>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {projects.map((project, idx) => (
          <div key={project.id} className="relative w-full h-full flex-shrink-0 snap-center">
            <img
              src={project.posterM || project.poster}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              alt={project.title}
            />
            {idx === current && (project.videoM || project.video) && (
              <video
                key={project.id}
                src={project.videoM || project.video}
                autoPlay muted loop playsInline preload="none"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />
            <div className="absolute bottom-8 left-0 right-0 px-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg p-1.5 shadow-lg flex-shrink-0">
                <img src={project.logo} className="w-full h-full object-contain" alt="" />
              </div>
              <div className="min-w-0">
                <h3 className="text-white text-2xl font-cartoon uppercase leading-none truncate">{project.title}</h3>
                <p className="text-white/70 text-[11px] mt-1 truncate">{project.tech}</p>
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="ml-auto flex-shrink-0 inline-flex items-center gap-1 bg-white text-black px-3 py-2 rounded text-[10px] font-black uppercase"
              >
                Voir <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-20">
        {projects.map((_, idx) => (
          <span key={idx} className={`w-1.5 h-1.5 rounded-full ${idx === current ? "bg-red-500" : "bg-white/30"}`} />
        ))}
      </div>
    </motion.div>
  );
}

export default function ProjectsHolder() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [showOverlay, setShowOverlay] = useState(true);
  const [activeProj, setActiveProj] = useState(0);
  const [colorPhase, setColorPhase] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowOverlay(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Rotation principale de la vibe card : un projet toutes les 6s
  useEffect(() => {
    const mainTimer = setInterval(() => {
      setActiveProj((i) => (i + 1) % projects.length);
      setColorPhase(0);
    }, 6000);
    return () => clearInterval(mainTimer);
  }, []);

  // Si le projet affiché a 2 couleurs, on alterne toutes les 3s
  useEffect(() => {
    const project = projects[activeProj];
    if (!project.altAccent) return;
    const colorTimer = setInterval(() => setColorPhase((p) => (p + 1) % 2), 3000);
    return () => clearInterval(colorTimer);
  }, [activeProj]);

  const totalRows = Math.ceil(projects.length / 2);

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

        {/* Gauche — titre impressionnant + meilleure intro */}
        <div className="relative flex-[0.34] h-full flex flex-col justify-center z-10">
          <GiantTitle isVisible={!showOverlay} className="text-[8vw] xl:text-[6.5vw] mb-4">
            MES
            <br />
            <span className="text-red-500">PROJETS</span>
          </GiantTitle>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="relative z-10 text-base xl:text-[1.25vw] text-white/80 leading-relaxed max-w-[92%] normal-case"
          >
            Chaque projet est pensé de bout en bout : une conception réfléchie, une architecture solide et une attention portée à chaque détail, du premier wireframe jusqu'à la mise en ligne.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="relative z-10 mt-4 font-cartoon text-sm xl:text-[1.1vw] text-red-400 border-l-2 border-red-500 pl-3 normal-case leading-snug"
          >
            ⚠ Render peut mettre quelques secondes à démarrer (cold start) — patiente un instant si la page met du temps à charger.
          </motion.p>
        </div>

        {/* Droite — grille 2 colonnes, cartes larges (format "Unicheck") */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={!showOverlay ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative flex-[0.66] h-full grid grid-cols-2 gap-4 z-10"
          style={{ gridTemplateRows: `repeat(${totalRows}, 1fr)` }}
        >
          {projects.map((project, idx) => {
            const row = Math.floor(idx / 2);
            const isLastItemAlone = idx === projects.length - 1 && projects.length % 2 !== 0;
            return (
              <ProjectCard
                key={project.id}
                project={project}
                className={isLastItemAlone ? "col-span-2" : ""}
                dropUp={row === totalRows - 1}
              />
            );
          })}
        </motion.div>
      </section>

      {/* ============================================================
          MOBILE / TABLETTE (< md)
          Haut : titre géant à gauche façon "Moundir" dans About.
          Bas : une seule vibe-card qui tourne toutes les 6s, puis un
          bouton "Voir détail" qui ouvre la galerie plein écran.
          ============================================================ */}
      <section className="flex md:hidden relative w-full h-[100dvh] bg-[#080808] overflow-hidden font-cartoon text-white flex-col px-4 py-3 gap-2">
        <AnimatePresence>
          {showOverlay && <IntroOverlay key="intro-mobile" startAnimation={isInView} />}
        </AnimatePresence>
        <BackgroundGrid />

        {/* Haut — même placement que Moundir dans About : petit mot, puis géant, aligné à gauche */}
        <div className="relative flex-shrink-0 flex flex-col items-start z-10 pt-8 pb-2">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="relative z-10 text-[4.5vw] sm:text-[3vw] uppercase tracking-wide text-white/70"
          >
            Mes
          </motion.p>
          <GiantTitle isVisible={!showOverlay} className="text-[16vw] sm:text-[11vw] mb-2 text-red-500">
            PROJETS
          </GiantTitle>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="relative z-10 text-[3.6vw] sm:text-[2.6vw] text-white/80 leading-snug normal-case max-w-[95%]"
          >
            Chaque projet est pensé de bout en bout : une conception réfléchie, une architecture solide et une attention portée à chaque détail.
          </motion.p>
        </div>

        {/* Bas — vibe card qui tourne + bouton Voir détail */}
        <div className="relative flex-1 min-h-0 flex flex-col z-10 pb-3 pt-2 gap-3">
          <div className="relative flex-1 min-h-0">
            <VibeCard project={projects[activeProj]} colorPhase={colorPhase} />
          </div>
          <button
            onClick={() => setGalleryOpen(true)}
            className="flex-shrink-0 self-center font-cartoon uppercase tracking-wide text-sm bg-red-500 text-white px-6 py-2.5 rounded-full shadow-lg"
          >
            Voir Détail
          </button>
        </div>
      </section>

      <AnimatePresence>
        {galleryOpen && (
          <ProjectDetailGallery startIndex={activeProj} onClose={() => setGalleryOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}