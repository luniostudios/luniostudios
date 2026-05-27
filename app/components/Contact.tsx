"use client"

import { useState, useEffect, useRef } from 'react';
import { Mail, MessageSquare, User, Send, CheckCircle2, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';


const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useLanguage();

  // Book-open animation state + ref for intersection observer
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsOpen(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //check that email contains a real email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('Invalid email address.');
      return;
    }

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Successfully sent your message!")
        setIsSubmitted(true);
      } else {
        toast.error("¡Failed to send message!")
      }
    } catch (error) {
      toast.error('An error occurred.');
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-500/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            {t('contact.title')}
          </h1>
          <h2 className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('contact.description')}
          </h2>
        </div>
        <div
          ref={containerRef}
          className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
          style={{ perspective: 1400 }}
        >
          <div
            className="space-y-6 h-full"
            style={{
              transformStyle: 'preserve-3d',
              // left page rotates from closed to open
              transform: isOpen ? 'rotateY(0deg)' : 'rotateY(90deg)',
              transformOrigin: 'right center',
              transition: 'transform 900ms cubic-bezier(.2,.9,.2,1)',
              willChange: 'transform',
            }}
          >
            <div className="bg-linear-to-br from-stone-900 to-stone-800 p-8 rounded-xl border border-white/10 h-full flex flex-col shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                {t('contact.subtitle')}
              </h3>
              <h4 className="text-gray-400 mb-8">
                {t('contact.subdescription')}
              </h4>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-green-100/50 transition-all duration-300">
                  <div className="p-3 bg-linear-to-r from-[#30933d] to-[#44ff8c] rounded-lg">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">
                      {t('contact.responseTime')}
                    </p>
                    <p className="text-white font-medium">
                      {t('contact.responseTimeValue')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <h5 className="text-gray-400 text-sm mb-4">
                  {t('contact.followUs')}
                </h5>
                <div className="flex gap-3">
                  {['LinkedIn', 'Instagram', 'Facebook'].map((platform) => (
                    <button
                      key={platform}
                      className="px-4 py-2 bg-white/5 rounded-lg text-sm text-gray-300 hover:bg-green-500/10 hover:text-green-400 border border-white/10 hover:border-green-500/50 transition-all duration-300"
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className="bg-linear-to-br from-stone-900 to-stone-800 p-8 rounded-xl border border-white/10 h-full flex flex-col shadow-2xl"
            style={{
              transformStyle: 'preserve-3d',
              // right page rotates from closed to open
              transform: isOpen ? 'rotateY(0deg)' : 'rotateY(-90deg)',
              transformOrigin: 'left center',
              transition: 'transform 900ms cubic-bezier(.2,.9,.2,1)',
              willChange: 'transform',
            }}
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-linear-to-br from-stone-500/20 to-stone-500/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </div>
                <h6 className="text-2xl font-bold text-white mb-2">Message Sent!</h6>
                <p className="text-gray-400">I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('contact.name')}
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-100/50 focus:ring-2 focus:ring-green-100/20 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('contact.email')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-100/50 focus:ring-2 focus:ring-green-100/20 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('contact.message')}
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-100/50 focus:ring-2 focus:ring-green-100/20 transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                </div>

                <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY}></div>

                <button
                  type="submit"
                  className="w-full py-3 bg-stone-700 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {t('contact.send')}
                </button>
                <p>{status}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
