import { useEffect, useRef, useState } from 'react';
import {
    ArrowRight,
    Rocket,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Portfolio = () => {

    const [activeTab, setActiveTab] = useState('all');

    // Refs for GSAP
    const heroRef = useRef(null);
    const showcaseRef = useRef(null);

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

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const { t } = useLanguage();
    const [modalOpen, setModalOpen] = useState(false)

    const handleModal = () => {
        setModalOpen(!modalOpen)
    }

    return (
        <div>

            {/* CREATIVE SHOWCASE / FILTERABLE PORTFOLIO */}
            <motion.section
                id="portfolio"
                ref={showcaseRef}
                className="py-24 px-6 relative "
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
                                {t('showcase.title')}
                            </h2>
                            <p className="text-slate-500 text-sm md:text-base mt-2 max-w-lg">
                                {t('showcase.description')}
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
                                {t('showcase.title2')}
                            </h3>
                            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                                {t('showcase.description2')}
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <button
                                    onClick={handleModal}
                                    className="px-6 py-3.5 bg-white text-slate-950 hover:bg-linear-to-r from-[#D31027] to-[#EA384D] hover:text-white transition-all font-bold rounded-2xl text-sm flex items-center gap-2"
                                >
                                    {t('showcase.cta')} <ArrowRight className="w-4 h-4" />
                                </button>
                                <a
                                    href="#sandbox"
                                    className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-bold rounded-2xl text-sm border border-slate-700"
                                >
                                    {t('showcase.cta2')}
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