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
