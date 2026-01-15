import { comprobarCookie, crearCookie } from '../utils/cookies.js';


/**
 * Controla la visualización del banner de aviso de cookies.
 * - Comprueba si la cookie 'cookiesAceptadas' ya existe.
 * - Si no existe, muestra el banner eliminando la clase 'oculto'.
 * - Configura el botón de aceptación para crear la cookie (validez de 365 días) y ocultar el banner.
 */
export function mostrarBannerCookies() {
    
   
    let banner = document.getElementById('avisoCookies');

    
    if (!comprobarCookie('cookiesAceptadas')) {
        banner.classList.remove('oculto');
    } else {
        
        banner.classList.add('oculto');
    }

    
    let botonAceptar = document.getElementById('btnAceptarCookies');
    
    botonAceptar.addEventListener('click', () => {
        
        crearCookie('cookiesAceptadas', 'true', 365);
        
        
        banner.classList.add('oculto');
    });
}