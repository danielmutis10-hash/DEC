function sumar(a,b)
{
    return a+b;
}

function restar(a,b)
{
    return a-b;
}

function multiplicar (a,b)
{
    return a*b;
}

let opc = "";

let x = Number(prompt("Dame un número para sumar \n:"));
let y = Number(prompt("Ahora otro número \n:"));


opc = prompt("Que quieres hacer con los números? \n+:sumar \n-:Restar \n*:Multiplicar \n.:Salir");    

switch(opc)
{
case "+":
    console.log(sumar(x,y));
    break;
case "-":
    console.log(restar(x,y));
    break;
case "*":
    console.log(multiplicar(x,y));
    break;
case ".":
    console.log("Finalizado");
    break;
}





