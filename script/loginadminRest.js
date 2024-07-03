import axios from 'axios';

const accessMainServer = global.urlApi;
let errorMessage;

document.getElementById("login-bottom").addEventListener("click", loginCheck);

function loginCheck() {
  const user = document.getElementById("user").value;
  const password = document.getElementById("pass").value;

  if (user === "") {
    errorMessage = "Enter your username";
    swalOpen(errorMessage);
  } else if (password === "") {
    errorMessage = "Enter your password";
    swalOpen(errorMessage);
  } else {
    loginRequest(user, password);
  }
}

async function loginRequest(user, password) {
  try {
    const response = await axios.post(`${accessMainServer}/authRestmember`, {
      numbers: user,
      password: password
    });

    if (response.status === 200 && response.data.success) {
      sessionStorage.setItem("name", response.data.obj[0].user);
      sessionStorage.setItem("id", response.data.obj[0].id);
      window.location = "../index.html";
    } else {
      errorMessage = "Check username and password";
      document.getElementById("pass").value = "";
      swalOpen(errorMessage);
    }
  } catch (error) {
    errorMessage = "Check username and password";
    document.getElementById("pass").value = "";
    swalOpen(errorMessage);
  }
}

function swalOpen() {
  Swal.fire({
    title: "Error",
    icon: "warning",
    showCancelButton: true,
    showConfirmButton: false,
    cancelButtonText: "back",
    width: 500,
    html: `<span>${errorMessage}</span>`,
    customClass: "sweet-alert"
  }).then((result) => {
    if (result.value) {
      Swal.fire({
        icon: "success",
        title: "concluido"
      });
    }
  });
}
