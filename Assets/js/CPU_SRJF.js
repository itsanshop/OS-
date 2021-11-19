document.getElementById("submit").addEventListener("click", SRJF_CPU);

function SRJF_CPU() {

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

        let Process = new Array(AT.length)
        let WT = new Array(AT.length);
        let TAT = new Array(AT.length);
        let CT = new Array(AT.length);

        //Populate Process
        for (let i = 0; i < AT.length; i++) {
            Process[i] = i + 1
        }

        let mat = Array(50).fill().map(() => Array(50));

        for (let i = 0; i < AT.length; i++) {
            mat[i][0] = Process[i];
            mat[i][1] = AT[i];
            mat[i][2] = BT[i];
        }

        let RT = new Array(AT.length);

        for (let i = 0; i < AT.length; i++) {
            RT[i] = mat[i][2]
        }

        let complete = 0, t = 0, minm = Number.MAX_VALUE;
        let shortest = 0, finish_time;
        let check = false;
        while (complete !== AT.length) {

            for (let j = 0; j < AT.length; j++) {
                if ((mat[j][1] <= t) &&
                    (RT[j] < minm) && RT[j] > 0) {
                    minm = RT[j];
                    shortest = j;
                    check = true;
                }
            }

            if (check === false) {
                t++;
                continue;
            }


            RT[shortest]--;


            minm = RT[shortest];

            if (minm === 0) {
                minm = Number.MAX_VALUE;
            }


            if (RT[shortest] === 0) {
                complete++;
                check = false;
                finish_time = t + 1;
                WT[shortest] = finish_time - mat[shortest][2] - mat[shortest][1];

                if (WT[shortest] < 0) {
                    WT[shortest] = 0;
                }

            }
            t++;
        }

        for (let i = 0; i < AT.length; i++) {
            TAT[i] = mat[i][2] + WT[i];
            CT[i] = AT[i] + TAT[i]
        }

        console.log(CT)
        console.log(WT)
        console.log(TAT)

        TableGen(Process, AT, BT, CT, WT, TAT, "ProcessTable");

    }


}

function TableGen(Process, AT, BT, CT, WT, TAT, tablename) {

    document.getElementById(tablename).innerHTML = "";

    let table = '<thead style=\'text-align:center; vertical-align:middle\'>\n' +
        '            <tr>\n' +
        '                <th>Process</th>\n' +
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
        "                <td><b>AVG : " + average(CT).toFixed(2) + "</b></td>\n" +
        "                <td><b>AVG : " + average(TAT).toFixed(2) + "</b></td>\n" +
        "                <td><b>AVG : " + average(WT).toFixed(2) + "</b></td>\n" +
        "            </tr>"

    table += "</tbody>\n" +
        "        </table>"


    document.getElementById(tablename).innerHTML += table;
    Make_chart(CT)
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
            datasets: [
                {
                    label: 'Completion time taken by process',
                    data: CT,
                    backgroundColor: BackCol,
                    borderColor: BordCol,
                    borderWidth: 1
                }
            ]
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