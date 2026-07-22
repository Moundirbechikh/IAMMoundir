import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Archive } from "lucide-react";
import ArchiveCard from "./ArchiveCard";

// --- IMPORTS ASSETS ---
import back12 from "../assets/back12.mp4";
import back5 from "../assets/back5.mp4";
import back6 from "../assets/back6.jpg";
import back7 from "../assets/back7.jpg";
import back10Vid from "../assets/back10.mp4";
import back8 from "../assets/back8.png";
import back9Vid from "../assets/back9.mp4";
import back11Vid from "../assets/back11.mp4";

// Ajout de la prop "isBlurred" pour flouter le fond quand une carte est active
function BackgroundGrid({ isBlurred }) {
  return (
    <div 
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center transition-all duration-700 ${
        isBlurred ? "blur-md opacity-30" : "blur-0 opacity-100"
      }`}
    >
      <div className="absolute w-[200vw] h-[200vh] flex flex-wrap gap-4 md:gap-6 justify-center content-center rotate-[-35deg]">
        {Array.from({ length: 160 }).map((_, i) => (
          <div key={i} className="w-24 h-24 md:w-32 md:h-32 border-2 border-dashed border-white/10 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function GiantTitle({ isVisible, className = "", children }) {
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

  const phrases = ["Mes archives ?", "My Archives?", "Mis Archivos?", "Meine Archive?", "I Miei Archivi?"];

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
                    phase === 1 ? "border-gray-400/25" : "border-gray-300/60 bg-gray-500/30"
                  }`}
                />
              )}
              <div
                className={`relative w-full h-full flex items-center justify-center rounded-xl border-2 transition-all duration-300 ${
                  phase === 0
                    ? "border-transparent bg-transparent"
                    : phase === 1
                    ? "border-gray-400/50 bg-transparent"
                    : "border-gray-300 border-solid bg-gray-300"
                }`}
              >
                {phase === 1 && (
                  <span
                    className={`font-black text-center px-1.5 text-lg md:text-2xl text-white ${
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
                    <Archive className="w-10 h-10 md:w-14 md:h-14 text-black" strokeWidth={2.2} />
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

export default function ArchiveHolder() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [showOverlay, setShowOverlay] = useState(true);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowOverlay(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const handleBackgroundClick = () => setActiveId(null);

  // mTop/mLeft/mRotate modifiés pour recréer l'effet éparpillé de ton illustration (image_7e2a3b.jpg)
  const oldProjects = [
    {
      id: "A-01", date: "Sep. 2023", type: "wide", isVideo: true, title: "Ma Bibliothèque",
      purpose: "C'est une version améliorée (remake) de mon projet PFE de Licence. Un système de bibliothèque informatisé gérant trois types d'accès.",
      how: "React + Supabase", media: back5,
      top: "30%", left: "20%", rotate: -9, zIndex: 10,
      mTop: "24%", mLeft: "32%", mRotate: -12,
    },
    {
      id: "A-02", date: "Jan. 2023", type: "regular", isVideo: true, title: "Finding the perfect movie",
      purpose: "Un système complet où l'user choisit son mode : similitude, tendance ou acteurs. Filtrage poussé.",
      how: "Python + Streamlit", media: back9Vid,
      top: "24%", left: "46%", rotate: 7, zIndex: 12,
      mTop: "28%", mLeft: "76%", mRotate: 15,
    },
    {
      id: "A-03", date: "Sep. 2025", type: "wide", isVideo: true, title: "Brain Box",
      purpose: "Web app pour organiser le travail en entreprise : classement des documents, activités et tâches par employé.",
      how: "Vite + React + Node.js + MongoDB", media: back12,
      top: "45%", left: "78%", rotate: -5, zIndex: 15,
      mTop: "44%", mLeft: "34%", mRotate: 8,
    },
    {
      id: "A-04", date: "Aou. 2024", type: "regular", isVideo: true, title: "Fast Bite",
      purpose: "Mon premier gros site de restaurant 100% fonctionnel. Gestion des commandes réelles, menus dynamiques.",
      how: "Node.js + React + MongoDB", media: back11Vid,
      top: "62%", left: "22%", rotate: -6, zIndex: 18,
      mTop: "52%", mLeft: "74%", mRotate: -6,
    },
    {
      id: "A-05", date: "Oct. 2025", type: "wide", isVideo: true, title: "My New Style",
      purpose: "Une application e-commerce hyper classe pour vendre des habits classiques. Design épuré.",
      how: "Next.js + Firebase", media: back10Vid,
      top: "50%", left: "52%", rotate: 3, zIndex: 25,
      mTop: "66%", mLeft: "30%", mRotate: -14,
    },
    {
      id: "A-06", date: "Dec. 2023", type: "regular", isVideo: false, title: "Enrichissement d'articles",
      purpose: "Système qui prend une phrase en input, cherche sur le web via APIs pour extraire les infos manquantes.",
      how: "APIs + Spacy + Python + BeautifulSoup", media: back6,
      top: "70%", left: "80%", rotate: 6, zIndex: 16,
      mTop: "74%", mLeft: "72%", mRotate: 10,
    },
    {
      id: "A-07", date: "Fev. 2024", type: "wide", isVideo: false, title: "Analyse Football",
      purpose: "Étude sur une liste d'attaquants utilisant 12 variables techniques. ACP, corrélation et K-Means.",
      how: "Python + Matplotlib + Seaborn", media: back8,
      top: "74%", left: "48%", rotate: -4, zIndex: 22,
      mTop: "88%", mLeft: "36%", mRotate: 5,
    },
    {
      id: "A-08", date: "Avr. 2022", type: "regular", isVideo: false, title: "Brotherhood",
      purpose: "Mon tout premier site de restaurant créé en première année de dev web. Il regroupe toutes les bases.",
      how: "HTML + CSS + Vanilla JS", media: back7,
      top: "32%", left: "68%", rotate: 2, zIndex: 20,
      mTop: "92%", mLeft: "78%", mRotate: -8,
    },
  ];

  return (
    <div ref={sectionRef} className="w-full h-full relative">
      {/* --- DESKTOP --- */}
      <section
        onClick={handleBackgroundClick}
        className="hidden md:flex relative w-full h-screen bg-[#080808] overflow-hidden font-cartoon text-white flex-row px-6 py-6 gap-6"
      >
        <AnimatePresence>
          {showOverlay && <IntroOverlay key="intro" startAnimation={isInView} />}
        </AnimatePresence>

        <BackgroundGrid isBlurred={activeId !== null} />

        <div className="relative flex-[0.24] h-full flex flex-col justify-end items-start pl-4 lg:pl-3 xl:pl-2 z-10">
          <GiantTitle isVisible={!showOverlay} className="text-[8.5vw] xl:text-[9vw] mb-4">
            Mes <br />
            <span className="bg-gray-400 text-black">ARCHIVES</span>
          </GiantTitle>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="relative z-10 text-base xl:text-[1.7vw] mb-12 text-white/80 leading-relaxed max-w-[92%] normal-case space-y-3"
          >
            <p>
              Chaque projet ici raconte une étape de <span className="bg-gray-400 text-black">ma progression.</span> Des premières lignes de code aux architectures complexes, c'est la trace visible de <span className="bg-gray-400 text-black">mon apprentissage</span> constant <span className="bg-gray-400 text-black">en développement</span> et en design.
            </p>
          </motion.div>
        </div>

        <div className="relative flex-[0.76] h-full z-10">
          {oldProjects.map((proj) => (
            <div
              key={proj.id}
              style={{
                position: "absolute",
                top: proj.top,
                left: proj.left,
                transform: "translate(-50%, -50%)",
                zIndex: activeId === proj.id ? 999 : proj.zIndex,
              }}
            >
              <ArchiveCard
                project={proj}
                isMobile={false}
                onActive={() => setActiveId(proj.id)}
                isActiveInParent={activeId === proj.id}
              />
            </div>
          ))}
        </div>
      </section>

      {/* --- MOBILE --- */}
      <section
        onClick={handleBackgroundClick}
        className="flex md:hidden relative w-full h-[100dvh] bg-[#080808] overflow-hidden font-cartoon text-white flex-col px-4 pt-14 pb-3"
      >
        <AnimatePresence>
          {showOverlay && <IntroOverlay key="intro-mobile" startAnimation={isInView} />}
        </AnimatePresence>
        
        {/* Grille floutée dynamiquement sur mobile */}
        <BackgroundGrid isBlurred={activeId !== null} />

        <div className="relative flex-shrink-0 flex flex-col items-start z-10 pb-2">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="relative z-10 text-[7vw] uppercase text-black bg-gray-300 px-0"
          >
            Mes
          </motion.p>
          {/* Titre agrandi (17vw) */}
          <GiantTitle isVisible={!showOverlay} className="text-[17vw] mb-0 mt-1 leading-[0.8] text-white">
            ARCHIVES
          </GiantTitle>
        </div>

        <div className="relative flex-1 min-h-0 w-full z-10 mt-2">
          {oldProjects.map((proj) => {
            const isActive = activeId === proj.id;
            const isBlurred = activeId !== null && !isActive;
            return (
              <motion.div
                key={proj.id}
                animate={{
                  top: isActive ? "50%" : proj.mTop,
                  left: isActive ? "50%" : proj.mLeft,
                }}
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                style={{
                  position: "absolute",
                  transform: "translate(-50%, -50%)",
                  zIndex: isActive ? 999 : proj.zIndex,
                }}
              >
                <ArchiveCard
                  project={{ ...proj, rotate: proj.mRotate }}
                  isMobile={true}
                  isActiveInParent={isActive}
                  isBlurred={isBlurred}
                  onActive={() => setActiveId(proj.id)}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Message d'indication au clic */}
        <AnimatePresence>
          {activeId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-8 left-0 w-full z-[1000] flex justify-center pointer-events-none"
            >
              <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-full text-[10px] font-sans tracking-wide shadow-xl">
                Touchez n'importe où pour fermer
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}