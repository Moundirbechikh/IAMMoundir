// components/ProjectCard.jsx — SEUL changement : défaut robuste sur "crimson"
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

function useThemeCycle(themes, intervalMs = 8000, defaultId = "crimson") {
  const getDefaultIndex = () => {
    if (!themes || !themes.length) return 0;
    const idx = themes.findIndex((t) => t.id === defaultId);
    return idx >= 0 ? idx : 0;
  };

  const [index, setIndex] = useState(getDefaultIndex);

  useEffect(() => {
    if (!themes || themes.length < 2) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % themes.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [themes, intervalMs]);

  return themes && themes.length ? themes[index] : null;
}

export default function ProjectCard({ project, index, isActive, isBlurred, onClick }) {
  const [hovered, setHovered] = useState(false);

  const activeTheme = useThemeCycle(project.themes);
  const current = activeTheme ? { ...project, ...activeTheme } : project;

  const positions = [
    { top: "19%", left: "25%", rotate: -6 },
    { top: "18%", left: "75%", rotate: 5 },
    { top: "52%", left: "48%", rotate: 2 },
    { top: "85%", left: "28%", rotate: -3 },
    { top: "85%", left: "76%", rotate: -2 },
  ];

  const basePos = positions[index] || positions[2];

  return (
    <motion.div
      onClick={() => !isActive && onClick()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        top: isActive ? "50%" : basePos.top,
        left: isActive ? "50%" : basePos.left,
        x: "-50%",
        y: "-50%",
        rotate: isActive ? 0 : basePos.rotate,
        width: isActive ? "90%" : "28vw",
        height: isActive ? "80%" : "14vw",
        zIndex: isActive ? 50 : 10,
        filter: isBlurred ? "blur(12px) brightness(0.2)" : "blur(0px) brightness(1)",
        boxShadow: isActive ? `0 0 80px 15px ${current.accent}70` : "0 25px 50px -12px rgba(0,0,0,0.5)",
      }}
      transition={{ type: "spring", stiffness: 50, damping: 14 }}
      className={`absolute overflow-hidden flex flex-col group ${
        isActive ? "bg-black rounded-xl border border-white/20" : "bg-black border-2 border-[#222] cursor-pointer"
      }`}
      style={{ minWidth: isActive ? "600px" : "300px" }}
    >
      {isActive ? (
        <>
          <div className="h-12 bg-[#2d2d2d] flex items-center px-4 justify-between shrink-0 border-b border-black/50">
            <div className="flex items-center gap-4">
              <div className="flex gap-2 w-16">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-inner" />
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-inner" />
                <div className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-inner" />
              </div>

              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="bg-[#1e1e1e] text-white/70 hover:text-white transition-colors text-xs md:text-sm px-4 py-1.5 rounded-md flex items-center gap-2 border border-white/5"
              >
                {project.link !== "#" ? project.link : "Lien indisponible"} <ArrowUpRight size={14} />
              </a>
            </div>

            <div className="w-20 flex justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
                className="text-white/60 hover:text-white hover:bg-white/10 p-1.5 rounded transition-all"
              >
                <X size={22} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div className="relative flex-1 bg-[#111] w-full overflow-hidden">
            <AnimatePresence mode="sync">
              {current.video ? (
                <motion.video
                  key={current.video}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  src={current.video}
                  autoPlay
                  loop
                  muted
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <motion.img
                  key={current.poster}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  src={current.poster}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt=""
                />
              )}
            </AnimatePresence>
          </div>

          <div
            className="h-24 shrink-0 flex items-center px-6"
            style={{ backgroundColor: current.accent, transition: "background-color 0.8s ease" }}
          >
            <div className="w-14 h-14 bg-white rounded-md p-1.5 shadow-md flex-shrink-0 mr-4">
              <img src={project.logo} className="w-full h-full object-contain" alt="logo" />
            </div>

            <div className="flex flex-col text-white flex-1 overflow-hidden">
              <h3
                className="text-3xl tracking-tight leading-none truncate"
                style={{ fontFamily: project.font, color: current.titleColor || "#fff" }}
              >
                {project.title}
              </h3>
              <p className="text-white/90 text-sm font-medium truncate mt-1">{project.tech}</p>
            </div>

            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="ml-4 bg-white text-black px-6 py-2.5 rounded text-sm font-black uppercase shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
              Visiter <ArrowUpRight size={16} strokeWidth={3} />
            </a>
          </div>
        </>
      ) : (
        <a>
          <AnimatePresence mode="sync">
            <motion.img
              key={current.poster}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              src={current.poster}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

          <div className="absolute top-2 left-2 w-10 h-10 bg-white p-1.5 shadow-lg">
            <img src={project.logo} className="w-full h-full object-contain" alt="" />
          </div>

          <h3
            className="absolute bottom-2 left-3 right-2 text-white text-2xl tracking-tight leading-none pointer-events-none drop-shadow-md"
            style={{ fontFamily: project.font, color: current.titleColor || "#fff" }}
          >
            {project.title}
          </h3>

          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 pointer-events-none"
            >
              <div className="relative overflow-hidden border-2 border-white px-6 py-2 rounded-full flex items-center justify-center">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-0 z-0"
                  style={{ backgroundColor: current.accent }}
                />
                <span className="relative z-10 text-white font-black uppercase text-sm tracking-wide">
                  Voir le projet
                </span>
              </div>
            </motion.div>
          )}
        </a>
      )}
    </motion.div>
  );
}