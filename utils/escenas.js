
export function showScene(idEscena) {
    
    const listaEscenas = document.querySelectorAll('.escena'); 
    
   
    listaEscenas.forEach(elemento => {
        elemento.classList.add('oculto');
    });

    
    const escenaParaMostrar = document.getElementById(idEscena);
    
    
    if (escenaParaMostrar) {
        escenaParaMostrar.classList.remove('oculto');
    }
}