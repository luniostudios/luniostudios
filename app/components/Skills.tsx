import React from 'react';
import { Code2, Database, Cloud, Smartphone, Terminal, Palette } from 'lucide-react';

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const Skills = () => {
  const skillCategories: { icon: string | IconComponent; title: string }[] = [
    {
      icon: "https://firebasestorage.googleapis.com/v0/b/icon-finder-91d39.appspot.com/o/icons%2Fbrand%2Freact.svg?alt=media&token=b7420ed5-06a4-43e2-839e-b34323845b66",
      title: 'React',
    },
    {
      icon: "https://img.icons8.com/?size=100&id=MWiBjkuHeMVq&format=png&color=000000",
      title: 'Next JS',
    },
    {
      icon: "https://firebasestorage.googleapis.com/v0/b/icon-finder-91d39.appspot.com/o/icons%2Fbrand%2Fnode-js.svg?alt=media&token=1c4825d1-1e9c-4efc-aaf9-85bed64c5dad",
      title: 'Node.js',
    },
    {
      icon: "https://firebasestorage.googleapis.com/v0/b/icon-finder-91d39.appspot.com/o/icons%2Fbrand%2Fpython.svg?alt=media&token=f6e852e9-bb53-4653-974f-b719b2557cb1",
      title: 'Python',
    },
    {
      icon: "https://img.icons8.com/?size=100&id=74402&format=png&color=000000",
      title: 'MongoDB',
    },
    {
      icon: "https://firebasestorage.googleapis.com/v0/b/icon-finder-91d39.appspot.com/o/icons%2Fbrand%2Fhtml5.svg?alt=media&token=4f288874-f069-4190-ad3a-526c0aa73035",
      title: 'HTML',
    },
    {
      icon: "https://firebasestorage.googleapis.com/v0/b/icon-finder-91d39.appspot.com/o/icons%2Fbrand%2Fcss3.svg?alt=media&token=7bc27d3c-d140-4cea-b7a2-32b191908f38",
      title: 'CSS',
    },
    {
      icon: "https://firebasestorage.googleapis.com/v0/b/icon-finder-91d39.appspot.com/o/icons%2Fbrand%2Ffigma.svg?alt=media&token=cfaa8dc7-09cc-4b66-b929-8cae68e3ad42",
      title: 'Figma',
    },
    {
      icon: "https://img.icons8.com/?size=100&id=J6KcaRLsTgpZ&format=png&color=000000",
      title: 'SQL',
    },
    {
      icon: "https://img.icons8.com/?size=100&id=G6qlKcs9gihV&format=png&color=000000",
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Tools & Skills
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks I work with
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => {
            return (
              <div
                key={idx}
                className="bg-linear-to-br from-stone-900 to-stone-800 p-6 rounded-xl border border-white/10 hover:border-green-100/50 transition-all duration-500 hover:shadow-sm hover:shadow-green-500/20"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-linear-to-br from-stone-500/20 to-stone-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    {typeof category.icon === 'string' ? (
                      <img src={category.icon} alt={category.title} className="w-7 h-7" />
                    ) : (
                      (() => {
                        const Icon = category.icon as IconComponent;
                        return <Icon className="w-7 h-7 text-green-400" />;
                      })()
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
