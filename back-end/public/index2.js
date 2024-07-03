const img2 = document.getElementById("img2");
const img = document.getElementById("img");

img2.addEventListener("click", swallopen1);
img.addEventListener("click", swallopen2);

function swallopen2() {
    Swal.fire({
        title: 'Enviar calendário',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cancelar',
        width: 500,
        customClass: "sweet-alert-acess",
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                icon: "success",
                title: 'concluido',
            });
        }
    });
}

function swallopen1() {
    Swal.fire({
        html: `
            <div id='swall-title-div'>
                <h1 id='swal-title'>Alterar calendário</h1>
            </div>
            <div id='swal-maindiv'>
                <div id='swall-select' class='swall-div-class'>
                    <h2 class='swall-sub-title'>Dia</h2>
                    <select id='days' class='input'>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                </div>
                <div id='swall-select' class='swall-div-class'>
                    <h2 class='swall-sub-title'>Linha</h2>
                    <select id='line' class='input'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>
                <div id='swall-select' class='swall-div-class'>
                    <h2 class='swall-sub-title'>Horário inicial</h2>
                    <input type='time' id='swall-input-time1' class='input' />
                </div>
                <div id='swall-select' class='swall-div-class'>
                    <h2 class='swall-sub-title'>Horário final</h2>
                    <input type='time' id='swall-input-time2' class='input' />
                </div>
                <div id='swall-select' class='swall-div-class'>
                    <h2 class='swall-sub-title'>Descrição 1</h2>
                    <textarea id='input1' class='input'></textarea>
                </div>
                <div id='swall-select' class='swall-div-class'>
                    <h2 class='swall-sub-title'>Descrição 2</h2>
                    <textarea id='input2' class='input'></textarea>
                </div>
                <div id='swall-select' class='swall-div-class'>
                    <h2 class='swall-sub-title'>Cor</h2>
                    <select id="color" class='input'>
                        <option value="blue">azul</option>
                        <option value="green">verde</option>
                        <option value="red">vermelho</option>
                        <option value="yellow">amarelo</option>
                        <option value="gray">cinza</option>
                        <option value="pink">rosa</option>
                        <option value="black">preto</option>
                        <option value="white">branco</option>
                        <option value="purple">roxo</option>
                        <option value="branco">branco</option>
                    </select>
                </div>
                <div id='swall-select' class='swall-div-class'>
                    <h2 class='swall-sub-title'>Kimono</h2>
                    <select id="kimono-selected" class='input'>
                        <option value="monday1">monday1</option>
                        <option value="monday2">monday2</option>
                    </select>
                </div>
            </div>`,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        width: 900,
    }).then(() => {
        const objSwal = {
            day: document.querySelector('#days').value,
            line: document.querySelector('#line').value,
            start: document.querySelector('#swall-input-time1').value,
            end: document.querySelector('#swall-input-time2').value,
            desc1: document.querySelector('#input1').value,
            desc2: document.querySelector('#input2').value,
            cor: document.querySelector('#color').value,
            img: document.querySelector('#kimono-selected').value
        };
        update(objSwal);
        console.log(objSwal.start);
    });
}

async function update(obj) {
    const up = {
        GYM: 1,
        DAY: obj.day,
        START: obj.start,
        FINISH: obj.end,
        LINE: obj.line,
        DESC1: obj.desc1,
        DESC2: obj.desc2,
        IMAGE: obj.img,
        COLOR: obj.cor,
    };

    fetch('http://localhost:3000/calender', {
        method: 'PUT',
        body: JSON.stringify(up),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((x) => x.json())
        .then(() => {
            getDados();
        });
}

function getDados() {
    fetch('http://localhost:3000/calenderteste')
        .then((x) => x.json())
        .then((res) => {
            console.log(res);
            cols(res);
        });
}

getDados();

function cols(data) {
    const line4 = document.querySelectorAll('h4');
    const line5 = document.querySelectorAll('h1');
    const line3 = document.querySelectorAll('.master-image');

    // Update columns with data
    for (let i = 0; i < data.length; i++) {
        const time = `${data[i].START_TIME}~${data[i].FINISH_TIME}`;
        const desc1 = data[i].DESCRITION_1;
        const desc2 = data[i].DESCRITION_2;

        line4[i].innerHTML = time;
        line5[i].innerHTML = desc1;
        line5[i + 1].innerHTML = desc2;
        line3[i].src = `../image/${data[i].IMAGE}.png`;
        line4[i].style.backgroundColor = data[i].COLOR;
        line4[i].style.color = data[i].COLOR === 'pink' ? 'blue' : (data[i].COLOR === 'purple' ? 'green' : '#fff');
    }
}

document.querySelector('#gym-name').innerHTML = sessionStorage.getItem("gym");
