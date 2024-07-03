const accessMainServer = 'https://squid-app-ug7x6.ondigitalocean.app'; //メインサーバーのチェックアクセス先
let user;
let password;
let errorMessage;
let processKubun = 0;
let payKubun = 0;
let payStatus = 0;
let saiTotal = 2000000;
let saveArray1 = [];
let restId = sessionStorage.getItem("restid");
let workerId = sessionStorage.getItem("id");
let memberName = sessionStorage.getItem("name");

if (!restId || !workerId || !memberName) {
  pageChange('loginadminrst');
}

document.getElementById('name-span').innerText = memberName;
const today = new Date();
const yyyy = today.getFullYear();
const mm = ("0" + (today.getMonth() + 1)).slice(-2);
const dd = ("00" + today.getDate()).slice(-2);
const id = '0';

getCostHistory();

async function getCostHistory() {
  if (!restId || !workerId || !memberName) {
    pageChange('loginadminrst');
  }

  let row = "";
  let sumTotal = 0;
  const payName = await makeRequest(`https://squid-app-ug7x6.ondigitalocean.app/costRestGet?id=${id}`); //支出の項目をGET
  saveArray1 = payName;

  for (let i = 0; i < payName.length; i++) {
    const dt = `${payName[i].payday.split("-")[1]}/${payName[i].payday.split("-")[2]}`;
    sumTotal += Number(payName[i].amount);
    const myImg = `../image/k${payName[i].cost_id}.png`;

    row += `
      <div class="keihi-show-history-child" onclick="swalldeatalShow('${payName[i].id}')">
        <div class="keihi-show-history-day">${dt}</div>
        <img src="${myImg}" width="40" class="setting-right-button"  />
        <div class="keihi-show-history-name">${await getName(payName[i].cost_id)}</div>
        <div class="keihi-show-history-value">${await kanmaReplace(payName[i].amount)}</div>
        <div class="keihi-show-history-day">${await payInfoGet(payName[i].paykubun)}</div>
      </div>
    `;
  }

  document.getElementById("insert-inner-html1").innerHTML += row;

  saiTotal -= sumTotal;
  const totalAnswer = kanmaReplaceNoSyousuu(sumTotal, 1);
  document.getElementById("sisyutsu-div").innerText = totalAnswer[0];
  document.getElementById("sisyutsu-div").style = totalAnswer[1];

  const siTotal = kanmaReplaceNoSyousuu(saiTotal, 2);
  document.getElementById("goukei-div").innerText = siTotal[0];
  document.getElementById("goukei-div").style = siTotal[1];
}

async function payInfoGet(data) {
  let answer = "";

  if (data === 0) {
    answer = "ゆうちょ銀行";
  } else if (data === 1) {
    answer = "現金";
  } else if (data === 2) {
    answer = "クレジット";
  }

  return answer;
}

async function kanmaReplace(data) {
  const numberAns = data.split(".")[0].replace(/[^0-9]/g, "");
  const kanmaAns = numberAns.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

  return `-￥${kanmaAns}`;
}

async function kanmaReplaceNoSyousuu(data, kubun) {
  let kigou = "";
  let color = "color:#000080";
  const answerArray = [];

  if (kubun === 1 || data < 0) {
    kigou = "-";
    color = "color:#FF0000";
  }

  const numberAns = data.toString().replace(/[^0-9]/g, "");
  const kanmaAns = numberAns.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

  answerArray.push(`${kigou}￥${kanmaAns}`, color);

  return answerArray;
}

async function getName(data) {
  let answer = "";

  if (data === 1) {
    answer = "仕入れ";
  } else if (data === 2) {
    answer = "給与";
  } else if (data === 3) {
    answer = "通信";
  } else if (data === 4) {
    answer = "水道光熱費";
  } else if (data === 5) {
    answer = "荷造運賃";
  } else if (data === 6) {
    answer = "広告宣伝費";
  } else if (data === 7) {
    answer = "地代家賃";
  } else if (data === 8) {
    answer = "修繕費";
  } else if (data === 9) {
    answer = "雑費";
  } else if (data === 10) {
    answer = "損害保険";
  } else if (data === 11) {
    answer = "消耗品";
  }

  return answer;
}

async function makeRequest(url) {
  const response = await fetch(url);
  return response.json();
}

async function swalldeatalShow(data) {
  let row = "";

  for (let i = 0; i < saveArray1.length; i++) {
    if (data === saveArray1[i].id) {
      const dt = `${saveArray1[i].payday}`;

      row = `
        <div class="div-comon-division-common">
          <div class="date-div-span">日付</div>
          <div class="right-div-add" onclick="dayChange(1)"><</div>
          <div class="center-colomn-div"><input type="date" class="calender-input" id="calender-input" required value="${dt}"/></div>
          <div class="right-div-add" onclick="dayChange(2)">></div>
        </div>
        <div id="textup" class="div-comon-division-common">
          <div class="date-div-span">メモ</div>
          <div class="right-div-add"></div>
          <div class="center-colomn-div"><textarea placeholder="内容入力" type="text" id="memo-pay" rowa="8" cols="40" required class="calender-input-text">${saveArray1[i].memo}</textarea></div>
          <div class="right-div-add"></div>
        </div>
        <div class="div-comon-division-common">
          <div class="date-div-span">方法</div>
          <div class="right-div-add"></div>
          <div class="center-colomn-div">
            <select id="pay-select">
              ${getPayInfo(saveArray1[i].paykubun)}
            </select>
          </div>
          <div class="right-div-add"></div>
        </div>
        <div class="div-comon-division-common">
          <div class="date-div-span">金額</div>
          <div class="right-div-add"></div>
          <div class="center-colomn-div"><input placeholder="￥" type="text" class="calender-input" id="value-input" oninput="kanmaReplace()" inputmode="numeric" required value="${await kanmaReplace(saveArray1[i].amount)}"/></div>
          <div class="right-div-add"></div>
        </div>
        <style>
          .swal2-popup {
            width: 90% !important;
            height: 500px !important;
          }
        </style>
      `;
    }
  }

  swallOpen(row);
}

function getPayInfo(data) {
  let row = "";

  for (let i = 0; i < 3; i++) {
    if (data === i) {
      row += `<option value=${i} selected>${getNamePay(i)}</option>`;
    } else {
      row += `<option value=${i}>${getNamePay(i)}</option>`;
    }
  }

  return row;
}

function getNamePay(data) {
  let answer = "";

  if (data === 0) {
    answer = "ゆうちょ銀行";
  } else if (data === 1) {
    answer = "現金";
  } else {
    answer = "クレジット";
  }

  return answer;
}

function swallOpen(data) {
  Swal.fire({
    showCancelButton: true,
    showConfirmButton: true,
    cancelButtonText: '戻る',
    confirmButtonText: "変更する",
    allowOutsideClick: false,
    html: `${data}`
  }).then(() => {
    if (result.isConfirmed) {
      swallErrorOpen("準備中,すまん");
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

  const dM = ("0" + (date.getMonth() + 1)).slice(-2);
  const dd = ("0" + date.getDate()).slice(-2);
  dt.value = `${date.getFullYear()}-${dM}-${dd}`;
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
