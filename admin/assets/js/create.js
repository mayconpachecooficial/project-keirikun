import { lang } from '../lang/pr-bt.js';
import Swal from 'sweetalert2';

document.addEventListener("submit", enviarFormulario);

function enviarFormulario(event) {
    event.preventDefault();

    const name = document.querySelector('#name').value;
    const cpf = document.querySelector('#cpf').value;
    const telefone = document.querySelector('#telefone').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#pwd').value;

    Swal.showLoading();

    const data = {
        name,
        cpf,
        telefone,
        email,
        password,
        status: "pendente"
    };

    const config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    const url = `${global.urlApi}/create/user`;

    fetch(url, config)
        .then((response) => response.json())
        .then((res) => {
            if (res.success) {
                Swal.fire({
                    title: lang.alertcreate,
                    icon: "success"
                });

                document.querySelector('#name').value = "";
                document.querySelector('#cpf').value = "";
                document.querySelector('#telefone').value = "";
                document.querySelector('#email').value = "";
                document.querySelector('#pwd').value = "";
            }
        });
}
