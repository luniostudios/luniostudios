import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export const Interactive = () => {

    const [creativeQuery, setCreativeQuery] = useState('Hyper-dimensional dreamscapes');
    const [sandboxScale, setSandboxScale] = useState(1.1);
    const [sandboxHue, setSandboxHue] = useState(240);
    const [sandboxNoise, setSandboxNoise] = useState(20);
    const [isGenerating, setIsGenerating] = useState(false);
    const [gsapLoaded, setGsapLoaded] = useState(false);

    // Refs for GSAP
    const heroRef = useRef(null);
    const mainRef = useRef(null);
    const showcaseRef = useRef(null);
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

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

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
        }, mainRef);

        return () => ctx.revert();
    }, [gsapLoaded]);

    // Run a fake dynamic AI generation trigger safely
    const runFakeGeneration = () => {
        if (isGenerating) return;
        setIsGenerating(true);

        if (window.gsap) {
            window.gsap.to({}, {
                duration: 1.5,
                onStart: () => {
                    setSandboxScale(Math.random() * 0.5 + 1);
                    setSandboxHue(Math.floor(Math.random() * 360));
                    setSandboxNoise(Math.floor(Math.random() * 80));
                },
                onComplete: () => {
                    setIsGenerating(false);
                }
            });
        } else {
            // Fallback if GSAP is not loaded yet
            setSandboxScale(1.5);
            setSandboxHue(Math.floor(Math.random() * 360));
            setSandboxNoise(80);
            setTimeout(() => {
                setIsGenerating(false);
                setSandboxScale(1.15);
                setSandboxNoise(35);
            }, 1000);
        }
    };

    const { t } = useLanguage();


    return (
        <div>
            <motion.section
                id="sandbox"
                ref={sandboxRef}
                className="py-24 px-6 bg-slate-100 relative anim-sandbox"
            >
                {/* Subtle light effects */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Left text column */}
                        <div className="lg:col-span-5 space-y-6">
                            <motion.span initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                                viewport={{ once: true }} className="text-xs font-bold tracking-widest text-red-700 bg-red-100 px-3.5 py-1.5 rounded-full uppercase">
                                {t('labs.tag')}
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 50, rotateX: -20 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{ duration: 0.8, staggerChildren: 0.1, ease: "easeInOut" }}
                                viewport={{ once: true }} className="text-4xl md:text-5xl mt-5 font-black text-slate-950 tracking-tight leading-none">
                                {t('labs.title')}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, staggerChildren: 0.1, ease: "easeInOut" }}
                                viewport={{ once: true }} className="text-slate-600 text-sm md:text-base leading-relaxed">
                                {t('labs.description')}
                            </motion.p>

                            {/* Micro controller box */}
                            <motion.div initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, staggerChildren: 0.1, ease: "easeInOut" }}
                                viewport={{ once: true }} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">

                                {/* Parameter 1 */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold text-slate-500">
                                        <span>SCALE SHIFT</span>
                                        <span>{sandboxScale.toFixed(2)}x</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0.8"
                                        max="1.8"
                                        step="0.05"
                                        value={sandboxScale}
                                        onChange={(e) => setSandboxScale(parseFloat(e.target.value))}
                                        className="w-full accent-purple-600 cursor-pointer h-1.5 bg-slate-100 rounded-lg"
                                    />
                                </div>

                                {/* Parameter 2 */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold text-slate-500">
                                        <span>COLOR HUE MATRIX</span>
                                        <span>{sandboxHue}°</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="360"
                                        value={sandboxHue}
                                        onChange={(e) => setSandboxHue(parseInt(e.target.value))}
                                        className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-100 rounded-lg"
                                    />
                                </div>

                                {/* Parameter 3 */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold text-slate-500">
                                        <span>CHAOS GRAIN FILTER</span>
                                        <span>{sandboxNoise}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={sandboxNoise}
                                        onChange={(e) => setSandboxNoise(parseInt(e.target.value))}
                                        className="w-full accent-pink-600 cursor-pointer h-1.5 bg-slate-100 rounded-lg"
                                    />
                                </div>

                                {/* Text Input mock prompt */}
                                <div className="space-y-2 pt-2">
                                    <label className="text-[10px] uppercase font-bold text-slate-400">Creative Dreamscape Query</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={creativeQuery}
                                            onChange={(e) => setCreativeQuery(e.target.value)}
                                            placeholder="Type a creative theme..."
                                            className="w-full text-xs text-black font-semibold px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50"
                                        />
                                        <button
                                            onClick={runFakeGeneration}
                                            disabled={isGenerating}
                                            className="px-4 py-2 bg-linear-to-r from-[#D31027] to-[#EA384D] hover:opacity-90 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 disabled:opacity-50"
                                        >
                                            {isGenerating ? 'Morphing...' : 'Morph'}
                                        </button>
                                    </div>
                                </div>

                            </motion.div>
                        </div>

                        {/* Right Interactive Result screen */}
                        <motion.div initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, staggerChildren: 0.1, ease: "easeInOut" }}
                            viewport={{ once: true }} className="lg:col-span-7 flex justify-center">
                            <div className="w-full max-w-lg aspect-square bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xl relative flex flex-col justify-between overflow-hidden">

                                {/* Outer border lights */}
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-48 h-1 bg-linear-to-r from-transparent via-red-500 to-transparent animate-pulse" />

                                {/* Visual Art Node */}
                                <div className="flex-1 rounded-2xl relative flex items-center justify-center overflow-hidden bg-slate-900 transition-all duration-300">

                                    {/* Simulated Noise Pattern Overlay */}
                                    <div
                                        style={{ opacity: sandboxNoise / 300 }}
                                        className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[10px_10px] pointer-events-none mix-blend-overlay"
                                    />

                                    {/* Generative Interactive Orb */}
                                    <div
                                        style={{
                                            transform: `scale(${sandboxScale})`,
                                            filter: `hue-rotate(${sandboxHue}deg) blur(20px)`,
                                            opacity: 0.95
                                        }}
                                        className="w-48 h-48 rounded-full bg-linear-to-tr from-purple-500 via-pink-500 to-amber-400 animate-spin transition-all duration-300 relative flex items-center justify-center"
                                    >
                                        {/* Inner pulsing design */}
                                        <div className="w-32 h-32 rounded-full bg-slate-900 scale-75 border-4 border-white/30" />
                                    </div>

                                    {/* Vector coordinates reading overlay */}
                                    <div className="absolute top-4 left-4 font-mono text-[10px] text-purple-200/75 space-y-0.5 pointer-events-none bg-slate-950/40 p-2.5 rounded-lg border border-white/5">
                                        <div>COORD_X: {(sandboxScale * 120).toFixed(1)}</div>
                                        <div>COORD_Y: {sandboxHue}px</div>
                                        <div>PROMPT: {creativeQuery.slice(0, 24)}...</div>
                                    </div>

                                    {/* Bottom active state label */}
                                    <div className="absolute bottom-4 right-4 bg-emerald-500 text-slate-950 font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full">
                                        GEN_STAGE_01
                                    </div>
                                </div>

                                {/* Dynamic description footer inside simulation block */}
                                <div className="pt-4 flex items-center justify-between">
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Generated Output</span>
                                        <span className="text-sm font-black text-slate-800 tracking-tight">
                                            {creativeQuery || "Untitled Ecosystem"}
                                        </span>
                                    </div>
                                    <span className="text-xs font-mono font-bold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl border border-slate-200">
                                        #LUNIO_{sandboxHue}_NODE
                                    </span>
                                </div>

                            </div>
                        </motion.div>

                    </div>
                </div>
            </motion.section>
        </div>
    )
}
