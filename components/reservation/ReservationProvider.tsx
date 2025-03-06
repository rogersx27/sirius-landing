"use client"

import React, { createContext, useState, useEffect, ReactNode } from "react"
import { UseFormReturn } from "react-hook-form"
import { reservationTypes, activitiesByType, availableDates, additionalServices, coupons } from "./constants/reservation-data"
import { ReservationFormValues } from "./types"

interface ReservationContextType {
    // Price states
    estimatedPrice: number
    discountAmount: number
    additionalServicesPrice: number
    totalPrice: number

    // Reservation states
    reservationStatus: string
    showConfirmation: boolean
    bookingReference: string

    // Form helper states
    selectedType: string
    activities: any[]
    disabledDates: Date[]
    isRecurringEnabled: boolean

    // Functions
    setShowConfirmation: (show: boolean) => void
    generateBookingReference: () => string
    validateCoupon: (code: string) => any
    loadDraft: () => void
    handleCloseConfirmation: () => void

    // Form reference
    form?: UseFormReturn<ReservationFormValues>
    setForm: (form: UseFormReturn<ReservationFormValues>) => void
}

// Exportamos el contexto para que el hook pueda importarlo
export const ReservationContext = createContext<ReservationContextType | undefined>(undefined)

export function ReservationProvider({ children }: { children: ReactNode }) {
    // Price states
    const [estimatedPrice, setEstimatedPrice] = useState<number>(0)
    const [discountAmount, setDiscountAmount] = useState<number>(0)
    const [additionalServicesPrice, setAdditionalServicesPrice] = useState<number>(0)
    const [totalPrice, setTotalPrice] = useState<number>(0)

    // Reservation states
    const [reservationStatus, setReservationStatus] = useState<string>("new")
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [bookingReference, setBookingReference] = useState("")

    // Form helper states
    const [selectedType, setSelectedType] = useState<string>("")
    const [activities, setActivities] = useState<any[]>([])
    const [disabledDates, setDisabledDates] = useState<Date[]>([])
    const [isRecurringEnabled, setIsRecurringEnabled] = useState(false)

    // Anti-recursion flag
    const [isUpdating, setIsUpdating] = useState(false)

    // Form reference
    const [form, setForm] = useState<UseFormReturn<ReservationFormValues> | undefined>(undefined)

    // Watch for changes in form values if form is available
    useEffect(() => {
        if (!form || isUpdating) return

        const subscription = form.watch((value) => {
            // Set updating flag to prevent recursive updates
            setIsUpdating(true)

            // Update activities when reservation type changes
            const watchReservationType = value.reservationType
            if (watchReservationType) {
                setSelectedType(watchReservationType)
                setActivities(activitiesByType[watchReservationType as keyof typeof activitiesByType] || [])

                // Reset activity when type changes - SOLO si es necesario
                if (value.activity && !activitiesByType[watchReservationType as keyof typeof activitiesByType]?.some(a => a.id === value.activity)) {
                    form.setValue("activity", "")
                }

                // Update disabled dates
                const availableDatesForType = availableDates[watchReservationType as keyof typeof availableDates] || []
                const unavailableDates = availableDatesForType
                    .filter(dateObj => !dateObj.available)
                    .map(dateObj => dateObj.date)

                setDisabledDates(unavailableDates)

                // Enable/disable recurring option based on reservation type
                const isRecurring = ["workshop", "culinary"].includes(watchReservationType)
                setIsRecurringEnabled(isRecurring)

                // Solo cambiar si es necesario
                if (!isRecurring && value.isRecurring) {
                    form.setValue("isRecurring", false)
                }
            }

            // Update recurring options - SOLO si es necesario
            if (value.isRecurring === false) {
                if (value.recurrenceFrequency !== undefined) {
                    form.setValue("recurrenceFrequency", undefined)
                }
                if (value.recurrenceEndDate !== undefined) {
                    form.setValue("recurrenceEndDate", undefined)
                }
            }

            // Calculate prices
            calculatePrices(value)

            // Reset updating flag DESPUÉS de que todas las actualizaciones estén completas
            setTimeout(() => setIsUpdating(false), 0)
        })

        return () => subscription.unsubscribe()
    }, [form, isUpdating])

    // Calculate total price
    useEffect(() => {
        const total = estimatedPrice + additionalServicesPrice - discountAmount
        setTotalPrice(Math.max(0, total))
    }, [estimatedPrice, additionalServicesPrice, discountAmount])

    // Calculate all prices based on form values
    const calculatePrices = (values: Partial<ReservationFormValues>) => {
        if (!form) return

        // Calculate base price
        if (values.reservationType && values.activity && values.people) {
            const basePrice = reservationTypes.find(type => type.id === values.reservationType)?.basePrice || 0
            const activity = activitiesByType[values.reservationType as keyof typeof activitiesByType]?.find(
                (act: any) => act.id === values.activity
            )
            const priceMultiplier = activity?.priceMultiplier || 1
            const people = parseInt(values.people) || 1

            let total = basePrice * priceMultiplier

            // For stays and workshops, multiply by number of people
            if (["stay", "workshop", "culinary", "team"].includes(values.reservationType)) {
                total *= people
            }

            // IMPORTANTE - Esta parte está causando la recursión infinita al seleccionar fecha
            // Modificamos para evitar actualizaciones recursivas al calcular fechas recurrentes
            if (values.isRecurring && values.recurrenceFrequency && values.recurrenceEndDate && values.date) {
                const startDate = values.date // Usamos el valor del parámetro en lugar de getValues
                const endDate = values.recurrenceEndDate
                const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                    (endDate.getMonth() - startDate.getMonth())

                // Calculate number of occurrences based on frequency
                let occurrences = 0
                switch (values.recurrenceFrequency) {
                    case "weekly":
                        occurrences = Math.floor(months * 4) // Approximately 4 weeks per month
                        break
                    case "biweekly":
                        occurrences = Math.floor(months * 2) // 2 occurrences per month
                        break
                    case "monthly":
                        occurrences = months
                        break
                    default:
                        occurrences = 1
                }

                // Apply 10% discount for recurring bookings
                total = total * Math.max(1, occurrences) * 0.9
            }

            setEstimatedPrice(total)
        } else {
            setEstimatedPrice(0)
        }

        // Calculate additional services price
        if (values.additionalServices && values.additionalServices.length > 0) {
            const additionalServicesTotal = values.additionalServices.reduce((total, serviceId) => {
                const service = additionalServices.find(s => s.id === serviceId)
                return total + (service?.price || 0)
            }, 0)

            setAdditionalServicesPrice(additionalServicesTotal)
        } else {
            setAdditionalServicesPrice(0)
        }

        // Calculate discount
        if (values.couponCode && coupons[values.couponCode as keyof typeof coupons]) {
            const coupon = coupons[values.couponCode as keyof typeof coupons]

            if (coupon.type === "percentage") {
                setDiscountAmount(estimatedPrice * coupon.discount)
            } else {
                setDiscountAmount(coupon.discount)
            }
        } else {
            setDiscountAmount(0)
        }
    }

    // Generate booking reference
    const generateBookingReference = () => {
        const timestamp = new Date().getTime().toString().slice(-6)
        const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase()
        const reference = `SIR-${randomStr}-${timestamp}`
        setBookingReference(reference)
        return reference
    }

    // Check coupon code
    const validateCoupon = (code: string) => {
        if (coupons[code as keyof typeof coupons]) {
            return coupons[code as keyof typeof coupons]
        }
        return null
    }

    // Load draft
    const loadDraft = () => {
        if (!form || typeof window === 'undefined') return;

        const draft = localStorage.getItem("reservationDraft")
        if (draft) {
            try {
                const draftData = JSON.parse(draft)

                // Convert date strings back to Date objects
                if (draftData.date) {
                    draftData.date = new Date(draftData.date)
                }
                if (draftData.recurrenceEndDate) {
                    draftData.recurrenceEndDate = new Date(draftData.recurrenceEndDate)
                }

                // Reset the form with draft values
                form.reset(draftData)

                alert("Draft loaded successfully")
            } catch (error) {
                console.error("Error loading draft:", error)
                alert("Error loading draft")
            }
        } else {
            alert("No draft found")
        }
    }

    // Close confirmation and reset form
    const handleCloseConfirmation = () => {
        setShowConfirmation(false)
        form?.reset()
    }

    return (
        <ReservationContext.Provider value={{
            estimatedPrice,
            discountAmount,
            additionalServicesPrice,
            totalPrice,
            reservationStatus,
            showConfirmation,
            bookingReference,
            selectedType,
            activities,
            disabledDates,
            isRecurringEnabled,
            setShowConfirmation,
            generateBookingReference,
            validateCoupon,
            loadDraft,
            handleCloseConfirmation,
            form,
            setForm
        }}>
            {children}
        </ReservationContext.Provider>
    )
}