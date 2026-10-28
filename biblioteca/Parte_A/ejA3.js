const notas = [7.5, 4.9, 10, 5, 6.25, 3, 8.8, 11, 9];
let aux = 0;
let x = 0;
let notamax = 0.0, cont = 0, aprobados = 0;
let media = 0.0;

for (x = 0; x < notas.length; x++)
{
    const notaActual = notas[x];
    cont++;

    if (notaActual < 5.0) {
        console.log("Alumno " + cont, notaActual, "→ Insuficiente");
    } else if (notaActual >= 5 && notaActual < 6) {
        console.log("Alumno " + cont, notaActual, "→ Suficiente");
    } else if (notaActual >= 6 && notaActual < 7) {
        console.log("Alumno " + cont, notaActual, "→ Bien");
    } else if (notaActual >= 7 && notaActual < 9) {
        console.log("Alumno " + cont, notaActual, "→ Notable");
    } else if (notaActual >= 9 && notaActual <= 10) {
        console.log("Alumno " + cont, notaActual, "→ Sobresaliente");
    } else {
        console.log("Alumno " + cont, notaActual, "→ Nota no válida");
    }
}

for(const nota of notas)
{
    if(nota > 0.0 && nota <= 10.0)
    {
        media = media + nota;
        cont ++;
    }

    if(nota >= 5.0 && nota <= 10.0)
    {
        aprobados++
    }

    if (notamax < nota)
    {
        notamax = nota;
    }
}

console.log("Aprobados = " + aprobados);
console.log("Media = " + media /cont);
console.log("Nota más alta = " + notamax);
