//Style
const axesLegend_genreByAgeApp = {
    fontFamily: "'MarrSans', Helvetica, arial, serif",
    fontStyle: "normal",
    fontColor: 'black',
    fontSize: 15,
};

const axesTicks_genreByAgeApp = {
    fontFamily: "'MarrSans', Helvetica, arial, serif",
    fontStyle: "normal",
    fontColor: 'black',
    fontSize: 13,
};

const legendLabels_genreByAgeApp = {
    fontFamily: "'MarrSans', Helvetica, arial, serif",
    fontStyle: "normal",
    fontColor: 'black',
    fontSize: 14,
};

const title_genreByAgeApp = {
    fontFamily: "'MarrSans', Helvetica, arial, serif",
    fontStyle: "normal",
    fontColor: 'black',
    fontSize: 15,
};


const chartColors_genreByAgeApp = {
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

const chartColorsBorder_genreByAgeApp = {
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

const GENRES_genreByAgeApp = ["Rap", "Classique", "Variété", "PopRock", "Autre", "Dance", "Electro", "Jazz",
    "Musique du monde", "Métal", "Reggae", "RnB", "Soul"]
const AGE_genreByAgeApp = ["15-24", "25-34", "35-49", "50-64", "65+"];

//Import data
let dataP_genreByAgeApp = d3.csv("./small_data.csv"); // dataP pour data Promise

let musicData_genreByAgeApp = {};
let datasetsValue_genreByAgeApp = [];

dataP_genreByAgeApp.then(function (csv) {
    GENRES_genreByAgeApp.forEach(function (genre){
        let values = [];
        AGE_genreByAgeApp.forEach(function (age){
            let newVal = getAge(age)(getGenre(genre)(csv)).length / getAge(age)(csv).length;
            values.push(Math.round(newVal*1000)/10);
        })
        musicData_genreByAgeApp[genre] = values;
    })

    GENRES_genreByAgeApp.forEach(function (genre, index){
        let hide = true;
        if (index < 4){
            hide = false;
        }
        let elem = {
            label: genre,
            backgroundColor: chartColors_genreByAgeApp[genre],
            borderColor: chartColorsBorder_genreByAgeApp[genre],
            data: musicData_genreByAgeApp[genre],
            fill: false,
            hidden: hide,
        }
        datasetsValue_genreByAgeApp.push(elem);
    })

    let config = {
        type: 'line',
        data: {
            labels: AGE_genreByAgeApp,
            datasets: datasetsValue_genreByAgeApp
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
                fontColor: title_genreByAgeApp.fontColor,
                fontStyle: title_genreByAgeApp.fontStyle,
                fontSize: title_genreByAgeApp.fontSize,
                fontFamily: title_genreByAgeApp.fontFamily
            },
            tooltips: {
                mode: 'point',
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            legend:{
                display:false,
                labels:{
                    fontColor: legendLabels_genreByAgeApp.fontColor,
                    fontStyle: legendLabels_genreByAgeApp.fontStyle,
                    fontSize: legendLabels_genreByAgeApp.fontSize,
                    fontFamily: legendLabels_genreByAgeApp.fontFamily
                }
            },
            scales: {
                xAxes: [{
                    display: true,
                    ticks: {
                        fontColor: axesTicks_genreByAgeApp.fontColor,
                        fontStyle: axesTicks_genreByAgeApp.fontStyle,
                        fontSize: axesTicks_genreByAgeApp.fontSize,
                        fontFamily: axesTicks_genreByAgeApp.fontFamily
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Age",
                        fontColor: axesLegend_genreByAgeApp.fontColor,
                        fontStyle: axesLegend_genreByAgeApp.fontStyle,
                        fontSize: axesLegend_genreByAgeApp.fontSize,
                        fontFamily: axesLegend_genreByAgeApp.fontFamily
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: axesTicks_genreByAgeApp.fontColor,
                        fontStyle: axesTicks_genreByAgeApp.fontStyle,
                        fontSize: axesTicks_genreByAgeApp.fontSize,
                        fontFamily: axesTicks_genreByAgeApp.fontFamily,
                        beginAtZero: true,
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: "Pourcentage d'écoute de la tranche d'age",
                        fontColor: axesLegend_genreByAgeApp.fontColor,
                        fontStyle: axesLegend_genreByAgeApp.fontStyle,
                        fontSize: axesLegend_genreByAgeApp.fontSize,
                        fontFamily: axesLegend_genreByAgeApp.fontFamily
                    }
                }]
            }
        }
    };

    let ctx = document.getElementById("line_chart_div_canvas_genresage").getContext("2d");
    let chartLine = new Chart(ctx, config);
    chartLine.update();


    //CHANGES FOR LEGEND

    GENRES_genreByAgeApp.forEach(function (genre, index ){
        let label_id = "check_genresage_" + genre
        document.getElementById(label_id+ "_label").style.color = chartLine.data.datasets[index].backgroundColor;
        document.getElementById(label_id+ "_checkmark").style.border = "2px solid " + chartLine.data.datasets[index].backgroundColor;
        let legend_checkbox = document.getElementById("check_genresage_" + genre);
        if (legend_checkbox.checked) {
            document.getElementById(label_id+ "_checkmark").style.backgroundColor = chartLine.data.datasets[index].backgroundColor;
        } else {
            document.getElementById(label_id+ "_checkmark").style.backgroundColor = "rgba(255, 255, 255, 0)";
        }
        legend_checkbox.addEventListener('change', function () {
            if (this.checked) {
                chartLine.data.datasets[index].hidden = false;
                document.getElementById(label_id+ "_checkmark").style.backgroundColor = chartLine.data.datasets[index].backgroundColor;
            } else {
                chartLine.data.datasets[index].hidden = true;
                document.getElementById(label_id+ "_checkmark").style.backgroundColor = "rgba(255, 255, 255, 0)";
            }
            chartLine.update();
        });
    });

});




