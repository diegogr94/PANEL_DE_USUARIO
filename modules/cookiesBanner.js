import { comprobarCookie, crearCookie } from '../utils/cookies.js';

export function mostrarBannerCookies() {
    
    // Referencia al div del aviso (Nuevo ID)
    let banner = document.getElementById('avisoCookies');

    // Comprobamos si ya aceptó las cookies antes
    // Si NO existe la cookie, quitamos la clase 'oculto' para mostrar el banner
    if (!comprobarCookie('cookiesAceptadas')) {
        banner.classList.remove('oculto');
    } else {
        // Si ya existe, nos aseguramos de que esté oculto
        banner.classList.add('oculto');
    }

    // Configuración del botón de aceptar (Nuevo ID)
    let botonAceptar = document.getElementById('btnAceptarCookies');
    
    botonAceptar.addEventListener('click', () => {
        // Creamos la cookie para recordar la decisión por 1 año (365 días)
        crearCookie('cookiesAceptadas', 'true', 365);
        
        // Ocultamos el banner añadiendo la clase CSS
        banner.classList.add('oculto');
    });
}