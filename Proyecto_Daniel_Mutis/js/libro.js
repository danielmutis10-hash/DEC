export class Libro {
  /**
   * Crea un libro
   * @param {string} titulo - Título del libro
   * @param {string} autor - Autor del libro
   * @param {number} anio - Año de publicación
   * @param {number} paginas - Número de páginas
   * @param {string} genero - Género (novela, teatro, poesía, ensayo...)
   * @param {boolean} [disponible=true] - Si está disponible para préstamo
   * @returns {Libro}
   * Contructor para el objeto libro
   */
  constructor(titulo, autor, anio, paginas, genero, disponible = true) {
    this.titulo = titulo;
    this.autor = autor;
    this.anio = anio;
    this.paginas = paginas;
    this.genero = genero;
    this.disponible = disponible;
  }

  /**
  * @returns {boolean} true si se ha prestado; false si ya estaba prestado
  *
  * Metodo de prestar
  */
  prestar() {
    if (!this.disponible) { //Si la opción es distinta de disponible devuelve false
      return false;
    }
    this.disponible = false; //else, retorna verdadero
    return true;
  }

  /**
   * 
   * @returns {boolean} true si se ha devuelto; false si ya estaba disponible
   * Metodo de devolución de prestamo
   */
  devolver() {
    if (this.disponible) {
      return false; //si el libro esta disponible, retorna falso 
    }
    this.disponible = true; //else, retorna verdadero
    return true;
  }

  /**
   * 
   * @returns {number} Años de antigüedad según la fecha actual
   * Metodo de antiguedad de los libros con respecto a la fecha actual
   */
  antiguedad() {
    const anioActual = new Date().getFullYear(); //Año actual
    return anioActual - this.anio;
  }

  /**
   * Devuelve un texto resumen del libro
   * @returns {string} Texto con el formato "Título — Autor (año)"
   * Metodo que devuelve el titulo autor y año del libro
   */
  resumen() {
    return `${this.titulo} — ${this.autor} (${this.anio})`;
  }
}
