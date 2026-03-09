import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const titleTranslations = [
  { text: "My Journey", lang: "EN" },
  { text: "Mon Évolution", lang: "FR" },
  { text: "Mi Evolución", lang: "ES" }
];

const evolutionSteps = [
  {
    id: "01",
    title: "Les Fondations",
    subtitle: "La logique pure",
    desc: "Avant de peindre, il faut savoir fabriquer la toile. Apprentissage de la logique brute, des mathématiques appliquées et de l'architecture mémoire.",
    techs: ["Algorithmique", "Langage C", "Matlab", "R"]
  },
  {
    id: "02",
    title: "Le Virage Web",
    subtitle: "Les premiers pixels",
    desc: "Découverte du navigateur. Création des premières interfaces visuelles et compréhension du DOM sans aucun framework pour avoir des bases solides.",
    techs: ["HTML5", "CSS3", "Vanilla JS"]
  },
  {
    id: "03",
    title: "L'Ère Logicielle & Data",
    subtitle: "La mécanique lourde",
    desc: "Création de vrais moteurs, de jeux en 2D et traitement de grosses bases de données. C'est ici que l'optimisation entre en jeu.",
    techs: ["Java Natif", "Python", "SQL"]
  },
  {
    id: "04",
    title: "Maîtrise Fullstack",
    subtitle: "L'écosystème moderne",
    desc: "Architectures complètes, intégration d'intelligences artificielles (NLP) et création de plateformes de bout en bout.",
    techs: ["React", "Node.js", "MongoDB", "Spacy (NLP)"]
  },
  {
    id: "05",
    title: "Architectures Avancées",
    subtitle: "BaaS & Front-end lourd",
    desc: "Transition vers des frameworks modernes pour le rendu côté serveur et utilisation de Backend-as-a-Service pour des applications temps réel sécurisées.",
    techs: ["Next.js", "Firebase", "Supabase"]
  },
  {
    id: "06",
    title: "Data Science Appliquée",
    subtitle: "Faire parler les données",
    desc: "Analyse statistique poussée. Utilisation d'algorithmes de clustering et de réduction de dimension pour extraire des profils types à partir de multiples variables.",
    techs: ["Streamlit", "K-Means", "ACP", "Matplotlib"]
  },
  {
    id: "07",
    title: "Déploiement & Cloud",
    subtitle: "Mise en production",
    desc: "Configuration d'environnements de production, gestion des contraintes de serveurs gratuits et déploiement de backends complexes avec environnements virtuels.",
    techs: ["Render", "Vercel", "PythonAnywhere"]
  }
];

export default function Evolution() {
  const [activeStep, setActiveStep] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);

  // Hook Framer Motion pour le scroll du texte en background
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const xEvolution = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
const xJourney = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
const xExperience = useTransform(scrollYProgress, [0, 1], ["-10%", "30%"]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Changement de langue automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((i) => (i + 1) % titleTranslations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleInteract = (index) => {
    if (isMobile) {
      setActiveStep(activeStep === index ? null : index);
    } else {
      setActiveStep(index);
    }
  };

  // Séparation des étapes : 4 à gauche, 3 à droite
  const leftSteps = evolutionSteps.slice(0, 4);
  const rightSteps = evolutionSteps.slice(4, 7);

  // Fonction pour rendre une carte (pour éviter de dupliquer le code dans les deux colonnes)
  const renderStepCard = (step, actualIndex) => {
    const isActive = activeStep === actualIndex;

    return (
      <motion.div
        key={step.id}
        layout
        onMouseEnter={() => !isMobile && handleInteract(actualIndex)}
        onMouseLeave={() => !isMobile && setActiveStep(null)}
        onClick={() => isMobile && handleInteract(actualIndex)}
        className="relative flex items-start gap-4 md:gap-8 group cursor-pointer"
      >
        <div className="relative z-10 flex-shrink-0">
          <motion.span
            layout
            className={`text-5xl md:text-7xl font-black transition-all duration-500 ${
              isActive ? "text-white" : "text-transparent"
            }`}
            style={{
              WebkitTextStroke: isActive ? "0px white" : "1px rgba(255,255,255,0.15)",
            }}
          >
            {step.id}
          </motion.span>
          
          {/* Point d'ancrage jaune discret */}
          {!isMobile && (
            <div 
              className={`absolute left-[-20px] md:left-[-40px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-500 ${
                isActive ? 'bg-yellow-400 shadow-[0_0_10px_#eab308]' : 'bg-white/10'
              }`}
            ></div>
          )}
        </div>

        <motion.div layout className="flex flex-col justify-center pt-2 md:pt-4 w-full">
          {/* Titre avec hover jaune */}
          <h3 className={`text-lg md:text-2xl font-cartoon uppercase tracking-wide transition-colors duration-300 ${
            isActive ? "text-yellow-400" : "text-white/60 group-hover:text-white/80"
          }`}>
            {step.title}
          </h3>
          
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <p className="text-white/50 text-xs md:text-sm mt-2 mb-4 font-mono max-w-sm md:max-w-md">
                  {step.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {step.techs.map((tech, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-[10px] md:text-xs font-mono px-3 py-1 border border-white/10 rounded-full bg-white/5 text-white/70"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section className="relative w-full min-h-screen bg-[#080808] py-20 px-6 md:px-20 text-white overflow-hidden flex flex-col justify-center">
      
      {/* TEXTE GÉANT EN BACKGROUND (Parallax) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 flex flex-col justify-around py-20 opacity-[0.03]">
  
  <motion.div 
    style={{ x: xEvolution }}
    className="text-[15vw] md:text-[25vw] font-cartoon leading-none whitespace-nowrap"
  >
    EVOLUTION EVOLUTION EVOLUTION
  </motion.div>

  <motion.div 
    style={{ x: xJourney }}
    className="text-[15vw] md:text-[25vw] font-cartoon leading-none whitespace-nowrap self-end"
  >
    JOURNEY JOURNEY JOURNEY
  </motion.div>

  <motion.div 
    style={{ x: xExperience }}
    className="text-[15vw] md:text-[25vw] font-cartoon leading-none whitespace-nowrap"
  >
    EXPERIENCE EXPERIENCE EXPERIENCE
  </motion.div>
  
</div>

      {/* Titre multilingue */}
      <div className="mb-16 md:mb-24 z-10 relative">
      <AnimatePresence mode="wait">
  <motion.h2 
    key={titleIndex}
    initial={{ opacity: 0, y: 10 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: -10 }} 
    className="text-4xl md:text-8xl font-cartoon uppercase text-white leading-[0.8] tracking-tighter"
  >
    {/* Premier mot en plein */}
    {titleTranslations[titleIndex].text.split(' ')[0]} 
    <br />
    {/* Le reste du titre en contour (outline) */}
    <span 
      className="text-transparent" 
      style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.6)" }}
    >
      {titleTranslations[titleIndex].text.split(' ').slice(1).join(' ')}
    </span>
  </motion.h2>
</AnimatePresence>
        {/* Touche de jaune discrète */}
        <p className="text-yellow-500/80 font-mono text-xs md:text-sm uppercase tracking-[0.3em] mt-2">
          // Leveling up
        </p>
      </div>

      {/* Grille divisée en deux colonnes (PC) / Une colonne (Mobile) */}
      <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 z-10">
        
        {/* Colonne Gauche (Étapes 1 à 4) */}
        <div className="flex flex-col gap-6 md:gap-12 relative">
          {/* Ligne verticale gauche (PC) */}
          {!isMobile && <div className="absolute left-[-40px] top-10 bottom-10 w-[1px] bg-white/5 z-0"></div>}
          
          {leftSteps.map((step, index) => renderStepCard(step, index))}
        </div>

        {/* Colonne Droite (Étapes 5 à 7) - Décalée vers le bas sur PC pour l'effet asymétrique */}
        <div className="flex flex-col gap-6 md:gap-12 relative md:mt-40">
           {/* Ligne verticale droite (PC) */}
           {!isMobile && <div className="absolute left-[-40px] top-10 bottom-10 w-[1px] bg-white/5 z-0"></div>}
           
          {rightSteps.map((step, index) => renderStepCard(step, index + 4))}
        </div>

      </div>
    </section>
  );
}