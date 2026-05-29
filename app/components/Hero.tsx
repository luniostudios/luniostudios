import React, { useState, useEffect, useRef } from 'react';
import {
    ArrowRight,
    Code,
    Flame,
    Rocket
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

const Hero = () => {

    const [gsapLoaded, setGsapLoaded] = useState(false);


    // Refs for GSAP
    const heroRef = useRef(null);
    const mainRef = useRef(null);
    const titleRef = useRef(null);
    const servicesRef = useRef(null);
    const showcaseRef = useRef(null);
    const statsRef = useRef(null);
    const sandboxRef = useRef(null);

    // Dynamic Cursor Tracking
    useEffect(() => {
        const handleMouseMove = (e: { clientX: number; clientY: number; }) => {

            // Gentle parallax effect on hero assets using GSAP safely if loaded
            if (heroRef.current && window.gsap) {
                const gsap = window.gsap;
                const xPos = (e.clientX / window.innerWidth - 0.5) * 40;
                const yPos = (e.clientY / window.innerHeight - 0.5) * 40;
                gsap.to('.hero-parallax-bg', { x: xPos, y: yPos, duration: 1.5, ease: 'power2.out' });
                gsap.to('.hero-magnetic-card', { x: xPos * 0.5, y: yPos * 0.5, duration: 1, ease: 'power2.out' });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Load GSAP and ScrollTrigger via CDN dynamically to prevent bundler errors
    useEffect(() => {
        const loadScript = (src: string) => {
            return new Promise<void>((resolve, reject) => {
                if (document.querySelector(`script[src="${src}"]`)) {
                    resolve();
                    return;
                }
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`Failed to load script ${src}`));
                document.body.appendChild(script);
            });
        };

        Promise.all([
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'),
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js')
        ])
            .then(() => {
                if (window.gsap && window.ScrollTrigger) {
                    window.gsap.registerPlugin(window.ScrollTrigger);
                    setGsapLoaded(true);
                }
            })
            .catch((err) => console.error('Error loading GSAP scripts dynamically:', err));
    }, []);

    // GSAP Entrance Animations triggered only after GSAP is safely loaded
    useEffect(() => {
        if (!gsapLoaded || !window.gsap) return;

        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.fromTo('.anim-badge',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
            );

            tl.fromTo('.anim-title-word',
                { opacity: 0, y: 50, rotateX: -20 },
                { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.1, ease: 'power4.out' },
                '-=0.4'
            );

            tl.fromTo('.anim-desc',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
                '-=0.4'
            );

            tl.fromTo('.anim-buttons',
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
                '-=0.3'
            );

            tl.fromTo('.anim-interactive-preview',
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.75)' },
                '-=0.2'
            );
        }, mainRef);

        return () => ctx.revert();
    }, [gsapLoaded]);

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);


    const { t } = useLanguage();

    return (
        <div ref={mainRef} className="bg-slate-50 selection:bg-red-100">
            <div
                className="absolute inset-0 pointer-events-none z-0 items-center justify-center"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 211, 238, 0.1), transparent 50%)`,
                }}
            />
            {/* Grid Pattern Background overlay */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}
                className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute rotate-45 -left-90 inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_90px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_100px)] bg-size-[4rem_100rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70" />
            </motion.div>
            {/* HERO SECTION */}
            <section
                ref={heroRef}
                className="relative mt-20 min-h-[calc(100vh-80px)] flex flex-col justify-center py-12 px-6 overflow-hidden"
            >
                {/* Parallax element background */}
                <div className="hero-parallax-bg absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-linear-to-tr from-purple-200/50 to-indigo-200/50 rounded-full blur-[80px] pointer-events-none" />
                <div className="hero-parallax-bg absolute bottom-10 left-[-10%] w-[400px] h-[400px] bg-linear-to-tr from-cyan-100/60 to-purple-100/60 rounded-full blur-[100px] pointer-events-none" />
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left Column: Core Kinetic Copy */}
                    <div className="lg:col-span-7 mt-25 flex flex-col justify-center space-y-8">
                        {/* Dynamic Title with animated parts */}
                        <h1 ref={titleRef} className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[0.95] flex flex-col">
                            <span className="anim-title-word inline-block origin-left">{t('hero.title')}</span>
                            <span className="anim-title-word inline-block origin-left text-black">
                                {t('hero2.title')}
                            </span>
                            <span className="anim-title-word inline-block origin-left">
                                {t('hero3.title')}
                            </span>
                        </h1>

                        <p className="anim-desc text-lg text-slate-600 max-w-xl leading-relaxed">
                            {t('hero.description')}
                        </p>

                        {/* Action and Micro Interaction Links */}
                        <div className="anim-buttons flex flex-wrap gap-4 items-center">
                            <a
                                href="#portfolio"
                                className="px-8 py-4 rounded-2xl bg-linear-to-r from-[#D31027] to-[#EA384D] text-white font-semibold flex items-center gap-3 hover:shadow-2xl hover:shadow-purple-200 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                {t('hero.cta')} <ArrowRight className="w-5 h-5" />
                            </a>

                            <a
                                href="#sandbox"
                                className="px-6 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-2 hover:bg-slate-50 transition-all"
                            >
                                {t('hero.sandbox')}
                            </a>
                        </div>

                        {/* Client and Partner Badges */}
                        <div className="pt-8 border-t border-slate-200/80">
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Our Creative Reach</p>
                            <div className="flex flex-wrap items-center gap-8 opacity-60">
                                <a
                                    href="https://www.luniobuilder.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="text-sm font-black tracking-widest text-slate-600">L U N I O B U I L D E R</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Interactive Mechanical Visualizer */}
                    <div className="lg:col-span-5 relative anim-interactive-preview">
                        <div className="hero-magnetic-card relative bg-white/70 backdrop-blur-xl border border-white/80 p-6 rounded-3xl shadow-2xl shadow-indigo-100/50">

                            {/* Header elements inside card */}
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                                <div className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-full bg-rose-400 block" />
                                    <span className="w-3.5 h-3.5 rounded-full bg-amber-400 block" />
                                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 block" />
                                </div>
                                <span className="text-[10px] font-mono tracking-wider bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                                    LUNIO_SYSTEMS_ACTIVE
                                </span>
                            </div>

                            {/* Simulated 3D interactive viewport */}
                            <div
                                className="relative aspect-video rounded-2xl overflow-hidden bg-linear-to-tr from-slate-900 to-slate-950 p-6 flex flex-col justify-between group"
                            >
                                {/* Glowing core animation behind content */}
                                <div className="absolute inset-0 bg-radial-gradient from-purple-500/20 via-transparent to-transparent opacity-60 animate-pulse pointer-events-none" />

                                {/* Procedural Grid */}
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-size-[1.5rem_1.5rem] opacity-20" />

                                {/* Top bar info */}
                                <div className="flex justify-between items-start z-10">
                                    <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-lg border border-white/10 text-[10px] text-purple-200">
                                        SYS_LOAD: 2.1%
                                    </div>
                                    <Rocket className="w-6 h-6 text-purple-400 animate-bounce" />
                                </div>

                                {/* Large visual element simulating reactive sound vectors */}
                                <div className="flex justify-center items-end gap-1.5 h-24 z-10">
                                    {[35, 65, 45, 90, 110, 85, 55, 120, 95, 70, 40, 60, 80].map((h, i) => (
                                        <div
                                            key={i}
                                            style={{ height: `${h}%` }}
                                            className="w-full rounded-full hover:scale-y-110 animate-color-cycle"
                                        />
                                    ))}
                                </div>

                                <div className="flex justify-between items-center z-10 text-[10px] text-slate-400 font-mono">
                                    <span>V_INDEX: 9.88241</span>
                                    <span className="text-emerald-400 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                                        LIVE FPS: 60
                                    </span>
                                </div>
                            </div>

                            {/* Details under simulated viewport */}
                            <div className="mt-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-slate-400">Current Simulation</span>
                                    <span className="text-xs font-bold text-slate-800">Dynamic Fluid Node</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full w-2/3 progress-bar rounded-full animate-pulse" />
                                </div>
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                        <span className="text-[10px] font-medium text-slate-400 block">RENDER MODEL</span>
                                        <span className="text-xs font-bold text-slate-700">WebGL 2.0 Engine</span>
                                    </div>
                                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                        <span className="text-[10px] font-medium text-slate-400 block">RESPONSE SPEED</span>
                                        <span className="text-xs font-bold text-slate-700">~2ms Responsive</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Little absolute elements flying off */}
                        <div className="absolute -bottom-6 -left-6 bg-amber-400 text-slate-900 px-4 py-3 rounded-2xl max-md:-left-3 flex items-center gap-2 font-bold text-xs shadow-lg transform -rotate-3 hover:rotate-0 transition-transform">
                            <Code className="w-4 h-4" /> Custom Code Architecture
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Hero;