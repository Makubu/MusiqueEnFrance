
var tooltip = document.getElementById('tooltip');

var triggers = document.querySelectorAll('rect');


function showTooltip(evt) {
    console.log('in')
    tooltip.setAttributeNS(null, "visibility", "visible");
}



function hideTooltip() {
    console.log('out')
    tooltip.setAttributeNS(null, "visibility", "hidden");
}


console.log(triggers)
document.getElementById('c').addEventListener('mouseenter', showTooltip);
document.getElementById('d').addEventListener('mouseout', hideTooltip);
var svg = document.getElementById('tooltip-svg');
function showTooltip(evt) {
    var CTM = svg.getScreenCTM();
    var mouseX = (evt.clientX - CTM.e) / CTM.a;
    var mouseY = (evt.clientY - CTM.f) / CTM.d;
    tooltip.setAttributeNS(null, "x", mouseX + 6 / CTM.a);
    tooltip.setAttributeNS(null, "y", mouseY + 20 / CTM.d);
    tooltip.setAttributeNS(null, "visibility", "visible");
}
