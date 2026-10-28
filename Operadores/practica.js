let edad = 17;
let tieneConsentimiento = true;

let puedeRegistrarse = edad >= 18 || (edad >= 14 && tieneConsentimiento);
console.log(puedeRegistrarse);