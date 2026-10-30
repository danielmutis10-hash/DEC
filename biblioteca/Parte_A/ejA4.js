const inscripciones = [
 "ana@ies.es", "luis@ies.es", "ANA@ies.es", "marta@ies.es",
 "luis@ies.es", "pablo@ies.es", "Marta@ies.es"
];
let correo;
let normalizado;


const correoNoRepetir1 = new Set(inscripciones);
console.log(correoNoRepetir1);
console.log("Cantidad: ", correoNoRepetir1.size);

//1. Aparecen los 6 correos y cuenta como cantidad 6 ya que JavaScript distingue entre mayusculas y minusculas.

const correoNoRepetir2 = new Set();

for(correo of inscripciones){
    correoNoRepetir2.add(correo.toLowerCase());
}

console.log(correoNoRepetir2);
console.log("Cantidad: ", correoNoRepetir2.size);

//Apartado 3
const contMap = new Map();

for(correo of inscripciones){
    normalizado = correo.toLowerCase();

    contMap.set(normalizado, (contMap.get(normalizado)|| 0) + 1);
}

for(const [correo, veces] of contMap){
    console.log(`${correo} -> ${veces}`);
}

//Apartado 4

const arrayOrdenado = [correoNoRepetir2].sort();

console.log(arrayOrdenado);