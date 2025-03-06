import { fadeIn } from "@/app/page";
import { motion } from "framer-motion";
import { Leaf, MapPin, Compass } from "lucide-react";

function FeaturesSection() {
    const features = [
        { icon: <Leaf className="h-8 w-8" />, title: "Natural Beauty", description: "Immerse yourself in the serene environment." },
        { icon: <MapPin className="h-8 w-8" />, title: "Prime Location", description: "Easily accessible yet secluded." },
        { icon: <Compass className="h-8 w-8" />, title: "Diverse Activities", description: "Workshops, leisure activities, and more." }
    ];
    return (
        <section className="py-24 bg-muted">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial="initial" whileInView="animate" variants={fadeIn} viewport={{ once: true }} className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Why Choose Sirius?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Discover a unique blend of nature, learning, and comfort.</p>
                </motion.div>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div key={index} initial="initial" whileInView="animate" variants={fadeIn} viewport={{ once: true }} className="bg-card p-8 rounded-lg text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;