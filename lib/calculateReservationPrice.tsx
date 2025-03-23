"use client"

/**
 * Calcula el precio total de una reserva o curso
 * 
 * @param {Object} data - Datos del formulario
 * @param {boolean} isCourse - Indica si es un curso (true) o una estancia (false)
 * @param {Object} reservationType - Tipo de reserva seleccionado
 * @param {Array} availableActivities - Actividades disponibles para este tipo
 * @param {Array} additionalServices - Servicios adicionales disponibles
 * @returns {number} Precio total calculado
 */
const calculateReservationPrice = (
    data,
    isCourse,
    reservationType,
    availableActivities,
    additionalServices
) => {
    let basePrice = reservationType.basePrice;

    // Multiplicador según actividad seleccionada
    const activity = availableActivities.find(act => act.id === data.tipoActividad);
    const multiplier = activity ? activity.priceMultiplier : 1;

    // Cálculo básico diferente según tipo
    if (isCourse) {
        // Para cursos, precio base * multiplicador
        return Math.round(basePrice * multiplier);
    } else {
        // Para estancias, considerar número de personas y días
        const numPersonas = parseInt(data.numeroPersonas || 1);
        let numDias = 1;

        if (data.fechaLlegada && data.fechaSalida) {
            const llegada = new Date(data.fechaLlegada);
            const salida = new Date(data.fechaSalida);
            const diffTime = Math.abs(salida - llegada);
            numDias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            numDias = numDias || 1; // Mínimo 1 día
        }

        let total = basePrice * multiplier * numDias;

        // Añadir servicios adicionales
        if (data.serviciosAdicionales && data.serviciosAdicionales.length > 0) {
            data.serviciosAdicionales.forEach(servicioId => {
                const servicio = additionalServices.find(s => s.id === servicioId);
                if (servicio) {
                    total += servicio.price;
                }
            });
        }

        return Math.round(total);
    }
};

/**
 * Calcula la duración en noches entre dos fechas
 * 
 * @param {Date} fechaLlegada - Fecha de llegada
 * @param {Date} fechaSalida - Fecha de salida
 * @returns {number} Número de noches
 */
const calculateDuration = (fechaLlegada, fechaSalida) => {
    if (!fechaLlegada || !fechaSalida) return 0;

    const llegada = new Date(fechaLlegada);
    const salida = new Date(fechaSalida);
    const diffTime = Math.abs(salida - llegada);
    const numDias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return numDias || 0;
};

/**
 * Calcula el total de servicios adicionales seleccionados
 * 
 * @param {Array} servicios - Array de IDs de servicios seleccionados
 * @param {Array} additionalServices - Lista completa de servicios disponibles
 * @returns {number} Precio total de los servicios adicionales
 */
const calculateAdditionalServicesTotal = (servicios, additionalServices) => {
    if (!servicios || !servicios.length) return 0;

    let total = 0;
    servicios.forEach(servicioId => {
        const servicio = additionalServices.find(s => s.id === servicioId);
        if (servicio) {
            total += servicio.price;
        }
    });
    return total;
};

// Exportaciones nombradas, no utilizar export default
export {
    calculateReservationPrice,
    calculateDuration,
    calculateAdditionalServicesTotal
};