"use client";

import { useState, useEffect } from 'react';
import { Menu, X, Languages, Rocket} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import Link from 'next/link';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Header = ({ activeSection, setActiveSection }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const { t } = useLanguage();

  // Keep a client-only copy of the pathname to avoid rendering route-dependent UI during SSR
  const [currentPath, setCurrentPath] = useState<string | null>(null);

  useEffect(() => {
    setCurrentPath(pathname ?? null);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'portfolio', label: `${t('header.portfolio')}`, href: '/#portfolio' },
    { id: 'skills', label: `${t('header.skills')}`, href: '/#skills' },
    { id: 'faq', label: `FAQ`, href: '/#faq' },
    { id: 'sandbox', label: `${t('header.sandbox')}`, href: '/#sandbox' },
    { id: 'pricing', label: `${t('header.pricing')}`, href: '/#pricing' },
  ];

  const scrollToSection = (sectionId: string, sectionHrf: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (window.location.pathname !== sectionHrf.split('#')[0]) {
      window.location.href = sectionHrf;
    }
  };

  return (
    <header
      className={`fixed w-full top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 text-black backdrop-blur-lg shadow-lg shadow-cyan-500/5' : 'fixed bg-white text-black'
        }`}
    >
      <div className="flex items-center justify-center gap-2 w=full bg-linear-to-tr from-slate-900 to-slate-950 py-1">
        <h1 className="text-white text-md max-md:text-sm font-semibold">🔨 {t('hero.banner')} <a href="https://www.luniobuilder.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 underline">{t('hero.banner2')} </a>🔨</h1>
      </div>
      <nav className="container mx-auto px-6 py-6">
        <div className='flex flex-col max-xl:flex-row w-full'>
          <div className="flex items-center justify-between max-xl:flex-1 mx-20 max-xl:mx-2">
            <Link href={"/"}>
              <div className="flex items-center gap-2 cursor-pointer font-bold uppercase text-lg">
                <div className='flex flex-row text-2xl align-middle items-center'>
                  <h1>LUNI</h1>
                  <Rocket width={20} className="text-bold" />
                </div>
                <h1 className='flex flex-row text-2xl align-middle items-center'>Studios</h1>
              </div>
            </Link>

            <div className="hidden xl:flex items-center gap-8" suppressHydrationWarning>
              {navItems.map((item) => {
                // compute active using client-only currentPath to prevent SSR/CSR mismatch
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id, item.href)}
                    className={`relative text-md font-medium transition-colors hover:text-gray-35`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="hidden xl:flex border border-black items-center justify-center p-2 rounded-2xl bg-white/5 cursor-pointer">
                <Languages className="w-4 h-4 text-black" />
                <select value={language}
                  onChange={(e) => setLanguage(e.target.value as 'en' | 'es')} name="" id="" className='outline-none text-sm bg-transparent'>
                  <option value="en" className="bg-stone-500 text-white text-sm">EN</option>
                  <option value="es" className="bg-stone-500 text-white text-sm">ES</option>
                </select>
              </div>
            </div>
          </div>
          <div className='flex flex-row gap-2'>
            <div className="max-xl:flex border border-black xl:hidden items-center justify-center p-2 rounded-2xl bg-white/5 cursor-pointer">
              <Languages className="w-3 h-3 text-black" />
              <select value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'es')} name="" id="" className='outline-none text-sm bg-transparent'>
                <option value="en" className="bg-stone-500 text-white text-sm">EN</option>
                <option value="es" className="bg-stone-500 text-white text-sm">ES</option>
              </select>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {isMobileMenuOpen && (

          <div className="fixed left-0 w-full min-h-screen mt-4 py-4 border-t-white/10 bg-white flex flex-col gap-6" >
            {navItems.map((item) => {
              const isActive = activeSection === item.id || (item.id === 'projects' && currentPath === '/projects');
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id, item.href)}
                  className={`flex flex-col pb-2 text-sm font-medium transition-colors hover:text-gray-350 ${isActive ? 'text-black' : 'text-black-300'
                    }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
