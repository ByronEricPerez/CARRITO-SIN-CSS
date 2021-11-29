var productos = [
  {
    nombre: "rtx3060",
    precio: 15000,
    cantidad: 20,
  },
  {
    nombre: "gtx1080",
    precio: 14000,
    cantidad: 20,
  },
  {
    nombre: "gtx690",
    precio: 60000,
    cantidad: 20,
  },
];

var carrito = JSON.parse(localStorage.getItem("Jorge"));
if (localStorage.getItem("Jorge") == null) {
  carrito = [];
}

var listado = [];

function construirListado() {
  var listaProductos = document.createElement("div");

  let titulo = document.createElement("h2");
  titulo.textContent = "productos";
  listaProductos.appendChild(titulo);

  for (var i = 0; i < productos.length; i++) {
    var laptop = document.createElement("button");

    laptop.onclick = function () {
      agregarProducto(this.textContent);
    };

    laptop.textContent = productos[i].nombre;
    listaProductos.appendChild(laptop);
  }

  document.body.appendChild(listaProductos);
}

function construirDOMCarrito() {
  let carroViejo = document.getElementById("carrito");

  var total = 0;

  if (carroViejo) {
    carroViejo.remove();
  }

  var listaCarrito = document.createElement("div");

  let tituloC = document.createElement("h3");
  tituloC.textContent = "Carrito";
  listaCarrito.appendChild(tituloC);

  listaCarrito.id = "carrito";

  for (var i = 0; i < carrito.length; i++) {
    total += carrito[i].cantidad * carrito[i].precio;

    var laptop = document.createElement("p");
    laptop.textContent = carrito[i].nombre + " (" + carrito[i].cantidad + ")";

    listaCarrito.appendChild(laptop);

    var removerBoton = document.createElement("button");

    removerBoton.textContent = "remover";

    removerBoton.value = carrito[i].nombre;

    removerBoton.onclick = function () {
      removerProductoDelCarro(this.value);
    };
    laptop.appendChild(removerBoton);
  }

  document.body.appendChild(listaCarrito);
  var totalElemento = document.createElement("p");
  totalElemento.textContent = "total:" + total;
  listaCarrito.appendChild(totalElemento);
}

construirListado();
construirDOMCarrito();

function agregarProducto(productoNombre) {
  var producto;

  for (var i = 0; i < productos.length; i++) {
    if (productos[i].nombre == productoNombre) {
      producto = productos[i];
    }
  }

  if (producto) {
    if (producto.cantidad > 0) {
      producto.cantidad -= 1;

      var productoCarrito;

      for (var i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre == productoNombre) {
          productoCarrito = carrito[i];
        }
      }

      if (productoCarrito) {
        productoCarrito.cantidad += 1;
      } else {
        carrito.push({
          nombre: productoNombre,
          cantidad: 1,
          precio: producto.precio,
        });
      }
    }
  }

  localStorage.setItem("Jorge", JSON.stringify(carrito));

  construirDOMCarrito();
}

//1 - verificar que exista el producto
//2 - si existe el producto, verificar que el producto este en el carro
//3 - si esta en el carro, restar 1 a cantidad
//4 - si cantidad es 0 o menor, sacar el carro

function removerProductoDelCarro(productoNombreParaSacar) {
  var producto;

  // buscamos el producto a remover
  for (let i = 0; i < productos.length; i += 1) {
    if (productos[i].nombre == productoNombreParaSacar) {
      producto = productos[i];
    }
  }

  // 1 - verificar que el producto a remover exista
  if (producto) {
    let productoParaRemover;

    // buscar el producto en el carro
    for (let i = 0; i < carrito.length; i += 1) {
      if (carrito[i].nombre == productoNombreParaSacar) {
        productoParaRemover = carrito[i];
        // 4 - sacar de la lista si ya no tiene cantidad
        if (productoParaRemover.cantidad - 1 <= 0) {
          carrito.splice(i, 1);
        }
      }
    }

    // 3 - si esta en el carro, restar 1
    if (productoParaRemover) {
      productoParaRemover.cantidad -= 1;
    }

    // renovar stock de producto
    producto.cantidad += 1;
  }

  localStorage.setItem("Jorge", JSON.stringify(carrito));

  construirDOMCarrito();
}

//1 precio de cada uno
//2 mutiplicarlo x cantidad
//3 sumar total
//4 mostrar total

//jQuery

$("main h2").css("color", "white");
$("main h2").css("background-color", "blue");

$(document).ready(inicio);
function inicio() {
  $("#esconde").click(esconder);
  $("#muestra").click(mostrar);
}

function esconder() {
  $("#texto").fadeOut("slow");
}
function mostrar() {
  $("#texto").fadeIn("fast");
}

//AJAX

let urlCLIMA =
  "api.openweathermap.org/data/2.5/weather?q=Chubut&appid=3fa3cfd7778e196676fbea877e64d79f";

$.ajax({
  url: "http://api.openweathermap.org/data/2.5/weather",
  type: "GET",
  data: {
    q: "Esquel",
    appid: "3fa3cfd7778e196676fbea877e64d79f",
    dataType: "jsonp",
    units: "metric",
  },
  success: function (data) {
    let icono = data.weather[0].icon;
    let iconoURL = "http://openweathermap.org/img/w/" + icono + ".png";
    $("#icono").attr("src", iconoURL);
    let contenido = `<div>
                            <p>${data.name}</p>                            
                            <p>${data.weather[0].main}</p>
                            <p>TEMP MAX: ${data.main.temp_max}</p>
                            <p>TEMP MIN: ${data.main.temp_min}</p>

                        </div>`;

    $("#caja").append(contenido);
  },
});
