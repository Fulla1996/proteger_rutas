import {categorias, productos} from './data.js';


function cargarCategorias() {
    const listCategories = document.getElementById('categoryList');
    categorias.forEach(element => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="#">${element}</a>`;
        listCategories.appendChild(listItem);
    });
}

function cargarProductos() {
    const productsSection = document.getElementById('productsSection');
    productos.forEach(producto => {
        const productCard = document.createElement('article');
        productCard.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.categoria + " con " + producto.descripcion}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio.toLocaleString()}</p>
        `;
        productsSection.appendChild(productCard);
    });
}

cargarCategorias();
cargarProductos();