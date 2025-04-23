"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    CheckCircle,
    AlertCircle,
    Loader2
} from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
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
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Animation variants
const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

// Form validation schema
const formSchema = z.object({
    name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    email: z.string().email({ message: "Por favor, introduce un email válido" }),
    phone: z.string().optional(),
    subject: z.string().min(1, { message: "Por favor, selecciona un asunto" }),
    message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres" }),
    terms: z.boolean().refine(val => val === true, {
        message: "Debes aceptar los términos y condiciones"
    })
})

// Contact information items
const contactInfo = [
    {
        icon: <MapPin className="h-5 w-5" />,
        title: "Dirección",
        details: ["Carretera Rural Km 5", "Valle Sostenible, 28001", "Colombia"]
    },
    {
        icon: <Phone className="h-5 w-5" />,
        title: "Teléfono",
        details: ["+57 91 123 4567", "+57 600 123 456"]
    },
    {
        icon: <Mail className="h-5 w-5" />,
        title: "Email",
        details: ["info@granjaecologica.com", "reservas@granjaecologica.com"]
    },
    {
        icon: <Clock className="h-5 w-5" />,
        title: "Horario",
        details: ["Lunes - Viernes: 9:00 - 18:00", "Sábado - Domingo: 10:00 - 16:00"]
    }
]

export default function ContactForm(key: any) {
    const [formStatus, setFormStatus] = useState({
        state: "idle", // idle, submitting, success, error
        message: ""
    })

    // Initialize form with react-hook-form and zod validation
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
            terms: false
        }
    })

    // Form submission handler
    const onSubmit = async (data) => {
        setFormStatus({ state: "submitting", message: "" })

        try {
            // Simulate API call with timeout
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Successful submission
            setFormStatus({
                state: "success",
                message: "Hemos recibido tu mensaje. Te contactaremos pronto."
            })

            // Reset form after successful submission
            form.reset()
        } catch (error) {
            // Handle submission error
            setFormStatus({
                state: "error",
                message: "Ha ocurrido un error al enviar el formulario. Por favor, inténtalo de nuevo."
            })
        }
    }

    // Reset the form status when user starts typing after an error/success
    const handleInputChange = () => {
        if (formStatus.state !== "idle" && formStatus.state !== "submitting") {
            setFormStatus({ state: "idle", message: "" })
        }
    }

    return (
        <div className="container mx-auto px-4 py-16" >
            <motion.div
                className="text-center mb-12"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeIn}
            >
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Contacta con Nosotros</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Estamos aquí para responder tus preguntas y ayudarte a planificar tu visita.
                    Completa el formulario o utiliza nuestros datos de contacto.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contact Information */}
                <motion.div
                    className="lg:col-span-1"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Información de Contacto</CardTitle>
                            <CardDescription>
                                Encuentra varias formas de contactarnos
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {contactInfo.map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="mt-1 p-2 rounded-md bg-primary/10 text-primary h-fit">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-medium">{item.title}</h3>
                                            <div className="text-muted-foreground text-sm mt-1 space-y-1">
                                                {item.details.map((detail, i) => (
                                                    <p key={i}>{detail}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Separator className="my-6" />

                            <div>
                                <h3 className="font-medium mb-3">Síguenos</h3>
                                <div className="flex gap-3">
                                    <Button size="icon" variant="outline" className="rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                        </svg>
                                    </Button>
                                    <Button size="icon" variant="outline" className="rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                        </svg>
                                    </Button>
                                    <Button size="icon" variant="outline" className="rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                        </svg>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    className="lg:col-span-2"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Envíanos un Mensaje</CardTitle>
                            <CardDescription>
                                Completa el formulario y te responderemos lo antes posible
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {formStatus.state === "success" ? (
                                <Alert className="bg-green-50 border-green-200">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <AlertTitle>¡Mensaje enviado!</AlertTitle>
                                    <AlertDescription>{formStatus.message}</AlertDescription>
                                    <div className="mt-4">
                                        <Button onClick={() => setFormStatus({ state: "idle", message: "" })}>
                                            Enviar otro mensaje
                                        </Button>
                                    </div>
                                </Alert>
                            ) : (
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} onChange={handleInputChange} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Name field */}
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Nombre</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Tu nombre" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Email field */}
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="tu@email.com" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Phone field */}
                                            <FormField
                                                control={form.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Teléfono (opcional)</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="+57 XXX XXX XXX" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Subject field */}
                                            <FormField
                                                control={form.control}
                                                name="subject"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Asunto</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Selecciona un asunto" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="general">Información General</SelectItem>
                                                                <SelectItem value="reservation">Reservas</SelectItem>
                                                                <SelectItem value="activities">Actividades y Experiencias</SelectItem>
                                                                <SelectItem value="complaint">Reclamación</SelectItem>
                                                                <SelectItem value="suggestion">Sugerencia</SelectItem>
                                                                <SelectItem value="other">Otro</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Message field */}
                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Mensaje</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Escribe tu mensaje aquí..."
                                                            className="min-h-32"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Terms checkbox */}
                                        <FormField
                                            control={form.control}
                                            name="terms"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                                                    <FormControl>
                                                        <input
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                            checked={field.value}
                                                            onChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel>
                                                            Acepto los términos de privacidad y el procesamiento de mis datos personales
                                                        </FormLabel>
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                        {/* Error message */}
                                        {formStatus.state === "error" && (
                                            <Alert variant="destructive">
                                                <AlertCircle className="h-4 w-4" />
                                                <AlertTitle>Error</AlertTitle>
                                                <AlertDescription>{formStatus.message}</AlertDescription>
                                            </Alert>
                                        )}

                                        {/* Submit button */}
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={formStatus.state === "submitting"}
                                        >
                                            {formStatus.state === "submitting" ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Enviando...
                                                </>
                                            ) : (
                                                "Enviar Mensaje"
                                            )}
                                        </Button>
                                    </form>
                                </Form>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}