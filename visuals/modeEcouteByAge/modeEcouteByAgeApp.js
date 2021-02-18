//Style
const axesLegend_modeEcouteByAgeApp = {
    fontFamily: "'MarrSans', Helvetica, arial, serif",
    fontStyle: "normal",
    fontColor: 'black',
    fontSize: 15,
};

const axesTicks_modeEcouteByAgeApp = {
    fontFamily: "'MarrSans', Helvetica, arial, serif",
    fontStyle: "normal",
    fontColor: 'black',
    fontSize: 13,
};

const legendLabels_modeEcouteByAgeApp = {
    fontFamily: "'MarrSans', Helvetica, arial, serif",
    fontStyle: "normal",
    fontColor: 'black',
    fontSize: 14,
};

const title_modeEcouteByAgeApp = {
    fontFamily: "'MarrSans', Helvetica, arial, serif",
    fontStyle: "normal",
    fontColor: 'black',
    fontSize: 15,
};


const chartColors_modeEcouteByAgeApp = {
    "Application": '#8dd3c7',
    "Concert": '#455D94',
    "Radio": '#bebada',
    "Site internet": '#fb8072',
    "Chaine TV": '#fccde5',
    "CD": '#fdb462',
    "Vinyle": '#b3de69',
};

const chartColorsBorder_modeEcouteByAgeApp = {
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

const MODES_modeEcouteByAgeApp = ["Application", "Concert", "Radio", "CD", "Vinyle", "Site internet", "Chaine TV"]
const AGE_modeEcouteByAgeApp = ["15-24", "25-34", "35-49", "50-64", "65+"];
const OFTEN_modeEcouteByAgeApp = false;

//Import data
let dataP_modeEcouteByAgeApp = d3.csv("./small_data.csv"); // dataP pour data Promise

let musicData_modeEcouteByAgeApp = {};
let datasetsValue_modeEcouteByAgeApp = [];

dataP_modeEcouteByAgeApp.then(function (csv) {
    MODES_modeEcouteByAgeApp.forEach(function (mode){
        let values = [];
        AGE_modeEcouteByAgeApp.forEach(function (age){
            let newVal = getAge(age)(getQ6(mode, OFTEN_modeEcouteByAgeApp)(csv)).length / getAge(age)(csv).length;
            values.push(Math.round(newVal*1000)/10);
        })
        musicData_modeEcouteByAgeApp[mode] = values;
    })

    MODES_modeEcouteByAgeApp.forEach(function (mode, index){
        let hide = true;
        if (index < 5){
            hide = false;
        }
        let elem = {
            label: mode,
            backgroundColor: chartColors_modeEcouteByAgeApp[mode],
            borderColor: chartColorsBorder_modeEcouteByAgeApp[mode],
            data: musicData_modeEcouteByAgeApp[mode],
            fill: false,
            hidden: hide,
        }
        datasetsValue_modeEcouteByAgeApp.push(elem);
    })

    let config = {
        type: 'line',
        data: {
            labels: AGE_modeEcouteByAgeApp,
            datasets: datasetsValue_modeEcouteByAgeApp
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
                fontColor: title_modeEcouteByAgeApp.fontColor,
                fontStyle: title_modeEcouteByAgeApp.fontStyle,
                fontSize: title_modeEcouteByAgeApp.fontSize,
                fontFamily: title_modeEcouteByAgeApp.fontFamily
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
                    fontColor: legendLabels_modeEcouteByAgeApp.fontColor,
                    fontStyle: legendLabels_modeEcouteByAgeApp.fontStyle,
                    fontSize: legendLabels_modeEcouteByAgeApp.fontSize,
                    fontFamily: legendLabels_modeEcouteByAgeApp.fontFamily
                }
            },
            scales: {
                xAxes: [{
                    display: true,
                    ticks: {
                        fontColor: axesTicks_modeEcouteByAgeApp.fontColor,
                        fontStyle: axesTicks_modeEcouteByAgeApp.fontStyle,
                        fontSize: axesTicks_modeEcouteByAgeApp.fontSize,
                        fontFamily: axesTicks_modeEcouteByAgeApp.fontFamily
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Age",
                        fontColor: axesLegend_modeEcouteByAgeApp.fontColor,
                        fontStyle: axesLegend_modeEcouteByAgeApp.fontStyle,
                        fontSize: axesLegend_modeEcouteByAgeApp.fontSize,
                        fontFamily: axesLegend_modeEcouteByAgeApp.fontFamily
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: axesTicks_modeEcouteByAgeApp.fontColor,
                        fontStyle: axesTicks_modeEcouteByAgeApp.fontStyle,
                        fontSize: axesTicks_modeEcouteByAgeApp.fontSize,
                        fontFamily: axesTicks_modeEcouteByAgeApp.fontFamily,
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: "Pourcentage d'utilisation",
                        fontColor: axesLegend_modeEcouteByAgeApp.fontColor,
                        fontStyle: axesLegend_modeEcouteByAgeApp.fontStyle,
                        fontSize: axesLegend_modeEcouteByAgeApp.fontSize,
                        fontFamily: axesLegend_modeEcouteByAgeApp.fontFamily
                    }
                }]
            }
        }
    };

    let ctx = document.getElementById("line_chart_div_canvas_modesecoute").getContext("2d");
    let chartLine = new Chart(ctx, config);
    chartLine.update();


});




