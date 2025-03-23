"use client"

import { motion } from "framer-motion";
import { MapPin, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeIn } from "@/app/page";

export default function LocationSection() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeIn}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestra Ubicación</h2>
                        <p className="text-muted-foreground mb-6">
                            Estamos ubicados en un entorno natural privilegiado, a solo 30 minutos de la ciudad y con fácil acceso por carretera.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-3">
                                <MapPin className="text-primary mt-1" />
                                <div>
                                    <h4 className="font-semibold">Dirección</h4>
                                    <p className="text-muted-foreground">Carretera Rural 123, Villaverde, España 28021</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Compass className="text-primary mt-1" />
                                <div>
                                    <h4 className="font-semibold">Cómo llegar</h4>
                                    <p className="text-muted-foreground">Desde la autopista A-42, toma la salida 12 y sigue las indicaciones hacia Villaverde. A 3 km encontrarás nuestro camino de entrada señalizado.</p>
                                </div>
                            </div>
                        </div>

                        <Button>
                            <MapPin className="mr-2 h-4 w-4" /> Ver en Google Maps
                        </Button>
                    </motion.div>

                    <motion.div
                        className="rounded-lg overflow-hidden shadow-md"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeIn}
                    >
                        <div className="relative aspect-video">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.67890!2d-74.0060!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sus!4v1615!5m2!1sen!2sus"
                                className="w-full h-full border-0 object-cover"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}