function calcularDisponible(ingresos, egresos) {
    let disponible = ingresos - egresos;
    if (disponible < 0) {
        return 0;
    }
    return disponible;
}

//Calcular capacidad de pago (50% del disponible)
function calcularCapacidadPago(montoDisponible) {
    return montoDisponible * 0.50;
}
