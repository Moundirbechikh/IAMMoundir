import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ProjectsHolder from "./components/ProjectsHolder";
import ArchiveHolder from "./components/ArchiveHolder";
import Contact from "./components/Contact";
import Evolution from "./components/Evolution";
import { useFullPageScroll } from "./hooks/useFullPageScroll";
import { useIsDesktop } from "./hooks/useIsDesktop";

const sections = [
  { id: "hero", label: "Accueil", Component: Hero, color: "#ffffff", text: "dark" },
  { id: "about", label: "Qui suis-je", Component: About, color: "#facc15", text: "dark" },   // jaune, comme la carte "about"
  { id: "projects", label: "Projets", Component: ProjectsHolder, color: "#ef4444", text: "light" }, // rouge, comme la carte "projets"
  { id: "archives", label: "Archives", Component: ArchiveHolder, className: "hidden lg:block", color: "#38bdf8", text: "dark" },
  { id: "evolution", label: "Parcours", Component: Evolution, color: "#22c55e", text: "dark" }, // vert, comme la carte "parcours"
  { id: "contact", label: "Contact", Component: Contact, color: "#ffffff", text: "dark" },
];

function App() {
  const isDesktop = useIsDesktop();
  const { index, goTo } = useFullPageScroll(sections.length);

  return (
    <div
      className={`relative w-full bg-[#050505] selection:bg-yellow-500 selection:text-black ${
        isDesktop ? "h-dvh overflow-hidden" : "min-h-screen"
      }`}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&family=Inter:wght@300;400;600&family=Noto+Sans+Arabic:wght@400;700&display=swap');
          .font-display { font-family: 'Manrope', sans-serif; }
          .font-body { font-family: 'Inter', 'Noto Sans Arabic', sans-serif; }
          .arabic-font { font-family: 'Noto Sans Arabic', sans-serif; }
          .glass-effect { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.3); }

          /* Masque la scrollbar de la navbar quand elle déborde (mobile) */
          .scrollbar-none::-webkit-scrollbar { display: none; }
          .scrollbar-none { scrollbar-width: none; -ms-overflow-style: none; }
        `}
      </style>

      <Navbar sections={sections} activeIndex={index} onNavigate={goTo} isDesktop={isDesktop} />

      <motion.main
        className={`flex flex-col w-full ${isDesktop ? "h-full" : ""}`}
        animate={isDesktop ? { y: `-${index * 100}%` } : { y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 32, mass: 1 }}
      >
        {sections.map(({ id, Component, className = "" }, i) => (
          <section
            key={id}
            id={id}
            className={`w-full flex-shrink-0 ${isDesktop ? "h-dvh" : ""} ${className}`}
          >
            <motion.div
              className="h-full w-full"
              animate={
                isDesktop
                  ? {
                      opacity: i === index ? 1 : 0.35,
                      scale: i === index ? 1 : 0.96,
                      filter: i === index ? "blur(0px)" : "blur(2px)",
                    }
                  : { opacity: 1, scale: 1, filter: "blur(0px)" }
              }
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