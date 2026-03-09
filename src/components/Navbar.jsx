import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Acceuil", href: "#hero" },
  { name: "Projects", href: "#projects" },
  { name: "À Propos", href: "#about" },
  { name: "Contact", href: "#contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-[100] flex justify-center items-start p-4 md:p-0 pointer-events-none font-body">
      
      {/* --- VERSION DESKTOP --- */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="hidden md:flex pointer-events-auto bg-black border-x border-b border-white/10 px-8 py-3 rounded-b-[32px] items-center gap-8 shadow-2xl shadow-black/60"
      >
        <ul className="flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <motion.li key={index} whileHover={{ scale: 1.05 }} className="relative group">
              <a href={link.href} className="text-white/70 hover:text-white text-[11px] uppercase font-bold tracking-[0.2em] transition-colors">
                {link.name}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* LE BOUTON DYNAMIQUE */}
        <motion.button 
          whileHover={{ width: "180px", borderRadius: "40px" }}
          className="relative group flex items-center justify-center bg-white text-black h-12 w-12 rounded-full transition-all duration-500 ease-[0.23,1,0.32,1] pointer-events-auto overflow-hidden shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
        >
          {/* CONTENU AU HOVER : Hire Me + Smiley N&B */}
          <a 
  href="#contact" 
  className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-sm cursor-pointer"
>
  <span className="font-black uppercase text-[10px] tracking-widest whitespace-nowrap text-white">
    Hire Me
  </span>
  <span className="text-xl grayscale group-hover:grayscale-0 transition-all">😉</span>
</a>
          
          {/* EMOJI DE DÉPART (Appel au clic) */}
          <span className="text-xl group-hover:opacity-0 transition-opacity duration-300">
          👇
          </span>
        </motion.button>
      </motion.nav>

      {/* --- VERSION MOBILE (À DROITE & COMPACT) --- */}
      <div className="md:hidden flex flex-col items-end w-full px-2">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="pointer-events-auto bg-black border border-white/20 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl z-[110]"
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={20} /> : <span className="text-xl grayscale"><Menu size={20} /></span>}
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              className="pointer-events-auto absolute top-20 right-4 w-48 bg-black/95 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 flex flex-col gap-6 shadow-2xl"
            >
              <ul className="flex flex-col gap-4 items-end pr-2">
                {navLinks.map((link, index) => (
                  <motion.li key={index} onClick={() => setIsOpen(false)}>
                    <a href={link.href} className="text-white/80 text-xs uppercase font-black tracking-widest hover:text-white">
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <button className="bg-white text-black py-3 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                Hire Me <span className="grayscale">😉</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Navbar;