import React, { useEffect, useRef, useState } from 'react';
import {
    ArrowRight,
    Rocket,
} from 'lucide-react';
import { motion } from 'framer-motion';

const Portfolio = () => {

    const [activeTab, setActiveTab] = useState('all');
    const [gsapLoaded, setGsapLoaded] = useState(false);

    // Refs for GSAP
    const heroRef = useRef(null);
    const mainRef = useRef(null);
    const servicesRef = useRef(null);
    const showcaseRef = useRef(null);
    const statsRef = useRef(null);
    const sandboxRef = useRef(null);

    // Filter Categories
    const categories = [
        { id: 'all', label: 'All Projects' },
        { id: 'web', label: 'Interactive Web' },
        { id: 'game', label: 'Game Development' },
        { id: 'spatial', label: 'Spatial & 3D' }
    ];

    // Mock Showcase Portfolio
    const portfolioItems = [
        {
            id: 1,
            title: 'LUNIO Builder',
            category: 'web',
            tag: 'Metaverse Concept',
            color: 'from-pink-500 to-rose-500',
            desc: 'An immersive web experience where users can build and customize their own digital spaces, showcasing our expertise in interactive web design and spatial creativity.',
            url: 'https://www.luniobuilder.com/'
        },
        {
            id: 2,
            title: 'LUNIO Sudoku',
            category: 'game',
            tag: 'Game Development',
            color: 'from-green-400 to-teal-500',
            desc: 'A game of logic and strategy, our Sudoku project demonstrates our ability to create engaging and visually appealing games that challenge the mind.',
            url: 'https://luniosudoku.vercel.app/'
        },
    ];

    // Filter items
    const filteredPortfolio = activeTab === 'all'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === activeTab);

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

            // Scroll Trigger Animations for Services
            gsap.fromTo('.service-card',
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: servicesRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );

            // Showcase Trigger
            gsap.fromTo('.showcase-header',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: showcaseRef.current,
                        start: 'top 85%'
                    }
                }
            );

            // Stats Trigger
            gsap.fromTo('.stat-box',
                { opacity: 0, scale: 0.85 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'back.out(1.5)',
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: 'top 90%'
                    }
                }
            );

            // Interactive Sandbox trigger
            gsap.fromTo('.sandbox-animate',
                { opacity: 0, x: -40 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: sandboxRef.current,
                        start: 'top 80%'
                    }
                }
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

    return (
        <div>
            {/* CREATIVE SHOWCASE / FILTERABLE PORTFOLIO */}
            <motion.section
                id="portfolio"
                ref={showcaseRef}
                className="py-24 px-6 bg-white relative"
                initial={{ opacity: 0 }} whileInView={{ opacity: 100 }} transition={{ duration: 1, ease: "easeInOut" }} viewport={{ once: true }}
            >
                <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 211, 238, 0.1), transparent 50%)`,
                    }}
                />
                <div className="max-w-7xl mx-auto">

                    {/* Heading + Filter Tabs */}
                    <div className="showcase-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-3 leading-none">
                                CREATIVE SHOWCASE
                            </h2>
                            <p className="text-slate-500 text-sm md:text-base mt-2 max-w-lg">
                                Explore a premium selection of our newest launches. We transform visions into highly functional visual systems.
                            </p>
                        </div>

                        {/* Filter pill tabs */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${activeTab === cat.id
                                        ? 'bg-slate-900 text-white shadow-lg'
                                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPortfolio.map((item) => (
                            <div
                                key={item.id}
                                className="group relative bg-slate-50 border border-slate-150 p-6 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-100/50 flex flex-col justify-between overflow-hidden"
                            >
                                {/* Subtle color highlight background hover effect */}
                                <div className="absolute inset-0 bg-linear-to-tr opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

                                <div className="space-y-4 relative z-10">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full w-fit block">
                                        {item.tag}
                                    </span>

                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>

                                {/* Beautiful decorative gradient circle representing high creative fidelity */}
                                <div className="my-6 aspect-video rounded-2xl bg-slate-900 relative flex items-center justify-center overflow-hidden">
                                    <div className={`absolute w-32 h-32 rounded-full bg-linear-to-tr ${item.color} blur-xl opacity-60 group-hover:scale-125 transition-transform duration-500`} />
                                    <div className="relative text-white font-mono text-[10px] bg-slate-950/80 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-1.5 opacity-90">
                                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                                            <span>EXPLORE WEBSPACE</span>
                                        </a>
                                        <Rocket className="w-3.5 h-3.5 text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 relative z-10">
                                    <span className="text-xs font-semibold text-slate-400">Vertical</span>
                                    <span className="text-xs font-bold text-slate-800 uppercase tracking-widest">{item.category}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Inquire more box */}
                    <div className="mt-16 bg-linear-to-tr from-slate-900 to-slate-950 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-[100px] pointer-events-none" />
                        <div className="relative z-10 max-w-2xl space-y-6">
                            <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-none">
                                HAVE A HIGH-STAKES CREATIVE CHALLENGE?
                            </h3>
                            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                                We don’t do bland layouts. We engineer high-concept web worlds, fluid user systems, and high-performance digital ecosystems that win markets. Let's craft yours.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <a
                                    href="#contact"
                                    className="px-6 py-3.5 bg-white text-slate-950 hover:bg-red-700 hover:text-white transition-all font-bold rounded-2xl text-sm flex items-center gap-2"
                                >
                                    Start Project Dialogue <ArrowRight className="w-4 h-4" />
                                </a>
                                <a
                                    href="#sandbox"
                                    className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-bold rounded-2xl text-sm border border-slate-700"
                                >
                                    Try the Sandbox
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </motion.section>
        </div>
    )
}

export default Portfolio