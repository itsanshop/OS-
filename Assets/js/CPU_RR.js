document.getElementById("submit").addEventListener("click", RR_CPU);

function RR_CPU() {

    console.log("Clicked SUB");

    let BT = document.getElementById("Bursttime").value.split(",").map(Number);
    let Quantum = Number(document.getElementById("Quantum").value);
    console.log(BT);
    BT = BT.filter(n => typeof n === 'number');
    console.log(Quantum);
    console.log(BT);


    if (BT.length === 0) {
        alert("Incorrect Parameters")
        document.getElementById("Quantum").value = "";
        document.getElementById("Bursttime").value = "";

    } else {

        let WT = new Array(BT.length);
        let TAT = new Array(BT.length);
        let Remaining_BT = new Array(BT.length);
        let Time = 0;

        for (let k = 0; k < BT.length; k++) {
            Remaining_BT[k] = BT[k];
        }

        while (true) {
            let Done = true;

            for (let i = 0; i < BT.length; i++) {

                if (Remaining_BT[i] > 0) {
                    Done = false;

                    if (Remaining_BT[i] > Quantum) {
                        Time = Time + Quantum;
                        Remaining_BT[i] = Remaining_BT[i] - Quantum;
                    } else {
                        Time = Time + Remaining_BT[i];
                        WT[i] = Time - BT[i];
                        Remaining_BT[i] = 0;
                    }
                }
            }

            if (Done === true) {
                break;
            }
        }
        for (let j = 0; j < BT.length; j++) {
            TAT[j] = WT[j] + BT[j];
        }

        TableGen(BT, WT, TAT, "ProcessTable");

    }


}

function TableGen(BT, WT, TAT, tablename) {

    document.getElementById(tablename).innerHTML = "";

    let table = '<thead style=\'text-align:center; vertical-align:middle\'>\n' +
        '            <tr>\n' +
        '                <th>Process</th>\n' +
        '                <th>Burst Time</th>\n' +
        '                <th>Turn Around Time</th>\n' +
        '                <th>Waiting Time</th>\n' +
        '            </tr>\n' +
        '            </thead> <tbody>'

    for (var i = 1; i < BT.length + 1; i++) {

        table += "<tr style='text-align:center; vertical-align:middle' id=\"row_1\">\n" +
            "                <th>" + i + "</th>\n" +
            "                <td>" + BT[i - 1] + "</td>\n" +
            "                <td>" + TAT[i - 1] + "</td>\n" +
            "                <td>" + WT[i - 1] + "</td>\n" +
            "            </tr>"
    }

    const average = (array) => array.reduce((a, b) => a + b) / array.length;

    table += "<tr style='text-align:center; vertical-align:middle' id=\"row_1\">\n" +
        "                <th>Total :" + BT.length + "</th>\n" +
        "                <td>" + "</td>\n" +
        "                <td><b>AVG : " + average(TAT).toFixed(2) + "</b></td>\n" +
        "                <td><b>AVG : " + average(WT).toFixed(2) + "</b></td>\n" +
        "            </tr>"

    table += "</tbody>\n" +
        "        </table>"


    document.getElementById(tablename).innerHTML += table;
    Make_chart(WT);
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
                label: 'Waiting time taken by process',
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