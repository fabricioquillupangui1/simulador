
function calcular() {
    // 1. Leer valores de entrada (ingresos y egresos como float)
    let ingresos = parseFloat(document.getElementById("txtIngresos").value) || 0;
    let egresos = parseFloat(document.getElementById("txtEgresos").value) || 0;

    // 2. Calcular disponible y mostrar en pantalla (Paso 2 y 3)
    let disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").textContent = "USD " + disponible.toFixed(2);

    //Calcular capacidad de pago y mostrar en pantalla (Paso 4 y 5)
    let capacidadPago = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").textContent = "USD " + capacidadPago.toFixed(2);

    let monto = parseInt(document.getElementById("txtMonto").value) || 0;
    let plazoAnios = parseInt(document.getElementById("txtPlazo").value) || 0;
    let tasa = parseInt(document.getElementById("txtTasaInteres").value) || 0;

    let interes = calcularInteresSimple(monto, tasa, plazoAnios);
    document.getElementById("spnInteresPagar").textContent = interes.toFixed(2);

    //Calcular total a pagar y mostrar 
    let totalPagar = calcularTotalPagar(monto, interes);
    document.getElementById("spnTotalPrestamo").textContent = totalPagar.toFixed(2);

}