import type { IUser } from "../../../types/IUser.ts";
import { initializeUsers } from "../../../utils/localStorage.ts";
import { navigate } from "../../../utils/navigate.ts";

initializeUsers(); //Se inicializa el admin

const form = document.querySelector('form') as HTMLFormElement;
localStorage.setItem('users', JSON.stringify([])); // Inicializamos el array de usuarios en localStorage


form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const formData = new FormData(form);
    const usuario: IUser = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        loggedIn: false,
        role: 'client' // Asignamos un rol por defecto
    };
    console.log('Usuario registrado:', usuario);
    const users: IUser[] = JSON.parse(localStorage.getItem('users') || '[]'); // Obtenemos el array de usuarios desde localStorage
    if (users.some(user => user.email === usuario.email)) {
        alert('El email ya está registrado. Por favor, utiliza otro email.');
        return;
    }
    else {
        users.push(usuario); // Agregamos el nuevo usuario al array
        localStorage.setItem('users', JSON.stringify(users)); // Guardamos el array actualizado en localStorage
        console.log('Usuarios en localStorage:', localStorage.getItem('users'));
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        navigate('/src/pages/auth/login/login.html'); // Redirigimos al usuario a la página de login
    }
});