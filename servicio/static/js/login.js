document.getElementById('loginForm').addEventListener('submit', function (event) {
  var loginButton = document.getElementById('entrar');
  var spinner = document.getElementById('spinner');

  loginButton.style.display = 'none';
  spinner.style.display = 'block';
});

// Mover el valor de fakePassword a password antes de enviar el formulario
document.getElementById('loginForm').addEventListener('submit', function () {
  document.getElementById('password').value = document.getElementById('fakePassword').value;
});


    