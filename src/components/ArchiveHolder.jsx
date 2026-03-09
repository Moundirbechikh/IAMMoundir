import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArchiveCard from "./ArchiveCard";

// --- IMPORTS ASSETS ---


import back12 from "../assets/back12.mp4";
import back5 from "../assets/back5.mp4";
import back6 from "../assets/back6.jpg";
import back7 from "../assets/back7.jpg";
import back10Vid from "../assets/back10.mp4";
import back8 from "../assets/back8.png";
import back9Vid from "../assets/back9.mp4";
import back11Vid from "../assets/back11.mp4";

const archiveTranslations = [
  { text: "Past Archives", lang: "EN" },
  { text: "Anciens Projets", lang: "FR" },
  { text: "Proyectos Pasados", lang: "ES" }
];

export default function ArchiveHolder() {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768;
    const handleResize = () => setIsMobile(checkMobile());
    
    setIsMobile(checkMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % archiveTranslations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // CONFIGURATION MOBILE : Centrage décalé à gauche (45%) et espacement vertical compact
// CONFIGURATION : Descriptions détaillées avec ton dialecte technique et contexte PFE/Data
const oldProjects = [
  { 
    id: "A-01", date: "Sep. 2023", type: "wide", isVideo: true, title: "Ma Bibliothèque", 
    purpose: "C'est une version améliorée (remake) de mon projet PFE de Licence. Un système de bibliothèque informatisé gérant trois types d'accès : les employés, les clients et le responsable avec toutes leurs fonctionnalités.", how: "React + Supabase", media: back5, 
    top: isMobile ? "4%" : "12%", 
    left: isMobile ? "45%" : "5%", 
    rotate: isMobile ? -2 : -4, zIndex: 10 
  },
  { 
    id: "A-02", date: "Jan. 2023", type: "regular", isVideo: true, title: "Finding the perfect movie", 
    purpose: "Un système complet où l'user choisit son mode : similitude, tendance ou acteurs. La méthode classique inclut un filtrage poussé par catégorie, année, et nom des acteurs pour trouver exactement ce qu'on cherche.", how: "Python + Streamlit", media: back9Vid, 
    top: isMobile ? "12%" : "8%", 
    left: isMobile ? "45%" : "38%", 
    rotate: isMobile ? 2 : 3, zIndex: 12 
  },
  { 
    id: "A-03", date: "Sep. 2025", type: "wide", isVideo: true, title: "Brain Box", 
    purpose: "Web app pour organiser le travail en entreprise : classement des documents, activités et tâches par employé avec historique complet. Inclut un chatbot IA pour expliquer chaque détail du projet et un système d'auth sécurisé.", how: "Vite + React + Node.js + mangodb", media: back12, 
    top: isMobile ? "20%" : "18%", 
    left: isMobile ? "45%" : "65%", 
    rotate: isMobile ? -3 : -6, zIndex: 15 
  },
  { 
    id: "A-04", date: "Aou. 2024", type: "regular", isVideo: true, title: "Fast Bite", 
    purpose: "Mon premier gros site de restaurant 100% fonctionnel. Gestion des commandes réelles, menus dynamiques, panier interactif et avis clients avec un flux frontend/backend super fluide.", how: "Node.js + React + MongoDB", media: back11Vid, 
    top: isMobile ? "28%" : "45%", 
    left: isMobile ? "45%" : "12%", 
    rotate: isMobile ? 3 : 8, zIndex: 18 
  },
  { 
    id: "A-05", date: "Oct. 2025", type: "wide", isVideo: true, title: "My New Style", 
    purpose: "Une application e-commerce hyper classe pour vendre des habits classiques. Le focus est mis sur un design épuré et une expérience utilisateur chique pour refléter le style des vêtements.", how: "Next.js + Firebase", media: back10Vid, 
    top: isMobile ? "36%" : "42%", 
    left: isMobile ? "45%" : "45%", 
    rotate: isMobile ? -2 : -3, zIndex: 20 
  },
  { 
    id: "A-06", date: "Dec. 2023", type: "regular", isVideo: false, title: "Enrichissement d'articles", 
    purpose: "Système qui prend une phrase en input, cherche sur le web via APIs pour extraire les infos manquantes (surtout les dates, lieux, etc.) non présentes au départ pour générer un article complet et enrichi.", how: "APIs + Spacy + Python + BeautifulSoup", media: back6, 
    top: isMobile ? "44%" : "55%", 
    left: isMobile ? "45%" : "72%", 
    rotate: isMobile ? 2 : 5, zIndex: 22 
  },
  { 
    id: "A-07", date: "Fev. 2024", type: "wide", isVideo: false, title: "Analyse Football (Buteurs)", 
    purpose: "Étude sur une liste d'attaquants utilisant 12 variables techniques (comme le nombre de matchs). L'objectif est de trouver combien de profils types existent via l'ACP, la corrélation et le clustering K-Means.pour facilite le recrutement", how: "Python + Matplotlib + Seaborn", media: back8, 
    top: isMobile ? "52%" : "72%", 
    left: isMobile ? "45%" : "22%", 
    rotate: isMobile ? -2 : -4, zIndex: 25 
  },
  { 
    id: "A-08", date: "Avr. 2022", type: "regular", isVideo: false, title: "Brotherhood", 
    purpose: "Mon tout premier site de restaurant créé en première année de développement web. Il regroupe toutes les bases apprises (HTML/CSS/JS) pour mettre en place une interface de restauration simple.", how: "HTML + CSS + Vanilla JS", media: back7, 
    top: isMobile ? "60%" : "70%", 
    left: isMobile ? "45%" : "55%", 
    rotate: isMobile ? 4 : 10, zIndex: 28 
  }
];

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#080808] border-t border-white/5 py-10 md:py-24 overflow-x-clip"
    >
      <div className="sticky top-10 md:relative md:top-0 left-6 md:left-20 z-0 pointer-events-none mb-10 md:mb-0">
        <AnimatePresence mode="wait">
          <motion.h2 
            key={index} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            className="text-4xl md:text-8xl font-cartoon text-white/5 uppercase leading-none"
          >
            {archiveTranslations[index].text.split(' ')[0]} <br/>
            {archiveTranslations[index].text.split(' ')[1] || ""}
          </motion.h2>
        </AnimatePresence>
      </div>

      <div 
        className="relative w-full max-w-7xl mx-auto mt-10 md:mt-20 px-4" 
        style={{ height: isMobile ? "100vh" : "85vh" }} 
      >
        {oldProjects.map((proj) => (
          <div 
            key={proj.id} 
            style={{ 
              position: "absolute", 
              top: proj.top, 
              left: proj.left, 
              // Le translateX(-50%) assure le centrage par rapport au point 'left'
              transform: isMobile ? "translateX(-50%)" : "none", 
              zIndex: activeId === proj.id ? 999 : proj.zIndex 
            }}
          >
            <ArchiveCard 
              project={proj} 
              onActive={() => setActiveId(proj.id)} 
              isActiveInParent={activeId === proj.id}
            />
          </div>
        ))}
      </div>
    </section>
  );
}