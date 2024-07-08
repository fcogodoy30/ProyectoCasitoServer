function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();
    timeElement.innerText = `Fecha y hora: ${dateString} ${timeString}`;
}

// Llamar a la función cada segundo para actualizar la hora
setInterval(updateTime, 1000);



// Get the login modal and the link to open it
var modal = document.getElementById("loginModal");
var loginLink = document.getElementById("loginLink");




// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


document.addEventListener("DOMContentLoaded", function() {
  var loginLink = document.getElementById("yourLoginLinkId");
  var modal = document.getElementById("yourModalId");

  if (loginLink) {
      loginLink.onclick = function() {
          if (modal) {
              modal.style.display = "block";
          }
      };
  }
});



let timeout;

function resetTimeout() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
        // Realizar alguna acción cuando el usuario esté inactivo, por ejemplo, redirigir
        window.location.href = '/cerrarsession/';  // Redirigir a la página de logout o login
    }, 120000);  // 15 minutos en milisegundos (900000)
}

// Llama a resetTimeout() cuando hay actividad relevante (click, tecla presionada, etc.)
document.addEventListener('click', resetTimeout);
document.addEventListener('keypress', resetTimeout);
resetTimeout();  // Inicia el temporizador al cargar la página

