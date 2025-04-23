"use client"

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import {
    getDescriptionForType,
    activitiesByType,
    availableDates,
    categorizeExperiences
} from "@/constants/reservation-data";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

// Helper function to format price
const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
};

// Component to display available dates
const AvailabilityCalendar = ({ typeId, onSelectDate }) => {
    // Get available dates for this experience type
    const datesForType = availableDates[typeId] || [];

    // Function to determine if a date is disabled
    const isDateDisabled = (date) => {
        const matchingDate = datesForType.find(
            d => d.date.toDateString() === date.toDateString()
        );
        return !matchingDate || !matchingDate.available;
    };

    return (
        <div className="mt-4">
            <h3 className="font-medium mb-2">Disponibilidad</h3>
            <Calendar
                mode="single"
                disabled={isDateDisabled}
                onSelect={onSelectDate}
                className="rounded-md border"
                fromDate={new Date()}
            />
        </div>
    );
};

// Feature list component
const FeatureList = ({ features }) => {
    if (!features || features.length === 0) return null;

    return (
        <ul className="mt-4 space-y-2">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                    >
                        <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                    {feature}
                </li>
            ))}
        </ul>
    );
};

// Activity selector component
const ActivitySelector = ({ typeId, onSelectActivity }) => {
    const [selectedActivity, setSelectedActivity] = useState(null);
    const activities = activitiesByType[typeId] || [];

    useEffect(() => {
        // Set first activity as default when activities change
        if (activities.length > 0 && !selectedActivity) {
            setSelectedActivity(activities[0].id);
            onSelectActivity(activities[0]);
        }
    }, [activities, selectedActivity, onSelectActivity]);

    const handleActivityChange = (activity) => {
        setSelectedActivity(activity.id);
        onSelectActivity(activity);
    };

    if (activities.length === 0) return null;

    return (
        <div className="mt-6">
            <h3 className="font-medium mb-3">Opciones disponibles</h3>
            <div className="grid grid-cols-1 gap-2">
                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        className={`border rounded-md p-3 cursor-pointer transition-all ${selectedActivity === activity.id
                                ? "border-primary bg-primary/5"
                                : "hover:border-gray-400"
                            }`}
                        onClick={() => handleActivityChange(activity)}
                    >
                        <div className="flex justify-between items-center">
                            <span>{activity.name}</span>
                            <Badge variant={selectedActivity === activity.id ? "default" : "outline"}>
                                {activity.priceMultiplier > 1 ? "+" : ""}
                                {Math.round((activity.priceMultiplier - 1) * 100)}%
                            </Badge>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Loading skeleton component
const ExperienceDetailSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
            <div className="h-64 md:h-96 bg-gray-200 rounded-lg"></div>
            <div className="mt-6">
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-24 w-2/3 mb-4" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </div>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-10 w-full" />
                </CardFooter>
            </Card>
        </div>
    </div>
);

// Main experience detail component
const ExperienceDetail = ({ experience, isStay = true }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(experience?.basePrice || 0);

    // Update total price when selection changes
    useEffect(() => {
        if (!experience) return;

        let price = experience.basePrice;

        if (selectedActivity) {
            price = price * selectedActivity.priceMultiplier;
        }

        price = price * quantity;

        setTotalPrice(price);
    }, [experience, selectedActivity, quantity]);

    const handleQuantityChange = (change) => {
        const newQuantity = Math.max(1, quantity + change);
        setQuantity(newQuantity);
    };

    if (!experience) {
        return <ExperienceDetailSkeleton />;
    }

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Left column - Image */}
            <motion.div className="md:col-span-2" variants={itemVariants}>
                <div className="relative rounded-lg overflow-hidden h-64 md:h-96">
                    <Image
                        src={`/images/${experience.id}.jpg`}
                        alt={experience.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    {!isStay && (
                        <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Curso
                        </div>
                    )}
                </div>

                <motion.div className="mt-6" variants={itemVariants}>
                    <h1 className="text-2xl font-bold">{experience.name}</h1>
                    <p className="text-muted-foreground mt-2">
                        {getDescriptionForType(experience.id)}
                    </p>

                    {/* Example box */}
                    <div className="mt-4 bg-primary/5 px-4 py-3 rounded-md inline-block">
                        <h3 className="font-medium mb-1">Ejemplo</h3>
                        <p className="text-sm">{experience.example}</p>
                    </div>

                    {/* Features */}
                    <FeatureList features={experience.features} />

                    {/* Course details */}
                    {!isStay && experience.duration && (
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-amber-600"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                <span>{experience.duration}</span>
                            </div>
                            {experience.instructor && (
                                <div className="flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-amber-600"
                                    >
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    <span>{experience.instructor}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Details accordion */}
                    <Accordion type="single" collapsible className="mt-6">
                        <AccordionItem value="details">
                            <AccordionTrigger>Detalles adicionales</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    Esta experiencia está diseñada para brindarte una inmersión completa
                                    en nuestra granja sostenible. {isStay
                                        ? "Durante tu estancia podrás disfrutar de todas las instalaciones y actividades programadas."
                                        : "Durante el curso aprenderás técnicas prácticas que podrás aplicar en tu día a día."
                                    }
                                </p>
                                <p className="mt-2">
                                    {isStay
                                        ? "El check-in es a partir de las 14:00 y el check-out antes de las 12:00."
                                        : "Te recomendamos llevar ropa cómoda y adecuada para actividades al aire libre."
                                    }
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="policies">
                            <AccordionTrigger>Políticas de cancelación</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    Cancelación gratuita hasta 7 días antes de la fecha reservada.
                                    Las cancelaciones posteriores tendrán un cargo del 50% del precio total.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </motion.div>
            </motion.div>

            {/* Right column - Booking card */}
            <motion.div variants={itemVariants}>
                <Card>
                    <CardHeader>
                        <CardTitle>Reserva tu experiencia</CardTitle>
                        <CardDescription>
                            {isStay
                                ? "Selecciona las fechas y opciones para tu estancia"
                                : "Inscríbete en este curso y aprende con nosotros"
                            }
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {/* Price display */}
                        <div className="flex items-baseline">
                            <span className="text-xl font-bold">{formatPrice(totalPrice)}</span>
                            <span className="text-muted-foreground ml-2">
                                {isStay ? "por noche" : "por persona"}
                            </span>
                        </div>

                        {/* Activity selector */}
                        <ActivitySelector
                            typeId={experience.id}
                            onSelectActivity={setSelectedActivity}
                        />

                        {/* Quantity selector (for courses) */}
                        {!isStay && (
                            <div className="mt-6">
                                <h3 className="font-medium mb-3">Personas</h3>
                                <div className="flex items-center">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= 1}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M5 12h14"></path>
                                        </svg>
                                    </Button>

                                    <span className="mx-4 min-w-[2rem] text-center">
                                        {quantity}
                                    </span>

                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleQuantityChange(1)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M12 5v14"></path>
                                            <path d="M5 12h14"></path>
                                        </svg>
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Date selector */}
                        <AvailabilityCalendar
                            typeId={experience.id}
                            onSelectDate={setSelectedDate}
                        />
                    </CardContent>

                    <CardFooter>
                        <Button
                            className="w-full"
                            size="lg"
                            disabled={!selectedDate || !selectedActivity}
                        >
                            {isStay ? "Reservar ahora" : "Inscribirse"}
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </motion.div>
    );
};

// Page component
export default function ExperiencePage() {
    const searchParams = useSearchParams();
    const experienceId = searchParams.get("id");
    const [experience, setExperience] = useState(null);
    const [isStay, setIsStay] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!experienceId) return;

        // Fetch experience data
        const { farmStays, courses } = categorizeExperiences();
        const allExperiences = [...farmStays, ...courses];
        const foundExperience = allExperiences.find(exp => exp.id === experienceId);

        // Check if it's a stay or course
        const stayType = farmStays.some(stay => stay.id === experienceId);

        setExperience(foundExperience || null);
        setIsStay(stayType);
        setLoading(false);
    }, [experienceId]);

    // Handle the case when no experience is found
    if (!loading && !experience) {
        return (
            <div className="container mx-auto px-4 py-12 mt-16">
                <h1 className="text-2xl font-bold mb-4">Experiencia no encontrada</h1>
                <p className="text-muted-foreground mb-6">La experiencia que estás buscando no existe o ha sido eliminada.</p>
                <Link href="/services">
                    <Button>Ver todas las experiencias</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 mt-16">
            {loading ? (
                <ExperienceDetailSkeleton />
            ) : (
                <ExperienceDetail
                    experience={experience}
                    isStay={isStay}
                />
            )}
        </div>
    );
}