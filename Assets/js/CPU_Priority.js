document.getElementById("submit").addEventListener("click", Priority_CPU);

function Priority_CPU() {

    console.log("Clicked SUB");

    let AT = document.getElementById("Arrivaltime").value.split(",").map(Number);
    let BT = document.getElementById("Bursttime").value.split(",").map(Number);
    let Priority = document.getElementById("Priority").value.split(",").map(Number);

    AT = AT.filter(n => typeof n === 'number');
    BT = BT.filter(n => typeof n === 'number');
    Priority = Priority.filter(n => typeof n === 'number');

    console.log(AT);
    console.log(BT);
    console.log(Priority)


    if (AT.length !== BT.length || AT.length === 0 || Priority.length !== BT.length) {

        alert("Incorrect Parameters")

        document.getElementById("Arrivaltime").value = "";
        document.getElementById("Bursttime").value = "";
        document.getElementById("Priority").value = "";

    } else {

        let Process = new Array(AT.length)
        let WT = new Array(AT.length);
        let TAT = new Array(AT.length);
        let CT = new Array(AT.length);


        for (let i = 0; i < AT.length; i++) {
            Process[i] = i + 1
        }

        let mat = Array(20).fill().map(() => Array(6));

        for (let i = 0; i < AT.length; i++) {
            mat[i][0] = AT[i];
            mat[i][1] = BT[i];
            mat[i][2] = Priority[i];
            mat[i][3] = Process[i];
        }

        mat = mat.sort(function (a, b) {
            return a[0] - b[0];
        });

        console.log(mat)


        // Waiting time calculator
        let Service = new Array(AT.length);
        Service[0] = 0
        WT[0] = 0

        for (let i = 1; i < AT.length; i++) {
            Service[i] = mat[i - 1][1] + Service[i - 1];
            WT[i] = Service[i] - mat[i][0] + 1;

            if (WT[i] < 0) {
                WT[i] = 0;
            }

        }

        // Turn around time calculator
        for (let i = 0; i < AT.length; i++) {
            TAT[i] = mat[i][1] + WT[i];
        }

        let Stime = new Array(AT.length);
        Stime[0] = 1;
        CT[0] = Stime[0] + TAT[0];

        for (let i = 1; i < AT.length; i++) {
            Stime[i] = CT[i - 1];
            CT[i] = Stime[i] + TAT[i] - WT[i];
        }


        TableGen(Process, AT, BT, CT, WT, TAT, Priority, "ProcessTable");

    }


}

function TableGen(Process, AT, BT, CT, WT, TAT, Priority, tablename) {

    document.getElementById(tablename).innerHTML = "";

    let table = '<thead style=\'text-align:center; vertical-align:middle\'>\n' +
        '            <tr>\n' +
        '                <th>Process</th>\n' +
        '                <th>Priority</th>\n' +
        '                <th>Arrival Time</th>\n' +
        '                <th>Burst Time</th>\n' +
        '                <th>Completion</th>\n' +
        '                <th>Turn Around Time</th>\n' +
        '                <th>Waiting Time</th>\n' +
        '            </tr>\n' +
        '            </thead> <tbody>'

    for (var i = 1; i < AT.length + 1; i++) {

        table += "<tr style='text-align:center; vertical-align:middle' id=\"row_1\">\n" +
            "                <th>" + Process[i - 1] + "</th>\n" +
            "                <td>" + Priority[i - 1] + "</td>\n" +
            "                <td>" + AT[i - 1] + "</td>\n" +
            "                <td>" + BT[i - 1] + "</td>\n" +
            "                <td>" + CT[i - 1] + "</td>\n" +
            "                <td>" + TAT[i - 1] + "</td>\n" +
            "                <td>" + WT[i - 1] + "</td>\n" +
            "            </tr>"
    }

    const average = (array) => array.reduce((a, b) => a + b) / array.length;

    table += "<tr style='text-align:center; vertical-align:middle' id=\"row_1\">\n" +
        "                <th>Total :" + AT.length + "</th>\n" +
        "                <td>" + "</td>\n" +
        "                <td>" + "</td>\n" +
        "                <td>" + "</td>\n" +
        "                <td><b>AVG : " + average(CT).toFixed(2) + "</b></td>\n" +
        "                <td><b>AVG : " + average(TAT).toFixed(2) + "</b></td>\n" +
        "                <td><b>AVG : " + average(WT).toFixed(2) + "</b></td>\n" +
        "            </tr>"

    table += "</tbody>\n" +
        "        </table>"


    document.getElementById(tablename).innerHTML += table;

    Make_chart(CT);
}


function Make_chart(CT) {
    var ctxB = document.getElementById("barChart").getContext('2d');

    let labs = new Array(CT.length);
    let BackCol = new Array(CT.length);
    let BordCol = new Array(CT.length);


    for (let i = 0; i < CT.length; i++) {
        labs[i] = "P - " + (parseInt(i) + parseInt(1));
        BackCol[i] = "rgba(0, 0, 0, 0.2)";
        BordCol[i] = "rgba(0, 0, 0, 1)";
    }


    var myBarChart = new Chart(ctxB, {
        type: 'bar',
        data: {
            labels: labs,
            datasets: [{
                label: 'Completion time taken by process',
                data: CT,
                backgroundColor: BackCol,
                borderColor: BordCol,
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                labels: {
                    fontSize: 22
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontStyle: 'bold',
                        fontSize: 25
                    }
                }],

                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontSize: 20
                    }
                }]
            }
        }
    });
}
