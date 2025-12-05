import { showScene } from './utils/escenas.js';
import { comprobarCookie } from './utils/cookies.js';
import { formularioRegistro } from "./modules/registro.js"; 
import { iniciarFormularioLogin, resetearFormularioLogin } from "./modules/inicioSesion.js"; 
import { mostrarPanelUsuario } from "./modules/panelUsuario.js"; 
import { mostrarBannerCookies } from './modules/cookiesBanner.js'; 
import { cargarTema, cambiarTema } from './modules/theme.js';


document.addEventListener('DOMContentLoaded', () => {

    cargarTema();
    mostrarBannerCookies();

    // Comprobamos sesión
    if (comprobarCookie('user')) {
        showScene('panelUsuario');
    } else {
        showScene('formularioLogin');
    }

    // Inicializamos módulos
    formularioRegistro();      
    iniciarFormularioLogin();  
    mostrarPanelUsuario();     

    // Eventos de navegación (Links)
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