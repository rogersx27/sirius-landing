"use client"

import RecurringOption from "./RecurringOption"
import AdditionalServices from "./AdditionalServices"

export default function ReservationOptions() {
    return (
        <div className="space-y-6">
            <RecurringOption />
            <AdditionalServices />
        </div>
    )
}