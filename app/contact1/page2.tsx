"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
    Calendar as CalendarIcon,
    Check,
    ChevronDown,
    Clock,
    CreditCard,
    Mail,
    MapPin,
    Phone,
    Save,
    Users,
    Bell,
    Gift,
    Plus,
    Repeat
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { format } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils"

// Define the enhanced form schema with Zod
const formSchema = z.object({
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

export default function EnhancedReservation() {
    const [estimatedPrice, setEstimatedPrice] = useState<number>(0)
    const [discountAmount, setDiscountAmount] = useState<number>(0)
    const [additionalServicesPrice, setAdditionalServicesPrice] = useState<number>(0)
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [reservationStatus, setReservationStatus] = useState<string>("new")
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [bookingReference, setBookingReference] = useState("")

    // Define available reservation types
    const reservationTypes = [
        { id: "stay", name: "Farm Stay", basePrice: 150 },
        { id: "workshop", name: "Workshop", basePrice: 75 },
        { id: "culinary", name: "Culinary Course", basePrice: 120 },
        { id: "team", name: "Team Building", basePrice: 200 },
        { id: "venue", name: "Venue Rental", basePrice: 2000 },
    ]

    // Define activities based on reservation type
    const activitiesByType = {
        stay: [
            { id: "standard", name: "Standard Room", priceMultiplier: 1 },
            { id: "deluxe", name: "Deluxe Room", priceMultiplier: 1.5 },
            { id: "suite", name: "Farm Suite", priceMultiplier: 2 },
        ],
        workshop: [
            { id: "gardening", name: "Organic Gardening", priceMultiplier: 1 },
            { id: "farming", name: "Sustainable Farming", priceMultiplier: 1.2 },
            { id: "crafts", name: "Traditional Crafts", priceMultiplier: 1.1 },
        ],
        culinary: [
            { id: "basics", name: "Farm-to-Table Basics", priceMultiplier: 1 },
            { id: "advanced", name: "Advanced Cooking", priceMultiplier: 1.3 },
            { id: "baking", name: "Artisanal Baking", priceMultiplier: 1.2 },
        ],
        team: [
            { id: "outdoor", name: "Outdoor Activities", priceMultiplier: 1 },
            { id: "cooking", name: "Cooking Challenge", priceMultiplier: 1.1 },
            { id: "problem", name: "Problem Solving", priceMultiplier: 1 },
        ],
        venue: [
            { id: "wedding", name: "Wedding", priceMultiplier: 1.2 },
            { id: "corporate", name: "Corporate Event", priceMultiplier: 1 },
            { id: "private", name: "Private Party", priceMultiplier: 0.8 },
        ],
    }

    // Define available dates for each activity
    const availableDates = {
        stay: [
            { date: new Date(2025, 5, 10), available: true },
            { date: new Date(2025, 5, 11), available: true },
            { date: new Date(2025, 5, 12), available: true },
            { date: new Date(2025, 5, 13), available: true },
            { date: new Date(2025, 5, 14), available: true },
            { date: new Date(2025, 5, 15), available: false },
            { date: new Date(2025, 5, 16), available: false },
            { date: new Date(2025, 5, 17), available: true },
            { date: new Date(2025, 5, 18), available: true },
        ],
        workshop: [
            { date: new Date(2025, 5, 10), available: true },
            { date: new Date(2025, 5, 15), available: true },
            { date: new Date(2025, 5, 20), available: true },
            { date: new Date(2025, 5, 25), available: true },
        ],
        culinary: [
            { date: new Date(2025, 5, 12), available: true },
            { date: new Date(2025, 5, 19), available: true },
            { date: new Date(2025, 5, 26), available: true },
        ],
        team: [
            { date: new Date(2025, 5, 5), available: true },
            { date: new Date(2025, 5, 12), available: true },
            { date: new Date(2025, 5, 19), available: true },
            { date: new Date(2025, 5, 26), available: true },
        ],
        venue: [
            { date: new Date(2025, 5, 1), available: true },
            { date: new Date(2025, 5, 8), available: true },
            { date: new Date(2025, 5, 15), available: true },
            { date: new Date(2025, 5, 22), available: true },
            { date: new Date(2025, 5, 29), available: true },
        ],
    }

    // Define additional services
    const additionalServices = [
        { id: "transport", name: "Transportation", price: 50 },
        { id: "guided", name: "Guided Tour", price: 35 },
        { id: "meal", name: "Special Meal Package", price: 75 },
        { id: "spa", name: "Spa Treatment", price: 120 },
        { id: "photography", name: "Photography Service", price: 200 },
    ]

    // Define coupon codes
    const coupons = {
        "WELCOME10": { discount: 0.1, type: "percentage" },
        "SUMMER25": { discount: 0.25, type: "percentage" },
        "FARM50": { discount: 50, type: "fixed" }
    }

    const [selectedType, setSelectedType] = useState<string>("")
    const [activities, setActivities] = useState<any[]>([])
    const [disabledDates, setDisabledDates] = useState<Date[]>([])
    const [isRecurringEnabled, setIsRecurringEnabled] = useState(false)

    // Initialize the form
    const form = useForm<z.infer<typeof formSchema>>({
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

    // Watch for changes in form values
    const watchReservationType = form.watch("reservationType")
    const watchActivity = form.watch("activity")
    const watchPeople = form.watch("people")
    const watchIsRecurring = form.watch("isRecurring")
    const watchRecurrenceFrequency = form.watch("recurrenceFrequency")
    const watchRecurrenceEndDate = form.watch("recurrenceEndDate")
    const watchCouponCode = form.watch("couponCode")
    const watchAdditionalServices = form.watch("additionalServices")

    // Update activities when reservation type changes
    useEffect(() => {
        if (watchReservationType) {
            setSelectedType(watchReservationType)
            setActivities(activitiesByType[watchReservationType as keyof typeof activitiesByType] || [])

            // Reset activity when type changes
            form.setValue("activity", "")

            // Update disabled dates
            const availableDatesForType = availableDates[watchReservationType as keyof typeof availableDates] || []
            const unavailableDates = availableDatesForType
                .filter(dateObj => !dateObj.available)
                .map(dateObj => dateObj.date)

            setDisabledDates(unavailableDates)

            // Enable/disable recurring option based on reservation type
            setIsRecurringEnabled(["workshop", "culinary"].includes(watchReservationType))
            if (!isRecurringEnabled) {
                form.setValue("isRecurring", false)
            }
        }
    }, [watchReservationType, form, isRecurringEnabled])

    // Update recurring options
    useEffect(() => {
        if (!watchIsRecurring) {
            form.setValue("recurrenceFrequency", undefined)
            form.setValue("recurrenceEndDate", undefined)
        }
    }, [watchIsRecurring, form])

    // Calculate additional services price
    useEffect(() => {
        if (watchAdditionalServices && watchAdditionalServices.length > 0) {
            const additionalServicesTotal = watchAdditionalServices.reduce((total, serviceId) => {
                const service = additionalServices.find(s => s.id === serviceId)
                return total + (service?.price || 0)
            }, 0)

            setAdditionalServicesPrice(additionalServicesTotal)
        } else {
            setAdditionalServicesPrice(0)
        }
    }, [watchAdditionalServices])

    // Calculate discount
    useEffect(() => {
        if (watchCouponCode && coupons[watchCouponCode as keyof typeof coupons]) {
            const coupon = coupons[watchCouponCode as keyof typeof coupons]

            if (coupon.type === "percentage") {
                setDiscountAmount(estimatedPrice * coupon.discount)
            } else {
                setDiscountAmount(coupon.discount)
            }
        } else {
            setDiscountAmount(0)
        }
    }, [watchCouponCode, estimatedPrice])

    // Calculate estimated price
    useEffect(() => {
        if (watchReservationType && watchActivity && watchPeople) {
            const basePrice = reservationTypes.find(type => type.id === watchReservationType)?.basePrice || 0
            const activity = activitiesByType[watchReservationType as keyof typeof activitiesByType]?.find(
                (act: any) => act.id === watchActivity
            )
            const priceMultiplier = activity?.priceMultiplier || 1
            const people = parseInt(watchPeople) || 1

            let total = basePrice * priceMultiplier

            // For stays and workshops, multiply by number of people
            if (["stay", "workshop", "culinary", "team"].includes(watchReservationType)) {
                total *= people
            }

            // Calculate recurring price if applicable
            if (watchIsRecurring && watchRecurrenceFrequency && watchRecurrenceEndDate) {
                const startDate = form.getValues("date")
                if (startDate) {
                    const endDate = watchRecurrenceEndDate
                    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth())

                    // Calculate number of occurrences based on frequency
                    let occurrences = 0
                    switch (watchRecurrenceFrequency) {
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
            }

            setEstimatedPrice(total)
        } else {
            setEstimatedPrice(0)
        }
    }, [
        watchReservationType,
        watchActivity,
        watchPeople,
        watchIsRecurring,
        watchRecurrenceFrequency,
        watchRecurrenceEndDate,
        form
    ])

    // Calculate total price
    useEffect(() => {
        const total = estimatedPrice + additionalServicesPrice - discountAmount
        setTotalPrice(Math.max(0, total))
    }, [estimatedPrice, additionalServicesPrice, discountAmount])

    // Generate booking reference
    const generateBookingReference = () => {
        const timestamp = new Date().getTime().toString().slice(-6)
        const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase()
        return `SIR-${randomStr}-${timestamp}`
    }

    // Form submission handler
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)

        // Check if saving as draft
        if (values.saveAsDraft) {
            setReservationStatus("draft")
            localStorage.setItem("reservationDraft", JSON.stringify(values))
            alert("Your reservation has been saved as a draft.")
            return
        }

        // Here you would typically send the form data to your backend
        // Simulate booking reference generation
        const reference = generateBookingReference()
        setBookingReference(reference)
        setReservationStatus("confirmed")
        setShowConfirmation(true)

        // Reset form only after confirmation is closed
    }

    // Load draft
    const loadDraft = () => {
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
        form.reset()
    }

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    }

    // Check coupon code
    const validateCoupon = (code: string) => {
        if (coupons[code as keyof typeof coupons]) {
            return coupons[code as keyof typeof coupons]
        }
        return null
    }

    return (
        <div className="min-h-screen bg-background pt-24">
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        variants={fadeIn}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold mb-4">Contact & Reservations</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Ready to experience Sirius? Fill out the form below to make a reservation or inquiry.
                            Our team will get back to you shortly to confirm your booking.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <motion.div
                            initial="initial"
                            whileInView="animate"
                            variants={fadeIn}
                            viewport={{ once: true }}
                            className="lg:col-span-2"
                        >
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
                                            <TabsContent value="details" className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <FormField
                                                        control={form.control}
                                                        name="name"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Full Name</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="John Doe" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="email"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Email</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="john@example.com" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <FormField
                                                        control={form.control}
                                                        name="phone"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Phone Number</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="+1 (555) 123-4567" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="date"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col">
                                                                <FormLabel>Date</FormLabel>
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
                                                                                    <span>Pick a date</span>
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
                                                                            disabled={(date) =>
                                                                                date < new Date() || // Can't select dates in the past
                                                                                disabledDates.some(disabledDate =>
                                                                                    date.getDate() === disabledDate.getDate() &&
                                                                                    date.getMonth() === disabledDate.getMonth() &&
                                                                                    date.getFullYear() === disabledDate.getFullYear()
                                                                                )
                                                                            }
                                                                            initialFocus
                                                                        />
                                                                    </PopoverContent>
                                                                </Popover>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <FormField
                                                        control={form.control}
                                                        name="reservationType"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Reservation Type</FormLabel>
                                                                <Select
                                                                    onValueChange={field.onChange}
                                                                    defaultValue={field.value}
                                                                >
                                                                    <FormControl>
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Select a reservation type" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>Reservation Types</SelectLabel>
                                                                            {reservationTypes.map((type) => (
                                                                                <SelectItem key={type.id} value={type.id}>
                                                                                    {type.name}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="activity"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Activity</FormLabel>
                                                                <Select
                                                                    onValueChange={field.onChange}
                                                                    defaultValue={field.value}
                                                                    disabled={!selectedType}
                                                                >
                                                                    <FormControl>
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder={selectedType ? "Select an activity" : "Select reservation type first"} />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>Activities</SelectLabel>
                                                                            {activities.map((activity) => (
                                                                                <SelectItem key={activity.id} value={activity.id}>
                                                                                    {activity.name}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <FormField
                                                    control={form.control}
                                                    name="people"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Number of People</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="number"
                                                                    min="1"
                                                                    placeholder="1"
                                                                    {...field}
                                                                    onChange={(e) => {
                                                                        const value = parseInt(e.target.value);
                                                                        if (value < 1) {
                                                                            e.target.value = "1";
                                                                        }
                                                                        field.onChange(e);
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </TabsContent>

                                            <TabsContent value="options" className="space-y-6">
                                                {/* Recurring Booking Option */}
                                                {isRecurringEnabled && (
                                                    <Card className="p-4 border border-primary/20">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <div className="flex gap-2 items-center">
                                                                <Repeat className="h-5 w-5 text-primary" />
                                                                <h3 className="font-semibold">Recurring Booking</h3>
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
                                                                            <FormLabel>Frequency</FormLabel>
                                                                            <Select
                                                                                onValueChange={field.onChange}
                                                                                defaultValue={field.value}
                                                                            >
                                                                                <FormControl>
                                                                                    <SelectTrigger>
                                                                                        <SelectValue placeholder="Select frequency" />
                                                                                    </SelectTrigger>
                                                                                </FormControl>
                                                                                <SelectContent>
                                                                                    <SelectItem value="weekly">Weekly</SelectItem>
                                                                                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                                                                                    <SelectItem value="monthly">Monthly</SelectItem>
                                                                                </SelectContent>
                                                                            </Select>
                                                                            <FormDescription>
                                                                                Recurring bookings receive a 10% discount
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
                                                                            <FormLabel>End Date</FormLabel>
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
                                                                                                <span>Pick an end date</span>
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
                                                )}

                                                {/* Additional Services */}
                                                <Card className="p-4 border border-primary/20">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="flex gap-2 items-center">
                                                            <Bell className="h-5 w-5 text-primary" />
                                                            <h3 className="font-semibold">Additional Services</h3>
                                                        </div>
                                                    </div>

                                                    <Checkbox.Group
                                                        name="additionalServices"
                                                        defaultValue={form.getValues("additionalServices")}
                                                    >
                                                        {additionalServices.map((service) => (
                                                            <Checkbox.Item key={service.id} value={service.id}>
                                                                {service.name} (+${service.price})
                                                            </Checkbox.Item>
                                                        ))}
                                                    </Checkbox.Group>
                                                </Card>
                                            </TabsContent>
                                            <TabsContent value="payment" className="space-y-6">
                                                <FormField
                                                    control={form.control}
                                                    name="couponCode"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Coupon Code</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Enter coupon code"
                                                                    {...field}
                                                                    onChange={(e) => {
                                                                        const code = e.target.value.toUpperCase()
                                                                        const coupon = validateCoupon(code)
                                                                        if (coupon) {
                                                                            form.setValue("couponCode", code)
                                                                        } else {
                                                                            form.setValue("couponCode", "")
                                                                        }
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h3 className="font-semibold">Estimated Price</h3>
                                                        <p className="text-muted-foreground">
                                                            {estimatedPrice > 0 ? `$${estimatedPrice.toFixed(2)}` : "N/A"}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold">Additional Services</h3>
                                                        <p className="text-muted-foreground">
                                                            {additionalServicesPrice > 0 ? `$${additionalServicesPrice.toFixed(2)}` : "N/A"}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold">Discount</h3>
                                                        <p className="text-muted-foreground">
                                                            {discountAmount > 0 ? `-$${discountAmount.toFixed(2)}` : "N/A"}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold">Total Price</h3>
                                                        <p className="text-muted-foreground">
                                                            {totalPrice > 0 ? `$${totalPrice.toFixed(2)}` : "N/A"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TabsContent>
                                        </form>
                                    </Form>
                                </Tabs>
                            </Card>
                        </motion.div>
                        <motion.div
                            initial="initial"
                            whileInView="animate"
                            variants={fadeIn}
                            viewport={{ once: true }}
                        >
                            <Card className="p-6 h-full flex flex-col">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                        <MapPin className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-semibold">Location</h3>
                                </div>
                                <p className="text-muted-foreground mb-4 flex-grow">
                                    123 Sirius Way, Star City, Universe
                                </p>
                                <Button className="w-full">Get Directions</Button>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>
            <motion.div
                initial="initial"
                animate="animate"
                variants={fadeIn}
                className={cn(
                    "fixed inset-0 z-50 flex items-center justify-center bg-primary/50",
                    !showConfirmation && "hidden"
                )}
            >
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={fadeIn}
                    className="bg-white rounded-lg p-8 max-w-md w-full"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold">Reservation Confirmation</h3>
                        <Button variant="outline" onClick={handleCloseConfirmation}>
                            Close
                        </Button>
                    </div>
                    <p className="text-muted-foreground mb-4">
                        Your reservation has been confirmed. Your booking reference is{" "}
                        <span className="font-semibold">{bookingReference}</span>. We will send you a confirmation email shortly.
                    </p>
                    <Button className="w-full">View Reservation</Button>
                </motion.div>
            </motion.div>
        </div>
    )
}
