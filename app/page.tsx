"use client"

import { motion } from "framer-motion";
import { Compass, Leaf, MapPin, Calendar, Users, Coffee, Gift, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import FeaturesSection from "@/components/Features";
import HeroSection from "@/components/Hero";
import { reservationTypes } from "@/components/reservation/constants/reservation-data";

// Animaciones
export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section ya está incluido */}
      <HeroSection />

      {/* Features Section ya está incluido */}
      <FeaturesSection />

      {/* Nueva sección: Tipos de experiencias */}
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
              <motion.div
                key={type.id}
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
            ))}
          </motion.div>
        </div>
      </section>

      {/* Nueva sección: Galería de imágenes */}
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
              <motion.div
                key={num}
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
            ))}
          </motion.div>

          <div className="text-center mt-8">
            <Link href="/gallery">
              <Button variant="outline">Ver Galería Completa</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Nueva sección: Testimonios */}
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
              <motion.div
                key={index}
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
            ))}
          </motion.div>
        </div>
      </section>

      {/* Nueva sección: Mapa y ubicación */}
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

      {/* Sección CTA (Call to Action) */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para una experiencia inolvidable?</h2>
            <p className="text-white/80 mb-8 text-lg">
              Reserva ahora y disfruta de la naturaleza, actividades educativas y experiencias únicas en nuestra granja sostenible.
            </p>
            <Link href="/reservar">
              <Button size="lg" variant="secondary" className="text-primary font-bold">
                Hacer una Reserva
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

// Datos de ejemplo para la página
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