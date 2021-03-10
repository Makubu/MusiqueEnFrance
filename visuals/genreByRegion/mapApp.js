const map = document.querySelector('#map');
const paths = map.querySelectorAll('.map_image path');

const color1 = "rgb(244, 220, 213)"; //color for map: interpolation between color1 and color2
const color2 = "rgb(244, 56, 56)";
const innerCanvas_age = '<canvas id=\"bar_chart_canvas_age\" width=\"400\" height=\"250\"class=\"is-clicked\"></canvas>';
const innerCanvas_csp = '<canvas id=\"bar_chart_canvas_csp\" width="400" height="250" class=\"is-clicked\"></canvas>';
//Color of the bars !!!!!!!!!!!!!!!!!!!!!!!
const chartColor = '#CBCBCB';

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

const title = {
    fontFamily: "'MarrSans', Helvetica, arial, serif",
    fontStyle: "normal",
    fontColor: 'black',
    fontSize: 15,
};

let chartLine_age;
let chartLine_csp;

paths.forEach(function (path) {
    path.addEventListener('mouseenter', function () {
        let id = this.id;
        //document.querySelector('#list-'+id).classList.add('is-active');
        this.classList.add('is-active');
        d3.select(this).raise()
        let clickedPath = map.querySelectorAll('.is-clicked');
        clickedPath.forEach(function (path_) {
            d3.select(path_).raise();
        })
    })
})

paths.forEach(function (path) {
    path.addEventListener('mouseleave', function () {
        let id = this.id;
        //document.querySelector('#list-'+id).classList.remove('is-active');
        this.classList.remove('is-active');

    })
})

document.addEventListener('mousedown', hideMapInfo_age);


function hideMapInfo_age(event) {
    if (paused) {
        if (!event.target.classList.contains('is-clicked')) {
            document.querySelectorAll(".is-clicked").forEach(function (path) {
                path.classList.remove("is-clicked");
            })

            if (document.getElementById("additional_chart") != null) {
                let map_inf = document.querySelector('#chart_div_age');
                map_inf.innerHTML = innerCanvas_age;
                let map_inf_csp = document.querySelector('#chart_div_csp');
                map_inf_csp.innerHTML = innerCanvas_csp;
                let charts_div = document.getElementById("mapcharts");
                document.getElementById("additional_chart").style.width = 0;
            }

        }
    }else{
        if ((!event.target.classList.contains('is-clicked')) && (!event.target.tagName === "path")) {
            document.querySelectorAll(".is-clicked").forEach(function (path) {
                path.classList.remove("is-clicked");
            })

            if (document.getElementById("additional_chart") != null) {
                let map_inf = document.querySelector('#chart_div_age');
                map_inf.innerHTML = innerCanvas_age;
                let map_inf_csp = document.querySelector('#chart_div_csp');
                map_inf_csp.innerHTML = innerCanvas_csp;
                let charts_div = document.getElementById("mapcharts");
                document.getElementById("additional_chart").style.width = 0;
            }

        }
    }
}


//Import data
let dataP = d3.csv("./small_data.csv"); // dataP pour data Promise

//To keep track of the listeners
let currentListners = {};

//Function principale
function displayGenreByRegion(genre) {
    let maxRatio = 0;
    let minRatio = 1;
    paths.forEach(function (path) {
        const id = path.id;
        let callback = getRegion(id);
        dataP.then(callback).then(function (csv) {
            let totalPopReg = csv.length;
            let genrePopulation = getGenre(genre)(csv).length;
            let ratio = genrePopulation / totalPopReg;

            if (ratio > maxRatio) {
                maxRatio = ratio;
            }
            if (ratio < minRatio) {
                minRatio = ratio;
            }
        })

    })


    let max_ratio_reg = 0;
    paths.forEach(function (path, index) {
        const id = path.id;
        let callback = getRegion(id);
        dataP.then(callback).then(function (csv_reg) {
            let totalPopReg = csv_reg.length;
            let genrePopulation = getGenre(genre)(csv_reg).length;
            let getD3Color = d3.interpolate(color1, color2);
            let ratio = genrePopulation / totalPopReg;
            ratio = ratio - minRatio;
            ratio = ratio / (maxRatio - minRatio);

            document.getElementById(id).style.fill = getD3Color(ratio);


            let ratio_15_24 = getAge15_24(getGenre(genre)(csv_reg)).length / getAge15_24(csv_reg).length;
            let ratio_25_34 = getAge25_34(getGenre(genre)(csv_reg)).length / getAge25_34(csv_reg).length;
            let ratio_35_49 = getAge35_49(getGenre(genre)(csv_reg)).length / getAge35_49(csv_reg).length;
            let ratio_50_64 = getAge50_64(getGenre(genre)(csv_reg)).length / getAge50_64(csv_reg).length;
            let ratio_65 = getAge65(getGenre(genre)(csv_reg)).length / getAge65(csv_reg).length;

            if (ratio_15_24>max_ratio_reg){max_ratio_reg = ratio_15_24;}
            if (ratio_25_34>max_ratio_reg){max_ratio_reg = ratio_25_34;}
            if (ratio_35_49>max_ratio_reg){max_ratio_reg = ratio_35_49;}
            if (ratio_50_64>max_ratio_reg){max_ratio_reg = ratio_50_64;}
            if (ratio_65>max_ratio_reg){max_ratio_reg = ratio_65;}


            document.getElementById(id).dataset.ratio_moyen = genrePopulation / totalPopReg;
            document.getElementById(id).dataset.ratio_age_15_24 = ratio_15_24;
            document.getElementById(id).dataset.ratio_age_25_34 = ratio_25_34;
            document.getElementById(id).dataset.ratio_age_35_49 = ratio_35_49;
            document.getElementById(id).dataset.ratio_age_50_64 = ratio_50_64;
            document.getElementById(id).dataset.ratio_age_65 = ratio_65;


            //Legend (done after last region, i.e. index=11
            if (index === 11) {

                let legeng_size = 7;

                let values_percent = makeArr(minRatio * 100, maxRatio * 100, legeng_size, true).reverse()
                    .map(function (arg, index) {
                        if (index == 0 || index == legeng_size - 1 || index == Math.round((legeng_size - 1) / 2)) {
                            return arg + " %";
                        } else {
                            return " ".repeat(index);
                        }
                    });

                let values = makeArr(minRatio, maxRatio, legeng_size, false).reverse();
                let colors = values.map(function (ratio_) {
                    ratio = ratio_ - minRatio;
                    ratio = ratio / (maxRatio - minRatio);
                    return getD3Color(ratio);
                });

                var ordinal = d3.scaleOrdinal()
                    .domain(values_percent)
                    .range(colors);

                var svg = d3.select("#map_legend_svg");

                svg.append("g")
                    .attr("class", "legendLinear")
                    .attr("transform", "translate(20,20)");

                var legendLinear = d3.legendColor()
                    .scale(ordinal)
                    .title("Pourcentage d'écoute: " + genre);

                svg.select(".legendLinear")
                    .call(legendLinear);


                /*
                //find labels (balise text, class label) and change font in css

                let map_legend_svg = document.querySelector('#map_legend_svg');
                let labels = map_legend_svg.querySelectorAll('text.label');
                labels.forEach(function (label) {

                })
                 */
            }
        })
    })

    paths.forEach(function (path) {
        function listenerFunction_age () {
            let charts_div = document.getElementById("mapcharts");
            
            if(insight_etudie != 0){
                return;
            }
            if(!document.getElementById('additional_chart')){
                var map_chart_div = document.createElement("div");
                var sdiv_age = document.createElement("div");
                var sdiv_csp = document.createElement("div");
                map_chart_div.class = "map_chart";
                map_chart_div.id = "additional_chart";
                sdiv_age.id = "chart_div_age";
                sdiv_csp.id = "chart_div_csp";
                map_chart_div.style.paddingRight = "30px";
                map_chart_div.style.width="0px";
                map_chart_div.style.height="100%";
                map_chart_div.style.opacity="0%";
                map_chart_div.style.transition = "all .3s";
                map_chart_div.appendChild(sdiv_age);
                map_chart_div.appendChild(sdiv_csp);
                charts_div.appendChild(map_chart_div); 

            }
            else {
                map_chart_div = document.getElementById("additional_chart");
            };

            setTimeout(function(){map_chart_div.style.opacity="100%";
                map_chart_div.style.width="30%"}, 1);



            let id = this.id;
            d3.select(this).raise();
            document.querySelectorAll(".is-clicked").forEach(function (path) {
                path.classList.remove("is-clicked");
            })

            this.classList.add('is-clicked');

            let region = getRegionName(id);
            let map_inf_age = document.querySelector('#chart_div_age');
            map_inf_age.innerHTML = innerCanvas_age;
            //let map_inf_csp = document.querySelector('#chart_div_age_csp');
            //map_inf_csp.innerHTML = "<canvas id=\"bar_chart_canvas_csp\" width=\"400\" height=\"400\"></canvas>";



            let config = {
                type: 'bar',
                data: {
                    labels: ["Total", "15-24", "25-34", "35-49", "50-64", "65+"],
                    datasets: [
                        {
                            label: "Population (millions)",
                            //palette : "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#fdb462"
                            backgroundColor: [RGBToHex(path.style.fill), chartColor,chartColor,chartColor,chartColor,chartColor],
                            data: [Math.round(document.getElementById(id).dataset.ratio_moyen*1000)/10,
                                Math.round(document.getElementById(id).dataset.ratio_age_15_24*1000)/10,
                                Math.round(document.getElementById(id).dataset.ratio_age_25_34*1000)/10,
                                Math.round(document.getElementById(id).dataset.ratio_age_35_49*1000)/10,
                                Math.round(document.getElementById(id).dataset.ratio_age_50_64*1000)/10,
                                Math.round(document.getElementById(id).dataset.ratio_age_65 * 1000)/10]
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio : false,
                    legend: { display: false },
                    title: {
                        display: true,
                        text: [region + ': Proportion de la','population écoutant du ' + genre + " en fonction de l'age"],
                        fontColor: title.fontColor,
                        fontStyle: title.fontStyle,
                        fontSize: title.fontSize,
                        fontFamily: title.fontFamily
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)",
                            },
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
                                max: Math.trunc(max_ratio_reg*10+1)*10,
                                beginAtZero: true,
                            },
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: "%  d'écoute",
                                fontColor: axesLegend.fontColor,
                                fontStyle: axesLegend.fontStyle,
                                fontSize: axesLegend.fontSize,
                                fontFamily: axesLegend.fontFamily
                            }
                        }]
                    }
                }
            };

            let ctx = document.getElementById("bar_chart_canvas_age").getContext("2d");
            setTimeout(function(){chartLine_age = new Chart(ctx, config)},200);
        }

        // Remove former eventListener
        let region = getRegionName(path.id)
        if (currentListners.hasOwnProperty(region)){
            path.removeEventListener('mousedown', currentListners[region])
        }
        currentListners[region] = listenerFunction_age;

        // Add new event listener
        path.addEventListener('mousedown', listenerFunction_age);

    })
}


displayGenreByRegion(document.getElementById("select_genre").value);




//TODO: add map_info element to give info on age and CSP by region (une fois interactiveMap avec map_info sur AGE, puis
// genreByAge, puis re intercativeMap avec map_info sur CSP , puis genreByCSP.

const map_mapAppCSP = document.querySelector('#map');
const paths_mapAppCSP = map_mapAppCSP.querySelectorAll('.map_image path');

const color1_mapAppCSP = "rgb(244, 220, 213)"; //color for map: interpolation between color1 and color2
const color2_mapAppCSP = "rgb(244, 56, 56)";

//Color of the bars !!!!!!!!!!!!!!!!!!!!!!!
const chartColor_mapAppCSP = '#CBCBCB';

const axesLegend_mapAppCSP = {
    fontFamily: "'MarrSans', Helvetica, arial, serif",
    fontStyle: "normal",
    fontColor: 'black',
    fontSize: 15,
};

const axesTicks_mapAppCSP = {
    fontFamily: "'MarrSans', Helvetica, arial, serif",
    fontStyle: "normal",
    fontColor: 'black',
    fontSize: 13,
};

const title_mapAppCSP = {
    fontFamily: "'MarrSans', Helvetica, arial, serif",
    fontStyle: "normal",
    fontColor: 'black',
    fontSize: 15,
};

paths_mapAppCSP.forEach(function (path) {
    path.addEventListener('mouseenter', function () {
        let id = this.id;
        //document.querySelector('#list-'+id).classList.add('is-active');
        this.classList.add('is-active');
        d3.select(this).raise()
        let clickedPath = map_mapAppCSP.querySelectorAll('.is-clicked');
        clickedPath.forEach(function (path_) {
            d3.select(path_).raise();
        })
    })
})

paths_mapAppCSP.forEach(function (path) {
    path.addEventListener('mouseleave', function () {
        let id = this.id;
        //document.querySelector('#list-'+id).classList.remove('is-active');
        this.classList.remove('is-active');

    })
})


//Import data
let dataP_mapAppCSP = d3.csv("./small_data.csv"); // dataP pour data Promise

//To keep track of the listeners
let currentListners_mapAppCSP = {};

//Function principale
function displayGenreByRegion_mapAppCSP(genre) {
    let maxRatio = 0;
    let minRatio = 1;
    paths_mapAppCSP.forEach(function (path) {
        const id = path.id;
        let callback = getRegion(id);
        dataP_mapAppCSP.then(callback).then(function (csv) {
            let totalPopReg = csv.length;
            let genrePopulation = getGenre(genre)(csv).length;
            let ratio = genrePopulation / totalPopReg;

            if (ratio > maxRatio) {
                maxRatio = ratio;
            }
            if (ratio < minRatio) {
                minRatio = ratio;
            }
        })

    })


    let max_ratio_reg = 0;
    paths_mapAppCSP.forEach(function (path, index) {
        const id = path.id;
        let callback = getRegion(id);
        dataP_mapAppCSP.then(callback).then(function (csv_reg) {
            let totalPopReg = csv_reg.length;
            let genrePopulation = getGenre(genre)(csv_reg).length;
            let getD3Color = d3.interpolate(color1_mapAppCSP, color2_mapAppCSP);
            let ratio = genrePopulation / totalPopReg;
            ratio = ratio - minRatio;
            ratio = ratio / (maxRatio - minRatio);

            document.getElementById(id).style.fill = getD3Color(ratio);


            let ratio_CSPPlus = getCSPPlus(getGenre(genre)(csv_reg)).length / getCSPPlus(csv_reg).length;
            let ratio_CSPMoins = getCSPMoins(getGenre(genre)(csv_reg)).length / getCSPMoins(csv_reg).length;
            let ratio_Inactif = getCSPInactif(getGenre(genre)(csv_reg)).length / getCSPInactif(csv_reg).length;


            if (ratio_CSPMoins>max_ratio_reg){max_ratio_reg = ratio_CSPMoins;}
            if (ratio_CSPPlus>max_ratio_reg){max_ratio_reg = ratio_CSPPlus;}
            if (ratio_Inactif>max_ratio_reg){max_ratio_reg = ratio_Inactif;}


            document.getElementById(id).dataset.ratio_moyen = genrePopulation / totalPopReg;
            document.getElementById(id).dataset.ratio_CSP_Plus = ratio_CSPPlus;
            document.getElementById(id).dataset.ratio_CSP_Moins = ratio_CSPMoins;
            document.getElementById(id).dataset.ratio_Inactif = ratio_Inactif;


            //Legend (done after last region, i.e. index=11
            if (index === 11) {

                let legeng_size = 7;

                let values_percent = makeArr(minRatio * 100, maxRatio * 100, legeng_size, true).reverse()
                    .map(function (arg, index) {
                        if (index == 0 || index == legeng_size - 1 || index == Math.round((legeng_size - 1) / 2)) {
                            return arg + " %";
                        } else {
                            return " ".repeat(index);
                        }
                    });

                let values = makeArr(minRatio, maxRatio, legeng_size, false).reverse();
                let colors = values.map(function (ratio_) {
                    ratio = ratio_ - minRatio;
                    ratio = ratio / (maxRatio - minRatio);
                    return getD3Color(ratio);
                });

                var ordinal = d3.scaleOrdinal()
                    .domain(values_percent)
                    .range(colors);

                var svg = d3.select("#map_legend_svg");

                svg.append("g")
                    .attr("class", "legendLinear")
                    .attr("transform", "translate(20,20)");

                var legendLinear = d3.legendColor()
                    .scale(ordinal)
                    .title("Pourcentage d'écoute: " + genre);

                svg.select(".legendLinear")
                    .call(legendLinear);


                /*
                //find labels (balise text, class label) and change font in css

                let map_legend_svg = document.querySelector('#map_legend_svg');
                let labels = map_legend_svg.querySelectorAll('text.label');
                labels.forEach(function (label) {

                })
                 */
            }
        })
    })

    paths_mapAppCSP.forEach(function (path) {
        function listenerFunction_csp () {
            let id = this.id;
            d3.select(this).raise();


            this.classList.add('is-clicked');

            let region = getRegionName(id);
            let map_inf = document.querySelector('#chart_div_csp');
            map_inf.innerHTML = innerCanvas_csp;


            let MystepSize = 10;
            if ((Math.trunc(max_ratio_reg*10+1)*10) <= 30){
                MystepSize = 5;
            }
            let config = {
                type: 'bar',
                data: {
                    labels: ["Total", "CSP-Plus", "CSP-Moins", "Inactif"],
                    datasets: [
                        {
                            label: "Population (millions)",
                            //palette : "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#fdb462"
                            backgroundColor: [RGBToHex(path.style.fill), chartColor_mapAppCSP,chartColor_mapAppCSP,chartColor_mapAppCSP,chartColor_mapAppCSP,chartColor_mapAppCSP],
                            data: [Math.round(document.getElementById(id).dataset.ratio_moyen*1000)/10,
                                Math.round(document.getElementById(id).dataset.ratio_CSP_Plus*1000)/10,
                                Math.round(document.getElementById(id).dataset.ratio_CSP_Moins*1000)/10,
                                Math.round(document.getElementById(id).dataset.ratio_Inactif*1000)/10]
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio : false,
                    legend: { display: false },
                    title: {
                        display: true,
                        text: [region + ': Proportion de la','population écoutant du ' + genre + " en fonction de la CSP"],
                        fontColor: title_mapAppCSP.fontColor,
                        fontStyle: title_mapAppCSP.fontStyle,
                        fontSize: title_mapAppCSP.fontSize,
                        fontFamily: title_mapAppCSP.fontFamily
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)",
                            },
                            display: true,
                            ticks: {
                                fontColor: axesTicks_mapAppCSP.fontColor,
                                fontStyle: axesTicks_mapAppCSP.fontStyle,
                                fontSize: axesTicks_mapAppCSP.fontSize,
                                fontFamily: axesTicks_mapAppCSP.fontFamily
                            },
                            scaleLabel: {
                                display: true,
                                labelString: "CSP",
                                fontColor: axesLegend_mapAppCSP.fontColor,
                                fontStyle: axesLegend_mapAppCSP.fontStyle,
                                fontSize: axesLegend_mapAppCSP.fontSize,
                                fontFamily: axesLegend_mapAppCSP.fontFamily
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                stepSize: MystepSize,
                                fontColor: axesTicks_mapAppCSP.fontColor,
                                fontStyle: axesTicks_mapAppCSP.fontStyle,
                                fontSize: axesTicks_mapAppCSP.fontSize,
                                fontFamily: axesTicks_mapAppCSP.fontFamily,
                                max: Math.trunc(max_ratio_reg*10+1)*10,
                                beginAtZero: true,
                            },
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: "%  d'écoute",
                                fontColor: axesLegend_mapAppCSP.fontColor,
                                fontStyle: axesLegend_mapAppCSP.fontStyle,
                                fontSize: axesLegend_mapAppCSP.fontSize,
                                fontFamily: axesLegend_mapAppCSP.fontFamily
                            }
                        }]
                    }
                }
            };

            let ctx = document.getElementById("bar_chart_canvas_csp").getContext("2d");
            chartLine_csp = new Chart(ctx, config)
        }

        // Remove former eventListener
        let region = getRegionName(path.id)
        if (currentListners_mapAppCSP.hasOwnProperty(region)){
            path.removeEventListener('mousedown', currentListners_mapAppCSP[region])
        }
        currentListners_mapAppCSP[region] = listenerFunction_csp;

        // Add new event listener
        path.addEventListener('mousedown', listenerFunction_csp);

    })

}


displayGenreByRegion_mapAppCSP(document.getElementById("select_genre").value);

document.getElementById("select_genre").addEventListener('change', (event) => {
    displayGenreByRegion(document.getElementById("select_genre").value);
    displayGenreByRegion_mapAppCSP(document.getElementById("select_genre").value);

});

function updateMyGraphs(){
    if (chartLine_age == null){
        console.log('age is null');
    }


    if (chartLine_age != null){
        console.log('age is not null');
        chartLine_age.update();
        chartLine_age.resize();
        chartLine_age.update();
    }
    if (chartLine_csp != null){
        chartLine_csp.update();
        chartLine_csp.resize();
        chartLine_csp.update();
    }
}