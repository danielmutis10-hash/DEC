const gastosEnvio = 5;
let total = 0;
const descuento = 10;
function calcularTotal(precio, unidades) {
    total = precio * unidades + gastosEnvio;
    if (total > 50) {
        total = total - descuento;
    }
    console.log("Dentro:", total);
    return total;
}
calcularTotal(20, 3);
console.log("Fuera:", total);
console.log(descuento);

/*1. 
- Dentro, realizaría la operación tanto con el precio como con la unidades ya que supera la condicion if
- Fuera ya que no tiene una variable para definir la función de calcular, devolvera 0, sin embargo estando fuera cambiaría
- descuento nos da un fallo ya que la variable esta definida dentro del bucle, por lo que no tiene un valor de retorno 
*/

/*
2. Total vale distinto ya que su variable expone 0 fuera de la condición,
el valor de retorno dentro de la función si está definida por lo que en pantalla expone el valor de dentro
sin embargo en fuera solo pone 0, esto se debe a que no alteramos el valor de fuera pero el de adentro si.
*/

/*
3.Produce un error de variable no definida ya que en la parte externa nisiquiera se ha creado esta variable descuento
*/

/*
4.Fuera adquiere el valor de dentro ya que el valor de la memoria interna no es alterada una vez finaliza la función
*/

/*
5.El programa falla ya que gastosEnvio es una variable contante y que no cambia, pero que en esta ocasión se 
está alterando su valor en otra linea a la suya. 
*/


