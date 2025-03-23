"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fadeIn, staggerContainer } from "@/app/page";

const GalleryImage = ({ num }) => (
    <motion.div
        className="relative aspect-square overflow-hidden rounded-lg"
        variants={fadeIn}
    >
        <Image
            src={`/images/gallery-${num}.jpg`}
            alt={`Galería imagen ${num}`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
        />
    </motion.div>
);

export default function GallerySection() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-12"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Galería de Nuestra Granja</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Imágenes de nuestras instalaciones, actividades y la belleza natural de nuestro entorno.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                        <GalleryImage key={num} num={num} />
                    ))}
                </motion.div>

                <div className="text-center mt-8">
                    <Link href="/gallery">
                        <Button variant="outline">Ver Galería Completa</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}