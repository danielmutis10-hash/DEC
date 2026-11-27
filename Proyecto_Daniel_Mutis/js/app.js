import { catalogo } from "./biblioteca.js";

const TEXTO_BUSQUEDA = "de";

/**
 * Crea un elemento HTML con una clase y un texto opcionales
 * @param {string} etiqueta - Nombre de la etiqueta (p, h2, span...)
 * @returns {HTMLElement} Elemento creado
 * Funcion para crear una etiqueta
 */
function crearElemento(etiqueta, clase, texto) {
  const elemento = document.createElement(etiqueta);
  if (clase) {
    elemento.classList.add(clase); //en caso de recibir un nombre de clase, lo agrega al elemento en el apartado class del html
  }
  if (texto) {
    elemento.textContent = texto; //texto que contendra el elemento
  }
  return elemento;
}

/**
 *
 * @param {import("./libro.js").Libro} libro - Libro a mostrar
 * @returns {HTMLElement} Tarjeta del libro
 * Función para crear una tarjeta de cada libro
 */
function crearTarjeta(libro) {
  const tarjeta = crearElemento("article", "tarjeta"); //el html sera un article y su clase es tarjeta
  tarjeta.classList.add(libro.disponible ? "disponible" : "prestado"); //asigna el color verde o rojo de disponible o prestado por el css

  if (!libro.disponible) {
    tarjeta.append(crearElemento("span", "etiqueta", "Prestado")); //si el libro esta prestado, agrega una etiqueta prestado
  } //agregar el titulo, autor, año, páginas, genero y si el libro se encuentra disponible o prestado
  tarjeta.append(crearElemento("h3", "tarjeta-titulo", libro.titulo)); 
  tarjeta.append(crearElemento("p", "tarjeta-autor", libro.autor));
  tarjeta.append(crearElemento("p", "tarjeta-datos", `Año: ${libro.anio} - Páginas: ${libro.paginas}`));
  tarjeta.append(crearElemento("p", "tarjeta-datos", `Género: ${libro.genero}`));
  tarjeta.append(crearElemento("p", "tarjeta-estado", libro.disponible ? "Disponible" : "Prestado"));
  return tarjeta;
}

let contadorSecciones = 0;

/**
 *
 * @param {string} titulo - Título de la sección.
 * @param {import("./libro.js").Libro[]} lista - Libros a mostrar.
 * @returns {void}
 * Función para pintar desde la sección
 */
function pintarSeccion(titulo, lista) {
  const contenedor = document.getElementById("contenido"); //genera el div contenido
  contadorSecciones++;

  const seccion = crearElemento("section", "seccion"); //crea la sección de cada contenido
  seccion.id = `seccion-${contadorSecciones}`;
  seccion.append(crearElemento("h2", "seccion-titulo", titulo)); //titulo de cada sección

  if (lista.length === 0) {
    seccion.append(crearElemento("p", "vacio", "No hay libros en esta sección")); //si no hay nada en lista, la sección estaría vacia
  } else {
    const rejilla = crearElemento("div", "rejilla"); //creación del div rejilla en cada sección
    for (const libro of lista) {
      rejilla.append(crearTarjeta(libro)); //crea el article con tarjeta prestado o disponible segun el libro
    }
    seccion.append(rejilla); //insertar en rejilla
  }
  contenedor.append(seccion); //insertar en sección
}

/**
 * 
 * @param {string} accion - Nombre de la acción realizada
 * @param {import("./libro.js").Libro} libro - Libro afectado
 * @param {boolean} resultado - Resultado devuelto por el método
 * @returns {void}
 * función que muestra el resultado de los prestamos
 */
function mostrarResultado(accion, libro, resultado) {
  const texto = resultado ? "correcto" : "no realizado";
  console.log(`${accion} "${libro.titulo}": ${texto}`);
}

/**
 * 
 * @returns {void}
 * función para simular prestamos y devoluciones
 */
function simularPrestamos() {
  const quijote = catalogo.buscar("El Quijote")[0];
  const regenta = catalogo.buscar("La Regenta")[0];
  const colmena = catalogo.buscar("La colmena")[0];
  const bernarda = catalogo.buscar("Bernarda Alba")[0];

  mostrarResultado("Prestar", quijote, quijote.prestar());
  mostrarResultado("Prestar", regenta, regenta.prestar());
  mostrarResultado("Prestar", colmena, colmena.prestar());
  mostrarResultado("Devolver", bernarda, bernarda.devolver());
  mostrarResultado("Prestar (ya prestado)", quijote, quijote.prestar());
}

/**
 * 
 * @returns {void}
 * Generar el orden que aparecera en el main del html
 */
function pintarVistas() {
  pintarSeccion("Catálogo completo", catalogo.ordenarPor("titulo")); //catalogo ordenado por titulo
  pintarSeccion("Libros disponibles", catalogo.filtrarPorDisponibilidad(true)); //filtro de libros disponibles
  pintarSeccion("Libros prestados", catalogo.filtrarPorDisponibilidad(false)); //filtro de libros prestados

  for (const genero of catalogo.generos()) {
    pintarSeccion(`Género: ${genero}`, catalogo.filtrarPorGenero(genero)); //pintar cada libro por su genero correspondiente
  }

  pintarSeccion("Los 5 libros más antiguos", catalogo.ordenarPor("anio").slice(0, 5)); //generar article para los 5 libros más antiguos con slice para cortar

  const novelasDisponibles = catalogo
    .filtrarPorGenero("novela")
    .filter((libro) => libro.disponible)
    .sort((a, b) => a.paginas - b.paginas);
  pintarSeccion("Novelas disponibles ordenadas por páginas", novelasDisponibles); //novelas disponibles por sus paginas de manera ascendente 

  pintarSeccion(`Resultados de la búsqueda: "${TEXTO_BUSQUEDA}"`, catalogo.buscar(TEXTO_BUSQUEDA)); //pintar el ultimo apartado de busqueda
}

/**
 *
 * @returns {void}
 * Función para generar el indice para cada apartado de la pagina con enlace
 */
function pintarIndice() {
  const indice = document.getElementById("indice");
  const secciones = document.querySelectorAll("#contenido .seccion");
  for (const seccion of secciones) {
    const enlace = crearElemento("a", "indice-enlace", seccion.querySelector("h2").textContent);
    enlace.href = `#${seccion.id}`; //genera el indice por su id de cada sección
    indice.append(enlace); //genera el apartado finalmente
  }
}

/**
 * 
 * @returns {void}
 * Función para el panel de estadisticas de la biblioteca
 */
function pintarEstadisticas() {
  const panel = document.getElementById("estadisticas");
  const datos = catalogo.estadisticas(); //extrae los datos de las estadisticas del catalogo de libros

  panel.append(crearElemento("h2", "panel-titulo", "Estadísticas")); //titulo del panel
  const lista = crearElemento("ul", "panel-lista"); //genera un ul con clase panel
  lista.append(crearElemento("li", "", `Total de libros: ${datos.total}`)); //una linea con el total de libros
  lista.append(crearElemento("li", "", `Disponibles: ${datos.disponibles}`)); //lista con los libros disponibles
  lista.append(crearElemento("li", "", `Prestados: ${datos.prestados}`)); //lista con los libros prestados, solo el total
  lista.append(crearElemento("li", "", `Media de páginas: ${datos.mediaPaginas}`)); //la media de las paginas de los libros
  lista.append(crearElemento("li", "", `Libro más antiguo: ${datos.masAntiguo.resumen()}`)); //el libro más antiguo en la biblioteca
  datos.porGenero.forEach((cantidad, genero) => { //cantidad de libros por genero
    lista.append(crearElemento("li", "", `Libros de ${genero}: ${cantidad}`));
  });
  panel.append(lista); //creación de la lista
}

console.table(catalogo.libros);
simularPrestamos(); //simulación de prestamo
pintarVistas(); //vista del html
pintarIndice(); //generar el indice
pintarEstadisticas(); //generar estadisticas
