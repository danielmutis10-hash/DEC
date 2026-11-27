import { catalogo } from "./biblioteca.js";

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

function crearTarjeta(libro) {
    const tarjeta = crearElemento("article", "tarjeta");
    tarjeta.classList.add(libro.disponible ? "disponible" : "prestado");

    if (!libro.disponible) {
        tarjeta.append(crearElemento("span", "etiqueta", "Prestado"));
    }

    tarjeta.append(crearElemento("h3", "tarjeta-titulo", libro.titulo));
    tarjeta.append(crearElemento("p", "tarjeta-autor", libro.autor));
    tarjeta.append(crearElemento("p", "tarjeta-datos", `Año: ${libro.anio} - Páginas: ${libro.paginas}`));
    tarjeta.append(crearElemento("p", "tarjeta-datos", `Género: ${libro.genero}`));
    tarjeta.append(crearElemento("p", "tarjeta-estado", libro.disponible ? "Disponible" : "Prestado"));
    return tarjeta;
}

let contadorSecciones = 0;

function agregarEnlaceSidebar(titulo, idSeccion) {
    const sidebarNav = document.getElementById("sidebar-nav");
    const enlace = crearElemento("a", "option");
    enlace.href = `#${idSeccion}`;

    const span = crearElemento("span", null, titulo);
    enlace.append(span);

    enlace.addEventListener("click", () => {
        document.getElementById("sidebar").classList.remove("active");
    });

    sidebarNav.append(enlace);
}

function listasEnSeccion(seccion, lista) {
    if (lista.length === 0) {
        seccion.append(crearElemento("p", "vacio", "No hay libros en esta sección"));
    } else {
        const rejilla = crearElemento("div", "rejilla");
        for (const libro of lista) {
            rejilla.append(crearTarjeta(libro));
        }
        seccion.append(rejilla);
    }
}

function pintarSeccion(titulo, lista, idPersonalizado = null) {
    const contenedor = document.getElementById("contenido");
    contadorSecciones++;

    const idSeccion = idPersonalizado || `seccion-${contadorSecciones}`;
    const seccion = crearElemento("section", "section");
    seccion.id = idSeccion;
    seccion.append(crearElemento("h2", "seccion-titulo", titulo));

    listasEnSeccion(seccion, lista);
    contenedor.append(seccion);

    agregarEnlaceSidebar(titulo, idSeccion);
}

function actualizarBusqueda(texto) {
    const seccionBusqueda = document.getElementById("seccion-busqueda");
    if (!seccionBusqueda) return;

    seccionBusqueda.innerHTML = "";
    const titulo = texto.trim() === ""
        ? "Resultados de la búsqueda (todos)"
        : `Resultados de la búsqueda: "${texto}"`;

    seccionBusqueda.append(crearElemento("h2", "seccion-titulo", titulo));
    const resultados = catalogo.buscar(texto);
    listasEnSeccion(seccionBusqueda, resultados);
}

function mostrarResultado(accion, libro, resultado) {
    const texto = resultado ? "correcto" : "no realizado (el libro se encontraba anteriormente en este estado)";
    console.log(`${accion} "${libro.titulo}": ${texto}`);
}

function simularPrestamo() {
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

function pintarEstadisticas() {
    const panel = document.getElementById("estadisticas");
    if (!panel) return;

    const datos = catalogo.estadisticas();

    panel.append(crearElemento("h2", "seccion-titulo", "Estadísticas"));
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

    agregarEnlaceSidebar("Estadísticas", "estadisticas");
}

function pintarVistas() {
    pintarSeccion("Resultados de búsqueda", catalogo.libros, "seccion-busqueda");
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
}

document.addEventListener("DOMContentLoaded", () => {
    console.table(catalogo.libros);
    simularPrestamo();
    pintarEstadisticas();
    pintarVistas();

    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        actualizarBusqueda(searchInput.value);
        document.getElementById("seccion-busqueda").scrollIntoView({ behavior: "smooth" });
    });

    searchInput.addEventListener("input", (e) => {
        actualizarBusqueda(e.target.value);
    });
});