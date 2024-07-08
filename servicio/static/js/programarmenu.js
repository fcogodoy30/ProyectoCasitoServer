function selectOption(button) {
    const block = button.closest('.block');
    if (button.classList.contains('admin-check')) {
        const buttons = block.querySelectorAll('.button');
        if (button.checked) {
            block.classList.add('disabled');
            buttons.forEach(btn => {
                btn.disabled = true;
                btn.classList.add('disabled-button');
                btn.classList.remove('selected'); // Limpiar selecciones
            });
        } else {
            block.classList.remove('disabled');
            buttons.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('disabled-button');
            });
        }
    } else {
        // Si es un botón de selección normal
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
}

function validateSelection() {
    const blocks = document.querySelectorAll('.block');
    let allActiveBlocksSelected = true;
    const selections = [];

    blocks.forEach(block => {
        if (block.querySelector('.admin-check').checked) {
            // Ignorar bloques con el checkbox de día admin/vacaciones marcado
            return;
        }

        const selectedButton = block.querySelector('.button.selected');
        if (selectedButton) {
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
        } else {
            allActiveBlocksSelected = false; // Hay un bloque activo sin selección
        }
    });

    if (allActiveBlocksSelected) {
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
        alert("Por favor, selecciona al menos una opción en todos los bloques activos.");
        return false;
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


  