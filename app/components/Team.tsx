"use client"

import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Team = () => {
  const [hoverName, setHoverName] = useState<string | null>(null);
  const { t } = useLanguage();

  const experiences = [
    {
      type: 'education',
      author: 'Miguel Duran',
      title: 'Master of Computer Science',
      company: 'Polytechnic University of Puerto Rico',
      period: '2023 - 2025',
      description: 'Specialized in Computer Science and Cybersecurity with ML.',
      achievements: [
        'GPA: 3.75/4.0',
        'Published reasearch on using ML for cybersecurity threat detection in Electronic Health Records (EHRs).',
      ],
    },
    {
      type: 'education',
      author: 'Miguel Duran',
      title: 'Bachelor of Computer Science',
      company: 'University of Puerto Rico, Bayamon Campus',
      period: '2017 - 2023',
      description: 'Computer Science degree with focus on Information Systems.',
      achievements: [
        "Created an application where users can collaborate in real-time on coding projects, aswell as chat and video call.",
        "Learned various programming languages and technologies including Python, Java, C#, HTML, CSS, JavaScript, SQL, and more.",
      ],
    },
  ];

  const certifications = [
    'AWS Certified Solutions Architect',
    'Google Cloud Professional',
    'Meta React Certification',
    'MongoDB Developer',
  ];

  return (
    <section id="team" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t('team.title')}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('team.description')}
          </p>
        </div>
        <div className='flex flex-row max-lg:flex-col h-full gap-12 max-md:flex-col'>
          <div className='flex-1 align-middle'>
            <div
              className='relative w-full h-full'
              onMouseEnter={() => setHoverName(experiences[0].author)}
              onMouseLeave={() => setHoverName(null)}
            >
              <img className='inset-0 rounded-full w-full max-lg:w-[50%] max-md:w-full z-10' width={"100%"} height={"100%"} src="/team/miguel2.png" alt="teamImg" />
              {/* overlay shown when hovering image or any experience box */}
            </div>
          </div>
          <div className='h-full flex-2 justify-between'>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-r from-[#D31027] to-[#EA384D]" />

                {experiences.map((exp, idx) => (
                  <div
                    key={idx}
                    className="relative pl-20 pb-12 group"
                    onMouseEnter={() => setHoverName(exp.author)}
                    onMouseLeave={() => setHoverName(null)}
                  >
                    <div className="absolute left-4 top-0 w-8 h-8 rounded-full bg-linear-to-r from-[#D31027] to-[#EA384D] flex items-center justify-center border-4 border-slate-950 group-hover:scale-125 transition-transform duration-300">
                      {exp.type === 'work' ? (
                        <Briefcase className="w-4 h-4 text-white" />
                      ) : (
                        <GraduationCap className="w-4 h-4 text-white" />
                      )}
                    </div>

                    <div className="bg-linear-to-br from-stone-900 to-stone-800 p-6 rounded-xl border border-white/10 hover:border-[#EA384D] transition-all duration-500 hover:shadow-sm hover:shadow-red-100/20">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                          <p className="text-green-200 font-medium">{exp.company}</p>
                        </div>
                        <span className="px-4 py-1 bg-red-500/10 text-red-200 text-sm rounded-full border border-red-500/20">
                          {exp.period}
                        </span>
                      </div>

                      <p className="text-gray-400 mb-4">{exp.description}</p>

                      <div className="space-y-2">
                        {exp.achievements.map((achievement, achIdx) => (
                          <div key={achIdx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-200 mt-2 shrink-0" />
                            <p className="text-sm text-gray-300">{achievement}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
