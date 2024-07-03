const global = {
    urlApi: "https://example.com/api" // Substitua pela URL real
};

function updateInformation(res) {
    if (res.success) {
        const users = res.message;
        const activeUsers = users.filter(user => user.status === "ativo").length;
        const inactiveUsers = users.filter(user => user.status === "inativo" || user.status === "pendente").length;

        document.querySelector('#geral h1').innerText = users.length;
        document.querySelector('#ativo h1').innerText = activeUsers;
        document.querySelector('#inativo h1').innerText = inactiveUsers;
    }
}

function fetchInformation() {
    fetch(`${global.urlApi}/list/user`)
        .then(response => response.json())
        .then(updateInformation);
}

window.addEventListener('hashchange', () => {
    if (window.location.hash === "#/home") {
        fetchInformation();
    }
});
