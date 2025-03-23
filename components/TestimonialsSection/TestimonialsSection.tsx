"use client"

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { fadeIn, staggerContainer } from "@/app/page";

const testimonials = [
    {
        name: "María González",
        text: "Una experiencia increíble. Los talleres de agricultura orgánica me enseñaron técnicas que ahora aplico en mi propio huerto urbano.",
        rating: 5,
        activity: "Taller de Jardinería Orgánica"
    },
    {
        name: "Juan Pérez",
        text: "Nuestra estancia familiar fue maravillosa. Los niños disfrutaron alimentando a los animales y recogiendo huevos frescos cada mañana.",
        rating: 5,
        activity: "Estancia en Granja"
    },
    {
        name: "Elena Martínez",
        text: "El curso culinario fue revelador. Aprender a cocinar con productos recién cosechados marcó una gran diferencia en el sabor.",
        rating: 4,
        activity: "Curso Culinario"
    }
];

const TestimonialCard = ({ testimonial }) => (
    <motion.div
        className="bg-white p-6 rounded-lg shadow-md"
        variants={fadeIn}
    >
        <div className="flex items-center gap-1 text-yellow-500 mb-4">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < testimonial.rating ? "currentColor" : "none"} />
            ))}
        </div>
        <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
        <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                {testimonial.name.charAt(0)}
            </div>
            <div className="ml-3">
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-xs text-muted-foreground">{testimonial.activity}</div>
            </div>
        </div>
    </motion.div>
);

export default function TestimonialsSection() {
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
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Lo Que Dicen Nuestros Visitantes</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Experiencias compartidas por personas que han disfrutado de nuestras actividades.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}