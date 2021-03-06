var insight_etudie = 0;
var x;
var parcourir = 0;
var insights = ["Carte (Age + CSP)", "Genres selon la classe d'age", "Multiples cartes", "Modes d'écoute", "Découverte de la musique"];

var id_regions = ['cvdl','hdf','bfc','cvdl']
var index_reg_genres = [4,0,2,5];
var id_genres = [["check_genresage_PopRock"],["check_genresage_Rap"],["check_genresage_Musique du monde","check_genresage_Reggae","check_genresage_Soul"]];
var id_multicartes = [[1,5,9,13],[7,11,0,0],[4,11,1,13]]
var id_modes = [["check_ecoute_CD","check_ecoute_Vinyle"],["check_ecoute_CD","check_ecoute_Vinyle","check_ecoute_Radio","check_ecoute_Site internet","check_ecoute_Concert"],["check_ecoute_CD","check_ecoute_Vinyle","check_ecoute_Radio","check_ecoute_Site internet","check_ecoute_Concert","check_ecoute_Chaine TV","check_ecoute_Application"]];
var id_decouverte = [["check_decouverte_15-24"],["check_decouverte_15-24","check_decouverte_25-34","check_decouverte_35-49","check_decouverte_50-64","check_decouverte_65+"],["check_decouverte_15-24","check_decouverte_25-34","check_decouverte_35-49"]];

const texts = [
["<p>Le fameux axe Paris-Marseille du Rap reste assez vérifié pour les artistes. Quid des auditeurs ?</p><p>Cette carte représente le pourcentage d’écoute du genre sélectionné pour chaque région.</p><p>Cliquez sur la carte pour avoir des informations supplémentaires sur les régions !</p><p>Parcourez les différents genres grâce au menu à gauche de la carte.</p>","<p>Centre Val de Loire, terre de rave party ? En tout cas, c’est une des régions où l’électro est la plus écoutée, et cela grâce à une percée exceptionnelle du genre chez les 15-24 ans : 40% de cette classe d’âge écoute de l’électro sur le territoire!</p><p>N’hésitez pas à cliquer sur différentes régions !</p>","<p>Rap, musique du Nord ? <br><br> Certains clament que le rap, “c’est pas la capitale, c’est Marseille bébé”. Pourtant, malgré la percée de célèbres rappeurs méditerranéens, le rap connaît ses meilleurs taux de pénétration relatifs dans les territoires au dessus de la Loire et de la Seine. <br><br>Le rap va-t-il de pair avec le froid ?</p>","<p>Les célèbres bals de Bourgogne ? <br> <br> Comme cela ressort assez clairement, la Bourgogne Franche Comté est le leader de la “dance” en France. Et quand on s’y intéresse de plus près, c’est majoritairement grâce aux 25-34 et 34-49 ans. Etonnant n’est-ce pas ? Après tout, on peut penser que la dance est une musique de “jeunes”. Et bien pas en Bourgogne Franche Comté. <br> <br>Peut-être que ce territoire à sa propre définition de la jeunesse ?</p>","<p>Centre Val de Loire, anomalie Sociologique ? Le Jazz est connoté dans l’inconscient collectif aux classes sociales supérieures. Ce constat se partage à l’échelle de presque toutes les régions de France…. sauf le Centre Val de Loire. Vraiment une région étrange</p>","<p>La géographie, c’est pas trop votre truc ? Cliquez ici pour voir le graph de répartitions des genres par âge sur toute la France : vous allez voir c’est surprenant!</p>"],

["<p>Les ados écoutent du rap, les quadras écoutent du Rock et ma grand-mère écoute du Jazz. Vraiment ?</p><p>Intéressons nous maintenant au pourcentage d’écoute des différents genres, selon la classe d’âge mais à l’échelle nationale cette fois-ci !</p><p>Comparez les différents genres en cochant/décochant les cases !</p>","<p>PopRock : bosse générationnelle ? Le genre s’est démocratisé auprès de ceux qui ont entre 50 et 64 ans aujourd’hui : leurs aïeux n’en écoutaient pas. Et ceux qui les suivent non plus</p><p> Explorez le graphe pour le découvrir</p>","<p>Rap : un véritable phénomène augmentant de génération en génération. La pente parle d’elle-même, chaque tranche d’âge en écoute plus que ses aïeux. Jusqu’à quand sa croissance va-t-elle continuer ?</p>","<p>Word Music, Reggae et Soul : musiques aux mêmes motifs ? <br><br> Ces trois genres peuvent paraître parmis les plus proches musicalement de tout ce comparatif. Ce constat est confirmé par l’étude des tranches d’âges qui écoute : leurs résultats sont presques similaires. Deux bosses, chez les 25-34 et 50-64. Des chameaux de la musique ?</p>","<p>Les cartes vous manquent déjà ? Cliquez sur \"Prochain graphe\" pour résoudre cela</p>"],

["<p>“Petite aide pour mieux comprendre cette représentation originale :</p><p>Tout à l’heure nous vous avions montré la présence relative d’un seul genre entre tous les départements français. Maintenant, nous reprenons ce principe, mais en visualisant plusieurs genres, comparés entre eux.</p><p>Autrement dit, c’est comme si vous aviez plusieurs fois en même temps la carte précédente, afin de voir plusieurs genres en même temps. La touche secrète, c’est que le nuancier de couleurs s’adapte en se relativisant sur les chiffres des quatres genres représentés.</p>","<p>Tout est relatif.</p><p>On dit que la musique, c’était mieux avant. Que maintenant, ce n’est que du rap, de l’autotune, des clips. Pourtant, à l’échelle de la France, c’est en réalité encore la pop/rock et la variété qui dominent. Ils sont en rouge, l’électro et le rap en bleu. Alors qu’est ce qui est “hot” maintenant?</p>","<p>Comme d’habitude, la Bretagne ne fait comme les autres.</p><p>Regardez cette couleur dépareillée, toujours au même endroit, celui de la pointe Ouest du territoire. Quand toute la partie Nord de la France écoute du RnB fortement, il y est totalement absent. A l’inverse, ils sont beaucoup plus friand de musique du monde que leurs voisins proches et éloignés.</p>","<p>Les puristes sont à Paris ?</p><p>L'Ile de France est la région où l'on écoute le plus de Musique Classique mais aussi de RnB. Elle est aussi la 2e région la plus consomatrice de Rap. En revanche, les franciliens aiment moins la variété que tous les autres français d'après ces cartes</p><p>La variété serait-elle une musique de provincial ? Voilà une phrase que pourrait dire un parisien un peu snob </p><p> Pas de conclusion hâtive, ce n'est pas qu'une question de goût : il s'agit aussi de la région la plus peuplée de France ! </p>","<p>En continuant sur les pratiques sociales de la musique, on vous invite à découvrir les supports préférés d’écoute pour chaque classe d’âge : cliquez ici pour voir si les stéréotypes sont justifiés… ou non!</p>"],

["<p>Mais qui écoute encore des CD en 2021 ? Le vinyle, un truc de trentenaire hipster ?</p><p>Bousculez vos préjugés avec ce graphe qui compare l’utilisation des différents modes d’écoutes de la musique selon les âges.</p>","<p>CD et Vinyles, des valeurs sûres. Ce sont visiblement des supports intemporels : ce sont les seuls qui minimisent les variations d’utilisation entre les différentes tranches d’âge</p>","<p>Nouveau monde contre ancien monde, <br> <br> Ce graphe nous montre une chose claire : il y a des supports historiques, stables, et des nouveaux qui pavent la voie. Les applications et les sites internet sont utilisés par 90% des 15-24 ans! Ces nouveaux modes, numériques, représentent sûrement l’avenir des modes d’écoute, cependant la pente est vertigineuse sur les générations plus âgées. De l’autre côté, Radio, CD, Concerts sont plus constants chez toutes les tranches d’âge, avec quand même un constat général : quand on vieillit, on écoute moins</p>","<p>Les vieux ont-ils des problèmes d’audition ?</p><p>L’autre chose que veut dire ce graph, c’est que plus les personnes vieillissent, moins leurs sources d’écoute de musique sont diverses. On peut même aller jusqu’à dire qu’ils écoutent moins de musique, puisque chacune des catégorie est en baisse chez les 65+! (sauf nos amis les vinyles, mais est-ce vraiment nouveau?)</p>","<p>Maintenant que nous avons vu les sources d’écoute, regardons celles des découvertes de musique. Vous nous suivez toujours ? Cliquez ici !</p>"],

["<p>Je ne me fie plus qu’aux playlist Spotify pour découvrir de nouveaux artistes, suis-je le seul ?</p><p>Découvrez comment les français font leurs découvertes musicales grâce à ce graphe en toile d’araignée.</p><p> Vous pouvez sélectionner différentes classes d’âge en les cochant</p>","<p>La musique, c’était mieux avant… ou c’était juste écouté par une base d’auditeurs plus réduite ? Ce que semble montrer ce graphe, c’est que les jeunes utilisent plus de supports, et plus de supports différents. Et qu’ils se distinguent surtout sur les plateformes nouvelles et numériques comme le streaming ou les sites vidéos. Cela veut-il dire que ces plateformes ont élargi l’accès à une base plus large d’auditeurs ? Cela peut-il expliquer l’émergence de nouveaux artistes basés sur ces nouveaux canaux, bouleversant les standards culturels ? Il n’y a qu’un pas…</p>","<p>Cette représentation a l’avantage de mettre en exergue la chute de diversité des canaux de découverte de musique avec l’âge, mais aussi de la chute de la diversité de découverte de la musique tout court, car tous les canaux (à l’exception de la presse) baissent avec l’âge. Cela peut-il corroborer la conclusion de la déperdition de l’écoute chez nos seniors ?</p>","<p>Peu de modes de découverte bousculent l'odre établi. Une exception : les concerts</p><p>Les 25-34 ans arrivent en tête sur cette catégorie</p><p> Ce sont peut-être les âges où on a à la fois le budget, l'énergie et le temps d'aller voir des artistes en live</p>","<p>Vous avez maintenant tout vu ou presque, n'hésitez pas à explorer les différents graphes plus en détail ! </p>"]
]

var corresponding_ids = ["mapcharts", "genresage", "several_map_container","modes_ecoute","decouverte"];
var paused = true;

function scrollstart(){
	scroll(0,100000);
	update();
}

function commencer(){
	var div = document.getElementById("disclaimer_div");
	var text = document.getElementById("preztext");
	for (var i=0; i<text.children.length; i++){
		text.children[i].style.color = "#FDFDFD";
	};
	div.style.opacity = 0;
	setTimeout(function(){div.remove()}, 1500);
	update();
}

function update(){
	
	for (var i=0; i<5 ; i++){
		if(!(document.getElementById(corresponding_ids[i]).classList.contains("hidden"))){
			document.getElementById(corresponding_ids[i]).classList.add("hidden");
		}	
	}
	document.getElementById("insight").innerHTML = insights[insight_etudie];
	document.getElementById(corresponding_ids[insight_etudie]).classList.remove("hidden");
	

	for (var id in Chart.instances) {
        Chart.instances[id].resize();
    };
	
};

function previous(){
	if(insight_etudie == 0){
	}
	else{
		insight_etudie = insight_etudie-1;
	}
	if(!paused){
		parcourir = 0;
		more();
	};
	update();
}

function next(){
	if(insight_etudie == 4){
		insight_etudie = 0;
	}
	else{
		insight_etudie = insight_etudie+1;
	}
	if(!paused){
		parcourir = 0;
		more();
	};
	update();
}


function menu(){
	const genresmenu = document.getElementById("menu");
	genresmenu.classList.add("open");
}

function option(){
	const genresmenu = document.getElementById("menu");
	insight_etudie = insights.indexOf(event.target.innerHTML);
	update();
	genresmenu.classList.remove("open");
}

document.addEventListener('click', hideMenu);

function hideMenu(event){
	if (!event.target.closest('#menubutton')) {
		document.getElementById("menu").classList.remove("open");
	}
} 

function more(){

	if (paused) {

		addtext();
		var playpause = document.getElementById("playpause");
		var img = document.createElement("img");
		img.src = "icons/pause.svg"
		playpause.innerHTML = "";
		img.classList.add("playimg");
		playpause.appendChild(img);
		lc = document.querySelectorAll('.line_chart_age_genre');
		lc.forEach(function (chart){
			chart.classList.add("line_chart_age_genre_played")
			chart.classList.remove("line_chart_age_genre")
		})
		for (var i=0; i<30; i++){
			setTimeout(function (){
				for (var id in Chart.instances) {
					Chart.instances[id].resize();
				}
			}, i*5)
		};
	}
	else{

		removetext();
		var playpause = document.getElementById("playpause");
		var img = document.createElement("img");
		img.src = "icons/play.svg"
		playpause.innerHTML = "";
		img.classList.add("playimg");
		playpause.appendChild(img);
		lc = document.querySelectorAll('.line_chart_age_genre_played');
		lc.forEach(function (chart){
			chart.classList.add("line_chart_age_genre")
			chart.classList.remove("line_chart_age_genre_played")
		})
		for (var i=0; i<100; i++){
			setTimeout(function (){
				for (var id in Chart.instances) {
					Chart.instances[id].resize();
				}
			}, i*20)
		};
	}
	
};



function addtext(){
	var div = document.getElementById("chartscontainer");
	var newdiv = document.createElement("div");
	var buttondiv = document.createElement("div");
	var divtext = document.createElement("div");
	newdiv.id = "infos";
	newdiv.classList.add("newdiv");
	buttondiv.classList.add("divbuttons");


	
	var button_next = document.createElement("button");
	

	button_next.id="nextbutton";
	button_next.classList.add("commencer");
	button_next.classList.add("commencer_next");
	button_next.innerHTML="<span> Anecdote Suivante </span>";

	var button_prec = document.createElement("button");
	button_prec.id="precbutton";
	button_prec.classList.add("commencer");
	button_prec.classList.add("commencer_prec");
	button_prec.innerHTML="<span> Anecdote précédente </span>";

	var button_change = document.createElement("button");
	button_change.id="changegraph_button";
	button_change.classList.add("commencer");
	button_next.classList.add("commencer_next");
	button_change.innerHTML="<span> Prochain graphe </span>";


	/*
	if (insight_etudie==0){
		button_next.dataset.ready = '0';
		button_next.addEventListener('genre_has_changed', function (){
			console.log("genre_has_changed received")
			if (button_next.dataset.ready === '1'){
				console.log("cas 1")
				document.getElementById(id_regions[parcourir]).dispatchEvent(new Event('mousedown'));
			}else{
				console.log("cas 2")
				button_next.dataset.ready = '1';
			}
		})
	}*/

	if(insight_etudie === 4){
		button_change.innerHTML="<span> Revenir au premier graphe </span>";
	};

	/*if(insight_etudie === 0){
		document.getElementById(id_regions[0]).dispatchEvent(new Event('mousedown'));
	};
	if(insight_etudie === 1){
			GENRES_genreByAgeApp.forEach(function(id){
				document.getElementById("check_genresage_"+id).checked = false;
				document.getElementById("check_genresage_"+id).dispatchEvent(new Event('change'));
			});

			id_genres[parcourir].forEach(function(id){
				document.getElementById(id).checked = true;
				document.getElementById(id).dispatchEvent(new Event('change'));
			});
	};

	

	if(insight_etudie === 3){
			MODES_modeEcouteByAgeApp.forEach(function(id){
				document.getElementById("check_ecoute_"+id).checked = false;
				document.getElementById("check_ecoute_"+id).dispatchEvent(new Event('change'));
			});

			id_modes[parcourir].forEach(function(id){
				document.getElementById(id).checked = true;
				document.getElementById(id).dispatchEvent(new Event('change'));
			});
	};*/



	var n_max = texts[insight_etudie].length;



	button_next.addEventListener('click', function(){
		if(insight_etudie === 0 && parcourir < n_max-2){
			document.getElementById("select_genre").selectedIndex = index_reg_genres[parcourir];
			document.getElementById("select_genre").dispatchEvent(new Event('change'));
			setTimeout(function (){
				document.getElementById(id_regions[parcourir-1]).dispatchEvent(new Event('mousedown'));
			}, 10);
		};

		if(insight_etudie === 1 && parcourir < n_max-2){

			GENRES_genreByAgeApp.forEach(function(id){
				document.getElementById("check_genresage_"+id).checked = false;
				document.getElementById("check_genresage_"+id).dispatchEvent(new Event('change'));
			});

			id_genres[parcourir].forEach(function(id){
				document.getElementById(id).checked = true;
				document.getElementById(id).dispatchEvent(new Event('change'));
			});
		};

		if(insight_etudie === 2 && parcourir < n_max-2){
			for(var l=0; l<4 ; l++){
				document.getElementById("select_genre_"+(parseInt(l+1))).selectedIndex = id_multicartes[parcourir][l];
			};
			document.getElementById("select_genre_1").dispatchEvent(new Event('change'));
		};




		if(insight_etudie === 3 && parcourir < n_max-2){

			MODES_modeEcouteByAgeApp.forEach(function(id){
				document.getElementById("check_ecoute_"+id).checked = false;
				document.getElementById("check_ecoute_"+id).dispatchEvent(new Event('change'));
			});

			id_modes[parcourir].forEach(function(id){
				document.getElementById(id).checked = true;
				document.getElementById(id).dispatchEvent(new Event('change'));
			});
		};

		if(insight_etudie === 4 && parcourir < n_max-2){

			AGE_decouverteByAgeApp.forEach(function(id){
				document.getElementById("check_decouverte_"+id).checked = false;
				document.getElementById("check_decouverte_"+id).dispatchEvent(new Event('change'));
			});

			id_decouverte[parcourir].forEach(function(id){
				document.getElementById(id).checked = true;
				document.getElementById(id).dispatchEvent(new Event('change'));
			});
		};



		if(parcourir === 0){
			buttondiv.prepend(button_prec);
			
		};
		if(parcourir === n_max-2){
			buttondiv.removeChild(button_next);
			buttondiv.appendChild(button_change);

		};

		parcourir	++;
		divtext.innerHTML = "<h3>Le saviez vous ?</h3>"+texts[insight_etudie][parcourir];
	});


	button_prec.addEventListener('click', function(){
		if(insight_etudie === 0 && parcourir > 1){
			document.getElementById("select_genre").selectedIndex = index_reg_genres[parcourir-2];
			document.getElementById("select_genre").dispatchEvent(new Event('change'));
			setTimeout(function (){
				document.getElementById(id_regions[parcourir-1]).dispatchEvent(new Event('mousedown'));
			}, 10);
		};

		if(insight_etudie === 1 && parcourir > 1){

			GENRES_genreByAgeApp.forEach(function(id){
				document.getElementById("check_genresage_"+id).checked = false;
				document.getElementById("check_genresage_"+id).dispatchEvent(new Event('change'));
			});

			id_genres[parcourir-2].forEach(function(id){
				document.getElementById(id).checked = true;
				document.getElementById(id).dispatchEvent(new Event('change'));
			});
		};

		if(insight_etudie === 2 && parcourir >1){
			for(var l=0; l<4 ; l++){
				document.getElementById("select_genre_"+(parseInt(l+1))).selectedIndex = id_multicartes[parcourir-2][l];
			};
			document.getElementById("select_genre_1").dispatchEvent(new Event('change'));
		};

		if(insight_etudie === 3 && parcourir >1){
			MODES_modeEcouteByAgeApp.forEach(function(id){
				document.getElementById("check_ecoute_"+id).checked = false;
				document.getElementById("check_ecoute_"+id).dispatchEvent(new Event('change'));
			});

			id_modes[parcourir-2].forEach(function(id){
				document.getElementById(id).checked = true;
				document.getElementById(id).dispatchEvent(new Event('change'));
			});
		};


		if(insight_etudie === 4 && parcourir > 1){

			AGE_decouverteByAgeApp.forEach(function(id){
				document.getElementById("check_decouverte_"+id).checked = false;
				document.getElementById("check_decouverte_"+id).dispatchEvent(new Event('change'));
			});

			id_decouverte[parcourir-2].forEach(function(id){
				document.getElementById(id).checked = true;
				document.getElementById(id).dispatchEvent(new Event('change'));
			});
		};



		if(parcourir === 1){
			buttondiv.removeChild(button_prec);
			
		};
		if(parcourir === n_max-1){
			buttondiv.removeChild(button_change);
			buttondiv.appendChild(button_next);
		};

		parcourir --;
		divtext.innerHTML = "<h3>Le saviez vous ?</h3>"+texts[insight_etudie][parcourir];

	});

	button_change.addEventListener('click', next);
	

	

	divtext.innerHTML = "<h3>Le saviez vous ?</h3>"+texts[insight_etudie][0];

	
	newdiv.classList.add("moreinfos");


	
	buttondiv.appendChild(button_next);
	
	
	div.appendChild(newdiv);
	
	setTimeout(function(){
		if(insight_etudie == 0 ){
			newdiv.style.width = "50%";
			newdiv.style.paddingRight = "3vw";
		}
		else{
			newdiv.style.width = "65%";
		};
		newdiv.appendChild(divtext); 
		newdiv.appendChild(buttondiv);
    },100);





	paused = !paused;
	for (var id in Chart.instances) {
        Chart.instances[id].resize();
    };
};

function removetext(){
	parcourir = 0;
	infosdiv = document.getElementById("infos");
	infosdiv.style.width = "0%";
	
	infosdiv.addEventListener('transitionend', () => {
        document.getElementById("chartscontainer").removeChild(document.getElementById("infos"));
		for (var id in Chart.instances) {
			Chart.instances[id].resize();
		}
        
    });

	
	paused = !paused;
}

document.addEventListener('transitionend', () => {
    for (var id in Chart.instances) {
        Chart.instances[id].resize();
    }

	setTimeout(function (){
		for (var id in Chart.instances) {
			Chart.instances[id].resize();
		}
	}, 1)
	setTimeout(function (){
		for (var id in Chart.instances) {
			Chart.instances[id].resize();
		}
	}, 10)
	setTimeout(function (){
		for (var id in Chart.instances) {
			Chart.instances[id].resize();
		}
	}, 100)
	setTimeout(function (){
		for (var id in Chart.instances) {
			Chart.instances[id].resize();
		}
	}, 300)

});


