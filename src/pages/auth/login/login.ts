import type { IUser } from "../../../types/IUser";
import { navigate } from "../../../utils/navigate";
import { initializeUsers, saveUser } from "../../../utils/localStorage";

initializeUsers(); //Se inicializa el admin
const form = document.getElementById("form") as HTMLFormElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const users: IUser[] = JSON.parse(localStorage.getItem("users") || "[]");
  const formData = new FormData(form);
  const valueEmail = formData.get("email") as string;
  const valuePassword = formData.get("password") as string;
  /*const valueRol = formData.get("rol") as Rol;*/

  console.log("Valor del email:", valueEmail);
  console.log("Valor de la contraseña:", valuePassword);
  /*console.log("Valor del rol:", valueRol);*/

  console.log("Usuarios registrados:", users);
  const userFound = users.find((user) => user.email === valueEmail.toLowerCase() && user.password === valuePassword);
  console.log("Usuario encontrado:", userFound);
  const user_active: IUser = {
    email: valueEmail,
    role: userFound?.role || "client",
    loggedIn: true,
  };

  if (!userFound) {
    alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    return;
  }
  else {
    saveUser(user_active);
    if (user_active.role === "admin") {
      navigate("/src/pages/admin/home/home.html");
      }
      else if (user_active.role === "client") {
        navigate("/src/pages/store/home/home.html");
      }
    }

});


const registerButton = document.getElementById("registerButton") as HTMLButtonElement;
registerButton.addEventListener("click", () => {
  navigate("/src/pages/auth/registro/registro.html");
});