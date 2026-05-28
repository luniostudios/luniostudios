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
        en: 'Showcase',
        es: 'Demostración',
    },
    'header.skills': {
        en: 'Tools & Skills',
        es: 'Herramientas',
    },
    'header.sandbox': {
        en: 'Interaction Lab',
        es: 'Laboratorio Interactivo',
    },
    'header.contact': {
        en: 'Contact Us',
        es: 'Contáctanos',
    },

    'hero.banner' : {
        en: 'Want to Build Your Own Website? ',
        es: '¿Quieres hacer tu propio sitio web? ',
    },

    'hero.banner2' : {
        en: 'Learn more',
        es: 'Aprender más',
    },

    'hero.pricing': {
        en: 'Pricing',
        es: 'Precios',
    },

    'hero.title': {
        en: 'ENGINEERING',
        es: 'INGENIANDO',
    },
    'hero2.title': {
        en: 'DIGITAL MAGIC',
        es: 'MAGIA DIGITAL',
    },
    'hero3.title': {
        en: 'FOR NEXT-GEN BRANDS',
        es: 'PARA MARCAS AVANZADAS',
    },
    'hero.description': {
        en: 'LUNIO Studios translates high-concept design, intelligent interaction, and state-of-the-art interactive development into jaw-dropping online ecosystem success.',
        es: 'LUNIO Studios traduce el diseño de alto concepto, la interacción inteligente y el desarrollo interactivo de vanguardia en un éxito impresionante del ecosistema en línea.',
    },
    'hero.cta': {
        en: 'Explore Showcase',
        es: 'Explorar Demostración',
    },
    'hero.sandbox': {
        en: 'Enter Interaction Lab',
        es: 'Laboratorio Interactivo',
    },
    'hero.download': {
        en: 'Open CV',
        es: 'Abrir CV',
    },
    'hero.card': {
        en: 'Years Experience',
        es: 'Años de Experiencia',
    },
    'hero.card2': {
        en: 'Projects Completed',
        es: 'Proyectos Completados',
    },
    'hero.card3': {
        en: 'Happy Clients',
        es: 'Clientes Satisfechos',
    },
    'hero.card4': {
        en: 'Code Commits',
        es: 'Commits de Código',
    },
    'skills.title': {
        en: 'Tools & Skills',
        es: 'Herramientas y Habilidades',
    },
    'skills.description': {
        en: 'A comprehensive toolkit of modern technologies and frameworks we work with',
        es: 'Un conjunto completo de herramientas con tecnologías y frameworks modernos con los que trabajamos',
    },
    'skills.subtitle': {
        en: '* Move skills around. (Drag & Drop Experience)',
        es: '* Mueve las habilidades. (Experiencia de arrastrar y soltar)',
    },
    'labs.tag': {
        en: 'Interactive Sandbox',
        es: 'Sandbox Interactivo',
    },
    'labs.title': {
        en: 'TINKER WITH THE FABRIC OF THE DIGITAL COSMOS',
        es: 'EXPERIMENTA CON LA TRAMA DEL COSMOS DIGITAL',
    },
    'labs.description': {
        en: 'This interactive playground lets you experiment with parameters of dynamic styling. See how our web engineers control rendering values live to formulate custom digital worlds',
        es: 'Este espacio de juego interactivo te permite experimentar con los parámetros del estilo dinámico. Ve cómo nuestros ingenieros web controlan los valores de renderizado en vivo para formular mundos digitales personalizados',
    },
    'showcase.title': {
        en: 'Creative Showcase',
        es: 'Demostración Creativa',
    },
    'showcase.description': {
        en: 'Explore a premium selection of our newest launches. We transform visions into highly functional visual systems.',
        es: 'Explora una selección premium de nuestros lanzamientos más recientes. Transformamos visiones en sistemas visuales altamente funcionales.',
    },
    'showcase.title2': {
        en: 'HAVE A HIGH-STAKES CREATIVE CHALLENGE?',
        es: '¿TIENES UN DESAFÍO CREATIVO DE ALTO RIESGO?',
    },
    'showcase.description2': {
        en: 'We dont do bland layouts. We engineer high-concept web worlds, fluid user systems, and high-performance digital ecosystems that win markets. Lets craft yours.',
        es: 'No hacemos diseños aburridos. Diseñamos mundos web de alto concepto, sistemas de usuario fluidos y ecosistemas digitales de alto rendimiento que ganan mercados. Vamos a crear el tuyo.',
    },
    'showcase.cta': {
        en: 'Start Project Dialog',
        es: 'Iniciar Diálogo de Proyecto',
    },
    'showcase.cta2': {
        en: 'Try the Sandbox',
        es: 'Probar el Sandbox',
    },
    'footer.quickLinks': {
        en: 'Quick Links',
        es: 'Enlaces Rápidos',
    },
    'footer.contactUs': {
        en: 'Get In Touch',
        es: 'Ponte en Contacto',
    },
    'footer.contactDescription': {
        en: 'Feel free to reach out for collaborations or inquiries.',
        es: 'No dudes en contactarnos para colaboraciones o consultas.',
    },
    'footer.getInTouch': {
        en: 'Get in Touch',
        es: 'Ponte en Contacto',
    },
    'footer.rightsReserved': {
        en: 'All rights reserved.',
        es: 'Todos los derechos reservados.',
    },
    'footer.hecho': {
        en: 'Made with',
        es: 'Hecho con',
    },
    'footer.por': {
        en: 'by',
        es: 'por',
    },
    'projects.title': {
        en: 'Featured Projects',
        es: 'Proyectos Destacados',
    },
    'projects.description': {
        en: 'A selection of my recent work showcasing various technologies and creative solutions',
        es: 'Una selección de mis trabajos recientes que muestran diversas tecnologías y soluciones creativas',
    },
    'projects.allCategories': {
        en: 'All Categories',
        es: 'Todas las Categorías',
    },
    'loading': {
        en: 'Loading',
        es: 'Cargando',
    },
    'noProjectsFound': {
        en: 'No projects found.',
        es: 'No se encontraron proyectos.',
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