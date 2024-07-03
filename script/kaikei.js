const bkUrl = global.urlApi;
const accessmainserver = 'https://squid-app-ug7x6.ondigitalocean.app'; //メインサーバーのチェックアクセス先
let user;
let password;
let errormessage;
let proccessKubun = 0;
let paykubun = 0;
let payStatus = 0;
const workerid = sessionStorage.getItem("id");
const menbername = sessionStorage.getItem("name");

//auth
if (menbername === "admin") {
  window.location = `../../admin/index.html?id=${workerid}`;
} else if (workerid == null || menbername == null) {
  pagechange('loginadminrst');
}

document.getElementById('name-span').innerText = menbername;
const today = new Date();
const yyyy = today.getFullYear();
const mm = ("0" + (today.getMonth() + 1)).slice(-2);
const dd = ("00" + today.getDate()).slice(-2);

document.getElementById('calender-input').value = `${yyyy}-${mm}-${dd}`;
document.getElementById('keihi-select').style.background = "#FF6928";

function process1(data) {
  if (data === 1) {
    document.getElementById('keihi-select').style.background = "#FF6928";
    document.getElementById('syunyu-select').style.background = "#FFFFFF";
    proccessKubun = 1;
  } else {
    pagechange('renda');
    swallErrorOpen('まだ準備できていません');
    proccessKubun = 2;
  }
}

function pagechange(data) {
  window.location = `../views/${data}.html`;
}

async function savedata(dataState) {
  const datainput = document.getElementById('calender-input').value;
  const memo = document.getElementById('memo-pay').value;
  const slectPay = document.getElementById('pay-select').value;
  const valuePay = document.getElementById('value-input').value;
  if (paykubun === 0) {
    swallErrorOpen('科目を選択してください');
  } else if (datainput === "") {
    swallErrorOpen('支払日を選択してください');
  } else if (slectPay === "") {
    swallErrorOpen('決済手段を選択してください');
  } else if (valuePay === "") {
    swallErrorOpen('支払い金額を入力してください');
  } else {
    const objForm = {
      name: "dev",
      description: memo,
      method: slectPay,
      value_money: valuePay.substr(1),
      category: document.querySelector(`#type${paykubun} span`).innerText,
      status: dataState,
      data_register: datainput
    };
    saveToSql(objForm);
  }
}

async function makerequest(url, data) {
  const request = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  });
  return request.status;
}

async function saveToSql(obj) {
  Swal.fire({
    icon: "info",
    title: '登録中',
    html: 'しばらくお待ちください',
    allowOutsideClick: false,
    showConfirmButton: false,
    timerProgressBar: true,
    onBeforeOpen: () => {
      Swal.showLoading();
    }
  });

  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj)
  };

  fetch(`${bkUrl}/new_expenses/${workerid}`, config)
    .then((x) => x.json())
    .then((res) => {
      swal.close();
      document.getElementById('memo-pay').value = '';
      document.getElementById('value-input').value = '';
      const countChildrens = document.querySelector('.category-main-div').children.length;
      for (let i = 1; i <= countChildrens - 1; i++) {
        document.getElementById(`type${paykubun}`).style.background = "#FFFFFF";
      }
      if (res.success) {
        Swal.fire({
          title: "Good job!",
          html: `<h3>CÓD: ${res.message.id}</h3><p>Details: ${res.message.createdAt}</p>`,
          icon: "success"
        });
      }
    });
}

function selectType(data, event) {
  const childElement = event.currentTarget;
  const parentElement = childElement.parentNode;
  const children = Array.from(parentElement.children);
  const position = children.indexOf(childElement);
  document.getElementById(`type${data}`).style.background = "#FF6928";
  paykubun = event.currentTarget.title;
  localStorage.setItem("variavelPaykubun", paykubun);
  const countChildrens = document.querySelector('.category-main-div').children.length;
  for (let i = 0; i <= countChildrens; i++) {
    if (position === i) {
      // do nothing
    } else {
      try {
        document.querySelector('.category-main-div').children[i].style.background = "#FFFFFF";
      } catch (err) {
        // do nothing
      }
    }
  }
}

function swallErrorOpen(data) {
  Swal.fire({
    icon: 'warning',
    showCancelButton: true,
    showConfirmButton: false,
    cancelButtonText: 'back',
    width: 500,
    html: `<span>${data}</span>`,
    customClass: "sweet-alert",
  }).then((result) => {

  });
}

async function swallSuccess() {
  const Toast = await Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  Toast.fire({
    icon: 'success',
    title: 'Feito'
  });
}

async function kanmaReplase() {
  const data = document.getElementById('value-input');
  if (data.value.length === 1 && data.value !== "￥") {
    data.value = ("￥" + data.value);
  } else {
    const numberAns = (data.value.slice(1)).replace(/[^0-9]/g, "");
    const kanmaAns = numberAns.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    data.value = `￥${kanmaAns}`;
  }
}

function catgoryCard() {
  const category = `<div class="category-select-button" id="type11" onclick="selectType(11)">
  <img src="./image/k11.png" width="40"/>
  <div><span>消耗品費</span></div>
</div>`;

  const categoryMain = document.querySelector('#type12');

  categoryMain.insertAdjacentHTML('beforebegin', category);
}

function addkamoku() {
  const body = `
<!DOCTYPE html>
<html>
<head>
  <title>Nova categoria</title>
  <style>
  #addButton {
    margin-top: 40px;
    font-size: 2rem;
    width: 50px
  }

  .table-product {
    margin-top: 5px !important;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 20px
  }

  #category_nm {
    height: 30px;
    width: 100%
  }

  #category-icon {
    display: flex;
    overflow: scroll;
    overflow-y: hidden;
    height: 90px;
    width: 100%;
  }

  .active {
    border: 2px solid red;
    border-radius: 5px;
  }

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    height: 70%;
  }

  @media only screen and (max-width: 800px) {
    .swal2-popup {
      width: 100% !important;
    }
  }
  </style>
</head>
<body>
  <main class="container">
    <h2>Adicionar nova categoria</h2>
    <input type="text" id="category_nm" placeholder="nome da categoria" />
    <ul id="category-icon">
    </ul>
  </main>
  <input id="getTag" type="hidden" value="0" />
</body>
</html>
  `;

  Swal.fire({
    html: body,
    width: '50%',
    showCancelButton: true,
    confirmButtonText: 'Concluir',
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const name = document.querySelector('#category_nm');
      if (name.value === '') {
        Swal.showValidationMessage('Por favor, preencha todos os campos');
      }
    },
    didOpen: () => {
      const areaIconSelected = document.querySelector('#category-icon');

      for (let i = 1; i <= 32; i++) {
        const img = `<li> <img src="../image/k${i}.png" width="40" /></li> `;

        areaIconSelected.insertAdjacentHTML('afterbegin', img);
      }

      const li = document.querySelectorAll('li');
      const el = Array.from(li);

      el.forEach((icon) => {
        icon.addEventListener('click', (event) => {
          const clickedLi = event.currentTarget;
          el.forEach((selected) => {
            selected.classList.remove('active');
          });
          clickedLi.classList.add('active');
          document.querySelector("#getTag").value = clickedLi.children[0].outerHTML.toString();
        });
      });
    }
  }).then((result) => {
    const categoryName = document.querySelector("#category_nm").value;
    const iconTag = document.querySelector("#getTag").value;
    if (result.isConfirmed) {
      fetch(`${bkUrl}/new_category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "dtUser": workerid,
          "iconTag": iconTag,
          "dtCategoryName": categoryName,
          "dtCategoryStatus": "vip"
        })
      })
        .then((x) => x.json())
        .then((res) => {
          console.log("criado...");
          const categoriaDiv = document.querySelector('#btn-add');
          categoriaDiv.insertAdjacentHTML('beforebegin', res.tag_structured);
        });
    }
  });
}

function dayChange(data) {
  const dt = document.getElementById("calender-input");
  const date = new Date(dt.value.split("-")[0], dt.value.split("-")[1] - 1, dt.value.split("-")[2]);
  if (data === 2) {
    date.setDate(date.getDate() + 1);
  } else {
    date.setDate(date.getDate() - 1);
  }
  const dM = (("0" + (date.getMonth() + 1)).slice(-2));
  const dd = (("0" + date.getDate()).slice(-2));
  dt.value = `${date.getFullYear()}-${dM}-${dd}`;
}

function buscarCategorias() {
  fetch(`${bkUrl}/category`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "user": workerid
    })
  })
    .then((x) => x.json())
    .then((res) => {
      listCategory(res);
    });

  function listCategory(data) {
    data.map((tag) => {
      const categoriaDiv = document.querySelector('#btn-add');
      categoriaDiv.insertAdjacentHTML('beforebegin', tag.tag_structured);
    });
  }
}

buscarCategorias();

var editorMode = false;

const icoElement = document.querySelector('#ico-config');
const icoElementX = document.querySelector('#ico-config-x');

icoElementX.addEventListener('click', () => {
  icoElement.style.display = "flex";
  icoElementX.style.display = "none";
  window.location.reload();
  document.querySelectorAll('.div-comon-division-common, .category-main-div, .regist-button').forEach(divs => {
    divs.classList.remove('focus');
    divs.classList.remove('dim');
    document.querySelector('#btn-add').style.display = "flex";
  });
});

icoElement.addEventListener('click', () => {
  icoElement.style.display = "none";
  icoElementX.style.display = "block";
  Swal.fire('Clique na categoria de deseja excluir!');
  const div = document.querySelector('.category-main-div');
  if (div.classList.contains('focus')) {
    document.querySelectorAll('.div-comon-division-common, .category-main-div, .regist-button').forEach(divs => {
      divs.classList.remove('focus');
      divs.classList.remove('dim');
      document.querySelector('#btn-add').style.display = "flex";
    });
  } else {
    div.classList.add('focus');
    document.querySelector('#btn-add').style.display = "none";
    const elements = document.querySelectorAll('.category-select-button');
    elements.forEach((categoria) => {
      categoria.addEventListener('click', () => {
        const nomeCategoria = document.querySelector('.category-select-button');
        Swal.fire({
          text: `Você tem certeza que deseja deletar a categoria: ${categoria.children[1].children[0].innerText}`,
          width: '80%',
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          cancelButtonText: "Cancelar",
        })
          .then((result) => {
            if (result.isConfirmed) {
              fetch(`${bkUrl}/category/del`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  "categoria": categoria.children[1].children[0].innerText,
                  "user": workerid
                })
              })
                .then((x) => x.json())
                .then((res) => {
                  let areaCategoria = document.querySelector('.category-main-div');
                  areaCategoria.innerHTML = '';
                  document.querySelector('.category-main-div').innerHTML = `
                   <div class="category-select-button" id="btn-add" onclick="addkamoku(12)">
                    <img src='./image/icon_add.png' width="40"/>
                    <div><span>科目追加</span></div>
                  </div>`;
                  document.querySelector('#btn-add').style.display = "none";
                  swallSuccess();
                  buscarCategorias();
                  document.querySelectorAll('.div-comon-division-common, .category-main-div, .regist-button').forEach(divs => {
                    divs.classList.remove('focus');
                    divs.classList.remove('dim');
                    document.querySelector('#btn-add').style.display = "flex";
                  });
                });
            }
          });
      });
    });
    document.querySelectorAll('.div-comon-division-common, .category-main-div, .regist-button').forEach(div => {
      if (div !== document.querySelector('.category-main-div')) {
        div.classList.add('dim');
      }
    });
  }
});

function quit() {
  sessionStorage.removeItem('id');
  sessionStorage.removeItem('name');
  window.location = "../../../views/loginadminrst.html";
}
