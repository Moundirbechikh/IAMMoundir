
  import { motion } from "framer-motion";
  import { useState } from "react";
  import { ArrowUpRight, X } from "lucide-react";
  
  export default function ProjectCard({ project, index, isActive, isBlurred, onClick }) {
    const [hovered, setHovered] = useState(false);
  
  // Nouvelles positions basées exactement sur tes rectangles blancs (plus grandes et mieux réparties)
  const positions = [
    { top: "19%", left: "25%", rotate: -6 }, // 0: Haut Gauche (MaResturant)
    { top: "18%", left: "75%", rotate: 5 },  // 1: Haut Droite (RecommendIT)
    { top: "52%", left: "48%", rotate: 2 }, // 2: Centre (MyNewLife)
    { top: "85%", left: "28%", rotate: -3 },  // 3: Bas Gauche (MyNewStyle)
    { top: "85%", left: "76%", rotate: -2 }, // 4: Bas Droite (UniCheck)
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
          boxShadow: isActive ? `0 0 80px 15px ${project.accent}70` : "0 25px 50px -12px rgba(0,0,0,0.5)",
        }}
        transition={{ type: "spring", stiffness: 50, damping: 14 }}
        className={`absolute overflow-hidden flex flex-col group ${
          isActive ? "bg-black rounded-xl border border-white/20" : "bg-black border-2 border-[#222] cursor-pointer"
        }`}
        style={{ minWidth: isActive ? "600px" : "300px" }}
      >
        {isActive ? (
          <>
            {/* BARRE DE NAVIGATEUR */}
            <div className="h-12 bg-[#2d2d2d] flex items-center px-4 justify-between shrink-0 border-b border-black/50">
              {/* GAUCHE : Boutons macOS + URI collé à côté */}
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
  
              {/* DROITE : Bouton Fermer */}
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
  
            {/* VIDÉO / IMAGE */}
            <div className="relative flex-1 bg-[#111] w-full overflow-hidden">
               {project.video ? (
                  <video
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={project.video}
                    autoPlay loop muted
                    className="absolute inset-0 w-full h-full object-cover"
                  />
               ) : (
                  <img src={project.poster} className="absolute inset-0 w-full h-full object-cover" alt="" />
               )}
            </div>
  
            {/* BARRE D'INFORMATIONS */}
            <div className="h-24 shrink-0 flex items-center px-6" style={{ backgroundColor: project.accent }}>
               <div className="w-14 h-14 bg-white rounded-md p-1.5 shadow-md flex-shrink-0 mr-4">
                 <img src={project.logo} className="w-full h-full object-contain" alt="logo" />
               </div>
               
               <div className="flex flex-col text-white flex-1 overflow-hidden">
                  {/* POLICE DYNAMIQUE */}
                  <h3 
                    className="text-3xl tracking-tight leading-none truncate" 
                    style={{ fontFamily: project.font, color: project.titleColor || "#fff" }}
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
          /* VUE INACTIVE */
          <>
            <img src={project.poster} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
  
            <div className="absolute top-2 left-2 w-10 h-10 bg-white p-1.5 shadow-lg">
              <img src={project.logo} className="w-full h-full object-contain" alt="" />
            </div>
  
            {/* POLICE DYNAMIQUE */}
            <h3 
              className="absolute bottom-2 left-3 right-2 text-white text-2xl tracking-tight leading-none pointer-events-none drop-shadow-md"
              style={{ fontFamily: project.font, color: project.titleColor || "#fff" }}
            >
              {project.title}
            </h3>
  
            {/* EFFET HOVER "BÂTON" */}
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
                    style={{ backgroundColor: project.accent }}
                  />
                  <span className="relative z-10 text-white font-black uppercase text-sm tracking-wide">
                    Voir le projet
                  </span>
                </div>
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    );
  }