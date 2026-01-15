import { showScene } from './utils/escenas.js';
import { comprobarCookie } from './utils/cookies.js';
import { formularioRegistro } from "./modules/registro.js"; 
import { iniciarFormularioLogin, resetearFormularioLogin } from "./modules/login.js"; 
import { mostrarPanelUsuario } from "./modules/panelUsuario.js"; 
import { mostrarBannerCookies } from './modules/cookiesBanner.js'; 
import { cargarTema, cambiarTema } from './modules/theme.js';



/**
 * Inicializa la aplicación una vez que el DOM ha sido cargado completamente.
 * * Realiza las siguientes tareas:
 * 1. Carga el tema visual guardado.
 * 2. Muestra el banner de cookies.
 * 3. Comprueba si existe una sesión activa ('user') para redirigir a la escena correspondiente.
 * 4. Inicializa los módulos de los formularios y el panel de usuario.
 * 5. Configura los escuchadores de eventos (listeners) para la navegación y utilidades.
 * * @event DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {

    cargarTema();
    mostrarBannerCookies();

    
    if (comprobarCookie('user')) {
        showScene('panelUsuario');
    } else {
        showScene('formularioLogin');
    }

   
    formularioRegistro();      
    iniciarFormularioLogin();  
    mostrarPanelUsuario();     

   
    document.getElementById('linkIrRegistro').addEventListener('click', (e) => {
        e.preventDefault();
        showScene('formularioRegistro');
    });

    document.getElementById('linkIrLogin').addEventListener('click', (e) => {
        e.preventDefault();
        resetearFormularioLogin();
        showScene('formularioLogin');
    });

    document.getElementById('btnCambiarTema').addEventListener('click', (e) => {
        e.preventDefault();
        cambiarTema();
    });
});