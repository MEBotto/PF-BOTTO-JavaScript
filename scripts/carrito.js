let botonComprarCarrito = document.getElementById("botonComprarCarrito");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let botonesSumarCantidad;
let botonesRestarCantidad;
let botonesEliminar;
let labelCantidad;
let labelSubtotal;
let tablaCarrito = document.getElementById("tablaCarrito");
let resumenCarrito = document.getElementById("resumenCarrito");
let envio;
let cantidadTotalProdsCarrito = 0;
let totalPrecioProductos = 0;
let labelPrecioProductos;
let labelPrecioEnvio;
let labelPrecioTotal;
let labelCantidadTotalProds;

if (carrito.length == 0){
  carritoLengthCero();
}
else{
  mostrarEnCarrito();
  habilitarBotones();
}

function habilitarBotones(){
  botonesSumarCantidad = document.getElementsByClassName("btnMas");
  botonesRestarCantidad = document.getElementsByClassName("btnMenos");
  botonesEliminar = document.getElementsByClassName("btnEliminar");
  
  for (const boton of botonesEliminar){
    boton.onclick = () => {
      let index = carrito.findIndex(item => item.id == boton.id);
      if (index !== -1) {
        // Elimina el elemento del array utilizando splice
        carrito.splice(index, 1);
        
        // Almacena el array actualizado en el localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarEnCarrito();
        labelPrecioEnvio = document.getElementById("precioEnvio");
        labelPrecioProductos = document.getElementById("precioTotalProds");
        labelPrecioTotal = document.getElementById("precioTotal");
        labelCantidadTotalProds = document.getElementById("cantidadTotalProds");
        totalPrecioProductos = 0;
        cantidadTotalProdsCarrito = 0;
        for(const prods of carrito){
          totalPrecioProductos = totalPrecioProductos + prods.precio * prods.cantidad;
          cantidadTotalProdsCarrito = cantidadTotalProdsCarrito + prods.cantidad;
        }
        envio = totalPrecioProductos * 0.1;
        labelPrecioProductos.textContent = `$${totalPrecioProductos}`;
        if(cantidadTotalProdsCarrito > 10){
          labelPrecioEnvio.textContent = "Gratis!"
          labelPrecioTotal.textContent = `$${totalPrecioProductos}`;
        }
        else{
          labelPrecioTotal.textContent = `$${totalPrecioProductos + envio}`;
          labelPrecioEnvio.textContent = `$${envio}`;
        }
        labelCantidadTotalProds.textContent = `Productos(${cantidadTotalProdsCarrito})`;
      }
      console.log(carrito.length)
      if (carrito.length == 0){
        carritoLengthCero();
        localStorage.removeItem("carrito");
      }
    }
  }
  for (const boton of botonesSumarCantidad){
    boton.onclick = () => {
      let found = carrito.find(item => item.id == boton.id);
      console.log(carrito)
      found.cantidad++;
      localStorage.setItem("carrito", JSON.stringify(carrito));
      console.log(found.cantidad)
      labelCantidad = document.getElementById(`${boton.id}Label`);
      labelSubtotal = document.getElementById(`${boton.id}Subtotal`);
      labelPrecioEnvio = document.getElementById("precioEnvio");
      labelPrecioProductos = document.getElementById("precioTotalProds");
      labelPrecioTotal = document.getElementById("precioTotal");
      labelCantidadTotalProds = document.getElementById("cantidadTotalProds");
      console.log(labelCantidad.textContent)
      labelCantidad.textContent = found.cantidad;
      labelSubtotal.textContent = `$${found.cantidad * found.precio}`;
      totalPrecioProductos = 0;
      cantidadTotalProdsCarrito = 0;
      for(const prods of carrito){
        totalPrecioProductos = totalPrecioProductos + prods.precio * prods.cantidad;
        cantidadTotalProdsCarrito = cantidadTotalProdsCarrito + prods.cantidad;
      }
      envio = totalPrecioProductos * 0.1;
      
      labelPrecioProductos.textContent = `$${totalPrecioProductos}`;
      if(cantidadTotalProdsCarrito > 10){
        labelPrecioEnvio.textContent = "Gratis!"
        labelPrecioTotal.textContent = `$${totalPrecioProductos}`;
      }
      else{
        labelPrecioTotal.textContent = `$${totalPrecioProductos + envio}`;
        labelPrecioEnvio.textContent = `$${envio}`;
      }
      labelCantidadTotalProds.textContent = `Productos(${cantidadTotalProdsCarrito})`;
    }
  }
  for (const boton of botonesRestarCantidad){
    boton.onclick = () => {
      console.log("Resto")
      console.log(boton.id)
      let found = carrito.find(item => item.id == boton.id);
      if (found.cantidad > 0){
        found.cantidad--;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        labelCantidad = document.getElementById(`${boton.id}Label`);
        labelSubtotal = document.getElementById(`${boton.id}Subtotal`);
        labelPrecioEnvio = document.getElementById("precioEnvio");
        labelPrecioProductos = document.getElementById("precioTotalProds");
        labelPrecioTotal = document.getElementById("precioTotal");
        labelCantidadTotalProds = document.getElementById("cantidadTotalProds");
        console.log(labelCantidad.textContent)
        labelCantidad.textContent = found.cantidad;
        labelSubtotal.textContent = `$${found.cantidad * found.precio}`;
        totalPrecioProductos = 0;
        cantidadTotalProdsCarrito = 0;
        for(const prods of carrito){
          totalPrecioProductos = totalPrecioProductos + prods.precio * prods.cantidad;
          cantidadTotalProdsCarrito = cantidadTotalProdsCarrito + prods.cantidad;
        }
        envio = totalPrecioProductos * 0.1;
        labelPrecioProductos.textContent = `$${totalPrecioProductos}`;
        if(cantidadTotalProdsCarrito > 10){
          labelPrecioEnvio.textContent = "Gratis!"
          labelPrecioTotal.textContent = `$${totalPrecioProductos}`;
        }
        else{
          labelPrecioTotal.textContent = `$${totalPrecioProductos + envio}`;
          labelPrecioEnvio.textContent = `$${envio}`;
        }
        labelCantidadTotalProds.textContent = `Productos(${cantidadTotalProdsCarrito})`;
      }
      else if (found.cantidad == 0){
        let index = carrito.findIndex(item => item.id == boton.id);
        if (index !== -1) {
          // Elimina el elemento del array utilizando splice
          carrito.splice(index, 1);
          
          // Almacena el array actualizado en el localStorage
          localStorage.setItem("carrito", JSON.stringify(carrito));
          mostrarEnCarrito()
        }
        console.log(carrito.length)
        if (carrito.length == 0){
          carritoLengthCero();
          localStorage.removeItem("carrito");
        }
      }
      else {
        Toastify({
          text: "No puedes tener cantidad negativa!",
          duration: 3000,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          }
          }).showToast();
      }
    }
  }
}

for (const prods of carrito){
  console.log(prods.cantidad)
}
function mostrarEnCarrito(){
  tablaCarrito.innerHTML = ``;
  resumenCarrito.innerHTML =``;
  for (const prods of carrito){
    cantidadTotalProdsCarrito = cantidadTotalProdsCarrito + prods.cantidad
  }
  console.log(carrito.length)
  if (carrito.length != 0){
    for(const producto of carrito){
      tablaCarrito.innerHTML += `
      <div class="row">
        <div class="col-1 d-flex align-items-center">
          <img src="../${producto.imagen}" alt="foto portada" width="64px">
        </div>
        <div class="col-4">
          <div class="row ">
            <h3 class="text-center">${producto.serie} ${producto.tomo}</h3>
          </div>
          <div class="row">
            <div class="offset-4 col-2">
             <button type="button" class="btnEliminar btn btn-danger" id="${producto.id}">Eliminar</button>
            </div>
          </div>
        </div>
        <div class="offset-1 col-2 d-flex align-items-center">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btnMenos btn btn-primary" id="${producto.id}">-</button>
            <label class="form-control" id="${producto.id}Label">${producto.cantidad}</label>
            <button type="button" class="btnMas btn btn-primary" id="${producto.id}">+</button>
          </div>
        </div>
        <div class="col-2">
          <div class="row">
            <h3 class="text-center">Precio p/u</h3>
          </div>
          <div class="row">
            <h4 class="text-center">$${producto.precio}</h4>
          </div>
        </div>
        <div class="col-2">
          <div class="row">
            <h3 class="text-center">Subtotal</h3>
          </div>
          <div class="row">
          <h4 class="text-center" id="${producto.id}Subtotal">$${producto.precio * producto.cantidad}</h4>
          </div>
        </div>
      </div>
      <hr class="dropdown-divider">
      `
      //Medidas
      console.log(tablaCarrito.clientHeight)
      totalPrecioProductos = totalPrecioProductos + producto.precio * producto.cantidad
    }
  }
  envio = totalPrecioProductos * 0.1
  if (cantidadTotalProdsCarrito > 10){
    resumenCarrito.innerHTML += `
    <div class="row">
      <div class="col-5">
        <p id="cantidadTotalProds">Productos(${cantidadTotalProdsCarrito})</p>
      </div>
      <div class="offset-2 col-5">
        <p id="precioTotalProds">$${totalPrecioProductos}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-5">
        <p>Envío</p>
      </div>
      <div class="offset-2 col-5">
        <p id="precioEnvio">Gratis!</p>
      </div>
    </div>
    <hr class="dropdown-divider">
    <div class="row">
      <div class="col-5">
        <p style="font-weight: bolder;">Total</p>
      </div>
      <div class="offset-2 col-5">
      <p style="font-weight: bolder;" id="precioTotal">$${totalPrecioProductos}</p>
      </div>
    </div>
  `
  }
  else {
    resumenCarrito.innerHTML += `
    <div class="row">
      <div class="col-5">
        <p id="cantidadTotalProds">Productos(${cantidadTotalProdsCarrito})</p>
      </div>
      <div class="offset-2 col-5">
        <p id="precioTotalProds">$${totalPrecioProductos}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-5">
        <p>Envío</p>
      </div>
      <div class="offset-2 col-5">
        <p id="precioEnvio">$${envio}</p>
      </div>
    </div>
    <hr class="dropdown-divider">
    <div class="row">
      <div class="col-5">
        <p style="font-weight: bolder;">Total</p>
      </div>
      <div class="offset-2 col-5">
      <p style="font-weight: bolder;" id="precioTotal">$${envio + totalPrecioProductos}</p>
      </div>
    </div>
  `
  }
  habilitarBotones();
}

botonComprarCarrito.onclick = () => {
  Toastify({
    text: "Tu pedido fue realizado. Lo recibirás dentro de 48hs.",
    duration: 3000,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    }
    }).showToast();
  carrito = [];
  localStorage.removeItem("carrito");
  carritoLengthCero();
}

function carritoLengthCero () {
  tablaCarrito.innerHTML = `
  <div class="d-flex justify-content-center mt-5">
    <img class="d-flex justify-content-center" src="../img/carrito.png" height="64px" width="64px"/>
  </div>
  <h2 class="text-center mt-3">¡Parece que no tienes nada en el carrito!</h2>
  <p class="text-center">¡Empieza a agregar productos para tener envio gratis!</p>
  <p class="text-center mb-5">Agrega mas de 10 productos para tener envio <b>GRATIS</b></p>
  <a href="../index.html" class="btn btn-primary">Volver a la Tienda</a>
  `;
  resumenCarrito.innerHTML = `
  <p class="text-center mb-1">¡Aquí se mostrara el resumen de tu compra!</p>
  `
  botonComprarCarrito.setAttribute("disabled", true)
}