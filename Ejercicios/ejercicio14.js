console.log("\n--- Ejercicio 14 ---");

// a) Declara "usuario" con el valor null, y usa || para asignar
//    "nombreMostrado" con "usuario" si existe o "Invitado" si no.
// TODO

let usuario = null;
let nombreMostrado = usuario || "invitado";

console.log(nombreMostrado);

// b) Usa && para mostrar un texto solo si una variable booleana

let sesionIniciada = true;

sesionIniciada && console.log("Bienvenido");

// c) Usa ! para invertir el valor de una variable booleana y muÃ©stralo.
// TODO

console.log(!sesionIniciada);