"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Camera, Expand } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface GalleryImage {
  url: string;
  title: string;
  description: string;
  aspectRatio?: "landscape" | "portrait" | "standard";
}

const animations = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }
}

const GalleryItem = ({ image, layout }: {
  image: GalleryImage,
  layout: {
    isWide: boolean;
    isTall: boolean;
  }
}) => (
  <Card className="overflow-hidden h-full">
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative group cursor-pointer">
          <img
            src={`${image.url}?auto=format&fit=crop&w=800&q=80`}
            alt={image.title}
            className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Expand className="w-8 h-8 text-white" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{image.title}</DialogTitle>
          <DialogDescription>{image.description}</DialogDescription>
        </DialogHeader>
        <div className="relative aspect-video">
          <img
            src={`${image.url}?auto=format&fit=crop&w=1600&q=90`}
            alt={image.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
    <div className="p-4">
      <h3 className="font-semibold mb-1">{image.title}</h3>
      <p className="text-sm text-muted-foreground">{image.description}</p>
    </div>
  </Card>
);

const galleryImages: GalleryImage[] = [
  {
    url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    title: "Paisaje de la Granja",
    description: "Vista panorámica de nuestra hermosa granja durante el atardecer",
    aspectRatio: "landscape"
  },
  {
    url: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5",
    title: "Espacio para Talleres",
    description: "Nuestra moderna área de talleres equipada para diversas actividades"
  },
  {
    url: "https://images.unsplash.com/photo-1530062845289-9109b2c9c868",
    title: "Alojamiento",
    description: "Habitaciones cómodas y acogedoras para su estancia"
  },
  {
    url: "https://images.unsplash.com/photo-1472653431158-6364773b2a56",
    title: "Vista del Jardín",
    description: "Nuestro jardín orgánico donde cultivamos productos frescos"
  },
  {
    url: "https://images.unsplash.com/photo-1591825729269-caeb344f6df2",
    title: "Espacio Culinario",
    description: "Cocina profesional para clases de cocina y eventos"
  },
  {
    url: "https://images.unsplash.com/photo-1510137600163-2729bc6e5956",
    title: "Espacio para Eventos",
    description: "Espacio versátil perfecto para reuniones",
    aspectRatio: "landscape"
  },
  {
    url: "https://images.unsplash.com/photo-1623341214825-9f4f963727da",
    title: "Animales de la Granja",
    description: "Conozca a nuestros amables habitantes de la granja"
  },
  {
    url: "https://images.unsplash.com/photo-1595925889916-5c6f829e019f",
    title: "Área de Comedor",
    description: "Espacio de comedor comunal con experiencia de la granja a la mesa"
  }
];


export default function Gallery() {
  // Función para determinar el diseño de cada elemento
  const getItemLayout = (index: number) => ({
    isWide: index % 3 === 0,
    isTall: index % 5 === 0
  });

  return (
    <div className="min-h-screen bg-background pt-24">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={animations.fadeIn}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Our Gallery</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take a visual journey through our farm&apos;s facilities, events, and natural beauty.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {galleryImages.map((image, index) => {
              const layout = getItemLayout(index);

              return (
                <motion.div
                  key={index}
                  initial="initial"
                  whileInView="animate"
                  variants={animations.fadeIn}
                  viewport={{ once: true }}
                  className={`
                    ${layout.isWide ? "lg:col-span-2" : ""} 
                    ${layout.isTall ? "md:row-span-2" : ""}
                  `}
                >
                  <GalleryItem image={image} layout={layout} />
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial="initial"
            whileInView="animate"
            variants={animations.fadeIn}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Button size="lg" className="gap-2">
              <Camera className="w-5 h-5" />
              View More Photos
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}