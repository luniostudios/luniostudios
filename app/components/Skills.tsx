import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { useSortable } from '@dnd-kit/react/sortable';

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;
interface StarNode {
  x: number;
  y: number;
  size: number;
}

interface WarpStar {
  x: number;
  y: number;
  z: number;
  color: string;
}

const Skills = () => {

  const { t } = useLanguage();

  function Sortable({ id, index, item }: { id: number; index: number, item: { icon: string | IconComponent; title: string } }) {
    const { ref } = useSortable({ id, index });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: id * 0.1 }}
        viewport={{ once: true }}
        className="bg-linear-to-br from-stone-900 to-stone-800 p-6 rounded-xl border border-white/10 hover:border-green-100/50 transition-all duration-500 hover:shadow-sm hover:shadow-green-500/20"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-linear-to-br from-stone-500/20 to-stone-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
            {typeof item.icon === 'string' ? (
              <img src={item.icon} alt={item.title} title={item.title} className="w-7 h-7" />
            ) : (
              (() => {
                const Icon = item.icon as IconComponent;
                return <Icon className="w-7 h-7 text-green-400" />;
              })()
            )}
          </div>
          <h3 className="text-xl font-bold text-white">{item.title}</h3>
        </div>
      </motion.div>
    );
  }

  const items: { id: number; icon: string | IconComponent; title: string }[] = [
    {
      id: 1,
      icon: "https://img.icons8.com/?size=100&id=asWSSTBrDlTW&format=png&color=000000",
      title: 'React',
    },
    {
      id: 2,
      icon: "https://img.icons8.com/?size=100&id=MWiBjkuHeMVq&format=png&color=000000",
      title: 'Next JS',
    },
    {
      id: 3,
      icon: "https://img.icons8.com/?size=100&id=hsPbhkOH4FMe&format=png&color=000000",
      title: 'Node.js',
    },
    {
      id: 4,
      icon: "https://img.icons8.com/?size=100&id=108784&format=png&color=000000",
      title: 'JavaScript',
    },
    {
      id: 5,
      icon: "https://img.icons8.com/?size=100&id=74402&format=png&color=000000",
      title: 'MongoDB',
    },
    {
      id: 6,
      icon: "https://img.icons8.com/?size=100&id=20909&format=png&color=000000",
      title: 'HTML',
    },
    {
      id: 7,
      icon: "https://img.icons8.com/?size=100&id=21278&format=png&color=000000",
      title: 'CSS',
    },
    {
      id: 8,
      icon: "https://img.icons8.com/?size=100&id=zfHRZ6i1Wg0U&format=png&color=000000",
      title: 'Figma',
    },
    {
      id: 9,
      icon: "https://img.icons8.com/?size=100&id=J6KcaRLsTgpZ&format=png&color=000000",
      title: 'SQL',
    },
    {
      id: 10,
      icon: "https://img.icons8.com/?size=100&id=4R1YVxksRVyW&format=png&color=000000",
      title: 'Cybersecurity',
    },
    {
      id: 11,
      icon: "https://img.icons8.com/?size=100&id=x7XMNGh2vdqA&format=png&color=000000",
      title: 'Tailwind CSS',
    },
    {
      id: 12,
      icon: "https://img.icons8.com/?size=100&id=108784&format=png&color=000000",
      title: 'JavaScript',
    },
  ];

  const [isMounted, setIsMounted] = useState(false);

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientOscRef = useRef<OscillatorNode | null>(null);

  // Constellation State
  const constellationCanvasRef = useRef<HTMLCanvasElement>(null);
  const [plottedStars, setPlottedStars] = useState<StarNode[]>([]);

  // Set mounted state and title
  useEffect(() => {
    setIsMounted(true);
    document.title = "Aetheris // The Light Side of the Cosmos";
    return () => {
      // Cleanup Web Audio
      if (ambientOscRef.current) {
        try { ambientOscRef.current.stop(); } catch (e) { }
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // Constellation Lab Canvas Rendering
  useEffect(() => {
    if (!isMounted || !constellationCanvasRef.current) return;

    const canvas = constellationCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMounted]);

  // Constellation Draw Loop
  useEffect(() => {
    if (!isMounted || !constellationCanvasRef.current) return;
    const canvas = constellationCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Vector Links
    if (plottedStars.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(155, 246, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.moveTo(plottedStars[0].x, plottedStars[0].y);
      for (let i = 1; i < plottedStars.length; i++) {
        ctx.lineTo(plottedStars[i].x, plottedStars[i].y);
      }
      ctx.stroke();
    }

    // Glowing Stars
    plottedStars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    });
  }, [isMounted, plottedStars]);

  const handleConstellationClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!constellationCanvasRef.current) return;
    const rect = constellationCanvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const starSize = 2.5 + Math.random() * 3;
    setPlottedStars(prev => [...prev, { x, y, size: starSize }]);
  };

  const clearConstellation = () => {
    setPlottedStars([]);
  };


  return (
    <section id="skills" className=" min-w-ful relative overflow-hidden">
      {/* Constellation Canvas Interactive Lab Mini-game */}
      <div className="w-full">
        <div className="flex flex-row items-center">
          {/* Lab Canvas container */}
          <div className="lg:col-span-7 glassmorphism shadow-glass border border-white/80 py-20 w-full flex items-center justify-center" id="constellation-sandbox">
            <canvas
              ref={constellationCanvasRef}
              onClick={handleConstellationClick}
              className="absolute inset-0 w-full bg-[#0c0a09] cursor-crosshair"
            ></canvas>
            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center mb-16">
                <motion.h1 initial={{ opacity: 0 }} whileInView={{ opacity: 100 }} transition={{ duration: 1, ease: "easeInOut" }} viewport={{ once: true }} className="text-4xl uppercase md:text-5xl font-semibold mb-4 text-white">
                  {t('skills.title')}
                </motion.h1>
                <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 100 }} transition={{ duration: 1, ease: "easeInOut" }} viewport={{ once: true }} className="text-gray-400 text-lg max-w-2xl mx-auto">
                  {t('skills.description')}
                </motion.h2>
                <motion.h3 initial={{ opacity: 0 }} whileInView={{ opacity: 100 }} transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }} viewport={{ once: true }} className="text-green-300 text-sm mt-2">
                  {t('skills.subtitle')}
                </motion.h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item) =>
                  <Sortable key={item.id} id={item.id} index={items.indexOf(item)} item={item} />
                )}
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/80 pointer-events-none">
              <span className="text-xs">Click to place stars, drag to trace vectors</span>
              <button
                onClick={clearConstellation}
                className="pointer-events-auto px-3 py-1.5 bg-white/20 hover:bg-white/40 text-white rounded-lg text-xs font-semibold backdrop-blur-sm transition"
              >
                Reset Sky
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
