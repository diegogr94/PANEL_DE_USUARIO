import { encriptarContrasenia } from '../utils/contrasenia.js';
import { regexUser, regexPassword, regexAge, regexPhone, regexPostalCode } from '../utils/regex.js';
import { showScene } from '../utils/escenas.js';

// --- CONSTANTES DE ERROR ---
const ERROR_USUARIO = "Necesitas 3 caracteres como mínimo. No puede haber espacios.";
const ERROR_CONTRASENIA = "Necesitas 8 caracteres, 1 mayúscula y 1 minúscula como mínimo.";
const ERROR_TELEFONO = "Necesitas 9 dígitos exactos.";
const ERROR_CODIGO_POSTAL = "Necesitas 5 dígitos exactos.";
const ERROR_EDAD = "La edad requerida es entre 18 y 99 años.";

// --- VARIABLES DEL DOM ---
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

// --- BANDERAS DE VALIDACIÓN ---
let usuarioValido = false;
let claveValida = false;
let telefonoValido = false;
let codigoPostalValido = false;
let usaEdad = false;
let edadValida = false;

let formularioValido = false;

// Función para comprobar si activamos el botón
function comprobarFormulario() {
    let todoCorrecto = false;

    if (usuarioValido && claveValida && telefonoValido && codigoPostalValido) {
        todoCorrecto = true;
    }

    // Si ha marcado la casilla de edad, obligamos a que la edad sea válida
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

//  VALIDACIONES INDIVIDUALES 
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

// INICIO DE LA LÓGICA (EXPORT) 

export function formularioRegistro() {
    
    // Funcionalidad Ver Contraseña
    botonMostrarClave.addEventListener("click", () => {
        if (inputContrasenia.type === "password") {
            inputContrasenia.type = "text";
            botonMostrarClave.src = "./imagen/vista.png";
        } else {
            inputContrasenia.type = "password";
            botonMostrarClave.src = "./imagen/oculto.png";
        }
    });

    // Checkbox Mayor de Edad
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

    // Eventos Blur 
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

    // Envío del Formulario
    formRegistro.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        if (formularioValido) {
            const nombreUsuario = inputUsuario.value;

            // Comprobamos si ya existe en localStorage
            if (localStorage.getItem(nombreUsuario)) {
                alert("Usuario existente.");
                return;
            }

            // Encriptamos la contraseña
            const contraseniaEncriptada = await encriptarContrasenia(inputContrasenia.value);

            // Preparamos el objeto para guardar
            const datosUsuario = {
                password: contraseniaEncriptada,
                phone: inputTelefono.value,
                postalCode: inputCodigoPostal.value,
                legalAge: checkMayorEdad.checked,
                age: checkMayorEdad.checked ? inputEdad.value : null
            };

            // Guardamos y redirigimos
            localStorage.setItem(nombreUsuario, JSON.stringify(datosUsuario));
            alert("Has completado bien tu registro.");
            
            formRegistro.reset();
            
            // Forzamos el reset visual de los estilos
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