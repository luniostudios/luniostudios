import { Heart, Github, Linkedin, Instagram, Facebook, Rocket } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/luniostudios', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/luniostudios/', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61575845991065', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/lunio_studios/', label: 'Instagram' },
  ];

  const quickLinks = [
    { id: 'projects', label: `Showcase`, href: '#portfolio' },
    { id: 'skills', label: `${t('header.skills')}`, href: '/#skills' },
    { id: 'designLab', label: `Design Lab`, href: '#sandbox' },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-stone-950 backdrop-blur-lg">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Link href={"/"}>
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="flex items-center gap-2 cursor-pointer font-bold uppercase text-lg">
                    <div className='flex flex-row text-2xl align-middle items-center'>
                      <h1>LUNI</h1>
                      <Rocket width={20} className="text-bold" />
                    </div>
                    <h1 className='flex flex-row text-2xl align-middle items-center'>Studios</h1>
                  </div>
                </div>
              </Link>
            </div>
            <h2 className="text-gray-400 text-sm leading-relaxed mb-4">
              {t('hero.description')}
            </h2>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="p-2 rounded-lg bg-white/5 hover:bg-linear-to-r hover:from-[#D31027] hover:to-[#EA384D] border border-white/10 hover:border-red-500/50 transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-5 h-5 text-gray-400 hover:text-gray-400 transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-white text-xs uppercase font-semibold mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-gray-100 transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">Legal</h4>
            <ul className="mt-5 space-y-2 text-sm">
              <li>
                <a href="/privacy-policy" className="text-gray-400 hover:text-gray-100 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-gray-400 hover:text-gray-100 transition-colors">
                  Termns of Service
                </a>
              </li>
              <li>
                <a href="/cookie-policy" className="text-gray-400 hover:text-gray-100 transition-colors">
                  Usage Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">Live Node Health</h4>
            <div className="bg-transparent mt-5 p-5 rounded-2xl border border-slate-800 space-y-3.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Core Server Location</span>
                <span className="text-purple-400 font-mono">MIAMI_FL_US</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Node Status</span>
                <span className="text-emerald-400 font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                  OPERATIONAL_100%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Interactive Latency</span>
                <span className="text-white font-mono">~1.12ms (FAST)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h5 className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} LUNIO Studios. {t('footer.rightsReserved')}
            </h5>
            <h6 className="text-gray-400 text-sm flex items-center gap-2">
              <a href="https://www.luniostudios.com" rel="noopener noreferrer" className="flex items-center gap-1">
                {t('footer.hecho')} <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> {t('footer.por')} <h1 className='underline hover:text-gray-100 transition-colors'>LUNIO Studios</h1>
              </a>
            </h6>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-red-300 to-transparent" />
    </footer>
  );
};

export default Footer;
