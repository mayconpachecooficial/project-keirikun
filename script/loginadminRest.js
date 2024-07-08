let accessmainserver = global.urlApi; // URL base da API

let user;
let password;
let errormessage;

document.getElementById("login-bottom").addEventListener("click", login_check); // Adiciona um evento de clique no botão de login

// Função que verifica se os campos de usuário e senha foram preenchidos
function login_check(user, password) {
  console.log('in');
  user = document.getElementById("user").value; // Obtém o valor do campo de usuário
  password = document.getElementById("pass").value; // Obtém o valor do campo de senha

  if (user == "") {
    errormessage = "Enter your username";
    swallopen(errormessage);
  } else {
    if (password == "") {
      errormessage = "Enter your password";
      swallopen(errormessage);
    } else {
      login_request(user, password); // Chama a função de login com os valores de usuário e senha
    }
  }
}

// Função que faz a requisição de login para a API
async function login_request(user, password) {
  await axios.post(accessmainserver + '/authRestmember', {
    numbers: user, // Envia o usuário como "numbers"
    password: password // Envia a senha
  })
    .then((response) => {
      console.log(response.data.obj[0].user);
      if (response.status == 200) {
        if (response.data.success) {
          sessionStorage.setItem("name", response.data.obj[0].user);
          sessionStorage.setItem("id", response.data.obj[0].id);
          window.location = `../index.html`; // Redireciona para a página index.html após o login bem-sucedido
        }
      } else {
        errormessage = "Check username and password";
        document.getElementById("pass").value = "";
        swallopen(errormessage);
      }
    })
    .catch((err) => {
      errormessage = "Check username and password";
      document.getElementById("pass").value = "";
      swallopen(errormessage);
    });
}

// Função que exibe uma mensagem de erro usando a biblioteca SweetAlert2
function swallopen() {
  Swal.fire({
    title: 'Error',
    icon: 'warning',
    showCancelButton: true,
    showConfirmButton: false,
    cancelButtonText: 'back',
    width: 500,
    html: `<span>${errormessage}</span>`,
    customClass: "sweet-alert",
  }).then((result) => {
    if (result.value) {
      Swal.fire({
        icon: "success",
        title: 'concluido',
      });
    }
  });
}
