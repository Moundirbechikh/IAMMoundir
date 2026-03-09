import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Send, Copy, Check, Github, MessageCircle, Instagram, Mail, MapPin, Terminal, Zap } from "lucide-react";
import emailjs from "@emailjs/browser";

const contactTranslations = [
  {
    title: "Get in", outline: "Touch",
    badge: "Communication Portal",
    labelName: "Identify Yourself",
    labelEmail: "Digital Address",
    labelMsg: "Your Transmission",
    placeholderMsg: "START TYPING...",
    btnSend: "Send Message",
    btnSending: "Transmitting...",
    directConn: "Direct Connection",
    available: "Available now",
    basedIn: "Based in",
    status: "System encrypted",
    bgText: "CONTACT CONTACT CONTACT CONTACT"
  },
  {
    title: "Me", outline: "Contacter",
    badge: "Portail de Communication",
    labelName: "Identifiez-vous",
    labelEmail: "Adresse Digitale",
    labelMsg: "Votre Transmission",
    placeholderMsg: "COMMENCER À ÉCRIRE...",
    btnSend: "Envoyer Message",
    btnSending: "Envoi en cours...",
    directConn: "Connexion Directe",
    available: "Disponible",
    basedIn: "Basé à",
    status: "Système encrypté",
    bgText: "CONTACT CONTACT CONTACT CONTACT"
  },
  {
    title: "En", outline: "Contacto",
    badge: "Portal de Comunicación",
    labelName: "Identifícate",
    labelEmail: "Dirección Digital",
    labelMsg: "Tu Transmisión",
    placeholderMsg: "EMPIEZA A ESCRIBIR...",
    btnSend: "Enviar Mensaje",
    btnSending: "Transmitiendo...",
    directConn: "Conexión Directa",
    available: "Disponible ahora",
    basedIn: "Basado en",
    status: "Sistema encriptado",
    bgText: "CONTACTO CONTACTO CONTACTO CONTACTO"
  }
];

function Contact() {
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const formRef = useRef();
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xText = useTransform(scrollYProgress, [0, 1], [0, -500]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % contactTranslations.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = contactTranslations[index];
  const emailAddress = "moundirbechikh03@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    // REMPLACE CES 3 VALEURS PAR LES TIENNES DANS EMAILJS
    const SERVICE_ID = "service_0xthhlv";
    const TEMPLATE_ID = "template_e6k60mb";
    const PUBLIC_KEY = "dOHQSlow-bcSRDa5i";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then((result) => {
          setIsSending(false);
          alert("Success! Message transmitted.");
          e.target.reset();
      }, (error) => {
          setIsSending(false);
          alert("Error in transmission. Please try again.");
          console.log(error.text);
      });
  };

  return (
    <section ref={containerRef} id="contact" className="min-h-screen w-full bg-[#050505] py-24 px-6 relative overflow-hidden font-body border-t border-white/5">
      
      {/* TEXTE DE FOND DYNAMIQUE (SCROLL) */}
      <div className="absolute top-20 left-0 whitespace-nowrap pointer-events-none opacity-[0.02] select-none">
        <motion.h2 style={{ x: xText }} className="text-[250px] font-black text-white uppercase tracking-tighter">
          {current.bgText}
        </motion.h2>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* TITRE SECTION */}
        <div className="mb-20 text-center lg:text-left">
           <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-6">
             <Zap size={12} className="text-yellow-500" /> {current.badge}
           </motion.div>
           <AnimatePresence mode="wait">
            <motion.h2 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="text-6xl md:text-8xl font-cartoon text-white uppercase leading-none"
            >
              {current.title} <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>{current.outline}</span>
            </motion.h2>
           </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* FORMULAIRE AVEC LOGIQUE EMAILJS */}
          <motion.div className="lg:col-span-7 bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-8 md:p-12 hover:border-white/10 transition-all duration-500 backdrop-blur-sm">
            <form ref={formRef} onSubmit={sendEmail} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">{current.labelName}</label>
                  <input 
                    name="user_name" 
                    type="text" 
                    placeholder="NAME" 
                    required 
                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-yellow-500/30 transition-all font-mono text-sm" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">{current.labelEmail}</label>
                  <input 
                    name="user_email" 
                    type="email" 
                    placeholder="EMAIL" 
                    required 
                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-yellow-500/30 transition-all font-mono text-sm" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">{current.labelMsg}</label>
                <textarea 
                  name="message" 
                  rows="4" 
                  placeholder={current.placeholderMsg} 
                  required 
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-yellow-500/30 transition-all font-mono text-sm resize-none" 
                />
              </div>
              <button 
                type="submit" 
                disabled={isSending} 
                className={`w-full py-5 font-black uppercase rounded-br-3xl tracking-[0.3em] text-xs transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${isSending ? 'bg-white/20 text-white cursor-not-allowed' : 'bg-white text-black hover:bg-yellow-500'}`}
              >
                {isSending ? current.btnSending : <>{current.btnSend} <Send size={16} /></>}
              </button>
            </form>
          </motion.div>

          {/* INFOS LATÉRALES (Inchangé) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between items-start group hover:border-white/10 transition-all">
              <div className="flex justify-between w-full mb-8">
                <div className="p-3 bg-white/5 rounded-xl text-white/40 group-hover:text-yellow-500 transition-colors"><Mail size={20} /></div>
                <div className="flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                   <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{current.available}</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em] mb-2">{current.directConn}</p>
                <h3 className="text-xl md:text-2xl text-white/80 font-mono break-all mb-6">{emailAddress}</h3>
                <button onClick={handleCopy} className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white hover:text-black transition-all rounded-xl text-[10px] font-black uppercase tracking-widest text-white">
                  {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
                </button>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-6 flex-1">
               <div className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-center group">
                  <MapPin size={24} className="text-white/10 mb-4 group-hover:text-red-500 transition-colors" />
                  <p className="text-[9px] font-black text-white/10 uppercase tracking-widest mb-1">{current.basedIn}</p>
                  <p className="text-white/60 font-black text-xs uppercase tracking-tighter">Oran, DZ</p>
               </div>

               <div className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-6 flex flex-col items-center justify-center">
                  <div className="flex gap-3">
                    <a href="https://github.com/Moundirbechikh" className="p-3 bg-white/5 rounded-xl text-white/20 hover:text-[#fff] hover:bg-[#333] transition-all"><Github size={18} /></a>
                    <a href="https://wa.me/213782638109" target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-xl text-white/20 hover:text-[#25D366] hover:bg-[#25D366]/10 transition-all"><MessageCircle size={18} /></a>
                    <a href="https://www.instagram.com/moundir_bech?igsh=c25yaGl3dGM5NTFz" className="p-3 bg-white/5 rounded-xl text-white/20 hover:text-[#E4405F] hover:bg-[#E4405F]/10 transition-all"><Instagram size={18} /></a>
                  </div>
                  <p className="text-[9px] font-black text-white/10 uppercase tracking-widest mt-4">Connect</p>
               </div>
            </div>

            <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
               <Terminal size={14} className="text-white/20" />
               <div className="flex-1 h-[1px] bg-white/5 overflow-hidden">
                  <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="w-1/3 h-full bg-yellow-500/20" />
               </div>
               <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.3em]">{current.status}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;