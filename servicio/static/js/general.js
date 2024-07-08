document.getElementById('loginForm').addEventListener('submit', function(event) {
    var loginButton = document.getElementById('entrar');
    var spinner = document.getElementById('spinner');
  
    loginButton.style.display = 'none';
    spinner.style.display = 'block';
  });