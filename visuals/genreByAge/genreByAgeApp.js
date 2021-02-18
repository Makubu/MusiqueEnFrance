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
    "Rap": '#8dd3c7',
    "Autre": '#455D94',
    "Dance": '#bebada',
    "Classique": '#fb8072',
    "Electro": '#80b1d3',
    "Jazz": '#fdb462',
    "Musique du monde": '#b3de69',
    "Métal": '#fccde5',
    "PopRock": '#d9d9d9',
    "Reggae": '#bc80bd',
    "RnB": '#ccebc5',
    "Soul": '#ffed6f',
    "Variété": '#F65656'
};

const chartColorsBorder = {
    "Rap": '#8dd3c7',
    "Autre": '#455D94',
    "Dance": '#bebada',
    "Classique": '#fb8072',
    "Electro": '#80b1d3',
    "Jazz": '#fdb462',
    "Musique du monde": '#b3de69',
    "Métal": '#fccde5',
    "PopRock": '#d9d9d9',
    "Reggae": '#bc80bd',
    "RnB": '#ccebc5',
    "Soul": '#ffed6f',
    "Variété": '#F65656'
};

const GENRES = ["Rap", "Classique", "Variété", "PopRock", "Autre", "Dance", "Electro", "Jazz",
    "Musique du monde", "Métal", "Reggae", "RnB", "Soul"]
const AGE = ["15-24", "25-34", "35-49", "50-64", "65+"];

//Import data
dataP = d3.csv("http://localhost:8000/small_data.csv"); // dataP pour data Promise

let musicData = {};
let datasetsValue = [];

dataP.then(function (csv) {
    GENRES.forEach(function (genre){
        let values = [];
        AGE.forEach(function (age){
            let newVal = getAge(age)(getGenre(genre)(csv)).length / getAge(age)(csv).length;
            values.push(Math.round(newVal*1000)/10);
        })
        musicData[genre] = values;
    })

    GENRES.forEach(function (genre, index){
        let hide = true;
        if (index < 4){
            hide = false;
        }
        let elem = {
            label: genre,
            backgroundColor: chartColors[genre],
            borderColor: chartColorsBorder[genre],
            data: musicData[genre],
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
                text: "Pourcentage d'écoute des genres de musique par tranche d'age",
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
                        beginAtZero: true,
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: "Pourcentage d'écoute de la tranche d'age",
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




