import { obtenerCookie, crearCookie } from '../utils/cookies.js';

// Función para cargar el tema guardado al iniciar la web
export function cargarTema() {
    // Leemos la cookie
    let temaGuardado = obtenerCookie('tema');

    // Si la cookie dice 'oscuro', añadimos la clase al body
    if (temaGuardado === 'oscuro') {
        document.body.classList.add('temaOscuro');
    } else {
        // Si no, nos aseguramos de que no la tenga (por si acaso)
        document.body.classList.remove('temaOscuro');
    }
}

// Función para cambiar el tema al pulsar el botón
export function cambiarTema() {
    // toggle añade la clase si no está, y la quita si ya está
    document.body.classList.toggle('temaOscuro');

    // Comprobamos que tema ha quedado puesto para guardarlo
    let temaActual = 'claro';
    
    if (document.body.classList.contains('temaOscuro')) {
        temaActual = 'oscuro';
    }

    // Guardamos la decisión en una cookie por 1 año (365 días)
    crearCookie('tema', temaActual, 365); 
}