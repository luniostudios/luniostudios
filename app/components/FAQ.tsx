import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'How much does it cost?',
    a: 'LUNIO Studios prices are custom made based on your project requirements. They can range from $100 to $10,000+ depending on the complexity and scope of your project. We provide a free estimate for every project.',
  },
  {
    q: 'Do we provide hosting and deployment?',
    a: 'We dont provide hosting or deployment services. However, we can assist you in deploying your project to your preferred hosting provider and provide guidance on best practices for deployment.',
  },
  {
    q: 'Does projects have revisions?',
    a: 'Yes, we offer revisions for our projects. The number of revisions included in the project scope will be specified in the project proposal. Additional revisions may be available for an additional fee.',
  },
  {
    q: 'Can I collaborate with LUNIO Studios?',
    a: 'Yes, we welcome collaboration with other developers, designers, and agencies. We can work together on projects and provide our expertise to help bring your ideas to life.',
  },
  {
    q: 'Can LUNIO Studios help managing my website?',
    a: 'Yes, we offer website management services to help you maintain and update your website. We can provide ongoing support and maintenance to ensure your website is running smoothly and up-to-date.',
  },
  {
    q: 'Is there a free plan?',
    a: 'We do not offer a free plan. However, we provide a free estimate for every project, and we can work with you to create a custom solution that fits your budget and requirements.',
  },
];

function FaqItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-2xl bg-[#081023] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-medium text-lg pr-4 ">{faq.q}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
          open ? 'bg-brand-500/20 text-brand-300' : 'bg-white/5 text-ink-400'
        }`}>
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="px-5 pb-5 text-ink-300 leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative py-28 sm:py-32">
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold bg-linear-to-r from-[#D31027] to-[#EA384D] bg-clip-text text-transparent uppercase tracking-widest">
            FAQ
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-black">
            Questions?{' '}
            <span className="gradient-text">We've got answers</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
