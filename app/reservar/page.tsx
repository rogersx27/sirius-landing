"use client"

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ChevronLeft } from "lucide-react";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import {
    reservationTypes,
    activitiesByType,
    availableDates,
    additionalServices
} from "@/components/reservation/constants/reservation-data";
import { zodResolver } from "@hookform/resolvers/zod";

// Formulario schema básico
const baseFormSchema = z.object({
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
const stayFormSchema = baseFormSchema.extend({
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
const courseFormSchema = baseFormSchema.extend({
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

    // Manejar el envío del formulario
    const onSubmit = async (data) => {
        setIsSubmitting(true);

        // Aquí normalmente enviarías los datos a tu API
        console.log("Datos del formulario:", data);

        // Simulamos un envío
        setTimeout(() => {
            setIsSubmitting(false);
            setSummaryData(data);
            setStep(2); // Avanzar al paso de confirmación
        }, 1500);
    };

    // Función para calcular el precio total (simplificada)
    const calculatePrice = (data) => {
        let basePrice = currentReservationType.basePrice;

        // Multiplicador según actividad seleccionada
        const activity = availableActivities.find(act => act.id === data.tipoActividad);
        const multiplier = activity ? activity.priceMultiplier : 1;

        // Cálculo básico diferente según tipo
        if (isCourse) {
            // Para cursos, precio base * multiplicador
            return basePrice * multiplier;
        } else {
            // Para estancias, considerar número de personas y días
            const numPersonas = parseInt(data.numeroPersonas || 1);
            let numDias = 1;

            if (data.fechaLlegada && data.fechaSalida) {
                const llegada = new Date(data.fechaLlegada);
                const salida = new Date(data.fechaSalida);
                const diffTime = Math.abs(salida - llegada);
                numDias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                numDias = numDias || 1; // Mínimo 1 día
            }

            let total = basePrice * multiplier * numDias;

            // Añadir servicios adicionales
            if (data.serviciosAdicionales && data.serviciosAdicionales.length > 0) {
                data.serviciosAdicionales.forEach(servicioId => {
                    const servicio = additionalServices.find(s => s.id === servicioId);
                    if (servicio) {
                        total += servicio.price;
                    }
                });
            }

            return total;
        }
    };

    // Volver al formulario desde el resumen
    const handleBackToForm = () => {
        setStep(1);
    };

    // Finalizar el proceso
    const handleFinish = () => {
        router.push("/reserva-confirmada");
    };

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Cabecera */}
                <div className="mb-8">
                    <Link href="/experiencias" className="flex items-center text-muted-foreground hover:text-primary mb-4">
                        <ChevronLeft size={16} className="mr-1" />
                        Volver a experiencias
                    </Link>

                    <h1 className="text-3xl font-bold mb-2">
                        {isCourse ? "Inscripción a curso" : "Reserva de estancia"}
                    </h1>
                    <p className="text-muted-foreground">
                        {isCourse
                            ? "Completa el formulario para inscribirte en uno de nuestros cursos o talleres."
                            : "Completa el formulario para reservar tu estancia en nuestra granja."}
                    </p>
                </div>

                {/* Selector de tipo de reserva */}
                <div className="mb-8">
                    <FormLabel className="block mb-2">Tipo de experiencia</FormLabel>
                    <Select
                        value={reservationType}
                        onValueChange={(value) => {
                            setReservationType(value);
                            // Actualizamos el tipo en la URL
                            router.push(`/reservar?type=${value}`, { scroll: false });
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona un tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="stay">Estancia en Granja</SelectItem>
                            <SelectItem value="venue">Alquiler de Local</SelectItem>
                            <SelectItem value="team">Formación de Equipos</SelectItem>
                            <SelectItem value="workshop-organic">Taller de Agricultura</SelectItem>
                            <SelectItem value="culinary">Curso Culinario</SelectItem>
                            <SelectItem value="workshop-preserves">Taller de Conservas</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

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
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Sección de datos personales */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Datos personales</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="nombre"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Nombre</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Introduce tu nombre" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="apellido"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Apellido</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Introduce tu apellido" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input type="email" placeholder="tu@email.com" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="telefono"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Teléfono</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="+34 600 000 000" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Sección de detalles de reserva - diferente según tipo */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Detalles de la {isCourse ? "inscripción" : "reserva"}</h3>

                                        {/* Campos específicos para cursos */}
                                        {isCourse ? (
                                            <>
                                                <FormField
                                                    control={form.control}
                                                    name="tipoActividad"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Curso o taller</FormLabel>
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Selecciona un curso" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {availableActivities.map((activity) => (
                                                                        <SelectItem key={activity.id} value={activity.id}>
                                                                            {activity.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="fechaCurso"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-col">
                                                            <FormLabel>Fecha del curso</FormLabel>
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <FormControl>
                                                                        <Button
                                                                            variant={"outline"}
                                                                            className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                                                                        >
                                                                            {field.value ? (
                                                                                format(field.value, "PPP", { locale: es })
                                                                            ) : (
                                                                                <span>Selecciona una fecha</span>
                                                                            )}
                                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                        </Button>
                                                                    </FormControl>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto p-0" align="start">
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={field.value}
                                                                        onSelect={field.onChange}
                                                                        disabled={(date) => {
                                                                            // Deshabilitar fechas pasadas
                                                                            return date < new Date();
                                                                        }}
                                                                        initialFocus
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="nivelExperiencia"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Nivel de experiencia</FormLabel>
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Selecciona tu nivel" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="principiante">Principiante</SelectItem>
                                                                    <SelectItem value="intermedio">Intermedio</SelectItem>
                                                                    <SelectItem value="avanzado">Avanzado</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <FormDescription>
                                                                Esto nos ayudará a adaptar el curso a tu nivel
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="dietaEspecial"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel>
                                                                    Tengo necesidades dietéticas especiales
                                                                </FormLabel>
                                                                <FormDescription>
                                                                    Marque esta casilla si tiene alguna restricción o preferencia alimentaria
                                                                </FormDescription>
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />

                                                {form.watch("dietaEspecial") && (
                                                    <FormField
                                                        control={form.control}
                                                        name="tipoDieta"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Especifica tu dieta</FormLabel>
                                                                <FormControl>
                                                                    <Textarea
                                                                        placeholder="Por ejemplo: vegetariano, vegano, sin gluten, alergias..."
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                )}

                                                <FormField
                                                    control={form.control}
                                                    name="necesidadesEspeciales"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Necesidades especiales</FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    placeholder="Indícanos si tienes alguna necesidad especial para el curso"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                {/* Campos específicos para estancias */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="fechaLlegada"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col">
                                                                <FormLabel>Fecha de llegada</FormLabel>
                                                                <Popover>
                                                                    <PopoverTrigger asChild>
                                                                        <FormControl>
                                                                            <Button
                                                                                variant={"outline"}
                                                                                className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                                                                            >
                                                                                {field.value ? (
                                                                                    format(field.value, "PPP", { locale: es })
                                                                                ) : (
                                                                                    <span>Selecciona una fecha</span>
                                                                                )}
                                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                            </Button>
                                                                        </FormControl>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className="w-auto p-0" align="start">
                                                                        <Calendar
                                                                            mode="single"
                                                                            selected={field.value}
                                                                            onSelect={field.onChange}
                                                                            disabled={(date) => {
                                                                                // Deshabilitar fechas pasadas y fechas no disponibles
                                                                                return date < new Date();
                                                                            }}
                                                                            initialFocus
                                                                        />
                                                                    </PopoverContent>
                                                                </Popover>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="fechaSalida"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col">
                                                                <FormLabel>Fecha de salida</FormLabel>
                                                                <Popover>
                                                                    <PopoverTrigger asChild>
                                                                        <FormControl>
                                                                            <Button
                                                                                variant={"outline"}
                                                                                className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                                                                            >
                                                                                {field.value ? (
                                                                                    format(field.value, "PPP", { locale: es })
                                                                                ) : (
                                                                                    <span>Selecciona una fecha</span>
                                                                                )}
                                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                            </Button>
                                                                        </FormControl>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className="w-auto p-0" align="start">
                                                                        <Calendar
                                                                            mode="single"
                                                                            selected={field.value}
                                                                            onSelect={field.onChange}
                                                                            disabled={(date) => {
                                                                                // Deshabilitar fechas anteriores a la llegada
                                                                                const llegada = form.getValues("fechaLlegada");
                                                                                return date < new Date() || (llegada && date <= llegada);
                                                                            }}
                                                                            initialFocus
                                                                        />
                                                                    </PopoverContent>
                                                                </Popover>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="tipoActividad"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Tipo de alojamiento</FormLabel>
                                                                <Select
                                                                    onValueChange={field.onChange}
                                                                    defaultValue={field.value}
                                                                >
                                                                    <FormControl>
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Selecciona tipo" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        {availableActivities.map((activity) => (
                                                                            <SelectItem key={activity.id} value={activity.id}>
                                                                                {activity.name}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="numeroPersonas"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Número de personas</FormLabel>
                                                                <Select
                                                                    onValueChange={field.onChange}
                                                                    defaultValue={field.value}
                                                                >
                                                                    <FormControl>
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Selecciona" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        {[1, 2, 3, 4, 5, 6].map((num) => (
                                                                            <SelectItem key={num} value={num.toString()}>
                                                                                {num} {num === 1 ? "persona" : "personas"}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <FormField
                                                    control={form.control}
                                                    name="serviciosAdicionales"
                                                    render={() => (
                                                        <FormItem>
                                                            <div className="mb-4">
                                                                <FormLabel>Servicios adicionales</FormLabel>
                                                                <FormDescription>
                                                                    Selecciona los servicios que deseas añadir a tu reserva
                                                                </FormDescription>
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                {additionalServices.map((servicio) => (
                                                                    <FormField
                                                                        key={servicio.id}
                                                                        control={form.control}
                                                                        name="serviciosAdicionales"
                                                                        render={({ field }) => {
                                                                            return (
                                                                                <FormItem
                                                                                    key={servicio.id}
                                                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                                                >
                                                                                    <FormControl>
                                                                                        <Checkbox
                                                                                            checked={field.value?.includes(servicio.id)}
                                                                                            onCheckedChange={(checked) => {
                                                                                                const currentValues = field.value || [];
                                                                                                return checked
                                                                                                    ? field.onChange([...currentValues, servicio.id])
                                                                                                    : field.onChange(
                                                                                                        currentValues.filter(
                                                                                                            (value) => value !== servicio.id
                                                                                                        )
                                                                                                    );
                                                                                            }}
                                                                                        />
                                                                                    </FormControl>
                                                                                    <div className="space-y-1 leading-none">
                                                                                        <FormLabel>
                                                                                            {servicio.name} <span className="text-muted-foreground text-sm">(+{servicio.price}€)</span>
                                                                                        </FormLabel>
                                                                                    </div>
                                                                                </FormItem>
                                                                            );
                                                                        }}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="comentarios"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Comentarios adicionales</FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    placeholder="Indícanos cualquier necesidad o preferencia adicional"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </>
                                        )}
                                    </div>

                                    <div className="flex justify-end">
                                        <Button type="submit" disabled={isSubmitting}>
                                            {isSubmitting ? "Procesando..." : "Continuar"}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                ) : (
                    // Paso 2: Resumen y confirmación
                    <Card>
                        <CardHeader>
                            <CardTitle>Resumen de tu {isCourse ? "inscripción" : "reserva"}</CardTitle>
                            <CardDescription>
                                Por favor verifica los detalles antes de confirmar
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {summaryData && (
                                <>
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Datos personales</h3>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div className="text-muted-foreground">Nombre completo:</div>
                                            <div>{summaryData.nombre} {summaryData.apellido}</div>

                                            <div className="text-muted-foreground">Email:</div>
                                            <div>{summaryData.email}</div>

                                            <div className="text-muted-foreground">Teléfono:</div>
                                            <div>{summaryData.telefono}</div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Detalles de la {isCourse ? "inscripción" : "reserva"}</h3>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div className="text-muted-foreground">Tipo:</div>
                                            <div>{currentReservationType.name}</div>

                                            {isCourse ? (
                                                <>
                                                    <div className="text-muted-foreground">Curso:</div>
                                                    <div>
                                                        {availableActivities.find(a => a.id === summaryData.tipoActividad)?.name || summaryData.tipoActividad}
                                                    </div>

                                                    <div className="text-muted-foreground">Fecha del curso:</div>
                                                    <div>
                                                        {summaryData.fechaCurso ? format(new Date(summaryData.fechaCurso), "PPP", { locale: es }) : "No seleccionada"}
                                                    </div>

                                                    <div className="text-muted-foreground">Nivel de experiencia:</div>
                                                    <div className="capitalize">
                                                        {summaryData.nivelExperiencia || "No especificado"}
                                                    </div>

                                                    {summaryData.dietaEspecial && (
                                                        <>
                                                            <div className="text-muted-foreground">Dieta especial:</div>
                                                            <div>{summaryData.tipoDieta || "Sí (no especificada)"}</div>
                                                        </>
                                                    )}

                                                    {summaryData.necesidadesEspeciales && (
                                                        <>
                                                            <div className="text-muted-foreground">Necesidades especiales:</div>
                                                            <div>{summaryData.necesidadesEspeciales}</div>
                                                        </>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    <div className="text-muted-foreground">Tipo de alojamiento:</div>
                                                    <div>
                                                        {availableActivities.find(a => a.id === summaryData.tipoActividad)?.name || "No seleccionado"}
                                                    </div>

                                                    <div className="text-muted-foreground">Fecha de llegada:</div>
                                                    <div>
                                                        {summaryData.fechaLlegada ? format(new Date(summaryData.fechaLlegada), "PPP", { locale: es }) : "No seleccionada"}
                                                    </div>

                                                    <div className="text-muted-foreground">Fecha de salida:</div>
                                                    <div>
                                                        {summaryData.fechaSalida ? format(new Date(summaryData.fechaSalida), "PPP", { locale: es }) : "No seleccionada"}
                                                    </div>

                                                    <div className="text-muted-foreground">Número de personas:</div>
                                                    <div>{summaryData.numeroPersonas} {parseInt(summaryData.numeroPersonas) === 1 ? "persona" : "personas"}</div>

                                                    {summaryData.serviciosAdicionales && summaryData.serviciosAdicionales.length > 0 && (
                                                        <>
                                                            <div className="text-muted-foreground">Servicios adicionales:</div>
                                                            <div>
                                                                <ul className="list-disc list-inside">
                                                                    {summaryData.serviciosAdicionales.map(servicioId => {
                                                                        const servicio = additionalServices.find(s => s.id === servicioId);
                                                                        return (
                                                                            <li key={servicioId}>
                                                                                {servicio ? servicio.name : servicioId} {servicio && <span className="text-muted-foreground text-sm">(+{servicio.price}€)</span>}
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            </div>
                                                        </>
                                                    )}

                                                    {summaryData.comentarios && (
                                                        <>
                                                            <div className="text-muted-foreground">Comentarios:</div>
                                                            <div>{summaryData.comentarios}</div>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Resumen de precio</h3>
                                        <div className="bg-muted p-4 rounded-lg">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-muted-foreground">Precio base:</span>
                                                <span>{currentReservationType.basePrice}€</span>
                                            </div>

                                            {!isCourse && summaryData.fechaLlegada && summaryData.fechaSalida && (
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-muted-foreground">Duración:</span>
                                                    <span>
                                                        {(() => {
                                                            const llegada = new Date(summaryData.fechaLlegada);
                                                            const salida = new Date(summaryData.fechaSalida);
                                                            const diffTime = Math.abs(salida - llegada);
                                                            const numDias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                                            return `${numDias} ${numDias === 1 ? "noche" : "noches"}`;
                                                        })()}
                                                    </span>
                                                </div>
                                            )}

                                            {!isCourse && summaryData.serviciosAdicionales && summaryData.serviciosAdicionales.length > 0 && (
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-muted-foreground">Servicios adicionales:</span>
                                                    <span>
                                                        {(() => {
                                                            let total = 0;
                                                            summaryData.serviciosAdicionales.forEach(servicioId => {
                                                                const servicio = additionalServices.find(s => s.id === servicioId);
                                                                if (servicio) {
                                                                    total += servicio.price;
                                                                }
                                                            });
                                                            return `+${total}€`;
                                                        })()}
                                                    </span>
                                                </div>
                                            )}

                                            <Separator className="my-2" />

                                            <div className="flex justify-between items-center font-semibold text-lg mt-3">
                                                <span>Total:</span>
                                                <span>{calculatePrice(summaryData)}€</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-primary/5 p-4 rounded-lg mt-6">
                                        <h4 className="font-medium mb-2">Política de cancelación</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Cancelación gratuita hasta 7 días antes de la {isCourse ? "fecha del curso" : "fecha de llegada"}.
                                            Cancelaciones posteriores tendrán un cargo del 50% del precio total.
                                        </p>
                                    </div>
                                </>
                            )}
                        </CardContent>

                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={handleBackToForm}>
                                Volver al formulario
                            </Button>
                            <Button onClick={handleFinish} disabled={isSubmitting}>
                                {isSubmitting ? "Procesando..." : "Confirmar y pagar"}
                            </Button>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </div>
    );
}

