import {catalogo} from "./biblioteca.js";

function crearElemento(etiqueta, clase, texto){
    const elemento = document.createElement(etiqueta);
    if (clase){
        elemento.classList.add(clase);
    }

    if (texto){
        elemento.textContent = texto;
    }

    return elemento;
}

function crearTarjeta(libro){
    const tarjeta = crearElemento("article", "tarjeta");
    tarjeta.classList.add(libro.disponible ? "disponible" : "prestado");

    if (!libro.disponible){
        tarjeta.append(crearElemento("span", "etiqueta", "Prestado"));
    }

    tarjeta.append(crearElemento("h3", "tarjeta-titulo", libro.titulo)); //Genera el titulo del libro en una tarjeta
    tarjeta.append(crearElemento("p", "tarjeta-autor", libro.autor));//Autor del libro en texto
    tarjeta.append(crearElemento("p", "tarjeta-datos", `Año: ${libro.anio} - Páginas: ${libro.paginas}`)); //Genera el año del libro como sus páginas
    tarjeta.append(crearElemento("p", "tarjeta-datos", `Género: ${libro.genero}`));// Es el genero de cada uno de los libros
    tarjeta.append(crearElemento("p", "tarjeta-estado", libro.disponible ? "Disponible" : "Prestado")); //Retorna Disponible o ptrestado segun el estado
    return tarjeta;
}

let contadorSecciones = 0;

function pintarSeccion(titulo, lista){
    const contenedor = document.getElementById("contenido");
    contadorSecciones ++;

    const seccion = crearElemento("section", "section");
    seccion.id = `seccion-${contadorSecciones}`;
    seccion.append(crearElemento("h2", "seccion-titulo", titulo));

    if (lista.length === 0){
        seccion.append(crearElemento("p", "vacio", "No hay libros en esta sección"));
    } else {
        const rejilla = crearElemento("div", "rejilla");
        for (const libro of lista){
            rejilla.append(crearTarjeta(libro));
        }
        seccion.append(rejilla);
    }
    contenedor.append(seccion);
}

function mostrarResultado(accion, libro, resultado){//funcion que muestra ek resultado del prestamo
    const texto = resultado ? "correcto" : "no realizado (el libro se encontraba anteriormente en este estado)";
    console.log(`${accion} "${libro.titulo}": ${texto}`);
}

function simularPrestamo(){
    const quijote = catalogo.buscar("El Quijote")[0]; //busca su titulo dentro del propio libro
    const regenta = catalogo.buscar("La Regenta")[0];
    const colmena = catalogo.buscar("La colmena")[0];
    const bernarda = catalogo.buscar("Bernarda Alba")[0];

    mostrarResultado("Prestar", quijote, quijote.prestar());
    mostrarResultado("Prestar", regenta, regenta.prestar());
    mostrarResultado("Prestar", colmena, colmena.prestar());
    mostrarResultado("Devolver", bernarda, bernarda.devolver());
    mostrarResultado("Prestar (ya prestado)", quijote, quijote.prestar());
}

function pintarVistas(){
    pintarSeccion("Catálogo completo", catalogo.ordenarPor("titulo"));
    pintarSeccion("Libros disponibles", catalogo.filtrarPorDisponibilidad(true));
    pintarSeccion("Libros prestados", catalogo.filtrarPorDisponibilidad(false));

    for (const genero of catalogo.generos()){
        pintarSeccion(`Género: ${genero}`, catalogo.filtrarPorGenero(genero));
    }

    pintarSeccion("Los 5 libros más antguos", catalogo.ordenarPor("anio").slice(0,5)); //filtra solo los 5 libros mas antiguos

    const novelasDisponibles = catalogo
        .filtrarPorGenero("novela")
        .filter((libro) => libro.disponible)
        .sort((a,b) => a.paginas - b.paginas);
    pintarSeccion("Novelas disponibles ordenadas por páginas", novelasDisponibles);
    
    pintarSeccion(`Resultados de la búsqueda: "${TEXTO_BUSQUEDA}"`, catalogo.buscar(TEXTO_BUSQUEDA));
}

