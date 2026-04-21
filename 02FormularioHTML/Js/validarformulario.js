function validar(formulario){
    if(formulario.nombre.value.length<=3){
        alert("El campo nombre no puede estar vacio o tener menos de 3 caracteres");
        formulario.nombre.focus();
        return false;
    }
    var abcOK="ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚÜ ";
    var cadena=formulario.nombre.value.toUpperCase();

    var chechString= formulario.nombre.value;

    var allValid=true;
    for(var i=0; i<checkString.length;i++){
        var caracteres=checkString.charAt(i);
      for(var j=0; j<abcOK.length;j++){
          if(caracteres==abcOK.charAt(j)){
              break;
          }
      }
      if(j==abcOK.length){
          allValid=false;
          break;
      }
    }
    if(!allValid){
        alert("El campo nombre solo acepta letras");
        formulario.nombre.focus();
        return false;
    }

 var abcOK="1234567890";

    var chechString= formulario.edad.value;

    var allValid=true;
    for(var i=0; i<checkString.length;i++){
        var caracteres=checkString.charAt(i);
      for(var j=0; j<abcOK.length;j++){
          if(caracteres==abcOK.charAt(j)){
              break;
          }
      }
      if(j==abcOK.length){
          allValid=false;
          break;
      }
    }
    if(!allValid){
        alert("El campo edad solo acepta números");
        formulario.edad.focus();
        return false;
    }
    var correoelectronico= /^[^@\s]+[^@\.\s]+(\.[^@\.\s]+)$/;
    var txt = formulario.email.value;
    alert("Email " + (correoelectronico.test(txt)?"":"no ") + "válido");



}