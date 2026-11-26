export class Libro{

    //Constructor
    constructor(titulo, autor, anio, paginas, genero, disponible = true){
        this.titulo = titulo;
        this.autor = autor;
        this.anio = anio;
        this.paginas = paginas;
        this.genero = genero;
        this.disponible = disponible;
    }

    prestar(){ //Prestar un libro, en caso de poderse prestar devuleve true, caso contrario false
        if(!this.disponible){
            return false;
        }
        this.disponible = false;
        return true;
    }

    devolver(){ //Devolver un libro que se haya prestado marcandolo como true
        if(this.disponible){
            return false;
        }
        this.disponible = true;
        return true;
    }

    antiguedad(){ //determina la antiguedad con el año actual gracias a la funcion de date
        const anioActual = new Date().getFullYear();
        return anioActual - this.anio;
    }

    resumen(){ //Devuelve un breve resumen del titulo, autor y año del libro
        return `${this.titulo} - ${this.autor} (${this.anio})`
    }
}