"use client";

import { useState } from 'react';
import Header from '../components/Header';
import Projects from '../components/Projects';
import Footer from '../components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('projects');

  return (
    <div className="min-h-screen bg-linear-to-br from-stone-950 via-stone-900 to-stone-950 text-white">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;