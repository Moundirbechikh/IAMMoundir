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
      <Navbar />

      <main className="flex-grow">

        {/* HERO */}
        <section id="hero">
          <Hero />
        </section>

        {/* ABOUT */}
        <section id="about">
          <About />
        </section>

        {/* PROJECTS */}
        <section id="projects" className="border-t border-white/5">
          <ProjectsHolder />
        </section>

        {/* ARCHIVES - Masqué sur Phone/Tablette, visible sur Desktop uniquement */}
        <section id="archives" className="hidden lg:block border-t border-white/5">
          <ArchiveHolder />
        </section>

        {/* EVOLUTION */}
        <section id="evolution" className="border-t border-white/5">
          <Evolution/>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <Contact />
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default App;