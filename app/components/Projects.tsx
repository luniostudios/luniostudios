"use client"

import { useState, useEffect } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { supabase, Project } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';


const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const {t} = useLanguage();

  // renamed state to `projects` for clarity
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', label: `${t('projects.allCategories')}` },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'AI', label: 'AI' },
    { id: 'cyber', label: 'Cybersecurity' },
  ];

  useEffect(() => {
    fetchItems(selectedCategory);
  }, [selectedCategory]);

  const fetchItems = async (category = 'all') => {
    setLoading(true);
    try {
      let query = supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (category !== 'all') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProjects((data as Project[]) || []);
    } catch (error) {
      console.error('Error fetching items:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects; // server-side filtered already

  return (
    <section id="projects" className="py-20 relative pt-[150px] bg-stone-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t('projects.title')}
          </h1>
          <h2 className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('projects.description')}
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <Filter className="w-5 h-5 text-white" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === cat.id
                ? 'bg-linear-to-r from-[#D31027] to-[#EA384D] text-white shadow-sm shadow-red-500/50 outline-none'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10 outline-none'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="text-center text-gray-400 col-span-full">
              {t('loading')}...
            </p>
          ) : filteredProjects.length === 0 ? (
            <p className="text-center text-gray-400 col-span-full">
              {t('noProjectsFound')}
            </p>
          ) : (
            filteredProjects.map((proje, index) => (
              <motion.article
                key={proje.id}
                className="group relative bg-linear-to-b from-stone-900/60 to-stone-800/40 rounded-2xl border border-white/6 overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-md hover:shadow-green-500/10"
                initial={{ opacity: 0 }} animate={{ opacity: 100 }} transition={{ duration: 1, ease: "easeInOut", delay: index * 0.1 }}
              >
                <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-black/40 via-transparent to-transparent opacity-30" />

                <div className="md:flex">
                  <div className="md:w-48 h-full md:h-auto shrink-0 overflow-hidden bg-stone-800">
                    <img
                      src={proje.image_url || '/images/og.png'}
                      alt={proje.title || 'project'}
                      className="h-full w-fit object-cover transition-transform duration-600 group-hover:scale-105"
                      loading='lazy'
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg md:text-xl font-semibold text-white leading-tight">
                          {proje.title}
                        </h3>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/6 text-gray-200 border border-white/6">
                          {proje.category?.toUpperCase()}
                        </span>
                      </div>

                      <p className="text-gray-400 text-sm mt-6 mb-4 line-clamp-3">
                        {proje.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {(proje.tags || []).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/6 text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-4  border-t border-white/10 pt-4">
                      <div className="flex items-center gap-3">
                        <a
                          href={proje.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-white/5 hover:bg-white/6 transition-colors border border-white/6 text-gray-200"
                        >
                          <Github className="w-4 h-4" />
                          <span className="hidden sm:inline">Source</span>
                        </a>
                        <a
                          href={proje.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-white/5 hover:bg-white/6 transition-colors border border-white/6 text-gray-200"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="hidden sm:inline">Live</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
