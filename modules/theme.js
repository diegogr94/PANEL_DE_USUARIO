import { obtenerCookie, crearCookie } from '../utils/cookies.js';

/**
 * Carga el tema visual preferido por el usuario leyendo la cookie 'tema'.
 * Aplica la clase 'temaOscuro' al body si la cookie tiene el valor 'oscuro'.
 * De lo contrario, asegura que se muestre el tema claro.
 */
export function cargarTema() {
    
    let temaGuardado = obtenerCookie('tema');

   
    if (temaGuardado === 'oscuro') {
        document.body.classList.add('temaOscuro');
    } else {
       
        document.body.classList.remove('temaOscuro');
    }
}


/**
 * Alterna (toggle) el tema visual de la aplicación entre claro y oscuro.
 * Modifica las clases CSS del body y guarda la nueva preferencia en la cookie 'tema'
 * con una duración de 365 días.
 */
export function cambiarTema() {
    
    document.body.classList.toggle('temaOscuro');

  
    let temaActual = 'claro';
    
    if (document.body.classList.contains('temaOscuro')) {
        temaActual = 'oscuro';
    }


    crearCookie('tema', temaActual, 365); 
}