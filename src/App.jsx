import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ProjectsHolder from "./components/ProjectsHolder";
import ArchiveHolder from "./components/ArchiveHolder";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Evolution from "./components/Evolution";
import { useFullPageScroll } from "./hooks/useFullPageScroll";

const sections = [
  { id: "hero", Component: Hero },
  { id: "about", Component: About },
  { id: "projects", Component: ProjectsHolder },
  { id: "archives", Component: ArchiveHolder, className: "hidden lg:block" },
  { id: "evolution", Component: Evolution },
  { id: "contact", Component: Contact },
];

function App() {
  const { index, goTo } = useFullPageScroll(sections.length);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[#050505] selection:bg-yellow-500 selection:text-black">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&family=Inter:wght@300;400;600&family=Noto+Sans+Arabic:wght@400;700&display=swap');
          .font-display { font-family: 'Manrope', sans-serif; }
          .font-body { font-family: 'Inter', 'Noto Sans Arabic', sans-serif; }
          .arabic-font { font-family: 'Noto Sans Arabic', sans-serif; }
          .glass-effect { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.3); }
        `}
      </style>

      <Navbar activeIndex={index} onNavigate={goTo} sections={sections} />

      {/* PISTE — toutes les sections empilées, on translate la piste entière */}
      <motion.main
        className="flex flex-col h-full w-full"
        animate={{ y: `-${index * 100}%` }}
        transition={{ type: "spring", stiffness: 220, damping: 32, mass: 1 }}
      >
        {sections.map(({ id, Component, className = "" }, i) => (
          <section
            key={id}
            id={id}
            className={`h-dvh w-full flex-shrink-0 ${className}`}
          >
            {/* Effet fun : chaque section entre en fondu/scale quand elle devient active */}
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

      <Footer />
    </div>
  );
}

export default App;