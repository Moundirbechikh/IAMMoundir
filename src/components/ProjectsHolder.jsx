import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FolderKanban, ArrowLeft, ArrowUpRight } from "lucide-react";
import ProjectCard from "./ProjectCard";

// --- IMPORTS ASSETS ---
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
import backv from "../assets/backv.jpg";
import backveVid from "../assets/backve.mp4";
import backvVid from "../assets/backv.mp4";
import phoneve from "../assets/phoneve.jpg";
import phoneveVid from "../assets/phoneve.mp4";

import back41 from "../assets/seenIT.jpg";
import logo4 from "../assets/logoSeenIt.png";
import back4Vid from "../assets/seenIT1.mp4";

// --- NOUVEAUX ASSETS : thèmes SeenIt (à ajouter dans /assets) ---
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
import phone14 from "../assets/phone14.jpg";
import back14Vid from "../assets/back14.mp4";
import phone14Vid from "../assets/phone14.mp4";

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
    // Système multi-thème desktop : change de couleur toutes les 8s (lime -> purple -> lime...)
    // ⚠️ Pas de média distinct pour l'instant : ajoute poster/video ici si tu en as.
    themes: [
      { id: "lime", accent: "#365314", titleColor: "#fff" ,poster: backve, video: backveVid},
      { id: "purple", accent: "#6b21a8", titleColor: "#fff",poster: backv, video: backvVid },
    ],
  },
  {
    id: "04", title: "SeenIt", tech: "React / Tailwind / MangoDB / Node.js",
    desc: "Plateforme de partage de films et archivage de visionnage, interface immersive et themes différents.",
    link: "https://seen-it-gamma.vercel.app/", font: "'Kaushan Script',cursive",
    accent: "#0F172A", titleColor: "#F59E0B", // thème par défaut = "Nuit" (midnight)
    logo: logo4, poster:  seenIT1, video:  back4Vid, posterM: back41, videoM: null,
    // 6 thèmes du site SeenIt, cyclés toutes les 8s sur la carte desktop
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
    logo: logo14, poster: back14, video: back14Vid, posterM: phone14, videoM: phone14Vid,
  },
];

// Fond en pointillés (même logique que About), teinté rouge pour la section Projets
function BackgroundGrid() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
      <div className="absolute w-[200vw] h-[200vh] flex flex-wrap gap-4 md:gap-6 justify-center content-center rotate-[-35deg]">
        {Array.from({ length: 160 }).map((_, i) => (
          <div key={i} className="w-24 h-24 md:w-32 md:h-32 border-2 border-dashed border-red-500/10 rounded-xl" />
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

function IntroOverlay({ startAnimation }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (startAnimation) {
      setPhase(1);
      const t = setTimeout(() => setPhase(2), 1500);
      return () => clearTimeout(t);
    }
  }, [startAnimation]);
  const phrases = ["Mes projets ?", "My Projects?", "Mis Proyectos?", "Meine Projekte?", "I Miei Progetti?"];
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
                <div className={`absolute -bottom-3 -right-3 w-full h-full rounded-xl border-2 transition-all duration-300 ${phase === 1 ? "border-red-400/25" : "border-red-400/60 bg-red-500/30"}`} />
              )}
              <div className={`relative w-full h-full flex items-center justify-center rounded-xl border-2 transition-all duration-300 ${phase === 0 ? "border-transparent bg-transparent" : phase === 1 ? "border-red-400/50 bg-transparent" : "border-red-500 border-solid bg-red-500"}`}>
                {phase === 1 && <span className={`font-black text-center px-1.5 text-lg md:text-2xl text-white ${hasText ? "opacity-100" : "opacity-0"}`}>{phrases[i % phrases.length]}</span>}
                {phase === 2 && <motion.div initial={{ scale: 0.2, opacity: 0, rotate: -15 }} animate={{ scale: 1, opacity: 1, rotate: 0 }}><FolderKanban className="w-14 h-14 text-black" strokeWidth={2.2} /></motion.div>}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function VibeCard({ project }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${project.id}`}
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.96 }}
        transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
        style={{ backgroundColor: project.accent }}
        className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-5 text-center shadow-2xl"
      >
        <div className="w-16 h-16 bg-white rounded-lg p-2 shadow-lg mb-4 flex-shrink-0">
          <img src={project.logo} className="w-full h-full object-contain" alt="" />
        </div>
        <h3
          className="text-4xl leading-none font-black mb-3"
          style={{ fontFamily: project.font, color: project.titleColor }}
        >
          {project.title}
        </h3>
        <p className="text-white/90 text-sm leading-relaxed px-2 line-clamp-3">{project.desc}</p>
      </motion.div>
    </AnimatePresence>
  );
}

// ==========================================
// VUE DÉTAIL MOBILE
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
      <button
        // Met à jour la carte d'accueil mobile avec le projet qu'on était en train de regarder en quittant
        onClick={() => onClose(current)} 
        className="absolute top-20 left-4 z-50 flex items-center justify-center w-12 h-12 bg-[#ef4444] rounded-full shadow-lg border border-white/20 active:scale-90 transition-transform"
      >
        <ArrowLeft className="text-white" size={24} strokeWidth={3} />
      </button>

      {/* DÉFILEMENT MANUEL UNIQUEMENT (snap-mandatory) */}
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
              className="absolute inset-0 w-full h-full object-cover"
              alt={project.title}
            />
            {idx === current && (project.videoM || project.video) && (
              <video
                key={project.id}
                src={project.videoM || project.video}
                autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            
            <div className="absolute bottom-0 left-0 right-0 h-[25vh] bg-black/85 backdrop-blur-md border-t border-white/10 px-6 flex flex-col justify-center">
               <div className="flex items-center gap-4 mb-2">
                 <div className="w-12 h-12 bg-white rounded-lg p-1.5 shadow-lg flex-shrink-0">
                   <img src={project.logo} className="w-full h-full object-contain" alt="" />
                 </div>
                 <h3 
                   className="text-white text-3xl leading-none truncate"
                   style={{ fontFamily: project.font, color: project.titleColor }}
                 >
                   {project.title}
                 </h3>
               </div>
               <p className="text-red-400 font-bold text-xs mb-1 truncate">{project.tech}</p>
               <p className="text-gray-300 text-[11px] leading-snug line-clamp-3 mb-2">{project.desc}</p>
               
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
  
  // État Mobile
  const [activeProjMobile, setActiveProjMobile] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  
  // État Desktop
  const [activeProjDesktop, setActiveProjDesktop] = useState(null);
  const isDesktopActive = activeProjDesktop !== null;

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowOverlay(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Rotation automatique infinie de la carte mobile toutes les 5s.
  // En pause pendant que la galerie "Voir Les Projets" est ouverte (swipe = manuel côté user).
  useEffect(() => {
    if (galleryOpen) return undefined;
    const interval = setInterval(() => {
      setActiveProjMobile((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [galleryOpen]);

  return (
    <div ref={sectionRef} className="w-full h-full relative">
      <div className="hidden">
        {projects.map(p => (
           <img key={p.id} src={p.poster} loading="eager" alt="" />
        ))}
      </div>

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

        {/* Côté Gauche (Texte) */}
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

        {/* Côté Droit (Cartes de Projets) */}
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

        <div className="relative flex-shrink-0 flex flex-col items-start z-10 pt-16 pb-2">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="relative z-10 text-[9vw] sm:text-[4vw] uppercase tracking-wide text-black bg-red-500 px-1 "
          >
            Mes
          </motion.p>
          <GiantTitle isVisible={!showOverlay} className="text-[22vw] sm:text-[14vw] mb-2 text-white">
            PROJETS
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
        </div>

        <div className="relative flex-1 min-h-0 flex flex-col z-10 pb-3 pt-4 gap-4">
          <div className="relative flex-1 min-h-0">
            <VibeCard project={projects[activeProjMobile]} />
          </div>
          <button
            onClick={() => setGalleryOpen(true)}
            className="flex-shrink-0 self-center font-cartoon uppercase tracking-wide text-lg bg-red-500 text-white px-8 py-3 rounded-full shadow-lg mt-2 active:scale-95 transition-transform"
          >
            Voir Les Projets
          </button>
        </div>
      </section>

      <AnimatePresence>
        {galleryOpen && (
          <ProjectDetailGallery 
            startIndex={activeProjMobile} 
            onClose={(lastIndex) => {
              setGalleryOpen(false);
              setActiveProjMobile(lastIndex);
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}