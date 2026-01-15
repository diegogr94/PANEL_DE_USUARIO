
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


export function crearCookie(nombre, valor, dias) {
    const fechaActual = new Date();
    fechaActual.setTime(fechaActual.getTime() + dias * 24 * 60 * 60 * 1000);
    const expiracion = "expires=" + fechaActual.toUTCString();
    document.cookie = nombre + "=" + valor + "; " + expiracion + "; path=/";
}


export function borrarCookie(nombre) {
    document.cookie = nombre + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}


export function comprobarCookie(nombre) {
    return obtenerCookie(nombre) !== null;
}