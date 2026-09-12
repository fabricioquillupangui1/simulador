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

//Calcular interés simple (plazoAnios * monto * (tasa / 100))
function calcularInteresSimple(monto, tasa, plazoAnios) {
    let interes = plazoAnios * monto * (tasa / 100);
    return interes;
}
