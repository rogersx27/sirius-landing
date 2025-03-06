"use client"

import { Calendar as CalendarIcon, Repeat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useReservation } from "../hooks/useReservation"

export default function OpcionRecurrente() {
    const { form, isRecurringEnabled } = useReservation()

    if (!form || !isRecurringEnabled) return null

    const watchIsRecurring = form.watch("isRecurring")

    return (
        <Card className="p-4 border border-primary/20">
            <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2 items-center">
                    <Repeat className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Reserva Recurrente</h3>
                </div>
                <FormField
                    control={form.control}
                    name="isRecurring"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>

            {watchIsRecurring && (
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="recurrenceFrequency"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Frecuencia</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar frecuencia" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="weekly">Semanal</SelectItem>
                                        <SelectItem value="biweekly">Quincenal</SelectItem>
                                        <SelectItem value="monthly">Mensual</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Las reservas recurrentes reciben un descuento del 10%
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="recurrenceEndDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Fecha de Finalización</FormLabel>
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
                                                    <span>Seleccionar fecha final</span>
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
                                            disabled={(date) => date < new Date()}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            )}
        </Card>
    )
}