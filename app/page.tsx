"use client";

import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-linear-to-br from-stone-950 via-stone-900 to-stone-950 text-white">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <Hero />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;