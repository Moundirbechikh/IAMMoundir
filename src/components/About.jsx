import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
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


// --- COMPOSANT AVATAR SÉQUENTIEL ---
function FallingAvatarSequence({ size = "lg" }) {
  const [currentPose, setCurrentPose] = useState(0); // 0: Falling, 1: Crouching, 2: Rising, 3: Salute
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.4 });
  
  const headOuterRef = useRef(null);
  const headPulse = useAnimation();

  // Logique de suivi de tête (exactement celle du Hero)
  useEffect(() => {
    const updateHead = (clientX, clientY) => {
      if (!headOuterRef.current) return;
      const rect = headOuterRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = clientX - centerX;
      const dy = clientY - centerY;

      const maxAngle = 9;
      const maxDist = Math.max(window.innerWidth * 0.25, 220);

      let rotation = -(dx / maxDist) * maxAngle;
      rotation = Math.max(-maxAngle, Math.min(maxAngle, rotation));

      const translateX = dx / 65;
      const translateY = dy / 95;

      headOuterRef.current.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg)`;
    };

    const handleMouseMove = (e) => updateHead(e.clientX, e.clientY);
    const handleClick = (e) => {
      updateHead(e.clientX, e.clientY);
      headPulse.start({ scale: [1, 1.1, 1], transition: { duration: 0.35, ease: "easeOut" } });
    };
    const handleTouch = (e) => {
      const t = e.touches && e.touches[0];
      if (!t) return;
      updateHead(t.clientX, t.clientY);
      headPulse.start({ scale: [1, 1.08, 1], transition: { duration: 0.3, ease: "easeOut" } });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("touchstart", handleTouch, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, [headPulse]);


  // Gestion de la séquence d'animation
  useEffect(() => {
    if (isInView) {
      setCurrentPose(0); // Pose 0 : Tomber
      setTimeout(() => setCurrentPose(1), 500); // Au bout de 0.5s, on s'accroupit
      setTimeout(() => setCurrentPose(2), 1200); // On se lève
      setTimeout(() => setCurrentPose(3), 1600); // Salut militaire final
    } else {
      setCurrentPose(0); // Reset si on scroll en haut
    }
  }, [isInView]);

  // Taille basée sur ta demande
  const sizeClass = size === "lg" ? "w-[12.5rem] md:w-[14.5rem]" : "w-[9rem] md:w-[11rem]";

  // --- SVG Data extraites de NAdir.txt ---

  const svgTomber = (
    <svg viewBox="0 0 639 1241" className="w-full h-auto text-white overflow-visible" fill="currentColor">
      {/* Corps sans la tête */}
      <rect x="164.148" y="375.403" width="311" height="481" rx="30" transform="rotate(-11.3592 164.148 375.403)" />
      <rect x="249.542" y="702.148" width="147" height="251" rx="30" transform="rotate(24.5766 249.542 702.148)" />
      <rect x="442.248" y="470.823" width="99.1167" height="463.458" rx="34.5" transform="rotate(-164.438 442.248 470.823)" />
      <rect x="285.261" y="452.21" width="100.117" height="303.629" rx="35" transform="rotate(143.18 285.261 452.21)" />
      <rect x="405.148" y="742.176" width="147" height="271.492" rx="30" transform="rotate(-23.2503 405.148 742.176)" />
      <rect x="145.148" y="890.879" width="147" height="371.53" rx="30" transform="rotate(-16.0859 145.148 890.879)" />
      <rect x="-2.8515" y="5.67456" width="100.117" height="303.629" rx="35" transform="rotate(-4.8853 -2.8515 5.67456)" />
      <rect x="490.148" y="911.916" width="147" height="274.704" rx="30" transform="rotate(-0.299255 490.148 911.916)" />
      {/* Tête interactive */}
      <g ref={currentPose === 0 ? headOuterRef : null} style={{ transformOrigin: "279px 233px", transition: "transform 0.12s cubic-bezier(.2,.9,.2,1)" }}>
          <motion.ellipse animate={headPulse} cx="279.401" cy="233.208" rx="107" ry="110.5" fill="currentColor" transform="rotate(-10.4403 279.401 233.208)" />
      </g>
    </svg>
  );

  const svgAccroupi = (
    <svg viewBox="0 0 738 1186" className="w-full h-auto text-white overflow-visible" fill="currentColor">
      {/* Corps */}
      <rect x="301" y="221" width="311" height="481" rx="30" />
      <rect x="465" y="665" width="147" height="518" rx="30" />
      <rect x="301.039" y="221" width="100.117" height="253.264" rx="35" transform="rotate(22.0402 301.039 221)" />
      <rect x="32.2133" y="289" width="280" height="111" rx="35" transform="rotate(16.8705 32.2133 289)" />
      <rect x="527" y="273.521" width="100.117" height="238.197" rx="35" transform="rotate(-31.641 527 273.521)" />
      <rect x="465.213" y="306" width="280" height="111" rx="35" transform="rotate(16.8705 465.213 306)" />
      <rect x="301.554" y="656" width="147" height="214" rx="30" transform="rotate(3.63127 301.554 656)" />
      <rect x="288" y="844.261" width="147" height="343.092" rx="35" transform="rotate(-5.56707 288 844.261)" />
      {/* Tête interactive */}
      <g ref={currentPose === 1 ? headOuterRef : null} style={{ transformOrigin: "448px 110px", transition: "transform 0.12s cubic-bezier(.2,.9,.2,1)" }}>
          <motion.ellipse animate={headPulse} cx="448" cy="110.5" rx="107" ry="110.5" fill="currentColor" />
      </g>
    </svg>
  );

  const svgSeLever = (
    <svg viewBox="0 0 548 1073" className="w-full h-auto text-white overflow-visible" fill="currentColor">
       {/* Corps */}
      <rect x="87.1485" y="252.6" width="311" height="481" rx="30" transform="rotate(-11.3592 87.1485 252.6)" />
      <rect x="170.41" y="600.345" width="147" height="251" rx="30" transform="rotate(12.4849 170.41 600.345)" />
      <rect x="304.836" y="238.03" width="99.1167" height="302.972" rx="34.5" transform="rotate(-31.641 304.836 238.03)" />
      <rect x="108.087" y="238.345" width="100.117" height="303.629" rx="35" transform="rotate(22.0402 108.087 238.345)" />
      <rect x="325.148" y="614.054" width="147" height="470.06" rx="30" transform="rotate(-10.0722 325.148 614.054)" />
      <rect x="117.148" y="832.076" width="147" height="251" rx="30" transform="rotate(-16.0859 117.148 832.076)" />
      <rect x="-2.8515" y="488.872" width="100.117" height="303.629" rx="35" transform="rotate(-4.8853 -2.8515 488.872)" />
      <rect x="431.689" y="424.327" width="99.1167" height="211.854" rx="34.5" transform="rotate(-4.8853 431.689 424.327)" />
      {/* Tête interactive */}
      <g ref={currentPose === 2 ? headOuterRef : null} style={{ transformOrigin: "202px 110px", transition: "transform 0.12s cubic-bezier(.2,.9,.2,1)" }}>
          <motion.ellipse animate={headPulse} cx="202.401" cy="110.406" rx="107" ry="110.5" transform="rotate(-10.4403 202.401 110.406)" fill="currentColor" />
      </g>
    </svg>
  );

  const svgSalut = (
    <svg viewBox="0 0 669 1223" className="w-full h-auto text-white overflow-visible" fill="currentColor">
       {/* Corps */}
      <rect x="200.592" y="303.813" width="311" height="481" rx="30" transform="rotate(1.06888 200.592 303.813)" />
      <rect x="192" y="694.33" width="147" height="525.427" rx="30" transform="rotate(-0.908061 192 694.33)" />
      <rect x="322.492" y="442.078" width="100.117" height="417.305" rx="35" transform="rotate(155.95 322.492 442.078)" />
      <rect x="680.378" y="644.51" width="100.117" height="384.567" rx="35" transform="rotate(152.305 680.378 644.51)" />
      <rect x="357" y="747.634" width="147" height="475.545" rx="30" transform="rotate(-1.02665 357 747.634)" />
      
      {/* Tête interactive */}
      <g ref={currentPose === 3 ? headOuterRef : null} style={{ transformOrigin: "360px 192px", transition: "transform 0.12s cubic-bezier(.2,.9,.2,1)" }}>
          <motion.ellipse animate={headPulse} cx="360.252" cy="192.06" rx="107" ry="110.5" transform="rotate(-10.4403 360.252 192.06)" fill="currentColor"/>
      </g>
    </svg>
  );

  return (
    <div ref={containerRef} className={`absolute bottom-[5%] right-[0.6%] ${sizeClass} z-30 pointer-events-none`}>
      <AnimatePresence mode="wait">
        
        {currentPose === 0 && (
          <motion.div 
            key="tomber" 
            initial={{ y: -800, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.5, ease: "easeIn" }}
          >
            {svgTomber}
          </motion.div>
        )}
        
        {currentPose === 1 && (
          <motion.div key="accroupi" initial={{ opacity: 0, scaleY: 0.7 }} animate={{ opacity: 1, scaleY: 1 }} exit={{ opacity: 0 }}>
            {svgAccroupi}
          </motion.div>
        )}

        {currentPose === 2 && (
          <motion.div key="lever" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {svgSeLever}
          </motion.div>
        )}

        {currentPose === 3 && (
          <motion.div key="salut" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            {svgSalut}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}


// --- COMPOSANT PRINCIPAL ABOUT ---
export default function About() {
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
            whileHover={{ rotateY: 12, rotateX: -5, scale: 1.02 }}
            whileTap={{ rotateY: 12, rotateX: -5, scale: 0.98 }} 
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="relative w-[350px] md:w-[420px] bg-white rounded-[3rem] p-1 shadow-[0_40px_100px_rgba(0,0,0,0.8)] group touch-none z-10"
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
                            
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover/item:opacity-100 transition-all pointer-events-none z-20">
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
        <div className="flex flex-col text-center lg:text-right items-center lg:items-end z-10">
          
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

      {/* COMPOSANT AVATAR ANIMÉ SUR LA DROITE, EN BAS DE L'ÉCRAN */}
      <FallingAvatarSequence size="lg" />

      <style jsx>{`
        .perspective-2000 {
          perspective: 2000px;
        }
      `}</style>
    </section>
  );
}