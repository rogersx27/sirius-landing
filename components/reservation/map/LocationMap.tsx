"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone } from "lucide-react"

export default function LocationMap() {
    return (
        <Card className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Location</h3>
            </div>
            <p className="text-muted-foreground mb-4">
                123 Sirius Way, Star City, Universe
            </p>
            <div className="w-full h-64 bg-gray-100 rounded-md mb-4 overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.67890!2d-74.0060!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sus!4v1615!5m2!1sen!2sus"
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <div className="flex gap-2 mt-auto">
                <Button className="w-full" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                </Button>
                <Button className="w-full">
                    <MapPin className="h-4 w-4 mr-2" />
                    Directions
                </Button>
            </div>
        </Card>
    )
}