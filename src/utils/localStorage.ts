import type { IUser } from "../types/IUser";

export const saveUser = (user: IUser) => {
  const parseUser = JSON.stringify(user);
  localStorage.setItem("userData", parseUser);
};
export const getUSer = () => {
  return localStorage.getItem("userData");
};
export const removeUser = () => {
  localStorage.removeItem("userData");
};

const user: IUser = {
  email: 'admin@admin.com',
  password: 'admin',
  loggedIn: false,
  role: 'admin'
};

localStorage.setItem('users', JSON.stringify([user]));  //Se inicializa un admin por defecto para facilitar las pruebas