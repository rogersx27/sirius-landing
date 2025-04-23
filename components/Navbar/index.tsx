'use client';

import { Compass, X, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { ThemeSwitch } from "../ThemeSwitch/ThemeSwitch";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

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
              <a href="/gallery" className="text-foreground/80 hover:text-foreground">Galeria</a>
              <a href="/reservar" className="text-foreground/80 hover:text-foreground">Contacto</a>
              <Button>Reserva ahora!</Button>
              {/* Placeholder para ThemeSwitch */}
              <div className="h-9 w-9"></div>
            </div>
            <div className="md:hidden flex items-center">
              {/* Placeholder para ThemeSwitch */}
              <div className="h-9 w-9 mr-2"></div>
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
          <div className="hidden md:flex items-center space-x-4">
            <a href="/" className="text-foreground/80 hover:text-foreground">Inicio</a>
            <a href="/servicios" className="text-foreground/80 hover:text-foreground">Servicios</a>
            <a href="/gallery" className="text-foreground/80 hover:text-foreground">Galeria</a>
            <a href="/contacto" className="block px-3 py-2 text-foreground/80 hover:text-foreground">Contacto</a>
            <Button onClick={() => window.location.href = '/reservar'}>Reserva ahora!</Button>
            <ThemeSwitch />
          </div>
          <div className="md:hidden flex items-center">
            <ThemeSwitch />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              className="ml-2"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-80" : "max-h-0"
          }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-b">
          <a href="/" className="block px-3 py-2 text-foreground/80 hover:text-foreground">Inicio</a>
          <a href="/servicios" className="block px-3 py-2 text-foreground/80 hover:text-foreground">Servicios</a>
          <a href="/gallery" className="block px-3 py-2 text-foreground/80 hover:text-foreground">Galeria</a>
          <a href="/contacto" className="block px-3 py-2 text-foreground/80 hover:text-foreground">Contacto</a>
          <div className="px-3 py-2">
            <Button className="w-full">Reserva ahora!</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;