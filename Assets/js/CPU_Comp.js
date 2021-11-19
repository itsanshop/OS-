document.getElementById("submit").addEventListener("click", Comp_CPU);


function Comp_CPU() {

    console.log("Clicked SUB");

    let AT = document.getElementById("Arrivaltime").value.split(",").map(Number);
    let BT = document.getElementById("Bursttime").value.split(",").map(Number);
    let Priority = document.getElementById("Priority").value.split(",").map(Number);
    let Quantum = Number(document.getElementById("Quantum").value);

    if (AT.length !== BT.length || AT.length === 0 || Priority.length !== BT.length) {

        alert("Incorrect Parameters")

        document.getElementById("Arrivaltime").value = "";
        document.getElementById("Bursttime").value = "";
        document.getElementById("Priority").value = "";
        document.getElementById("Quantum").value = "";

    } else {

        let RR = RR_CPU(BT, Quantum);
        let PS = Priority_CPU(AT, BT, Priority);
        let FCFS = FCFS_CPU(AT, BT);
        let SJF = SJF_CPU(AT, BT);
        let SRJF = SRJF_CPU(AT, BT);
        let Algorithm = [FCFS, SJF, SRJF, RR, PS,];

        TableGen(Algorithm, "ProcessTable");

    }
}

function TableGen(Algorithm, tablename) {

    document.getElementById(tablename).innerHTML = "";
    const average = (array) => array.reduce((a, b) => a + b) / array.length;

    let Algos = ["FCFS", "SJF", "SRJF", "Round Robin", "Priority"]

    let Avg_TAT = [average(Algorithm[0].TAT).toFixed(2), average(Algorithm[1].TAT).toFixed(2), average(Algorithm[2].TAT).toFixed(2), average(Algorithm[3].TAT).toFixed(2), average(Algorithm[4].TAT).toFixed(2)];
    let Avg_WT = [average(Algorithm[0].WT).toFixed(2), average(Algorithm[1].WT).toFixed(2), average(Algorithm[2].WT).toFixed(2), average(Algorithm[3].WT).toFixed(2), average(Algorithm[4].WT).toFixed(2)];


    let table = '<thead style=\'text-align:center; vertical-align:middle\'>\n' +
        '            <tr>\n' +
        '                <th>Algorithm</th>\n' +
        '                <th>Avg Turn Around Time</th>\n' +
        '                <th>Avg Waiting Time</th>\n' +
        '            </tr>\n' +
        '            </thead> <tbody>'

    for (var i = 0; i < 5; i++) {

        table += "<tr style='text-align:center; vertical-align:middle' id=\"row_1\">\n" +
            "                <th>" + Algos[i] + "</th>\n" +
            "                <td>" + Avg_TAT[i] + "</td>\n" +
            "                <td>" + Avg_WT[i] + "</td>\n" +
            "            </tr>"
    }


    table += "</tbody>\n" +
        "        </table>"


    document.getElementById(tablename).innerHTML += table;

    Make_chart_TAT(Algorithm);
    Make_chart_WT(Algorithm);
}

function Make_chart_TAT(Algorithm) {

    var ctxB = document.getElementById("barChart_TAT").getContext('2d');
    let FCFS_TAT = Algorithm[0].TAT;
    let FCFS_WT = Algorithm[0].WT;
    let SJF_TAT = Algorithm[1].TAT;
    let SJF_WT = Algorithm[1].WT;
    let SRJF_TAT = Algorithm[2].TAT;
    let SRJF_WT = Algorithm[2].WT;
    let RR_TAT = Algorithm[3].TAT;
    let RR_WT = Algorithm[3].WT;
    let Priority_TAT = Algorithm[4].TAT;
    let Priority_WT = Algorithm[4].WT;


    let TAT_Matrix = [FCFS_TAT, SJF_TAT, SRJF_TAT, RR_TAT, Priority_TAT];
    let WT_Matrix = [FCFS_WT, SJF_WT, SRJF_WT, RR_WT, Priority_WT];

    function transpose(matrix) {
        return matrix[0].map((col, i) => matrix.map(row => row[i]));
    }

    let Inv_TAT_Mat = transpose(TAT_Matrix);
    let Inv_WT_Mat = transpose(WT_Matrix);


    let labs = new Array(FCFS_TAT.length);

    let BlueCol = new Array(FCFS_TAT.length);
    let BlueBordCol = new Array(FCFS_TAT.length);

    let RedCol = new Array(FCFS_TAT.length);
    let RedBordCol = new Array(FCFS_TAT.length);

    let GreenCol = new Array(FCFS_TAT.length);
    let GreenBordCol = new Array(FCFS_TAT.length);

    let YellowCol = new Array(FCFS_TAT.length);
    let YellowBordCol = new Array(FCFS_TAT.length);

    let PurpCol = new Array(FCFS_TAT.length);
    let PurpBordCol = new Array(FCFS_TAT.length);


    for (let i = 0; i < FCFS_TAT.length; i++) {
        labs[i] = "P - " + (parseInt(i) + parseInt(1));

        BlueCol[i] = "rgba(85, 136, 187, 0.5)";
        BlueBordCol[i] = "rgba(85, 136, 187, 1)";

        RedCol[i] = "rgba(187, 85, 85, 0.5)";
        RedBordCol[i] = "rgba(187, 85, 85, 1)";

        GreenCol[i] = "rgba(153,187,85, 0.5)";
        GreenBordCol[i] = "rgba(153,187,85, 1)";

        YellowCol[i] = "rgba(238,153,68, 0.5)";
        YellowBordCol[i] = "rgba(238,153,68, 1)";

        PurpCol[i] = "rgba(68,68,102, 0.5)";
        PurpBordCol[i] = "rgba(68,68,102, 1)";
    }


    var myBarChart = new Chart(ctxB, {
        type: 'bar',
        data: {
            labels: labs,
            datasets: [
                {
                    label: 'FCFS',
                    data: FCFS_TAT,
                    backgroundColor: BlueCol,
                    borderColor: BlueBordCol,
                    borderWidth: 1
                },
                {
                    label: 'SJF',
                    data: SJF_TAT,
                    backgroundColor: RedCol,
                    borderColor: RedBordCol,
                    borderWidth: 1
                },
                {
                    label: 'SRJF',
                    data: SRJF_TAT,
                    backgroundColor: GreenCol,
                    borderColor: GreenBordCol,
                    borderWidth: 1
                },
                {
                    label: 'Round Robin',
                    data: RR_TAT,
                    backgroundColor: YellowCol,
                    borderColor: YellowBordCol,
                    borderWidth: 1
                },
                {
                    label: 'Priority',
                    data: Priority_TAT,
                    backgroundColor: PurpCol,
                    borderColor: PurpBordCol,
                    borderWidth: 1
                },
            ]
        },
        options: {
            title: {
                display: true,
                fontSize: 22,
                fontStyle: 'bold',
                text: 'Turn Around Time in Different Algorithms'
            },

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

function Make_chart_WT(Algorithm) {

    var ctxB = document.getElementById("barChart_WT").getContext('2d');
    let FCFS_TAT = Algorithm[0].TAT;
    let FCFS_WT = Algorithm[0].WT;
    let SJF_TAT = Algorithm[1].TAT;
    let SJF_WT = Algorithm[1].WT;
    let SRJF_TAT = Algorithm[2].TAT;
    let SRJF_WT = Algorithm[2].WT;
    let RR_TAT = Algorithm[3].TAT;
    let RR_WT = Algorithm[3].WT;
    let Priority_TAT = Algorithm[4].TAT;
    let Priority_WT = Algorithm[4].WT;


    let TAT_Matrix = [FCFS_TAT, SJF_TAT, SRJF_TAT, RR_TAT, Priority_TAT];
    let WT_Matrix = [FCFS_WT, SJF_WT, SRJF_WT, RR_WT, Priority_WT];

    function transpose(matrix) {
        return matrix[0].map((col, i) => matrix.map(row => row[i]));
    }

    let Inv_TAT_Mat = transpose(TAT_Matrix);
    let Inv_WT_Mat = transpose(WT_Matrix);


    let labs = new Array(FCFS_TAT.length);

    let BlueCol = new Array(FCFS_TAT.length);
    let BlueBordCol = new Array(FCFS_TAT.length);

    let RedCol = new Array(FCFS_TAT.length);
    let RedBordCol = new Array(FCFS_TAT.length);

    let GreenCol = new Array(FCFS_TAT.length);
    let GreenBordCol = new Array(FCFS_TAT.length);

    let YellowCol = new Array(FCFS_TAT.length);
    let YellowBordCol = new Array(FCFS_TAT.length);

    let PurpCol = new Array(FCFS_TAT.length);
    let PurpBordCol = new Array(FCFS_TAT.length);


    for (let i = 0; i < FCFS_TAT.length; i++) {
        labs[i] = "P - " + (parseInt(i) + parseInt(1));

        BlueCol[i] = "rgba(85, 136, 187, 0.5)";
        BlueBordCol[i] = "rgba(85, 136, 187, 1)";

        RedCol[i] = "rgba(187, 85, 85, 0.5)";
        RedBordCol[i] = "rgba(187, 85, 85, 1)";

        GreenCol[i] = "rgba(153,187,85, 0.5)";
        GreenBordCol[i] = "rgba(153,187,85, 1)";

        YellowCol[i] = "rgba(238,153,68, 0.5)";
        YellowBordCol[i] = "rgba(238,153,68, 1)";

        PurpCol[i] = "rgba(68,68,102, 0.5)";
        PurpBordCol[i] = "rgba(68,68,102, 1)";
    }


    var myBarChart = new Chart(ctxB, {
        type: 'bar',
        data: {
            labels: labs,
            datasets: [
                {
                    label: 'FCFS',
                    data: FCFS_WT,
                    backgroundColor: BlueCol,
                    borderColor: BlueBordCol,
                    borderWidth: 1
                },
                {
                    label: 'SJF',
                    data: SJF_WT,
                    backgroundColor: RedCol,
                    borderColor: RedBordCol,
                    borderWidth: 1
                },
                {
                    label: 'SRJF',
                    data: SRJF_WT,
                    backgroundColor: GreenCol,
                    borderColor: GreenBordCol,
                    borderWidth: 1
                },
                {
                    label: 'Round Robin',
                    data: RR_WT,
                    backgroundColor: YellowCol,
                    borderColor: YellowBordCol,
                    borderWidth: 1
                },
                {
                    label: 'Priority',
                    data: Priority_WT,
                    backgroundColor: PurpCol,
                    borderColor: PurpBordCol,
                    borderWidth: 1
                },
            ]
        },
        options: {
            title: {
                display: true,
                fontSize: 22,
                fontStyle: 'bold',
                text: 'Waiting Time in Different Algorithms'
            },

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


function RR_CPU(BT, Quantum) {

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

    return {
        TAT: TAT,
        WT: WT,
    };
}

function Priority_CPU(AT, BT, Priority) {
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

    return {
        TAT: TAT,
        WT: WT,
    };
}

function FCFS_CPU(AT, BT) {
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

    return {
        TAT: TAT,
        WT: WT,
    };
}

function SJF_CPU(AT, BT) {
    let Process = new Array(AT.length)
    let WT = new Array(AT.length);
    let TAT = new Array(AT.length);
    let CT = new Array(AT.length);

    //Populate Process
    for (let i = 0; i < AT.length; i++) {
        Process[i] = i + 1
    }

    let mat = Array(20).fill().map(() => Array(10));

    for (let i = 0; i < AT.length; i++) {
        mat[i][0] = Process[i];
        mat[i][1] = AT[i];
        mat[i][2] = BT[i];
    }

    for (let i = 0; i < AT.length; i++) {
        for (let j = 0; j < AT.length - i - 1; j++) {
            if (mat[j][1] > mat[j + 1][1]) {
                for (let k = 0; k < 5; k++) {
                    let temp = mat[j][k];
                    mat[j][k] = mat[j + 1][k];
                    mat[j + 1][k] = temp;
                }
            }
        }
    }

    mat[0][3] = mat[0][1] + mat[0][2];
    mat[0][5] = mat[0][3] - mat[0][1];
    mat[0][4] = mat[0][5] - mat[0][2];


    let val = -1;
    for (let i = 1; i < AT.length; i++) {
        let temp = mat[i - 1][3];
        let low = mat[i][2];
        for (let j = i; j < AT.length; j++) {
            if (temp >= mat[j][1] && low >= mat[j][2]) {
                low = mat[j][2];
                val = j;

            }
        }
        mat[val][3] = temp + mat[val][2];
        mat[val][5] = mat[val][3] - mat[val][1];
        mat[val][4] = mat[val][5] - mat[val][2];

        for (let k = 0; k < 6; k++) {
            let tem = mat[val][k];
            mat[val][k] = mat[i][k];
            mat[i][k] = tem;
        }
    }

    for (let i = 0; i < AT.length; i++) {
        Process[i] = mat[i][0];
        AT[i] = mat[i][1];
        BT[i] = mat[i][2];
        WT[i] = mat[i][4];
        TAT[i] = mat[i][5];
        CT[i] = mat[i][3];
    }

    return {
        TAT: TAT,
        WT: WT,
    };
}

function SRJF_CPU(AT, BT) {
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

    return {
        TAT: TAT,
        WT: WT,
    };
}