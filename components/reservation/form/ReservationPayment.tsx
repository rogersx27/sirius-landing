"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { useReservation } from "../hooks/useReservation"
import PriceSummary from "../ui/PriceSummary"

export default function PagoReservacion() {
    const { form, validateCoupon, totalPrice } = useReservation()

    if (!form) return null

    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="couponCode"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Código de Cupón</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Ingresa código de cupón"
                                {...field}
                                onChange={(e) => {
                                    const code = e.target.value.toUpperCase()
                                    field.onChange(code)
                                }}
                                onBlur={(e) => {
                                    const code = e.target.value.toUpperCase()
                                    const coupon = validateCoupon(code)
                                    if (!coupon) {
                                        form.setValue("couponCode", "")
                                    }
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Resumen de precios detallado */}
            <PriceSummary className="p-4 bg-muted/50 rounded-lg" />

            <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Precio Estimado</h3>
                <p className="text-3xl font-bold text-primary mb-4">${totalPrice.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mb-4">
                    Esto es un estimado. El precio final puede variar según requisitos específicos.
                </p>

                <div className="flex items-center justify-between gap-4">
                    <FormField
                        control={form.control}
                        name="saveAsDraft"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                    Guardar como borrador
                                </FormLabel>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" size="lg" className="ml-auto">
                        {form.watch("saveAsDraft") ? "Guardar Borrador" : "Completar Reservación"}
                    </Button>
                </div>
            </div>
        </div>
    )
}