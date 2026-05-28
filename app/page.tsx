"use client";

import { useState } from 'react';
import Header from './components/Header';
import Skills from './components/Skills';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from 'react-hot-toast';
import Hero from './components/Hero';
import { Interactive } from './components/Interactive';
import Portfolio from './components/Portfolio';
import Socials from './components/Socials';
import Estimate from './components/Estimate';

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
        <Socials />
        <Header activeSection={activeSection} setActiveSection={setActiveSection} />
        <Hero />
        <Estimate />
        <Skills />
        <Interactive />
        <Portfolio />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;