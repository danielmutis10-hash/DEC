console.log("\n--- Ejercicio 9 ---");

// a) Declara "nombre" y "cursoActual" (nÃºmero), y construye con una
//    plantilla de string un mensaje: "Hola <nombre>, estÃ¡s en 2Âº de <curso>"
// TODO

let nombre = "Daniel";
let cursoActual = 2;
let curso = "DAW";

console.log(`Hola ${nombre}, estás en ${cursoActual} de ${curso}`);

// b) Dentro de otra plantilla, incluye una expresiÃ³n matemÃ¡tica,
//    por ejemplo el curso siguiente (cursoActual + 1).
// TODO

if (cursoActual + 1 > 2)
{
    console.log("El próximo año ya estarás graduado") //Ya que no existe 3 daw
}
else
{
    console.log(`El próximo año estarás en ${cursoActual + 1} de ${curso}`);
}