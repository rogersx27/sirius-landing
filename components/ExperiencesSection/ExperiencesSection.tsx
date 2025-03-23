"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { reservationTypes } from "@/components/reservation/constants/reservation-data";
import { fadeIn, staggerContainer } from "@/app/page";

const getDescriptionForType = (typeId) => {
    const descriptions = {
        stay: "Disfruta de una estancia tranquila en nuestra granja. Despertar con el canto de los pájaros y disfrutar del entorno natural.",
        workshop: "Aprende técnicas de agricultura sostenible y jardinería orgánica con nuestros expertos agricultores.",
        culinary: "Descubre los secretos de la cocina con ingredientes frescos cultivados en nuestra propia granja.",
        team: "Fortalece los lazos de tu equipo con actividades divertidas y colaborativas en plena naturaleza.",
        venue: "El lugar perfecto para celebrar tu evento especial en un entorno natural único y acogedor."
    };

    return descriptions[typeId] || "";
};

const ExperienceCard = ({ type }) => (
    <motion.div
        className="bg-white rounded-lg shadow-md overflow-hidden"
        variants={fadeIn}
    >
        <div className="h-48 bg-gray-200 relative">
            <Image
                src={`/images/${type.id}.jpg`}
                alt={type.name}
                fill
                className="object-cover"
            />
        </div>
        <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{type.name}</h3>
            <p className="text-muted-foreground mb-4">
                {getDescriptionForType(type.id)}
            </p>
            <div className="flex justify-between items-center">
                <div className="text-primary font-bold">
                    Desde ${type.basePrice}
                </div>
                <Link href={`/reservar?type=${type.id}`}>
                    <Button>Reservar</Button>
                </Link>
            </div>
        </div>
    </motion.div>
);

export default function ExperiencesSection() {
    return (
        <section className="py-20 bg-primary/5">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-12"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestras Experiencias</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Descubre todas las actividades y experiencias que puedes disfrutar en nuestra granja sostenible.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {reservationTypes.map((type) => (
                        <ExperienceCard key={type.id} type={type} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}