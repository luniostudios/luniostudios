"use client";

import { useState } from 'react';
import Header from '../components/Header';
import Projects from '../components/Projects';
import Footer from '../components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 text-white">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;