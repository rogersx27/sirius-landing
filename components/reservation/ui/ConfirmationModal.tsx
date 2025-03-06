"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useReservation } from "../hooks/useReservation"
import { fadeIn } from "../constants/reservation-data"

export default function ConfirmationModal() {
    const { showConfirmation, bookingReference, handleCloseConfirmation } = useReservation()

    if (!showConfirmation) return null

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className={cn(
                "fixed inset-0 z-50 flex items-center justify-center bg-primary/50",
                !showConfirmation && "hidden"
            )}
        >
            <motion.div
                initial="initial"
                animate="animate"
                variants={fadeIn}
                className="bg-white rounded-lg p-8 max-w-md w-full"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Reservation Confirmation</h3>
                    <Button variant="outline" onClick={handleCloseConfirmation}>
                        Close
                    </Button>
                </div>
                <p className="text-muted-foreground mb-4">
                    Your reservation has been confirmed. Your booking reference is{" "}
                    <span className="font-semibold">{bookingReference}</span>. We will send you a confirmation email shortly.
                </p>
                <Button className="w-full">View Reservation</Button>
            </motion.div>
        </motion.div>
    )
}