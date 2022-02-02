const ct = document.getElementById("ct");

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

function armarTabla(data, diaDeHoy) {

    let inicio = 1;
    let contentTable = "";
    let diaInicial = "";
    let diaLeido = ""
    let destacado = "";

    contentTable += `
        <tr>
            <th class="mainTable--th">FECHA</th>
            <th class="mainTable--th">DIA</th>
            <th class="mainTable--th">HORA</th>
            <th class="mainTable--th">CLIENTE</th>
            <th class="mainTable--th thDescripcion">DESCRIPCION</th>
        </tr>
    `;

    data.forEach(element => {
        diaLeido = element.dia;

        if (diaInicial != diaLeido) {
            inicio = 1;
            diaInicial = diaLeido;
        }

        if (element.dia == diaDeHoy) {
            destacado = "hoy";
        } else {
            destacado = "";
        }

        if (inicio == 1) {
            contentTable += `
                <tr>
                    <td class="mainTable--td boderRow" rowspan="4">${ element.fecha }</td>
                    <td class="mainTable--td boderRow" rowspan="4">${ element.dia }</td>
                    <td class="mainTable--td">${ element.hora }</td>
                    <td class="mainTable--td ${ destacado }">${ element.cliente }</td>
                    <td class="mainTable--td">${ element.descripcion }</td>
            `;
            inicio = 2;
        } else {
            if (element.hora == "15:00") {
                contentTable += `
                    <tr>
                        <td class="mainTable--td boderRow">${ element.hora }</td>
                        <td class="mainTable--td boderRow ${ destacado }">${ element.cliente }</td>
                        <td class="mainTable--td boderRow">${ element.descripcion }</td>
                    </tr>
                `;
            } else {
                contentTable += `
                    <tr>
                        <td class="mainTable--td">${ element.hora }</td>
                        <td class="mainTable--td ${ destacado }">${ element.cliente }</td>
                        <td class="mainTable--td">${ element.descripcion }</td>
                    </tr>
                `;
            }
        }
    });
    ct.innerHTML = contentTable;
}

const fechaComoCadena = new Date().toDateString();

const dias = [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
];

const numeroDia = new Date(fechaComoCadena).getDay();

const nombreDia = dias[numeroDia].charAt(0).toUpperCase() + dias[numeroDia].slice(1, dias[numeroDia].length);

armarTabla(supportData, nombreDia);