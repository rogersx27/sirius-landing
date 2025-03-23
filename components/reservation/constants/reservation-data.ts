import { ReservationType, Activity, DateAvailability, AdditionalService, Coupon } from "../types"

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
    { id: "transport", name: "Transporte", price: 50 },
    { id: "guided", name: "Visita Guiada", price: 35 },
    { id: "meal", name: "Paquete Especial de Comidas", price: 75 },
    { id: "spa", name: "Tratamiento de Spa", price: 120 },
    { id: "photography", name: "Servicio de Fotografía", price: 200 },
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