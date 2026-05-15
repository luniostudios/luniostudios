"use client"

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Calculator, X } from 'lucide-react';
import { easeIn, motion } from "motion/react"
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { t } = useLanguage();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [projectType, setProjectType] = useState('');
  const [projectBuilder, setProjectBuilder] = useState('');
  const [features, setFeatures] = useState(0);
  const [timeline, setTimeline] = useState('');
  const [complexity, setComplexity] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [animations, setAnimations] = useState('');

  const calculatePrice = () => {
    let basePrice = 0;
    let builderMultiplier = 0;
    switch (projectType) {
      case 'web': basePrice = 20; break;
      case 'mobile': basePrice = 40; break;
      default: basePrice = 0;
    }
    switch (projectBuilder) {
      case 'custom': builderMultiplier = 10; break;
      case 'webflow': builderMultiplier = 5; break;
      case 'wix': builderMultiplier = 5; break;
      case 'shopify': builderMultiplier = 5; break;
      default: builderMultiplier = 0;
    }

    const animationsMultiplier = animations === 'yes' ? 10 : 0;
    const featureMultiplier = features * 5;
    const timelineMultiplier = timeline === '1-3' ? 20 : timeline === '3-6' ? 15 : timeline === '6+' ? 10 : 0;
    setCalculatedPrice((basePrice + featureMultiplier + builderMultiplier + timelineMultiplier + animationsMultiplier));
  };

  useEffect(() => {
    calculatePrice();
  }, [projectType, projectBuilder, features, timeline, complexity, animations]);

  const stats = [
    { label: `${t('hero.card')}`, value: '3+' },
    { label: `${t('hero.card2')}`, value: '20+' },
    { label: `${t('hero.card3')}`, value: '3+' },
    { label: `${t('hero.card4')}`, value: '1k+' },
  ]

  const roles = ['Design', 'Develop', 'Testing', 'Debug', 'Deploy', 'Maintain'];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 100 }} transition={{ duration: 1, ease: "easeInOut" }} className="flex z-10 flex-row gap-2 items-center max bg-green-900/20 border border-white/10 rounded-lg px-6 py-3 text-white text-md max-md:text-xs  shadow-lg">
        ⭐ {t('hero.banner')} <a href="https://www.luniobuilder.com/" target='_blank' className="text-white underline">{t('hero.banner2')}</a> ⭐
      </motion.div>

      <div ref={containerRef} className=" font-roboto container mx-auto mt-16 px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 100 }} transition={{ duration: 1, ease: "easeInOut" }} className="text-8xl font-bold mb-4 text-white max-md:text-6xl">
            {t('hero.title')}
          </motion.h1>

          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 100 }} transition={{ duration: 1, ease: "easeInOut" }} className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed max-md:text-sm">
            {t('hero.description')}
          </motion.h2>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 100 }} transition={{ duration: 1, ease: "easeInOut" }} className="flex max-lg:text-2xl flex-wrap max-sm:flex-nowrap max-sm:text-sm items-center justify-center gap-4 max-md:gap-2 mb-12">
            <a
              href="#contact"
              className="group px-8 py-3 bg-linear-to-r from-[#D31027] to-[#EA384D] rounded-full font-semibold hover:shadow-sm hover:shadow-red-500/50 transition-all duration-300 hover:scale-105"
            >
              {t('hero.cta')}
            </a>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="group px-8 py-3 border border-slate-500/50 rounded-full font-semibold hover:bg-slate-500/10 transition-all duration-300 flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              {t('hero.pricing')}
            </button>
          </motion.div>
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

      {/* Bottom-right unlocked codes list */}

      <div className="absolute bottom-8 max-md:bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-8 h-8 text-[#b6b6b6]" />
      </div>

      {/* Pricing Calculator Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="w-full max-w-sm bg-stone-900 border-l border-white/10 p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Quote Calculator</h2>
              <button onClick={() => setIsDrawerOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6 mb-2" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Type</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full p-3 bg-stone-800 border border-white/10 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select type</option>
                  <option value="web">Web Application</option>
                  <option value="mobile">Mobile App</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Any Specific Builder?</label>
                <select
                  value={projectBuilder}
                  onChange={(e) => setProjectBuilder(e.target.value)}
                  className="w-full p-3 bg-stone-800 border border-white/10 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select builder</option>
                  <option value="custom">Custom Code</option>
                  <option value="webflow">Webflow</option>
                  <option value="wix">Wix</option>
                  <option value="shopify">Shopify</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Number of Pages</label>
                <input
                  type="number"
                  min="1"
                  value={features}
                  onChange={(e) => setFeatures(Number(e.target.value))}
                  className="w-full p-3 bg-stone-800 border border-white/10 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Timeline</label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full p-3 bg-stone-800 border border-white/10 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select timeline</option>
                  <option value="1-3">1-3 days</option>
                  <option value="3-6">3-6 days</option>
                  <option value="6+">7+ days</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Want animations on load?</label>
                <select
                  value={animations}
                  onChange={(e) => setAnimations(e.target.value)}
                  className="w-full p-3 bg-stone-800 border border-white/10 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-2xl font-bold text-white">
                  Estimated Quote: ${calculatedPrice.toLocaleString()}
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  This is an estimate based on the information provided. For a detailed quote, please contact us with your project requirements.
                </p>
              </div>

              <a
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                href="#contact"
                className="flex w-full justify-center px-6 py-3 bg-slate-800/40 rounded-full font-semibold transition-all duration-300"
              >
                Get Detailed Quote
              </a>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Hero;
