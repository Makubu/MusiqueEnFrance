//Exemple
hommesP = dataP.then(function(csv){
    return csv
        .filter(function(element){
            return element.SEXE === "Homme"
        })
        .map(function(element){
            return element //return the element, en soit ce map ne sert donc à rien, {age:element.AGE, sexe:element.SEXE}
            //  retournerait que les ages et sexes
        })
})


rapP = dataP.then(getGenreRap);
A=rapP.then(function(data) {
    return data.length;
    })
