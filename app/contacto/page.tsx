"use client"

import { Suspense } from "react"
import { motion } from "framer-motion"
import ContactForm from "./components/ContactForm"
import MapComponent from "./components/MapComponent"

// Simple loading component
const Loading = () => (
    <div className="w-full h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
)

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background pt-24">
            {/* Contact Form Section */}
            <ContactForm key="contacto"/>

            {/* Map Section */}
            <Suspense fallback={<Loading />}>
                <div className="mb-10">
                    <MapComponent />
                </div>
            </Suspense>

            {/* FAQ Section */}
            <FAQSection />
        </main>
    )
}

// FAQ Section Component
function FAQSection() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }

    const faqs = [
        {
            question: "¿Cuál es el horario de visitas a la granja?",
            answer: "Nuestra granja está abierta para visitas de lunes a viernes de 9:00 a 18:00, y los fines de semana de 10:00 a 16:00. Para visitas guiadas, te recomendamos reservar con antelación."
        },
        {
            question: "¿Cómo puedo hacer una reserva para alojamiento?",
            answer: "Puedes hacer reservas directamente a través de nuestra página web en la sección de 'Reservas', llamando a nuestro teléfono +34 91 123 4567, o enviando un email a reservas@granjaecologica.com."
        },
        {
            question: "¿Se permiten mascotas en las instalaciones?",
            answer: "Permitimos mascotas en algunas áreas designadas y alojamientos específicos. Por favor, consúltanos al hacer tu reserva para que podamos ofrecerte las opciones disponibles para ti y tu mascota."
        },
        {
            question: "¿Ofrecen opciones para personas con restricciones alimentarias?",
            answer: "Sí, ofrecemos opciones vegetarianas, veganas, sin gluten y otras dietas especiales. Por favor, infórmanos de tus necesidades alimentarias al hacer tu reserva o antes de tu visita."
        },
        {
            question: "¿Qué actividades están disponibles para los niños?",
            answer: "Tenemos una variedad de actividades diseñadas especialmente para niños, incluyendo talleres de alimentación de animales, huerto infantil, paseos en pony y juegos educativos sobre agricultura sostenible."
        },
        {
            question: "¿Puedo comprar productos de la granja directamente?",
            answer: "Sí, tenemos una tienda en la granja donde puedes comprar nuestros productos orgánicos frescos, conservas caseras, productos artesanales y recuerdos. También ofrecemos envíos a domicilio dentro de la península."
        }
    ]

    return (
        <section className="py-16 bg-primary/5">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-12"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <h2 className="text-3xl font-bold mb-4">Preguntas Frecuentes</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Encuentra respuestas a las preguntas más comunes sobre nuestra granja y servicios
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className="mb-6"
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            variants={fadeIn}
                            custom={(index + 1) * 0.1}
                        >
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                                <p className="text-muted-foreground">{faq.answer}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center mt-10"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <p className="text-muted-foreground mb-4">
                        ¿No encuentras lo que buscas? Contáctanos directamente y estaremos encantados de ayudarte.
                    </p>
                    <a
                        href="/contacto"
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        Ir al Formulario de Contacto
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    )
}