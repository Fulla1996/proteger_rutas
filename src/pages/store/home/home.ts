import {categorias, PRODUCTS} from '../../../data/data.ts';
import { logout } from "../../../utils/auth.ts";
import type { Product } from "../../../types/product.ts";
import { addToCart, getUSer, getCartFromStorage } from '../../../utils/localStorage.ts';
import { navigate } from '../../../utils/navigate.ts';

getCartFromStorage(getUSer()!); // Cargar el carrito desde localStorage al iniciar la página


const logoutLink = document.getElementById(
  "logoutLink"
) as HTMLAnchorElement;
logoutLink?.addEventListener("click", () => {
  logout();
  navigate('/src/pages/auth/login/login.html');
});

const searchButton = document.getElementById("btnSearchProduct") as HTMLButtonElement;
searchButton?.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault();
    const inputSearch = document.getElementById("inputSearchProduct") as HTMLInputElement;
    const searchValue = inputSearch.value.trim().toLowerCase();
    const filteredProducts = PRODUCTS.filter(product => product.nombre.toLowerCase().includes(searchValue) || 
        product.categorias.some(cat => cat.nombre.toLowerCase().includes(searchValue)));
    cargarProductos(filteredProducts);
})

function addClickEventToProducts() {
    const productCards = document.querySelectorAll('.productCard');
    productCards.forEach(card => {
    card.addEventListener('click', () => {
      const productoEncontrado = PRODUCTS.find(product => product.id.toString() === card.getAttribute('data-product-id'));
      console.log(card.getAttribute('data-product-id'));

      console.log('Producto encontrado:', productoEncontrado);
      if (productoEncontrado && getUSer()) {
        addToCart(productoEncontrado, getUSer());
        console.log('Producto seleccionado: ' + card.querySelector('h3')?.textContent);
        }
        
    });
});
}

function cargarCategorias() {
    const listCategories = document.getElementById('categoryList');
    if (!listCategories) return;
    categorias.forEach(element => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="#">${element.nombre}</a>`;
        listCategories.appendChild(listItem);
    });
  
}

function cargarProductos(listProducts: Product[] = PRODUCTS) {
    const productsSection = document.getElementById('productsSection');
    if (!productsSection) return;
    productsSection.innerHTML = ''; // Limpiar productos anteriores
    listProducts.forEach(producto => {
    const productCard = document.createElement('article');
    productCard.classList.add('productCard');
    productCard.setAttribute('data-product-id', producto.id.toString());
    productCard.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.descripcion}">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p>Precio: $${producto.precio.toLocaleString()}</p>
    `;
    productsSection.appendChild(productCard);
    });
    addClickEventToProducts();
}

cargarCategorias();
cargarProductos();

const shoppingCartButton = document.getElementById('shoppingCartButton') as HTMLButtonElement;

shoppingCartButton.addEventListener('click', () => {
    navigate('/src/pages/store/cart/cart.html');
});

const categoryLinks = document.querySelectorAll('#categoryList li a');
categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const categoryName = link.textContent;
        if (link.textContent === 'Todas') {
            cargarProductos();
            return;
        }
        else{
            const filteredProducts = PRODUCTS.filter(product => product.categorias.some(cat => cat.nombre === categoryName));
            cargarProductos(filteredProducts);
        }
            
    });
});


const adminElements = document.querySelectorAll('.admin');
if (getUSer()?.role !== 'admin') {
    adminElements.forEach(element => element.remove());
}

/*
const shoppingCartDiv = document.getElementById('shoppingCart') as HTMLDivElement;
const cartItemsList = document.getElementById('cartItemsList') as HTMLUListElement;
const cartTotalSpan = document.getElementById('cartTotal') as HTMLSpanElement;
const clearCartButton = document.getElementById('clearCartButton') as HTMLButtonElement;

shoppingCartButton.addEventListener('click', () => {
    shoppingCartDiv.hidden = !shoppingCartDiv.hidden;
    if (!shoppingCartDiv.hidden) {
        const cartItems : Product[] = getCart();
        cartItemsList.innerHTML = '';
        let total = 0;
        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.nombre} - $${item.precio.toLocaleString()}`;
            cartItemsList.appendChild(listItem);
            total += item.precio;
        });
        cartTotalSpan.textContent = total.toLocaleString();
    }
});*/