"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

// Animation variants
const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function MapComponent() {
    const mapRef = useRef(null)

    useEffect(() => {
        // Function to initialize the map
        const initializeMap = () => {
            // Check if Google Maps script is loaded
            if (!window.google || !window.google.maps) {
                console.error("Google Maps not loaded")
                return
            }

            // Coordinates for Colombia (Bogotá)
            const farmLocation = { lat: 6.25184, lng: -75.56359 }

            // Create map centered at farm location
            const map = new window.google.maps.Map(mapRef.current, {
                center: farmLocation,
                zoom: 14,
                styles: [
                    {
                        "featureType": "administrative",
                        "elementType": "labels.text.fill",
                        "stylers": [{ "color": "#444444" }]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [{ "color": "#f2f2f2" }]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [{ "visibility": "off" }]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "all",
                        "stylers": [{ "visibility": "on" }, { "color": "#c9e4a3" }]
                    },
                    {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [{ "saturation": -100 }, { "lightness": 45 }]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [{ "visibility": "simplified" }]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [{ "visibility": "off" }]
                    },
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [{ "color": "#b3dfe7" }, { "visibility": "on" }]
                    }
                ]
            })

            // Add marker for the farm location
            const marker = new window.google.maps.Marker({
                position: farmLocation,
                map: map,
                title: "Granja Ecológica",
                animation: window.google.maps.Animation.DROP,
                icon: {
                    url: "/images/map-marker.svg",
                    scaledSize: new window.google.maps.Size(40, 40)
                }
            })

            // Add info window
            const infoWindow = new window.google.maps.InfoWindow({
                content: `
          <div style="padding: 8px; max-width: 200px;">
            <h3 style="font-weight: bold; margin-bottom: 5px;">Granja Ecológica</h3>
            <p style="margin: 0;">Carretera Rural Km 5, Usme, Bogotá, Colombia</p>
          </div>
        `
            })

            // Open info window when marker is clicked
            marker.addListener("click", () => {
                infoWindow.open(map, marker)
            })
        }

        // Load Google Maps script
        const loadGoogleMapsScript = () => {
            if (window.google?.maps) {
                initializeMap()
                return
            }

            // Create script element
            const script = document.createElement("script")
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCpcGmqOx3K5ld6xunIVx9WNLOELIM7hys&callback=initMap`
            script.async = true
            script.defer = true
            document.head.appendChild(script)

            // Global callback function for script
            window.initMap = initializeMap
        }

        // Call function to load script
        loadGoogleMapsScript()

        // Cleanup function
        return () => {
            // Remove global callback if component unmounts
            if (window.initMap) {
                delete window.initMap
            }
        }
    }, [])

    return (
        <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mt-16"
        >
            <div className="container mx-auto px-4 mb-8">
                <h2 className="text-2xl font-bold text-center mb-2">Cómo Llegar</h2>
                <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
                    Estamos ubicados en un entorno natural privilegiado a tan solo 30 minutos del centro de Bogotá.
                </p>
            </div>

            {/* Map container */}
            <div
                ref={mapRef}
                className="w-full h-96 rounded-lg overflow-hidden shadow-md"
                aria-label="Mapa de ubicación de la granja"
            ></div>

            <div className="container mx-auto px-4 mt-8">
                <div className="max-w-3xl mx-auto bg-primary/5 p-6 rounded-lg">
                    <h3 className="font-bold mb-2">Indicaciones</h3>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                            <div className="p-1 bg-primary/10 rounded-full mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="8 12 12 16 16 12"></polyline>
                                    <line x1="12" y1="8" x2="12" y2="16"></line>
                                </svg>
                            </div>
                            <span>Desde Bogotá centro: Toma la Autopista Sur dirección Usme durante 15 km, después sigue las indicaciones hacia la Granja Ecológica.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="p-1 bg-primary/10 rounded-full mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                    <rect x="2" y="8" width="20" height="8" rx="2" ry="2"></rect>
                                    <rect x="6" y="16" width="12" height="2"></rect>
                                    <line x1="12" y1="16" x2="12" y2="18"></line>
                                </svg>
                            </div>
                            <span>En transporte público: Toma el TransMilenio hasta Portal Usme, luego el alimentador A45 hasta la parada "Granja Ecológica".</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="p-1 bg-primary/10 rounded-full mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                    <path d="M19 9V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2"></path>
                                    <path d="M1 9h22v9a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2z"></path>
                                </svg>
                            </div>
                            <span>Aparcamiento gratuito disponible para visitantes y huéspedes.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </motion.div>
    )
}