import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import { useFullPageScroll } from "./hooks/useFullPageScroll";
import { useIsDesktop } from "./hooks/useIsDesktop";

// On définit ici uniquement ce qu'on veut afficher
const sections = [
  { id: "hero", label: "Accueil", Component: Hero, color: "#ffffff", text: "dark" },
  { id: "about", label: "Qui suis-je", Component: About, color: "#facc15", text: "dark" },
];

function App() {
  const isDesktop = useIsDesktop();
  const { index, goTo } = useFullPageScroll(sections.length);

  return (
    <div className="relative w-full h-dvh overflow-hidden bg-[#050505] selection:bg-yellow-500 selection:text-black">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&family=Inter:wght@300;400;600&family=Noto+Sans+Arabic:wght@400;700&display=swap');
          .font-display { font-family: 'Manrope', sans-serif; }
          .font-body { font-family: 'Inter', 'Noto Sans Arabic', sans-serif; }
          .glass-effect { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.3); }
          .scrollbar-none::-webkit-scrollbar { display: none; }
          .scrollbar-none { scrollbar-width: none; -ms-overflow-style: none; }
        `}
      </style>

      <Navbar sections={sections} activeIndex={index} onNavigate={goTo} isDesktop={isDesktop} />

      <motion.main
        className="flex flex-col w-full h-full"
        animate={{ y: `-${index * 100}%` }}
        transition={{ type: "spring", stiffness: 220, damping: 32, mass: 1 }}
      >
        {sections.map(({ id, Component, className = "" }, i) => (
          <section key={id} id={id} className={`w-full h-dvh flex-shrink-0 ${className}`}>
            <motion.div
              className="h-full w-full"
              animate={{
                opacity: i === index ? 1 : 0.35,
                scale: i === index ? 1 : 0.96,
                filter: i === index ? "blur(0px)" : "blur(2px)",
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Component />
            </motion.div>
          </section>
        ))}
      </motion.main>
    </div>
  );
}

export default App;