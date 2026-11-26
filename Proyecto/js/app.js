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