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
        en: 'Portfolio',
        es: 'Portafolio',
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

    'hero.banner' : {
        en: 'Bored and want to join the team? ',
        es: '¿Aburrido y quieres unirte al equipo? ',
    },

    'hero.title': {
        en: 'Make your Life Easier with our Studio',
        es: 'Haz tu Vida Más Fácil con nuestra Agencia',
    },
    'hero.description': {
        en: 'Crafting exceptional digital experiences with cutting-edge technologies. Passionate about clean code, innovative solutions, and pushing the boundaries of what\'s possible.',
        es: 'Creando experiencias digitales excepcionales con tecnologías de vanguardia. Apasionados por el código limpio, soluciones innovadoras y superar los límites de lo posible.',
    },
    'hero.cta': {
        en: 'Get in Touch',
        es: 'Contáctanos',
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
    'team.title': {
        en: 'Our Expert Team',
        es: 'Nuestro Equipo Experto',
    },
    'team.description': {
        en: 'Get to know the skilled professionals behind our innovative solutions',
        es: 'Conoce a los profesionales capacitados detrás de nuestras soluciones innovadoras',
    },
    'contact.title': {
        en: 'Get in Touch',
        es: 'Ponte en Contacto',
    },
    'contact.description': {
        en: 'Whether you have a question about services, pricing, need a demo, or anything else, our team is ready to answer all your questions.',
        es: 'Ya sea que tengas una pregunta sobre servicios, precios, necesites una demostración o cualquier otra cosa, nuestro equipo está listo para responder todas tus preguntas.',
    },
    'contact.subtitle': {
        en: "Let's Connect",
        es: 'Conectémonos',
    },
    'contact.subdescription': {
        en: 'Fill out the form below or reach us through our social media channels.',
        es: 'Rellena el formulario a continuación o contáctanos a través de nuestras redes sociales.',
    },
    'contact.responseTime': {
        en: 'Response Time',
        es: 'Tiempo de Respuesta',
    },
    'contact.responseTimeValue': {
        en: 'Within 24 hours',
        es: 'Dentro de 24 horas',
    },
    'contact.followUs': {
        en: 'Or find us on social media',
        es: 'O encuéntranos en las redes sociales',
    },
    'contact.name': {
        en: 'Full Name',
        es: 'Nombre Completo',
    },
    'contact.email': {
        en: 'Your Email',
        es: 'Correo Electrónico',
    },
    'contact.message': {
        en: 'Your Message',
        es: 'Tu Mensaje',
    },
    'contact.send': {
        en: 'Send Message',
        es: 'Enviar Mensaje',
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