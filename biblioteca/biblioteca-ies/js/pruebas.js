"use strict";

// Pruebas unitarias con console.assert y console.table (R10)

// R1: valoracionMedia
console.assert(valoracionMedia({ valoraciones: [5, 4, 5] }) === 4.7, "R1 falló en caso normal");
console.assert(valoracionMedia({ valoraciones: [] }) === null, "R1 falló en libro sin valoraciones");

// fallo a proposito para prueba
console.assert(valoracionMedia({valoraciones:[5, 4, 5]}) === 9.9, " La valoración media no coincide con 9.9");

// R2: librosDisponibles
const disp = librosDisponibles(LIBROS);
console.assert(disp.length === 8, "falló: deben ser 8 libros disponibles");
console.table(disp);

//fallo forzado
console.assert(disp.length === 99, "Debería haber 99 disponibles pero hay 8");


// R3: librosEntre
console.assert(librosEntre(LIBROS, "1950", "1960").length === 4, "R3 falló con años en formato texto");
console.assert(librosEntre(LIBROS, "abc", 2000).length === 0, "R3 falló con año no válido");
console.assert(librosEntre(LIBROS, 2000, 1950).length === 0, "R3 falló cuando 'desde' es mayor que 'hasta'");

// R4: generos
const gens = generos(LIBROS);
console.assert(gens.length === 5, "R4 falló: el número de géneros debe ser 5");
console.assert(gens[0] === "Ciencia ficción", "R4 falló: el primer género ordenado debe ser Ciencia ficción");

// R5: librosPorAutor
const porAutor = librosPorAutor(LIBROS);
console.assert(porAutor.get("Isaac Asimov") === 2, "R5 falló: Isaac Asimov debe acumular 2 libros");

// R6: ranking
const top3 = ranking(LIBROS, 3);
console.assert(top3.length === 3, "R6 falló: debe devolver exactamente 3 elementos");
console.assert(top3[0].titulo === "Matilda", "R6 falló: el primer puesto del ranking debe ser Matilda");

// R7: resumen
const resObj = resumen(LIBROS);
console.assert(resObj.total === 13, "R7 falló en el total de libros");
console.assert(resObj.prestados === 5, "R7 falló en la cuenta de prestados");
console.assert(resObj.masAntiguo === "La Celestina", "R7 falló en la identificación del libro más antiguo");

console.log("¡Todas las pruebas automatizadas de pruebas.js han pasado correctamente!");