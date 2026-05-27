"use client";

import { useRef, useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Experience from './components/Team';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import Hero2 from './components/Hero2';
import { Interactive } from './components/Interactive';
import Portfolio from './components/Portfolio';
import { Facebook, Github, Instagram, Linkedin } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        return hash.substring(1);
      }
    }
    return 'home';
  });

  return (
    <LanguageProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY}></div>
      <div className="min-h-screen  text-white">
        <div className="fixed flex flex-col left-5 h-screen items-center align-middle z-10 justify-center gap-6 max-xl:hidden">
              <a
                href="https://github.com/luniostudios"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-black/40 hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110"
              >
                <Github className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/company/luniostudios/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-black/40 hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61575845991065"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-black/40 hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.instagram.com/lunio_studios/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-black/40 hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
        <Header activeSection={activeSection} setActiveSection={setActiveSection} />
        <Hero2 />
        <Skills />
        <Interactive />
        <Portfolio />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;