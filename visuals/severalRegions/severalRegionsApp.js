const map_1 = document.querySelector('#map_1');
const map_2 = document.querySelector('#map_2');
const map_3 = document.querySelector('#map_3');
const map_4 = document.querySelector('#map_4');
const paths_map_1 = map_1.querySelectorAll('#map_1 path');
const paths_map_2 = map_2.querySelectorAll('#map_2 path');
const paths_map_3 = map_3.querySelectorAll('#map_3 path');
const paths_map_4 = map_4.querySelectorAll('#map_4 path');
const paths_ = [paths_map_1, paths_map_2, paths_map_3, paths_map_4];

const colors={
    color_pal_7: "rgb(178,24,43)",
    color_pal_6: "rgb(239,138,98)",
    color_pal_5: "rgb(253,219,199)",
    color_pal_4: "rgb(247,247,247)",
    color_pal_3: "rgb(209,229,240)",
    color_pal_2: "rgb(103,169,207)",
    color_pal_1: "rgb(33,102,172)"
}

function getD3Color(ratio){
    let box = Math.trunc(ratio*6);
    let f;
    let box_ratio = ratio*6 - box;
    if (box==6){
        f = d3.interpolate(colors["color_pal_"+(box+1)], colors["color_pal_"+(box+1)]);
    } else {
        f = d3.interpolate(colors["color_pal_"+(box+1)], colors["color_pal_"+(box+2)]);
    }

    return f(box_ratio);
}
/*
paths.forEach(function (paths){
    paths.forEach(function (path) {
        path.addEventListener('mouseenter', function () {
            let id = this.id;
            //document.querySelector('#list-'+id).classList.add('is-active');
            this.classList.add('is-active');
            d3.select(this).raise()
            let clickedPath = document.querySelectorAll('.is-clicked');
            clickedPath.forEach(function (path_) {
                d3.select(path_).raise();
            })
        })

        path.addEventListener('mouseleave', function () {
            let id = this.id;
            //document.querySelector('#list-'+id).classList.remove('is-active');
            this.classList.remove('is-active');

        })
    });
});
*/

//Import data
let dataP_severalRegion = d3.csv("./small_data.csv"); // dataP pour data Promise

//Function principale
function displaySmallMaps(genres) {
    let maxRatio = 0;
    let minRatio = 1;
    paths_.forEach(function (paths, map_index) {
        if (document.getElementById("select_genre_" + (map_index+1)).value !== "Genre Musical") {
            paths.forEach(function (path) {
                const id = path.id;
                let region = id.substring(0, id.length - 2)
                let callback = getRegion(region);
                dataP_severalRegion.then(callback).then(function (csv) {
                    let totalPopReg = csv.length;
                    let genrePopulation = getGenre(genres[map_index])(csv).length;
                    let ratio = genrePopulation / totalPopReg;

                    if (ratio > maxRatio) {
                        maxRatio = ratio;
                    }
                    if (ratio < minRatio) {
                        minRatio = ratio;
                    }
                })

            })
        } else {
            paths.forEach(function (path){
                path.innerHTML="";
            })
        }
    })



    let max_ratio_reg = 0;
    paths_.forEach(function (paths, map_index){
        if (document.getElementById("select_genre_" + (map_index+1)).value !== "Genre Musical") {
            paths.forEach(function (path, index) {
                const id = path.id;
                let region = id.substring(0,id.length - 2);
                let callback = getRegion(region);
                dataP_severalRegion.then(callback).then(function (csv_reg) {
                    let totalPopReg = csv_reg.length;
                    let genrePopulation = getGenre(genres[map_index])(csv_reg).length;
                    let ratio = genrePopulation / totalPopReg;


                    document.getElementById(id).innerHTML='<title>' + (Math.round(ratio*1000))/10 + '%</title>';

                    ratio = ratio - minRatio;
                    ratio = ratio / (maxRatio - minRatio);

                    document.getElementById(id).style.fill = getD3Color(ratio);

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

                        var svg = d3.select("#map_legend_sev_svg");

                        svg.append("g")
                            .attr("class", "legendLinear")
                            .attr("transform", "translate(20,20)");

                        var legendLinear = d3.legendColor()
                            .scale(ordinal)
                            .title("Pourcentage d'écoute");

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
        } else{
            paths.forEach(function (path, index) {
                const id = path.id;
                document.getElementById(id).style.fill = '#cbcbcb';
            });
        }
    })

}

function check_inactive(){
    paths_.forEach(function (paths, map_index) {
        if (document.getElementById("select_genre_" + (map_index + 1)).value === "Genre Musical") {
            paths.forEach(function (path){
                document.getElementById(path.id).style.fill = '#cbcbcb';
            })
        }
    })
}

function getGenres(){
    let genres = [document.getElementById("select_genre_1").value,
        document.getElementById("select_genre_2").value,
        document.getElementById("select_genre_3").value,
        document.getElementById("select_genre_4").value
    ];

    return genres;
}

document.getElementById("select_genre_1").addEventListener('change', (event) => {
    displaySmallMaps(getGenres())
    check_inactive();
});
document.getElementById("select_genre_2").addEventListener('change', (event) => {
    displaySmallMaps(getGenres());
    check_inactive();
});
document.getElementById("select_genre_3").addEventListener('change', (event) => {
    displaySmallMaps(getGenres());
    check_inactive();
});
document.getElementById("select_genre_4").addEventListener('change', (event) => {
    displaySmallMaps(getGenres());
    check_inactive();
});


//TODO: add map_info element to give info on age and CSP by region (une fois interactiveMap avec map_info sur AGE, puis
// genreByAge, puis re intercativeMap avec map_info sur CSP , puis genreByCSP.
