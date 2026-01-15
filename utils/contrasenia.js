
function convertirBufferAHex(buffer) {
    
    const arrayBytes = new Uint8Array(buffer);
    
    
    const arrayHex = Array.from(arrayBytes).map(byte => {
       
        return byte.toString(16).padStart(2, "0");
    });

   
    return arrayHex.join("");
}

export async function hashText(texto) {
    
    const codificador = new TextEncoder(); 
    const datos = codificador.encode(texto);

    const hashBuffer = await crypto.subtle.digest("SHA-256", datos);

    
    return convertirBufferAHex(hashBuffer);
}

function generarSal() {
    const arraySal = new Uint8Array(16);    
    crypto.getRandomValues(arraySal);       
    
    return convertirBufferAHex(arraySal);  
}


export async function encriptarContrasenia(contrasenia) {
    const sal = generarSal();                      
    
  
    const hash = await hashText(contrasenia + sal); 
    
    
    return { 
        salt: sal, 
        hash: hash 
    };
}