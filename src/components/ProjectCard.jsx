import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

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

function AnimatedFrame({ hoverColor, isOn }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-30" preserveAspectRatio="none">
      <motion.rect
        x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)"
        fill="none" strokeWidth="2" strokeDasharray="7 5"
        animate={{ stroke: isOn ? hoverColor : "#ffffff", opacity: isOn ? 1 : 0.25 }}
        transition={{ duration: 0.3 }}
      />
    </svg>
  );
}

/**
 * ProjectCard — carte desktop.
 * Le média (image/vidéo) reste TOUJOURS pleinement visible, jamais
 * recouvert par du texte. Au survol, seul un panneau de détail flotte
 * juste en dessous (ou au-dessus si `dropUp`, pour ne jamais sortir
 * de l'écran) de la carte — donc rien ne cache jamais tes captures.
 * La vidéo n'est montée dans le DOM que pendant le survol (lazy).
 */
export default function ProjectCard({ project, className = "", dropUp = false }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative w-full h-full ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={{ scale: hovered ? 1.015 : 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full h-full flex flex-col rounded-xl overflow-hidden bg-[#111] border-2 border-[#222] select-none z-10"
      >
        <AnimatedFrame hoverColor={project.accent} isOn={hovered} />
        <BrowserChrome url={displayUrl(project.link)} />

        <div className="relative flex-1 min-h-0 overflow-hidden bg-black">
          <img
            src={project.poster}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />

          <AnimatePresence>
            {hovered && project.video && (
              <motion.video
                key={project.video}
                src={project.video}
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

          <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none">
            <h3 className="text-white text-sm md:text-lg font-cartoon uppercase tracking-tight leading-none">
              {project.title}
            </h3>
          </div>
        </div>
      </motion.div>

      {/* Panneau détail flottant — jamais superposé au média */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: dropUp ? 8 : -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: dropUp ? 8 : -8, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            style={{ backgroundColor: project.accent }}
            className={`absolute left-0 right-0 z-40 rounded-lg shadow-2xl p-3 md:p-4 flex flex-col gap-1.5 ${
              dropUp ? "bottom-full mb-2" : "top-full mt-2"
            }`}
          >
            <h3
              className="text-lg md:text-xl leading-none font-black"
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
  );
}