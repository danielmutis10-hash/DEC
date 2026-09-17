if(true){
    var mensaje = "Hola con var";
    let msg = "Hola con let";
}
try {
console.log(mensaje);
console.log(msg);

} catch (e) {
    console.log("Error al leer", e.message);
}
