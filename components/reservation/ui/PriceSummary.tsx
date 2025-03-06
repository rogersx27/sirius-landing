"use client"

import { useReservation } from "../hooks/useReservation"

interface PriceSummaryProps {
    showDetailed?: boolean
    showTotal?: boolean
    className?: string
}

export default function PriceSummary({
    showDetailed = true,
    showTotal = true,
    className = ""
}: PriceSummaryProps) {
    const {
        estimatedPrice,
        additionalServicesPrice,
        discountAmount,
        totalPrice
    } = useReservation()

    return (
        <div className={className}>
            {showDetailed && (
                <div className="flex items-center justify-between gap-4 mb-4 text-sm">
                    <div>
                        <h3 className="font-semibold">Base Price</h3>
                        <p className="text-muted-foreground">
                            {estimatedPrice > 0 ? `$${estimatedPrice.toFixed(2)}` : "N/A"}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Additional Services</h3>
                        <p className="text-muted-foreground">
                            {additionalServicesPrice > 0 ? `+$${additionalServicesPrice.toFixed(2)}` : "N/A"}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Discounts</h3>
                        <p className="text-muted-foreground text-green-600">
                            {discountAmount > 0 ? `-$${discountAmount.toFixed(2)}` : "N/A"}
                        </p>
                    </div>
                </div>
            )}

            {showTotal && (
                <div className={`${showDetailed ? 'pt-4 border-t' : ''}`}>
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">Total</h3>
                        <p className="text-xl font-bold text-primary">
                            ${totalPrice.toFixed(2)}
                        </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Estimated price. Final amount may vary based on specific requirements.
                    </p>
                </div>
            )}
        </div>
    )
}