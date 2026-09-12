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

//Calcular total a pagar (monto + interes + 100 por impuestos/SOLCA)
function calcularTotalPagar(monto, interes) {
    return monto + interes + 100;
}

function calcularCuotaMensual(total, plazoAnios) {
    let meses = plazoAnios * 12;
    if (meses === 0) return 0;
    return total / meses;
}

//Aprobar crédito 
function aprobarCredito(capacidadPago, cuotaMensual) {
    if (capacidadPago > cuotaMensual) {
        return true;
    } else {
        return false;
    }
}


function reiniciar() {
    // Limpiar cajas de texto (inputs)
    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtEgresos").value = "";
    document.getElementById("txtMonto").value = "";
    document.getElementById("txtPlazo").value = "";
    document.getElementById("txtTasaInteres").value = "";

    // Limpiar etiquetas de resultados (spans)
    document.getElementById("spnDisponible").textContent = "";
    document.getElementById("spnCapacidadPago").textContent = "";
    document.getElementById("spnInteresPagar").textContent = "";
    document.getElementById("spnTotalPrestamo").textContent = "";
    document.getElementById("spnCuotaMensual").textContent = "";

    // Restablecer el estado del crédito
    let lblEstado = document.getElementById("spnEstadoCredito");
    lblEstado.textContent = "ANALIZANDO...";
    lblEstado.style.color = ""; // Vuelve al color por defecto del CSS
}
