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

export default function CourseDetailsForm({ form, availableActivities }) {
    return (
        <Form {...form}>
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Detalles de la inscripción</h3>

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
            </div>
        </Form>
    );
}