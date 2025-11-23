"use client";

import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Code2, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Header = ({ activeSection, setActiveSection }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'projects', label: 'Our Portfolio', href: '/projects' },
    { id: 'skills', label: 'Tools & Skills', href: '/#skills' },
    { id: 'team', label: 'The Team', href: '/#team' },
    { id: 'contact', label: 'Contact Us', href: '/#contact' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-stone-950/80 backdrop-blur-md shadow-lg shadow-cyan-500/5' : 'bg-transparent'
        }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href={"/"}>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="p-2 rounded-lg">
                <img src="/images/logos.png" width={"30px"} alt="" />
              </div>
              <span className="text-3xl font-bold text-white">
                LUNIO Studios
              </span>
            </div>
          </Link>

          <div className="flex items-center justify-center gap-6 max-md:hidden">
            <a
              href="https://github.com/MiguelJDZ"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/company/luniostudios/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61575845991065"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61575845991065"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.id || (pathname === '/#skills' && item.id === 'skills');
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id, item.href)}
                  className={`relative text-sm font-medium transition-colors hover:text-gray-350 ${isActive ? 'text-white' : 'text-gray-300'
                    }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-[#30933d] to-[#44ff8c] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>


          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-white/10">
            {navItems.map((item) => {
              const isActive = activeSection === item.id ;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id, item.href)}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${isActive
                      ? 'bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400'
                      : 'text-gray-300 hover:bg-white/5'
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
