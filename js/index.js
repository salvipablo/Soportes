/* Declaration of variables. */

const ct = document.getElementById("ct");

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

    buildTableContent(supportData, defineDay());
});


/* Program. */

buildTableContent(supportData, defineDay());