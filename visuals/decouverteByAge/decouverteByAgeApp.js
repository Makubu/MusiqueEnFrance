//Style
const gridColor_decouverteByAgeApp = "#909090";

const axesLegend_decouverteByAgeApp = {
    fontFamily: "'MarrSans', Helvetica, arial, serif",
    fontStyle: "normal",
    fontColor: 'black',
    fontSize: 15,
};

const axesTicks_decouverteByAgeApp = {
    fontFamily: "'MarrSans', Helvetica, arial, serif",
    fontStyle: "normal",
    fontColor: 'black',
    fontSize: 13,
};

const legendLabels_decouverteByAgeApp = {
    fontFamily: "'MarrSans', Helvetica, arial, serif",
    fontStyle: "normal",
    fontColor: 'black',
    fontSize: 14,
};

const title_decouverteByAgeApp = {
    fontFamily: "'MarrSans', Helvetica, arial, serif",
    fontStyle: "normal",
    fontColor: 'black',
    fontSize: 15,
};


const chartColors_decouverteByAgeApp = {
    "15-24": 'rgb(255, 99, 132, 0.2)',
    "25-34": 'rgb(255, 159, 64, 0.2)',
    "35-49": 'rgb(255, 205, 86, 0.2)',
    "50-64": 'rgb(153, 102, 255, 0.2)',
    "65+": 'rgb(70, 162, 235, 0.2)',
};

const chartColorsBorder_decouverteByAgeApp = {
    "15-24": 'rgb(255, 99, 132)',
    "25-34": 'rgb(255, 159, 64)',
    "35-49": 'rgb(255, 205, 86)',
    "50-64": 'rgb(153, 102, 255)',
    "65+": 'rgb(70, 162, 235)',
    /*"CD": '#fdb462',
    "Vinyle": '#b3de69',
    "Métal": '#80b1d3',
    "PopRock": '#d9d9d9',
    "Reggae": '#bc80bd',
    "RnB": '#ccebc5',
    "Soul": '#ffed6f',
    "Variété": '#F65656' */
};

const MODES_decouverteByAgeApp = ["Streaming", "Reseaux Sociaux", "Amis/Proches", "Concerts", "Disquaires", "Presse", "Radio", "Chaine TV", "Plateforme Video"] /*, "Autres"];*/
const AGE_decouverteByAgeApp = ["15-24", "25-34", "35-49", "50-64", "65+"];


//Import data
let dataP_decouverteByAgeApp = d3.csv("./small_data.csv"); // dataP pour data Promise

let musicData_decouverteByAgeApp = {};
let datasetsValue_decouverteByAgeApp = [];

dataP_decouverteByAgeApp.then(function (csv) {
    AGE_decouverteByAgeApp.forEach(function (age){
        let values = [];
        MODES_decouverteByAgeApp.forEach(function (mode){
            let newVal = getAge(age)(getQ24(mode)(csv)).length / getAge(age)(csv).length;
            values.push(Math.round(newVal*1000)/10);
        })
        musicData_decouverteByAgeApp[age] = values;
    })

    AGE_decouverteByAgeApp.forEach(function (age, index){
        let hide = true;
        if (index==0 || index ==2 ){
            hide = false;
        }
        let elem = {
            label: age,
            backgroundColor: chartColors_decouverteByAgeApp[age],
            borderColor: chartColorsBorder_decouverteByAgeApp[age],
            pointBackgroundColor: chartColorsBorder_decouverteByAgeApp[age],
            data: musicData_decouverteByAgeApp[age],
            //fill: false,
            hidden: hide,
        }

        datasetsValue_decouverteByAgeApp.push(elem);
    })

    let config = {
        type: 'radar',
        data: {
            labels: MODES_decouverteByAgeApp,
            datasets: datasetsValue_decouverteByAgeApp
        },
        options: {

            maintainAspectRatio: false,
            animation: {
                duration: 1500,
            },
            responsive: true,
            title: {
                display: true,
                text: "Utilisation de divers modes de découverte de la musique par tranche d'age",
                fontColor: title_decouverteByAgeApp.fontColor,
                fontStyle: title_decouverteByAgeApp.fontStyle,
                fontSize: title_decouverteByAgeApp.fontSize,
                fontFamily: title_decouverteByAgeApp.fontFamily
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
                    fontColor: legendLabels_decouverteByAgeApp.fontColor,
                    fontStyle: legendLabels_decouverteByAgeApp.fontStyle,
                    fontSize: legendLabels_decouverteByAgeApp.fontSize,
                    fontFamily: legendLabels_decouverteByAgeApp.fontFamily
                }
            },
            scale: {
                reverse: false,
                gridLines: {
                    color: gridColor_decouverteByAgeApp
                },
                ticks: {
                    callback: function(value, index, values) {
                        return value + ' %';
                    },
                    beginAtZero: true,
                    fontColor: axesTicks_decouverteByAgeApp.fontColor,
                    fontStyle: axesTicks_decouverteByAgeApp.fontStyle,
                    fontSize: axesTicks_decouverteByAgeApp.fontSize,
                    fontFamily: axesTicks_decouverteByAgeApp.fontFamily
                },

                pointLabels: {

                    fontColor: axesLegend_decouverteByAgeApp.fontColor,
                    fontStyle: axesLegend_decouverteByAgeApp.fontStyle,
                    fontSize: axesLegend_decouverteByAgeApp.fontSize,
                    fontFamily: axesLegend_decouverteByAgeApp.fontFamily
                }
            }
        }
    };


    let ctx = document.getElementById("line_chart_div_canvas_decouverte").getContext("2d");
    let radarChart = new Chart(ctx, config);
    radarChart.update();


});




