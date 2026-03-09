import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Terminal, Cpu, Layers } from "lucide-react";

const translations = [
  { 
    hi: "Hi, I am", 
    intro: "I don't just write code; I architect digital emotions. Every pixel in this shop is curated to bridge the gap between pure imagination and technical precision." 
  },
  { 
    hi: "Salut, je suis", 
    intro: "Je ne me contente pas d'écrire du code ; j'architecture des émotions numériques. Chaque pixel est pensé pour lier l'imaginaire à la précision technique." 
  },
  { 
    hi: "Hola, soy", 
    intro: "No solo escribo código; arquitecto emociones digitales. Cada píxel en esta tienda está curado para cerrar la brecha entre la imaginación y la precisión." 
  }
];

function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % translations.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#121212] flex flex-col justify-between overflow-hidden h-screen w-full relative font-body">
      
      {/* BLOC DU HAUT (BLANC) - Ajusté pour le mobile */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
        className="bg-white h-fit w-full rounded-br-[60px] md:rounded-br-[120px] border-b-4 border-black p-4 pt-24 md:pt-32 relative z-10"
      >
        {/* LE MESSAGE D'ACCUEIL - Plus réactif sur mobile */}
        <div className="absolute top-10 md:top-14 left-6 md:left-24 z-20 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className="text-white text-4xl md:text-7xl font-black uppercase tracking-tighter"
              style={{ textShadow: "-1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000" }}
            >
              {translations[index].hi}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.h1 
  className="font-cartoon text-start text-black uppercase select-none"
>
  {/* --- FORMAT PHONE (Celui qu'on a créé pour être imposant) --- */}
  <div className="flex flex-col md:hidden leading-[0.8] ">
    <span className="text-[36vw] tracking-tighter break-all">
      Moun
    </span>
    <span className="text-[36vw] tracking-tighter mt-[-1.3vh]">
      dir
    </span>
  </div>

  {/* --- TON ANCIEN CODE (Strictement identique pour le PC) --- */}
  <div className="hidden md:block text-[18vw] leading-[0.75] break-all">
    Moundir
  </div>
</motion.h1>
      </motion.div>

      {/* CONTENU BAS */}
      <div className="flex-1 flex flex-col items-end justify-center px-6 md:px-10 space-y-6 md:space-y-8">
        
        {/* TEXTE D'INTRO */}
        <div className="max-w-xl min-h-[120px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.p 
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-white text-right text-base md:text-2xl font-light leading-snug italic opacity-80"
            >
              {translations[index].intro}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* BARRE D'ACTION */}
        <div className="flex items-center gap-3 md:gap-4">
          <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            className="text-yellow-400 p-2 md:p-3 border-2 border-yellow-400/30 rounded-full bg-yellow-400/5"
          >
            {index === 0 && <Terminal size={28} />}
            {index === 1 && <Cpu size={28} />}
            {index === 2 && <Layers size={28} />}
          </motion.div>

          <motion.a
  href="#about"
  whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
  whileTap={{ scale: 0.95 }}
  className="inline-block border-2 border-white text-white px-6 md:px-10 py-3 rounded-full uppercase font-black text-xs md:text-sm tracking-[0.2em] md:tracking-[0.4em] transition-all cursor-pointer"
>
  About Me
</motion.a>
        </div>

      </div>
    </section>
  );
}

export default Hero;