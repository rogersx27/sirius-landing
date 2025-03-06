"use client"

import { Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { useReservation } from "../hooks/useReservation"
import { additionalServices } from "../constants/reservation-data"

export default function AdditionalServices() {
    const { form } = useReservation()

    if (!form) return null

    return (
        <Card className="p-4 border border-primary/20">
            <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2 items-center">
                    <Plus className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Additional Services</h3>
                </div>
            </div>

            <FormField
                control={form.control}
                name="additionalServices"
                render={() => (
                    <FormItem className="space-y-3">
                        <div className="space-y-2">
                            {additionalServices.map((service) => (
                                <FormField
                                    key={service.id}
                                    control={form.control}
                                    name="additionalServices"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                key={service.id}
                                                className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(service.id)}
                                                        onCheckedChange={(checked) => {
                                                            const currentValues = field.value || [];
                                                            return checked
                                                                ? field.onChange([...currentValues, service.id])
                                                                : field.onChange(
                                                                    currentValues.filter(
                                                                        (value) => value !== service.id
                                                                    )
                                                                );
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal cursor-pointer">
                                                    {service.name} (+${service.price})
                                                </FormLabel>
                                            </FormItem>
                                        );
                                    }}
                                />
                            ))}
                        </div>
                    </FormItem>
                )}
            />
        </Card>
    )
}