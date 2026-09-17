console.log("\n--- Ejercicio 13 ---");

// a) Compara el nÃºmero 5 con el string "5" usando == y luego ===.
//    Muestra ambos resultados y comenta la diferencia.
// TODO

console.log(5 == "5");  // true. Compara solo el valor (convierte el string a número)
console.log(5 === "5"); // false. Compara valor y tipo de dato (number vs string)

// b) Compara null == undefined y null === undefined. Comenta el resultado.
// TODO

console.log(null == undefined);  // true. JavaScript los considera equivalentes en igualdad débil
console.log(null === undefined); // false. Tienen tipos distintos (object/null vs undefined)

// c) Comprueba si "10" > "9" (ambos strings). Â¿El resultado te
//    sorprende? ComÃ©ntalo (pista: se comparan alfabÃ©ticamente).
// TODOS

console.log("10" > "9"); // false ya que al ser strings, compara el primer carácter ("1" vs "9")