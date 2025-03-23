"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fadeIn } from "@/app/page";

export default function CTASection() {
    return (
        <section className="py-20 bg-primary/90 dark:bg-primary/80 text-white">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para una experiencia inolvidable?</h2>
                    <p className="text-white/90 dark:text-white/80 mb-8 text-lg">
                        Reserva ahora y disfruta de la naturaleza, actividades educativas y experiencias únicas en nuestra granja sostenible.
                    </p>
                    <Link href="/reservar">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="text-primary dark:text-primary font-bold hover:bg-secondary/90 dark:hover:bg-secondary/90 transition-colors"
                        >
                            Hacer una Reserva
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}