import { hashText } from '../utils/contrasenia.js'; 
import { crearCookie } from '../utils/cookies.js';
import { showScene } from '../utils/escenas.js';
import { mostrarPanelUsuario } from './panelUsuario.js'; 

 
const USUARIO_NO_ENCONTRADO = "Lo siento, el usuario no ha sido encontrado.";
const DATOS_INVALIDOS = "Lo siento, estas credenciales no son correctas.";


const formulario = document.getElementById("formularioLogin");
const campoUsuario = document.getElementById("usuarioLogin");
const campoContrasenia = document.getElementById("claveLogin");
const botonMostrar = document.getElementById("verClaveLogin");
const mensajeError = document.getElementById("mensajeFeedbackLogin");



/**
 * Resetea los campos del formulario de login y limpia los mensajes de error visibles.
 */
export function resetearFormularioLogin() {
    campoUsuario.value = "";
    campoContrasenia.value = "";
    mensajeError.textContent = "";
}



/**
 * Inicializa el comportamiento del formulario de login.
 * Configura los eventos para:
 * 1. Alternar la visibilidad de la contraseña.
 * 2. Manejar el envío del formulario (submit):
 * - Busca al usuario en localStorage.
 * - Verifica la contraseña recalculando el hash con el salt almacenado.
 * - Si es exitoso, crea una cookie de sesión y redirige al panel de usuario.
 */
export function iniciarFormularioLogin() {
    
   
    botonMostrar.addEventListener("click", () => {
        const esVisible = campoContrasenia.type === "text";
        campoContrasenia.type = esVisible ? "password" : "text";
        botonMostrar.src = esVisible ? "./imagen/oculto.png" : "./imagen/vista.png";
    });

    
    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();
        mensajeError.textContent = "";

        const usuario = campoUsuario.value;
        const clave = campoContrasenia.value;

        
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

     
        crearCookie('user', usuario, 1);
        
        showScene('panelUsuario');

        mostrarPanelUsuario();
    });
}