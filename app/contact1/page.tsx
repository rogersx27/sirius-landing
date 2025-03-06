"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar as CalendarIcon, Check, ChevronDown, Clock, Mail, MapPin, Phone, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
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

// Define the form schema with Zod
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
})

export default function Contact() {
  const [estimatedPrice, setEstimatedPrice] = useState<number>(0)
  
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
  
  const [selectedType, setSelectedType] = useState<string>("")
  const [activities, setActivities] = useState<any[]>([])
  const [disabledDates, setDisabledDates] = useState<Date[]>([])
  
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      people: "1",
    },
  })
  
  // Watch for changes in form values
  const watchReservationType = form.watch("reservationType")
  const watchActivity = form.watch("activity")
  const watchPeople = form.watch("people")
  
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
    }
  }, [watchReservationType, form])
  
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
      
      setEstimatedPrice(total)
    } else {
      setEstimatedPrice(0)
    }
  }, [watchReservationType, watchActivity, watchPeople])
  
  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Here you would typically send the form data to your backend
    alert("Form submitted successfully! We'll contact you shortly.")
    form.reset()
  }
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
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
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Information</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about any special requirements or questions you may have." 
                              className="resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {estimatedPrice > 0 && (
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Estimated Price</h3>
                        <p className="text-3xl font-bold text-primary">${estimatedPrice.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          This is an estimate. Final pricing may vary based on specific requirements.
                        </p>
                      </div>
                    )}
                    
                    <Button type="submit" size="lg" className="w-full md:w-auto">
                      Submit Reservation Request
                    </Button>
                  </form>
                </Form>
              </Card>
            </motion.div>
            
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={fadeIn}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-muted-foreground">123 Farm Road, Countryside, CA 94123</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">info@siriusfarm.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Hours</p>
                      <p className="text-muted-foreground">Monday - Sunday: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Available Dates</h3>
                <div className="space-y-4">
                  {Object.entries(availableDates).map(([type, dates]) => {
                    const typeName = reservationTypes.find(t => t.id === type)?.name || type;
                    return (
                      <div key={type} className="space-y-2">
                        <h4 className="font-medium">{typeName}</h4>
                        <div className="flex flex-wrap gap-2">
                          {dates.filter(d => d.available).slice(0, 3).map((dateObj, i) => (
                            <div key={i} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                              {format(dateObj.date, "MMM d")}
                            </div>
                          ))}
                          {dates.filter(d => d.available).length > 3 && (
                            <div className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                              +{dates.filter(d => d.available).length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Select a reservation type in the form to see all available dates in the calendar.
                  </p>
                </div>
              </Card>
              
              <Card className="p-6 bg-primary text-primary-foreground">
                <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
                <p className="mb-4">Our team is ready to assist you with any questions about your reservation.</p>
                <Button variant="secondary" size="sm" className="w-full">
                  Chat with Us
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}