"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { categorizeExperiences, getDescriptionForType, reservationTypes } from "@/constants/reservation-data";
import { fadeIn, staggerContainer } from "@/app/page";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const ExperienceCard = ({ type, isStay = true }) => (
    <motion.div
        className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col"
        variants={fadeIn}
    >
        <div className="h-52 bg-gray-200 relative">
            <Image
                src={`/images/${type.id}.jpg`}
                alt={type.name}
                fill
                className="object-cover"
                priority
            />
            {!isStay && (
                <div className="absolute top-2 right-2 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Curso
                </div>
            )}
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold mb-2">{type.name}</h3>

            {/* Ejemplo específico */}
            <div className="mb-3 text-sm bg-primary/5 px-3 py-1.5 rounded-md inline-block">
                {type.example}
            </div>

            <p className="text-muted-foreground mb-4 flex-grow">
                {getDescriptionForType(type.id)}
            </p>

            {/* Mostrar características según tipo */}
            {isStay && type.features && (
                <ul className="mb-4 text-sm space-y-1">
                    {type.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                                <path d="M20 6L9 17l-5-5"></path>
                            </svg>
                            {feature}
                        </li>
                    ))}
                </ul>
            )}

            {/* Info del curso */}
            {!isStay && (
                <div className="mb-4 text-sm space-y-1">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>{type.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span>{type.instructor}</span>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center mt-auto">
                <div className="text-primary font-bold">
                    {isStay ? `Desde ${type.basePrice}` : `${type.basePrice} por persona`}
                </div>
                <Link href={`/reservar?type=${type.id}`}>
                    <Button variant={isStay ? "default" : "secondary"}>
                        {isStay ? "Reservar" : "Inscribirse"}
                    </Button>
                </Link>
            </div>
        </div>
    </motion.div>
);

export default function ExperiencesSection() {
    const { farmStays, courses } = categorizeExperiences();

    return (
        <section className="py-20 bg-primary/5">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-10"
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

                <Tabs defaultValue="estancias" className="w-full mx-auto">
                    <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-10">
                        <TabsTrigger value="estancias">Estancias en la Granja</TabsTrigger>
                        <TabsTrigger value="cursos">Cursos y Talleres</TabsTrigger>
                    </TabsList>

                    <TabsContent value="estancias">
                        <div>
                            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Alójate en nuestra granja y disfruta de una experiencia única en contacto con la naturaleza.
                            </p>

                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                                variants={staggerContainer}
                            >
                                {farmStays.map((type) => (
                                    <ExperienceCard key={type.id} type={type} isStay={true} />
                                ))}
                            </motion.div>
                        </div>
                    </TabsContent>

                    <TabsContent value="cursos">
                        <div>
                            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Aprende con nuestros expertos y llévate conocimientos valiosos sobre agricultura sostenible y gastronomía.
                            </p>

                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                                variants={staggerContainer}
                            >
                                {courses.map((type) => (
                                    <ExperienceCard key={type.id} type={type} isStay={false} />
                                ))}
                            </motion.div>
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="text-center mt-12">
                    <Link href="/experiencias">
                        <Button variant="outline" size="lg" className="gap-2">
                            Ver todas las experiencias
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}