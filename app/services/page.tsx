"use client"

import { motion } from "framer-motion"
import { Home, Book, ChefHat, Users, Tent, Calendar, Compass, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export default function Services() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const services = [
    {
      icon: <Home className="h-6 w-6" />,
      title: "Estancia en la Granja",
      description: "Disfrute de la tranquilidad de la vida rural en nuestros cómodos alojamientos.",
      pricing: "Desde $150/noche",
      features: [
        "Habitaciones privadas",
        "Comidas de la granja a la mesa",
        "Senderos naturales",
        "Interacción con animales"
      ]
    },
    {
      icon: <Book className="h-6 w-6" />,
      title: "Talleres",
      description: "Aprenda prácticas agrícolas tradicionales y habilidades para una vida sostenible.",
      pricing: "Desde $75 por persona",
      features: [
        "Grupos pequeños",
        "Instructores expertos",
        "Experiencia práctica",
        "Materiales para llevar"
      ]
    },
    {
      icon: <ChefHat className="h-6 w-6" />,
      title: "Cursos Culinarios",
      description: "Domine la cocina de la granja a la mesa con nuestros chefs experimentados.",
      pricing: "Desde $120 por sesión",
      features: [
        "Obtención de ingredientes",
        "Técnicas de cocina",
        "Desarrollo de recetas",
        "Maridaje de vinos"
      ]
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Building",
      description: "Fortalezca los vínculos del equipo mediante actividades únicas basadas en la granja.",
      pricing: "Precios personalizados",
      features: [
        "Programas personalizados",
        "Actividades grupales",
        "Retos al aire libre",
        "Catering incluido"
      ]
    },
    {
      icon: <Tent className="h-6 w-6" />,
      title: "Alquiler de Espacios",
      description: "Celebre sus eventos especiales en nuestro pintoresco entorno de granja.",
      pricing: "Desde $2000 por día",
      features: [
        "Múltiples espacios",
        "Organización de eventos",
        "Opciones de catering",
        "Asistencia en la instalación"
      ]
    }
  ]
  

  return (
    <div className="min-h-screen bg-background pt-24">
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={fadeIn}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From peaceful stays to enriching workshops, we offer a variety of experiences to connect with nature and learn new skills.
            </p>
          </motion.div>

          <Tabs defaultValue="grid" className="w-full">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2 mx-auto mb-8">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>

            <TabsContent value="grid" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial="initial"
                    whileInView="animate"
                    variants={fadeIn}
                    viewport={{ once: true }}
                  >
                    <Card className="p-6 h-full flex flex-col">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                          {service.icon}
                        </div>
                        <h3 className="text-xl font-semibold">{service.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4 flex-grow">
                        {service.description}
                      </p>
                      <div className="space-y-4">
                        <p className="font-semibold text-lg">{service.pricing}</p>
                        <ul className="space-y-2">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full">Learn More</Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list">
              <div className="space-y-6">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial="initial"
                    whileInView="animate"
                    variants={fadeIn}
                    viewport={{ once: true }}
                  >
                    <Card className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            {service.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">{service.title}</h3>
                            <p className="text-muted-foreground">{service.description}</p>
                          </div>
                        </div>
                        <div className="md:ml-auto flex flex-col sm:flex-row items-center gap-4">
                          <p className="font-semibold">{service.pricing}</p>
                          <Button>Learn More</Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}