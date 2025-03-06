import { fadeIn } from "@/app/page";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

function HeroSection() {
    return (
        <section id="home" className="relative h-screen">
            <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80" alt="Sirius Farm" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex flex-col justify-center h-full pt-16">
                    <motion.div initial="initial" animate="animate" variants={fadeIn} className="max-w-3xl">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">Welcome to Sirius</h1>
                        <p className="text-xl text-white/90 mb-8">Experience tranquility in our beautiful farm retreat.</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="text-lg">Book Your Stay</Button>
                            <Button size="lg" variant="outline" className="text-lg bg-white/10 backdrop-blur-sm">Explore Services</Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;