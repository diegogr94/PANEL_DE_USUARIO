// Función para gestionar qué pantalla se ve
export function showScene(idEscena) {
    // 1. Buscamos todos los elementos que tengan la clase "escena"
    const listaEscenas = document.querySelectorAll('.escena'); 
    
    // 2. Los ocultamos todos añadiendo la clase CSS "oculto"
    listaEscenas.forEach(elemento => {
        elemento.classList.add('oculto');
    });

    // 3. Buscamos la escena concreta que queremos mostrar
    const escenaParaMostrar = document.getElementById(idEscena);
    
    // 4. Si existe, le quitamos la clase "oculto" para que se vea
    if (escenaParaMostrar) {
        escenaParaMostrar.classList.remove('oculto');
    }
}