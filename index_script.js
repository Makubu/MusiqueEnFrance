var insight_etudie = 0;
var insights = ["Carte des genres (Age)", "Genres selon la classe d'age", "Carte des genres (CSP)", "Modes d'écoute", "Découverte de la musique"];
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque placerat porttitor urna, a ullamcorper arcu faucibus in. Vestibulum vel pellentesque libero. Aliquam erat volutpat. Duis aliquet et ligula nec mattis. Donec vehicula maximus mi, et consectetur odio ultricies in. Maecenas et mi lorem. Nullam laoreet sodales consectetur. Maecenas fringilla iaculis felis sed facilisis. Nunc vehicula massa tellus, vitae faucibus lectus gravida et. Nullam quis neque euismod, sodales mauris in, efficitur est." 
var corresponding_ids = ["mapcharts", "genresage", "mapcharts","modes_ecoute","decouverte"];
var paused = true;


function scrollstart(){
	scroll(0,100000);
	update();
}

function update(){
	document.getElementById("insight").innerHTML = insights[insight_etudie];
	for (var i=0; i<5 ; i++){
		if(!(document.getElementById(corresponding_ids[i]).classList.contains("hidden"))){
			document.getElementById(corresponding_ids[i]).classList.add("hidden");
		}	
	}
	document.getElementById(corresponding_ids[insight_etudie]).classList.remove("hidden");
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
		document.getElementById("chartscontainer").classList.add("infomap");
		setTimeout(addtext, 0);
		var playpause = document.getElementById("playpause");
		var img = document.createElement("img");
		img.src = "icons/pause.svg"
		playpause.innerHTML = "";
		img.classList.add("playimg");
		playpause.appendChild(img);
	}
	else{
		console.log("dd");
		document.getElementById("chartscontainer").classList.remove("infomap");
		setTimeout(removetext,0);
		var playpause = document.getElementById("playpause");
		var img = document.createElement("img");
		img.src = "icons/play.svg"
		playpause.innerHTML = "";
		img.classList.add("playimg");
		playpause.appendChild(img);

	}
}
function addtext(){
	var div = document.getElementById("chartscontainer");
	var newdiv = document.createElement("div");
	newdiv.id = "infos";
	var p = document.createElement("p");
	p.innerHTML = lorem;
	newdiv.appendChild(p);
	newdiv.classList.add("moreinfos");
	div.appendChild(newdiv);
	document.getElementById("chartscontainer").classList.remove("infomap");
	paused = !paused;
}

function removetext(){
	document.getElementById("chartscontainer").removeChild(document.getElementById("infos"));
	paused = !paused;
}


