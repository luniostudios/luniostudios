"use client"

import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, Download, ArrowDown } from 'lucide-react';
import { easeIn, motion } from "motion/react"
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { t } = useLanguage();

  const stats = [
    { label: `${t('hero.card')}`, value: '3+' },
    { label: `${t('hero.card2')}`, value: '20+' },
    { label: `${t('hero.card3')}`, value: '3+' },
    { label: `${t('hero.card4')}`, value: '1k+' },
  ]

  // hidden points expressed as percentages of the container (x: 0..1, y: 0..1)
  const hiddenPoints = [
    { id: 'p1', code: 'LUNIO25', x: 0.12, y: 0.22 },
  ];

  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [lastFound, setLastFound] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      const threshold = 50; // px radius for finding a hidden code

      hiddenPoints.forEach((p) => {
        if (unlocked.includes(p.id)) return;
        const px = rect.width * p.x;
        const py = rect.height * p.y;
        const dist = Math.hypot(localX - px, localY - py);
        if (dist <= threshold) {
          setUnlocked((prev) => {
            if (prev.includes(p.id)) return prev;
            setLastFound(p.code);
            setTimeout(() => setLastFound(null), 2500); // hide popup after a moment
            return [...prev, p.id];
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked]);

  const roles = ['Design', 'Develop', 'Testing', 'Debug', 'Deploy', 'Maintain'];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20 max-md:px-2 max-md:pb-10">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 211, 238, 0.15), transparent 50%)`,
        }}
      />

      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div ref={containerRef} className="container mx-auto mt-16 px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 100 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="text-8xl font-bold mb-4 text-white max-md:text-6xl">
            {t('hero.title')}
          </motion.h1>

          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 100 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed max-md:text-sm">
            {t('hero.description')}
          </motion.h2>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="#contact"
              className="group px-8 py-3 bg-linear-to-r from-[#D31027] to-[#EA384D] rounded-full font-semibold hover:shadow-sm hover:shadow-red-500/50 transition-all duration-300 hover:scale-105"
            >
              {t('hero.cta')}
            </a>
            <a
              href="/cv/Miguel.pdf"
              target="_blank"
              className="group px-8 py-3 border border-slate-500/50 rounded-full font-semibold hover:bg-slate-500/10 transition-all duration-300 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {t('hero.download')}
            </a>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-md:gap-4 max-lg:px-3">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }} animate={{ opacity: 100 }} transition={{ duration: 0.6, ease: "easeInOut", delay: idx * 0.2 }}
            className="text-center p-6 bg-linear-to-br from-stone-900 to-stone-800 rounded-xl border border-white/10 hover:border-stone-500/50 transition-all duration-300"
          >
            <div className="text-3xl md:text-4xl font-bold text-gray-200 mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-gray-400 max-lg:text-xs">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Visual markers for already found codes (small badges) */}
      {containerRef.current && hiddenPoints.map((p) => {
        const rect = containerRef.current!.getBoundingClientRect();
        const left = rect.left + rect.width * p.x;
        const top = rect.top + rect.height * p.y;
        const isFound = unlocked.includes(p.id);
        return (
          <div
            key={p.id}
            style={{
              position: 'fixed',
              left: left - 10,
              top: top - 10,
              width: 20,
              height: 20,
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
              transition: 'opacity 200ms, transform 200ms',
              opacity: isFound ? 1 : 0,
            }}
          >
            <div className="w-3 h-3 rounded-full bg-stone-500 shadow-md" />

          </div>
        );
      })}

      {lastFound && (
        <div className="absolute items-center top-6 bg-stone-900 border border-white/10 rounded-lg px-6 py-3 text-white text-md max-md:text-md z-100 shadow-lg animate-fade-in">
          🎉 10% Discount Code: <span className="font-mono">{lastFound}</span> 🎉
        </div>
      )}
      {/* Bottom-right unlocked codes list */}

      <div className="absolute bottom-8 max-md:bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-8 h-8 text-[#b6b6b6]" />
      </div>
    </section>
  );
};

export default Hero;
