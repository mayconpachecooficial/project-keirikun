const url = global.urlApi;



document.addEventListener("DOMContentLoaded", () => {
     if (window.location.hash === "#/listar") {
         Swal.showLoading();
            setTimeout(() => {
                fetch(`${url}/list/user`)
                    .then((x) => x.json())
                    .then((res) => {
        
                        const tbody = document.querySelector('tbody');
        
                        res.message.map((user) => {
        
                            let structure = `
                            <tr>
                            <td>${user.id}</td>
                            <td>${user.user}</td>
                            <td>${user.cpf}</td>
                            <td>${user.telefone}</td>
                            <td>${user.email}</td>
                            <td>${user.password_user}</td>
                            <td>${user.status}</td>
                            </tr>
                            `;
        
                            const tr = document.createElement('tr');
                            tr.innerHTML = structure;
                            tbody.appendChild(tr)
                        });
                        
                        Swal.close();
                        selecionar();
                    });
        
            }, 3000);
        };
    });

window.addEventListener('hashchange', () => {
    if (window.location.hash === "#/listar") {
        Swal.showLoading();
        setTimeout(() => {
            fetch(`${url}/list/user`)
                .then((x) => x.json())
                .then((res) => {
                    
                    const tbody = document.querySelector('tbody');

                    tbody.innerHTML = '';

                    res.message.map((user) => {

                        let structure = `
                    <tr>
                    <td>${user.id}</td>
                    <td>${user.user}</td>
                    <td>${user.cpf}</td>
                    <td>${user.telefone}</td>
                    <td>${user.email}</td>
                    <td>${user.password_user}</td>
                    <td>${user.status}</td>
                    </tr>
                    `;

                        const tr = document.createElement('tr');
                        tr.innerHTML = structure;
                        tbody.appendChild(tr)

                    })
                    Swal.close();
                    selecionar();
                })
        }, 3000)
    }

});

function selecionar() {
    const lines = document.querySelectorAll('tbody tr');

    lines.forEach((line) => {

        line.addEventListener('click', () => {
            desmarcar()

            line.classList.add("selected")

        })
    })

    function desmarcar() {
        lines.forEach((line) => {
            line.classList.remove("selected")
        })
    }

}

function deletar() {
    const lines = document.querySelectorAll('tbody tr');

    lines.forEach((line) => {
        if (line.className === "selected") {
            let id = line.childNodes[1].innerText;

            fetch(`${url}/delete/user/${id}`, {
                method: "DELETE"
            })
                .then((x) => x.json())
                .then((res) => {
                    if (res.success) {
                        Swal.fire({
                            title: "Deletado com sucesso",
                            icon: "success"
                        });
                        listRefresh()
                    }
                })
        }

    })
}

function setStatus() {
    const lines = document.querySelectorAll('tbody tr');

    lines.forEach((line) => {
        if (line.className === "selected") {
            let id = line.childNodes[1].innerText;
            let statusAtual = line.childNodes[13].innerText;


            const config = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: statusAtual })
            };

            fetch(`${url}/status/user/${id}`, config)
                .then((x) => x.json())
                .then((res) => {
                    if (res.success) {
                        Swal.fire({
                            title: "Atualizado com sucesso",
                            icon: "success"
                        });
                        localStorage.setItem("idselected", false);
                        listRefresh();

                    }

                })
        }

    })
}

function listRefresh() {
    const tbody = document.querySelector('tbody');

    fetch(`${url}/list/user`)
        .then((x) => x.json())
        .then((res) => {

            tbody.innerHTML = '';

            res.message.map((user) => {

                let structure = `
    <tr>
    <td>${user.id}</td>
    <td>${user.user}</td>
    <td>${user.cpf}</td>
    <td>${user.telefone}</td>
    <td>${user.email}</td>
    <td>${user.password_user}</td>
    <td>${user.status}</td>
    </tr>
    `;

                const tr = document.createElement('tr');
                tr.innerHTML = structure;
                tbody.appendChild(tr)

            })

            selecionar();


        })
}

function obterId(event) {
    const lines = document.querySelectorAll('tbody tr');

    lines.forEach((line) => {
        if (line.className === "selected") {
            let id = line.childNodes[1].innerText;
            localStorage.setItem("idselected", id);
            event.target.href = `#/update`
        }

    })
}