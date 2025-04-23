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

function ReservationTypeSelect({ currentType, onTypeChange }) {
    const router = useRouter();

    // Determine if it's a course or stay based on selection
    const isCourse = currentType.includes("workshop") || currentType === "culinary";

    // Handle experience type change
    const handleTypeChange = useCallback((value) => {
        // Call the parent component's handler to update main state
        onTypeChange(value);

        // Update URL with new type
        router.push(`/reservar?type=${value}`, { scroll: false });
    }, [router, onTypeChange]);

    return (
        // Improved responsive container with better padding on different screens
        <div className="mb-6 sm:mb-8">
            <ExperienceTypeSelector
                options={experienceOptions}
                categories={experienceCategories}
                value={currentType}
                onChange={handleTypeChange}
                label="Selecciona tu tipo de experiencia"
                placeholder="Selecciona un tipo"
                helpText={helpTextByCategory}
                required={true}
            />

            {/* Additional content that changes based on selected type */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-muted/50 rounded-lg">
                <h3 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">
                    {isCourse
                        ? "Información del curso seleccionado"
                        : "Información de la estancia seleccionada"}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                    {experienceOptions.find(opt => opt.value === currentType)?.description ||
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

    // Determine if it's a course or a stay
    const isCourse = ["workshop", "culinary", "workshop-organic", "workshop-preserves"].includes(reservationType);

    // Find current reservation type
    const currentReservationType = reservationTypes.find(type => type.id === reservationType) || reservationTypes[0];

    // Get available activities for this type
    const availableActivities =
        isCourse
            ? [
                { id: "workshop-organic", name: "Taller de Agricultura - Cultivo de hortalizas orgánicas", priceMultiplier: 1 },
                { id: "culinary", name: "Curso Culinario - Del huerto a la mesa", priceMultiplier: 1.2 },
                { id: "workshop-preserves", name: "Taller de Conservas - Elaboración de conservas", priceMultiplier: 1.1 }
            ]
            : activitiesByType[reservationType] || [];

    // Use appropriate schema based on type
    const formSchema = isCourse ? courseFormSchema : stayFormSchema;

    // Initialize form
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

    // Change default values when type changes
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

    // Use useCallback to avoid recreating functions on each render
    const handleSubmit = useCallback(async (data) => {
        setIsSubmitting(true);

        // Here you would normally send data to your API
        console.log("Form data:", data);

        // Simulate submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSummaryData(data);
            setStep(2); // Move to confirmation step
        }, 1500);
    }, []);

    // Go back to form from summary
    const handleBackToForm = useCallback(() => {
        setStep(1);
    }, []);

    // Finish process
    const handleFinish = useCallback(() => {
        router.push("/reserva-confirmada");
    }, [router]);

    // Change reservation type - with useCallback
    const handleReservationTypeChange = useCallback((value) => {
        setReservationType(value);
        // Update type in URL
        router.push(`/reservar?type=${value}`, { scroll: false });
    }, [router]);

    // Memoize price calculation function
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
        // Improved responsive container with better padding on different screens
        <div className="container mx-auto py-6 sm:py-8 md:py-12 px-4 sm:px-6">
            {/* Better max-width for different screen sizes */}
            <div className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto">
                {/* Header with additional top margin to prevent navbar overlap */}
                <div className="mt-16 sm:mt-20 md:mt-24">
                    <FormHeader
                        isCourse={isCourse}
                        returnUrl="/experiencias"
                    />
                </div>

                {/* Reservation type selector - Pass state and handler from parent */}
                <ReservationTypeSelect
                    currentType={reservationType}
                    onTypeChange={handleReservationTypeChange}
                />

                {/* Change reservation type */}
                {step === 1 ? (
                    <Card className="shadow-sm sm:shadow">
                        <CardHeader className="pb-4 sm:pb-6">
                            <CardTitle className="text-xl sm:text-2xl">
                                {isCourse
                                    ? `Inscripción: ${currentReservationType.name}`
                                    : `Reserva: ${currentReservationType.name}`}
                            </CardTitle>
                            <CardDescription className="text-sm sm:text-base">
                                Por favor completa todos los campos requeridos
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 sm:space-y-6">
                                {/* Personal information - Reusable component */}
                                <PersonalInfoForm form={form} />

                                {/* Type-specific details */}
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

                                {/* Responsive button container, full width on mobile */}
                                <div className="flex justify-center sm:justify-end pt-2 sm:pt-4">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full sm:w-auto"
                                    >
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