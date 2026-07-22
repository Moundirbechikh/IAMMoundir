import { motion } from "framer-motion";
import { Hand } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function ArchiveCard({
  project,
  onActive,
  isActiveInParent,
  isMobile,
  isBlurred,
  isFocused = false,
}) {
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

  // Grille mobile (non focus) agrandie -> effet "deck de cartes" comme la référence
  const cardWidth = isFocused
    ? isWide
      ? "w-[300px]"
      : "w-[260px]"
    : isMobile
    ? isWide
      ? "w-[170px]"
      : "w-[145px]"
    : isWide
    ? "w-[300px]"
    : "w-[200px]";

  const cardHeight = isFocused
    ? isWide
      ? "h-[240px]"
      : "h-[380px]"
    : isMobile
    ? isWide
      ? "h-[125px]"
      : "h-[170px]"
    : isWide
    ? "h-[200px]"
    : "h-[270px]";

  const handleInteraction = (e) => {
    e.stopPropagation();
    if (isFocused) return;
    setIsActive(true);
    onActive();
  };

  let cardAnimate;
  if (isFocused) {
    cardAnimate = { scale: 1, rotate: 0, opacity: 1, x: 0, y: 0 };
  } else if (isMobile) {
    cardAnimate = {
      scale: 1,
      rotate: project.rotate,
      opacity: isActiveInParent ? 0 : isBlurred ? 0.35 : 1,
      filter: isBlurred ? "blur(4px)" : "blur(0px)",
    };
  } else {
    cardAnimate = {
      rotate: isActive ? 0 : project.rotate,
      scale: isActive ? 1.4 : 1,
      y: isActive ? -10 : 0,
      x: 0,
    };
  }

  const mediaStyles = `w-full h-full object-cover transition-all duration-500 ${
    isActive
      ? "grayscale-0 opacity-100"
      : "grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-40"
  }`;

  // En grille mobile (pas focus), on affiche juste la date, pas l'ID
  const showId = !isMobile || isFocused;

  return (
    <motion.div
      onHoverStart={!isMobile ? handleInteraction : undefined}
      onHoverEnd={!isMobile ? () => setIsActive(false) : undefined}
      onClick={handleInteraction}
      animate={cardAnimate}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`relative ${
        isFocused ? "cursor-default" : "cursor-pointer"
      } bg-white p-2 pb-7 md:p-3 md:pb-12 shadow-2xl border border-black/5 origin-center group ${cardWidth} ${cardHeight}`}
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
          <img src={project.media} alt={project.title} className={mediaStyles} />
        )}

        {!isActive && (
          <div className="absolute top-1 right-1 z-20 rounded-md border border-white/10 bg-white/10 backdrop-blur-md p-1">
            <Hand className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-white/90" strokeWidth={2.2} />
          </div>
        )}

        <div
          className={`absolute inset-0 flex flex-col justify-center items-center text-center bg-black/70 backdrop-blur-[2px] transition-opacity duration-300 overflow-y-auto ${
            isFocused ? "p-5" : "p-2 md:p-3"
          } ${isActive ? "opacity-100" : "opacity-0"}`}
        >
          <h3
            className={`text-white font-cartoon uppercase -rotate-1 drop-shadow-lg leading-tight ${
              isFocused ? "text-2xl mb-3" : "text-base md:text-xl mb-1 md:mb-2"
            }`}
          >
            {project.title}
          </h3>
          <div className={isFocused ? "space-y-4" : "space-y-1 md:space-y-3"}>
            <div>
              <p
                className={`text-yellow-400 font-black uppercase ${
                  isFocused ? "text-xs" : "text-[7px] md:text-[9px]"
                }`}
              >
                Objectif :
              </p>
              <p
                className={`text-white text-center font-cartoon font-light leading-snug ${
                  isFocused ? "text-sm" : "text-[7px] md:text-[10px]"
                }`}
              >
                {project.purpose}
              </p>
            </div>
            <div>
              <p
                className={`text-cyan-400 font-black uppercase ${
                  isFocused ? "text-xs" : "text-[7px] md:text-[9px]"
                }`}
              >
                Stack :
              </p>
              <p
                className={`text-white/90 font-medium ${
                  isFocused ? "text-sm" : "text-[8px] md:text-[10px]"
                }`}
              >
                {project.how}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1 md:bottom-2 left-0 w-full px-2 md:px-3 flex justify-between items-center">
        <span
          className={`text-black/80 font-cartoon -rotate-2 ${
            isFocused ? "text-lg" : "text-xs md:text-lg"
          }`}
        >
          {project.date}
        </span>
        {showId && (
          <div
            className={`flex flex-col items-end opacity-30 font-mono text-black ${
              isFocused ? "scale-100" : "scale-75 md:scale-100"
            }`}
          >
            <span className="text-[5px] md:text-[6px] font-black uppercase tracking-wider">
              MNDR Archive
            </span>
            <span className="text-[7px] md:text-[8px] font-bold">ID: {project.id}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}