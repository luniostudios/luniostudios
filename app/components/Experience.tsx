import { Briefcase, GraduationCap, Award } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      type: 'work',
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      period: '2022 - Present',
      description: 'Leading development of enterprise-scale applications, mentoring junior developers, and architecting cloud-native solutions.',
      achievements: [
        'Reduced application load time by 60% through optimization',
        'Led team of 5 developers on major product launch',
        'Implemented microservices architecture serving 1M+ users',
      ],
    },
    {
      type: 'work',
      title: 'Full Stack Developer',
      company: 'Digital Solutions Co.',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple client projects using modern web technologies and agile methodologies.',
      achievements: [
        'Built 10+ production-ready web applications',
        'Integrated payment systems and third-party APIs',
        'Improved code quality through testing and code reviews',
      ],
    },
    {
      type: 'education',
      title: 'Master of Computer Science',
      company: 'Tech University',
      period: '2018 - 2020',
      description: 'Specialized in Software Engineering and Artificial Intelligence with focus on distributed systems.',
      achievements: [
        'GPA: 3.9/4.0',
        'Published research on ML optimization',
        'Teaching Assistant for Web Development course',
      ],
    },
    {
      type: 'education',
      title: 'Bachelor of Computer Science',
      company: 'State University',
      period: '2014 - 2018',
      description: 'Core computer science fundamentals with emphasis on algorithm design and software development.',
      achievements: [
        "Dean's List all semesters",
        'Led university hackathon team to 1st place',
        'Founded campus coding club with 100+ members',
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
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Experience & Education
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My professional journey and academic background
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-cyan-500" />

            {experiences.map((exp, idx) => (
              <div key={idx} className="relative pl-20 pb-12 group">
                <div className="absolute left-4 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center border-4 border-slate-950 group-hover:scale-125 transition-transform duration-300">
                  {exp.type === 'work' ? (
                    <Briefcase className="w-4 h-4 text-white" />
                  ) : (
                    <GraduationCap className="w-4 h-4 text-white" />
                  )}
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/20">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                      <p className="text-cyan-400 font-medium">{exp.company}</p>
                    </div>
                    <span className="px-4 py-1 bg-cyan-500/10 text-cyan-400 text-sm rounded-full border border-cyan-500/20">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-gray-400 mb-4">{exp.description}</p>

                  <div className="space-y-2">
                    {exp.achievements.map((achievement, achIdx) => (
                      <div key={achIdx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                        <p className="text-sm text-gray-300">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-xl border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg">
                <Award className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Certifications</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:bg-cyan-500/5"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                  <span className="text-gray-300">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
