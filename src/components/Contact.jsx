import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Send, Copy, Check, Github, Linkedin, MessageCircle, Instagram,
  Mail, MapPin, User, AtSign, MessageSquare, Stamp, ArrowLeft, ArrowRight,
} from "lucide-react";
import emailjs from "@emailjs/browser";

// ============================================================
// DONNÉES
// ============================================================
const emailAddress = "moundirbechikh03@gmail.com";
const links = {
  github: "https://github.com/Moundirbechikh",
  linkedin: "https://www.linkedin.com/in/TON-LIEN-LINKEDIN", // <-- à remplacer
  whatsapp: "https://wa.me/213782638109",
  instagram: "https://www.instagram.com/moundir_bech?igsh=c25yaGl3dGM5NTFz",
};

const socials = [
  { Icon: Github, href: links.github, label: "GitHub", brand: "#ffffff" },
  { Icon: Linkedin, href: links.linkedin, label: "LinkedIn", brand: "#0A66C2" },
  { Icon: MessageCircle, href: links.whatsapp, label: "WhatsApp", brand: "#25D366" },
  { Icon: Instagram, href: links.instagram, label: "Instagram", brand: "#E1306C" },
];

const ACCENT = "#3b82f6"; // bleu — couleur d'accent de la section Contact

// ============================================================
// PRIMITIVES PARTAGÉES
// ============================================================
function AnimatedFrame({ hoverColor = ACCENT }) {
  const frameVariants = {
    rest: { stroke: "#ffffff", opacity: 0.25, transition: { duration: 0.3 } },
    hover: { stroke: hoverColor, opacity: 1, transition: { duration: 0.3 } },
  };
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
      <motion.rect
        x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="16"
        fill="none" strokeWidth="1.5" strokeDasharray="8 6"
        variants={frameVariants}
      />
    </svg>
  );
}

function BandsFill({ color = ACCENT }) {
  const barOuterTop = { rest: { scaleY: 0 }, hover: { scaleY: 1, transition: { duration: 0.45, ease: "easeInOut" } } };
  const barOuterBottom = barOuterTop;
  const barInnerTop = { rest: { scaleY: 0 }, hover: { scaleY: 1, transition: { duration: 0.45, ease: "easeInOut", delay: 0.2 } } };
  const barInnerBottom = barInnerTop;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 rounded-[inherit]">
      <div className="absolute w-[260%] h-[260%] top-[-80%] left-[-80%] rotate-[-35deg] flex flex-col">
        <motion.div variants={barOuterTop} className="w-full h-[25%] origin-top" style={{ background: color }} />
        <motion.div variants={barInnerTop} className="w-full h-[25%] origin-top" style={{ background: color }} />
        <motion.div variants={barInnerBottom} className="w-full h-[25%] origin-bottom" style={{ background: color }} />
        <motion.div variants={barOuterBottom} className="w-full h-[25%] origin-bottom" style={{ background: color }} />
      </div>
    </div>
  );
}

const contentBlurVariants = {
  rest: { filter: "blur(0px)", opacity: 1, transition: { duration: 0.35 } },
  hover: { filter: "blur(8px)", opacity: 0.25, transition: { duration: 0.35 } },
};
const revealVariants = {
  rest: { opacity: 0, y: 14, pointerEvents: "none", transition: { duration: 0.25 } },
  hover: { opacity: 1, y: 0, pointerEvents: "auto", transition: { duration: 0.35, delay: 0.15 } },
};

function GiantTitle({ isVisible, className = "", children }) {
  return (
    <motion.h2
      initial={{ opacity: 0, scale: 0.7, y: 30 }}
      animate={isVisible ? { opacity: 1, scale: 1, y: [0, 0, -4, 0] } : { opacity: 0, scale: 0.7, y: 30 }}
      transition={{
        opacity: { type: "spring", stiffness: 55, damping: 12, delay: 0.1 },
        scale: { type: "spring", stiffness: 55, damping: 12, delay: 0.1 },
        y: { duration: 4.5, delay: 1, repeat: Infinity, ease: "easeInOut" },
      }}
      className={`font-cartoon uppercase text-white px-0 inline-block leading-[0.85] ${className}`}
    >
      {children}
    </motion.h2>
  );
}

function BackgroundGrid() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
      <div className="absolute w-[200vw] h-[200vh] flex flex-wrap gap-4 md:gap-6 justify-center content-center rotate-[-35deg] opacity-60">
        {Array.from({ length: 160 }).map((_, i) => (
          <div key={i} className="w-24 h-24 md:w-32 md:h-32 border-2 border-dashed border-blue-500/10 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function IntroOverlay({ startAnimation }) {
  const [phase, setPhase] = useState(0);
  const [itemCount, setItemCount] = useState(130);

  useEffect(() => {
    const update = () => setItemCount(window.innerWidth < 768 ? 70 : 130);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (startAnimation) {
      setPhase(1);
      const t = setTimeout(() => setPhase(2), 1100);
      return () => clearTimeout(t);
    }
  }, [startAnimation]);

  const phrases = ["Me contacter ?", "Restons en contact", "Envoie un message", "Discutons ensemble"];

  return (
    <motion.div exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }} className="absolute inset-0 z-50 bg-[#080808] overflow-hidden flex items-center justify-center pointer-events-none">
      <div className="absolute w-[200vw] h-[200vh] flex flex-wrap gap-5 md:gap-7 justify-center content-center rotate-[-35deg]">
        {Array.from({ length: itemCount }).map((_, i) => {
          const hasText = i % 4 === 0;
          const stacked = i % 6 === 0;
          return (
            <div key={i} className="relative w-24 h-24 md:w-36 md:h-36">
              {stacked && phase >= 1 && <div className={`absolute -bottom-3 -right-3 w-full h-full rounded-xl border-2 transition-all duration-200 ${phase === 1 ? "border-blue-400/25" : "border-blue-400/60 bg-blue-500/30"}`} />}
              <div className={`relative w-full h-full flex items-center justify-center rounded-xl border-2 transition-all duration-200 ${phase === 0 ? "border-transparent bg-transparent" : phase === 1 ? "border-blue-400/50 bg-transparent" : "border-blue-500 border-solid bg-blue-500"}`}>
                {phase === 1 && <span className={`font-cartoon uppercase text-center px-1.5 text-lg md:text-2xl text-white ${hasText ? "opacity-100" : "opacity-0"}`}>{phrases[i % phrases.length]}</span>}
                {phase === 2 && <motion.div initial={{ scale: 0.2, opacity: 0, rotate: -15 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ duration: 0.25 }}><Send className="w-14 h-14 text-black" strokeWidth={2.2} /></motion.div>}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ============================================================
// FORMULAIRE (thème sombre — posé sur le bloc noir/bleu)
// ============================================================
function ContactForm({ formRef, sendEmail, isSending, sent, msgLength, onMsgChange }) {
  return (
    <form ref={formRef} onSubmit={sendEmail} className="relative z-20 space-y-3.5 md:space-y-4 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative group">
          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 md:text-black/60 group-focus-within:text-blue-400 md:group-focus-within:text-black transition-colors" />
          <input 
            name="user_name" 
            type="text" 
            placeholder="TON NOM" 
            required 
            className="peer w-full bg-white/[0.04] md:bg-black/15 border border-white/10 md:border-2 md:border-black/20 rounded-2xl pl-11 pr-4 py-3 md:py-3.5 text-white md:text-black placeholder-white/30 md:placeholder-black/60 font-cartoon uppercase tracking-wide focus:outline-none focus:bg-white/[0.06] md:focus:bg-black/25 md:focus:border-black transition-all text-base md:text-lg md:font-bold" 
          />
        </div>
        <div className="relative group">
          <AtSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 md:text-black/60 group-focus-within:text-blue-400 md:group-focus-within:text-black transition-colors" />
          <input 
            name="user_email" 
            type="email" 
            placeholder="TON EMAIL" 
            required 
            className="peer w-full bg-white/[0.04] md:bg-black/15 border border-white/10 md:border-2 md:border-black/20 rounded-2xl pl-11 pr-4 py-3 md:py-3.5 text-white md:text-black placeholder-white/30 md:placeholder-black/60 font-cartoon uppercase tracking-wide focus:outline-none focus:bg-white/[0.06] md:focus:bg-black/25 md:focus:border-black transition-all text-base md:text-lg md:font-bold" 
          />
        </div>
      </div>

      <div className="relative group">
        <MessageSquare size={16} className="absolute left-4 top-3.5 text-white/40 md:text-black/60 group-focus-within:text-blue-400 md:group-focus-within:text-black transition-colors" />
        <textarea
          name="message" 
          rows="3" 
          maxLength={280} 
          required 
          placeholder="COMMENCE À ÉCRIRE..."
          onChange={(e) => onMsgChange(e.target.value.length)}
          className="peer w-full bg-white/[0.04] md:bg-black/15 border border-white/10 md:border-2 md:border-black/20 rounded-2xl pl-11 pr-4 py-3 md:py-3.5 text-white md:text-black placeholder-white/30 md:placeholder-black/60 font-cartoon uppercase tracking-wide focus:outline-none focus:bg-white/[0.06] md:focus:bg-black/25 md:focus:border-black transition-all text-base md:text-lg md:font-bold resize-none"
        />
        <span className="absolute right-4 bottom-3 text-[10px] md:text-xs font-cartoon text-white/30 md:text-black/60 md:font-bold">{msgLength}/280</span>
      </div>

      <motion.button
        type="submit" 
        disabled={isSending}
        whileTap={{ scale: 0.97 }}
        className={`relative w-full py-3.5 md:py-4 px-6 font-cartoon uppercase rounded-2xl tracking-[0.2em] text-lg md:text-lg md:font-bold transition-colors flex items-center justify-center gap-3 overflow-hidden shadow-lg ${
          isSending 
            ? "bg-white/20 md:bg-black/40 text-white cursor-not-allowed" 
            : sent 
            ? "bg-green-500 text-black" 
            : "bg-white text-black hover:bg-blue-500 md:hover:bg-black md:hover:text-white"
        }`}
      >
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.span key="sent" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <Check size={16} /> Message envoyé
            </motion.span>
          ) : (
            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.25 }} className="flex items-center gap-2">
              {isSending ? "Envoi en cours..." : "Envoyer le message"}
              {!isSending && (
                <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}>
                  <Send size={16} />
                </motion.span>
              )}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </form>
  );
}

// ============================================================
// MAIL CARD — style ParcoursCard, en bleu ("Mon mail ?")
// ============================================================
function MailCard({ mode = "hover", className = "" }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const isClickMode = mode === "click";

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <motion.div
      initial="rest"
      whileHover={!isClickMode ? "hover" : undefined}
      animate={isClickMode ? (open ? "hover" : "rest") : undefined}
      onClick={isClickMode ? () => setOpen((v) => !v) : undefined}
      whileTap={isClickMode ? { scale: 0.97 } : undefined}
      className={`relative bg-[#0c0c0c]/70 backdrop-blur-sm overflow-hidden rounded-xl flex items-center justify-center select-none ${isClickMode ? "cursor-pointer" : ""} ${className}`}
    >
      <AnimatedFrame hoverColor={ACCENT} />
      <BandsFill color={ACCENT} />

      <motion.div variants={contentBlurVariants} className="relative z-10 flex items-center gap-2 px-4 pointer-events-none">
        <Mail size={14} className="text-blue-400 flex-shrink-0" />
        <span className="font-cartoon uppercase text-white text-[20px] tracking-wide">Mon mail ?</span>
      </motion.div>

      <motion.div variants={revealVariants} className="absolute inset-0 z-20 flex items-center justify-center gap-2 px-3 bg-blue-500/10 backdrop-blur-md">
        <span className="font-cartoon text-white text-[18px] sm:text-[19px] tracking-wide truncate max-w-[75%]">{emailAddress}</span>
        <button onClick={handleCopy} className="flex-shrink-0 text-white/70 hover:text-white transition-colors">
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
        </button>
      </motion.div>
    </motion.div>
  );
}

// ============================================================
// SOCIAL KEY (inchangé)
// ============================================================
function SocialKey({ Icon, href, label, brand }) {
  const [restRotate] = useState(() => (Math.random() * 6 - 3).toFixed(1));

  const keyVariants = {
    rest: { rotate: Number(restRotate), y: 0, scale: 1, boxShadow: "0 3px 0 #000, 0 3px 8px rgba(0,0,0,.4)", borderColor: "#2a2a2a" },
    hover: { rotate: 0, y: -4, scale: 1.05, boxShadow: `0 6px 0 #000, 0 8px 12px rgba(0,0,0,.5), 0 0 12px ${brand}`, borderColor: brand },
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      variants={keyVariants}
      transition={{ duration: 0.3, ease: [0.2, 0.9, 0.3, 1.3] }}
      className="relative flex flex-col items-center justify-center rounded-lg border-2 bg-[#1a1a1a] select-none w-16 h-16 flex-shrink-0"
    >
      <motion.div variants={{ rest: { color: "rgba(255,255,255,0.4)" }, hover: { color: brand } }}>
        <Icon size={20} />
      </motion.div>
    </motion.a>
  );
}

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================
export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [showOverlay, setShowOverlay] = useState(true);

  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [msgLength, setMsgLength] = useState(0);
  const formRef = useRef();

  // hover + focus combinés pour le bloc "contact direct" desktop
  // -> corrige le bug où l'animation restait bloquée en tapant dans un champ
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isFormOpen = isHovered || isFocused;

  // pagination mobile : "info" ou "form"
  const [mobileView, setMobileView] = useState("info");

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowOverlay(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    const SERVICE_ID = "service_0xthhlv";
    const TEMPLATE_ID = "template_e6k60mb";
    const PUBLIC_KEY = "dOHQSlow-bcSRDa5i";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY).then(
      () => {
        setIsSending(false);
        setSent(true);
        formRef.current.reset();
        setMsgLength(0);
        setTimeout(() => setSent(false), 2500);
      },
      (error) => {
        setIsSending(false);
        alert("Erreur lors de l'envoi. Réessaie.");
        console.log(error.text);
      }
    );
  };

  const handleFieldFocus = () => setIsFocused(true);
  const handleFieldBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setIsFocused(false);
  };

  return (
    <div ref={sectionRef} className="w-full h-full relative">

      {/* ============================ DESKTOP ============================ */}
      <section className="hidden lg:flex relative w-full h-screen bg-[#080808] overflow-hidden font-cartoon text-white flex-row pt-8 px-10 pb-8 gap-8">
        <AnimatePresence>{showOverlay && <IntroOverlay key="intro-contact-d" startAnimation={isInView} />}</AnimatePresence>
        <BackgroundGrid />

        {/* GAUCHE : titre + description + infos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 flex-[0.4] h-full flex flex-col justify-center mt-6 "
        >
          <GiantTitle isVisible={!showOverlay} className="text-[8.5vw] mb-4">
            ME<br /><span className="bg-blue-500 text-black">CONTACTER</span>
          </GiantTitle>

          <p className="font-cartoon text-[18px] text-white/50 leading-relaxed max-w-[90%] uppercase mb-2">
            Une idée, un projet ? Contacte-moi via les réseaux ou passe par le bloc à droite pour m'écrire directement.
          </p>

          <div className="flex flex-col gap-3 mt-2">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center gap-2 bg-[#0c0c0c]/70 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10 flex-shrink-0">
                <MapPin size={15} className="text-blue-500" />
                <span className="text-white/80 font-cartoon uppercase text-[30px]">Oran, DZ</span>
              </div>
              <MailCard mode="hover" className="flex-1 h-[70px]" />
            </div>
            <div className="flex items-center gap-3">
              {socials.map((s) => <SocialKey key={s.label} {...s} />)}
            </div>
          </div>
        </motion.div>

        {/* DROITE : bloc interactif "contact direct" plein écran */}
        <motion.div
          initial="rest"
          animate={isFormOpen ? "hover" : "rest"}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={handleFieldFocus}
          onBlur={handleFieldBlur}
          className="relative z-10 flex-[0.6] h-full rounded-2xl overflow-hidden bg-black/50 backdrop-blur-sm"
        >
          <AnimatedFrame hoverColor={ACCENT} />
          <BandsFill color={ACCENT} />

          <motion.div variants={contentBlurVariants} className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-10 pointer-events-none">
            <h3 className="font-cartoon uppercase text-white text-[8.2vw] leading-[0.9] mb-4">
              Contact <span className="bg-blue-500 text-black">Direct</span> ?
            </h3>
            <p className="text-white/50 uppercase text-[18px] tracking-wide max-w-md">
              Survole ce bloc pour faire apparaître le formulaire et m'envoyer un message.
            </p>
          </motion.div>

          <motion.div variants={revealVariants} className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-md">
              <h4 className="font-cartoon uppercase text-black text-5xl mb-4 text-center">Envoie ton message</h4>
              <ContactForm
                formRef={formRef}
                sendEmail={sendEmail}
                isSending={isSending}
                sent={sent}
                msgLength={msgLength}
                onMsgChange={setMsgLength}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ============================ MOBILE ============================ */}
      <section className="flex lg:hidden relative w-full h-[100dvh] bg-[#080808] overflow-hidden font-cartoon text-white flex-col pt-20 px-4 pb-4">
        <AnimatePresence>{showOverlay && <IntroOverlay key="intro-contact-m" startAnimation={isInView} />}</AnimatePresence>
        <BackgroundGrid />

        <AnimatePresence mode="wait">
          {mobileView === "info" ? (
            <motion.div
              key="info"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 flex-1 flex flex-col justify-center min-h-0"
            >
              <GiantTitle isVisible={!showOverlay} className="text-[20vw] mb-2">
                ME<br /><span className="bg-blue-500 text-black">CONTACTER</span>
              </GiantTitle>

              <p className="font-cartoon text-[5.5vw] text-white/50 leading-relaxed uppercase mb-4">
                Une idée, un projet ? Écris-moi ou passe par les réseaux.
              </p>

              <div className="flex flex-col gap-2.5 mb-4">
                <div className="flex items-center items-start flex-col gap-2.5">
                  <div className="relative flex items-center gap-2 bg-[#0c0c0c]/70 rounded-xl px-3 py-2.5 border border-white/10 flex-shrink-0">
                    <MapPin size={18} className="text-blue-500" />
                    <span className="text-white/80 font-cartoon uppercase text-[30px]">Oran, DZ</span>
                  </div>
                  <MailCard mode="click" className="flex w-[90vw] h-[55px]" />
                </div>
                <div className="flex justify-center items-center gap-2.5">
                  {socials.map((s) => <SocialKey key={s.label} {...s} />)}
                </div>
              </div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => setMobileView("form")}
                className="relative w-full py-3.5 rounded-xl font-cartoon uppercase tracking-widest text-lg bg-black border border-blue-500/40 text-white flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-black hover:border-blue-500 transition-colors"
              >
                Contact Direct
                <ArrowRight size={16} />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 flex-1 flex flex-col min-h-0"
            >
              <button
                type="button"
                onClick={() => setMobileView("info")}
                className="flex items-center gap-2 text-white/60 font-cartoon uppercase text-xs mb-4 w-fit"
              >
                <ArrowLeft size={14} /> Retour
              </button>

              <h3 className="font-cartoon uppercase text-white text-5xl  text-center">
                Envoie ton <span className= "text-black bg-blue-500">message</span>
              </h3>

              <div className="flex-1 flex flex-col justify-center">
                <ContactForm
                  formRef={formRef}
                  sendEmail={sendEmail}
                  isSending={isSending}
                  sent={sent}
                  msgLength={msgLength}
                  onMsgChange={setMsgLength}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}