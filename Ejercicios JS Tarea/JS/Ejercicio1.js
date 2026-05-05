function calcularCapital(formulario1){
    var capital = parseFloat(formulario1.capital.value);
    var meses = parseInt(formulario1.meses.value);

    // Validación de capital
    if(isNaN(capital) || capital < 1000 || capital > 500000){
        alert("Solo se permiten montos entre $1,000 y $500,000");
        return false;
    }

    // Validación de meses
    if(isNaN(meses)){
        alert("Por favor, seleccione un plazo");
        return false;
    }

    // Cálculo
    var ganancia = (capital * 0.02) * meses;
    var cantidadTotal = capital + ganancia;

    // Resultado
    document.getElementById("resultado").innerHTML =
        "Ganancia en " + meses + " mes(es): $" + ganancia.toFixed(2) +
        "<br>Total después de " + meses + " mes(es): $" + cantidadTotal.toFixed(2);

    return false;
}