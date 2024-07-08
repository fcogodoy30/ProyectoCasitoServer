function selectOption(button) {
  const block = button.closest('.block');
  
  // Permitir deseleccionar el botón si ya está seleccionado
  if (button.classList.contains('selected')) {
      button.classList.remove('selected');
  } else {
      const buttons = block.querySelectorAll('.button');
      buttons.forEach(btn => {
          btn.classList.remove('selected');
      });
      button.classList.add('selected');
  }
}

function validateSelection() {
  const blocks = document.querySelectorAll('.block');
  let atLeastOneSelected = false;
  const selections = [];

  blocks.forEach(block => {
      const selectedButton = block.querySelector('.button.selected');
      if (selectedButton) {
          atLeastOneSelected = true;
          const selectedValue = selectedButton.value;
          const fechaServicio = selectedButton.getAttribute('data-fecha');
          const cant = block.querySelector(`input[id^="quantity-"]`).value;
          const nom_menu = block.querySelector('input#nom_menu').value;

          selections.push({
              fecha_servicio: fechaServicio,
              opcion_id: selectedValue,
              cant: cant,
              nom_menu: nom_menu
          });
      }
  });

  if (atLeastOneSelected) {
      document.querySelector('[name="brnEnviar"]').style.display = 'none';
      document.querySelector('[name="img"]').style.display = 'none';
      document.querySelector('[name="spinner"]').style.display = 'block';
      // Enviar los datos seleccionados al servidor usando fetch (AJAX)
      fetch('/guardar_selecciones/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': getCookie('csrftoken') // Añade el token CSRF si estás usando Django
          },
          body: JSON.stringify(selections)
      })
      .then(response => response.json())
      .then(data => {
          if (data.status === 'success') {
              console.log('Success:', data);
              window.location.href = '/principal/?message=' + encodeURIComponent('Menu enviado Correctamente');
          } else {
              console.error('Error:', data);
              window.location.href = `/principal/?message=${encodeURIComponent(data.message)}`;
          }
      })
      .catch((error) => {
          console.error('Error:', error);
          window.location.href = `/principal/?message=${encodeURIComponent('Ocurrio un error al procesar la solicitud.')}`;
      });

  } else {
      alert("Por favor, selecciona al menos una opción en alguno de los bloques.");
      return false;
  }
}

function increment(id) {
  const quantityInput = document.getElementById(id);
  let quantity = parseInt(quantityInput.value, 10);
  quantityInput.value = quantity + 1;
}

function decrement(id) {
  const quantityInput = document.getElementById(id);
  let quantity = parseInt(quantityInput.value, 10);
  if (quantity > 1) {
      quantityInput.value = quantity - 1;
  }
}





function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
