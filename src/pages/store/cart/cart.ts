import type { Product } from "../../../types/product";
import { getCart, getCartFromStorage, getUSer } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

const cartItems : Product[] = getCartFromStorage(getUSer()!)! || getCart();

console.log(cartItems);

const cartItemsList = document.getElementById('cartItemsList') as HTMLUListElement;
const cartTotalSpan = document.getElementById('cartTotal') as HTMLSpanElement;

const cartGroupItems = new Map<number, number>();
let total = 0;

cartItems.forEach(item => {
    if (cartGroupItems.has(item.id)) {
        cartGroupItems.set(item.id, cartGroupItems.get(item.id)! + 1);
    } else {
        cartGroupItems.set(item.id, 1);
    }
    total += item.precio;
});

console.log(cartGroupItems);

if (cartItems.length !== 0) {
    
cartItemsList.innerHTML = '';

cartGroupItems.forEach((quantity, item) => {
    const listItem = document.createElement('li');
    const itemData = cartItems.find(product => product.id === item);
    listItem.textContent = `${itemData?.nombre} - $${itemData?.precio.toLocaleString()} x ${quantity}`;
    cartItemsList.appendChild(listItem);
});

    cartTotalSpan.textContent = total.toLocaleString();
}

else {
    cartItemsList.textContent = 'Carrito vacío';
    cartTotalSpan.textContent = '0.00';
}

const returnStoreButton = document.getElementById('returnStoreButton') as HTMLButtonElement;
returnStoreButton.addEventListener('click', () => {
    navigate('/src/pages/store/home/home.html');
});

const clearCartButton = document.getElementById('clearCartButton') as HTMLButtonElement;
clearCartButton.addEventListener('click', () => {
    localStorage.removeItem(getUSer()!.email);
    cartItemsList.innerHTML = '';
    cartItemsList.textContent = 'Carrito vacío';
    cartTotalSpan.textContent = '0.00';
});