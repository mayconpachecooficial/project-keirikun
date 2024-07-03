


function update(event) {

    const id = localStorage.getItem("idselected");
    const name = document.querySelector('#name');
    const cpf = document.querySelector('#cpf');
    const telefone = document.querySelector('#telefone');
    const email = document.querySelector('#email');
    const password = document.querySelector('#pwd');

    Swal.showLoading();

    const data = {
        "id": id,
        "name": name.value,
        "cpf": cpf.value,
        "telefone": telefone.value,
        "email": email.value,
        "password": password.value,

    };


    const config = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    const url = `${global.urlApi}/update/user/${id}`;

    fetch(url, config)
        .then((x) => x.json())
        .then((res) => {
            if (res.success) {
                Swal.fire({
                    title: "Atualizado com sucesso",
                    icon: "success"
                });
                localStorage.setItem("idselected", false);
                updateRefresh()

            }

        })

}

function updateRefresh() {

    const id = localStorage.getItem("idselected");
    const name = document.querySelector('#name');
    const cpf = document.querySelector('#cpf');
    const telefone = document.querySelector('#telefone');
    const email = document.querySelector('#email');
    const password = document.querySelector('#pwd');

    fetch(`${url}/list/user/${id}`)
        .then((x) => x.json())
        .then((res) => {

            name.value = res.message[0].user;
            cpf.value = res.message[0].cpf;
            telefone.value = res.message[0].telefone;
            email.value = res.message[0].email;
            password.value = res.message[0].password_user;

             Swal.close();

        })

}


window.addEventListener('hashchange', () => {
    if (window.location.hash === "#/update") {
        Swal.showLoading();
        setTimeout(() => {
            updateRefresh()
           
        }, 3000)
    }

});

