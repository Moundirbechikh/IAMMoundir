import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#080808] text-white py-12 px-6 border-t border-white/10 overflow-hidden">
      {/* TEXTE DE FOND GÉANT (Rappel du style Archive) */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none select-none overflow-hidden leading-none opacity-[0.02]">
        <h2 className="text-[15vw] font-cartoon uppercase whitespace-nowrap">
          Creative / Developer / Creative / Developer
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
          
          {/* COLONNE 1 : LOGO & STATUS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />
              <span className="font-mono text-sm tracking-tighter uppercase">System_Status: Online</span>
            </div>
            <h3 className="text-4xl font-cartoon uppercase tracking-tight">
              MNDR<span className="text-yellow-500">.</span>
            </h3>
            <p className="text-gray-500 font-mono text-xs max-w-[250px] leading-relaxed">
              Propulsé par la créativité et le café. <br /> 
              Basé en Algérie, disponible partout.
            </p>
          </div>

          {/* COLONNE 2 : NAVIGATION RAPIDE */}
          <div className="grid grid-cols-2 gap-4 font-cartoon">
            <div className="flex flex-col gap-2">
              <span className="text-yellow-500 font-mono text-[10px] uppercase tracking-widest mb-2">// Nav</span>
              {["projects", "contact", "about"].map((item) => (
                <a key={item} href={`#${item}`} className="text-sm text-gray-400 hover:text-white transition-colors w-fit">
                  {item}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2">
  <span className="text-cyan-500 font-mono text-[10px] uppercase tracking-widest mb-2">// Social</span>
  {[
    { name: "GitHub", url: "https://github.com/Moundirbechikh/MyNewLife" },
    { name: "Instagram", url: "https://www.instagram.com/moundir_bech?igsh=c25yaGl3dGM5NTFz" } // Remplace par ton vrai lien
  ].map((item) => (
    <a 
      key={item.name} 
      href={item.url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-sm text-gray-400 hover:text-white transition-colors w-fit"
    >
      {item.name}
    </a>
  ))}

           </div>
</div>
          {/* COLONNE 3 : CALL TO ACTION */}
          <div className="flex flex-col items-start md:items-end gap-6">
            <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">// Prêt pour la suite ?</span>
            <motion.a
              href="mailto:moundirbechikh03@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black font-cartoon uppercase text-lg hover:bg-yellow-500 transition-colors shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none"
            >
              Travaillons Ensemble
            </motion.a>
          </div>
        </div>

        {/* LIGNE DE FIN (COPYRIGHT) */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-gray-600 uppercase tracking-[0.3em]">
          <p>© {currentYear} MNDR - Tous droits réservés</p>
          <div className="flex gap-6">
            <span>Lat: 36.75 // Long: 3.05</span>
            <span className="text-white/20">End_Of_Transmission</span>
          </div>
        </div>
      </div>
    </footer>
  );
}