console.log("\n--- Ejercicio 4 ---");

// a) Declara una variable de texto en minÃºsculas y usa el mÃ©todo
//    .toUpperCase() sobre ella directamente (sin guardar el resultado
//    en una variable intermedia). Muestra el resultado.
// TODO

let texto = "hola mundo"
console.log(texto.toUpperCase());

// b) En un comentario, explica con tus palabras por quÃ© esto
//    funciona si un string no es un objeto.
// TODO (comentario explicativo)

/* Esto se debe al modo de auto guardado que realiza el propio mecanismo de javaScript.
Esto hace que los sistemas primitivos como los String sean guardados en una variable temporal
para luego destruir el contenido anterior y reemplazarlo por el nuevo en esta caso con 
mayusculas*/