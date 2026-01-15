import { encriptarContrasenia } from '../utils/contrasenia.js';
import { regexUser, regexPassword, regexAge, regexPhone, regexPostalCode } from '../utils/regex.js';
import { showScene } from '../utils/escenas.js';


const ERROR_USUARIO = "Necesitas 3 caracteres como mínimo. No puede haber espacios.";
const ERROR_CONTRASENIA = "Necesitas 8 caracteres, 1 mayúscula y 1 minúscula como mínimo.";
const ERROR_TELEFONO = "Necesitas 9 dígitos exactos.";
const ERROR_CODIGO_POSTAL = "Necesitas 5 dígitos exactos.";
const ERROR_EDAD = "La edad requerida es entre 18 y 99 años.";


let formRegistro = document.getElementById("formularioRegistro");
let inputUsuario = document.getElementById("nombreUsuario");
let inputContrasenia = document.getElementById("claveRegistro");
let inputTelefono = document.getElementById("telefonoUsuario");
let inputCodigoPostal = document.getElementById("codigoPostalUsuario");
let checkMayorEdad = document.getElementById("checkMayorEdad");
let divEdad = document.getElementById("divEdad");
let inputEdad = document.getElementById("edadUsuario");
let botonRegistro = document.getElementById("btnRegistro");
let botonMostrarClave = document.getElementById("verClaveRegistro");


let usuarioValido = false;
let claveValida = false;
let telefonoValido = false;
let codigoPostalValido = false;
let usaEdad = false;
let edadValida = false;

let formularioValido = false;


/**
 * Comprueba el estado de todas las banderas de validación.
 * Habilita o deshabilita el botón de registro y actualiza la variable `formularioValido`.
 */
function comprobarFormulario() {
    let todoCorrecto = false;

    if (usuarioValido && claveValida && telefonoValido && codigoPostalValido) {
        todoCorrecto = true;
    }

  
    if (usaEdad && !edadValida) {
        todoCorrecto = false;
    }

    if (todoCorrecto) {
        botonRegistro.classList.remove("bloqueado");
        botonRegistro.disabled = false;
        formularioValido = true;
    } else {
        botonRegistro.classList.add("bloqueado");
        botonRegistro.disabled = true;
        formularioValido = false;
    }
}


/**
 * Valida el nombre de usuario contra la expresión regular.
 * Actualiza la interfaz (clases CSS y mensajes de error) según el resultado.
 * @returns {boolean} True si la validación es correcta.
 */
function validarUsuario() {
    usuarioValido = regexUser.test(inputUsuario.value);
    
    if (usuarioValido) {
        inputUsuario.className = "exito";
        inputUsuario.parentNode.querySelector(".mensaje-error").innerHTML = "";
    } else {
        inputUsuario.className = "error";
        inputUsuario.parentNode.querySelector(".mensaje-error").innerHTML = ERROR_USUARIO;
    }
    return usuarioValido;
}



/**
 * Valida la contraseña contra la expresión regular.
 * Actualiza la interfaz (clases CSS y mensajes de error) según el resultado.
 * @returns {boolean} True si la validación es correcta.
 */
function validarContrasenia() {
    claveValida = regexPassword.test(inputContrasenia.value);

    const contenedor = inputContrasenia.closest(".contenedorInput");
    const errorSpan = contenedor.querySelector(".mensaje-error");

    if (claveValida) {
        inputContrasenia.className = "exito";
        errorSpan.innerHTML = "";
    } else {
        inputContrasenia.className = "error";
        errorSpan.innerHTML = ERROR_CONTRASENIA;
    }
    return claveValida;
}



/**
 * Valida el número de teléfono contra la expresión regular.
 * Actualiza la interfaz (clases CSS y mensajes de error) según el resultado.
 * @returns {boolean} True si la validación es correcta.
 */
function validarTelefono() {
    telefonoValido = regexPhone.test(inputTelefono.value);

    if (telefonoValido) {
        inputTelefono.className = "exito";
        inputTelefono.parentNode.querySelector(".mensaje-error").innerHTML = "";
    } else {
        inputTelefono.className = "error";
        inputTelefono.parentNode.querySelector(".mensaje-error").innerHTML = ERROR_TELEFONO;
    }
    return telefonoValido;
}



/**
 * Valida el código postal contra la expresión regular.
 * Actualiza la interfaz (clases CSS y mensajes de error) según el resultado.
 * @returns {boolean} True si la validación es correcta.
 */
function validarCodigoPostal() {
    codigoPostalValido = regexPostalCode.test(inputCodigoPostal.value);

    if (codigoPostalValido) {
        inputCodigoPostal.className = "exito";
        inputCodigoPostal.parentNode.querySelector(".mensaje-error").innerHTML = "";
    } else {
        inputCodigoPostal.className = "error";
        inputCodigoPostal.parentNode.querySelector(".mensaje-error").innerHTML = ERROR_CODIGO_POSTAL;
    }
    return codigoPostalValido;
}



/**
 * Valida la edad (si aplica) contra la expresión regular.
 * Actualiza la interfaz (clases CSS y mensajes de error) según el resultado.
 * @returns {boolean} True si la validación es correcta.
 */
function validarEdad() {
    edadValida = regexAge.test(inputEdad.value);

    if (edadValida) {
        inputEdad.className = "exito";
        inputEdad.parentNode.querySelector(".mensaje-error").innerHTML = "";
    } else {
        inputEdad.className = "error";
        inputEdad.parentNode.querySelector(".mensaje-error").innerHTML = ERROR_EDAD;
    }
    return edadValida;
}



/**
 * Inicializa el módulo de registro de usuarios.
 * Configura los eventos (listeners) para:
 * - Mostrar/Ocultar contraseña.
 * - Habilitar el campo de edad condicionalmente.
 * - Validar campos en el evento 'blur'.
 * - Procesar el envío del formulario (submit), guardar en localStorage y redirigir.
 */
export function formularioRegistro() {
    
   
    botonMostrarClave.addEventListener("click", () => {
        if (inputContrasenia.type === "password") {
            inputContrasenia.type = "text";
            botonMostrarClave.src = "./imagen/vista.png";
        } else {
            inputContrasenia.type = "password";
            botonMostrarClave.src = "./imagen/oculto.png";
        }
    });

  
    checkMayorEdad.addEventListener("change", () => {
        if (checkMayorEdad.checked) {
            usaEdad = true;
            divEdad.classList.remove("oculto"); 
            divEdad.classList.add("contenedorInput");
        } else {
            usaEdad = false;
            divEdad.classList.add("oculto");
            divEdad.classList.remove("contenedorInput");
            inputEdad.value = ""; // Limpiamos el valor
            edadValida = false;
        }
        comprobarFormulario();
    });

  
    inputUsuario.addEventListener("blur", () => {
        validarUsuario();
        comprobarFormulario();
    });

    inputContrasenia.addEventListener("blur", () => {
        validarContrasenia();
        comprobarFormulario();
    });

    inputTelefono.addEventListener("blur", () => {
        validarTelefono();
        comprobarFormulario();
    });

    inputCodigoPostal.addEventListener("blur", () => {
        validarCodigoPostal();
        comprobarFormulario();
    });

    inputEdad.addEventListener("blur", () => {
        validarEdad();
        comprobarFormulario();
    });

    
    formRegistro.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        if (formularioValido) {
            const nombreUsuario = inputUsuario.value;

           
            if (localStorage.getItem(nombreUsuario)) {
                alert("Usuario existente.");
                return;
            }

            
            const contraseniaEncriptada = await encriptarContrasenia(inputContrasenia.value);

          
            const datosUsuario = {
                password: contraseniaEncriptada,
                phone: inputTelefono.value,
                postalCode: inputCodigoPostal.value,
                legalAge: checkMayorEdad.checked,
                age: checkMayorEdad.checked ? inputEdad.value : null
            };

           
            localStorage.setItem(nombreUsuario, JSON.stringify(datosUsuario));
            alert("Has completado bien tu registro.");
            
            formRegistro.reset();
            
           
            [inputUsuario, inputContrasenia, inputTelefono, inputCodigoPostal, inputEdad].forEach(input => {
                input.className = "";
                
                const contenedor = input.closest(".contenedorInput");
                if(contenedor && contenedor.querySelector(".mensaje-error")){
                    contenedor.querySelector(".mensaje-error").innerHTML = "";
                }
            });
            botonRegistro.classList.add("bloqueado");

            showScene('formularioLogin');

        } else {
            alert("Necesitas poner bien los datos antes de enviar la información.");
        }
    });
}