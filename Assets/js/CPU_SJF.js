document.getElementById("submit").addEventListener("click", SJF_CPU);

function SJF_CPU() {

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

        let mat = Array(20).fill().map(() => Array(6));

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
        "                <td><b>AVG : " + average(CT) + "</b></td>\n" +
        "                <td><b>AVG : " + average(TAT) + "</b></td>\n" +
        "                <td><b>AVG : " + average(WT) + "</b></td>\n" +
        "            </tr>"

    table += "</tbody>\n" +
        "        </table>"


    document.getElementById(tablename).innerHTML += table;
}
