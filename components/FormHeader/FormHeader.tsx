"use client"

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function FormHeader({ isCourse, returnUrl }) {
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
                {isCourse ? "Inscripción a curso" : "Reserva de estancia"}
            </h1>
            <p className="text-muted-foreground">
                {isCourse
                    ? "Completa el formulario para inscribirte en uno de nuestros cursos o talleres."
                    : "Completa el formulario para reservar tu estancia en nuestra granja."}
            </p>
        </div>
    );
}