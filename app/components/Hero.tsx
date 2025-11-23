"use client"

import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Download, ArrowDown } from 'lucide-react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const roles = ['Design', 'Develop', 'Testing', 'Debug', 'Deploy', 'Maintain'];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20">
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

      <div className="container mx-auto mt-16 px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">

          <h1 className="text-8xl font-bold mb-4 text-white max-md:text-6xl">
            Make your Life Easier with our Studio
          </h1>

          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Crafting exceptional digital experiences with cutting-edge technologies.
            Passionate about clean code, innovative solutions, and pushing the boundaries of what's possible.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="#contact"
              className="group px-8 py-3 bg-linear-to-r from-[#D31027] to-[#EA384D] rounded-full font-semibold hover:shadow-sm hover:shadow-red-500/50 transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </a>
            <a
              href="#"
              className="group px-8 py-3 border border-slate-500/50 rounded-full font-semibold hover:bg-slate-500/10 transition-all duration-300 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Years Experience', value: '3+' },
          { label: 'Projects Completed', value: '20+' },
          { label: 'Happy Clients', value: '3+' },
          { label: 'Code Commits', value: '1k+' },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="text-center p-6 bg-linear-to-br from-stone-900 to-stone-800 rounded-xl border border-white/10 hover:border-stone-500/50 transition-all duration-300"
          >
            <div className="text-3xl md:text-4xl font-bold text-gray-200 mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-8 h-8 text-[#b6b6b6]" />
      </div>
    </section>
  );
};

export default Hero;
