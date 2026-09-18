console.log("\n--- Ejercicio 15 ---");

// a) Crea un objeto "persona1" con const y con las propiedades
//    nombre y edad. Modifica despuÃ©s el valor de "edad" directamente
//    (Â¿te deja hacerlo aunque sea const?). Muestra el objeto final.
// TODO

const persona1 = {nombre: "Carlos", edad: 20};
persona1.edad = 21;
console.log(persona1);

// b) Crea "persona2" con el MISMO contenido que persona1 (otro objeto
//    distinto) y compara persona1 === persona2. Comenta el resultado.
// TODO

const persona2 = {nombre: "Carlos", edad: 21};
console.log(persona1 === persona2);

// c) Crea "persona3 = persona1" (misma referencia) y compara
//    persona1 === persona3. Comenta la diferencia con el apartado b).
// TODO

const persona3 = persona1;
console.log(persona1 === persona3);
