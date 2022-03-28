/* Declaration of variables. */

const ct = document.getElementById("ct");

const inputDate = document.getElementById("inputDate");

// form components.
const day = document.getElementById("day");
const time = document.getElementById("time");
const client = document.getElementById("client");
const description = document.getElementById("description");
const btnForm = document.getElementById("btnForm");


/* Functions. */

function buildTableContent(data, currentDay) {
    let incomeFirstHour = 1;
    let tableBodyContent = "";
    let initialDay = "";
    let consultedDay = ""

    data.forEach(element => {
        consultedDay = element.dia;

        if (initialDay != consultedDay) {
            incomeFirstHour = 1;
            initialDay = consultedDay;
        }

        let highlighToday = element.dia == currentDay ? "hoy" : "";

        if (incomeFirstHour == 1) {
            tableBodyContent += `
                <tr>
                    <td class="mainTable--td borderRow" rowspan="4">${ element.fecha }</td>
                    <td class="mainTable--td borderRow" rowspan="4">${ element.dia }</td>
                    <td class="mainTable--td">${ element.hora }</td>
                    <td class="mainTable--td ${ highlighToday }">${ element.cliente }</td>
                    <td class="mainTable--td">${ element.descripcion }</td>
                </tr>
            `;
            incomeFirstHour = 2;
        } else {
            let yesEdge = element.hora == "15:00" ? "borderRow" : "";
            tableBodyContent += `
                <tr>
                    <td class="mainTable--td ${ yesEdge }">${ element.hora }</td>
                    <td class="mainTable--td ${ yesEdge } ${ highlighToday }">${ element.cliente }</td>
                    <td class="mainTable--td ${ yesEdge }">${ element.descripcion }</td>
                </tr>
            `;
        }
    });

    ct.innerHTML = tableBodyContent;
}

function positionArrayDay(day) {
    if (day == "Lunes") return 0;
    if (day == "Martes") return 4;
    if (day == "Miercoles") return 8;
    if (day == "Jueves") return 12;
    return 16;
}

function positionArrayTime(time) {
    if (time == "09:00") return 0;
    if (time == "10:30") return 1;
    if (time == "13:30") return 2;
    return 3;
}

function defineDay() {
    /*
    * To define what the current day is.
    */

    let dateAsString = new Date().toDateString();

    let days = [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
    ];

    let dayNumber = new Date(dateAsString).getDay();

    return days[dayNumber].charAt(0).toUpperCase() + days[dayNumber].slice(1);
}

function getDateData(date) {
    let year = date.getFullYear().toString();
    let month = date.getMonth()+1 < 10 ? '0'+parseInt(date.getMonth()+1) : parseInt(date.getMonth()+1);
    let day = date.getDate()<10 ? '0'+parseInt(date.getDate()) : date.getDate().toString();
    return [year, month, day];
}

function loadData() {
    let dataLocalStorage = JSON.parse(localStorage.getItem("supportData"));
    supportData = dataLocalStorage;
}

function defineItemlocalStorage() {
    let stringSave = "[";
    for (let i = 0; i < supportData.length; i++) {
        if (i == 19) {
            stringSave += `{ "fecha": "${supportData[i].fecha}", "dia": "${supportData[i].dia}", "hora": "${supportData[i].hora}", "cliente": "${supportData[i].cliente}", "descripcion": "${supportData[i].descripcion}" }`;
        } else {
            stringSave += `{ "fecha": "${supportData[i].fecha}", "dia": "${supportData[i].dia}", "hora": "${supportData[i].hora}", "cliente": "${supportData[i].cliente}", "descripcion": "${supportData[i].descripcion}" },`;
        }
    }
    stringSave += "]"

    localStorage.clear();
    localStorage.setItem('supportData', stringSave);
}


/* Events. */

btnForm.addEventListener("click", (e) =>{
    e.preventDefault();

    let positionArray = positionArrayDay(day.value) + positionArrayTime(time.value);

    let newRecord = { 
        "fecha": supportData[positionArray].fecha, 
        "dia": day.value, 
        "hora": time.value, 
        "cliente": client.value, 
        "descripcion": description.value
    };

    supportData[positionArray] = newRecord;

    defineItemlocalStorage();

    buildTableContent(supportData, defineDay());
});

inputDate.addEventListener("change", () => {
    let chosenDate = new Date(`${inputDate.value}T00:00:00`);

    let dates = [];
    
    let dataDate = getDateData(chosenDate);
    dates.push(`${dataDate[0]}-${dataDate[1]}-${dataDate[2]}`)

    for (let i = 1; i < 5; i++) {
        chosenDate = new Date(chosenDate.setDate(chosenDate.getDate()+1));
        dataDate = getDateData(chosenDate);
        dates.push(`${dataDate[0]}-${dataDate[1]}-${dataDate[2]}`)
    }

    let b = 0;
    let proximoCambio = 0 + 4;

    for (let i = 0; i < supportData.length; i++) {
        if (i == proximoCambio) {
            b++;
            proximoCambio =i + 4;
        }
        supportData[i].fecha = dates[b];
    }

    defineItemlocalStorage();

    buildTableContent(supportData, defineDay());
});


/* Program. */

if ( localStorage.getItem("supportData") ) {
    loadData();
}

buildTableContent(supportData, defineDay());