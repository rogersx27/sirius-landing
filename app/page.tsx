"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import HeroSection from "@/components/Hero";
import FeaturesSection from "@/components/Features";
import CTASection from "@/components/CTASection/CTASection";
import ExperiencesSection from "@/components/ExperiencesSection/ExperiencesSection";
import GallerySection from "@/components/GallerySection/GallerySection";
import LocationSection from "@/components/LocationSection/LocationSection";
import TestimonialsSection from "@/components/TestimonialsSection/TestimonialsSection";

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
      <HeroSection />

      <FeaturesSection />

      <ExperiencesSection />

      <GallerySection />

      <TestimonialsSection />

      <LocationSection />

      <CTASection />
    </div>
  );
}