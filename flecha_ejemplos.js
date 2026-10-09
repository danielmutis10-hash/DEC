function cuadrado1(n)
{
    return n*n;
}
//Paso 1: Guardar la función en uan constante
const cuadrado2 = function (n)
{
    return n*n;
}

//Paso 2: Quitamos "function"
const cuadrado3 = (n) =>
{
    return n*n;
};

//Paso 3: Si es solo una expresión quitamos llaves y return
const cuadrado4 = (n) => n*n;

//Con un solo parámetro le puedo quitar los parentesis

const cuadrado5 = (n) => n*n;
console.log(cuadrado1(4),cuadrado2(4),cuadrado3(4),cuadrado5(4));

//Cuerpo con varias sentencias : llaves y return obligatorios

const calificar = notas =>
{
    if (notas<5)return "suspenso";
    if (notas>=5)return "aprobado";
}
console.log(calificar(4));

const resta = (a,b)=>
{
    return a-b;
};