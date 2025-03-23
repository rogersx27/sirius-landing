"use client"

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import CourseDetailsForm from "@/components/CourseDetailsForm/CourseDetailsForm";
import FormHeader from "@/components/FormHeader/FormHeader";
import PersonalInfoForm from "@/components/PersonalInfoForm/PersonalInfoForm";
import ReservationSummary from "@/components/ReservationSummary/ReservationSummary";
import StayDetailsForm from "@/components/StayDetailsForm/StayDetailsForm";
import { calculateReservationPrice } from "@/lib/calculateReservationPrice";
import { courseFormSchema, stayFormSchema } from "@/lib/formValidations";
import ExperienceTypeSelector from "@/components/ExperienceTypeSelector";
import { experienceOptions, experienceCategories, helpTextByCategory, reservationTypes, activitiesByType, additionalServices } from "@/constants/reservation-data";

function ReservationTypeSelect() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const typeParam = searchParams.get("type") || "stay";

    const [selectedType, setSelectedType] = useState(typeParam);

    // Determinar si es curso o estancia basado en la selección
    const isCourse = selectedType.includes("workshop") || selectedType === "culinary";

    // Manejar cambio de tipo de experiencia
    const handleTypeChange = useCallback((value) => {
        setSelectedType(value);
        // Actualizar URL con el nuevo tipo
        router.push(`/reservar?type=${value}`, { scroll: false });
    }, [router]);

    return (
        <div className="mb-8">
            <ExperienceTypeSelector
                options={experienceOptions}
                categories={experienceCategories}
                value={selectedType}
                onChange={handleTypeChange}
                label="Selecciona tu tipo de experiencia"
                placeholder="Selecciona un tipo"
                helpText={helpTextByCategory}
                required={true}
            />

            {/* Contenido adicional que cambia según el tipo seleccionado */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h3 className="text-lg font-medium mb-2">
                    {isCourse
                        ? "Información del curso seleccionado"
                        : "Información de la estancia seleccionada"}
                </h3>
                <p className="text-muted-foreground">
                    {experienceOptions.find(opt => opt.value === selectedType)?.description ||
                        "Selecciona una opción para ver más detalles."}
                </p>
            </div>
        </div>
    );
}

export default function ReservationForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const typeParam = searchParams.get("type") || "stay";

    const [reservationType, setReservationType] = useState(typeParam);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);
    const [summaryData, setSummaryData] = useState(null);

    // Determinar si es un curso o una estancia
    const isCourse = ["workshop", "culinary", "workshop-organic", "workshop-preserves"].includes(reservationType);

    // Encontrar el tipo de reserva actual
    const currentReservationType = reservationTypes.find(type => type.id === reservationType) || reservationTypes[0];

    // Obtener las actividades disponibles para este tipo
    const availableActivities =
        isCourse
            ? [
                { id: "workshop-organic", name: "Taller de Agricultura - Cultivo de hortalizas orgánicas", priceMultiplier: 1 },
                { id: "culinary", name: "Curso Culinario - Del huerto a la mesa", priceMultiplier: 1.2 },
                { id: "workshop-preserves", name: "Taller de Conservas - Elaboración de conservas", priceMultiplier: 1.1 }
            ]
            : activitiesByType[reservationType] || [];

    // Usar el esquema adecuado según el tipo
    const formSchema = isCourse ? courseFormSchema : stayFormSchema;

    // Inicializar el formulario
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: isCourse
            ? {
                nombre: "",
                apellido: "",
                email: "",
                telefono: "",
                nivelExperiencia: "principiante",
                dietaEspecial: false,
                tipoDieta: "",
                necesidadesEspeciales: "",
            }
            : {
                nombre: "",
                apellido: "",
                email: "",
                telefono: "",
                numeroPersonas: "1",
                serviciosAdicionales: [],
                comentarios: "",
            }
    });

    // Cambiar los valores predeterminados cuando cambia el tipo
    useEffect(() => {
        if (isCourse) {
            form.reset({
                nombre: form.getValues("nombre") || "",
                apellido: form.getValues("apellido") || "",
                email: form.getValues("email") || "",
                telefono: form.getValues("telefono") || "",
                nivelExperiencia: "principiante",
                dietaEspecial: false,
                tipoDieta: "",
                necesidadesEspeciales: "",
            });
        } else {
            form.reset({
                nombre: form.getValues("nombre") || "",
                apellido: form.getValues("apellido") || "",
                email: form.getValues("email") || "",
                telefono: form.getValues("telefono") || "",
                numeroPersonas: "1",
                serviciosAdicionales: [],
                comentarios: "",
            });
        }
    }, [reservationType, isCourse, form]);

    // Usar useCallback para evitar recrear funciones en cada render
    const handleSubmit = useCallback(async (data) => {
        setIsSubmitting(true);

        // Aquí normalmente enviarías los datos a tu API
        console.log("Datos del formulario:", data);

        // Simulamos un envío
        setTimeout(() => {
            setIsSubmitting(false);
            setSummaryData(data);
            setStep(2); // Avanzar al paso de confirmación
        }, 1500);
    }, []);

    // Volver al formulario desde el resumen
    const handleBackToForm = useCallback(() => {
        setStep(1);
    }, []);

    // Finalizar el proceso
    const handleFinish = useCallback(() => {
        router.push("/reserva-confirmada");
    }, [router]);

    // Cambiar el tipo de reserva - con useCallback
    const handleReservationTypeChange = useCallback((value) => {
        setReservationType(value);
        // Actualizamos el tipo en la URL
        router.push(`/reservar?type=${value}`, { scroll: false });
    }, [router]);

    // Memoizar la función de cálculo de precio
    const priceCalculator = useCallback((data) => {
        return calculateReservationPrice(
            data,
            isCourse,
            currentReservationType,
            availableActivities,
            additionalServices
        );
    }, [isCourse, currentReservationType, availableActivities, additionalServices]);

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Cabecera */}
                <FormHeader
                    isCourse={isCourse}
                    returnUrl="/experiencias"
                />

                {/* Selector de tipo de reserva */}
                <ReservationTypeSelect />

                {/* Cambiar el tipo de reserva */}
                {step === 1 ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {isCourse
                                    ? `Inscripción: ${currentReservationType.name}`
                                    : `Reserva: ${currentReservationType.name}`}
                            </CardTitle>
                            <CardDescription>
                                Por favor completa todos los campos requeridos
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                                {/* Información personal - Componente reutilizable */}
                                <PersonalInfoForm form={form} />

                                {/* Detalles específicos según tipo */}
                                {isCourse ? (
                                    <CourseDetailsForm
                                        form={form}
                                        availableActivities={availableActivities}
                                    />
                                ) : (
                                    <StayDetailsForm
                                        form={form}
                                        availableActivities={availableActivities}
                                        additionalServices={additionalServices}
                                    />
                                )}

                                <div className="flex justify-end">
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Procesando..." : "Continuar"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                ) : (
                    <ReservationSummary
                        summaryData={summaryData}
                        isCourse={isCourse}
                        currentReservationType={currentReservationType}
                        availableActivities={availableActivities}
                        additionalServices={additionalServices}
                        calculatePrice={priceCalculator}
                        onBack={handleBackToForm}
                        onFinish={handleFinish}
                        isSubmitting={isSubmitting}
                    />
                )}
            </div>
        </div>
    );
}