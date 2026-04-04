import React from 'react';
import { Code2, Database, Cloud, Smartphone, Terminal, Palette } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { easeIn, easeInOut, motion } from 'motion/react';

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const Skills = () => {

  const { t } = useLanguage();

  const skillCategories: { icon: string | IconComponent; title: string }[] = [
    {
      icon: "https://img.icons8.com/?size=100&id=asWSSTBrDlTW&format=png&color=000000",
      title: 'React',
    },
    {
      icon: "https://img.icons8.com/?size=100&id=MWiBjkuHeMVq&format=png&color=000000",
      title: 'Next JS',
    },
    {
      icon: "https://img.icons8.com/?size=100&id=hsPbhkOH4FMe&format=png&color=000000",
      title: 'Node.js',
    },
    {
      icon: "https://img.icons8.com/?size=100&id=108784&format=png&color=000000",
      title: 'JavaScript',
    },
    {
      icon: "https://img.icons8.com/?size=100&id=74402&format=png&color=000000",
      title: 'MongoDB',
    },
    {
      icon: "https://img.icons8.com/?size=100&id=20909&format=png&color=000000",
      title: 'HTML',
    },
    {
      icon: "https://img.icons8.com/?size=100&id=21278&format=png&color=000000",
      title: 'CSS',
    },
    {
      icon: "https://img.icons8.com/?size=100&id=zfHRZ6i1Wg0U&format=png&color=000000",
      title: 'Figma',
    },
    {
      icon: "https://img.icons8.com/?size=100&id=J6KcaRLsTgpZ&format=png&color=000000",
      title: 'SQL',
    },
    {
      icon: "https://img.icons8.com/?size=100&id=4R1YVxksRVyW&format=png&color=000000",
      title: 'Cybersecurity',
    },
    {
      icon: "https://img.icons8.com/?size=100&id=x7XMNGh2vdqA&format=png&color=000000",
      title: 'Tailwind CSS',
    },
    {
      icon: "https://img.icons8.com/?size=100&id=108784&format=png&color=000000",
      title: 'JavaScript',
    },
  ];


  return (
    <section id="skills" className="py-20 relative">
      <div className="absolute inset-0 bg-stone-950" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h1 initial={{ opacity: 0 }} whileInView={{ opacity: 100 }} transition={{ duration: 1, ease: "easeInOut" }} viewport={{ once: true }}  className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t('skills.title')}
          </motion.h1>
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 100 }} transition={{ duration: 1, ease: "easeInOut" }} viewport={{ once: true }} className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('skills.description')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0}}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut", delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-linear-to-br from-stone-900 to-stone-800 p-6 rounded-xl border border-white/10 hover:border-green-100/50 transition-all duration-500 hover:shadow-sm hover:shadow-green-500/20"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-linear-to-br from-stone-500/20 to-stone-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    {typeof category.icon === 'string' ? (
                      <img src={category.icon} alt={category.title} title={category.title} className="w-7 h-7" />
                    ) : (
                      (() => {
                        const Icon = category.icon as IconComponent;
                        return <Icon className="w-7 h-7 text-green-400" />;
                      })()
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
