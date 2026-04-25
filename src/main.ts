import { checkAuhtUser } from "./utils/auth";

function guard() {
    const path = window.location.pathname;

    if (path.includes("/src/pages/admin")) 
        {
            checkAuhtUser("/src/pages/auth/login/login.html", "/src/pages/client/home/home.html", "admin");
        }/*
        else if (path.includes("/src/pages/client")){
            checkAuhtUser("/src/pages/auth/login/login.html", "/src/pages/admin/home/home.html", "client");
        }*/ //Se permite el acceso a los admins a las paginas de clientes ya que esta limitación no se encuentra en el problema.
    
}

guard();