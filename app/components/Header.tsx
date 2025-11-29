"use client";

import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Code2, Instagram, Facebook, Languages, Coffee, Moon, Sun, Plane } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';

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
    { id: 'projects', label: `${t('header.portfolio')}`, href: '/projects' },
    { id: 'skills', label: `${t('header.skills')}`, href: '/#skills' },
    { id: 'team', label: `${t('header.team')}`, href: '/#team' },
    { id: 'contact', label: `${t('header.contact')}`, href: '/#contact' },
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
      className={`fixed w-full top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-stone-950/80 backdrop-blur-md shadow-lg shadow-cyan-500/5' : 'bg-transparent'
        }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className='flex flex-col max-xl:flex-row w-full'>
          <div className="flex items-center justify-between max-xl:flex-1 mx-20 max-xl:mx-2">
            <button onClick={() => { window.location.href = '/' }}>
              <div className="flex items-center gap-2 cursor-pointer">
                <img src="/images/logos.png" className='w-7 max-md:w-5' alt="logo" title='logo' />
                <h1 className="font-roboto text-4xl font-bold text-white max-md:text-xl">
                  LUNIO Studios
                </h1>
              </div>
            </button>

            <div className="flex items-center justify-center gap-6 max-xl:hidden">
              <a
                href="https://github.com/luniostudios"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/luniostudios/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61575845991065"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/lunio_studios/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <div className="hidden xl:flex items-center gap-8" suppressHydrationWarning>
              {navItems.map((item) => {
                // compute active using client-only currentPath to prevent SSR/CSR mismatch
                const isActive = activeSection === item.id || (item.id === 'projects' && currentPath === '/projects');
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id, item.href)}
                    className={`relative text-sm font-medium transition-colors hover:text-gray-35`}
                  >
                    {item.label}

                    {isActive && currentPath !== null && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-[#30933d] to-[#44ff8c] rounded-full" />
                    )}
                  </button>
                );
              })}
              <div className="hidden xl:flex items-center justify-center p-2 rounded-2xl bg-white/5 hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110 cursor-pointer">
                <Languages className="w-4 h-4 text-white" />
                <select value={language}
                  onChange={(e) => setLanguage(e.target.value as 'en' | 'es')} name="" id="" className='outline-none'>
                  <option value="en" className="bg-stone-500 text-white">EN</option>
                  <option value="es" className="bg-stone-500 text-white">ES</option>
                </select>
              </div>
            </div>
          </div>
          <div className='flex flex-row gap-2'>
            <div className="max-xl:flex xl:hidden items-center justify-center p-2 rounded-2xl bg-white/5 hover:bg-linear-to-r text-sm hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110 cursor-pointer">
              <Languages className="w-3 h-3 text-white" />
              <select value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'es')} name="" id="" className='outline-none '>
                <option value="en" className="bg-stone-500 text-white">EN</option>
                <option value="es" className="bg-stone-500 text-white">ES</option>
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

          <div className="relative w-full h-full mt-4 py-4 border-t-white/10 bg-stone-950/80 pl-6 flex flex-col gap-6" >
            {navItems.map((item) => {
              const isActive = activeSection === item.id || (item.id === 'projects' && currentPath === '/projects');
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id, item.href)}
                  className={`flex flex-col pb-2 text-sm font-medium transition-colors hover:text-gray-350 ${isActive ? 'text-white' : 'text-gray-300'
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
