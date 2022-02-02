const supportData = [{
        "fecha": "31/01/2022",
        "dia": "Lunes",
        "hora": "09:00",
        "cliente": "-",
        "descripcion": "-"
    },
    {
        "fecha": "31/01/2022",
        "dia": "Lunes",
        "hora": "10:30",
        "cliente": "Ricardo Papetti",
        "descripcion": "Instalacion del software DSPMC ultima version 7."
    },
    {
        "fecha": "31/01/2022",
        "dia": "Lunes",
        "hora": "13:30",
        "cliente": "-",
        "descripcion": "-"
    },
    {
        "fecha": "31/01/2022",
        "dia": "Lunes",
        "hora": "15:00",
        "cliente": "-",
        "descripcion": "-"
    },
    {
        "fecha": "01/02/2022",
        "dia": "Martes",
        "hora": "09:00",
        "cliente": "-",
        "descripcion": "-"
    },
    {
        "fecha": "01/02/2022",
        "dia": "Martes",
        "hora": "10:30",
        "cliente": "-",
        "descripcion": "-"
    },
    {
        "fecha": "01/02/2022",
        "dia": "Martes",
        "hora": "13:30",
        "cliente": "Ricardo Rigo",
        "descripcion": "Instalacion del software DSPMC ultima version 8."
    },
    {
        "fecha": "01/02/2022",
        "dia": "Martes",
        "hora": "15:00",
        "cliente": "Jesus Rolando Torres",
        "descripcion": "Instalacion del software DSPMC ultima version 8."
    },
    {
        "fecha": "02/02/2022",
        "dia": "Miércoles",
        "hora": "09:00",
        "cliente": "-",
        "descripcion": "-"
    },
    {
        "fecha": "02/02/2022",
        "dia": "Miércoles",
        "hora": "10:30",
        "cliente": "-",
        "descripcion": "-"
    },
    {
        "fecha": "02/02/2022",
        "dia": "Miércoles",
        "hora": "13:30",
        "cliente": "-",
        "descripcion": "-"
    },
    {
        "fecha": "02/02/2022",
        "dia": "Miércoles",
        "hora": "15:00",
        "cliente": "-",
        "descripcion": "-"
    },
    {
        "fecha": "03/02/2022",
        "dia": "Jueves",
        "hora": "09:00",
        "cliente": "-",
        "descripcion": "-"
    },
    {
        "fecha": "03/02/2022",
        "dia": "Jueves",
        "hora": "10:30",
        "cliente": "-",
        "descripcion": "-"
    },
    {
        "fecha": "03/02/2022",
        "dia": "Jueves",
        "hora": "13:30",
        "cliente": "-",
        "descripcion": "-"
    },
    {
        "fecha": "03/02/2022",
        "dia": "Jueves",
        "hora": "15:00",
        "cliente": "-",
        "descripcion": "-"
    },
    {
        "fecha": "04/02/2022",
        "dia": "Viernes",
        "hora": "09:00",
        "cliente": "-",
        "descripcion": "-"
    },
    {
        "fecha": "04/02/2022",
        "dia": "Viernes",
        "hora": "10:30",
        "cliente": "-",
        "descripcion": "-"
    },
    {
        "fecha": "04/02/2022",
        "dia": "Viernes",
        "hora": "13:30",
        "cliente": "-",
        "descripcion": "-"
    },
    {
        "fecha": "04/02/2022",
        "dia": "Viernes",
        "hora": "15:00",
        "cliente": "-",
        "descripcion": "-"
    }
];

const ct = document.getElementById("ct");

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


/*
 * To define what the current day is
 */
const dateAsString = new Date().toDateString();

const days = [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
];

const dayNumber = new Date(dateAsString).getDay();

const dayName = days[dayNumber].charAt(0).toUpperCase() + days[dayNumber].slice(1);

buildTableContent(supportData, dayName);