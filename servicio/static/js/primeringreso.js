document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('id_password1').focus();
  });

  document.addEventListener('DOMContentLoaded', function() {
    var password1Input = document.getElementById('id_password1');
    var password2Input = document.getElementById('id_password2');
    var mensajeError = document.getElementById('mensaje-error');
    var passwordPattern = /^[0-9]{4}$/;
  
    password2Input.addEventListener('blur', function() {
        var password1 = password1Input.value;
        var password2 = password2Input.value;
    
        if (!passwordPattern.test(password2)) {
            mensajeError.textContent = 'La contraseña debe ser un número de 4 dígitos';
            password1Input.value = '';
            password2Input.value = '';
            password1Input.focus();
        } else if (password1 !== password2) {
            mensajeError.textContent = 'Las contraseñas no coinciden';
            password2Input.value = '';  
            password2Input.focus();
        } else {
            mensajeError.textContent = '';
        }
    });
  });



