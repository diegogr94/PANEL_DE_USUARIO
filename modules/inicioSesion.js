import { hashText } from '../utils/contrasenia.js'; 
import { crearCookie } from '../utils/cookies.js';
import { showScene } from '../utils/escenas.js';
import { mostrarPanelUsuario } from './panelUsuario.js'; 

// CONSTANTES DE ERROR 
const USUARIO_NO_ENCONTRADO = "Lo siento, el usuario no ha sido encontrado.";
const DATOS_INVALIDOS = "Lo siento, estas credenciales no son correctas.";

// REFERENCIAS AL DOM 
const formulario = document.getElementById("formularioLogin");
const campoUsuario = document.getElementById("usuarioLogin");
const campoContrasenia = document.getElementById("claveLogin");
const botonMostrar = document.getElementById("verClaveLogin");
const mensajeError = document.getElementById("mensajeFeedbackLogin");

export function resetearFormularioLogin() {
    campoUsuario.value = "";
    campoContrasenia.value = "";
    mensajeError.textContent = "";
}

export function iniciarFormularioLogin() {
    
    // Para mostrar/ocultar contraseña
    botonMostrar.addEventListener("click", () => {
        const esVisible = campoContrasenia.type === "text";
        campoContrasenia.type = esVisible ? "password" : "text";
        botonMostrar.src = esVisible ? "./imagen/oculto.png" : "./imagen/vista.png";
    });

    // Lógica de envío (Login)
    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();
        mensajeError.textContent = "";

        const usuario = campoUsuario.value;
        const clave = campoContrasenia.value;

        // Recuperar datos del localStorage
        const datosAlmacenados = localStorage.getItem(usuario);

        if (!datosAlmacenados) {
            mensajeError.textContent = USUARIO_NO_ENCONTRADO;
            return; 
        }

        const objetoUsuario = JSON.parse(datosAlmacenados);
        const { salt, hash } = objetoUsuario.password;

        const hashGenerado = await hashText(clave + salt);

        if (hashGenerado !== hash) {
            mensajeError.textContent = DATOS_INVALIDOS;
            return;
        }

        // Si todo es correcto:
        // Usamos crearCookie 
        crearCookie('user', usuario, 1);
        
        showScene('panelUsuario');

        mostrarPanelUsuario();
    });
}