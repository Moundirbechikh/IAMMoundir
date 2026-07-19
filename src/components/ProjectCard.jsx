import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

// Affiche un nom de domaine propre dans la fausse barre d'adresse
const displayUrl = (link) => {
  if (!link || link === "#") return "bientot-disponible.dev";
  try {
    return new URL(link).hostname.replace("www.", "");
  } catch {
    return link;
  }
};

function BrowserChrome({ url }) {
  return (
    <div className="h-6 md:h-7 bg-[#1a1a1a] flex items-center gap-1.5 px-2.5 border-b border-white/10 flex-shrink-0">
      <span className="w-2 h-2 rounded-full bg-red-500" />
      <span className="w-2 h-2 rounded-full bg-yellow-400" />
      <span className="w-2 h-2 rounded-full bg-green-400" />
      <span className="ml-2 flex-1 bg-black/40 rounded px-2 py-[1px] text-[8px] md:text-[9px] font-mono text-white/50 truncate">
        {url}
      </span>
    </div>
  );
}

// Cadre pointillé qui prend la couleur propre du projet à l'activation
function AnimatedFrame({ hoverColor }) {
  const frameVariants = {
    rest: { stroke: "#ffffff", opacity: 0.25, transition: { duration: 0.3 } },
    hover: { stroke: hoverColor, opacity: 1, transition: { duration: 0.3 } },
  };
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-30" preserveAspectRatio="none">
      <motion.rect
        x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)"
        fill="none" strokeWidth="2" strokeDasharray="7 5"
        variants={frameVariants}
      />
    </svg>
  );
}

/**
 * ProjectCard
 * variant="desktop" -> activation au survol (souris)
 * variant="mobile"  -> activation au tap, MAIS seulement si `active` est vrai
 *                       (c'est le parent — le carrousel en éventail — qui décide
 *                       quelle carte est "devant" et donc activable)
 *
 * Optimisation : la <video> n'est JAMAIS montée dans le DOM tant que la carte
 * n'est pas activée (hover ou tap) — donc jamais plus d'une vidéo ne charge
 * ou ne joue en même temps, quel que soit le nombre de projets.
 */
export default function ProjectCard({ project, variant = "desktop", active = false, className = "" }) {
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const isDesktop = variant === "desktop";
  const isOn = isDesktop ? hovered : active && tapped;

  // Si la carte n'est plus la carte "devant" du carrousel mobile, on referme
  useEffect(() => {
    if (!active) setTapped(false);
  }, [active]);

  const poster = isDesktop ? project.poster : project.posterM;
  const video = isDesktop ? project.video : project.videoM;

  const handleEnter = () => isDesktop && setHovered(true);
  const handleLeave = () => isDesktop && setHovered(false);
  const handleTap = () => !isDesktop && active && setTapped((v) => !v);

  return (
    <motion.div
      initial="rest"
      animate={isOn ? "hover" : "rest"}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleTap}
      className={`relative w-full h-full flex flex-col rounded-xl overflow-hidden bg-[#111] border-2 border-[#222] select-none cursor-pointer ${className}`}
    >
      <AnimatedFrame hoverColor={project.accent} />
      <BrowserChrome url={displayUrl(project.link)} />

      {/* Zone média — remplit tout l'espace restant, ne change JAMAIS de taille */}
      <div className="relative flex-1 min-h-0 overflow-hidden bg-black">
        <img
          src={poster}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />

        <AnimatePresence>
          {isOn && video && (
            <motion.video
              key={video}
              src={video}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 w-full h-full object-cover object-top z-10"
            />
          )}
        </AnimatePresence>

        <div className="absolute top-2 left-2 w-7 h-7 md:w-8 md:h-8 bg-white p-1 rounded shadow-lg z-20">
          <img src={project.logo} className="w-full h-full object-contain" alt="" loading="lazy" />
        </div>

        {!isOn && (
          <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 bg-gradient-to-t from-black/90 to-transparent z-10">
            <h3 className="text-white text-sm md:text-lg font-cartoon uppercase tracking-tight leading-none">
              {project.title}
            </h3>
          </div>
        )}

        {!isDesktop && active && !tapped && (
          <div className="absolute top-2 right-2 z-20 rounded-md border border-white/10 bg-white/10 backdrop-blur-md px-2 py-1 text-[9px] uppercase tracking-wider text-white/80 pointer-events-none">
            Toucher
          </div>
        )}

        {/* Panneau détail — bottom-sheet ABSOLU, ne pousse jamais la mise en page */}
        <AnimatePresence>
          {isOn && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
              style={{ backgroundColor: project.accent }}
              className="absolute bottom-0 left-0 right-0 z-20 p-3 md:p-4 flex flex-col gap-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                className="text-lg md:text-2xl leading-none font-black"
                style={{ fontFamily: project.font, color: project.titleColor }}
              >
                {project.title}
              </h3>
              <p className="text-white text-[10px] md:text-xs leading-snug font-medium line-clamp-2">
                {project.desc}
              </p>
              <div className="flex items-center justify-between gap-2 border-t border-white/10 pt-2 mt-0.5">
                <span className="text-[8px] md:text-[9px] font-black text-white/50 uppercase tracking-widest truncate">
                  {project.tech}
                </span>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-1 bg-white text-black px-2.5 py-1.5 rounded text-[9px] md:text-[10px] font-black uppercase hover:bg-black hover:text-white transition-colors"
                >
                  Voir <ArrowUpRight size={12} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}