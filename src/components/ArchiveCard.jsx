import { motion } from "framer-motion";
import { Hand } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function ArchiveCard({ project, onActive, isActiveInParent, isMobile, isBlurred }) {
  const [isActive, setIsActive] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setIsActive(isActiveInParent);
  }, [isActiveInParent]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) playPromise.catch(() => {});
    }
  }, []);

  const isWide = project.type === "wide";

  // Tailles identiques à ta demande initiale
  const cardWidth = isMobile
    ? isWide ? "w-[125px]" : "w-[100px]"
    : isWide ? "w-[300px]" : "w-[200px]";
  const cardHeight = isMobile
    ? isWide ? "h-[92px]" : "h-[132px]"
    : isWide ? "h-[200px]" : "h-[270px]";

  const handleInteraction = (e) => {
    e.stopPropagation();
    setIsActive(true);
    onActive();
  };

  // Mobile : scale passe à 2 pour doubler le volume de la carte au clic
  const cardAnimate = isMobile
    ? {
        scale: isActive ? 2 : 1, 
        rotate: isActive ? 0 : project.rotate,
        opacity: isBlurred ? 0.35 : 1,
        filter: isBlurred ? "blur(4px)" : "blur(0px)",
      }
    : {
        rotate: isActive ? 0 : project.rotate,
        scale: isActive ? 1.4 : 1,
        y: isActive ? -10 : 0,
        x: 0,
      };

  // Logique de couleur : Couleur naturelle + pleine opacité si actif, sinon noir et blanc
  const mediaStyles = `w-full h-full object-cover transition-all duration-500 ${
    isActive 
      ? "grayscale-0 opacity-100" 
      : "grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-40"
  }`;

  return (
    <motion.div
      onHoverStart={!isMobile ? handleInteraction : undefined}
      onHoverEnd={!isMobile ? () => setIsActive(false) : undefined}
      onClick={handleInteraction}
      animate={cardAnimate}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`relative cursor-pointer bg-white p-2 pb-8 md:p-3 md:pb-12 shadow-2xl border border-black/5 origin-center group ${cardWidth} ${cardHeight}`}
    >
      <div className="relative w-full h-full overflow-hidden bg-black">
        {project.isVideo ? (
          <video
            ref={videoRef}
            src={project.media}
            loop
            muted
            playsInline
            className={mediaStyles}
          />
        ) : (
          <img
            src={project.media}
            alt={project.title}
            className={mediaStyles}
          />
        )}

        {!isActive && (
          <div className="absolute top-1 right-1 z-20 rounded-md border border-white/10 bg-white/10 backdrop-blur-md p-1">
            <Hand className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-white/90" strokeWidth={2.2} />
          </div>
        )}

        {/* Le fond noir semi-transparent reste pour garantir la lisibilité du texte par dessus l'image en couleur */}
        <div
          className={`absolute inset-0 p-2 md:p-3 flex flex-col justify-center items-center text-center bg-black/70 backdrop-blur-[2px] transition-opacity duration-300 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        >
          <h3 className="text-white font-cartoon text-base md:text-xl uppercase -rotate-1 mb-1 md:mb-2 drop-shadow-lg leading-tight">
            {project.title}
          </h3>
          <div className="space-y-1 md:space-y-3">
            <div>
              <p className="text-yellow-400 font-black text-[7px] md:text-[9px] uppercase">Objectif :</p>
              <p className="text-white text-center text-[7px] md:text-[10px] font-cartoon font-light leading-tight">
                {project.purpose}
              </p>
            </div>
            <div>
              <p className="text-cyan-400 font-black text-[7px] md:text-[9px] uppercase">Stack :</p>
              <p className="text-white/90 text-[8px] md:text-[10px] font-medium">{project.how}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1 md:bottom-2 left-0 w-full px-2 md:px-3 flex justify-between items-center">
        <span className="text-black/80 font-cartoon text-xs md:text-lg -rotate-2">{project.date}</span>
        <div className="flex flex-col items-end opacity-30 scale-75 md:scale-100 font-mono text-black">
          <span className="text-[5px] md:text-[6px] font-black uppercase tracking-wider">MNDR Archive</span>
          <span className="text-[7px] md:text-[8px] font-bold">ID: {project.id}</span>
        </div>
      </div>
    </motion.div>
  );
}