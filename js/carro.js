const checkboxes = document.querySelectorAll('.checkbox-producto');
const productosSeleccionadosLista = document.getElementById('productos-seleccionados');
const totalElemento = document.getElementById('total');
const botonLimpiar = document.getElementById('boton-limpiar');
const botonPagar = document.getElementById('boton-pagar');
const modalPago = document.getElementById('modal-pago');
const formularioPago = document.getElementById('formulario-pago');
const botonCerrar = document.getElementById('boton-cerrar');
const descripcionProductoClass = 'descripcion-producto';
const nombreProductoClass = 'nombre-producto';
const precioProductoClass = 'precio-producto';
const productosSeleccionadosOrden = [];

checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        actualizarCarrito(checkbox);
    });
});

botonLimpiar.addEventListener('click', function () {
    // Desmarcar todos los productos seleccionados
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
    });

    // Limpiar la lista de productos seleccionados
    productosSeleccionadosOrden.length = 0;
    productosSeleccionadosLista.innerHTML = '';

    // Restablecer el total
    totalElemento.textContent = 'Total: $0.00';
});

botonPagar.addEventListener('click', function () {
    // Verificar si hay al menos un producto seleccionado antes de permitir el pago
    if (productosSeleccionadosOrden.length > 0) {
        modalPago.style.display = 'block';
    } else {
        alert('Por favor, selecciona al menos un producto antes de proceder al pago.');
    }
});

function actualizarCarrito(checkbox) {
    const nombreProducto = checkbox.parentElement.querySelector(`.${nombreProductoClass}`).innerText;
    const precioProducto = parseFloat(checkbox.parentElement.querySelector(`.${precioProductoClass}`).innerText.replace('$', ''));
    const imagenProducto = checkbox.parentElement.querySelector('img').src;
    const descripcionProducto = checkbox.parentElement.querySelector(`.${descripcionProductoClass}`).innerText;

    if (checkbox.checked) {
        // Agregar el producto a la lista de productos seleccionados
        productosSeleccionadosOrden.push({
            nombre: nombreProducto,
            precio: precioProducto,
            imagen: imagenProducto,
            descripcion: descripcionProducto
        });
    } else {
        // Eliminar el producto de la lista de productos seleccionados si está desmarcado
        const indice = productosSeleccionadosOrden.findIndex(producto => producto.nombre === nombreProducto);
        if (indice !== -1) {
            productosSeleccionadosOrden.splice(indice, 1);
        }
    }

    // Actualizar los productos seleccionados mostrados y el total
    productosSeleccionadosLista.innerHTML = '';
    let total = 0;
    productosSeleccionadosOrden.forEach(function (producto) {
        total += producto.precio;

        const listItem = document.createElement('li');
        listItem.className = 'producto-seleccionado';
        listItem.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div>
                <span>${producto.nombre}</span>
                <p>${producto.descripcion}</p>
            </div>
        `;
        productosSeleccionadosLista.appendChild(listItem);
    });

    totalElemento.textContent = 'Total: $' + total.toFixed(2);
}

// Función para simular el envío de pago (debes reemplazar esto con tu lógica de procesamiento de pago real)
window.enviarPago = function () {
    if (validarFormulario()) {
        alert('Pago enviado exitosamente');
        modalPago.style.display = 'none';
        limpiarFormularioPago();
    } else {
        alert('Por favor, completa todos los campos obligatorios.');
    }
};

// Función para cerrar el modal
window.cerrarModal = function () {
    modalPago.style.display = 'none';
    limpiarFormularioPago();
};

// Función para validar el formulario
function validarFormulario() {
    const inputs = formularioPago.querySelectorAll('input:required');
    let esValido = true;

    inputs.forEach(function (input) {
        if (!input.validity.valid) {
            esValido = false;
        }
    });

    return esValido;
}

// Función para limpiar el formulario de pago
function limpiarFormularioPago() {
    const inputs = formularioPago.querySelectorAll('input');
    inputs.forEach(function (input) {
        input.value = '';
    });
}