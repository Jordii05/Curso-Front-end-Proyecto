const mostrarProductos = async () => {
  try {
    const response = await fetch("productos.json");
    const productos = await response.json();
    const listadoProductosDestacados = document.querySelector(".productos");
    listadoProductosDestacados.innerHTML = "";

    productos.productosDestacados.forEach((producto) => {
      const html = `
      <article class="producto">
        <img class="imagen" src="${producto.imagen}" alt="${producto.alt}">
        <h3>${producto.titulo}</h3>
        <p>$${producto.precio}</p>
        <div class="detalles">
          <button id=${producto.id} type="submit" onclick="agregarCarrito(${producto.id})" ><h3>${producto.detalles.carrito}</h3></button>
          <h4><a href="#">${producto.detalles.enlace}</a></h4>
        </div>
      </article>
        `;
      listadoProductosDestacados.innerHTML += html;
    });

    const ListadoProductosConDescuento = document.querySelector(".nuevos");
    ListadoProductosConDescuento.innerHTML = "";
    productos.productosConDescuento.forEach((producto) => {
      const html = `
        <article class="nuevo">
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
            <button id=${producto.id} type="submit"><h3>${producto.detalles.carrito}</h3></button>
            <h4><a href="#">${producto.detalles.enlace}</a></h4>
          </div>
        </article>
        `;
      ListadoProductosConDescuento.innerHTML += html;
    });
  } catch (error) {
    console.log("Error");
  }
};

mostrarProductos();

function agregarCarrito(idProducto) {
  const cantidad = document.getElementById("cantidadProductos");
  const numero = parseInt(cantidad.innerHTML);

  cantidad.innerHTML=numero+1;
}
