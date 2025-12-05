// Función auxiliar para pasar los datos binarios (ArrayBuffer) a texto legible (Hexadecimal)
// La necesitamos porque el hash devuelve "ceros y unos" que no podemos guardar tal cual en texto
function convertirBufferAHex(buffer) {
    // 1. Convertimos el buffer en un array de números normales (enteros de 8 bits)
    const arrayBytes = new Uint8Array(buffer);
    
    // 2. Transformamos el array para que cada número sea un string hexadecimal
    const arrayHex = Array.from(arrayBytes).map(byte => {
        // toString(16) lo pasa a base hexadecimal
        // padStart(2, '0') asegura que tenga 2 caracteres (pone un 0 delante si hace falta)
        return byte.toString(16).padStart(2, "0");
    });

    // 3. Unimos todo en una sola cadena de texto
    return arrayHex.join("");
}

// Función asíncrona que genera el Hash SHA-256 de cualquier texto
// La usamos para no guardar la contraseña real, sino su "huella digital"
export async function hashText(texto) {
    // Preparamos el codificador para pasar de texto a bytes
    const codificador = new TextEncoder(); 
    const datos = codificador.encode(texto);

    // Usamos la librería crypto del navegador para crear el hash SHA-256
    // Esto devuelve un buffer (datos crudos)
    const hashBuffer = await crypto.subtle.digest("SHA-256", datos);

    // Lo convertimos a hexadecimal para poder devolverlo como string
    return convertirBufferAHex(hashBuffer);
}

// Genera una "sal" (salt) aleatoria de 16 bytes
// Sirve para que si dos usuarios tienen la misma contraseña ("1234"), sus hash sean distintos
function generarSal() {
    const arraySal = new Uint8Array(16);    // Reservamos espacio para 16 bytes
    crypto.getRandomValues(arraySal);       // Los rellenamos con valores aleatorios seguros
    
    return convertirBufferAHex(arraySal);   // Devolvemos la sal en formato texto
}

// Función principal para encriptar la contraseña al registrarse
// Junta la contraseña con una sal nueva y devuelve el objeto completo
export async function encriptarContrasenia(contrasenia) {
    const sal = generarSal();                       // Creamos una sal nueva única
    
    // Usamos hashText internamente
    const hash = await hashText(contrasenia + sal); // Hasheamos la mezcla
    
    // Devolvemos el objeto con las dos cosas para guardarlas en localStorage
    return { 
        salt: sal, 
        hash: hash 
    };
}