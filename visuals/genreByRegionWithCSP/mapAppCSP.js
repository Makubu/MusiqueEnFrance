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

document.addEventListener('mousedown', hideMapInfo);
function hideMapInfo(event) {
    if (!event.target.classList.contains('is-clicked') && !event.target.classList.contains('chartjs-render-monitor')) {

        document.querySelectorAll(".is-clicked").forEach(function (path) {
            path.classList.remove("is-clicked");

            let map_inf = document.querySelector('#chart_div');
            map_inf.innerHTML = "<canvas id=\"bar_chart_canva\" width=\"400\" height=\"400\"></canvas>";
            let charts_div = document.getElementById("mapcharts");
            charts_div.removeChild(document.getElementById("additional_chart"));

        })
    }
}


//Import data
let dataP_mapAppCSP = d3.csv("http://localhost:8000/small_data.csv"); // dataP pour data Promise

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
        function listenerFunction () {

            let charts_div = document.getElementById("mapcharts");
            if(insight_etudie != 2){
                return;
            }

            let map_chart_div = document.createElement("div");
            let sdiv = document.createElement("div");
            map_chart_div.class = "map_chart";
            map_chart_div.id = "additional_chart";
            sdiv.id = "chart_div";

            map_chart_div.style.width="0px";
            map_chart_div.style.height="100%";
            map_chart_div.style.opacity="0%";
            map_chart_div.style.transition = "all .3s";
            map_chart_div.appendChild(sdiv);
            charts_div.appendChild(map_chart_div);
            setTimeout(function(){map_chart_div.style.opacity="100%";
            map_chart_div.style.width="500px"}, 1);

            
            let id = this.id;
            d3.select(this).raise();
            document.querySelectorAll(".is-clicked").forEach(function (path) {
                path.classList.remove("is-clicked");
            })
            console.log(genre);
            this.classList.add('is-clicked');

            let region = getRegionName(id);
            let map_inf = document.querySelector('#chart_div');
            map_inf.innerHTML = "<canvas id=\"bar_chart_canvas\" width=\"400\" height=\"400\"></canvas>";
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

            let ctx = document.getElementById("bar_chart_canvas").getContext("2d");
            setTimeout(function(){let chartLine = new Chart(ctx, config)},200);
        }

        // Remove former eventListener
        let region = getRegionName(path.id)
        if (currentListners_mapAppCSP.hasOwnProperty(region)){
            path.removeEventListener('mousedown', currentListners_mapAppCSP[region])
        }
        currentListners_mapAppCSP[region] = listenerFunction;

        // Add new event listener
        path.addEventListener('mousedown', listenerFunction);

    })
}


displayGenreByRegion_mapAppCSP(document.getElementById("select_genre").value);

document.getElementById("select_genre").addEventListener('change', (event) => {
    displayGenreByRegion_mapAppCSP(document.getElementById("select_genre").value);
});


//TODO: add map_info element to give info on age and CSP by region (une fois interactiveMap avec map_info sur AGE, puis
// genreByAge, puis re intercativeMap avec map_info sur CSP , puis genreByCSP.
