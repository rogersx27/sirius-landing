'use client';

import { Compass, X, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Para evitar problemas de hidratación, solo renderizamos el menú interactivo
  // después de que el componente se haya montado en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (!isMounted) {
    return (
      <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Compass className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">Sirius</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-foreground/80 hover:text-foreground">Inicio</a>
              <a href="/services" className="text-foreground/80 hover:text-foreground">Servicios</a>
              <a href="/gallery" className="text-foreground/80 hover:text-foreground">Galleria</a>
              <a href="/contact" className="text-foreground/80 hover:text-foreground">Contacto</a>
              <Button>Reserva ahora!</Button>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Compass className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold">Sirius</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground/80 hover:text-foreground">Inicio</a>
            <a href="/services" className="text-foreground/80 hover:text-foreground">Servicios</a>
            <a href="/gallery" className="text-foreground/80 hover:text-foreground">Galleria</a>
            <a href="/contact" className="text-foreground/80 hover:text-foreground">Contacto</a>
            <Button>Reserva ahora!</Button>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-64" : "max-h-0"
          }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-b">
          <a href="/" className="block px-3 py-2 text-foreground/80 hover:text-foreground">Inicio</a>
          <a href="/services" className="block px-3 py-2 text-foreground/80 hover:text-foreground">Servicios</a>
          <a href="/gallery" className="block px-3 py-2 text-foreground/80 hover:text-foreground">Galleria</a>
          <a href="/contact" className="block px-3 py-2 text-foreground/80 hover:text-foreground">Contacto</a>
          <div className="px-3 py-2">
            <Button className="w-full">Reserva ahora!</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;