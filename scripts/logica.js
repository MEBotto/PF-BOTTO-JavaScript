async function fetchMangaInfo(nombreManga) {
  const url = `https://myanimelist.p.rapidapi.com/manga/search/${nombreManga}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '3e635cdcd4mshb69d3b74ecf3939p1c8bdajsne13808528e34',
      'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json(); // Parsea la respuesta como JSON
    console.log(data); // Aquí deberías ver el objeto/array obtenido
    return data;
  } catch (error) {
    console.error(error);
  }
}

let contenedorProds = document.getElementById("selectedProd");
let checkboxSeries = document.getElementsByName("checkboxSeries");
let checkboxAutores = document.getElementsByName("checkboxAutores");
let textBoxPrecio = document.getElementById("precio");
let botonFiltrar = document.getElementById("botonFiltrar");
let botones;
let botones2;
let tablaCarrito = document.getElementById("tablaCarrito");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let resultado = 0;
let totalCarrito = document.getElementById("total");

//Primer Renderizado
renderizarProductos(productos);

//Filtros
function filtrarPorPrecio(maxPrice) {
  const filteredProd = productos.filter((producto) => producto.precio <= maxPrice);
  console.table(filteredProd);
  return filteredProd;
}

function filtrarPorNombreSerie(nombreSerie) {
  const filteredProd = productos.filter((producto) => producto.serie == nombreSerie);
  console.table(filteredProd);
  return filteredProd;
}

function filtrarPorNombreAutor(nombreAutor) {
  const filteredProd = productos.filter((producto) => producto.autor == nombreAutor);
  console.table(filteredProd);
  return filteredProd;
}

//Renderizacion
resultado = 0;
function renderizarProductos(listaProds) {
  for (const producto of listaProds){
    contenedorProds.innerHTML += `
    <div class="col-4">
      <div class="card mt-3" style="width: 18rem;">
        <img src="${producto.imagen}" class="card-img-top" height="420">
        <div class="card-body">
          <h5 class="card-title">${producto.serie + " - Tomo " + producto.tomo}</h5>
          <p class="card-text">${"$" + producto.precio}</p>
          <button id=${producto.id} class="compra btn btn-primary">Comprar</button>
          <button id=${reemplazarEspacios(`${producto.serie}`)} class="verMas btn btn-secondary">Info...</button>
        </div>
      </div>
    </div>
    `
  }
  botones = document.getElementsByClassName("compra");
  botones2 = document.getElementsByClassName("verMas");
  for (const boton of botones){
    boton.onclick = () => {
      const prodACarro = productos.find((producto) => producto.id == boton.id);
      agregarCarrito(prodACarro);
      Toastify({
        text: "Producto agregado al carrito!",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
        }).showToast();
    }
  }
  for (const boton of botones2){
    boton.onclick = async() => {
      let arrayInfoManga = await fetchMangaInfo(`${boton.id}`);
      console.log(arrayInfoManga)
      console.log(arrayInfoManga[0].title)
      Swal.fire({
        title: `${arrayInfoManga[0].title}`,
        imageUrl: `${arrayInfoManga[0].picture_url}`,
        imageAlt: 'Imagen Manga',
        html: `${arrayInfoManga[0].description}`,
        footer: `<a href="${arrayInfoManga[0].myanimelist_url}" target="_blank">Ver Más</a>`,
      })
    }
  }
}

function limpiarContenedorProductos () {
  contenedorProds.innerHTML = `
  `
}

botonFiltrar.onclick = () => {
  let sinFiltro = true;
  let filtroPorSerie;
  let filtroPorAutor;
  let filtroPorPrecio;
  let tablaConDuplicados = [];
  limpiarContenedorProductos();
  for (i = 0; i < checkboxSeries.length; i++) {
    console.log(checkboxSeries[i].checked);
    if (checkboxSeries[i].checked == true) {
      //renderizarProductos(filtrarPorNombreSerie(checkboxSeries[i].value));
      filtroPorSerie = filtrarPorNombreSerie(checkboxSeries[i].value)
      tablaConDuplicados = tablaConDuplicados.concat(filtroPorSerie);
      console.table(tablaConDuplicados);
      sinFiltro = false;
    }
  }
  for (i = 0; i < checkboxAutores.length; i++) {
    console.log(checkboxAutores[i].checked);
    if (checkboxAutores[i].checked == true) {
      //renderizarProductos(filtrarPorNombreAutor(checkboxAutores[i].value));
      filtroPorAutor = filtrarPorNombreAutor(checkboxAutores[i].value)
      tablaConDuplicados = tablaConDuplicados.concat(filtroPorAutor);
      console.table(tablaConDuplicados);
      sinFiltro = false;
    }
  }
  if (textBoxPrecio.value > 0) {
    //renderizarProductos(filtrarPorPrecio(textBoxPrecio.value));
    filtroPorPrecio = filtrarPorPrecio(textBoxPrecio.value)
    tablaConDuplicados = tablaConDuplicados.concat(filtroPorPrecio);
    sinFiltro = false;
  }
  if(sinFiltro == true){
    renderizarProductos(productos);
  }

  console.table(tablaConDuplicados)
  let tablaDefinitiva = removerDuplicados(tablaConDuplicados);
  renderizarProductos(tablaDefinitiva);
}

function removerDuplicados(inArray){
  let arr = inArray.concat()
  for(let i=0; i<arr.length; ++i) {
    for(var j=i+1; j<arr.length; ++j) {
      if(arr[i] === arr[j]) {
          arr.splice(j, 1);
      }
    }
  }
  for(let i=0; i<arr.length; ++i) {
    if(arr[i] == undefined) {
        arr.splice(i, 1);
    }
  }
  return arr;
}

function agregarCarrito(producto){
  let found = carrito.find(item => item.id === producto.id);
  if (found) {
      found.cantidad++;
      localStorage.setItem("carrito", JSON.stringify(carrito));
  } else {
      producto.cantidad = 1;
      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));
  }
}

function reemplazarEspacios(nombreProducto){
  let nuevaCadena = nombreProducto.replace(/ /g, '%20');
  return nuevaCadena;
}