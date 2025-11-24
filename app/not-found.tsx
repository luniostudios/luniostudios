'use client'

import Link from 'next/link'
import Header from './components/Header'
import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';

export default function NotFound() {

    const [activeSection, setActiveSection] = useState(() => {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash;
            if (hash) {
                return hash.substring(1);
            }
        }
        return 'home';
    });

    return (
        <LanguageProvider>
            <div className='flex flex-col bg-stone-950 gap-[100px] w-full h-full max-sm:p-1 max-lg:gap-[100px] max-lg:px-10 2xl:px-[13.7%]'>
                <Header activeSection={activeSection} setActiveSection={setActiveSection} />
                <div className='flex flex-col w-full text-2xl items-center gap-10'>
                    <iframe src="https://lottie.host/embed/a830bda9-acc5-4e30-9afe-dae56f4f3ad7/w9fiQhb9C5.lottie"></iframe>
                    <Link className='px-6 py-4 bg-buttoncolor rounded-2xl' href="/">Return Home</Link>
                </div>
            </div>
        </LanguageProvider>
    )
}