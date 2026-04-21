function validarn(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;

    // Solo números y punto decimal
    var patron = /[0-9.]/;
    var prueba = String.fromCharCode(teclado);
    return patron.test(prueba);
}

function interes() {
    var valor = document.getElementById("cantidadi").value;
    var cantidad = parseFloat(valor);

    if (isNaN(cantidad)) {
        alert("Ingresa un número válido");
        return;
    }

    var total = cantidad * 1.1;
    document.getElementById("sueldo1").value = "$ " + total.toFixed(2);
}

function borrar() {
    document.getElementById("cantidadi").value = "";
    document.getElementById("sueldo1").value = "";
}