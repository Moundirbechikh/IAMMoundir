// components/ProjectsHolder.jsx
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ProjectCard from "./ProjectCard";

// --- IMPORTS ASSETS ---
import logo1 from "../assets/logo1.jpg";
import back1 from "../assets/back1.jpg";
import back1Vid from "../assets/back1.mp4";

import logo2 from "../assets/logo2.png";
import back2 from "../assets/back2.jpg";
import back2Vid from "../assets/back2.mp4";

import logo3 from "../assets/logo.png";
import backve from "../assets/back.jpg";
import backv from "../assets/backv.jpg";
import backveVid from "../assets/backve.mp4";
import backvVid from "../assets/backv.mp4";

import back41 from "../assets/seenIT.jpg";
import logo4 from "../assets/logoSeenIt.png";
import back4Vid from "../assets/seenIT1.mp4";

import seenIT1 from "../assets/seenIT.jpg";
import seenIT2 from "../assets/seenIT1.jpg";
import seenIT2Vid from "../assets/seenIT1.mp4";
import seenIT3 from "../assets/seenIT2.jpg";
import seenIT3Vid from "../assets/seenIT2.mp4";
import seenIT4 from "../assets/seenIT3.jpg";
import seenIT4Vid from "../assets/seenIT3.mp4";
import seenIT5 from "../assets/seenIT4.jpg";
import seenIT5Vid from "../assets/seenIT4.mp4";
import seenIT6 from "../assets/seenIT5.jpg";
import seenIT6Vid from "../assets/seenIT5.mp4";

import logo14 from "../assets/logo14.png";
import back14 from "../assets/back14.jpg";
import back14Vid from "../assets/back14.mp4";

import phone2 from "../assets/phone2.jpg";
import phone11 from "../assets/phone11.jpg";
import phone14 from "../assets/phone14.jpg";
import phonev from "../assets/phonev.jpg";
import phoneve from "../assets/phoneve.jpg";
import phoneve1 from "../assets/phoneve1.jpg";
import seenITphone from "../assets/seenITphone.jpg";

// --- IMAGES MOBILE SPÉCIFIQUES ---
// Les captures téléphone sont séparées des posters/vidéos desktop.

// Durée pendant laquelle le titre reste seul au milieu avant que la section s'affiche (en ms)
const INTRO_DURATION = 650;

const projects = [
  {
    id: "01", title: "MaResturant", tech: "React / Node.js / MongoDB",
    desc: "Portail gastronomique haut de gamme, parcours immersif et accents rouges.",
    link: "https://ma-resturant.vercel.app/", font: "cursive", accent: "#b91c1c", titleColor: "#fff",
    logo: logo1, poster: back1, video: back1Vid, phone: phone11,
  },
  {
    id: "02", title: "RecommandIT", tech: "Python / Node.js / React / MongoDB",
    desc: "Moteur de recommandation de films basé sur le machine learning, interface épurée.",
    link: "https://recommand-it.vercel.app/", font: "'Parisienne', cursive", accent: "#1e293b", titleColor: "#fff",
    logo: logo2, poster: back2, video: back2Vid, phone: phone2,
  },
  {
    id: "03", title: "MyNewLife", tech: "Fullstack / React / Node.js / MongoDB",
    desc: "Organisation numérique et gestion de vie au quotidien pour un futur plus serein.",
    link: "https://my-new-life-blond.vercel.app/", font: "'Lobster', cursive",
    accent: "#365314", altAccent: "#6b21a8", titleColor: "#fff",
    logo: logo3, poster: backve, video: backveVid, phone: phoneve,
    themes: [
      { id: "lime", accent: "#365314", titleColor: "#fff", poster: backve, video: backveVid, phone: phoneve },
      { id: "purple", accent: "#6b21a8", titleColor: "#fff", poster: backv, video: backvVid, phone: phoneve1 },
    ],
  },
  {
    id: "04", title: "SeenIt", tech: "React / Tailwind / MangoDB / Node.js",
    desc: "Plateforme de partage de films et archivage de visionnage, interface immersive et themes différents.",
    link: "https://seen-it-gamma.vercel.app/", font: "'Kaushan Script',cursive",
    accent: "#09090B", titleColor: "#E11D48",
    logo: logo4, poster: seenIT1, video: back4Vid, phone: seenITphone,
    themes: [
      { id: "crimson", accent: "#09090B", titleColor: "#E11D48", poster: back41, video: back4Vid },
      { id: "midnight", accent: "#0F172A", titleColor: "#F59E0B", poster: seenIT2, video: seenIT2Vid },
      { id: "matrix", accent: "#022C22", titleColor: "#10B981", poster: seenIT3, video: seenIT3Vid },
      { id: "noir", accent: "#0A0A0A", titleColor: "#F5F5F5", poster: seenIT4, video: seenIT4Vid },
      { id: "vintage", accent: "#292524", titleColor: "#D97706", poster: seenIT5, video: seenIT5Vid },
      { id: "iconic", accent: "#C9960C", titleColor: "#C9960C", poster: seenIT6, video: seenIT6Vid },
    ],
  },
  {
    id: "05", title: "Unicheck", tech: "React / Tailwind / Spring Boot / PostgreSQL",
    desc: "Présence académique par QR dynamique et vérification GPS, contrôle admin centralisé.",
    link: "https://unicheck-drab.vercel.app", font: "'Manrope', sans-serif", accent: "#022017", titleColor: "#fff",
    logo: logo14, poster: back14, video: back14Vid, phone: phone14,
  },
];

// Renvoie le thème actif d'un projet pour un "tour" (lap) donné.
// Le tour 0 démarre TOUJOURS sur le thème "crimson" s'il existe, sinon sur le premier thème.
// Ex: SeenIt -> crimson, midnight, matrix, noir, vintage, iconic, crimson...
// Ex: MyNewLife -> lime, purple, lime, purple...
function themeForLap(project, lap) {
  if (!project.themes || !project.themes.length) return null;
  const crimsonIdx = project.themes.findIndex((t) => t.id === "crimson");
  const start = crimsonIdx >= 0 ? crimsonIdx : 0;
  const idx = (start + lap) % project.themes.length;
  return project.themes[idx];
}

// ============================================================
// BACKGROUND GRID — OPTIMISÉ
// Avant : 160 <div> React montés en permanence (coûteux sur mobile,
// surtout multiplié par 6 sections qui restent toutes montées dans le DOM
// en parallèle, desktop + mobile en même temps).
// Après : un seul <div>, motif dessiné une fois en SVG et répété par le
// navigateur via background-image (aucun calcul JS/React, juste du
// compositing GPU). Rendu visuel identique (carrés pointillés rouges,
// rotation -35°), coût quasi nul.
// ============================================================
function BackgroundGrid() {
  return (
    <div
      className="absolute -inset-[60%] z-0 pointer-events-none rotate-[-35deg]
                 bg-[length:112px_112px] md:bg-[length:152px_152px]
                 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%27112%27%20height=%27112%27%3E%3Crect%20x=%278%27%20y=%278%27%20width=%2796%27%20height=%2796%27%20rx=%2712%27%20fill=%27none%27%20stroke=%27%23ef4444%27%20stroke-opacity=%270.1%27%20stroke-width=%272%27%20stroke-dasharray=%276%204%27/%3E%3C/svg%3E')]
                 md:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%27152%27%20height=%27152%27%3E%3Crect%20x=%2712%27%20y=%2712%27%20width=%27128%27%20height=%27128%27%20rx=%2716%27%20fill=%27none%27%20stroke=%27%23ef4444%27%20stroke-opacity=%270.1%27%20stroke-width=%272%27%20stroke-dasharray=%276%204%27/%3E%3C/svg%3E')]"
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

// ==========================================
// OVERLAY D'INTRO — MODIFIÉ
// Au début, il n'y a que le titre "MES PROJETS" au milieu de l'écran.
// C'est exactement le même titre que le GiantTitle (même police, mêmes tailles,
// même bloc rouge), sans rotation ni ombre :
//   - desktop : text-[8vw] (xl:text-[9vw]), PROJETS sans padding
//   - mobile  : text-[18vw] (sm:text-[12vw]), PROJETS avec px-2 pb-1
// ==========================================
function IntroOverlay({ startAnimation }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (startAnimation) {
      const show = setTimeout(() => setVisible(true), 60);
      return () => clearTimeout(show);
    }
  }, [startAnimation]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.92, y: 10 }}
        animate={visible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 10 }}
        transition={{ duration: 0.22, ease: [0.65, 0, 0.35, 1] }}
        className="font-cartoon uppercase text-white inline-block leading-[0.85]
                   text-[18vw] sm:text-[12vw] md:text-[8vw] xl:text-[12vw]"
      >
        MES
        <br />
        <span className="bg-red-500 text-black px-2 pb-1 md:px-0 md:pb-0">PROJETS</span>
      </motion.h2>
    </motion.div>
  );
}

// ==========================================
// BALAYAGE COULEUR (même logique que ColorSweep de la Navbar) — pour la VibeCard mobile
// ==========================================
function CardColorSweep({ targetColor }) {
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
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none z-0">
      <div className="absolute inset-0" style={{ backgroundColor: baseColor }} />
      {isSweeping && (
        <div className="absolute w-[300%] h-[300%] top-[-100%] left-[-100%] rotate-[-35deg] flex flex-col">
          <motion.div key={`${sweepKey}-1`} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.45, ease: "easeInOut" }} style={{ backgroundColor: targetColor }} className="w-full h-[25%] origin-top" />
          <motion.div key={`${sweepKey}-2`} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.45, ease: "easeInOut", delay: 0.12 }} style={{ backgroundColor: targetColor }} className="w-full h-[25%] origin-top" />
          <motion.div key={`${sweepKey}-3`} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.45, ease: "easeInOut", delay: 0.12 }} style={{ backgroundColor: targetColor }} className="w-full h-[25%] origin-bottom" />
          <motion.div key={`${sweepKey}-4`} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.45, ease: "easeInOut" }} onAnimationComplete={() => setBaseColor(targetColor)} style={{ backgroundColor: targetColor }} className="w-full h-[25%] origin-bottom" />
        </div>
      )}
    </div>
  );
}

// ==========================================
// VIBE CARD MOBILE — nouveau design (cadre + balayage couleur, logo+titre+desc)
// ==========================================
function VibeCard({ project, theme }) {
  const current = theme ? { ...project, ...theme } : project;
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/15 bg-black">
      <AnimatePresence mode="wait">
        <motion.img
          key={`${project.id}-${current.phone || project.phone}`}
          src={current.phone || project.phone}
          alt={project.title}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-4 pt-12 bg-gradient-to-t from-black/95 via-black/75 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg p-1.5 shadow-lg shrink-0">
            <img src={project.logo} className="w-full h-full object-contain" alt="" />
          </div>
          <div className="min-w-0">
            <h3
              className="text-xl sm:text-2xl leading-none truncate"
              style={{ fontFamily: project.font, color: current.titleColor }}
            >
              {project.title}
            </h3>
            <p className="mt-1 text-[10px] sm:text-xs text-white/90 line-clamp-2">{project.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// VUE DÉTAIL MOBILE — affichage en image uniquement, aucune vidéo
// ==========================================
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
      {/* Repositionné juste sous la pill de la navbar (top-3/left-3 côté mobile) */}
      <button
        onClick={() => onClose(current)}
        className="absolute top-14 left-3 z-50 flex items-center justify-center w-10 h-10 bg-[#ef4444] rounded-2xl shadow-lg border border-white/20 active:scale-90 transition-transform"
      >
        <ArrowLeft className="text-white" size={18} strokeWidth={3} />
      </button>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {projects.map((project, idx) => (
          <div key={project.id} className="relative w-full h-full flex-shrink-0 snap-center">
            {/* Uniquement la capture téléphone, cadrée sur le haut de l'écran */}
            <img
              src={project.phone}
              className="absolute inset-0 w-full h-full object-cover object-top"
              alt={project.title}
            />

            <div
              className="absolute bottom-0 left-0 right-0 h-[25vh] backdrop-blur-md border-t border-white/10 px-6 flex flex-col justify-center"
              style={{ backgroundColor: `${project.accent}E6` }} // couleur du site, légèrement transparente
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-white rounded-lg p-1.5 shadow-lg flex-shrink-0">
                  <img src={project.logo} className="w-full h-full object-contain" alt="" />
                </div>
                <h3
                  className="text-3xl leading-none truncate"
                  style={{ fontFamily: project.font, color: project.titleColor }}
                >
                  {project.title}
                </h3>
              </div>
              <p className="font-bold text-xs mb-1 truncate" style={{ color: project.titleColor, opacity: 0.85 }}>
                {project.tech}
              </p>
              <p
                className="text-[11px] leading-snug line-clamp-3 mb-2"
                style={{ fontFamily: project.font, color: "#ffffffcc" }}
              >
                {project.desc}
              </p>

              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex self-start items-center gap-1 bg-white text-black px-4 py-2 rounded text-[10px] font-black uppercase shadow-lg"
              >
                Voir <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-[27vh] left-0 right-0 flex justify-center gap-2 z-20 pointer-events-none">
        {projects.map((_, idx) => (
          <span key={idx} className={`w-2 h-2 rounded-full transition-colors ${idx === current ? "bg-red-500" : "bg-white/30"}`} />
        ))}
      </div>
    </motion.div>
  );
}

export default function ProjectsHolder() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [showOverlay, setShowOverlay] = useState(true);

  // État Mobile — dérivé d'un "tick" pour connaître le nombre de tours complets (lap)
  const [tick, setTick] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const activeProjMobile = tick % projects.length;
  const lap = Math.floor(tick / projects.length);

  // État Desktop
  const [activeProjDesktop, setActiveProjDesktop] = useState(null);
  const isDesktopActive = activeProjDesktop !== null;

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowOverlay(false), INTRO_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Rotation automatique toutes les 5s, en pause pendant la galerie
  useEffect(() => {
    if (galleryOpen) return undefined;
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [galleryOpen]);

  const handleGalleryClose = (lastIndex) => {
    setGalleryOpen(false);
    // Garde le tour (lap) courant, juste resynchronise l'index affiché
    setTick(lap * projects.length + lastIndex);
  };

  const activeProject = projects[activeProjMobile];
  const activeTheme = themeForLap(activeProject, lap);

  return (
    <div ref={sectionRef} className="w-full h-full relative">
      {/* DESKTOP (>= md) */}
      <section className="hidden md:flex relative w-full h-screen bg-[#080808] overflow-hidden font-cartoon text-white flex-row px-6 py-6 gap-6">
        <AnimatePresence>
          {showOverlay && <IntroOverlay key="intro" startAnimation={isInView} />}
        </AnimatePresence>

        <motion.div
          animate={{ filter: isDesktopActive ? "blur(12px)" : "blur(0px)", opacity: isDesktopActive ? 0.2 : 1 }}
          className="absolute inset-0 z-0 pointer-events-none transition-all duration-500"
        >
          <BackgroundGrid />
        </motion.div>

        <motion.div
          animate={{ filter: isDesktopActive ? "blur(10px)" : "blur(0px)", opacity: isDesktopActive ? 0.2 : 1 }}
          transition={{ duration: 0.4 }}
          className="relative flex-[0.34] h-full flex flex-col justify-end mb-12 z-10"
        >
          <GiantTitle isVisible={!showOverlay} className="text-[8vw] xl:text-[9vw] mb-4">
            MES
            <br />
            <span className="bg-red-500 text-black">PROJETS</span>
          </GiantTitle>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="relative z-10 text-base xl:text-[1.3vw] text-white/80 leading-relaxed max-w-[95%] normal-case space-y-4"
          >
            <p>
              Chaque projet est pensé de bout en bout : <span className="bg-red-500 px-2 text-black font-bold xl:text-[1.4vw]">une conception réfléchie</span>, une architecture solide et une attention portée à chaque détail, du premier wireframe jusqu'au <span className="bg-red-500 px-2 text-black font-bold xl:text-[1.4vw]">déploiement</span>{""}
              Voici une sélection de mes projets actuellement mis en ligne{""} <span className="bg-red-500 px-2 text-black font-bold xl:text-[1.4vw]">sur Vercel et Render</span>
              .
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="relative z-10 mt-6 font-cartoon text-sm xl:text-[1.4vw] text-red-400 border-l-2 border-red-500 pl-3 normal-case leading-snug"
          >
            Render peut mettre quelques secondes à démarrer (cold start) — patiente un instant si la page met du temps à charger.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={!showOverlay ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative flex-[0.66] h-full z-10"
        >
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              isActive={activeProjDesktop === project.id}
              isBlurred={isDesktopActive && activeProjDesktop !== project.id}
              onClick={() => setActiveProjDesktop(activeProjDesktop === project.id ? null : project.id)}
            />
          ))}
        </motion.div>
      </section>

      {/* MOBILE / TABLETTE (< md) */}
      <section className="flex md:hidden relative w-full h-[100dvh] bg-[#080808] overflow-hidden font-cartoon text-white flex-col px-4 py-3 gap-2">
        <AnimatePresence>
          {showOverlay && <IntroOverlay key="intro-mobile" startAnimation={isInView} />}
        </AnimatePresence>
        <BackgroundGrid />

        <motion.div
          initial={false}
          animate={{ opacity: showOverlay ? 0 : 1 }}
          transition={{ duration: 0.25 }}
          className="relative shrink-0 flex flex-col items-start z-10 pt-16 pb-2"
        >
          <GiantTitle isVisible={!showOverlay} className="text-[18vw] sm:text-[12vw] mb-2">
            MES
            <br />
            <span className="bg-red-500 text-black px-2 pb-1">PROJETS</span>
          </GiantTitle>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="relative z-10 text-[6vw] sm:text-[3vw] text-white/80 leading-snug normal-case mt-2 max-w-[95%] space-y-2"
          >
            <p>
              Chaque projet est pensé de bout en bout: <span className="bg-red-500 px-1 text-black font-bold">une conception réfléchie</span> et une attention portée à <span className="bg-red-500 px-1 text-black font-bold">chaque détail.</span>
            </p>
            <p className="text-[5.5vw] text-white/80">
              Ceci est une sélection de mes projets mis en ligne (pas l'intégralité de mes codes).
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: showOverlay ? 0 : 1 }}
          transition={{ duration: 0.25 }}
          className="relative flex-1 min-h-0 flex flex-col z-10 pb-3 pt-4 gap-4"
        >
          <div className="relative flex-1 min-h-0">
            <VibeCard project={activeProject} theme={activeTheme} />
          </div>
          <button
            onClick={() => setGalleryOpen(true)}
            className="shrink-0 self-center font-cartoon uppercase tracking-wide text-lg bg-red-500 text-white px-8 py-3 rounded-full shadow-lg mt-2 active:scale-95 transition-transform"
          >
            Voir Les Projets
          </button>
        </motion.div>
      </section>

      <AnimatePresence>
        {galleryOpen && (
          <ProjectDetailGallery startIndex={activeProjMobile} onClose={handleGalleryClose} />
        )}
      </AnimatePresence>
    </div>
  );
}