import { ExternalLink } from "lucide-react"
import Link from "next/link"

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-primary/5 py-8 border-t">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Columna 1: Logo e info */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-xl">Sirius</h3>
                        <p className="text-muted-foreground text-sm">
                            Experiencias auténticas de granja y actividades educativas para todas las edades.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://twitter.com" className="text-primary hover:text-primary/80" aria-label="Twitter">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                </svg>
                            </a>
                            <a href="https://facebook.com" className="text-primary hover:text-primary/80" aria-label="Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </a>
                            <a href="https://instagram.com" className="text-primary hover:text-primary/80" aria-label="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Columna 2: Enlaces rápidos */}
                    <div>
                        <h4 className="font-bold mb-4">Enlaces Rápidos</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                                    Sobre Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                                    Servicios
                                </Link>
                            </li>
                            <li>
                                <Link href="/reservar" className="text-muted-foreground hover:text-primary transition-colors">
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 3: Actividades */}
                    <div>
                        <h4 className="font-bold mb-4">Actividades</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/activities/farm-stay" className="text-muted-foreground hover:text-primary transition-colors">
                                    Estancia en Granja
                                </Link>
                            </li>
                            <li>
                                <Link href="/activities/workshops" className="text-muted-foreground hover:text-primary transition-colors">
                                    Talleres
                                </Link>
                            </li>
                            <li>
                                <Link href="/activities/culinary" className="text-muted-foreground hover:text-primary transition-colors">
                                    Cursos Culinarios
                                </Link>
                            </li>
                            <li>
                                <Link href="/activities/team-building" className="text-muted-foreground hover:text-primary transition-colors">
                                    Formación de Equipos
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 4: Contacto */}
                    <div>
                        <h4 className="font-bold mb-4">Contacto</h4>
                        <address className="not-italic space-y-2 text-muted-foreground">
                            <p>Carretera Rural 123</p>
                            <p>Villaverde, Colombia 28021</p>
                            <p>Teléfono: +11 91 123 4567</p>
                            <p>
                                <a href="mailto:info@granjasostenible.es" className="hover:text-primary transition-colors">
                                    info@sirius.es
                                </a>
                            </p>
                        </address>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                    <p>&copy; {currentYear} Sirius. Todos los derechos reservados.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-primary transition-colors">
                            Política de Privacidad
                        </Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">
                            Términos de Servicio
                        </Link>
                        <Link href="/cookies" className="hover:text-primary transition-colors">
                            Política de Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer