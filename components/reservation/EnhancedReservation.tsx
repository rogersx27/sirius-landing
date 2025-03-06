"use client"

import { motion } from "framer-motion"
import { ReservationProvider } from "./ReservationProvider"
import ReservationForm from "./form/ReservationForm"
import LocationMap from "./map/LocationMap"
import ConfirmationModal from "./ui/ConfirmationModal"
import { fadeIn } from "./constants/reservation-data"

export default function EnhancedReservation() {
    return (
        <ReservationProvider>
            <div className="min-h-screen bg-background pt-24">
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="initial"
                            whileInView="animate"
                            variants={fadeIn}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl font-bold mb-4">Contact & Reservations</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Ready to experience Sirius? Fill out the form below to make a reservation or inquiry.
                                Our team will get back to you shortly to confirm your booking.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <motion.div
                                initial="initial"
                                whileInView="animate"
                                variants={fadeIn}
                                viewport={{ once: true }}
                                className="lg:col-span-2"
                                layout
                            >
                                <ReservationForm />
                            </motion.div>

                            <motion.div
                                initial="initial"
                                whileInView="animate"
                                variants={fadeIn}
                                viewport={{ once: true }}
                            >
                                <LocationMap />
                            </motion.div>
                        </div>
                    </div>
                </section>

                <ConfirmationModal />
            </div>
        </ReservationProvider>
    )
}