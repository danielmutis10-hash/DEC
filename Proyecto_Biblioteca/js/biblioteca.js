import { Libro } from "./libro.js";

/**
 * Colección de libros con operaciones de búsqueda, filtro y estadísticas.
 */
export class Biblioteca {
  /**
   * Crea una biblioteca vacía.
   * @returns {Biblioteca} Nueva instancia de Biblioteca.
   */
  constructor() {
    this.libros = [];
  }

  /**
   * Añade un libro a la biblioteca.
   * @param {Libro} libro - Libro a añadir (solo se admiten instancias de Libro).
   * @returns {boolean} true si se ha añadido; false si no es un Libro.
   */
  agregar(libro) {
    if (!(libro instanceof Libro)) {
      return false;
    }
    this.libros.push(libro);
    return true;
  }

  /**
   * Carga libros desde un texto con una línea por libro y campos separados por ;
   * Formato: título;autor;año;páginas;género;si/no
   * @param {string} texto - Texto con los libros.
   * @returns {number} Número de libros añadidos.
   */
  cargarDesdeTexto(texto) {
    const lineas = texto.split("\n");
    let añadidos = 0;
    for (const linea of lineas) {
      if (linea.trim() === "") {
        continue;
      }
      const campos = linea.split(";");
      const titulo = campos[0].trim();
      const autor = campos[1].trim();
      const anio = Number(campos[2]);
      const paginas = Number(campos[3]);
      const genero = campos[4].trim();
      const disponible = campos[5].trim().toLowerCase() === "si";
      if (this.agregar(new Libro(titulo, autor, anio, paginas, genero, disponible))) {
        añadidos++;
      }
    }
    return añadidos;
  }

  /**
   * Busca libros cuyo título o autor contengan el texto (sin distinguir mayúsculas).
   * @param {string} texto - Texto a buscar.
   * @returns {Libro[]} Libros que coinciden.
   */
  buscar(texto) {
    const buscado = texto.toLowerCase();
    return this.libros.filter(
      (libro) =>
        libro.titulo.toLowerCase().includes(buscado) ||
        libro.autor.toLowerCase().includes(buscado)
    );
  }

  /**
   * Filtra los libros por género.
   * @param {string} genero - Género buscado.
   * @returns {Libro[]} Libros de ese género.
   */
  filtrarPorGenero(genero) {
    return this.libros.filter((libro) => libro.genero === genero);
  }

  /**
   * Filtra los libros por disponibilidad.
   * @param {boolean} disponible - true para disponibles, false para prestados.
   * @returns {Libro[]} Libros con esa disponibilidad.
   */
  filtrarPorDisponibilidad(disponible) {
    return this.libros.filter((libro) => libro.disponible === disponible);
  }

  /**
   * Ordena los libros por un campo sin modificar el array original.
   * @param {string} campo - "titulo", "autor", "anio" o "paginas".
   * @param {boolean} [ascendente=true] - true para orden ascendente.
   * @returns {Libro[]} Copia ordenada de los libros.
   */
  ordenarPor(campo, ascendente = true) {
    const copia = [...this.libros];
    copia.sort((a, b) => {
      let resultado;
      if (typeof a[campo] === "string") {
        resultado = a[campo].localeCompare(b[campo]);
      } else {
        resultado = a[campo] - b[campo];
      }
      return ascendente ? resultado : -resultado;
    });
    return copia;
  }

  /**
   * Obtiene los géneros sin repetir.
   * @returns {string[]} Lista de géneros.
   */
  generos() {
    const conjunto = new Set(this.libros.map((libro) => libro.genero));
    return [...conjunto];
  }

  /**
   * Calcula estadísticas de la biblioteca.
   * @returns {{total: number, disponibles: number, prestados: number, mediaPaginas: number, masAntiguo: Libro, porGenero: Map<string, number>}} Objeto con las estadísticas.
   */
  estadisticas() {
    const total = this.libros.length;
    const disponibles = this.filtrarPorDisponibilidad(true).length;
    const totalPaginas = this.libros.reduce((suma, libro) => suma + libro.paginas, 0);
    const mediaPaginas = Math.round(totalPaginas / total);
    const masAntiguo = this.libros.reduce((antiguo, libro) =>
      libro.anio < antiguo.anio ? libro : antiguo
    );
    const porGenero = new Map();
    for (const libro of this.libros) {
      porGenero.set(libro.genero, (porGenero.get(libro.genero) || 0) + 1);
    }
    return {
      total,
      disponibles,
      prestados: total - disponibles,
      mediaPaginas,
      masAntiguo,
      porGenero,
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
