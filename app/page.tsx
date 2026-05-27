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