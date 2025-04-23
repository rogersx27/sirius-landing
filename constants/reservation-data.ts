import { ReservationType, Activity, DateAvailability, AdditionalService, Coupon } from "../types"

"use client"

// Categorías de experiencias
export const experienceCategories = [
    {
        id: "stay",
        label: "Estancias en la Granja"
    },
    {
        id: "course",
        label: "Cursos y Talleres"
    }
];

// Iconos para cada tipo de experiencia
const icons = {
    stay: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,

    venue: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="5" width="16" height="16" rx="2"></rect><line x1="16" y1="3" x2="16" y2="7"></line><line x1="8" y1="3" x2="8" y2="7"></line><line x1="4" y1="11" x2="20" y2="11"></line></svg>`,

    team: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,

    agriculture: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,

    culinary: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>`,

    preserves: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 10a7 7 0 0 0 14 0"></path><circle cx="9" cy="9" r="1"></circle><circle cx="15" cy="9" r="1"></circle><path d="M12 2a12.2 12.2 0 0 0-2 6 10 10 0 0 1-2 7"></path><path d="M12 2c.7 2.7 1.7 4.5 2 6a10 10 0 0 0 2 7"></path><path d="M2 18h20"></path></svg>`,
};

// Opciones de experiencias
export const experienceOptions = [
    // Estancias
    {
        value: "stay",
        label: "Estancia en Granja",
        icon: icons.stay,
        category: "stay",
        description: "Disfruta de una estancia tranquila en nuestra granja."
    },
    {
        value: "venue",
        label: "Alquiler de Local",
        icon: icons.venue,
        category: "stay",
        description: "El lugar perfecto para celebrar tu evento especial."
    },
    {
        value: "team",
        label: "Formación de Equipos",
        icon: icons.team,
        category: "stay",
        description: "Fortalece los lazos de tu equipo con actividades en la naturaleza."
    },

    // Cursos y Talleres
    {
        value: "workshop-organic",
        label: "Taller de Agricultura",
        icon: icons.agriculture,
        category: "course",
        description: "Aprende técnicas de cultivo orgánico con nuestros expertos."
    },
    {
        value: "culinary",
        label: "Curso Culinario",
        icon: icons.culinary,
        category: "course",
        description: "Descubre los secretos de la cocina con ingredientes frescos."
    },
    {
        value: "workshop-preserves",
        label: "Taller de Conservas",
        icon: icons.preserves,
        category: "course",
        description: "Aprende a elaborar conservas y encurtidos tradicionales."
    }
];

// Textos de ayuda por categoría
export const helpTextByCategory = {
    stay: "Todas las estancias incluyen desayuno y acceso a las áreas comunes de la granja.",
    course: "Los cursos incluyen todos los materiales necesarios y un almuerzo orgánico."
};

// Método para obtener opciones por categoría
export const getOptionsByCategory = (categoryId) => {
    return experienceOptions.filter(option => option.category === categoryId);
};

// Método para obtener una opción por su valor
export const getOptionByValue = (value) => {
    return experienceOptions.find(option => option.value === value);
};

// Asociaciones entre opciones y actividades
export const optionToActivitiesMap = {
    "stay": ["standard", "deluxe", "suite"],
    "venue": ["wedding", "corporate", "private"],
    "team": ["outdoor", "cooking", "problem"],
    "workshop-organic": ["gardening", "farming"],
    "culinary": ["basics", "advanced", "baking"],
    "workshop-preserves": ["crafts"]
};

export const categorizeExperiences = () => {
    const farmStays = [
        {
            id: "stay",
            name: "Estancia en Granja",
            basePrice: 150,
            example: "Cabaña con vistas a la huerta",
            features: ["Desayuno incluido", "Acceso a huerto", "Paseos guiados"]
        },
        {
            id: "venue",
            name: "Alquiler de Local",
            basePrice: 2000,
            example: "Granero restaurado para eventos",
            features: ["Capacidad 150 personas", "Cocina equipada", "Estacionamiento"]
        },
        {
            id: "team",
            name: "Formación de Equipos",
            basePrice: 200,
            example: "Jornada de integración empresarial",
            features: ["Actividades al aire libre", "Comida incluida", "Facilitador"]
        }
    ];

    // Ejemplos de cursos y talleres con IDs únicos
    const courses = [
        {
            id: "workshop-organic",
            name: "Taller de Agricultura",
            basePrice: 75,
            example: "Cultivo de hortalizas orgánicas",
            duration: "4 horas",
            instructor: "María González, Ing. Agrónoma"
        },
        {
            id: "culinary",
            name: "Curso Culinario",
            basePrice: 120,
            example: "Del huerto a la mesa",
            duration: "6 horas",
            instructor: "Chef Carlos Martín"
        },
        {
            id: "workshop-preserves",
            name: "Taller de Conservas",
            basePrice: 85,
            example: "Elaboración de conservas",
            duration: "3 horas",
            instructor: "Ana Rodríguez, Especialista en conservas"
        }
    ];

    return { farmStays, courses };
};

export const getDescriptionForType = (typeId) => {
    const descriptions = {
        stay: "Disfruta de una estancia tranquila en nuestra granja. Despertar con el canto de los pájaros y disfrutar del entorno natural.",
        workshop: "Aprende técnicas de agricultura sostenible y jardinería orgánica con nuestros expertos agricultores.",
        culinary: "Descubre los secretos de la cocina con ingredientes frescos cultivados en nuestra propia granja.",
        team: "Fortalece los lazos de tu equipo con actividades divertidas y colaborativas en plena naturaleza.",
        venue: "El lugar perfecto para celebrar tu evento especial en un entorno natural único y acogedor.",
        "workshop-organic": "Aprende a cultivar hortalizas orgánicas y a mantener un huerto sostenible con nuestros expertos.",
        "workshop-preserves": "Descubre cómo elaborar conservas caseras con frutas y verduras frescas de la temporada."
    };

    return descriptions[typeId] || "";
};

export const reservationTypes: ReservationType[] = [
    { id: "stay", name: "Estancia en Granja", basePrice: 150 },
    { id: "workshop", name: "Taller", basePrice: 75 },
    { id: "culinary", name: "Curso Culinario", basePrice: 120 },
    { id: "team", name: "Formación de Equipos", basePrice: 200 },
    { id: "venue", name: "Alquiler de Local", basePrice: 2000 },
]

export const activitiesByType: Record<string, Activity[]> = {
    stay: [
        { id: "standard", name: "Habitación Estándar", priceMultiplier: 1 },
        { id: "deluxe", name: "Habitación Deluxe", priceMultiplier: 1.5 },
        { id: "suite", name: "Suite de Granja", priceMultiplier: 2 },
    ],
    workshop: [
        { id: "gardening", name: "Jardinería Orgánica", priceMultiplier: 1 },
        { id: "farming", name: "Agricultura Sostenible", priceMultiplier: 1.2 },
        { id: "crafts", name: "Artesanías Tradicionales", priceMultiplier: 1.1 },
    ],
    culinary: [
        { id: "basics", name: "Fundamentos de la Cocina de Granja", priceMultiplier: 1 },
        { id: "advanced", name: "Cocina Avanzada", priceMultiplier: 1.3 },
        { id: "baking", name: "Panadería Artesanal", priceMultiplier: 1.2 },
    ],
    team: [
        { id: "outdoor", name: "Actividades al Aire Libre", priceMultiplier: 1 },
        { id: "cooking", name: "Desafío de Cocina", priceMultiplier: 1.1 },
        { id: "problem", name: "Resolución de Problemas", priceMultiplier: 1 },
    ],
    venue: [
        { id: "wedding", name: "Boda", priceMultiplier: 1.2 },
        { id: "corporate", name: "Evento Corporativo", priceMultiplier: 1 },
        { id: "private", name: "Fiesta Privada", priceMultiplier: 0.8 },
    ],
}

// Define available dates for each activity
export const availableDates: Record<string, DateAvailability[]> = {
    stay: [
        { date: new Date(2025, 5, 10), available: true },
        { date: new Date(2025, 5, 11), available: true },
        { date: new Date(2025, 5, 12), available: true },
        { date: new Date(2025, 5, 13), available: true },
        { date: new Date(2025, 5, 14), available: true },
        { date: new Date(2025, 5, 15), available: false },
        { date: new Date(2025, 5, 16), available: false },
        { date: new Date(2025, 5, 17), available: true },
        { date: new Date(2025, 5, 18), available: true },
    ],
    workshop: [
        { date: new Date(2025, 5, 10), available: true },
        { date: new Date(2025, 5, 15), available: true },
        { date: new Date(2025, 5, 20), available: true },
        { date: new Date(2025, 5, 25), available: true },
    ],
    culinary: [
        { date: new Date(2025, 5, 12), available: true },
        { date: new Date(2025, 5, 19), available: true },
        { date: new Date(2025, 5, 26), available: true },
    ],
    team: [
        { date: new Date(2025, 5, 5), available: true },
        { date: new Date(2025, 5, 12), available: true },
        { date: new Date(2025, 5, 19), available: true },
        { date: new Date(2025, 5, 26), available: true },
    ],
    venue: [
        { date: new Date(2025, 5, 1), available: true },
        { date: new Date(2025, 5, 8), available: true },
        { date: new Date(2025, 5, 15), available: true },
        { date: new Date(2025, 5, 22), available: true },
        { date: new Date(2025, 5, 29), available: true },
    ],
}

// Define additional services
export const additionalServices: AdditionalService[] = [
    { id: "transport", name: "Transporte", price: 50000 },
    { id: "guided", name: "Visita Guiada", price: 35000 },
    { id: "meal", name: "Paquete Especial de Comidas", price: 75000 },
    { id: "spa", name: "Tratamiento de Spa", price: 120000 },
    { id: "photography", name: "Servicio de Fotografía", price: 200000 },
]

// Define coupon codes
export const coupons: Record<string, Coupon> = {
    "WELCOME10": { discount: 0.1, type: "percentage" },
    "SUMMER25": { discount: 0.25, type: "percentage" },
    "FARM50": { discount: 50, type: "fixed" }
}

// Animation variants
export const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
}