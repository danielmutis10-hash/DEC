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

let a = 0, b = 0;
let opc = "";
let x = "", y = "";

x = Number(prompt("Dame un número para sumar \n:"));
y = Number(prompt("Ahora otro número \n:"));

do{
    console.log("Que quieres hacer con los números?"
                ,"\n+:sumar"
                ,"\n-:Restar"
                ,"\n*:Multiplicar"
                ,"\n.:Salir");
    opc = prompt(":");

    switch(opc)
    {
    case "+":
        console.log(sumar(x,y));
        break;
    case "-":
        console.log(restar(x,y));
        break;
    case "*":
        console.log(multiplicar(a,b));
        break;
    case ".":
        console.log("Finalizado");
        break;
    }
}while(opc != ".");



