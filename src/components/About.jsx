import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Server, Layout, Database, PenTool, Terminal, Fingerprint, Globe } from "lucide-react";

// Logos noirs par défaut, couleurs réelles au survol
const languages = [
  { name: "JS", color: "#F7DF1E", textColor: "#000", icon: "https://cdn.simpleicons.org/javascript/000" },
  { name: "React", color: "#61DAFB", textColor: "#000", icon: "https://cdn.simpleicons.org/react/000" },
  { name: "Node JS", color: "#339933", textColor: "#fff", icon: "https://cdn.simpleicons.org/nodedotjs/000" },
  { name: "Python", color: "#3776AB", textColor: "#fff", icon: "https://cdn.simpleicons.org/python/000" },
  { 
    name: "Java", 
    color: "#ED8B00", 
    textColor: "#fff", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" 
  },
  { name: "PHP", color: "#777BB4", textColor: "#fff", icon: "https://cdn.simpleicons.org/php/000" },
  { name: "MySQL", color: "#4479A1", textColor: "#fff", icon: "https://cdn.simpleicons.org/mysql/000" },
  { name: "MongoDB", color: "#47A248", textColor: "#fff", icon: "https://cdn.simpleicons.org/mongodb/000" },
  // NOUVEAUX AJOUTS
  { name: "HTML5", color: "#E34F26", textColor: "#fff", icon: "https://cdn.simpleicons.org/html5/000" },
  { name: "CSS3", color: "#1572B6", textColor: "#fff", icon: "https://cdn.simpleicons.org/css/000" },
  { name: "Tailwind", color: "#06B6D4", textColor: "#fff", icon: "https://cdn.simpleicons.org/tailwindcss/000" },
  { name: "Supabase", color: "#3ECF8E", textColor: "#000", icon: "https://cdn.simpleicons.org/supabase/000" }
];

const aboutTranslations = [
  { 
    title: "More about me", 
    job: "Web Systems Architect",
    desc: "I architect high-performance digital solutions with a focus on Web ecosystems. Master 2 student pushing technical logic to its peak.",
    tags: [
        { name: "Frontend", icon: <Layout size={14}/> },
        { name: "Backend", icon: <Server size={14}/> },
        { name: "Database", icon: <Database size={14}/> },
        { name: "UI/UX", icon: <PenTool size={14}/> }
    ]
  },
  { 
    title: "Plus sur moi", 
    job: "Architecte Systèmes Web",
    desc: "J'architecture des solutions numériques haute performance, spécialisé dans les écosystèmes Web. Étudiant en Master 2 poussant la logique technique à son paroxysme.",
    tags: [
        { name: "Frontend", icon: <Layout size={14}/> },
        { name: "Backend", icon: <Server size={14}/> },
        { name: "Base de données", icon: <Database size={14}/> },
        { name: "UI/UX", icon: <PenTool size={14}/> }
    ]
  },
  { 
    title: "Más sobre mí", 
    job: "Arquitecto de Sistemas Web",
    desc: "Arquitecto soluciones digitales de alto rendimiento con enfoque en ecosistemas Web. Estudiante de Maestría 2 llevando la lógica técnica a la cima.",
    tags: [
        { name: "Frontend", icon: <Layout size={14}/> },
        { name: "Backend", icon: <Server size={14}/> },
        { name: "Base de Datos", icon: <Database size={14}/> },
        { name: "UI/UX", icon: <PenTool size={14}/> }
    ]
  }
];

function About() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % aboutTranslations.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = aboutTranslations[index];

  return (
    <section id="about" className="min-h-screen w-full bg-[#050505] flex items-center justify-center py-24 overflow-hidden relative border-t border-white/5 font-body">
      
      {/* Subtle Yellow Glow in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        
{/* --- CÔTÉ GAUCHE : ID CARD 3D --- */}
<div className="perspective-2000 flex justify-center lg:justify-start">
  <motion.div 
    initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
    viewport={{ once: true }}
    // On ajoute whileTap pour copier le hover sur mobile
    whileHover={{ rotateY: 12, rotateX: -5, scale: 1.02 }}
    whileTap={{ rotateY: 12, rotateX: -5, scale: 0.98 }} 
    transition={{ type: "spring", stiffness: 80, damping: 15 }}
    className="relative w-[350px] md:w-[420px] bg-white rounded-[3rem] p-1 shadow-[0_40px_100px_rgba(0,0,0,0.8)] group touch-none"
  >
    <div className="relative bg-[#ffffff] rounded-[2.9rem] h-full p-8 flex flex-col overflow-hidden">
      
      {/* Header Badge */}
      <div className="flex justify-between items-start mb-10">
        <div className="p-3 bg-black rounded-2xl shadow-lg border border-yellow-500/20">
            <Fingerprint className="text-yellow-500" size={26} />
        </div>
        <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">Auth. System</p>
            <p className="text-xs font-mono font-bold text-black uppercase">MNDR.WEB.22</p>
        </div>
      </div>

      {/* CORE LANGUAGES GRID */}
      <div className="mb-2">
        <p className="text-[8px] font-black uppercase tracking-[0.5em] text-black/20 mb-5 text-center">Core Stack</p>
        <div className="grid grid-cols-4 gap-4">
            {languages.map((lang) => (
                <motion.div 
                    key={lang.name}
                    // Le whileTap permet de voir la couleur au clic sur phone
                    whileHover={{ 
                        y: -8, 
                        scale: 1.15,
                        backgroundColor: lang.color,
                        boxShadow: `0 10px 20px ${lang.color}44`
                    }}
                    whileTap={{ scale: 0.95, backgroundColor: lang.color }}
                    className="relative aspect-square flex items-center justify-center rounded-2xl bg-black/[0.04] border border-black/[0.05] cursor-pointer transition-colors duration-300 group/item"
                >
                    <img 
                        src={lang.icon} 
                        className="w-7 h-7 object-contain transition-all duration-300 group-hover/item:invert group-hover/item:brightness-200" 
                        alt={lang.name} 
                    />
                    
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover/item:opacity-100 transition-all pointer-events-none">
                        <span className="text-[8px] font-black uppercase text-white bg-black px-2 py-1 rounded shadow-xl">{lang.name}</span>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>

      {/* ARCHITECTURE FIELDS */}
      <div className="space-y-3 mb-2">
         <p className="text-[8px] font-black uppercase tracking-[0.5em] text-black/20 mb-4 text-center">Expertise Fields</p>
         <div className="grid grid-cols-2 gap-3">
            {current.tags.map((tag, i) => (
                <motion.div 
                    key={i} 
                    whileHover={{ 
                        scale: 1.05, 
                        borderColor: "#EAB308", 
                        backgroundColor: "#fafafa"
                    }}
                    whileTap={{ scale: 0.98, borderColor: "#EAB308" }}
                    className="flex items-center justify-center gap-3 bg-black/[0.03] py-3.5 px-4 rounded-2xl transition-all duration-300 cursor-default border border-transparent group/tag shadow-sm"
                >
                    <span className="text-black group-hover/tag:text-yellow-600 transition-colors">{tag.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-black/80 group-hover/tag:text-black">{tag.name}</span>
                </motion.div>
            ))}
         </div>
      </div>

      {/* Barcode Footer */}
      <div className="mt-auto pt-2 border-t border-black/5 flex flex-col items-center">
          <div className="h-8 w-full opacity-70 bg-[url('https://www.cognex.com/api/SiteCore/Barcode/Get?data=MOUNDIR22&type=Code128&width=300&height=50&imagetype=Png')] bg-repeat-x grayscale contrast-200" />
          <div className="flex justify-between w-full mt-4">
              <span className="text-[9px] font-mono font-bold text-black/30">ARCHITECT.M2</span>
              <span className="text-[9px] font-mono font-bold text-black/30">© 2024-2026</span>
          </div>
      </div>

    </div>
  </motion.div>
</div>

        {/* --- CÔTÉ DROIT : CONTENU --- */}
        <div className="flex flex-col text-center lg:text-right items-center lg:items-end">
          
          <div className="inline-flex items-center gap-3 mb-10 bg-yellow-500/5 px-6 py-2.5 rounded-full border border-yellow-500/20 backdrop-blur-md">
            <Terminal className="text-yellow-500" size={16} />
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-yellow-500 font-mono text-xs uppercase tracking-[0.5em] font-bold"
              >
                {current.job}
              </motion.span>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.h2 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="text-7xl md:text-[100px] font-cartoon text-white uppercase leading-[0.8] mb-12 tracking-tighter"
            >
              {current.title.split(' ')[0]} <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>
                 {current.title.split(' ').slice(1).join(' ')}
              </span>
            </motion.h2>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="max-w-xl"
            >
                <p className="text-white/50 text-xl md:text-3xl leading-snug font-light italic mb-8 border-r-4 border-yellow-500/30 pr-6">
                    "{current.desc}"
                </p>
                <div className="flex justify-center lg:justify-end items-center gap-6">
                    <Globe className="text-yellow-500/20" size={20} />
                    <span className="text-[11px] font-black uppercase text-yellow-500 tracking-[1.2em]">Moundir</span>
                </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      <style jsx>{`
        .perspective-2000 {
          perspective: 2000px;
        }
      `}</style>
    </section>
  );
}

export default About;