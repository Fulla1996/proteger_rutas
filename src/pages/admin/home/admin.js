import {PRODUCTS} from '../../../data/data.ts';

function cargarProductos() {
    const productsTable = document.getElementById('productTable');
    PRODUCTS.forEach(producto => {
        const productRow = document.createElement('tr');
        productRow.innerHTML = `
            <td>${producto.id}</td>
            <td><img src="${producto.imagen}" alt="${producto.categoria + " con " + producto.descripcion}"></td>
            <td>${producto.nombre}</td>
            <td>${producto.categorias}</td>
            <td>$${producto.precio.toLocaleString()}</td>
            <td>${producto.stock}</td>
            <td>
                <a href="#">Editar</a>
                <a href="#">Eliminar</a>
            </td>
        `;
        productsTable.appendChild(productRow);
    });
}


cargarProductos();