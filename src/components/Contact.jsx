import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Send, Copy, Check, Github, Linkedin, MessageCircle, Mail, MapPin, X } from "lucide-react";
import emailjs from "@emailjs/browser";

// ============================================================
// DONNÉES DE CONTACT (FR uniquement)
// ============================================================
const emailAddress = "moundirbechikh03@gmail.com";
const links = {
  github: "https://github.com/Moundirbechikh",
  linkedin: "https://www.linkedin.com/in/TON-LIEN-LINKEDIN", // <-- remplace par ton vrai lien
  whatsapp: "https://wa.me/213782638109",
};

// ============================================================
// BANDES DIAGONALES (identiques au reste du site)
// ============================================================
const barOuterTop = { initial: { scaleY: 0 }, animate: { scaleY: 1, transition: { duration: 0.45, ease: "easeInOut" } } };
const barOuterBottom = { initial: { scaleY: 0 }, animate: { scaleY: 1, transition: { duration: 0.45, ease: "easeInOut" } } };
const barInnerTop = { initial: { scaleY: 0 }, animate: { scaleY: 1, transition: { duration: 0.45, ease: "easeInOut", delay: 0.15 } } };
const barInnerBottom = { initial: { scaleY: 0 }, animate: { scaleY: 1, transition: { duration: 0.45, ease: "easeInOut", delay: 0.15 } } };

function BandsFill({ color = "bg-blue-500" }) {
  return (
    <div className="absolute -inset-2 overflow-hidden rounded-[4px] pointer-events-none z-10">
      <div className="absolute w-[260%] h-[260%] top-[-80%] left-[-80%] rotate-[-35deg] flex flex-col">
        <motion.div variants={barOuterTop} initial="initial" animate="animate" className={`w-full h-[25%] ${color} origin-top`} />
        <motion.div variants={barInnerTop} initial="initial" animate="animate" className={`w-full h-[25%] ${color} origin-top`} />
        <motion.div variants={barInnerBottom} initial="initial" animate="animate" className={`w-full h-[25%] ${color} origin-bottom`} />
        <motion.div variants={barOuterBottom} initial="initial" animate="animate" className={`w-full h-[25%] ${color} origin-bottom`} />
      </div>
    </div>
  );
}

function AnimatedFrame({ hoverColor = "#3b82f6" }) {
  return (
    <svg className="absolute -inset-2 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
      <motion.rect
        initial={{ stroke: "#ffffff", opacity: 0.15 }}
        animate={{ stroke: hoverColor, opacity: 1 }}
        transition={{ duration: 0.3 }}
        x="0.5" y="0.5" width="99" height="99" rx="4" fill="none" strokeWidth="1.5" strokeDasharray="6 4" vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function BackgroundGrid() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
      <div className="absolute w-[200vw] h-[200vh] flex flex-wrap gap-4 md:gap-6 justify-center content-center rotate-[-35deg] opacity-50">
        {Array.from({ length: 160 }).map((_, i) => (
          <div key={i} className="w-24 h-24 md:w-32 md:h-32 border-2 border-dashed border-blue-500/10 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

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

function Highlight({ children, className = "" }) {
  return (
    <span className={`inline-block bg-blue-500 text-black py-0.5 px-1 mx-1 font-black font-cartoon uppercase tracking-wide whitespace-nowrap ${className}`}>
      {children}
    </span>
  );
}

// Plaque décorative — même logique mix-blend-difference que Hero/About :
// commence au centre horizontal jusqu'à la fin, et du haut jusqu'au centre vertical.
function CornerPlaque() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3, x: 40, y: -40 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.5 }}
      className="absolute z-20 top-0 left-1/2 w-1/2 h-1/2 bg-white rounded-[20px] mix-blend-difference pointer-events-none"
    />
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
// FORMULAIRE (partagé desktop + modal mobile)
// ============================================================
function ContactForm({ formRef, sendEmail, isSending }) {
  return (
    <form ref={formRef} onSubmit={sendEmail} className="space-y-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-cartoon uppercase tracking-widest text-white/40">Identifie-toi</label>
          <input name="user_name" type="text" placeholder="TON NOM" required className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white font-cartoon uppercase tracking-wide focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-cartoon uppercase tracking-widest text-white/40">Ton adresse</label>
          <input name="user_email" type="email" placeholder="TON EMAIL" required className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white font-cartoon uppercase tracking-wide focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-cartoon uppercase tracking-widest text-white/40">Ton message</label>
        <textarea name="message" rows="4" placeholder="COMMENCE À ÉCRIRE..." required className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white font-cartoon uppercase tracking-wide focus:outline-none focus:border-blue-500/50 transition-all text-sm resize-none" />
      </div>
      <button type="submit" disabled={isSending} className={`w-full py-5 font-cartoon uppercase rounded-br-3xl tracking-[0.3em] text-sm transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${isSending ? "bg-white/20 text-white cursor-not-allowed" : "bg-white text-black hover:bg-blue-500"}`}>
        {isSending ? "Envoi en cours..." : <>Envoyer le message <Send size={18} /></>}
      </button>
    </form>
  );
}

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================
export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [showOverlay, setShowOverlay] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [mobileFormOpen, setMobileFormOpen] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowOverlay(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const handleCopy = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    const SERVICE_ID = "service_0xthhlv";
    const TEMPLATE_ID = "template_e6k60mb";
    const PUBLIC_KEY = "dOHQSlow-bcSRDa5i";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY).then(
      () => {
        setIsSending(false);
        alert("Message envoyé avec succès !");
        formRef.current.reset();
        setMobileFormOpen(false);
      },
      (error) => {
        setIsSending(false);
        alert("Erreur lors de l'envoi. Réessaie.");
        console.log(error.text);
      }
    );
  };

  return (
    <div ref={sectionRef} className="relative w-full h-[100dvh] bg-[#080808] font-cartoon text-white overflow-hidden select-none">
      <AnimatePresence>{showOverlay && <IntroOverlay key="intro-contact" startAnimation={isInView} />}</AnimatePresence>
      <BackgroundGrid />

      {/* ============================ DESKTOP (>= lg) ============================ */}
      <div className="hidden lg:flex relative z-10 w-full h-full flex-row p-12 gap-10">
        <div className="relative flex-[0.34] h-full flex flex-col justify-end pb-12">
          <GiantTitle isVisible={!showOverlay} className="text-[7.5vw] mb-4">
            ME<br /><span className="bg-blue-500 text-black px-1">CONTACTER</span>
          </GiantTitle>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }} transition={{ duration: 0.4, delay: 0.4 }} className="font-cartoon text-xl text-white/80 leading-relaxed max-w-[95%] uppercase space-y-4">
            <p>
              Une idée, un projet, une question ? <Highlight className="text-[1.1em]">Écris-moi</Highlight> directement ou passe par le formulaire — je réponds toujours à mes <Highlight className="text-[1.1em]">messages</Highlight>.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={!showOverlay ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.6 }} className="mt-6 flex items-center gap-2 text-white/40 uppercase text-xs tracking-widest font-cartoon">
            <Mail className="w-5 h-5 text-blue-500" /> Réponse rapide garantie
          </motion.div>
        </div>

        <div className="relative flex-[0.66] h-full flex items-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={!showOverlay ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }} transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.2 }} className="relative w-full h-[92%] grid grid-cols-12 gap-6">
            <CornerPlaque />

            {/* Formulaire */}
            <div className="relative col-span-7 bg-[#0c0c0c] rounded-[2.5rem] p-10 flex flex-col justify-center">
              <AnimatedFrame hoverColor="#3b82f6" />
              <BandsFill color="bg-blue-500/70" />
              <div className="relative z-20">
                <ContactForm formRef={formRef} sendEmail={sendEmail} isSending={isSending} />
              </div>
            </div>

            {/* Colonne infos */}
            <div className="col-span-5 flex flex-col gap-6">
              <div className="relative flex-1 bg-[#0c0c0c] rounded-[2.5rem] p-8 flex flex-col justify-between">
                <AnimatedFrame hoverColor="#3b82f6" />
                <div className="relative z-20 flex justify-between items-start">
                  <div className="p-3 bg-white/5 rounded-xl text-blue-500"><Mail size={20} /></div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-cartoon text-white/40 uppercase tracking-widest">Disponible</span>
                  </div>
                </div>
                <div className="relative z-20">
                  <p className="text-[10px] font-cartoon text-white/30 uppercase tracking-[0.3em] mb-2">Connexion directe</p>
                  <h3 className="text-xl text-white/90 font-cartoon uppercase break-all mb-4">{emailAddress}</h3>
                  <button onClick={handleCopy} className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white hover:text-black transition-all rounded-xl text-[10px] font-cartoon uppercase tracking-widest text-white">
                    {copied ? <><Check size={14} /> Copié !</> : <><Copy size={14} /> Copier</>}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 flex-1">
                <div className="relative bg-[#0c0c0c] rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-center">
                  <AnimatedFrame hoverColor="#3b82f6" />
                  <MapPin size={24} className="relative z-20 text-blue-500 mb-3" />
                  <p className="relative z-20 text-[9px] font-cartoon text-white/30 uppercase tracking-widest mb-1">Basé à</p>
                  <p className="relative z-20 text-white/80 font-cartoon uppercase text-sm">Oran, DZ</p>
                </div>
                <div className="relative bg-[#0c0c0c] rounded-[2.5rem] p-6 flex flex-col items-center justify-center">
                  <AnimatedFrame hoverColor="#3b82f6" />
                  <div className="relative z-20 flex gap-3">
                    <a href={links.github} target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-xl text-white/40 hover:text-white hover:bg-[#333] transition-all"><Github size={18} /></a>
                    <a href={links.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-xl text-white/40 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all"><Linkedin size={18} /></a>
                    <a href={links.whatsapp} target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-xl text-white/40 hover:text-[#25D366] hover:bg-[#25D366]/10 transition-all"><MessageCircle size={18} /></a>
                  </div>
                  <p className="relative z-20 text-[9px] font-cartoon text-white/30 uppercase tracking-widest mt-4">Me suivre</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============================ MOBILE (< lg) ============================ */}
      <div className="flex lg:hidden relative z-10 w-full h-full flex-col px-4 pt-16 pb-6">
        <div className="flex-shrink-0 flex flex-col items-start z-10 pb-2">
          <motion.p initial={{ opacity: 0, y: 6 }} animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }} transition={{ duration: 0.3, delay: 0.05 }} className="relative z-10 text-[9vw] sm:text-[4vw] uppercase tracking-wide font-cartoon text-black bg-blue-500 px-1 leading-none">Me</motion.p>
          <GiantTitle isVisible={!showOverlay} className="text-[20vw] sm:text-[14vw] mb-2 text-white">CONTACTER</GiantTitle>
          <motion.p initial={{ opacity: 0, y: 6 }} animate={!showOverlay ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }} transition={{ duration: 0.4, delay: 0.4 }} className="font-cartoon text-[13px] text-white/80 uppercase mt-2 max-w-[95%] leading-snug">Une idée, un projet ? Écris-moi ou touche un lien ci-dessous.</motion.p>
        </div>

        <div className="relative flex-1 min-h-0 pt-6 flex flex-col justify-center gap-5">
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={!showOverlay ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }} transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.15 }} className="relative bg-[#0c0c0c] rounded-[2rem] p-6">
            <AnimatedFrame hoverColor="#3b82f6" />
            <div className="relative z-20 flex flex-col items-center text-center">
              <p className="text-[10px] font-cartoon text-white/30 uppercase tracking-[0.3em] mb-2">Connexion directe</p>
              <h3 className="text-base text-white/90 font-cartoon uppercase break-all mb-4">{emailAddress}</h3>
              <button onClick={handleCopy} className="flex items-center gap-2 px-6 py-3 bg-white/5 active:bg-white active:text-black transition-all rounded-xl text-[10px] font-cartoon uppercase tracking-widest text-white">
                {copied ? <><Check size={14} /> Copié !</> : <><Copy size={14} /> Copier l'email</>}
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-4">
            <a href={links.github} target="_blank" rel="noreferrer" className="relative bg-[#0c0c0c] rounded-2xl p-5 flex flex-col items-center gap-2">
              <AnimatedFrame hoverColor="#3b82f6" /><Github className="relative z-20 text-white/70" size={22} /><span className="relative z-20 text-[9px] font-cartoon uppercase text-white/40">GitHub</span>
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="relative bg-[#0c0c0c] rounded-2xl p-5 flex flex-col items-center gap-2">
              <AnimatedFrame hoverColor="#3b82f6" /><Linkedin className="relative z-20 text-white/70" size={22} /><span className="relative z-20 text-[9px] font-cartoon uppercase text-white/40">LinkedIn</span>
            </a>
            <a href={links.whatsapp} target="_blank" rel="noreferrer" className="relative bg-[#0c0c0c] rounded-2xl p-5 flex flex-col items-center gap-2">
              <AnimatedFrame hoverColor="#3b82f6" /><MessageCircle className="relative z-20 text-white/70" size={22} /><span className="relative z-20 text-[9px] font-cartoon uppercase text-white/40">WhatsApp</span>
            </a>
          </div>

          <button onClick={() => setMobileFormOpen(true)} className="flex-shrink-0 self-center font-cartoon uppercase tracking-wide text-lg bg-blue-500 text-black px-8 py-3 rounded-full shadow-lg active:scale-95 transition-transform">
            Ouvrir le formulaire
          </button>
        </div>
      </div>

      {/* Modal formulaire (mobile uniquement) */}
      <AnimatePresence>
        {mobileFormOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileFormOpen(false)} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center px-5">
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} transition={{ type: "spring", stiffness: 260, damping: 24 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-h-[85vh] overflow-y-auto bg-[#0c0c0c] rounded-[2rem] p-6">
              <AnimatedFrame hoverColor="#3b82f6" />
              <button onClick={() => setMobileFormOpen(false)} className="absolute top-4 right-4 z-30 p-2 bg-white/5 rounded-full text-white/60"><X size={18} /></button>
              <div className="relative z-20 pt-4">
                <h3 className="font-cartoon uppercase text-2xl text-white mb-4">Envoie-moi<br /><span className="bg-blue-500 text-black px-1">un message</span></h3>
                <ContactForm formRef={formRef} sendEmail={sendEmail} isSending={isSending} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}