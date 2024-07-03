

function information() {
    fetch(`${global.urlApi}/list/user`)
        .then((x) => x.json())
        .then((res) => {

            if (res.success) {
                const geral = res.message;
                const ativos = res.message.filter((ativo) => ativo.status === "ativo").length;
                const inativos = res.message.filter((ativo) => ativo.status === "inativo" || ativo.status === "pendente").length;

                document.querySelector('#geral h1').innerText = geral.length;
                document.querySelector('#ativo h1').innerText = ativos;
                document.querySelector('#inativo h1').innerText = inativos;
            }

        })
}

window.addEventListener('hashchange', () => {
    if (window.location.hash === "#/home") {
        information()
    }
})