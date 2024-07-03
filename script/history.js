const urlDev = global.urlApi;
let workerid = sessionStorage.getItem("id");

const changeGrafic = document.querySelector('#change-grafic');
changeGrafic.addEventListener('click', () => {
    const historyArea = document.querySelector('.aba-history');
    const graficArea = document.querySelector('#grafic-area');
    const calenderArea = document.querySelector('#change-calender');

    if (historyArea.style.display === 'flex' || calenderArea.style.display === 'flex') {
        historyArea.style.display = 'none';
        document.querySelector('.aba-calender').style.display = 'none';
        graficArea.style.display = 'flex';
        document.querySelector('#grafic-area-pie').style.display = 'flex';
    } else {
        graficArea.style.display = 'none';
        document.querySelector('.aba-calender').style.display = 'none';
        document.querySelector('#grafic-area-pie').style.display = 'none';
        historyArea.style.display = 'flex';
    }
});

const changeCalender = document.querySelector('#change-calender');
changeCalender.addEventListener('click', () => {
    const historyArea = document.querySelector('.aba-history');
    const graficArea = document.querySelector('#grafic-area');
    const calenderArea = document.querySelector('#change-calender');

    if (historyArea.style.display === 'flex' || graficArea.style.display === 'flex') {
        graficArea.style.display = 'none';
        historyArea.style.display = 'none';
        document.querySelector('#grafic-area-pie').style.display = 'none';
        document.querySelector('.aba-calender').style.display = 'flex';
    } else {
        graficArea.style.display = 'none';
        document.querySelector('.aba-calender').style.display = 'none';
        document.querySelector('#grafic-area-pie').style.display = 'none';
        historyArea.style.display = 'flex';
    }
});

function getAllData(nuFilter) {
    fetch(`${urlDev}/expenses/${nuFilter}/${workerid}`)
        .then((response) => response.json())
        .then((res) => {
            const element = document.querySelector('.history-area');
            element.innerHTML = '';

            res.forEach((dado) => {
                addCard(dado);
            });

            sessionStorage.setItem('csv', JSON.stringify(res));
        });
}

getAllData(1);

function addCard(data) {
    const element = document.querySelector('.history-area');

    const novoCard = `
        <ul class="new-card">
            <li><span>ID: </span><span>${data.id}</span></li>
            <li><span>NAME: </span><span>${data.name}</span></li>
            <li><span>DATA_REGISTER: </span><span>${data.data_register}</span></li>
            <li><span>METHOD: </span><span>${data.method}</span></li>
            <li><span>VALUE_MONEY: </span><span>${data.value_money}</span></li>
            <li><span>CATEGORY: </span><span>${data.category}</span></li>
            <li><span>STATUS: </span><span>${data.status}</span></li>
            <li><span>MEMO: </span><span>${data.memo}</span></li>
        </ul>`;

    element.insertAdjacentHTML('beforeend', novoCard);
}

const inputArray = JSON.parse(sessionStorage.getItem('csv'));

const arr = [["id", "name", "valor", "cat"]];

try {
    inputArray.forEach((item) => {
        arr.push([item.id, item.name, parseInt(item.value_money.replace(/[￥,]/g, '')), item.category]);
    });
} catch (err) {
    console.error(err);
}

function converterParaXLSX(data) {
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'dados');
    const xlsxContent = XLSX.write(workbook, { type: 'array' });
    const blob = new Blob([xlsxContent], { type: 'application/octet-stream' });
    return URL.createObjectURL(blob);
}

function baixarXLSX(xlsxContent, format) {
    const link = document.createElement('a');
    link.href = xlsxContent;
    link.setAttribute('download', `dados.${format}`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.getElementById('xlsx').addEventListener('click', () => {
    const xlsxContent = converterParaXLSX(arr);
    baixarXLSX(xlsxContent, "xlsx");
});

document.getElementById('csv').addEventListener('click', () => {
    const xlsxContent = converterParaXLSX(arr);
    baixarXLSX(xlsxContent, "csv");
});

const dadosPorDia = {};

function adicionarDadosPorDia(data) {
    const dataFormatada = data.data_register;
    let valorRenda = data.model === 'renda' ? data.value_money : '';
    if (valorRenda !== '') {
        valorRenda = Number(valorRenda.replace('￥', '').replace(',', '.')).toFixed(2);
    }

    let valorDespesa = data.model === 'despesa' ? data.value_money : '';
    if (valorDespesa !== '') {
        valorDespesa = Number(valorDespesa.replace('￥', '').replace(',', '.'));
    }

    if (dadosPorDia.hasOwnProperty(dataFormatada)) {
        if (!isNaN(valorRenda)) {
            dadosPorDia[dataFormatada].renda += Number(valorRenda);
        }
        if (!isNaN(valorDespesa)) {
            dadosPorDia[dataFormatada].despesa += Number(valorDespesa);
        }
    } else {
        dadosPorDia[dataFormatada] = { renda: Number(valorRenda), despesa: Number(valorDespesa) };
    }
}

inputArray.forEach(adicionarDadosPorDia);

let dataAtual = new Date();

function calcularTotais() {
    const totalRendaElement = document.getElementById('total-renda');
    const totalDespesaElement = document.getElementById('total-despesa');

    let totalRenda = 0;
    let totalDespesa = 0;

    for (const data in dadosPorDia) {
        if (dadosPorDia.hasOwnProperty(data)) {
            totalRenda += dadosPorDia[data].renda;
            totalDespesa += dadosPorDia[data].despesa;
        }
    }

    totalRendaElement.textContent = totalRenda;
    totalDespesaElement.textContent = totalDespesa;
}

function criarCalendario() {
    const calendarElement = document.getElementById('calendar');
    const mesAtualElement = document.getElementById('mes-atual');

    calendarElement.innerHTML = '';

    const primeiroDiaDoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);
    const ultimoDiaDoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0);

    mesAtualElement.textContent = primeiroDiaDoMes.toLocaleDateString(undefined, {
        month: 'long',
        year: 'numeric',
    });

    const table = document.createElement('table');
    const headerRow = table.insertRow();
    const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    diasDaSemana.forEach((dia) => {
        const cell = document.createElement('th');
        cell.textContent = dia;
        headerRow.appendChild(cell);
    });

    const primeiraSemana = table.insertRow();
    primeiraSemana.className = 'week';

    let primeiroDiaSemana = new Date(primeiroDiaDoMes);
    while (primeiroDiaSemana.getDay() > 0) {
        const cell = document.createElement('td');
        cell.textContent = '';
        primeiraSemana.appendChild(cell);
        primeiroDiaSemana.setDate(primeiroDiaSemana.getDate() - 1);
    }

    let data = new Date(primeiroDiaSemana);
    while (data <= ultimoDiaDoMes) {
        if (data.getDay() === 0) {
            const weekRow = table.insertRow();
            weekRow.className = 'week';
        }

        const cell = document.createElement('td');
        cell.textContent = data.getDate();

        const dataFormatada = data.toISOString().split('T')[0];
        if (dadosPorDia.hasOwnProperty(dataFormatada)) {
            cell.classList.add('com-dados');
        }

        cell.addEventListener('click', () => {
            if (dadosPorDia.hasOwnProperty(dataFormatada)) {
                const detalhes = dadosPorDia[dataFormatada];
                alert(`Renda: ${detalhes.renda}\nDespesa: ${detalhes.despesa}`);
            } else {
                alert('Sem dados para este dia.');
            }
        });

        const semanaAtual = table.querySelector('.week:last-child');
        if (semanaAtual) {
            semanaAtual.appendChild(cell);
        }

        data.setDate(data.getDate() + 1);
    }

    calendarElement.appendChild(table);
}

function mesAnterior() {
    dataAtual.setMonth(dataAtual.getMonth() - 1);
    criarCalendario();
    calcularTotais();
}

function mesSeguinte() {
    dataAtual.setMonth(dataAtual.getMonth() + 1);
    criarCalendario();
    calcularTotais();
}

criarCalendario();
calcularTotais();

function alterGrafic() {
    const element1 = document.querySelector(".myChart");
    const element2 = document.querySelector(".myChart2");

    const grafico1 = window.getComputedStyle(element1).display;
    const grafico2 = window.getComputedStyle(element2).display;

    if (grafico1 === 'block') {
        element1.style.display = 'none';
        element2.style.display = 'block';
        document.querySelector('.btn-chart').innerText = 'Renda';
    } else {
        element1.style.display = 'block';
        element2.style.display = 'none';
        document.querySelector('.btn-chart').innerText = 'Despesa';
    }
}

const arrRenda = inputArray
    .filter((valor) => valor.model === 'renda' && valor.value_money !== undefined)
    .map((valor) => parseFloat(valor.value_money.replace(/[￥]/g, '')));

const arrRendaData = inputArray
    .filter((valor) => valor.model === 'renda' && valor.data_register !== undefined)
    .map((valor) => valor.data_register.replace(/[￥,]/g, ''));

const arrDespesa = inputArray
    .filter((valor) => valor.model === 'despesa' && valor.value_money !== undefined)
    .map((valor) => parseFloat(valor.value_money.replace(/[￥]/g, '')));

const arrDespesaData = inputArray
    .filter((valor) => valor.model === 'despesa' && valor.data_register !== undefined)
    .map((valor) => valor.data_register.replace(/[￥,]/g, ''));

Chart.register(ChartDataLabels);

async function graficoDespesa() {
    const dados = await fetch(`${urlDev}/estatistics/despesa/${workerid}`).then((response) => response.json());
    const datas = dados.message.map((item) => item.data);
    const valores = dados.message.map((item) => item.total_por_dia);

    const barColors = valores.map(() => getRandomColor());

    new Chart("myChart2", {
        type: "line",
        data: {
            labels: datas,
            datasets: [{
                backgroundColor: barColors,
                borderColor: "#ff6928",
                data: valores
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    color: "#fff",
                    anchor: "end",
                    align: "end",
                    offset: -10,
                    font: {
                        size: 14,
                    },
                },
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: "Despesas",
                    color: "#fff",
                    font: {
                        size: 15,
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
            },
        }
    });

    new Chart("myChart4", {
        type: "pie",
        data: {
            labels: datas,
            datasets: [{
                backgroundColor: barColors,
                hoverOffset: 4,
                data: valores
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                datalabels: null,
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: "Despesas",
                    color: "#fff",
                    font: {
                        size: 15,
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
            },
        }
    });
}

graficoDespesa();

async function graficoRenda() {
    const dados = await fetch(`${urlDev}/estatistics/renda/${workerid}`).then((response) => response.json());
    const datas = dados.message.map((item) => item.data);
    const valores = dados.message.map((item) => item.total_por_dia);

    const barColors = valores.map(() => getRandomColor());

    new Chart("myChart", {
        type: "line",
        data: {
            labels: datas,
            datasets: [{
                backgroundColor: barColors,
                borderColor: "purple",
                data: valores,
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    color: "#fff",
                    anchor: "end",
                    align: "end",
                    offset: -10,
                    font: {
                        size: 14,
                    },
                },
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: "Rendas",
                    color: "#fff",
                    font: {
                        size: 15,
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
            },
            scales: {}
        }
    });

    new Chart("myChart3", {
        type: "pie",
        data: {
            labels: datas,
            datasets: [{
                backgroundColor: barColors,
                hoverOffset: 4,
                data: valores
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                datalabels: null,
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: "Renda",
                    color: "#fff",
                    font: {
                        size: 15,
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
            },
        }
    });
}

graficoRenda();

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

document.querySelector('#btn-home').addEventListener('click', () => {
    location.href = "../index.html";
});

function quit() {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('name');
    window.location = "../../../views/loginadminrst.html";
}
