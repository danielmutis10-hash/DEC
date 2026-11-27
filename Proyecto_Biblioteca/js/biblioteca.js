import { Libro } from "./libro.js";

export class Biblioteca {
  /**
   * Crea una biblioteca vacía
   * @returns {Biblioteca}
   * Constructor de Biblioteca
   */
  constructor() {
    this.libros = []; //Array de libros para almacenar sus datos
  }

  /**
   * 
   * @param {Libro} libro - Libro a añadir
   * @returns {boolean} true si se ha añadido; false si no es un Libro
   * Metodo de agregación de un nuevo libro
   */
  agregar(libro) {
    if (!(libro instanceof Libro)) { //En caso de que el libro ya este en la lista, devolvera false
      return false;
    }
    this.libros.push(libro); //else, agregara al array de libros el nuevo libro
    return true;
  }

  /**
   * 
   * Formato: título;autor;año;páginas;género;si/no
   * @param {string} texto - Texto con los libros
   * Metodo para añadir un libro desde un texto separado por punto y coma
   */
  cargarDesdeTexto(texto) {
    const lineas = texto.split("\n"); //Divide el texto en lineas con el salto de linea \n
    let añadidos = 0;
    for (const linea of lineas) {
      if (linea.trim() === "") { //En caso de que la linea tenga un espacio o con espacios en blanco, salta y continua en la siguiente
        continue;
      }
      const cachitos = linea.split(";"); //cachitos son las secciones de cada libro
      const titulo = cachitos[0].trim(); //titulo
      const autor = cachitos[1].trim(); //autor
      const anio = Number(cachitos[2]); //año
      const paginas = Number(cachitos[3]); //paginas
      const genero = cachitos[4].trim(); //genero
      const disponible = cachitos[5].trim().toLowerCase() === "si"; //identifica si esta disponible el libro mediante una cadena de texto (Si/No)
      if (this.agregar(new Libro(titulo, autor, anio, paginas, genero, disponible))) { //Crea el nuevo libro con los apartados correspondientes e itera el añadidos para comprobar cuantos libros fueron añadidos
        añadidos++;
      }
    }
    return añadidos; //Devuelve unicamente el monto total de libros añadidos
  }

  /**
   *
   * @param {string} texto - Texto a buscar
   * Metodo para buscar mediante el autor o su titulo
   */
  buscar(texto) {
    const buscado = texto.toLowerCase(); //Variable con la que se buscara, sin importar si se escribe en un inicio en mayuscula o en minuscula ya que lo convierte
    return this.libros.filter( 
      /*Filter del libro, busca por titulo o por autor (se convierten en minuscula para que al momento de escribir en el buscador mayuscula o minuscula, 
      identifique que es lo que se busca) */
      (libro) =>
        libro.titulo.toLowerCase().includes(buscado) ||
        libro.autor.toLowerCase().includes(buscado)
    );
  }

  /**
   * 
   * @param {string} genero - Género buscado
   * Metodo para filtrar los libros por genero
   */
  filtrarPorGenero(genero) {
    return this.libros.filter((libro) => libro.genero === genero); //Que el genero concuerde tanto en su nombre como en que ambos sean una cadena de caracteres
  }

  /**
   *
   * @param {boolean} disponible - true para disponibles, false para prestados
   * Metodo para filtrar los libros por su disponibilidad
   */
  filtrarPorDisponibilidad(disponible) {
    return this.libros.filter((libro) => libro.disponible === disponible); //Filter de los libros disponibles unicamente, no cuenta los prestados
  }

  /**
   *
   * @param {string} campo - "titulo", "autor", "anio" o "paginas"
   * Metodo para ordenar de manera ascendente los libros
   */
  ordenarPor(campo, ascendente = true) {
    /*ya que manipunaleros el catalogo de libros, es mejor manipular una copia ya que si algo falla y borramos algo 
    al momento de generar el codigo, al menos contamos con el catalogo original */
    const copia = [...this.libros];
    copia.sort((a, b) => { //se creo la copia por esta razón ya que sort altera el array
      let resultado;
      if (typeof a[campo] === "string") { //identifica si el apartado de campo es un string
        resultado = a[campo].localeCompare(b[campo]); //comparación sin importar tildes o ñ
      } else {
        resultado = a[campo] - b[campo]; //En caso de ser años o paginas, realiza la resta de ambos para determinar quien va primero
      }
      return ascendente ? resultado : -resultado; //si ascendente es true, mantiene la posición igual, pero si es false, cambia el resultado a -resultado para cambiar su posición
    });
    return copia;
  }

  /**
   * 
   * Metodo para devolver los generos de todos los titulos
   */
  generos() {
    const conjunto = new Set(this.libros.map((libro) => libro.genero)); //map extrae unicamente los generos de cada libro, set elimina los repetidos
    return [...conjunto]; //devuelve tal cual el conjunto de los generos como array
  }

  /**
   * Calcula estadísticas de la biblioteca
   * Metodo de estadisticas, primero el total, luego los disponibles, total de prestados, la media de las paginas de todos los libros y de todos los autores, el mas antiguo y el conteo por genero
   */
  estadisticas() {
    const total = this.libros.length; 
    const disponibles = this.filtrarPorDisponibilidad(true).length; //cuenta los libros disponibles
    const totalPaginas = this.libros.reduce((suma, libro) => suma + libro.paginas, 0); //Total de las paginas con .reduce ya que los guarda en la variable suma y comienza desde 0 
    const mediaPaginas = Math.round(totalPaginas / total); //con el total de las paginas, se hace la division con el total de libros para saber la media
    const masAntiguo = this.libros.reduce((antiguo, libro) => //comparacion de libros para determinar cual es el más antiguo
      libro.anio < antiguo.anio ? libro : antiguo
    );
    const porGenero = new Map(); //Map para ver los libros por genero
    for (const libro of this.libros) {
      /*busca por genero, en caso de no tenerlo, lo inia en 0 y le agrega uno, guardandolo en dpendencia del genero poesia -> 4, teatro -> 1 etc */
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

/**
 * funciones apra agregar un catalogo de libros a la biblioteca
 */
export const catalogo = new Biblioteca();

catalogo.agregar(new Libro("El Quijote", "Miguel de Cervantes", 1605, 1250, "novela"));
catalogo.agregar(new Libro("La casa de Bernarda Alba", "Federico García Lorca", 1945, 120, "teatro", false));
catalogo.agregar(new Libro("Niebla", "Miguel de Unamuno", 1914, 280, "novela"));
catalogo.agregar(new Libro("La colmena", "Camilo José Cela", 1951, 320, "novela"));
catalogo.agregar(new Libro("Rimas y leyendas", "Gustavo Adolfo Bécquer", 1871, 200, "poesía"));
catalogo.agregar(new Libro("Campos de Castilla", "Antonio Machado", 1912, 180, "poesía", false));

//metodo para agregar desde texto
catalogo.cargarDesdeTexto(`Luces de bohemia;Ramón del Valle-Inclán;1924;160;teatro;si
Bodas de sangre;Federico García Lorca;1933;110;teatro;no
La Regenta;Leopoldo Alas Clarín;1885;900;novela;si
En torno al casticismo;Miguel de Unamuno;1895;250;ensayo;si
Meditaciones del Quijote;José Ortega y Gasset;1914;220;ensayo;no
Poeta en Nueva York;Federico García Lorca;1940;150;poesía;si`);
