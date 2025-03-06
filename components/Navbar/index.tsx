import { Compass, X, Menu } from "lucide-react";
import { Button } from "../ui/button";

function Navbar() {
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
            <a href="/contact" className="text-foreground/80 hover:text-foreground">Contact</a>
            <Button>Reserva ahora!</Button>
          </div>
          <div className="md:hidden">
            <input type="checkbox" id="menu-toggle" className="hidden peer" />
            <label htmlFor="menu-toggle" className="cursor-pointer block">
              <Button variant="ghost" size="icon" className="relative">
                <Menu className="h-6 w-6 peer-checked:hidden" />
                <X className="h-6 w-6 hidden peer-checked:block absolute" />
              </Button>
            </label>
          </div>
        </div>
      </div>
      <div className="md:hidden h-0 overflow-hidden transition-all duration-300 peer-checked:h-auto">
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