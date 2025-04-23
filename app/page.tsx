"use client"

import { motion, useInView } from "framer-motion";
import { useRef, memo } from "react";
import dynamic from "next/dynamic";

const HeroSection = dynamic(() => import("@/components/Hero"), {
  loading: () => <div className="min-h-[50vh] flex items-center justify-center">Cargando...</div>,
  ssr: true
});

const FeaturesSection = dynamic(() => import("@/components/Features"), {
  loading: () => <div className="min-h-[40vh] flex items-center justify-center">Cargando...</div>,
  ssr: true,
});

const CTASection = dynamic(() => import("@/components/CTASection/CTASection"), {
  loading: () => <div className="min-h-[30vh] flex items-center justify-center">Cargando...</div>,
  ssr: false // Non-critical component can be loaded client-side only
});

const ExperiencesSection = dynamic(() => import("@/components/ExperiencesSection/ExperiencesSection"), {
  loading: () => <div className="min-h-[40vh] flex items-center justify-center">Cargando...</div>,
  ssr: true
});

const GallerySection = dynamic(() => import("@/components/GallerySection/GallerySection"), {
  loading: () => <div className="min-h-[50vh] flex items-center justify-center">Cargando...</div>,
  ssr: false // Images can be loaded client-side to improve initial load time
});

const LocationSection = dynamic(() => import("@/components/LocationSection/LocationSection"), {
  loading: () => <div className="min-h-[40vh] flex items-center justify-center">Cargando...</div>,
  ssr: false // Map data can be loaded client-side
});

const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection/TestimonialsSection"), {
  loading: () => <div className="min-h-[40vh] flex items-center justify-center">Cargando...</div>,
  ssr: true
});

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

const SectionWrapper = memo(({ children, id, priority = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.2, // Reduced threshold for better performance
  });

  // Optimize animation properties
  const variants = {
    hidden: { opacity: 0.4, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      variants={variants}
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        opacity: { duration: 0.4 },
        y: { duration: 0.6 }
      }}
      className={`scroll-mt-20 relative ${priority ? "z-10" : ""}`}
      layoutId={id}
    >
      {children}
    </motion.section>
  );
});

SectionWrapper.displayName = "SectionWrapper";

// Use React.memo to prevent unnecessary re-renders of the entire page
const Home = () => {
  return (
    <div className="min-h-screen bg-background will-change-transform">
      <SectionWrapper id="hero" priority={true}>
        <HeroSection />
      </SectionWrapper>

      <SectionWrapper id="features">
        <FeaturesSection />
      </SectionWrapper>

      <SectionWrapper id="experiences">
        <ExperiencesSection />
      </SectionWrapper>

      <SectionWrapper id="gallery">
        <GallerySection />
      </SectionWrapper>

      <SectionWrapper id="testimonials">
        <TestimonialsSection />
      </SectionWrapper>

      <SectionWrapper id="location">
        <LocationSection />
      </SectionWrapper>

      <SectionWrapper id="cta">
        <CTASection />
      </SectionWrapper>
    </div>
  );
};

export default memo(Home);