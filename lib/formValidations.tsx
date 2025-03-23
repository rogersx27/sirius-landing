"use client"

import { z } from "zod";

// Formulario schema básico
export const baseFormSchema = z.object({
    nombre: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres",
    }),
    apellido: z.string().min(2, {
        message: "El apellido debe tener al menos 2 caracteres",
    }),
    email: z.string().email({
        message: "Por favor, introduce un email válido",
    }),
    telefono: z.string().min(9, {
        message: "Por favor, introduce un número de teléfono válido",
    }),
});

// Schema específico para estancias
export const stayFormSchema = baseFormSchema.extend({
    fechaLlegada: z.date({
        required_error: "Por favor, selecciona una fecha de llegada",
    }),
    fechaSalida: z.date({
        required_error: "Por favor, selecciona una fecha de salida",
    }),
    numeroPersonas: z.string().min(1, {
        message: "Por favor, indica el número de personas",
    }),
    tipoActividad: z.string().min(1, {
        message: "Por favor, selecciona un tipo de habitación",
    }),
    serviciosAdicionales: z.array(z.string()).optional(),
    comentarios: z.string().optional(),
});

// Schema específico para cursos
export const courseFormSchema = baseFormSchema.extend({
    fechaCurso: z.date({
        required_error: "Por favor, selecciona una fecha para el curso",
    }),
    tipoActividad: z.string().min(1, {
        message: "Por favor, selecciona un curso",
    }),
    nivelExperiencia: z.enum(["principiante", "intermedio", "avanzado"], {
        required_error: "Por favor, selecciona tu nivel de experiencia",
    }),
    necesidadesEspeciales: z.string().optional(),
    dietaEspecial: z.boolean().default(false).optional(),
    tipoDieta: z.string().optional(),
});

export default {
    baseFormSchema,
    stayFormSchema,
    courseFormSchema
};