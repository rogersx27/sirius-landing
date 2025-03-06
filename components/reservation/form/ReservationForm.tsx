"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useReservation } from "../hooks/useReservation"
import { formSchema, ReservationFormValues } from "../types"
import ReservationDetails from "./ReservationDetails"
import ReservationOptions from "./ReservationOptions"
import ReservationPayment from "./ReservationPayment"

export default function ReservationForm() {
    const { setForm, generateBookingReference, setShowConfirmation, loadDraft } = useReservation()

    // Initialize the form
    const form = useForm<ReservationFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
            people: "1",
            isRecurring: false,
            additionalServices: [],
            saveAsDraft: false,
            notifications: {
                email: true,
                sms: false
            }
        },
    })

    // Set form to context when component mounts
    useEffect(() => {
        if (setForm) {
            setForm(form)
        }
    }, [form, setForm])

    // Form submission handler
    function onSubmit(values: ReservationFormValues) {
        console.log(values)

        // Check if saving as draft
        if (values.saveAsDraft) {
            localStorage.setItem("reservationDraft", JSON.stringify(values))
            alert("Your reservation has been saved as a draft.")
            return
        }

        // Simulate booking reference generation
        generateBookingReference()
        setShowConfirmation(true)

        // Form will be reset after confirmation is closed
    }

    return (
        <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Reservation Form</h3>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={loadDraft}>
                        <Save className="w-4 h-4 mr-2" />
                        Load Draft
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="details" className="mb-6">
                <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="options">Options</TabsTrigger>
                    <TabsTrigger value="payment">Payment</TabsTrigger>
                </TabsList>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <TabsContent value="details">
                            <ReservationDetails />
                        </TabsContent>

                        <TabsContent value="options">
                            <ReservationOptions />
                        </TabsContent>

                        <TabsContent value="payment">
                            <ReservationPayment />
                        </TabsContent>
                    </form>
                </Form>
            </Tabs>
        </Card>
    )
}