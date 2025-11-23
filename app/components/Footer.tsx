import { Heart, Code2, Github, Linkedin, Twitter, Mail, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://linkedin.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://twitter.com', label: 'Instagram' },
  ];

  const quickLinks = [
    { label: 'Our Portfolio', href: '/projects' },
    { label: 'Tools & Skills', href: '/#skills' },
    { label: 'The Team', href: '/#team' },
    { label: 'Contact Us', href: '/#contact' },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-stone-950/50 backdrop-blur-lg">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
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
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Crafting exceptional digital experiences with cutting-edge technologies. Passionate about clean code, innovative solutions, and pushing the boundaries of what's possible.
            </p>
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
                    <Icon className="w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
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
            <h4 className="text-white font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <p className="text-gray-400 text-sm">
                Open to freelance opportunities and collaborations
              </p>
              <a
                href="#contact"
                className="inline-block px-6 py-2 bg-linear-to-r from-[#D31027] to-[#EA384D] rounded-full text-sm font-semibold text-white hover:shadow-sm hover:shadow-red-500/50 transition-all duration-300 hover:scale-105"
              >
                Say Hello
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} LUNIO Studios. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> by LUNIO Studios
            </p>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-red-300 to-transparent" />
    </footer>
  );
};

export default Footer;
