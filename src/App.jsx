import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ProjectsHolder from "./components/ProjectsHolder";
import ArchiveHolder from "./components/ArchiveHolder";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Evolution from "./components/Evolution";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505] selection:bg-yellow-500 selection:text-black">
      
      {/* INJECTION DES POLICES POUR UNICHECK */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&family=Inter:wght@300;400;600&family=Noto+Sans+Arabic:wght@400;700&display=swap');
          .font-display { font-family: 'Manrope', sans-serif; }
          .font-body { font-family: 'Inter', 'Noto Sans Arabic', sans-serif; }
          .arabic-font { font-family: 'Noto Sans Arabic', sans-serif; }
          .glass-effect { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.3); }
        `}
      </style>

      <Navbar />

      <main className="flex-grow">
        <section id="hero"><Hero /></section>
        <section id="about"><About /></section>
        
        <section id="projects" className="border-t border-white/5">
          <ProjectsHolder />
        </section>

        <section id="archives" className="hidden lg:block border-t border-white/5">
          <ArchiveHolder />
        </section>

        <section id="evolution" className="border-t border-white/5">
          <Evolution/>
        </section>

        <section id="contact"><Contact /></section>
      </main>

      <Footer />
    </div>
  );
}

export default App;