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

// Date field component for reuse
const DateField = ({ form, name, label, disabledDatesFn }) => (
    <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
            <FormItem className="flex flex-col">
                <FormLabel>{label}</FormLabel>
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
                            disabled={disabledDatesFn}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                <FormMessage />
            </FormItem>
        )}
    />
);

// Select field component for reuse
const SelectField = ({ form, name, label, placeholder, options }) => (
    <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                >
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem key={option.id || option.value} value={option.id || option.value.toString()}>
                                {option.name || option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        )}
    />
);

// Services checkbox group component
const ServicesCheckboxGroup = ({ form, services }) => (
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
                    {services.map((servicio) => (
                        <FormField
                            key={servicio.id}
                            control={form.control}
                            name="serviciosAdicionales"
                            render={({ field }) => (
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
                                            {servicio.name} <span className="text-muted-foreground text-sm">(+${servicio.price})</span>
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                    ))}
                </div>
                <FormMessage />
            </FormItem>
        )}
    />
);

export default function StayDetailsForm({ form, availableActivities, additionalServices }) {
    const peopleOptions = [1, 2, 3, 4, 5, 6].map(num => ({
        id: num.toString(),
        name: `${num} ${num === 1 ? "persona" : "personas"}`
    }));

    return (
        <Form {...form}>
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Detalles de la reserva</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DateField
                        form={form}
                        name="fechaLlegada"
                        label="Fecha de llegada"
                        disabledDatesFn={(date) => date < new Date()}
                    />

                    <DateField
                        form={form}
                        name="fechaSalida"
                        label="Fecha de salida"
                        disabledDatesFn={(date) => {
                            const llegada = form.getValues("fechaLlegada");
                            return date < new Date() || (llegada && date <= llegada);
                        }}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                        form={form}
                        name="tipoActividad"
                        label="Tipo de alojamiento"
                        placeholder="Selecciona tipo"
                        options={availableActivities}
                    />

                    <SelectField
                        form={form}
                        name="numeroPersonas"
                        label="Número de personas"
                        placeholder="Selecciona"
                        options={peopleOptions}
                    />
                </div>

                <ServicesCheckboxGroup form={form} services={additionalServices} />

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