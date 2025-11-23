import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Translations {
    [key: string]: {
        en: string;
        es: string;
    };
}


interface LanguageContextType {
    language: 'es' | 'en';
    setLanguage: (lang: 'es' | 'en') => void;
    t: (key: string) => string;
}

const translations: Translations = {
    // Header Translations
    'header.portfolio': {
        en: 'Our Portfolio',
        es: 'Nuestro Portafolio',
    },
    'header.skills': {
        en: 'Tools & Skills',
        es: 'Herramientas',
    },
    'header.team': {
        en: 'The Team',
        es: 'El Equipo',
    },
    'header.contact': {
        en: 'Contact Us',
        es: 'Contáctanos',
    },

    'hero.title': {
        en: 'Make your Life Easier with our Studio',
        es: 'Haz tu Vida Más Fácil con nuestro Estudio',
    },
    'hero.description': {
        en: 'Crafting exceptional digital experiences with cutting-edge technologies. Passionate about clean code, innovative solutions, and pushing the boundaries of what\'s possible.',
        es: 'Creando experiencias digitales excepcionales con tecnologías de vanguardia. Apasionados por el código limpio, soluciones innovadoras y superar los límites de lo posible.',
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<'en' | 'es'>('en');

    const t = (key: string): string => {
        return translations[key]?.[language] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};