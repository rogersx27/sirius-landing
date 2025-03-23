"use client"
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";

export default function ReservationSummary({
    summaryData,
    isCourse,
    currentReservationType,
    availableActivities,
    additionalServices,
    calculatePrice,
    onBack,
    onFinish,
    isSubmitting
}) {
    // Usar useMemo para cálculos costosos y evitar renders innecesarios
    const duration = useMemo(() => {
        if (!summaryData?.fechaLlegada || !summaryData?.fechaSalida) return 0;

        const llegada = new Date(summaryData.fechaLlegada);
        const salida = new Date(summaryData.fechaSalida);
        const diffTime = Math.abs(salida - llegada);
        const numDias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return numDias || 0;
    }, [summaryData?.fechaLlegada, summaryData?.fechaSalida]);

    const additionalServicesTotal = useMemo(() => {
        if (!summaryData?.serviciosAdicionales || !summaryData.serviciosAdicionales.length) return 0;

        let total = 0;
        summaryData.serviciosAdicionales.forEach(servicioId => {
            const servicio = additionalServices.find(s => s.id === servicioId);
            if (servicio) {
                total += servicio.price;
            }
        });
        return total;
    }, [summaryData?.serviciosAdicionales, additionalServices]);

    // No seguir renderizando si no hay datos
    if (!summaryData) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Resumen de tu {isCourse ? "inscripción" : "reserva"}</CardTitle>
                <CardDescription>
                    Por favor verifica los detalles antes de confirmar
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium mb-2">Datos personales</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-muted-foreground">Nombre completo:</div>
                        <div>{summaryData.nombre} {summaryData.apellido}</div>

                        <div className="text-muted-foreground">Email:</div>
                        <div>{summaryData.email}</div>

                        <div className="text-muted-foreground">Teléfono:</div>
                        <div>{summaryData.telefono}</div>
                    </div>
                </div>

                <Separator />

                <div>
                    <h3 className="text-lg font-medium mb-2">Detalles de la {isCourse ? "inscripción" : "reserva"}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-muted-foreground">Tipo:</div>
                        <div>{currentReservationType.name}</div>

                        {isCourse ? (
                            <>
                                <div className="text-muted-foreground">Curso:</div>
                                <div>
                                    {availableActivities.find(a => a.id === summaryData.tipoActividad)?.name || summaryData.tipoActividad}
                                </div>

                                <div className="text-muted-foreground">Fecha del curso:</div>
                                <div>
                                    {summaryData.fechaCurso ? format(new Date(summaryData.fechaCurso), "PPP", { locale: es }) : "No seleccionada"}
                                </div>

                                <div className="text-muted-foreground">Nivel de experiencia:</div>
                                <div className="capitalize">
                                    {summaryData.nivelExperiencia || "No especificado"}
                                </div>

                                {summaryData.dietaEspecial && (
                                    <>
                                        <div className="text-muted-foreground">Dieta especial:</div>
                                        <div>{summaryData.tipoDieta || "Sí (no especificada)"}</div>
                                    </>
                                )}

                                {summaryData.necesidadesEspeciales && (
                                    <>
                                        <div className="text-muted-foreground">Necesidades especiales:</div>
                                        <div>{summaryData.necesidadesEspeciales}</div>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="text-muted-foreground">Tipo de alojamiento:</div>
                                <div>
                                    {availableActivities.find(a => a.id === summaryData.tipoActividad)?.name || "No seleccionado"}
                                </div>

                                <div className="text-muted-foreground">Fecha de llegada:</div>
                                <div>
                                    {summaryData.fechaLlegada ? format(new Date(summaryData.fechaLlegada), "PPP", { locale: es }) : "No seleccionada"}
                                </div>

                                <div className="text-muted-foreground">Fecha de salida:</div>
                                <div>
                                    {summaryData.fechaSalida ? format(new Date(summaryData.fechaSalida), "PPP", { locale: es }) : "No seleccionada"}
                                </div>

                                <div className="text-muted-foreground">Número de personas:</div>
                                <div>{summaryData.numeroPersonas} {parseInt(summaryData.numeroPersonas) === 1 ? "persona" : "personas"}</div>

                                {summaryData.serviciosAdicionales && summaryData.serviciosAdicionales.length > 0 && (
                                    <>
                                        <div className="text-muted-foreground">Servicios adicionales:</div>
                                        <div>
                                            <ul className="list-disc list-inside">
                                                {summaryData.serviciosAdicionales.map(servicioId => {
                                                    const servicio = additionalServices.find(s => s.id === servicioId);
                                                    return (
                                                        <li key={servicioId}>
                                                            {servicio ? servicio.name : servicioId} {servicio && <span className="text-muted-foreground text-sm">(+{servicio.price}€)</span>}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </>
                                )}

                                {summaryData.comentarios && (
                                    <>
                                        <div className="text-muted-foreground">Comentarios:</div>
                                        <div>{summaryData.comentarios}</div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <Separator />

                <div>
                    <h3 className="text-lg font-medium mb-4">Resumen de precio</h3>
                    <div className="bg-muted p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-muted-foreground">Precio base:</span>
                            <span>{currentReservationType.basePrice}€</span>
                        </div>

                        {!isCourse && summaryData.fechaLlegada && summaryData.fechaSalida && (
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-muted-foreground">Duración:</span>
                                <span>{duration} {duration === 1 ? "noche" : "noches"}</span>
                            </div>
                        )}

                        {!isCourse && summaryData.serviciosAdicionales && summaryData.serviciosAdicionales.length > 0 && (
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-muted-foreground">Servicios adicionales:</span>
                                <span>+{additionalServicesTotal}€</span>
                            </div>
                        )}

                        <Separator className="my-2" />

                        <div className="flex justify-between items-center font-semibold text-lg mt-3">
                            <span>Total:</span>
                            <span>{calculatePrice ? calculatePrice(summaryData) : 0}€</span>
                        </div>
                    </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg mt-6">
                    <h4 className="font-medium mb-2">Política de cancelación</h4>
                    <p className="text-sm text-muted-foreground">
                        Cancelación gratuita hasta 7 días antes de la {isCourse ? "fecha del curso" : "fecha de llegada"}.
                        Cancelaciones posteriores tendrán un cargo del 50% del precio total.
                    </p>
                </div>
            </CardContent>

            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={onBack} type="button">
                    Volver al formulario
                </Button>
                <Button onClick={onFinish} disabled={isSubmitting} type="button">
                    {isSubmitting ? "Procesando..." : "Confirmar y pagar"}
                </Button>
            </CardFooter>
        </Card>
    );
}