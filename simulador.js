
function calcular() {
    // 1. Leer valores de entrada (ingresos y egresos como float)
    let ingresos = parseFloat(document.getElementById("txtIngresos").value) || 0;
    let egresos = parseFloat(document.getElementById("txtEgresos").value) || 0;

    // 2. Calcular disponible y mostrar en pantalla (Paso 2 y 3)
    let disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").textContent = "USD " + disponible.toFixed(2);

    
}