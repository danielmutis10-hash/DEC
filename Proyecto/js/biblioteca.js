import { Libro } from "./libro.js";

export class Biblioteca{

    //Constructor

    constructor(){
        this.libros = [];
    }

    agregar(libro){//Agregar un libro a la biblioteca de libros
        if(!(libro instanceof Libro)){ //En caso de que el libro ya este, devuelve false
            return false;
        }
        this.libros.push(libro); //Agregacion del libro al array de libros
        return true;
    }

    cargarDesdeTexto(texto){
        const lineas = texto.split("\n");
        let anadidos = 0;
        for(const l of lineas){
            if(l.trim() === ""){
                continue;
            }

            const cachitos = l.split(";");//Separación de los campos dentro de un array llamado cachitos

            const titulo = cachitos[0].trim();
            const autor = cachitos[1].trim();
            const anio = Number(cachitos[2]);
            const paginas = Number(cachitos[3]);
            const genero = cachitos[4].trim();
            const disponible = cachitos[5].trim().toLowerCase() === "si";

            if(this.agregar(new Libro(titulo, autor, anio, paginas, genero, disponible))){
                anadidos ++; /*En caso de que se pueda añadir el libro, el contador incrementa para saber
                cuantos libros fueron procesados*/ 
            }
        }
        return anadidos;
    }

    buscar(texto){ //Buscar por nombre del autor o por el titulo que se ha buscado
        const buscado = texto.toLowerCasse();
        return this.libros.filter( //filtrar la busqueda por titulo o autor de libros
            (libro) =>
                libro.titulo.toLowerCase().includes(buscado) || 
                libro.autor.toLowerCase().includes(buscado)
        );
    }

    filtrarPorGenero(genero){ //Filtrar los libros por el genero que tienen
        return this.libros.filter((libro) => libro.genero === genero);
    }

    filtrarPorDisponibilidad(disponible){ //Filtra los libros por la disponibilidad 
        return this.libros.filter((libro) => libro.disponible === disponible);
    }

    ordenarPor(campo, ascendente = true){ //ordenaar segun el campo de manera ascendente o descendente
        const copia = [...this.libros]; //copia para no alterar el original
        copia.sort((a,b) => {
            let resultado;

            if(typeof a[campo] === "string"){ //compara que lo que haya en a sea string
                resultado = a[campo].localeCompare(b[campo]); //compara para devolver 1, -1 o 0 segun posición
            }else{
                resultado = a[campo] - b[campo];
            }
            return ascendente ? resultado : -resultado;
        });
        return copia
    }

    generos(){ //devuelve unicamente los generos de los libros
        const conjunto = new Set(this.libros.map((libro) => libro.genero));
        return [...conjunto];
    }

    /*devuelve cantida de libros disponibles, prestados, media de paginas, libro más antiguo,
    y número de libros por genero*/
    estadisticas(){
        const total = this.libros.length();
        const disponibles = this.filtrarPorDisponibilidad(true).length;
        const totalPaginas = this.libros.reduce((suma, libro) => suma + libro.paginas, 0);
        const mediaPaginas = Math.round(totalPaginas/total);
        const masAntiguo = this.libros.reduce((antiguo, libro) => 
            libro.anio < antiguo.anio ? libro : antiguo);
        const porGenero = new Map();
        for(const l of this.libros){
            porGenero.set(l.genero, (porGenero.get(l.genero) || 0) = 1);
        } 
        return{
            total,
            disponibles,
            prestados: total - disponibles,
            mediaPaginas,
            masAntiguo,
            porGenero
        };
    }
}

export const catalogo = new Biblioteca();

catalogo.agregar(new Libro("El Quijote", "Miguel de Cervantes", 1605, 1250, "novela"));
catalogo.agregar(new Libro("La casa de Bernarda Alba", "Federico García Lorca", 1945, 120, "teatro", false));
catalogo.agregar(new Libro("Niebla", "Miguel de Unamuno", 1914, 280, "novela"));
catalogo.agregar(new Libro("La colmena", "Camilo José Cela", 1951, 320, "novela"));
catalogo.agregar(new Libro("Rimas y leyendas", "Gustavo Adolfo Bécquer", 1871, 200, "poesía"));
catalogo.agregar(new Libro("Campos de Castilla", "Antonio Machado", 1912, 180, "poesía", false));

catalogo.cargarDesdeTexto(`Luces de bohemia;Ramón del Valle-Inclán;1924;160;teatro;si
Bodas de sangre;Federico García Lorca;1933;110;teatro;no
La Regenta;Leopoldo Alas Clarín;1885;900;novela;si
En torno al casticismo;Miguel de Unamuno;1895;250;ensayo;si
Meditaciones del Quijote;José Ortega y Gasset;1914;220;ensayo;no
Poeta en Nueva York;Federico García Lorca;1940;150;poesía;si`);
