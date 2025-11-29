import { Heart, Code2, Github, Linkedin, Twitter, Mail, Instagram, Facebook, Sun, ArrowBigRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const {t} = useLanguage();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/luniostudios', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/luniostudios/', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61575845991065', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/lunio_studios/', label: 'Instagram' },
  ];

  const quickLinks = [
    { id: 'projects', label: `${t('header.portfolio')}`, href: '/projects' },
    { id: 'skills', label: `${t('header.skills')}`, href: '/#skills' },
    { id: 'team', label: `${t('header.team')}`, href: '/#team' },
    { id: 'contact', label: `${t('header.contact')}`, href: '/#contact' },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-stone-950/50 backdrop-blur-lg">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Link href={"/"}>
                <div className="flex items-center gap-2 cursor-pointer">
                  <img src="/images/logos.png" className='w-7 max-md:w-5' alt="logo" title='logo' />
                  <h1 className="font-roboto text-4xl font-bold text-white">
                    LUNIO Studios
                  </h1>
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
            <h3 className="text-white font-semibold mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-gray-100 transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-400 transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">
              {t('footer.contactUs')}
            </h4>
            <div className="space-y-3">
              <p className="text-gray-400 text-sm">
                {t('footer.contactDescription')}
              </p>
              <a
                href="#contact"
                className="inline-block px-6 py-2 bg-linear-to-r from-[#D31027] to-[#EA384D] rounded-full text-sm font-semibold text-white hover:shadow-sm hover:shadow-red-500/50 transition-all duration-300 hover:scale-105"
              >
                {t('footer.getInTouch')}
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h5 className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} LUNIO Studios. {t('footer.rightsReserved')}
            </h5>
            <h6 className="text-gray-400 text-sm flex items-center gap-2">
              {t('footer.hecho')} <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> {t('footer.por')} LUNIO Studios
            </h6>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-red-300 to-transparent" />
    </footer>
  );
};

export default Footer;
