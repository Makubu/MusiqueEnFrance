//Style
const axesLegend = {
    fontFamily: "'MarrSans', Helvetica, arial, serif",
    fontStyle: "normal",
    fontColor: 'black',
    fontSize: 15,
};

const axesTicks = {
    fontFamily: "'MarrSans', Helvetica, arial, serif",
    fontStyle: "normal",
    fontColor: 'black',
    fontSize: 13,
};

const legendLabels = {
    fontFamily: "'MarrSans', Helvetica, arial, serif",
    fontStyle: "normal",
    fontColor: 'black',
    fontSize: 14,
};

const title = {
    fontFamily: "'MarrSans', Helvetica, arial, serif",
    fontStyle: "normal",
    fontColor: 'black',
    fontSize: 15,
};


const chartColors = {
    "Application": '#8dd3c7',
    "Concert": '#455D94',
    "Radio": '#bebada',
    "Site internet": '#fb8072',
    "Chaine TV": '#fccde5',
    "CD": '#fdb462',
    "Vinyle": '#b3de69',
};

const chartColorsBorder = {
    "Application": '#8dd3c7',
    "Concert": '#455D94',
    "Radio": '#bebada',
    "Site internet": '#fb8072',
    "Chaine TV": '#fccde5',
    "CD": '#fdb462',
    "Vinyle": '#b3de69',
    /*"Métal": '#80b1d3',
    "PopRock": '#d9d9d9',
    "Reggae": '#bc80bd',
    "RnB": '#ccebc5',
    "Soul": '#ffed6f',
    "Variété": '#F65656' */
};

const MODES = ["Application", "Concert", "Radio", "CD", "Vinyle", "Site internet", "Chaine TV"]
const AGE = ["15-24", "25-34", "35-49", "50-64", "65+"];
const OFTEN = false;

//Import data
dataP = d3.csv("http://localhost:8000/small_data.csv"); // dataP pour data Promise

let musicData = {};
let datasetsValue = [];

dataP.then(function (csv) {
    MODES.forEach(function (mode){
        let values = [];
        AGE.forEach(function (age){
            let newVal = getAge(age)(getQ6(mode, OFTEN)(csv)).length / getAge(age)(csv).length;
            values.push(Math.round(newVal*1000)/10);
        })
        musicData[mode] = values;
    })

    MODES.forEach(function (mode, index){
        let hide = true;
        if (index < 5){
            hide = false;
        }
        let elem = {
            label: mode,
            backgroundColor: chartColors[mode],
            borderColor: chartColorsBorder[mode],
            data: musicData[mode],
            fill: false,
            hidden: hide,
        }
        datasetsValue.push(elem);
    })

    let config = {
        type: 'line',
        data: {
            labels: AGE,
            datasets: datasetsValue
        },
        options: {
            maintainAspectRatio: false,
            animation: {
                duration: 1500,
            },
            responsive: true,
            title: {
                display: true,
                text: "Pourcentage d'utilisation de divers modes d'écoute par tranche d'age",
                fontColor: title.fontColor,
                fontStyle: title.fontStyle,
                fontSize: title.fontSize,
                fontFamily: title.fontFamily
            },
            tooltips: {
                mode: 'point',
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            legend:{
                labels:{
                    fontColor: legendLabels.fontColor,
                    fontStyle: legendLabels.fontStyle,
                    fontSize: legendLabels.fontSize,
                    fontFamily: legendLabels.fontFamily
                }
            },
            scales: {
                xAxes: [{
                    display: true,
                    ticks: {
                        fontColor: axesTicks.fontColor,
                        fontStyle: axesTicks.fontStyle,
                        fontSize: axesTicks.fontSize,
                        fontFamily: axesTicks.fontFamily
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Age",
                        fontColor: axesLegend.fontColor,
                        fontStyle: axesLegend.fontStyle,
                        fontSize: axesLegend.fontSize,
                        fontFamily: axesLegend.fontFamily
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: axesTicks.fontColor,
                        fontStyle: axesTicks.fontStyle,
                        fontSize: axesTicks.fontSize,
                        fontFamily: axesTicks.fontFamily,
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: "Pourcentage d'utilisation",
                        fontColor: axesLegend.fontColor,
                        fontStyle: axesLegend.fontStyle,
                        fontSize: axesLegend.fontSize,
                        fontFamily: axesLegend.fontFamily
                    }
                }]
            }
        }
    };

    let ctx = document.getElementById("line_chart_div_canvas").getContext("2d");
    let chartLine = new Chart(ctx, config);
    chartLine.update();


});




