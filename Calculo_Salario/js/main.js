function calcularSalario() {
  // Leer datos
  let nombre = document.getElementById("nombre").value;
  let apellidos = document.getElementById("apellidos").value;
  let salario = parseFloat(document.getElementById("salario").value);
  let edad = parseInt(document.getElementById("edad").value);

  let nuevoSalario = salario;

  if (salario > 2000){
    //si el salario se mantiene por encima de los 2000 o es superior no hacer nada
    nuevoSalario = salario;
  } else if (salario >= 1000 && salario <= 2000){
    // Si el salario está entre 1000 y 2000
    if (edad > 45) {
      // Mayor de 45, sube un 3%
      nuevoSalario = salario * 1.03;
    } else {
      // Edad menor de 45 =, sube un 10%
      nuevoSalario = salario * 1.1;
    }
  } else if (salario < 1000) {
    // Si el salario es menor de 1000
    if (edad < 30) {
      // Menores de 30 años cobrarán exactamente 1100 euros
      nuevoSalario = 1100;
    } else if (edad >= 30 && edad <= 45) {
      // De 30 a 45 años: sube un 3%
      nuevoSalario = salario * 1.03;
    } else if (edad > 45) {
      // Mayores de 45 años: sube un 15%
      nuevoSalario = salario * 1.15;
    }
  }

  // Mostrar el resultado en el documento de forma básica
    let divResultado = document.getElementById("resultado");
    divResultado.style.display = "block";//uso de css dentro del script
    //uso de html para el final del script y que esté dentro del html
    divResultado.innerHTML = "<h3>Resultado:</h3>" +
        "<p><strong>Nombre completo:</strong> " + nombre + " " + apellidos + "</p>" +
        "<p><strong>Edad:</strong> " + edad + " años</p>" +
        "<p><strong>Salario recalculado:</strong> " + nuevoSalario + " €</p>";
}
