"use client"

import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useReservation } from "../hooks/useReservation"
// Importante: Actualiza la ruta si el archivo está en español
import { reservationTypes } from "../constants/reservation-data"
import { useEffect } from "react"

export default function ReservationDetails() {
    const { form, activities, selectedType, disabledDates } = useReservation()

    // Debugging: Verificar si activities está llegando correctamente
    useEffect(() => {
        if (selectedType) {
            console.log("Tipo seleccionado:", selectedType);
            console.log("Actividades disponibles:", activities);
        }
    }, [selectedType, activities]);

    if (!form) return null

    // Handler para debugging - detectar cuando se selecciona un tipo de reserva
    const handleReservationTypeChange = (value: string) => {
        console.log("Tipo de reserva seleccionado:", value);
        form.setValue("reservationType", value);

        // Para debugging: verificar si activitiesByType está disponible
        try {
            const importedActivities = require('../constants/reservation-data').activitiesByType;
            console.log("Actividades para este tipo:", importedActivities[value]);
        } catch (e) {
            console.error("Error al importar activitiesByType:", e);
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre Completo</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Correo Electrónico</FormLabel>
                            <FormControl>
                                <Input placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Número de Teléfono</FormLabel>
                            <FormControl>
                                <Input placeholder="+1 (555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Fecha</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Seleccionar fecha</span>
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
                                        disabled={(date) =>
                                            date < new Date() || // Can't select dates in the past
                                            disabledDates.some(disabledDate =>
                                                date.getDate() === disabledDate.getDate() &&
                                                date.getMonth() === disabledDate.getMonth() &&
                                                date.getFullYear() === disabledDate.getFullYear()
                                            )
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="reservationType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo de Reserva</FormLabel>
                            <Select
                                onValueChange={handleReservationTypeChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un tipo de reserva" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Tipos de Reserva</SelectLabel>
                                        {reservationTypes.map((type) => (
                                            <SelectItem key={type.id} value={type.id}>
                                                {type.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="activity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Actividad</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={!selectedType || activities.length === 0}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={selectedType ? "Selecciona una actividad" : "Selecciona tipo de reserva primero"} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Actividades</SelectLabel>
                                        {activities && activities.length > 0 ? (
                                            activities.map((activity) => (
                                                <SelectItem key={activity.id} value={activity.id}>
                                                    {activity.name}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="none" disabled>
                                                No hay actividades disponibles
                                            </SelectItem>
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name="people"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Número de Personas</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                min="1"
                                placeholder="1"
                                {...field}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (value < 1) {
                                        e.target.value = "1";
                                    }
                                    field.onChange(e);
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Información Adicional</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Cuéntanos sobre cualquier requisito especial o preguntas que puedas tener."
                                className="resize-none"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}