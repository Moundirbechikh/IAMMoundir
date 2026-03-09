import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ArchiveCard({ project, onActive, isActiveInParent }) {
  const [isActive, setIsActive] = useState(false);

  // On synchronise l'état local avec le parent pour les effets visuels
  useEffect(() => {
    setIsActive(isActiveInParent);
  }, [isActiveInParent]);

  const isWide = project.type === "wide";
  const cardWidth = isWide ? "w-[240px] md:w-[380px]" : "w-[160px] md:w-[260px]";
  const cardHeight = isWide ? "h-[160px] md:h-[260px]" : "h-[220px] md:h-[340px]";

  const handleInteraction = () => {
    setIsActive(true);
    onActive(); // Notifie le parent pour passer au-dessus
  };

  return (
    <motion.div
      onHoverStart={handleInteraction}
      onHoverEnd={() => setIsActive(false)}
      onClick={handleInteraction}
      
      animate={{
        rotate: isActive ? 0 : project.rotate,
        scale: isActive ? (window.innerWidth < 768 ? 1.15 : 1.4) : 1,
        y: isActive ? -15 : 0,
        // LE FIX DU CENTRAGE MOBILE RESTE ICI
        x: window.innerWidth < 768 ? "-50%" : "0%" 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`relative cursor-pointer bg-white p-2 pb-8 md:p-3 md:pb-14 shadow-2xl border border-black/5 origin-center group ${cardWidth} ${cardHeight}`}
    >
      <div className="relative w-full h-full overflow-hidden bg-black">
        {project.isVideo ? (
          <video src={project.media} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-40 transition-all duration-500" />
        ) : (
          <img src={project.media} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-40 transition-all duration-500" />
        )}

        <div className={`absolute inset-0 p-3 md:p-3 flex flex-col justify-center items-center text-center bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}>
          <h3 className="text-white font-cartoon text-lg md:text-2xl uppercase -rotate-1 mb-2 md:mb-4 drop-shadow-lg leading-tight">
            {project.title}
          </h3>
          <div className="space-y-2 md:space-y-4">
            <div>
              <p className="text-yellow-400 font-black text-[8px] md:text-[10px] uppercase">Objectif :</p>
              <p className="text-white text-center text-[8px] md:text-[12px] font-cartoon font-light leading-tight">{project.purpose}</p>
            </div>
            <div>
              <p className="text-cyan-400 font-black text-[8px] md:text-[10px] uppercase">Stack :</p>
              <p className="text-white/80 text-[9px] md:text-xs font-medium">{project.how}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1 md:bottom-3 left-0 w-full px-3 flex justify-between items-center">
        <span className="text-black/80 font-cartoon text-xs md:text-xl -rotate-2">
          {project.date}
        </span>
        <div className="flex flex-col items-end opacity-20 scale-75 md:scale-100 font-mono text-black">
          <span className="text-[6px] md:text-[7px] font-black uppercase">MNDR Archive</span>
          <span className="text-[8px] md:text-[9px]">ID: {project.id}</span>
        </div>
      </div>
    </motion.div>
  );
}