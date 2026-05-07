import type { IUser } from "../types/IUser";
import type { Product } from "../types/product";

export const shoppingCart : Product[] = [];

export const addToCart = (product: Product, currentUser?: IUser) => {
    shoppingCart.push(product);
    console.log(shoppingCart);
    if (currentUser)
      localStorage.setItem(currentUser.email, JSON.stringify(shoppingCart));
}

export const getCart = () => {
    return shoppingCart;
}

export const clearCart = () => {
    shoppingCart.length = 0;
}

export const saveCart = (currentUser : IUser) => {
    const parseCart = JSON.stringify(shoppingCart);
    localStorage.setItem(currentUser.email, parseCart);
}

export const getCartFromStorage = (currentUser : IUser) => {
    const cartData = localStorage.getItem(currentUser.email);
    if (cartData) {
        const parsedCart: Product[] = JSON.parse(cartData);
        shoppingCart.length = 0;
        shoppingCart.push(...parsedCart);
    }
}


export const saveUser = (user: IUser) => {
  const parseUser = JSON.stringify(user);
  localStorage.setItem("userData", parseUser);
};
export const getUSer = () => {
  const parseUser = localStorage.getItem("userData");
  
  if (parseUser) {
    return JSON.parse(parseUser) as IUser;
  }

};
export const removeUser = () => {
  localStorage.removeItem("userData");
};

export const initializeUsers = () => {
  const usuarios = JSON.parse(localStorage.getItem('users') || '[]') as IUser[];
  if (!usuarios.find(user => user.email === 'admin@admin.com'))
  {
    console.log('Inicializando usuario admin por defecto');
    const admin: IUser = {
      email: 'admin@admin.com',
      password: 'admin',
      loggedIn: false,
      role: 'admin'
    };
  usuarios.push(admin);
  console.log(usuarios);
  localStorage.setItem('users', JSON.stringify(usuarios)); //Se inicializa un admin por defecto para facilitar las pruebas
  }
};  
