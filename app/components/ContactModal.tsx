import { Mail, MessageSquare, X } from 'lucide-react'
import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';

interface props {
    features: number,
    scope: string,
    price: number,
    isModalOpen: boolean,
    toggleModalOpen: (toggle: boolean) => void
}

const ContactModal = ({ features, scope, price, isModalOpen, toggleModalOpen }: props) => {

    const [formData, setFormData] = useState({ email: '', message: '' });
    const [status, setStatus] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

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

    const { t } = useLanguage();


    return (
        < div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`
        }>
            <div className={`bg-white rounded-3xl border border-slate-100 shadow-2xl p-8 max-w-md w-full relative transform transition-transform duration-300 ${isModalOpen ? 'scale-100' : 'scale-95'}`}>
                <button
                    onClick={() => toggleModalOpen(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{t('contact.title')}</h3>
                    <p className="text-sm text-slate-600 mb-6">
                        {t('contact.desc')}
                    </p>

                    <div className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-200/30 text-left mb-6 space-y-1.5">
                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Selected Package Recap</p>
                        <div className="flex justify-between text-xs text-slate-800">
                            <span className="font-medium">Total Active Modules:</span>
                            <span className="font-bold">{features} selected</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-800">
                            <span className="font-medium">Scope Configuration:</span>
                            <span className="font-bold">{scope}</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-800">
                            <span className="font-medium">Estimated Pricing:</span>
                            <span className="font-bold text-violet-600">{price}</span>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className='w-full items-start'>
                        <div className='flex w-full flex-col justify-baseline mb-5'>
                            <label htmlFor="email" className="block w-full text-justify text-sm font-medium text-gray-300 mb-2">
                                {t('contact.email')}
                            </label>
                            <div className="relative border border-black/30 rounded-lg">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-green-100/50 focus:ring-2 focus:ring-green-100/20 transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                        <div className='flex w-full flex-col justify-baseline mb-5'>
                            <label htmlFor="message" className="block w-full text-justify text-sm font-medium text-gray-300 mb-2">
                                {t('contact.message')}
                            </label>
                            <div className="relative border border-black/30 rounded-lg">
                                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-green-100/50 focus:ring-2 focus:ring-green-100/20 transition-all resize-none"
                                    placeholder="Tell me about your project. Be as detailed as possible so we can give you the best quote and start your projects as soon as possible."
                                />
                            </div>
                        </div>

                        <div className='flex w-full flex-col gap-2'>
                            <button
                                type='submit'
                                className="w-full text-black border border-black font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
                            >
                                Send Request
                            </button>

                            <button
                                onClick={() => toggleModalOpen(false)}
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
                            >
                                Close Details
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default ContactModal