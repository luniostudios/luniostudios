import { useState, useMemo } from 'react';
import {
    Clock,
} from 'lucide-react';
import ContactModal from './ContactModal';
import { useLanguage } from '../contexts/LanguageContext';

type ServicesSelected = {
    [key: string]: boolean;
};

export default function App() {
    // 1. States
    const [servicesSelected, setServicesSelected] =
        useState<ServicesSelected>({
            brand: true,
            dev: true,
            seo: false,
            infra: false,
        });
    const [scope, setScope] = useState(2); // 1 = Starter, 2 = Medium, 3 = Enterprise
    const [urgency, setUrgency] = useState('standard'); // relaxed, standard, express
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 4. Calculate Estimate values
    const estimationDetails = useMemo(() => {
        let basePrice = 0;
        let baseWeeks = 0;
        const activeFeatures = [];

        if (servicesSelected.brand) {
            basePrice += 100;
            baseWeeks += 1;
            activeFeatures.push("UI Design");
        }
        if (servicesSelected.dev) {
            basePrice += 200;
            baseWeeks += 1;
            activeFeatures.push("Development");
        }
        if (servicesSelected.seo) {
            basePrice += 300;
            baseWeeks += 1;
            activeFeatures.push("SEO Audit");
        }
        if (servicesSelected.infra) {
            basePrice += 400;
            baseWeeks += 1;
            activeFeatures.push("Cloud Setup");
        }

        let multiplier = 1.0;
        let scopeLabel = "Medium Scale";
        let scopeBadgeColor = "bg-violet-50 text-violet-600";

        if (scope === 1) {
            scopeLabel = "Starter MVP";
            scopeBadgeColor = "bg-blue-50 text-blue-600";
            multiplier = 0.75;
        } else if (scope === 3) {
            scopeLabel = "Enterprise";
            scopeBadgeColor = "bg-purple-50 text-purple-600";
            multiplier = 1.6;
        }

        let finalPrice = basePrice * multiplier;
        let finalWeeks = Math.ceil(baseWeeks * multiplier);

        if (urgency === 'relaxed') {
            finalPrice *= 0.95;
            finalWeeks = Math.ceil(finalWeeks * 1.3);
        } else if (urgency === 'express') {
            finalPrice *= 1.35;
            finalWeeks = Math.max(1, Math.ceil(finalWeeks * 0.6));
        }

        return {
            price: Math.round(finalPrice),
            weeks: finalWeeks,
            features: activeFeatures,
            scopeLabel,
            scopeBadgeColor
        };
    }, [servicesSelected, scope, urgency]);

    function toggleModal() {
        setIsModalOpen(!isModalOpen)
    }

    const { t } = useLanguage();

    return (
        <div id='pricing' className="bg-slate-50 text-slate-800 antialiased selection:bg-red-500 selection:text-white flex flex-col font-sans relative overflow-x-hidden">
            <main className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">

                {/* Dynamic Package Creator Interactive Widget */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-6 sm:p-10 mb-16 relative overflow-hidden bg-grid-pattern">
                    <div className="absolute inset-y-0 right-0 w-1/3 bg-linear-to-l from-violet-50/40 via-transparent to-transparent pointer-events-none" />

                    <div className="relative z-10 max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">{t('estimate.title')}</h2>
                            <p className="text-slate-500 text-sm mt-1">{t('estimate.desc')}</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                            {/* Dynamic Controls Side */}
                            <div className="lg:col-span-7 space-y-6">

                                {/* Checkbox selections */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-800 mb-3">Choose Modules Required</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                                        {[
                                            { id: 'brand', label: 'UI/UX Design', sub: 'Figma, Prototype, Assets' },
                                            { id: 'dev', label: 'Development', sub: 'Next.js, Clean Code, API' },
                                            { id: 'seo', label: 'SEO Strategy', sub: 'Analytics, Optimization, Keywords' },
                                            { id: 'infra', label: 'Cloud Setup', sub: 'Hosting, Database, Scaling' },
                                        ].map(item => (
                                            <label
                                                key={item.id}
                                                className={`relative flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all duration-200 group ${servicesSelected[item.id]
                                                    ? 'border-red-300 bg-red-50/30'
                                                    : 'border-slate-200/80 hover:border-red-300 hover:bg-red-50/10'
                                                    }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={servicesSelected[item.id] || false}
                                                    onChange={() =>
                                                        setServicesSelected((prev) => ({
                                                            ...prev,
                                                            [item.id]: !prev[item.id],
                                                        }))
                                                    }
                                                    className="mt-1 w-4.5 h-4.5 rounded border-slate-300 text-red-600 focus:ring-red-500"
                                                />
                                                <div>
                                                    <p className={`text-xs font-bold ${servicesSelected[item.id] ? 'text-red-700' : 'text-slate-800 group-hover:text-red-700'}`}>{item.label}</p>
                                                    <p className="text-[10px] text-slate-500">{item.sub}</p>
                                                </div>
                                            </label>
                                        ))}

                                    </div>
                                </div>

                                {/* Scope size control (1-3 Slider) */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-semibold text-slate-800">Project Scope & Size</label>
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded ${estimationDetails.scopeBadgeColor}`}>
                                            {estimationDetails.scopeLabel}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="3"
                                        value={scope}
                                        onChange={(e) => setScope(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                                    />
                                    <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-1 mt-1">
                                        <span>MVP / STARTER</span>
                                        <span>MID-LEVEL</span>
                                        <span>ENTERPRISE</span>
                                    </div>
                                </div>

                                {/* Timeline Choice buttons */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-800 mb-2">Delivery Urgency</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[
                                            { id: 'relaxed', label: 'Flexible' },
                                            { id: 'standard', label: 'Standard' },
                                            { id: 'express', label: 'Express (Fast)' }
                                        ].map(speed => (
                                            <button
                                                key={speed.id}
                                                type="button"
                                                onClick={() => setUrgency(speed.id)}
                                                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${urgency === speed.id
                                                    ? 'border-red-500 bg-red-50 text-red-600 font-bold'
                                                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                                                    }`}
                                            >
                                                {speed.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            {/* Dynamic Cost Calculator Results Panel */}
                            <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-100 p-6 flex flex-col justify-between h-full min-h-[300px]">
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-4">ESTIMATION SUMMARY</h4>

                                    {/* Cost Counter representation */}
                                    <div className="mb-4">
                                        <p className="text-[10px] text-slate-400 font-semibold">ESTIMATED PRICE RANGE</p>
                                        <div className="flex items-baseline gap-1 mt-1">
                                            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                                                {estimationDetails.price === 0 ? '$0' : `$${estimationDetails.price.toLocaleString()}`}
                                            </span>
                                            <span className="text-xs text-slate-500 font-semibold">/ project</span>
                                        </div>
                                    </div>

                                    {/* Calendar details */}
                                    <div className="mb-6 flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200/40">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-red-500" />
                                            <span className="text-xs font-semibold text-slate-600">Timeline Scope</span>
                                        </div>
                                        <span className="text-xs font-extrabold text-slate-900">
                                            {estimationDetails.price === 0 ? '0 Weeks' : `${Math.max(1, estimationDetails.weeks - 1)}-${estimationDetails.weeks} Weeks`}
                                        </span>
                                    </div>

                                    {/* Display active feature list elements as badges */}
                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                        {estimationDetails.features.length === 0 ? (
                                            <span className="text-[10px] text-slate-400 italic">No services selected</span>
                                        ) : (
                                            estimationDetails.features.map((feat, idx) => (
                                                <span key={idx} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/60 text-slate-700 uppercase tracking-wide">
                                                    {feat}
                                                </span>
                                            ))
                                        )}
                                    </div>
                                </div>

                                {/* Shimmer Submit Trigger Button */}
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="w-full relative overflow-hidden bg-linear-to-r from-[#D31027] to-[#EA384D] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-xl transition-all duration-200 text-center text-sm"
                                >
                                    Contact Sales Team
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
            <ContactModal features={estimationDetails.features.length} scope={estimationDetails.scopeLabel} price={estimationDetails.price} isModalOpen={isModalOpen} toggleModalOpen={toggleModal} />
        </div>
    );
}