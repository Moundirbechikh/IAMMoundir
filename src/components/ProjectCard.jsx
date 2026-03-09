import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  
  const randomRotation = index % 2 === 0 ? -1 : 1;

  useEffect(() => {
    const checkRes = () => setIsMobileView(window.innerWidth < 1024);
    checkRes();
    window.addEventListener("resize", checkRes);
    return () => window.removeEventListener("resize", checkRes);
  }, []);

  // Les assets changent dynamiquement (Lime/Purple) grâce au parent
  const currentImg = isMobileView ? project.assets.phoneImg : project.assets.backImg;
  const currentVid = isMobileView ? project.assets.phoneVid : project.assets.backVid;

  return (
    <div className={`relative w-full flex ${index % 2 === 0 ? "justify-start" : "justify-end"} mb-12 md:mb-16 px-4`}> 
      <motion.div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => isMobileView && setIsHovered(!isHovered)}
        animate={{ 
            rotate: isHovered ? 0 : randomRotation,
            zIndex: isHovered ? 50 : 10
        }}
        /* items-stretch aligne parfaitement le rectangle de détails avec le média */
        className={`relative flex items-stretch transition-all duration-300 shadow-2xl ${
          isMobileView ? "flex-col items-center w-full" : "flex-row w-fit"
        }`}
      >
        {/* SECTION MÉDIA */}
        <div className={`relative flex-shrink-0 overflow-hidden bg-black z-20 transition-all duration-500 ${
          /* DESKTOP : Format Cinématique (16/7)
             PHONE : Format Portrait Smartphone (9/16) - On réduit la largeur à 280px pour simuler un téléphone
          */
          isMobileView 
            ? "w-[280px] aspect-[9/16] rounded-[2rem] border-[6px] border-[#1a1a1a]" 
            : "w-[600px] xl:w-[750px] aspect-[16/7]"
        }`}>
          <video
            key={currentVid} // Force le reload quand on switch entre Lime et Purple
            src={currentVid}
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <img 
            src={currentImg} 
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${isHovered && currentVid ? "opacity-0" : "opacity-100"}`}
          />
          
          {/* Logo */}
          <div className="absolute top-4 left-4 w-10 h-10 bg-white p-2 z-30 shadow-lg">
              <img src={project.assets.logo} className="w-full h-full object-contain" alt="logo" />
          </div>

          {!isHovered && (
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent">
                 <h3 className="text-white text-xl md:text-2xl font-cartoon uppercase tracking-tight">{project.title}</h3>
            </div>
          )}
        </div>

        {/* SECTION DÉTAILS - RECTANGLE SOLIDE */}
        <motion.div 
          initial={false}
          animate={
              isHovered 
              ? (isMobileView ? { height: "auto", width: "280px", opacity: 1, marginTop: "10px" } : { width: "320px", opacity: 1 })
              : (isMobileView ? { height: 0, width: "280px", opacity: 0, marginTop: "0px" } : { width: 0, opacity: 0 })
          }
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          style={{ backgroundColor: project.colors.accent }}
          className="relative overflow-hidden z-10 flex flex-col"
        >
           {/* Texte parfaitement fitté */}
           <div className={`p-6 md:p-8 flex flex-col justify-center h-full ${isMobileView ? "w-full" : "w-[320px]"}`}>
                <h3 
                    className="text-2xl md:text-3xl leading-none mb-3 font-black"
                    style={{ fontFamily: project.font, color: project.colors.titleColor }}
                >
                    {project.title}
                </h3>
                <p className="text-white text-[13px] leading-snug mb-4 font-medium line-clamp-4">
                    {project.desc}
                </p>
                
                <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
                    <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">{project.tech}</span>
                    <a 
                        href={project.link}
                        target="_blank"
                        className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 text-[10px] font-black uppercase w-fit hover:bg-black hover:text-white transition-colors"
                    >
                        View Project <ArrowUpRight size={14} />
                    </a>
                </div>
           </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ProjectCard;