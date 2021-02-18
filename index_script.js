var insight_etudie = 0;
var insights = ["Genre 1", "Genre 2", "Genre 3", "Genre 4", "Genre 5", "Genre 6"];
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque placerat porttitor urna, a ullamcorper arcu faucibus in. Vestibulum vel pellentesque libero. Aliquam erat volutpat. Duis aliquet et ligula nec mattis. Donec vehicula maximus mi, et consectetur odio ultricies in. Maecenas et mi lorem. Nullam laoreet sodales consectetur. Maecenas fringilla iaculis felis sed facilisis. Nunc vehicula massa tellus, vitae faucibus lectus gravida et. Nullam quis neque euismod, sodales mauris in, efficitur est." 
var paused = true;


function scrollstart(){
	scroll(0,100000);
}

function update(){
	document.getElementById("insight").innerHTML = insights[insight_etudie];

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
	if(insight_etudie == 5){
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
		document.getElementById("mapcontainer").classList.add("infomap");
		setTimeout(addtext, 0);
	}
	else{
		document.getElementById("mapcontainer").classList.remove("infomap");
		setTimeout(removetext,0);
	}
}
function addtext(){
	var div = document.getElementById("spacediv");
	var newdiv = document.createElement("div");
	newdiv.id = "infos";
	var p = document.createElement("p");
	p.innerHTML = lorem;
	newdiv.appendChild(p);
	newdiv.classList.add("moreinfos");
	div.appendChild(newdiv);
	document.getElementById("mapcontainer").classList.remove("infomap");
	paused = !paused;
}

function removetext(){
	document.getElementById("spacediv").removeChild(document.getElementById("infos"));
	paused = !paused;
}


