// Obtiene el valor de una cookie por su nombre.
export function obtenerCookie(nombre) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.indexOf(nombre + '=') === 0) {
            return cookie.substring(nombre.length + 1);
        }
    }
    return null;
}

// Crea o actualiza una cookie con nombre, valor y días de expiración.
export function crearCookie(nombre, valor, dias) {
    const fechaActual = new Date();
    fechaActual.setTime(fechaActual.getTime() + dias * 24 * 60 * 60 * 1000);
    const expiracion = "expires=" + fechaActual.toUTCString();
    document.cookie = nombre + "=" + valor + "; " + expiracion + "; path=/";
}

// Borra una cookie asignándole una fecha de expiración pasada.
export function borrarCookie(nombre) {
    document.cookie = nombre + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

// Comprueba si una cookie existe.
export function comprobarCookie(nombre) {
    return obtenerCookie(nombre) !== null;
}