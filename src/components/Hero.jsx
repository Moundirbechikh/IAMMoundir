import { motion, useMotionValue, useSpring, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const introLeft = "Bonjour je suis";
  const introRight = "Qui suis je ?";
  const introMiddle = "Mes projets ?";
  const introJourney = "parcours ?";

  const clamp = (value, max) => Math.max(-max, Math.min(max, value));

  // ============================================================
  // PARALLAX SOURIS — DESKTOP UNIQUEMENT (inchangé)
  // ============================================================
  const rawPlaqueX = useMotionValue(0);
  const rawPlaqueY = useMotionValue(0);

  const plaqueX = useSpring(rawPlaqueX, { stiffness: 40, damping: 15, mass: 0.8 });
  const plaqueY = useSpring(rawPlaqueY, { stiffness: 40, damping: 15, mass: 0.8 });

  const sectionRef = useRef(null);
  const followEnabled = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      followEnabled.current = true;
    }, 1700);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    if (!followEnabled.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;

    const maxX = rect.width * 0.32;
    const maxY = rect.height * 0.14;

    rawPlaqueX.set(clamp(dx * 0.55, maxX));
    rawPlaqueY.set(clamp(dy * 0.55, maxY));
  };

  // ============================================================
  // PARALLAX TACTILE + SCROLL — MOBILE / TABLETTE (AMÉLIORÉ)
  // ============================================================
  const mobileSectionRef = useRef(null);
  const rawPlaqueXM = useMotionValue(0);
  const rawPlaqueYM = useMotionValue(0);
  
  // Ressorts optimisés pour fluidité
  const plaqueXM = useSpring(rawPlaqueXM, { stiffness: 45, damping: 14, mass: 0.6 });
  const plaqueYM = useSpring(rawPlaqueYM, { stiffness: 45, damping: 14, mass: 0.6 });
  
  const followEnabledM = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      followEnabledM.current = true;
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handlePointerMoveMobile = (e) => {
    if (!followEnabledM.current || !mobileSectionRef.current) return;
    const rect = mobileSectionRef.current.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;

    // La plaque fait 52% de large et 22% de haut.
    // Limites mathématiques pour l'empêcher de sortir de l'écran:
    // Largeur dispo : (100 - 52) / 2 = 24% | Hauteur dispo : (100 - 22) / 2 = 39%
    const maxX = rect.width * 0.22; // Marge de sécurité (ne dépasse pas 24%)
    const maxY = rect.height * 0.37; // Marge de sécurité (ne dépasse pas 39%)

    // On maintient un bon suivi (1.2) mais bloqué strictement aux limites maxX/maxY
    rawPlaqueXM.set(clamp(dx * 1.2, maxX));
    rawPlaqueYM.set(clamp(dy * 1.2, maxY));
  };

  const { scrollYProgress: scrollProgressM } = useScroll({
    target: mobileSectionRef,
    offset: ["start start", "end start"],
  });

  const plaqueTiltM = useTransform(scrollProgressM, [0, 1], [-6, -2]);

  // ============================================================
  // VARIANTS D'ANIMATION (TYPEWRITER) — DESKTOP
  // ============================================================
  const typewriterLeft = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
  };

  const typewriterMiddle = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.6 } },
  };

  const typewriterJourney = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 1.0 } },
  };

  const typewriterRight = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 1.4 } },
  };

  const letterAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } },
  };

  // STABILO COUPE-DE-PINCEAU (desktop)
  const Highlight = ({ children, delay }) => (
    <span className="relative inline-block z-30">
      <motion.span
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 0.45, delay, ease: [0.65, 0, 0.35, 1] }}
        className="absolute inset-0 bg-yellow-400"
      />
      <span className="relative text-black px-1 font-black tracking-normal text-2xl sm:text-3xl md:text-[2.8vw] inline-block">
        {children}
      </span>
    </span>
  );

  const ctaVariants = {
    rest: { opacity: 0, y: 12, pointerEvents: "none" },
    hover: { opacity: 1, y: 0, pointerEvents: "auto" },
  };

  // ============================================================
  // DONNÉES DES CARTES (partagées desktop + mobile)
  // ============================================================
  const cardsData = {
    about: {
      title: "qui suis je",
      barColorClass: "bg-yellow-400",
      frameColor: "#facc15",
      cta: { label: "More about me", href: "#about" },
      content: "Je suis développeur fullstack spécialisé en frontend et design. J'ai 23 ans, de Oran. Je propulse vos idées en expériences visuelles radicales.",
      teaser: "Développeur fullstack — frontend & design. 23 ans, Oran.",
    },
    projets: {
      title: "Mes projets ?",
      barColorClass: "bg-red-500",
      frameColor: "#ef4444",
      cta: { label: "Voir plus", href: "#projets" },
      content: "Découvrez une sélection de mes réalisations alliant design immersif et défis techniques.",
      teaser: "Design immersif & défis techniques.",
    },
    parcours: {
      title: "parcours ?",
      barColorClass: "bg-green-500",
      frameColor: "#22c55e",
      cta: { label: "Explorer", href: "#parcours" },
      content: "L'évolution de mes compétences et de ma passion pour la tech au fil des années.",
      teaser: "L'évolution de mes compétences dans le temps.",
    },
  };

  return (
    <>
      {/* ============================================================
          ================   VERSION DESKTOP (>= lg)   ================
          ================   INCHANGÉ — NE PAS MODIFIER   =============
          ============================================================ */}
      <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        className="hidden lg:flex relative w-full h-screen bg-[#080808] flex-row items-center justify-between overflow-hidden p-16 font-cartoon text-white gap-0"
      >
        <div className="absolute w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-[150px] pointer-events-none z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

        {/* CÔTÉ GAUCHE : INTRODUCTION */}
        <div className="relative z-10 w-[58vw] flex flex-col items-start justify-center text-left space-y-3 pl-[1vw]">
          <motion.div variants={typewriterLeft} initial="hidden" animate="visible" className="text-7xl tracking-tight uppercase opacity-80 h-[1.2em]">
            {introLeft.split("").map((char, index) => (
              <motion.span key={index} variants={letterAnimation} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>

          <div className="relative inline-block select-none bg-[#080808]">
            <motion.h1
              initial={{ opacity: 0, scale: 0.7, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: [0, 0, -6, 0] }}
              transition={{
                opacity: { type: "spring", stiffness: 50, damping: 12, delay: 0.1 },
                scale: { type: "spring", stiffness: 50, damping: 12, delay: 0.1 },
                y: { duration: 5, delay: 1, repeat: Infinity, ease: "easeInOut" },
              }}
              className="font-cartoon tracking-tight uppercase text-white text-[18vw] leading-none"
            >
              Moundir
            </motion.h1>

            <motion.div
              style={{ x: plaqueX, y: plaqueY }}
              initial={{ opacity: 0, scale: 0.2, x: -250, rotate: -25 }}
              animate={{ opacity: 1, scale: 1, rotate: -6 }}
              transition={{ type: "spring", stiffness: 65, damping: 14, delay: 0.7 }}
              className="absolute z-20 top-[-6%] left-[-4%] w-[45%] h-[110%] bg-white rounded-[20px] mix-blend-difference pointer-events-none"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 15, delay: 1.2 }}
            className="text-5xl tracking-tight uppercase pt-2 text-transparent"
            style={{ WebkitTextStroke: "1.5px #ffffff", textStroke: "1.5px #ffffff" }}
          >
            <p>Bienvenue dans mon portfolio</p>
          </motion.div>
        </div>

        {/* BLOC CENTRAL HAUT : MES PROJETS (ROUGE) */}
        <motion.div
          initial="rest"
          whileHover="hover"
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4 }}
          style={{ opacity: 0, y: 30 }}
          className="absolute left-[36%] top-[3%] w-[340px] min-h-[200px] flex flex-col items-start justify-start p-6 bg-[#0c0c0c] z-40"
        >
          <AnimatedFrame hoverColor="#ef4444" />
          <div className="absolute -inset-2 overflow-hidden rounded-[4px] pointer-events-none z-10">
            <div className="absolute w-[260%] h-[260%] top-[-80%] left-[-80%] rotate-[-35deg] flex flex-col">
              <motion.div variants={barOuterTop} className="w-full h-[25%] bg-red-500 origin-top" />
              <motion.div variants={barInnerTop} className="w-full h-[25%] bg-red-500 origin-top" />
              <motion.div variants={barInnerBottom} className="w-full h-[25%] bg-red-500 origin-bottom" />
              <motion.div variants={barOuterBottom} className="w-full h-[25%] bg-red-500 origin-bottom" />
            </div>
          </div>

          <motion.div variants={contentBlurVariants} className="relative z-0 flex flex-col items-start w-full pb-10">
            <motion.h2 variants={typewriterMiddle} initial="hidden" animate="visible" className="text-5xl uppercase leading-none mb-3 block text-white">
              {introMiddle.split("").map((char, index) => (
                <motion.span key={index} variants={letterAnimation} className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="text-white uppercase font-light text-lg tracking-tight leading-snug"
            >
              Découvrez une sélection de mes réalisations alliant design immersif et défis techniques.
            </motion.p>
          </motion.div>

          <motion.a
            href="#projets"
            variants={ctaVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group absolute left-6 bottom-5 z-20 inline-flex items-center gap-2 overflow-hidden rounded-[10px] border-2 border-white px-5 py-2 uppercase tracking-tight text-white text-xl"
          >
            <span className="absolute inset-0 bg-red-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">Voir plus</span>
            <span className="relative z-10 transition-all duration-300 group-hover:text-black group-hover:translate-x-1">?</span>
          </motion.a>
        </motion.div>

        {/* BLOC CENTRAL BAS : MON PARCOURS (VERT) */}
        <motion.div
          initial="rest"
          whileHover="hover"
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6 }}
          style={{ opacity: 0, y: 30 }}
          className="absolute mt-2 left-[43.5%] top-[67%] w-[240px] min-h-[170px] flex flex-col items-start justify-start pt-3 pb-5 px-5 bg-[#0c0c0c] z-40"
        >
          <AnimatedFrame hoverColor="#22c55e" />
          <div className="absolute -inset-2 overflow-hidden rounded-[4px] pointer-events-none z-10">
            <div className="absolute w-[260%] h-[260%] top-[-80%] left-[-80%] rotate-[-35deg] flex flex-col">
              <motion.div variants={barOuterTop} className="w-full h-[25%] bg-green-500 origin-top" />
              <motion.div variants={barInnerTop} className="w-full h-[25%] bg-green-500 origin-top" />
              <motion.div variants={barInnerBottom} className="w-full h-[25%] bg-green-500 origin-bottom" />
              <motion.div variants={barOuterBottom} className="w-full h-[25%] bg-green-500 origin-bottom" />
            </div>
          </div>

          <motion.div variants={contentBlurVariants} className="relative z-0 flex flex-col items-start w-full pb-1">
            <motion.h2 variants={typewriterJourney} initial="hidden" animate="visible" className="text-4xl uppercase leading-none mb-3 block text-white">
              Mon <br />
              {introJourney.split("").map((char, index) => (
                <motion.span key={index} variants={letterAnimation} className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.5 }}
              className="text-white uppercase font-light text-base tracking-tight leading-snug"
            >
              L'évolution de mes compétences et de ma passion pour la tech au fil des années.
            </motion.p>
          </motion.div>

          <motion.a
            href="#parcours"
            variants={ctaVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group absolute left-6 bottom-5 z-20 inline-flex items-center gap-2 overflow-hidden rounded-[10px] border-2 border-white px-5 py-2 uppercase tracking-tight text-white text-xl"
          >
            <span className="absolute inset-0 bg-green-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">Explorer</span>
            <span className="relative z-10 transition-all duration-300 group-hover:text-black group-hover:translate-x-1">?</span>
          </motion.a>
        </motion.div>

        {/* CÔTÉ DROIT : QUI SUIS-JE (JAUNE) */}
        <motion.div initial="rest" whileHover="hover" className="relative w-[32vw] flex flex-col items-start justify-center p-10">
          <AnimatedFrame hoverColor="#facc15" />
          <div className="absolute -inset-2 overflow-hidden rounded-[4px] pointer-events-none z-10">
            <div className="absolute w-[260%] h-[260%] top-[-80%] left-[-80%] rotate-[-35deg] flex flex-col">
              <motion.div variants={barOuterTop} className="w-full h-[25%] bg-yellow-400 origin-top" />
              <motion.div variants={barInnerTop} className="w-full h-[25%] bg-yellow-400 origin-top" />
              <motion.div variants={barInnerBottom} className="w-full h-[25%] bg-yellow-400 origin-bottom" />
              <motion.div variants={barOuterBottom} className="w-full h-[25%] bg-yellow-400 origin-bottom" />
            </div>
          </div>

          <motion.div variants={contentBlurVariants} className="relative z-0 flex flex-col items-start w-full">
            <motion.div variants={typewriterRight} initial="hidden" animate="visible" className="text-7xl tracking-tight uppercase mb-5 block text-white">
              {introRight.split("").map((char, index) => (
                <motion.span key={index} variants={letterAnimation} className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>

            <div className="relative w-full bg-[#080808] overflow-visible select-none py-2 flex flex-col space-y-5 pb-12">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: "easeOut", duration: 0.6, delay: 1.8 }}
                className="text-white uppercase font-light text-4xl tracking-tight leading-tight text-left relative z-10"
              >
                Je suis <Highlight delay={2.0}>développeur fullstack</Highlight> spécialisé en frontend et design. J'ai <Highlight delay={2.25}>23 ans</Highlight>, de <Highlight delay={2.5}>Oran</Highlight>
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: "easeOut", duration: 0.6, delay: 2.7 }}
                className="text-white uppercase font-light text-4xl tracking-tight leading-tight text-left w-full relative z-10 pointer-events-none"
              >
                Je propulse vos idées en experiences visuelles radicales.
              </motion.p>
            </div>
          </motion.div>

          <motion.a
            href="#about"
            variants={ctaVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group absolute left-10 bottom-5 z-20 inline-flex items-center gap-3 overflow-hidden rounded-[14px] border-2 border-white px-10 py-4 uppercase tracking-tight text-white text-2xl"
          >
            <span className="absolute inset-0 bg-yellow-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">More about me</span>
            <span className="relative z-10 transition-all duration-300 group-hover:text-black group-hover:translate-x-1">?</span>
          </motion.a>
        </motion.div>
      </section>

      {/* ============================================================
          ================   MOBILE / TABLETTE (< lg)   ================
          ============================================================ */}
      <section
        ref={mobileSectionRef}
        onPointerMove={handlePointerMoveMobile}
        onPointerDown={handlePointerMoveMobile}
        className="flex lg:hidden relative w-full h-[100dvh] bg-[#080808] flex-col p-3 sm:p-5 md:p-6 gap-0.5 sm:gap-1 md:gap-1.5 font-cartoon text-white overflow-hidden touch-none"
      >
        <div className="absolute w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

        {/* Plaque blanche tactile — bloquée dans les bords de l'écran */}
        <motion.div
          style={{ x: plaqueXM, y: plaqueYM, rotate: plaqueTiltM }}
          initial={{ opacity: 0, scale: 0.2, x: -140, rotate: -25 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 65, damping: 14, delay: 0.6 }}
          className="absolute z-20 top-[11%] left-[4%] w-[52%] h-[22%] bg-white rounded-[18px] mix-blend-difference pointer-events-none"
        />

        {/* ---------- ROW 1 : bonjour je suis + Mes projets ---------- */}
        <div className="relative z-10 flex w-full gap-2 sm:gap-3" style={{ flex: "0 0 14%" }}>
          <div className="w-[52%] flex flex-col justify-center items-start pl-1">
            <motion.div
              variants={typewriterLeft}
              initial="hidden"
              animate="visible"
              className="text-[8.5vw] sm:text-[5.6vw] md:text-[4.4vw] leading-[0.95] tracking-tight uppercase opacity-90"
            >
              {introLeft.split(" ").map((word, wi) => (
                <span key={wi} className="block">
                  {word.split("").map((char, index) => (
                    <motion.span key={index} variants={letterAnimation} className="inline-block">
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.5, ease: "easeOut" }}
            className="w-[48%] h-full"
          >
            <MobileCard cardData={cardsData.projets}>
              <span className="block font-cartoon uppercase tracking-tight text-white text-[8vw] sm:text-[4.5vw] md:text-[3.5vw] leading-none text-center mb-1">
                Mes
                <br />
                projets ?
              </span>
              <span className="block mt-1 text-[3.2vw] sm:text-[2vw] md:text-[1.4vw] font-light uppercase tracking-tight text-white text-center leading-snug px-2">
                {cardsData.projets.teaser}
              </span>
            </MobileCard>
          </motion.div>
        </div>

        {/* ---------- ROW 2 : MOUNDIR — immense, deux lignes ---------- */}
        <div className="relative z-10 flex items-center justify-center w-full" style={{ flex: "0 0 40%" }}>
          <motion.h1
            initial={{ opacity: 0, scale: 0.75, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: [0, 0, -4, 0] }}
            transition={{
              opacity: { type: "spring", stiffness: 50, damping: 12, delay: 0.1 },
              scale: { type: "spring", stiffness: 50, damping: 12, delay: 0.1 },
              y: { duration: 5, delay: 1.3, repeat: Infinity, ease: "easeInOut" },
            }}
            className="font-cartoon tracking-tight uppercase text-white text-center leading-[0.8] text-[32vw] sm:text-[20vw] md:text-[17vw]"
          >
            Moun
            <br />
            dir
          </motion.h1>
        </div>

        {/* ---------- ROW 3 : qui suis je (grande carte) | bienvenue + parcours ---------- */}
        <div className="relative z-10 flex w-full gap-2 sm:gap-3 flex-1 min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5, ease: "easeOut" }}
            className="w-[58%] h-full"
          >
            <MobileCard
              cardData={cardsData.about}
              revealContent="Je propulse vos idées en expériences visuelles radicales."
            >
              <div className="flex flex-col items-center justify-center text-center w-full h-full px-1">
                <span className="block font-cartoon uppercase tracking-tight text-white text-[10vw] sm:text-[6vw] md:text-[4vw] leading-none mb-3">
                  qui suis je ?
                </span>
                <span className="block text-[5.8vw] sm:text-[3vw] md:text-[2vw] font-light uppercase tracking-tight text-white leading-tight px-1 text-center">
                  Je suis <MiniHighlight delay={2.1}>développeur fullstack</MiniHighlight> de{" "}
                  <MiniHighlight delay={2.25}>23 ans</MiniHighlight>, habite à{" "}
                  <MiniHighlight delay={2.4}>Oran</MiniHighlight>
                </span>
              </div>
            </MobileCard>
          </motion.div>

          <div className="w-[42%] h-full flex flex-col gap-2 sm:gap-3">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 50, damping: 15, delay: 1.5 }}
              className="flex-[0.55] flex flex-col items-center justify-center text-center"
            >
              <span className="text-[6.6vw] sm:text-[3.4vw] md:text-[2.2vw] leading-[1.05] tracking-tight uppercase text-white">
                bienvenue
                <br />
                dans mon
                <br />
                portfolio
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.5, ease: "easeOut" }}
              className="flex-1 min-h-0"
            >
              <MobileCard cardData={cardsData.parcours}>
                <span className="block font-cartoon uppercase tracking-tight text-white text-[7.5vw] sm:text-[4.2vw] md:text-[3.2vw] leading-none text-center mb-1">
                  parcours ?
                </span>
                <span className="block mt-1 text-[3vw] sm:text-[1.9vw] md:text-[1.3vw] font-light uppercase tracking-tight text-white text-center leading-snug px-2">
                  {cardsData.parcours.teaser}
                </span>
              </MobileCard>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================================
// COMPOSANTS SUPPORTS DESKTOP (inchangés)
// ============================================================
const barOuterTop = { rest: { scaleY: 0 }, hover: { scaleY: 1, transition: { duration: 0.45, ease: "easeInOut", delay: 0 } } };
const barOuterBottom = { rest: { scaleY: 0 }, hover: { scaleY: 1, transition: { duration: 0.45, ease: "easeInOut", delay: 0 } } };
const barInnerTop = { rest: { scaleY: 0 }, hover: { scaleY: 1, transition: { duration: 0.45, ease: "easeInOut", delay: 0.3 } } };
const barInnerBottom = { rest: { scaleY: 0 }, hover: { scaleY: 1, transition: { duration: 0.45, ease: "easeInOut", delay: 0.3 } } };
const contentBlurVariants = {
  rest: { filter: "blur(0px)", transition: { duration: 0.4 } },
  hover: { filter: "blur(6px)", transition: { duration: 0.4, delay: 0.1 } },
};
function AnimatedFrame({ hoverColor = "#ffffff" }) {
  const frameVariants = {
    rest: { stroke: "#ffffff", opacity: 0.8, transition: { duration: 0.3 } },
    hover: { stroke: hoverColor, opacity: 1, transition: { duration: 0.3 } },
  };
  return (
    <svg className="absolute -inset-2 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
      <motion.rect x="0.5" y="0.5" width="99" height="99" rx="2" fill="none" strokeWidth="1" strokeDasharray="6 4" variants={frameVariants} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

// ============================================================
// MINI STABILO — version mobile du composant Highlight desktop
// ============================================================
function MiniHighlight({ children, delay = 0 }) {
  return (
    <span className="relative inline-block z-30">
      <motion.span
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 0.4, delay, ease: [0.65, 0, 0.35, 1] }}
        className="absolute inset-0 bg-yellow-400"
      />
      <span className="relative text-black px-1 font-black tracking-normal inline-block">
        {children}
      </span>
    </span>
  );
}

// ============================================================
// CARTE MOBILE — MAJ: Taille du texte d'ouverture légèrement réduit
// ============================================================
function MobileCard({ cardData, children, revealContent, topTitle, centerBody }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen((v) => !v);
  };
  return (
    <motion.div
      onClick={handleClick}
      whileTap={{ scale: 0.96 }}
      animate={{ borderColor: isOpen ? cardData.frameColor : "rgba(255,255,255,0.55)" }}
      transition={{ duration: 0.3 }}
      style={{ borderStyle: "dashed", borderWidth: "1.5px" }}
      className="relative w-full h-full text-left overflow-hidden rounded-[14px] bg-[#0c0c0c] flex flex-col justify-center items-center cursor-pointer select-none"
    >
      {/* Remplissage couleur au clic (diagonale) */}
      <div className="absolute -inset-2 overflow-hidden rounded-[4px] pointer-events-none z-0">
        <div className="absolute w-[260%] h-[260%] top-[-80%] left-[-80%] rotate-[-35deg] flex flex-col">
          <motion.div animate={{ scaleY: isOpen ? 1 : 0 }} transition={{ duration: 0.45, ease: "easeInOut" }} className={`w-full h-[25%] ${cardData.barColorClass} origin-top`} />
          <motion.div animate={{ scaleY: isOpen ? 1 : 0 }} transition={{ duration: 0.45, delay: 0.1, ease: "easeInOut" }} className={`w-full h-[25%] ${cardData.barColorClass} origin-top`} />
          <motion.div animate={{ scaleY: isOpen ? 1 : 0 }} transition={{ duration: 0.45, delay: 0.1, ease: "easeInOut" }} className={`w-full h-[25%] ${cardData.barColorClass} origin-bottom`} />
          <motion.div animate={{ scaleY: isOpen ? 1 : 0 }} transition={{ duration: 0.45, ease: "easeInOut" }} className={`w-full h-[25%] ${cardData.barColorClass} origin-bottom`} />
        </div>
      </div>

      {/* Indicateur "c'est cliquable" — label flou (uniquement fermé) */}
      {!isOpen && (
        <div className="absolute top-1.5 right-1.5 z-20 rounded-md border border-white/10 bg-white/10 backdrop-blur-md px-2 py-1 text-[2.6vw] sm:text-[1.3vw] md:text-[0.85vw] uppercase tracking-wider text-white/90">
          Appuyer
        </div>
      )}

      {/* Titre + teaser (devient flou et s'estompe quand ouvert) */}
      <motion.div
        animate={{ filter: isOpen ? "blur(6px)" : "blur(0px)", opacity: isOpen ? 0.25 : 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 flex flex-col w-full h-full p-2"
      >
        {topTitle ? (
          <>
            <div className="w-full text-center pt-1">{topTitle}</div>
            <div className="flex-1 flex items-center justify-center w-full">{centerBody}</div>
          </>
        ) : centerBody ? (
          <div className="w-full h-full flex flex-col items-center justify-center">{centerBody}</div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">{children}</div>
        )}
      </motion.div>

      {/* Contenu détaillé + bouton révélés par le clic */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-3 text-center"
          >
            {/* TAILLE DU TEXTE RÉDUITE ICI (3.2vw au lieu de 3.8vw) + leading-tight */}
            <div className="text-[3.2vw] sm:text-[1.9vw] md:text-[1.3vw] leading-tight uppercase text-white font-medium drop-shadow-md line-clamp-4 mb-2">
              {revealContent ?? cardData.content}
            </div>

            <a
              href={cardData.cta.href}
              onClick={(e) => e.stopPropagation()}
              className="mt-2 group relative inline-flex items-center gap-1 overflow-hidden rounded-[8px] border border-transparent bg-white px-4 py-2 uppercase tracking-tight text-black text-[3.6vw] sm:text-[1.5vw] md:text-[1vw] font-bold shadow-md"
            >
              <span className="relative z-10">{cardData.cta.label}</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}