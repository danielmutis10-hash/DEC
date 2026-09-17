console.log("\n--- Ejercicio 2 ---");

// a) Dentro de un bloque if (true) { ... }, declara "mensaje" con var
//    y asÃ­gnale un texto. Intenta usar console.log(mensaje) FUERA
//    del bloque. Â¿QuÃ© ocurre?
// TODO

if(true){
    var mensaje = "Hola con var";
}

console.log(mensaje);

// b) Repite el mismo experimento pero declarando "mensaje2" con let
//    dentro del bloque. Â¿QuÃ© diferencia observas al intentar
//    usarla fuera del bloque? (usa try/catch o comÃ©ntalo si da error)
// TODO

if(true){
    let mensaje2 = "Hola con let";
}
try {
    console.log(mensaje2);

} catch (e) {
    console.log("Error al leer", e.message);
}

/*A diferencia de var que si nos da la respuesta que nosotros asignamos, notamos que
con let el comando nos arroja un error al momento de ejecutar*/