import { lang } from '../lang/pr-bt.js';

document.addEventListener("submit", enviarFormulario)

function enviarFormulario(event) {

    const name = document.querySelector('#name');
    const cpf = document.querySelector('#cpf');
    const telefone = document.querySelector('#telefone');
    const email = document.querySelector('#email');
    const password = document.querySelector('#pwd');

    Swal.showLoading();

    const data = {
        "name": name.value,
        "cpf": cpf.value,
        "telefone": telefone.value,
        "email": email.value,
        "password": password.value,
        "status": "pendente"
    };


    const config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    const url = `${global.urlApi}/create/user`;

    fetch(url, config)
        .then((x) => x.json())
        .then((res) => {
            if (res.success) {
                Swal.fire({
                    title: lang.alertcreate,
                    icon: "success"
                });

                name.value = "";
                cpf.value = "";
                telefone.value = "";
                email.value = "";
                password.value = "";
                
                
            }

        })

}

