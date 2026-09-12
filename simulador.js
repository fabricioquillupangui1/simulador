function validarFormulario() {
    let valido = true;

    // Recuperar valores en formato texto para validar vacíos
    let ingresosVal = document.getElementById("txtIngresos").value.trim();
    let egresosVal = document.getElementById("txtEgresos").value.trim();
    let montoVal = document.getElementById("txtMonto").value.trim();
    let plazoVal = document.getElementById("txtPlazo").value.trim();
    let tasaVal = document.getElementById("txtTasaInteres").value.trim();

    // Limpiar errores previos
    document.getElementById("errorIngresos").textContent = "";
    document.getElementById("errorEgresos").textContent = "";
    document.getElementById("errorMonto").textContent = "";
    document.getElementById("errorPlazo").textContent = "";
    document.getElementById("errorTasa").textContent = "";

    // 1. Validar Ingresos
    if (ingresosVal === "") {
        document.getElementById("errorIngresos").textContent = "El campo de ingresos es obligatorio.";
        valido = false;
    } else if (isNaN(ingresosVal) || parseFloat(ingresosVal) < 0) {
        document.getElementById("errorIngresos").textContent = "Ingrese un valor numérico válido mayor o igual a 0.";
        valido = false;
    }

    // 2. Validar Egresos
    if (egresosVal === "") {
        document.getElementById("errorEgresos").textContent = "El campo de egresos es obligatorio.";
        valido = false;
    } else if (isNaN(egresosVal) || parseFloat(egresosVal) < 0) {
        document.getElementById("errorEgresos").textContent = "Ingrese un valor numérico válido mayor o igual a 0.";
        valido = false;
    }

    // 3. Validar Monto del Crédito
    if (montoVal === "") {
        document.getElementById("errorMonto").textContent = "El monto del préstamo es obligatorio.";
        valido = false;
    } else if (isNaN(montoVal) || parseFloat(montoVal) <= 0) {
        document.getElementById("errorMonto").textContent = "El monto debe ser mayor a 0.";
        valido = false;
    } else if (parseFloat(montoVal) > 100000) {
        document.getElementById("errorMonto").textContent = "El monto máximo permitido es $100,000.";
        valido = false;
    }

    // 4. Validar Plazo en años
    if (plazoVal === "") {
        document.getElementById("errorPlazo").textContent = "El plazo en años es obligatorio.";
        valido = false;
    } else if (isNaN(plazoVal) || parseInt(plazoVal) <= 0) {
        document.getElementById("errorPlazo").textContent = "El plazo debe ser un número entero mayor a 0.";
        valido = false;
    } else if (parseInt(plazoVal) > 30) {
        document.getElementById("errorPlazo").textContent = "El plazo máximo permitido es de 30 años.";
        valido = false;
    }

    // 5. Validar Tasa de Interés
    if (tasaVal === "") {
        document.getElementById("errorTasa").textContent = "La tasa de interés es obligatoria.";
        valido = false;
    } else if (isNaN(tasaVal) || parseFloat(tasaVal) <= 0) {
        document.getElementById("errorTasa").textContent = "La tasa debe ser mayor a 0%.";
        valido = false;
    } else if (parseFloat(tasaVal) > 50) {
        document.getElementById("errorTasa").textContent = "La tasa de interés no puede superar el 50%.";
        valido = false;
    }

    return valido;
}

function calcular() {
    // Validar antes de procesar el cálculo
    if (!validarFormulario()) {
        return; // Detiene el flujo si hay errores
    }

    // 1. Leer valores de entrada convertidos
    let ingresos = parseFloat(document.getElementById("txtIngresos").value) || 0;
    let egresos = parseFloat(document.getElementById("txtEgresos").value) || 0;

    // 2. Calcular disponible y mostrar en pantalla
    let disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").textContent = "USD " + disponible.toFixed(2);

    // 3. Calcular capacidad de pago y mostrar en pantalla
    let capacidadPago = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").textContent = "USD " + capacidadPago.toFixed(2);

    let monto = parseInt(document.getElementById("txtMonto").value) || 0;
    let plazoAnios = parseInt(document.getElementById("txtPlazo").value) || 0;
    let tasa = parseFloat(document.getElementById("txtTasaInteres").value) || 0;

    let interes = calcularInteresSimple(monto, tasa, plazoAnios);
    document.getElementById("spnInteresPagar").textContent = interes.toFixed(2);

    // 4. Calcular total a pagar y mostrar 
    let totalPagar = calcularTotalPagar(monto, interes);
    document.getElementById("spnTotalPrestamo").textContent = totalPagar.toFixed(2);

    // 5. Calcular cuota mensual y mostrar
    let cuotaMensual = calcularCuotaMensual(totalPagar, plazoAnios);
    document.getElementById("spnCuotaMensual").textContent = cuotaMensual.toFixed(2);

    // 6. Analizar y aprobar/rechazar crédito
    let esAprobado = aprobarCredito(capacidadPago, cuotaMensual);
    let lblEstado = document.getElementById("spnEstadoCredito");

    if (esAprobado) {
        lblEstado.textContent = "CREDITO APROBADO";
        lblEstado.style.color = "#22c55e"; // Verde éxito
    } else {
        lblEstado.textContent = "CREDITO RECHAZADO";
        lblEstado.style.color = "#ef4444"; // Rojo alerta
    }
}

function reiniciar() {
    // Limpiar cajas de texto (inputs)
    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtEgresos").value = "";
    document.getElementById("txtMonto").value = "";
    document.getElementById("txtPlazo").value = "";
    document.getElementById("txtTasaInteres").value = "";

    // Limpiar mensajes de error
    document.getElementById("errorIngresos").textContent = "";
    document.getElementById("errorEgresos").textContent = "";
    document.getElementById("errorMonto").textContent = "";
    document.getElementById("errorPlazo").textContent = "";
    document.getElementById("errorTasa").textContent = "";

    // Limpiar etiquetas de resultados (spans)
    document.getElementById("spnDisponible").textContent = "";
    document.getElementById("spnCapacidadPago").textContent = "";
    document.getElementById("spnInteresPagar").textContent = "";
    document.getElementById("spnTotalPrestamo").textContent = "";
    document.getElementById("spnCuotaMensual").textContent = "";

    // Restablecer el estado del crédito
    let lblEstado = document.getElementById("spnEstadoCredito");
    lblEstado.textContent = "ANALIZANDO...";
    lblEstado.style.color = ""; 
}