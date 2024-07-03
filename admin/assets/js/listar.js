import Swal from 'sweetalert2';

const url = global.urlApi;

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.hash === "#/listar") {
        fetchDataAndPopulateTable();
    }
});

window.addEventListener('hashchange', () => {
    if (window.location.hash === "#/listar") {
        fetchDataAndPopulateTable();
    }
});

function fetchDataAndPopulateTable() {
    Swal.showLoading();
    setTimeout(() => {
        fetch(`${url}/list/user`)
            .then((response) => response.json())
            .then((data) => {
                const tbody = document.querySelector('tbody');
                tbody.innerHTML = '';

                data.message.forEach((user) => {
                    const structure = `
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
                    tbody.appendChild(tr);
                });

                Swal.close();
                addSelectionEventListeners();
            });
    }, 3000);
}

function addSelectionEventListeners() {
    const lines = document.querySelectorAll('tbody tr');

    lines.forEach((line) => {
        line.addEventListener('click', () => {
            deselectAllLines();
            line.classList.add("selected");
        });
    });
}

function deselectAllLines() {
    const lines = document.querySelectorAll('tbody tr');
    lines.forEach((line) => {
        line.classList.remove("selected");
    });
}

function deleteSelectedUser() {
    const selectedLine = document.querySelector('tbody tr.selected');
    if (selectedLine) {
        const id = selectedLine.childNodes[1].innerText;

        fetch(`${url}/delete/user/${id}`, {
            method: "DELETE"
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    Swal.fire({
                        title: "Deletado com sucesso",
                        icon: "success"
                    });
                    listRefresh();
                }
            });
    }
}

function updateStatus() {
    const selectedLine = document.querySelector('tbody tr.selected');
    if (selectedLine) {
        const id = selectedLine.childNodes[1].innerText;
        const statusAtual = selectedLine.childNodes[13].innerText;

        const config = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: statusAtual })
        };

        fetch(`${url}/status/user/${id}`, config)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    Swal.fire({
                        title: "Atualizado com sucesso",
                        icon: "success"
                    });
                    localStorage.setItem("idselected", false);
                    listRefresh();
                }
            });
    }
}

function listRefresh() {
    const tbody = document.querySelector('tbody');

    fetch(`${url}/list/user`)
        .then((response) => response.json())
        .then((data) => {
            tbody.innerHTML = '';

            data.message.forEach((user) => {
                const structure = `
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
                tbody.appendChild(tr);
            });

            addSelectionEventListeners();
        });
}

function setIdSelected(event) {
    const selectedLine = document.querySelector('tbody tr.selected');
    if (selectedLine) {
        const id = selectedLine.childNodes[1].innerText;
        localStorage.setItem("idselected", id);
        event.target.href = `#/update`;
    }
}
