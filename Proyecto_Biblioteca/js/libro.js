/**
 * Representa un libro de la biblioteca.
 */
export class Libro {
  /**
   * Crea un libro.
   * @param {string} titulo - Título del libro.
   * @param {string} autor - Autor del libro.
   * @param {number} anio - Año de publicación.
   * @param {number} paginas - Número de páginas.
   * @param {string} genero - Género (novela, teatro, poesía, ensayo...).
   * @param {boolean} [disponible=true] - Si está disponible para préstamo.
   * @returns {Libro} Nueva instancia de Libro.
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
   * Marca el libro como prestado.
   * @returns {boolean} true si se ha prestado; false si ya estaba prestado.
   */
  prestar() {
    if (!this.disponible) {
      return false;
    }
    this.disponible = false;
    return true;
  }

  /**
   * Marca el libro como disponible.
   * @returns {boolean} true si se ha devuelto; false si ya estaba disponible.
   */
  devolver() {
    if (this.disponible) {
      return false;
    }
    this.disponible = true;
    return true;
  }

  /**
   * Calcula los años transcurridos desde la publicación.
   * @returns {number} Años de antigüedad según la fecha actual.
   */
  antiguedad() {
    const anioActual = new Date().getFullYear();
    return anioActual - this.anio;
  }

  /**
   * Devuelve un texto resumen del libro.
   * @returns {string} Texto con el formato «Título — Autor (año)».
   */
  resumen() {
    return `${this.titulo} — ${this.autor} (${this.anio})`;
  }
}
