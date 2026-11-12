"use strict";

// ---------------------------------------------------------------------------
// FUNCIÓN DE APOYO (ya hecha, no la modifiques)
// Inserta un texto HTML dentro del elemento indicado por su selector CSS.
// Cómo funciona por dentro se estudiará en las unidades de objetos predefinidos
// y DOM. Por ahora, úsala como una "caja negra":
//   mostrar("#catalogo", "<p>Hola</p>");
// ---------------------------------------------------------------------------
function mostrar(selector, html) {
  document.querySelector(selector).innerHTML = html;
}

// ---------------------------------------------------------------------------
// R1 a R7: funciones de cálculo (no deben usar mostrar ni console.log)
// ---------------------------------------------------------------------------

// R1
function valoracionMedia(libro) { //Da la media de cada uno de los libros
  if (!libro.valoraciones || libro.valoraciones.length === 0) {
    return null;
  }
  const suma = libro.valoraciones.reduce((acum, val) => acum + val, 0);
  return Math.round((suma / libro.valoraciones.length) * 10) / 10;
}

// R2
function librosDisponibles(libros) {
  return libros.filter(libro => !libro.prestado);
}

// R3
function librosEntre(libros, desde, hasta) {
  const anioDesde = Number(desde);
  const anioHasta = Number(hasta);

  if (Number.isNaN(anioDesde) || Number.isNaN(anioHasta) || anioDesde > anioHasta) {
    return [];
  }

  return libros.filter(libro => libro.anio >= anioDesde && libro.anio <= anioHasta);
}

// R4
function generos(libros) {
  const generosSet = new Set(libros.map(libro => libro.genero));
  return [...generosSet].sort((a, b) => a.localeCompare(b));
}

// R5
function librosPorAutor(libros) {
  const mapaAutores = new Map();
  libros.forEach(libro => {
    const actual = mapaAutores.get(libro.autor) ?? 0;
    mapaAutores.set(libro.autor, actual + 1);
  });
  return mapaAutores;
}

// R6
function ranking(libros, n = 3) {
  const copia = [...libros];
  return copia
    .filter(libro => libro.valoraciones && libro.valoraciones.length > 0)
    .sort((a, b) => {
      const mediaA = valoracionMedia(a);
      const mediaB = valoracionMedia(b);
      if (mediaB !== mediaA) {
        return mediaB - mediaA;
      }
      return a.titulo.localeCompare(b.titulo);
    })
    .slice(0, n);
}

// R7
function resumen(libros) {
  const total = libros.length;
  const prestados = libros.filter(libro => libro.prestado).length;
  const disponibles = total - prestados;

  const todasValoraciones = libros.flatMap(libro => libro.valoraciones);
  let mediaGlobal = null;
  if (todasValoraciones.length > 0) {
    const sumaTotal = todasValoraciones.reduce((acum, val) => acum + val, 0);
    mediaGlobal = Math.round((sumaTotal / todasValoraciones.length) * 10) / 10;
  }

  let masAntiguo = null;
  if (total > 0) {
    const ordenadosPorAnio = [...libros].sort((a, b) => a.anio - b.anio);
    masAntiguo = ordenadosPorAnio[0].titulo;
  }

  return {
    total,
    prestados,
    disponibles,
    mediaGlobal,
    masAntiguo
  };
}

// ---------------------------------------------------------------------------
// R8: funciones que generan HTML (devuelven un string)
// ---------------------------------------------------------------------------

function htmlResumen(libros) {
  const res = resumen(libros);
  return `
    <ul>
      <li><strong>Total de libros:</strong> ${res.total}</li>
      <li><strong>Prestados:</strong> ${res.prestados}</li>
      <li><strong>Disponibles:</strong> ${res.disponibles}</li>
      <li><strong>Valoración media global:</strong> ${res.mediaGlobal ?? "Sin valorar"}</li>
      <li><strong>Libro más antiguo:</strong> ${res.masAntiguo}</li>
    </ul>
  `;
}
//Funcion para la tabla de los libros
function tablaLibros(libros) {
  const filas = libros.map(libro => {
    const media = valoracionMedia(libro);
    const clasePrestado = libro.prestado ? "prestado" : "";
    return `
      <tr class="${clasePrestado}">
        <td>${libro.titulo}</td>
        <td>${libro.autor}</td>
        <td>${libro.genero}</td>
        <td>${libro.anio}</td>
        <td>${libro.prestado ? "Prestado" : "Disponible"}</td>
        <td>${media !== null ? media : "Sin valorar"}</td>
      </tr>
    `;
  }).join("");

  return `
    <table border="1" style="width:100%; border-collapse: collapse; text-align: center;">
      <thead>
        <tr>
          <th>Título</th>
          <th>Autor</th>
          <th>Género</th>
          <th>Año</th>
          <th>Estado</th>
          <th>Valoración Media</th>
        </tr>
      </thead>
      <tbody>
        ${filas}
      </tbody>
    </table>
  `;
}

function htmlGeneros(libros) {
  const listaGeneros = generos(libros);
  const items = listaGeneros.map(g => `<li>${g}</li>`).join("");
  return `<ul>${items}</ul>`;
}

function htmlRanking(libros) {
  const top = ranking(libros, 3);
  const items = top.map((libro, index) => {
    const media = valoracionMedia(libro);
    return `<li><strong>${index + 1}.º</strong> ${libro.titulo} (${media})</li>`;
  }).join("");
  return `<ol>${items}</ol>`;
}

function htmlLibrosPorAutor(libros) {
  const mapa = librosPorAutor(libros);
  let items = "";
  mapa.forEach((cantidad, autor) => {
    items += `<li><strong>${autor}:</strong> ${cantidad} libro(s)</li>`;
  });
  return `<ul>${items}</ul>`;
}

// ---------------------------------------------------------------------------
// Programa principal
// ---------------------------------------------------------------------------
mostrar("#catalogo", tablaLibros(LIBROS));
mostrar("#resumen", htmlResumen(LIBROS));
mostrar("#generos", htmlGeneros(LIBROS));
mostrar("#ranking", htmlRanking(LIBROS));
mostrar("#autores", htmlLibrosPorAutor(LIBROS));
