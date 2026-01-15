import { obtenerCookie, borrarCookie } from '../utils/cookies.js';
import { showScene } from '../utils/escenas.js';
import { resetearFormularioLogin } from './login.js';



/**
 * Gestiona la lógica del panel de usuario una vez ha iniciado sesión.
 * - Muestra un mensaje de bienvenida personalizado recuperando el nombre de la cookie 'user'.
 * - Configura el evento de cierre de sesión, que borra la cookie, resetea el formulario de login y redirige a la pantalla de inicio.
 */
export function mostrarPanelUsuario() {
    
    
    let mensajeBienvenida = document.getElementById('mensajeBienvenida');
    let botonCerrarSesion = document.getElementById('btnCerrarSesion');

   
    let usuario = obtenerCookie('user');
    mensajeBienvenida.innerHTML = "Bienvenido/a, " + usuario;

    
    botonCerrarSesion.addEventListener('click', () => {
        
      
        borrarCookie('user');
        
       
        resetearFormularioLogin();
        
        
        showScene('formularioLogin');
    });
}