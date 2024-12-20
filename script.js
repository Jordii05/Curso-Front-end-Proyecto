//funciones
const mostrarProductos = async () => {
  //muestra dinamicamente los productos en el json
  try {
    const response = await fetch("productos.json");
    const productos = await response.json();
    const listadoProductosDestacados = document.querySelector(".productos");
    if (listadoProductosDestacados) {
      listadoProductosDestacados.innerHTML = "";

      productos.productosDestacados.forEach((producto) => {
        //console.log(producto);
        const html = `
        <article  id="${producto.id}" class="producto">
          <img class="imagen" src="${producto.imagen}" alt="${producto.alt}">
          <h3>${producto.titulo}</h3>
          <p>$${producto.precio}</p>
          <div class="detalles">
            <button type="submit" onclick="agregarCarrito(${producto.id})" ><h3>${producto.detalles.carrito}</h3></button>
            <h4><a href="#">${producto.detalles.enlace}</a></h4>
          </div>
        </article>
          `;
        listadoProductosDestacados.innerHTML += html;
      });
    }

    const ListadoProductosConDescuento = document.querySelector(".nuevos");
    if (ListadoProductosConDescuento) {
      ListadoProductosConDescuento.innerHTML = "";

      productos.productosConDescuento.forEach((producto) => {
        //console.log(producto);

        const html = `
          <article id="${producto.id}" class="nuevo">
            <img class="sale" src="${producto.imagenes.sale}" alt="${producto.alt}">
            <img  class="imagenNuevo" src="${producto.imagenes.producto}" alt="Buzo Oversize Azul">
            <div class="datos">
              <h3>${producto.titulo}</h3>
              <p class="precioSinDescuento">$${producto.precios.sinDescuento}</p>
              <span class="descuento">${producto.descuento}</span>
              <p class="precioConDescuento">$${producto.precios.conDescuento}</p>
            </div>
            <hr>
            <div class="detalles">
              <button type="submit" onclick="agregarCarrito(${producto.id})"><h3>${producto.detalles.carrito}</h3></button>
              <h4><a href="#">${producto.detalles.enlace}</a></h4>
            </div>
          </article>
          `;
        ListadoProductosConDescuento.innerHTML += html;
      });
    }
  } catch (error) {
    console.log("Error", error);
  }
};

const agregarCarrito = async (idProducto) => {
  //agrega de forma dinamica el producto seleccionado al localStorage verificando si existe en el json
  try {
    const response = await fetch("productos.json");
    const data = await response.json();

    const productoDestacadoEncontrado = data.productosDestacados.find(
      (producto) => producto.id === parseInt(idProducto)
    );
    const productoConDescuentoEncontrado = data.productosConDescuento.find(
      (producto) => producto.id === parseInt(idProducto)
    );
    if (productoDestacadoEncontrado) {
      console.log("Producto encontrado:", productoDestacadoEncontrado);
      const cantidad = document.getElementById("cantidadProductos");
      cantidadProductos++;
      if (cantidad) {
        cantidad.innerHTML = cantidadProductos;
      }
      cantidad.innerHTML = cantidadProductos;
      localStorage.setItem(
        "cantidadProductos",
        JSON.stringify(cantidadProductos)
      );

      carritoActual.push({
        id: productoDestacadoEncontrado.id,
        titulo: productoDestacadoEncontrado.titulo,
        precio: productoDestacadoEncontrado.precio,
        imagen: productoDestacadoEncontrado.imagen,
        alt: productoDestacadoEncontrado.alt,
      });

      console.log("Carrito Actualizado:", carritoActual);

      localStorage.setItem("carritoActual", JSON.stringify(carritoActual));
      mostrarCarrito();
    } else if (productoConDescuentoEncontrado) {
      console.log("Producto encontrado:", productoConDescuentoEncontrado);
      const cantidad = document.getElementById("cantidadProductos");
      cantidadProductos++;
      if (cantidad) {
        cantidad.innerHTML = cantidadProductos;
      }
      cantidad.innerHTML = cantidadProductos;
      localStorage.setItem(
        "cantidadProductos",
        JSON.stringify(cantidadProductos)
      );

      carritoActual.push({
        id: productoConDescuentoEncontrado.id,
        titulo: productoConDescuentoEncontrado.titulo,
        precio: productoConDescuentoEncontrado.precios.conDescuento,
        descuento: productoConDescuentoEncontrado.descuento,
        imagen: productoConDescuentoEncontrado.imagenes.producto,
        alt: productoConDescuentoEncontrado.alt,
      });

      console.log("Carrito Actualizado:", carritoActual);

      localStorage.setItem("carritoActual", JSON.stringify(carritoActual));
      mostrarCarrito();
    } else {
      console.error("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al cargar el JSON:", error);
  }
};

const mostrarCarrito = () => {
  //muestra los productos que se agregaron al carrito en el localStorage en el html
  const carrito = JSON.parse(localStorage.getItem("carritoActual")) || [];
  const contenedorCarrito = document.querySelector(".productoAgregado");

  if (contenedorCarrito) {
    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
      contenedorCarrito.innerHTML = `<h3 id="carritoVacio">Carrito vacío</h3>
      <p>Para poder realizar una compra, le sugerimos que seleccione al menos un producto.</p>
      `;
    } else {
      carrito.forEach((producto) => {
        let html = "";

        if (producto["productosDestacados"]) {
          html = `
            <article class="agregado">
              <img class="imagenAgregada" src="${
                producto.imagenes.producto
              }" alt="${producto.alt}">
              <h3>${producto.titulo}</h3>
              <p>Precio original: <s>$${producto.precios.sinDescuento}</s></p>
              <p>Con descuento: $${producto.precios.conDescuento}</p>
              <button class="modificarCantidad" onclick="modificarCantidad(event, ${
                producto.id
              }, -1)">-</button>
              <label>Cantidad: <span id="cantidad">${
                producto.cantidad || 1
              }</span></label>
              <button class="modificarCantidad" onclick="modificarCantidad(event, ${
                producto.id
              }, 1)">+</button>
              <button class="eliminar" data-id="${
                producto.id
              }">Eliminar</button>
            </article>
          `;
        } else {
          html = `
            <article class="agregado">
              <img class="imagenAgregada" src="${producto.imagen}" alt="${
            producto.alt
          }">
              <h3>${producto.titulo}</h3>
              <p>$${producto.precio * (producto.cantidad || 1)}</p>
              <button class="modificarCantidad" onclick="modificarCantidad(event, ${
                producto.id
              }, -1)">-</button>
              <label>Cantidad: <span id="cantidad">${
                producto.cantidad || 1
              }</span></label>
              <button class="modificarCantidad" onclick="modificarCantidad(event, ${
                producto.id
              }, 1)">+</button>
              <button class="eliminar" data-id="${
                producto.id
              }">Eliminar</button>
            </article>
          `;
        }

        contenedorCarrito.innerHTML += html;
      });
      contenedorCarrito.innerHTML += `<h3>Tu satisfacción es nuestra prioridad,</h3>
          <p>trabajamos para ofrecerte prendas de la mejor calidad, pero entendemos que a veces pueden surgir inconvenientes. Por ese motivo,
          Si el producto que adquiriste no cumplió con tus expectativas o presenta algún defecto, no te preocupes. Estamos aquí para ayudarte.</p>
          <ul>
          <li>Puedes solicitar un cambio en un plazo de 7 días a partir de la fecha de compra.</li>
          <li>La prenda debe estar en las mismas condiciones en las que fue entregada.</li>
          <li>Solo necesitas traer tu ticket o comprobante de compra.</li>

          <ul>
          <p>Esperemos que disfrutes de la/s prendas y que nos veamos pronto!.</p>`;
      contenedorCarrito.innerHTML += `<button class="confirmar">Confirmar Compra</button>`;
      contenedorCarrito.innerHTML += `<button class="vaciar">Vaciar Carrito</button>`;
    }
    contenedorCarrito.innerHTML += `
            <p>En EstiloUrbano, nos enorgullece ofrecerte prendas de la más alta calidad, diseñadas con materiales seleccionados y confeccionadas con el máximo cuidado. 
            Cada detalle de nuestras colecciones está pensado para brindarte comodidad, estilo y durabilidad, porque sabemos que mereces lo mejor.</p>`;
  }
};

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("vaciar")) {
    carritoActual = [];
    localStorage.setItem("carritoActual", JSON.stringify(carritoActual));
    cantidadProductos = 0;
    localStorage.setItem(
      "cantidadProductos",
      JSON.stringify(cantidadProductos)
    );
    console.log("Carrito Vaciado:", carritoActual);
    const cantidad = document.getElementById("cantidadProductos");
    if (cantidad) {
      cantidad.innerHTML = cantidadProductos;
    }

    mostrarCarrito();
  }

  if (event.target.classList.contains("eliminar")) {
    const id = event.target.dataset.id;
    let carrito = JSON.parse(localStorage.getItem("carritoActual")) || [];

    carrito = carrito.filter((producto) => producto.id !== Number(id));
    localStorage.setItem("carritoActual", JSON.stringify(carrito));
    console.log("Carrito actual:", carrito);
    let cantidadProductos =
      JSON.parse(localStorage.getItem("cantidadProductos")) || 0;
    if (cantidadProductos >= 0) {
      cantidadProductos--;
      localStorage.setItem(
        "cantidadProductos",
        JSON.stringify(cantidadProductos)
      );
    }

    const cantidad = document.getElementById("cantidadProductos");
    if (cantidad) {
      cantidad.innerHTML = cantidadProductos;
    }
    mostrarCarrito();
  }
});

mostrarCarrito();

function modificarCantidad() {}//terminar esto

//inicializaciones

let carritoActual = JSON.parse(localStorage.getItem("carritoActual")) || [];
let cantidadProductos =
  JSON.parse(localStorage.getItem("cantidadProductos")) || 0;

const cantidad = document.getElementById("cantidadProductos");

if (cantidad) {
  cantidad.innerHTML = cantidadProductos;
}

console.log("Carrito Inicial:", carritoActual);

mostrarProductos();