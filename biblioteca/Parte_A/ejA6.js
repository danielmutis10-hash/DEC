function mediaAprobados(notas) {
    let suma = 0;
    let contador = 0;
    for (let i = 0; i <= notas.length; i++) {
        if (notas[i] > 5) {
            suma += notas[i];
            contador++;
        }
    }
    return suma / notas.length;
} 

console.log(mediaAprobados(["7", 4, 5, 9.5, 3])); // Esperado: 7.17 aprox. 

/*Linea             Error                   Cómo lo detectaste                      Corrección
  
  Linea 4           Bucle con <=            Al depurar paso a paso, en el           Cambiarlo por <
                                            ultimo recorrido i es igual a
                                            lenght, por lo que notas[i] nos dá
                                            undefined

  Linea 5           Condición aprobados     Al revisar el array el 5 entero se      Cambiar a >=
                    >5                      ignora ya que no es estrictamente                   
                                            mayor cuando un 5 es aprobado
                                            
  Linea 4           Datos mixtos en el      Si se realiza type of suma, se hace     Convertir a números los elementos
                    array ("7")             una concatenación debido a que el       Number(notas[i] o parseFloat) por los decimales
                                            primer elemento en el array es una 
                                            cadena ("7")
                                            
  Linea 10          Retorno dividido        Al ver el resultado final, divide       Cambiar notas.lenght por la variable contador
                    entre notas.lenght      entre el total de elementos del array
                    total                   en lugar de dividir entre el número de 
                                            aprobados (contador)                                                                    */


//Apartado 3