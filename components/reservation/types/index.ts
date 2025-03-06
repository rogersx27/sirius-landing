import { z } from "zod"

// Define the form schema with Zod
export const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    date: z.date({
        required_error: "Please select a date.",
    }),
    reservationType: z.string({
        required_error: "Please select a reservation type.",
    }),
    activity: z.string({
        required_error: "Please select an activity.",
    }),
    people: z.string().min(1, { message: "Please enter the number of people." }),
    message: z.string().optional(),
    // New fields
    isRecurring: z.boolean().default(false),
    recurrenceFrequency: z.string().optional(),
    recurrenceEndDate: z.date().optional(),
    paymentMethod: z.string().optional(),
    couponCode: z.string().optional(),
    additionalServices: z.array(z.string()).default([]),
    saveAsDraft: z.boolean().default(false),
    notifications: z.object({
        email: z.boolean().default(true),
        sms: z.boolean().default(false),
    }).default({}),
})

export type ReservationFormValues = z.infer<typeof formSchema>

export interface ReservationType {
    id: string
    name: string
    basePrice: number
}

export interface Activity {
    id: string
    name: string
    priceMultiplier: number
}

export interface DateAvailability {
    date: Date
    available: boolean
}

export interface AdditionalService {
    id: string
    name: string
    price: number
}

export interface Coupon {
    discount: number
    type: "percentage" | "fixed"
}

export interface ReservationState {
    estimatedPrice: number
    discountAmount: number
    additionalServicesPrice: number
    totalPrice: number
    reservationStatus: string
    bookingReference: string
}