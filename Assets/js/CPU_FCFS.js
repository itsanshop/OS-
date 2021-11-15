document.getElementById("submit").addEventListener("click", FCFS_CPU);

function FCFS_CPU() {
    console.log("Clicked SUB");

    let AT = document.getElementById("Arrivaltime").value.split(",").map(Number);
    let BT = document.getElementById("Bursttime").value.split(",").map(Number);

    AT = AT.filter(n => typeof n === 'number');
    BT = BT.filter(n => typeof n === 'number');

    console.log(AT);
    console.log(BT);


    if (AT.length !== BT.length || AT.length === 0) {

        alert("Incorrect Parameters")

        document.getElementById("Arrivaltime").value = "";
        document.getElementById("Bursttime").value = "";

    } else {


        let WT = new Array(AT.length);
        let TAT = new Array(AT.length);
        let CT = new Array(AT.length);

        //  Waiting Time
        var service_time = Array.from({length: AT.length}, (_, i) => 0);
        service_time[0] = AT[0];
        WT[0] = 0;

        for (let i = 1; i < AT.length; i++) {

            var WastedTime = 0;

            service_time[i] = service_time[i - 1] + BT[i - 1];

            WT[i] = service_time[i] - AT[i];

            if (WT[i] < 0) {
                WastedTime = Math.abs(WT[i]);
                WT[i] = 0;
            }

            service_time[i] = service_time[i] + WastedTime;
        }

        console.log(WT);


        // Turn Around Time
        for (let i = 0; i < AT.length; i++) {
            TAT[i] = WT[i] + BT[i];
        }

        console.log(TAT);


        // Completion Time
        for (let i = 0; i < AT.length; i++) {
            CT[i] = TAT[i] + AT[i];
        }

        console.log(CT);

        TableGen(AT, BT, CT, WT, TAT, "ProcessTable");

    }


}

function TableGen(AT, BT, CT, WT, TAT, tablename) {

    document.getElementById(tablename).innerHTML = "";

    let table = '<thead style=\'text-align:center; vertical-align:middle\'>\n' +
        '            <tr>\n' +
        '                <th>Process</th>\n' +
        '                <th>Arrival Time</th>\n' +
        '                <th>Burst Time</th>\n' +
        '                <th>Completion</th>\n' +
        '                <th>Waiting Time</th>\n' +
        '                <th>Turn Around Time</th>\n' +
        '            </tr>\n' +
        '            </thead> <tbody>'

    for (var i = 1; i < AT.length + 1; i++) {

        table += "<tr style='text-align:center; vertical-align:middle' id=\"row_1\">\n" +
            "                <th>" + i + "</th>\n" +
            "                <td>" + AT[i - 1] + "</td>\n" +
            "                <td>" + BT[i - 1] + "</td>\n" +
            "                <td>" + CT[i - 1] + "</td>\n" +
            "                <td>" + WT[i - 1] + "</td>\n" +
            "                <td>" + TAT[i - 1] + "</td>\n" +
            "            </tr>"
    }

    const average = (array) => array.reduce((a, b) => a + b) / array.length;

    table += "<tr style='text-align:center; vertical-align:middle' id=\"row_1\">\n" +
        "                <th>Total :" + AT.length + "</th>\n" +
        "                <td>" + "</td>\n" +
        "                <td>" + "</td>\n" +
        "                <td><b>AVG : " + average(CT).toFixed(2) + "</b></td>\n" +
        "                <td><b>AVG : " + average(WT).toFixed(2) + "</b></td>\n" +
        "                <td><b>AVG : " + average(TAT).toFixed(2) + "</b></td>\n" +
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
