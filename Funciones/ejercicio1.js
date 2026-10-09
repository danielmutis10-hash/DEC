function sumar(a, b) {
  return a + b;
}

function restar(a, b) {
  return a - b;
}

function multiplicar(a, b) {
  return a * b;
}

let opc = "";

let x = Number(prompt("Dame un número para operar \n"));
let y = Number(prompt("Ahora otro número \n"));

do {
  opc = prompt("Que quieres hacer con los números?\n+ : sumar\n- : Restar\n* : Multiplicar\n. : Salir");

  switch (opc) 
  {
    case "+":
      alert(sumar(x, y));
      break;
    case "-":
      alert(restar(x, y));
      break;
    case "*":
      alert(multiplicar(x, y));
      break;
    case ".":
      alert("Finalizado");
      break;
    default:
      alert("Opción no válida");
  }
} while (opc !== ".");





