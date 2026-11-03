function transformar(array, fn){
    const resultado = [];
    let i = 0;

    for (i = 0; i < array.length; i++){
        resultado.push(fn(array[i]));
    }
    return resultado;
}

function quedarse(array, condicion){
    const resultado = [];
    let i = 0;

    for (i = 0; i < array.length; i++){
        if(condicion(array[i])){
            resultado.push(array[i]);
        }
    }
    return resultado;
}

const numeros = [3,8,1,6];

const duplicados = transformar(numeros, n => n*2);

const pares = quedarse(duplicados, n => n%2 === 0);

console.log(pares);

//Apartado 4 

const resultado = numeros.map.filter(n => n % 2 === 0);

console.log(resultado);

/*Tanto las funciones como los metodos, actúan como funciones de orden superior ya que encapsulan la logica repetitiva de recorrer un array
 y devolver uno nuevo el cual es independiente y al que se le pueden delegar reglas especificas de transformación o filtrado*/
