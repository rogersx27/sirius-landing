"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Home, Book, ChefHat, Users, Building, Calendar, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  categorizeExperiences,
  getDescriptionForType,
  experienceCategories,
  additionalServices
} from "@/constants/reservation-data"

// Icon mapping for different experience types
const iconMap = {
  "stay": <Home className="h-5 w-5" />,
  "workshop-organic": <Book className="h-5 w-5" />,
  "culinary": <ChefHat className="h-5 w-5" />,
  "team": <Users className="h-5 w-5" />,
  "venue": <Building className="h-5 w-5" />,
  "workshop-preserves": <Book className="h-5 w-5" />
};

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Format price with currency
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(price);
};

// Feature Item component
const FeatureItem = ({ text }) => (
  <li className="flex items-center gap-2 text-sm text-muted-foreground">
    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
    {text}
  </li>
);

// Experience Card Component
const ExperienceCard = ({ experience, isStay }) => {
  // Get description for this type
  const description = getDescriptionForType(experience.id);

  return (
    <motion.div variants={fadeIn}>
      <Card className="h-full overflow-hidden flex flex-col">
        <div className="h-48 relative">
          <Image
            src={`/images/${experience.id}.jpg`}
            alt={experience.name}
            fill
            className="object-cover"
          />
          {!isStay && (
            <Badge className="absolute top-3 right-3 bg-amber-500">
              Curso
            </Badge>
          )}
        </div>
        <CardContent className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {iconMap[experience.id] || <Calendar className="h-5 w-5" />}
            </div>
            <h3 className="text-lg font-semibold">{experience.name}</h3>
          </div>

          <div className="mb-3 text-sm bg-primary/5 px-3 py-1.5 rounded-md inline-block">
            {experience.example}
          </div>

          <p className="text-muted-foreground mb-4 flex-grow">
            {description}
          </p>

          {isStay && experience.features && (
            <ul className="space-y-2 mb-4">
              {experience.features.map((feature, idx) => (
                <FeatureItem key={idx} text={feature} />
              ))}
            </ul>
          )}

          {!isStay && (
            <div className="mb-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{experience.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>{experience.instructor}</span>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-auto">
            <p className="font-semibold text-primary">
              {isStay
                ? `Desde ${formatPrice(experience.basePrice)}`
                : `${formatPrice(experience.basePrice)} por persona`
              }
            </p>
            <Link href={`/experiencia?id=${experience.id}`}>
              <Button variant={isStay ? "default" : "secondary"} size="sm">
                {isStay ? "Ver detalles" : "Ver curso"}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Grid view for experiences
const GridView = ({ experiences, isStay }) => (
  <motion.div
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    variants={staggerContainer}
    initial="initial"
    animate="animate"
  >
    {experiences.map((experience) => (
      <ExperienceCard
        key={experience.id}
        experience={experience}
        isStay={isStay}
      />
    ))}
  </motion.div>
);

// List view for experiences
const ListView = ({ experiences, isStay }) => (
  <motion.div
    className="space-y-6"
    variants={staggerContainer}
    initial="initial"
    animate="animate"
  >
    {experiences.map((experience) => (
      <motion.div key={experience.id} variants={fadeIn}>
        <Card className="overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/4 h-48 sm:h-auto relative">
              <Image
                src={`/images/${experience.id}.jpg`}
                alt={experience.name}
                fill
                className="object-cover"
              />
              {!isStay && (
                <Badge className="absolute top-3 right-3 bg-amber-500">
                  Curso
                </Badge>
              )}
            </div>
            <CardContent className="p-6 sm:w-3/4">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {iconMap[experience.id] || <Calendar className="h-5 w-5" />}
                    </div>
                    <h3 className="text-lg font-semibold">{experience.name}</h3>
                  </div>

                  <div className="mb-3 text-sm bg-primary/5 px-3 py-1.5 rounded-md inline-block">
                    {experience.example}
                  </div>

                  <p className="text-muted-foreground mb-3">
                    {getDescriptionForType(experience.id)}
                  </p>

                  {isStay && experience.features && (
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
                      {experience.features.map((feature, idx) => (
                        <span key={idx} className="text-sm flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                            <path d="M20 6L9 17l-5-5"></path>
                          </svg>
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  {!isStay && (
                    <div className="flex gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span>{experience.instructor}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="md:ml-auto mt-4 md:mt-0 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <p className="font-semibold text-primary">
                    {isStay
                      ? `Desde ${formatPrice(experience.basePrice)}`
                      : `${formatPrice(experience.basePrice)} por persona`
                    }
                  </p>
                  <Link href={`/experiencia?id=${experience.id}`}>
                    <Button variant={isStay ? "default" : "secondary"} size="sm">
                      {isStay ? "Ver detalles" : "Ver curso"}
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    ))}
  </motion.div>
);

// Additional Services Section
const AdditionalServicesSection = () => (
  <motion.section
    className="mt-24 bg-primary/5 py-16 px-4"
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    variants={fadeIn}
  >
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-center">Servicios Adicionales</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {additionalServices.map((service) => (
          <Card key={service.id} className="bg-white">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
              <p className="text-primary font-bold mb-4">{formatPrice(service.price)}</p>
              <p className="text-muted-foreground text-sm">
                {service.id === 'transport' && 'Servicio de transporte desde y hacia la estación de tren o aeropuerto más cercano.'}
                {service.id === 'guided' && 'Recorrido guiado por todas las instalaciones de la granja con explicaciones detalladas.'}
                {service.id === 'meal' && 'Comidas gourmet preparadas con productos frescos de la granja.'}
                {service.id === 'spa' && 'Tratamientos de spa naturales para relajarte durante tu estancia.'}
                {service.id === 'photography' && 'Sesión fotográfica profesional para capturar tus momentos especiales.'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </motion.section>
);

// Main Services Page Component
export default function ServicesPage() {
  const [category, setCategory] = useState("all");
  const { farmStays, courses } = categorizeExperiences();

  // Filter experiences based on selected category
  const getFilteredExperiences = () => {
    if (category === "all") {
      return [...farmStays, ...courses];
    } else if (category === "stay") {
      return farmStays;
    } else if (category === "course") {
      return courses;
    }
    return [];
  };

  const filteredExperiences = getFilteredExperiences();
  const isStayCategory = category !== "course";

  return (
    <div className="min-h-screen bg-background pt-24">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={fadeIn}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Nuestras Experiencias</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubre todas las actividades y experiencias que puedes disfrutar en nuestra granja sostenible,
              desde estancias tranquilas hasta cursos prácticos.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filtrar por:</span>
              <Select
                defaultValue="all"
                onValueChange={setCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Todas las experiencias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las experiencias</SelectItem>
                  <SelectItem value="stay">Estancias en la Granja</SelectItem>
                  <SelectItem value="course">Cursos y Talleres</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredExperiences.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No se encontraron experiencias en esta categoría.</p>
            </div>
          ) : (
            <Tabs defaultValue="grid">
              <div className="flex justify-end mb-6">
                <TabsList>
                  <TabsTrigger value="grid">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                    <span className="ml-2 hidden sm:inline">Cuadrícula</span>
                  </TabsTrigger>
                  <TabsTrigger value="list">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                    <span className="ml-2 hidden sm:inline">Lista</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="grid">
                <GridView
                  experiences={filteredExperiences}
                  isStay={isStayCategory}
                />
              </TabsContent>

              <TabsContent value="list">
                <ListView
                  experiences={filteredExperiences}
                  isStay={isStayCategory}
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>

      <AdditionalServicesSection />
    </div>
  )
}