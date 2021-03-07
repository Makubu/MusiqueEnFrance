var insight_etudie = 0;
var x;
var parcourir;
var insights = ["Carte des genres (Age)", "Genres selon la classe d'age", "Multiples cartes", "Modes d'écoute", "Découverte de la musique"];

const texts = [
["<p>Centre Val de Loire, terre de rave party ? En tout cas, c’est une des régions où l’électro est la plus écoutée, et cela grâce à une percée exceptionnelle du genre chez les 15-24 ans : 40% de cette classe d’âge écoute de l’électro sur le territoire!</p><p>N’hésitez pas à cliquer sur différentes régions !</p>","<p>Info2</p>","<p>Info3</p>","<p>Info4</p>","<p>La géographie, c’est pas trop votre truc ? Cliquez ici pour voir le graph de répartitions des genres par âge sur toute la France : vous allez voir c’est surprenant!</p>"],

["<p>PopRock : bosse générationnelle ? Le genre s’est démocratisé auprès de ceux qui ont entre 50 et 64 ans aujourd’hui : leurs aïeux n’en écoutaient pas. Et ceux qui les suivent non plus</p><p> Explorez le graphe pour le découvrir</p>","<p>Info2</p>","<p>Info3</p>","<p>Vous êtes plutôt sociologue que scientifique ? Vous avez toujours voulu savoir si Bourdieu avait raison ? Cliquez ici pour voir quelles CSP écoutent quel genre de musique, le tout pour chaque région de France</p>"],

["<p>Centre Val de Loire, anomalie Sociologique ? Le Jazz est connoté dans l’inconscient collectif aux classes sociales supérieures. Ce constat se partage à l’échelle de presque toutes les régions de France…. sauf le Centre Val de Loire. Vraiment une région étrange</p><p>N’hésitez pas à cliquer sur différentes régions !</p>","<p>Info2</p>","<p>Info3</p>","<p>En continuant sur les pratiques sociales de la musique, on vous invite à découvrir les supports préférés d’écoute pour chaque classe d’âge : cliquez ici pour voir si les stéréotypes sont justifiés… ou non!</p>"],

["<p>CD et Vinyles, des valeurs sûres. Ce sont visiblement des supports intemporels : ce sont les seuls qui minimisent les variations d’utilisation entre les différentes tranches d’âge</p>","<p>Info2</p>","<p>Info3</p>","<p>Maintenant que nous avons vu les sources d’écoute, regardons celles des découvertes de musique. Vous nous suivez toujours ? Cliquez ici !</p>"],

["<p>La musique, c’était mieux avant… ou c’était juste écouté par une base d’auditeurs plus réduite ? Ce que semble montrer ce graph, c’est que les jeunes utilisent plus de supports, et plus de supports différents. Et qu’ils se distinguent surtout sur les plateformes nouvelles et numériques comme le streaming ou les sites vidéos. Cela veut-il dire que ces plateformes ont élargi l’accès à une base plus large d’auditeurs ? Cela peut-il expliquer l’émergence de nouveaux artistes basés sur ces nouveaux canaux, bouleversant les standards culturels ? Il n’y a qu’un pas…</p>","<p>Info2</p>","<p>Info3</p>"]
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
	if(!paused){
		removetext();
		clearInterval(x);
		setTimeout(addtext(),1000);
	}
}

function previous(){
	if(insight_etudie == 0){
	}
	else{
		insight_etudie = insight_etudie-1;
	}
	update();
}

function next(){
	if(insight_etudie == 4){
		insight_etudie = 0;
	}
	else{
		insight_etudie = insight_etudie+1;
	}
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
		setTimeout(addtext, 0);
		var playpause = document.getElementById("playpause");
		var img = document.createElement("img");
		img.src = "icons/pause.svg"
		playpause.innerHTML = "";
		img.classList.add("playimg");
		playpause.appendChild(img);
	}
	else{
		clearInterval(x);
		setTimeout(removetext,0);
		var playpause = document.getElementById("playpause");
		var img = document.createElement("img");
		img.src = "icons/play.svg"
		playpause.innerHTML = "";
		img.classList.add("playimg");
		playpause.appendChild(img);

	}
}


function defile(){
	var parent = document.getElementById("infos");
	var tabtexts = texts[insight_etudie];
	var n = parent.children[0].children.length;
	if (parcourir<tabtexts.length-2){
		var newtext = tabtexts[parcourir+1];
		parcourir+=1;
	}
	else{
		var newtext = tabtexts[0];
		parcourir = 0;
	}
	for (var l=1; l<n; l++){
		parent.children[0].children[l].style.transition = "all 1s";
	};
	for (var l=1; l<n; l++){
		parent.children[0].children[l].style.color = "#FDFDFD";
	};


	setTimeout(function(){
		
		parent.removeChild(parent.children[0]);
		var div_newtext = document.createElement("div");
		div_newtext.innerHTML="<h3>Le saviez vous ?</h3>"+newtext;
		parent.prepend(div_newtext);
	},1000);

};


function addtext(){
	var div = document.getElementById("chartscontainer");
	var newdiv = document.createElement("div");
	var buttondiv = document.createElement("div");
	var divtext = document.createElement("div");
	newdiv.id = "infos";
	newdiv.classList.add("newdiv");

	
	var button = document.createElement("button");
	button.style.height = "20%";
	button.id="changebutton";
	button.classList.add("commencer");
	button.innerHTML="<span> En savoir plus </span>";

	function firstclick(){
		clearInterval(x);
		newdiv.innerHTML="";
		var button_2 = document.createElement("button");
		var buttondiv_2 = document.createElement("div");
		button_2.style.height = "20%";
		button_2.id="nextbutton";
		button_2.classList.add("commencer");
		button_2.innerHTML="J'y vais !";
		newdiv.innerHTML = texts[insight_etudie][texts[insight_etudie].length-1];
		button_2.addEventListener("click", function(){next()});
		buttondiv_2.appendChild(button_2);
		newdiv.appendChild(buttondiv_2);
	};
	

	

	divtext.innerHTML = "<h3>Le saviez vous ?</h3>"+texts[insight_etudie][0];
	
	
	newdiv.classList.add("moreinfos");
	buttondiv.appendChild(button);
	
	div.appendChild(newdiv);
	
	setTimeout(function(){newdiv.style.width = "100%"; newdiv.appendChild(divtext); newdiv.appendChild(buttondiv); },100);
	parcourir = 0;
	x = setInterval(function(){defile();},4000);
	button.addEventListener("click", function(){firstclick()});
	paused = !paused;
}

function removetext(){
	infosdiv = document.getElementById("infos");
	infosdiv.style.width = "0%";
	
	setTimeout(function(){infosdiv.innerHTML="";
		document.getElementById("chartscontainer").removeChild(document.getElementById("infos"));},300);
	
	paused = !paused;
}


