
function makeArr(startValue, stopValue, cardinality, round) {
    var arr = [];
    var step = (stopValue - startValue) / (cardinality - 1);

    if (round) {
        for (var i = 0; i < cardinality; i++) {
            arr.push(Math.round(startValue + (step * i)));
        }
    } else {
        for (var i = 0; i < cardinality; i++) {
            arr.push(startValue + (step * i));
        }
    }
    return arr;
}

function RGBToHex(rgb) {
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);
    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);
    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;
    return "#" + r + g + b;
}



function getRegion(name){
    switch (name) {
        case 'occ':
            return getRegOcc;
        case 'auvrho':
            return getRegAuvrho;
        case 'idf':
            return getRegIdf;
        case 'pdll':
            return getRegPdll;
        case 'paca':
            return getRegPaca;
        case 'hdf':
            return getRegHdf;
        case 'nor':
            return getRegNor;
        case 'nouaqu':
            return getRegNouaqu;
        case 'cvdl':
            return getRegCvdl;
        case 'graest':
            return getRegGraest;
        case 'bfc':
            return getRegBfc;
        case 'bre':
            return getRegBre;
        default:
            console.log("CAN T FIND THE GENRE " + name);
    }
}

function getRegionName(id){
    switch (id) {
        case 'occ':
            return "Occitanie";
        case 'auvrho':
            return "Auvergne-Rhône-Alpes";
        case 'idf':
            return "IDF";
        case 'pdll':
            return "Pays de la Loire";
        case 'paca':
            return "PACA";
        case 'hdf':
            return "Haut de France";
        case 'nor':
            return "Normandie";
        case 'nouaqu':
            return "Nouvelle-Aquitaine";
        case 'cvdl':
            return "Centre-Val de Loire";
        case 'graest':
            return "Grand Est";
        case 'bfc':
            return "Bourgogne Franche-Comté";
        case 'bre':
            return "Bretagne";
        default:
            console.log("CAN T FIND THE REGION NAME " + id);
    }
}

function getGenre(name){
    switch (name) {
        case 'Rap'||'1':
            return getGenreRap;
        case 'Autre'||'2':
            return getGenreAutre;
        case 'Dance'||'3':
            return getGenreDance;
        case 'Classique'||'4':
            return getGenreClassique;
        case 'Electro'||'5':
            return getGenreElectro;
        case 'Jazz'||'6':
            return getGenreJazz;
        case 'Musique du monde'||'7':
            return getGenreMonde;
        case 'Métal'||'8':
            return getGenreMetal;
        case 'PopRock'||'9':
            return getGenrePopRock;
        case 'Reggae'||'10':
            return getGenreReggae;
        case 'RnB'||'11':
            return getGenreRnB;
        case 'Soul'||'12':
            return getGenreSoul;
        case 'Variété'||'13':
            return getGenreVariete;
        default:
            console.log("CAN T FIND THE GENRE " + name);
    }
}

function getAge(age){
    switch (age) {
        case '15-24':
            return getAge15_24;
        case '25-34':
            return getAge25_34;
        case '35-49':
            return getAge35_49;
        case '50-64':
            return getAge50_64;
        case '65+':
            return getAge65;
        default:
            console.log("CAN T FIND THE AGE " + age);
    }
}

function getCSP(csp){
    switch (csp) {
        case 'CSP Plus':
            return getCSPPlus;
        case 'CSP Moins':
            return getCSPMoins;
        case 'Inactif':
            return getCSPInactif;
        default:
            console.log("CAN T FIND THE CSP " + csp);
    }
}

function getCouple(couple){
    switch (couple) {
        case 'En_couple':
            return getCoupleEnCouple;
        case 'Enfant_vivant_chez_parents':
            return getCoupleEnfant;
        case 'Célibataire':
            return getCoupleCelibataire;
        default:
            console.log("CAN T FIND THE COUPLE " + couple);
    }
}

function getQ6(mode, often = false){
    switch (mode) {
        case 'Application':
            return (function (csv){return getQ6_Application(csv,often)})
        case 'Concert':
            return (function (csv){return getQ6_Concert(csv,often)})
        case 'Radio':
            return (function (csv){return getQ6_Radio(csv,often)})
        case 'Site internet':
            return (function (csv){return getQ6_SiteInternet(csv,often)})
        case 'Chaine TV':
            return (function (csv){return getQ6_TV(csv,often)})
        case 'CD':
            return (function (csv){return getQ6_CD(csv,often)})
        case 'Vinyle':
            return (function (csv){return getQ6_Vinyle(csv,often)})
        default:
            console.log("CAN T FIND THE MODE " + mode);
    }
}

function getQ24(mode){
    switch (mode) {
        case 'Streaming':
            return getQ24_Streaming;
        case 'Concerts':
            return getQ24_Concerts;
        case 'Radio':
            return getQ24_Radio;
        case 'Disquaires':
            return getQ24_Disquaire;
        case 'Amis/Proches':
            return getQ24_Amis_Proches;
        case 'Plateforme Video':
            return getQ24_PlateformeVideo;
        case 'Presse':
            return getQ24_Presse_SiteSpecialise;
        case 'Chaine TV':
            return getQ24_TV;
        case 'Reseaux Sociaux':
            return getQ24_ReseauxSociaux;
        case 'Autres':
            return getQ24_Autres;
        default:
            console.log("CAN T FIND THE MODE " + mode);
    }
}



/// horreur

function getQ24_Streaming(csvPromise){
    return csvPromise.filter(function(element){
        return element.Q24_1 !== "#NUL!";
    }).filter(function(element){
        return element.Q24_1 !== "0"
    })
}
function getQ24_PlateformeVideo(csvPromise){
    return csvPromise.filter(function(element){
        return element.Q24_2 !== "#NUL!";
    }).filter(function(element){
        return element.Q24_2 !== "0"
    })
}
function getQ24_ReseauxSociaux(csvPromise){
    return csvPromise.filter(function(element){
        return element.Q24_3 !== "#NUL!";
    }).filter(function(element){
        return element.Q24_3 !== "0"
    })
}
function getQ24_Radio(csvPromise){
    return csvPromise.filter(function(element){
        return element.Q24_4 !== "#NUL!";
    }).filter(function(element){
        return element.Q24_4 !== "0"
    })
}
function getQ24_Concerts(csvPromise){
    return csvPromise.filter(function(element){
        return element.Q24_5 !== "#NUL!";
    }).filter(function(element){
        return element.Q24_5 !== "0"
    })
}
function getQ24_TV(csvPromise){
    return csvPromise.filter(function(element){
        return element.Q24_6 !== "#NUL!";
    }).filter(function(element){
        return element.Q24_6 !== "0"
    })
}
function getQ24_Presse_SiteSpecialise(csvPromise){
    return csvPromise.filter(function(element){
        return element.Q24_7 !== "#NUL!";
    }).filter(function(element){
        return element.Q24_7 !== "0"
    })
}
function getQ24_Disquaire(csvPromise){
    return csvPromise.filter(function(element){
        return element.Q24_8 !== "#NUL!";
    }).filter(function(element){
        return element.Q24_8 !== "0"
    })
}
function getQ24_Amis_Proches(csvPromise){
    return csvPromise.filter(function(element){
        return element.Q24_9 !== "#NUL!";
    }).filter(function(element){
        return element.Q24_9 !== "0"
    })
}
function getQ24_Autres(csvPromise){
    return csvPromise.filter(function(element){
        return element.Q24_10 !== "#NUL!";
    }).filter(function(element){
        return element.Q24_10 !== "0"
    })
}

function getQ6_SiteInternet(csvPromise, often=false){
    return csvPromise.filter(function(element){
        return element.Q6_r1 !== "#NUL!";
    }).filter(function(element){
        return element.Q6_r1 !== "Jamais"
    }).filter(function(element){
        if (often){
            return element.Q6_r1 !== "Moins souvent";
        } else {
            return element;
        }
    })
}

function getQ6_Application(csvPromise, often=false){
    return csvPromise.filter(function(element){
        return element.Q6_r2 !== "#NUL!";
    }).filter(function(element){
        return element.Q6_r2 !== "Jamais"
    }).filter(function(element){
        if (often){
            return element.Q6_r2 !== "Moins souvent";
        } else {
            return element;
        }
    })
}

function getQ6_CD(csvPromise, often=false){
    return csvPromise.filter(function(element){
        return element.Q6_r3 !== "#NUL!";
    }).filter(function(element){
        return element.Q6_r3 !== "Jamais"
    }).filter(function(element){
        if (often){
            return element.Q6_r3 !== "Moins souvent";
        } else {
            return element;
        }
    })
}

function getQ6_Vinyle(csvPromise, often=false){
    return csvPromise.filter(function(element){
        return element.Q6_r4 !== "#NUL!";
    }).filter(function(element){
        return element.Q6_r4 !== "Jamais"
    }).filter(function(element){
        if (often){
            return element.Q6_r4 !== "Moins souvent";
        } else {
            return element;
        }
    })
}

function getQ6_Concert(csvPromise, often=false){
    return csvPromise.filter(function(element){
        return element.Q6_r5 !== "#NUL!";
    }).filter(function(element){
        return element.Q6_r5 !== "Jamais"
    }).filter(function(element){
        if (often){
            return element.Q6_r5 !== "Moins souvent";
        } else {
            return element;
        }
    })
}

function getQ6_TV(csvPromise, often=false){
    return csvPromise.filter(function(element){
        return element.Q6_r6 !== "#NUL!";
    }).filter(function(element){
        return element.Q6_r6 !== "Jamais"
    }).filter(function(element){
        if (often){
            return element.Q6_r6 !== "Moins souvent";
        } else {
            return element;
        }
    })
}

function getQ6_Radio(csvPromise, often=false){
    return csvPromise.filter(function(element){
        return element.Q6_r7 !== "#NUL!";
    }).filter(function(element){
        return element.Q6_r7 !== "Jamais"
    }).filter(function(element){
        if (often){
            return element.Q6_r7 !== "Moins souvent";
        } else {
            return element;
        }
    })
}

function getCoupleEnCouple(csvPromise){
    return csvPromise.filter(function(element){
        return element.SITUATION_FAMILIALE === "En_couple"
    })
}

function getCoupleCelibataire(csvPromise){
    return csvPromise.filter(function(element){
        return element.SITUATION_FAMILIALE === "Célibataire"
    })
}

function getCoupleEnfant(csvPromise){
    return csvPromise.filter(function(element){
        return element.SITUATION_FAMILIALE === "Enfant_vivant_chez_parents"
    })
}

function getCSPPlus(csvPromise){
    return csvPromise.filter(function(element){
        return element.CSP === "CSP_Plus"
    })
}

function getCSPMoins(csvPromise){
    return csvPromise.filter(function(element){
        return element.CSP === "CSP_Moins"
    })
}

function getCSPInactif(csvPromise){
    return csvPromise.filter(function(element){
        return element.CSP === "Inactif"
    })
}




function getAge15_24(csvPromise){
    return csvPromise.filter(function(element){
        return element.AGE === "15_24"
    })
}

function getAge25_34(csvPromise){
    return csvPromise.filter(function(element){
        return element.AGE === "25_34"
    })
}

function getAge35_49(csvPromise){
    return csvPromise.filter(function(element){
        return element.AGE === "35_49"
    })
}

function getAge50_64(csvPromise){
    return csvPromise.filter(function(element){
        return element.AGE === "50_64"
    })
}

function getAge65(csvPromise){
    return csvPromise.filter(function(element){
        return element.AGE === "65+"
    })
}


function getGenreRap(csvPromise){
    return csvPromise.filter(function(element){
        return element.Q5_3_val_RapHipHop === "Rap / Hip-Hop"
    })
}

function getGenreVariete(csvPromise){
    return csvPromise.filter(function(element){
        return element.Q5_1_val_VarFr === "Variété Française"
    })
}

function getGenrePopRock(csvPromise){
    return csvPromise.filter(function(element){
        return element.Q5_2_val_PopRock === "Pop / Rock"
    })
}

function getGenreClassique(csvPromise){
    return csvPromise.filter(function(element){
        return element.Q5_4_val_Classique === "Classique"
    })
}

function getGenreJazz(csvPromise){
    return csvPromise.filter(function(element){
        return element.Q5_5_val_Jazz === "Jazz"
    })
}

function getGenreDance(csvPromise){
    return csvPromise.filter(function(element){
        return element.Q5_6_val_Dance === "Dance"
    })
}

function getGenreElectro(csvPromise){
    return csvPromise.filter(function(element){
        return element.Q5_7_val_Electro === "Electronique"
    })
}

function getGenreMetal(csvPromise){
    return csvPromise.filter(function(element){
        return element.Q5_8_val_Metal === "Métal"
    })
}

function getGenreRnB(csvPromise){
    return csvPromise.filter(function(element){
        return element.Q5_9_val_RnB === "R&B"
    })
}

function getGenreSoul(csvPromise){
    return csvPromise.filter(function(element){
        return element.Q5_10_val_Soul === "Soul"
    })
}

function getGenreReggae(csvPromise){
    return csvPromise.filter(function(element){
        return element.Q5_11_val_Reggae === "Reggae"
    })
}

function getGenreMonde(csvPromise){
    return csvPromise.filter(function(element){
        return element.Q5_12_val_MusiqueDuMonde === "Musiques du monde"
    })
}

function getGenreAutre(csvPromise){
    return csvPromise.filter(function(element){
        return element.Q5_13_val_Autre === "Autres genres"
    })
}



function getRegAuvrho(csvPromise){
    return csvPromise.filter(function(element){
        return element.REGION === "Auvergne-Rhône-Alpes"
    })
}
function getRegPdll(csvPromise){
    return csvPromise.filter(function(element){
        return element.REGION === "Pays-de-la-Loire"
    })
}function getRegOcc(csvPromise){
    return csvPromise.filter(function(element){
        return element.REGION === "Occitanie"
    })
}function getRegGraest(csvPromise){
    return csvPromise.filter(function(element){
        return element.REGION === "Grand-Est"
    })
}function getRegPaca(csvPromise){
    return csvPromise.filter(function(element){
        return element.REGION === "Provence-Alpes-Côte-d'Azur"
    })
}function getRegIdf(csvPromise){
    return csvPromise.filter(function(element){
        return element.REGION === "Île-de-France"
    })
}function getRegHdf(csvPromise){
    return csvPromise.filter(function(element){
        return element.REGION === "Hauts-de-France"
    })
}function getRegBre(csvPromise){
    return csvPromise.filter(function(element){
        return element.REGION === "Bretagne"
    })
}function getRegNouaqu(csvPromise){
    return csvPromise.filter(function(element){
        return element.REGION === "Nouvelle-Aquitaine"
    })
}function getRegBfc(csvPromise){
    return csvPromise.filter(function(element){
        return element.REGION === "Bourgogne-Franche-Comté"
    })
}function getRegCvdl(csvPromise){
    return csvPromise.filter(function(element){
        return element.REGION === "Centre-Val de Loire"
    })
}function getRegNor(csvPromise){
    return csvPromise.filter(function(element){
        return element.REGION === "Normandie"
    })
}

