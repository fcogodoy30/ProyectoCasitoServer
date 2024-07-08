$(document).ready(function() {
    // Initialize DataTable
    $('#menu-table').DataTable({
        "paging": true,
        "searching": true,
        "ordering": true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json"  // Localization for Spanish
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const switchCheckboxes = document.querySelectorAll('.switch-activo');
    switchCheckboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        const menuId = this.getAttribute('data-id');
        const isChecked = this.checked;
        
        fetch('/cambiar_estado_menu/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': '{{ csrf_token }}'  // Asegúrate de tener el token CSRF disponible en tu plantilla
          },
          body: new URLSearchParams({
            menu_Id: menuId,
            activo: isChecked ? '1' : '0'
          }),
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            console.log('Estado cambiado exitosamente');
            location.reload();
          } else {
            console.error('Error al cambiar el estado');
          }
        })
        .catch(error => {
          console.error('Error de red:', error);
        });
      });
    });
  });


  document.getElementById('Form').addEventListener('submit', function(event) {
    var Button = document.getElementById('guardar');
    var spinner = document.getElementById('spinner');
    var cance = document.getElementById('cance');
  
    Button.style.display = 'none';
    cance.style.display = 'none';
    spinner.style.display = 'block';
  });


  
