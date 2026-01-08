import { obtenerCookie, borrarCookie } from '../utils/cookies.js';
import { showScene } from '../utils/escenas.js';
import { resetearFormularioLogin } from './login.js';

export function mostrarPanelUsuario() {
    
    // Referencias a los elementos del HTML
    let mensajeBienvenida = document.getElementById('mensajeBienvenida');
    let botonCerrarSesion = document.getElementById('btnCerrarSesion');

    // Recuperamos el nombre del usuario de la cookie para saludar
    let usuario = obtenerCookie('user');
    mensajeBienvenida.innerHTML = "Bienvenido/a, " + usuario;

    // Funcionalidad del botón de Cerrar Sesión
    botonCerrarSesion.addEventListener('click', () => {
        
        // Borramos la cookie de sesión
        borrarCookie('user');
        
        // Limpiamos los campos del login por seguridad
        resetearFormularioLogin();
        
        // Volvemos a la pantalla de inicio
        showScene('formularioLogin');
    });
}