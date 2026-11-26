import { catalogo } from "./biblioteca.js";

const TEXTO_BUSQUEDA = "de";

/**
 * Crea un elemento HTML con una clase y un texto opcionales.
 * @param {string} etiqueta - Nombre de la etiqueta (p, h2, span...).
 * @param {string} [clase] - Clase CSS a añadir.
 * @param {string} [texto] - Texto del elemento.
 * @returns {HTMLElement} Elemento creado.
 */
function crearElemento(etiqueta, clase, texto) {
  const elemento = document.createElement(etiqueta);
  if (clase) {
    elemento.classList.add(clase);
  }
  if (texto) {
    elemento.textContent = texto;
  }
  return elemento;
}

/**
 * Crea la tarjeta (article) de un libro.
 * @param {import("./libro.js").Libro} libro - Libro a mostrar.
 * @returns {HTMLElement} Tarjeta del libro.
 */
function crearTarjeta(libro) {
  const tarjeta = crearElemento("article", "tarjeta");
  tarjeta.classList.add(libro.disponible ? "disponible" : "prestado");

  if (!libro.disponible) {
    tarjeta.append(crearElemento("span", "etiqueta", "Prestado"));
  }
  tarjeta.append(crearElemento("h3", "tarjeta-titulo", libro.titulo));
  tarjeta.append(crearElemento("p", "tarjeta-autor", libro.autor));
  tarjeta.append(crearElemento("p", "tarjeta-datos", `Año: ${libro.anio} · Páginas: ${libro.paginas}`));
  tarjeta.append(crearElemento("p", "tarjeta-datos", `Género: ${libro.genero}`));
  tarjeta.append(crearElemento("p", "tarjeta-estado", libro.disponible ? "Disponible" : "Prestado"));
  return tarjeta;
}

let contadorSecciones = 0;

/**
 * Pinta una sección con un encabezado y una tarjeta por libro.
 * @param {string} titulo - Título de la sección.
 * @param {import("./libro.js").Libro[]} lista - Libros a mostrar.
 * @returns {void}
 */
function pintarSeccion(titulo, lista) {
  const contenedor = document.getElementById("contenido");
  contadorSecciones++;

  const seccion = crearElemento("section", "seccion");
  seccion.id = `seccion-${contadorSecciones}`;
  seccion.append(crearElemento("h2", "seccion-titulo", titulo));

  if (lista.length === 0) {
    seccion.append(crearElemento("p", "vacio", "No hay libros en esta sección"));
  } else {
    const rejilla = crearElemento("div", "rejilla");
    for (const libro of lista) {
      rejilla.append(crearTarjeta(libro));
    }
    seccion.append(rejilla);
  }
  contenedor.append(seccion);
}

/**
 * Muestra en consola el resultado de una operación de préstamo.
 * @param {string} accion - Nombre de la acción realizada.
 * @param {import("./libro.js").Libro} libro - Libro afectado.
 * @param {boolean} resultado - Resultado devuelto por el método.
 * @returns {void}
 */
function mostrarResultado(accion, libro, resultado) {
  const texto = resultado ? "correcto" : "no realizado (el libro ya estaba en ese estado)";
  console.log(`${accion} "${libro.titulo}": ${texto}`);
}

/**
 * Simula préstamos y devoluciones antes de pintar.
 * @returns {void}
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
 * Pinta todas las vistas del catálogo.
 * @returns {void}
 */
function pintarVistas() {
  pintarSeccion("Catálogo completo", catalogo.ordenarPor("titulo"));
  pintarSeccion("Libros disponibles", catalogo.filtrarPorDisponibilidad(true));
  pintarSeccion("Libros prestados", catalogo.filtrarPorDisponibilidad(false));

  for (const genero of catalogo.generos()) {
    pintarSeccion(`Género: ${genero}`, catalogo.filtrarPorGenero(genero));
  }

  pintarSeccion("Los 5 libros más antiguos", catalogo.ordenarPor("anio").slice(0, 5));

  const novelasDisponibles = catalogo
    .filtrarPorGenero("novela")
    .filter((libro) => libro.disponible)
    .sort((a, b) => a.paginas - b.paginas);
  pintarSeccion("Novelas disponibles ordenadas por páginas", novelasDisponibles);

  pintarSeccion(`Resultados de la búsqueda: "${TEXTO_BUSQUEDA}"`, catalogo.buscar(TEXTO_BUSQUEDA));
}

/**
 * Genera el índice con un enlace a cada sección pintada.
 * @returns {void}
 */
function pintarIndice() {
  const indice = document.getElementById("indice");
  const secciones = document.querySelectorAll("#contenido .seccion");
  for (const seccion of secciones) {
    const enlace = crearElemento("a", "indice-enlace", seccion.querySelector("h2").textContent);
    enlace.href = `#${seccion.id}`;
    indice.append(enlace);
  }
}

/**
 * Pinta el panel con las estadísticas de la biblioteca.
 * @returns {void}
 */
function pintarEstadisticas() {
  const panel = document.getElementById("estadisticas");
  const datos = catalogo.estadisticas();

  panel.append(crearElemento("h2", "panel-titulo", "Estadísticas"));
  const lista = crearElemento("ul", "panel-lista");
  lista.append(crearElemento("li", "", `Total de libros: ${datos.total}`));
  lista.append(crearElemento("li", "", `Disponibles: ${datos.disponibles}`));
  lista.append(crearElemento("li", "", `Prestados: ${datos.prestados}`));
  lista.append(crearElemento("li", "", `Media de páginas: ${datos.mediaPaginas}`));
  lista.append(crearElemento("li", "", `Libro más antiguo: ${datos.masAntiguo.resumen()}`));
  datos.porGenero.forEach((cantidad, genero) => {
    lista.append(crearElemento("li", "", `Libros de ${genero}: ${cantidad}`));
  });
  panel.append(lista);
}

console.table(catalogo.libros);
simularPrestamos();
pintarVistas();
pintarIndice();
pintarEstadisticas();
