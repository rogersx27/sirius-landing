import { useContext } from "react"
import { ReservationContext } from "../ReservationProvider"

/**
 * Custom hook para acceder al contexto de reserva
 * Proporciona acceso a estados, funciones y al formulario de reserva
 */
export function useReservation() {
    const context = useContext(ReservationContext)

    if (context === undefined) {
        throw new Error("useReservation must be used within a ReservationProvider")
    }

    return context
}