# Proyecto: Evaluación 1 - Programación 3

## ✍️ Descripción

Este proyecto fue realizado en cumplimiento de la consigna de la evaluación 1 de Programación 3 de la UTN.
Utilizando la base del TP 4 de Typescript se combinaron con los desarrollos del TP 1, 2 y 3.
Se agrego en cumplimiento de la consigna el carrito de compras (cart) y filtro funcional para el cual se puede utilizar el input o los links de categorías.


## 🚀 Instalación y Uso

Se recomienda usar `pnpm` como gestor de paquetes para mayor eficiencia en el manejo de dependencias.

### 1. Instalar pnpm

Si no tienes `pnpm` instalado, puedes hacerlo fácilmente a través de `npm` (que viene con Node.js) ejecutando el siguiente comando en tu terminal:

```bash
npm install -g pnpm
```

### 2. Instalar Dependencias del Proyecto

Una vez en la carpeta raíz del proyecto, instala las dependencias necesarias con `pnpm`:

```bash
pnpm install
```

### 3. Ejecutar el Proyecto

Para iniciar el servidor de desarrollo de Vite, ejecuta:

```bash
pnpm dev
```

La aplicación estará disponible en la URL que aparezca en la terminal (generalmente `http://localhost:5173`).

---

Si se desea ejecutar en un entorno de "producción" se recomienda utilizar las funciones:

```bash
pnpm build
```
y luego:

```bash
pnpm preview
```
## Como funciona el proyecto
1.  **Inicio de Sesión**: Cuando un usuario se "loguea", su información (incluido su rol) se guarda como un string JSON en `localStorage`.
2.  **Carga de Página Protegida**: Cada vez que se intenta cargar una página protegida (ej. la página de Administrador), se ejecuta un script de verificación (`checkAuhtUser` en `src/utils/auth.ts`).
3.  **Verificación**: El script comprueba:
    - Si existe un usuario en `localStorage`. Si no, redirige al login.
    - Si el rol del usuario guardado coincide con el rol requerido para acceder a esa página. Si no coincide, lo redirige a su "home" correspondiente.
4. Desde el home de cliente se puede agregar productos al carrito del usuario logeado simplemente clickeando en su recuadro.
5. Se puede consultar el carrito desde el botón gráfico en la esquina superior derecha o el link correspondiente.
6.  **Cierre de Sesión (Logout)**: Al cerrar sesión, la información del usuario se elimina de `localStorage` y se redirige al Login.

---