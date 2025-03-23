"use client"

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export default function StayDetailsForm({ form, availableActivities, additionalServices }) {
    return (
        <Form {...form}>
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Detalles de la reserva</h3>

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
            </div>
        </Form>
    );
}