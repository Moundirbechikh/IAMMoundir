import ProjectCard from "./ProjectCard";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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
// Assets LIME (Garçon)
import backve from "../assets/back.jpg"; 
import backveVid from "../assets/backve.mp4";
import phoneve from "../assets/phoneve.jpg";
import phoneveVid from "../assets/phoneve.mp4";

// Assets PURPLE (Fille)
import backv from "../assets/backv.jpg"; 
import backvVid from "../assets/backv.mp4";
import phonev from "../assets/phonev.jpg";
import phonevVid from "../assets/phonev.mp4";

// Assets PROJET 04 (GREEN TECH)
import back5 from "../assets/back5.jpg"; 
import logo4 from "../assets/logo4.png";
import back4Vid from "../assets/back4.mp4";
import back41 from "../assets/back4-1.jpg";
import back42 from "../assets/back4-2.jpg"; // Si c'est un mp4
import back43 from "../assets/back4-3.jpg";
import back44 from "../assets/back4-4.jpg";
// Si c'est un mp4

const translations = [
  { text: "Live Projects", lang: "EN" },
  { text: "Projets EnLigne", lang: "FR" },
  { text: "Proyectos Online", lang: "ES" }
];

function ProjectsHolder() {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  
  // États pour les animations cycliques
  const [isPurpleMode, setIsPurpleMode] = useState(false);
  const [greenCycle, setGreenCycle] = useState(0); // 0, 1, 2 pour alterner back4_1, 4_2, 4_3

  const { scrollYProgress } = useScroll({ target: containerRef });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % translations.length);
      setIsPurpleMode((prev) => !prev);
      setGreenCycle((prev) => (prev + 1) % 3); // Alterne entre les 3 images/vidéos du projet 4
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Logique pour le projet 04 (Green Cycle)
  const greenAccents = ["#22c55e", "#10b981", "#84cc16", "#14b8a6"]; // green, emerald, lime, teal
  const greenBacks = [back5,back41,back43,back44]; // Images


  const projects = [
    {
      id: "01",
      title: "MaResturant",
      tech: "React / Node.js / MongoDB",
      desc: "Luxury gastronomy portal featuring an immersive workflow and red-accentuated design.",
      link: "https://ma-resturant.vercel.app/",
      font: "cursive",
      colors: { accent: "#b91c1c", titleColor: "#000" },
      assets: { logo: logo1, backImg: back1, backVid: back1Vid, phoneImg: phone1, phoneVid: phone1Vid }
    },
    {
      id: "02",
      title: "RecommandIT",
      tech: "Python / Node.js / React / MangoDB",
      desc: "A movie recommendation engine utilizing machine learning and a stone-white interface.",
      link: "https://recommand-it.vercel.app/",
      font: "'Parisienne', cursive",
      colors: { accent: "#1e293b", titleColor: "#fff" },
      assets: { logo: logo2, backImg: back2, backVid: back2Vid, phoneImg: phone2, phoneVid: phone2Vid }
    },
    {
      id: "03",
      title: "MyNewLife",
      tech: "Fullstack / React / Node.js / MongoDB",
      desc: "Architecting a better future through digital organization and lifestyle management.",
      link: "https://my-new-life-blond.vercel.app/",
      font: "'Lobster', cursive",
      colors: { 
        accent: isPurpleMode ? "#6b21a8" : "#365314", 
        titleColor: "#fff" 
      },
      assets: { 
        logo: logo3, 
        backImg: isPurpleMode ? backv : backve, 
        backVid: isPurpleMode ? backvVid : backveVid, 
        phoneImg: isPurpleMode ? phonev : phoneve, 
        phoneVid: isPurpleMode ? phonevVid : phoneveVid 
      }
    },
    {
      id: "04",
      title: "MyNewStyle",
      tech: "Next.js / Tailwind / Framer Motion",
      desc: "A sustainable tech interface exploring fluid transitions between green environments.",
      link: "#",
      font: "cursive",
      colors: { 
        accent: greenAccents[greenCycle % 4], // Alterne entre les 4 nuances de vert
        titleColor: "#fff" 
      },
      assets: { 
        logo: logo4, // Tu peux changer par un logo spécifique
        backImg: greenBacks[greenCycle], 
        backVid: back4Vid,
        phoneImg: back41, // Pas de phone spécifique, on réutilise une image green
        phoneVid: null 
      }
    }
  ];

  return (
    <section ref={containerRef} id="projects" className="min-h-screen w-full bg-[#0a0a0a] py-24 px-6 relative overflow-hidden">
      
      {/* BACKGROUND TEXT */}
      <div className="absolute inset-0 flex flex-col items-center pointer-events-none select-none z-0">
        <motion.div style={{ y: yBg }} className="flex flex-col">
          {[...Array(10)].map((_, i) => (
            <h2 key={i} className="text-[40vw] font-black uppercase text-white/[0.01] leading-[0.75]">
              PROJECTS
            </h2>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 container mx-auto">
        {/* HEADER SECTION */}
        <div className="mb-24 flex justify-between items-end border-b border-white/5 pb-8">
          <AnimatePresence mode="wait">
            <motion.h2 
              key={index} 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: 20 }}
              className="text-6xl md:text-9xl font-cartoon text-white uppercase leading-none"
            >
              {translations[index].text.split(' ')[0]} <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>
                {translations[index].text.split(' ')[1]}
              </span>
            </motion.h2>
          </AnimatePresence>
          <div className="flex flex-col items-end">
             <span className="text-yellow-500 font-mono text-xs tracking-widest mb-1">MNDR // SYSTEM</span>
             <span className="text-white/40 font-mono text-sm tracking-tighter uppercase">{translations[index].lang}</span>
          </div>
        </div>

        {/* LISTE DES PROJETS */}
        <div className="flex flex-col w-full">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsHolder;