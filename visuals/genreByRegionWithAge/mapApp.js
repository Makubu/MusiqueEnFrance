const map = document.querySelector('#map');
const paths = map.querySelectorAll('.map_image path');

const color1 = "rgb(244, 220, 213)"; //color for map: interpolation between color1 and color2
const color2 = "rgb(244, 56, 56)";

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

document.addEventListener('mousedown', hideMapInfo);
function hideMapInfo(event) {
    if (!event.target.classList.contains('is-clicked')) {
        
        document.querySelectorAll(".is-clicked").forEach(function (path) {
            path.classList.remove("is-clicked");

        let map_inf = document.querySelector('#chart_div');
        map_inf.innerHTML = "<canvas id=\"bar_chart_canvas\" width=\"400\" height=\"400\"></canvas>";
        let charts_div = document.getElementById("mapcharts");
        charts_div.removeChild(document.getElementById("additional_chart"));

        })
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


        function listenerFunction () {

            let charts_div = document.getElementById("mapcharts");
            if(insight_etudie != 0){
                return;
            }
            let map_chart_div = document.createElement("div");
            let sdiv = document.createElement("div");
            map_chart_div.class = "map_chart";
            map_chart_div.id = "additional_chart";
            sdiv.id = "chart_div";
            map_chart_div.appendChild(sdiv);
            charts_div.appendChild(map_chart_div);
            let id = this.id;
            d3.select(this).raise();
            document.querySelectorAll(".is-clicked").forEach(function (path) {
                path.classList.remove("is-clicked");
            })
            this.classList.add('is-clicked');

            let region = getRegionName(id);
            let map_inf = document.querySelector('#chart_div');
            map_inf.innerHTML = "<canvas id=\"bar_chart_canvas\" width=\"400\" height=\"400\"></canvas>";
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

            let ctx = document.getElementById("bar_chart_canvas").getContext("2d");
            let chartLine = new Chart(ctx, config);
        }

        // Remove former eventListener
        let region = getRegionName(path.id)
        if (currentListners.hasOwnProperty(region)){
            path.removeEventListener('mousedown', currentListners[region])
        }
        currentListners[region] = listenerFunction;

        // Add new event listener
        path.addEventListener('mousedown', listenerFunction);

    })
}


displayGenreByRegion(document.getElementById("select_genre").value);

document.getElementById("select_genre").addEventListener('change', (event) => {
    displayGenreByRegion(document.getElementById("select_genre").value);
});


//TODO: add map_info element to give info on age and CSP by region (une fois interactiveMap avec map_info sur AGE, puis
// genreByAge, puis re intercativeMap avec map_info sur CSP , puis genreByCSP.
