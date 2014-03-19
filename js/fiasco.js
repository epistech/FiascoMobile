function loadHomeScreen() {
	$('#IOSContainer').load('tmpl/_homescreen.tmpl.html');
	setTimeout(function(){scrollTo(0,0)},1);
}

function loadAboutApp() {
	$('#IOSContainer').load('tmpl/_aboutapp.tmpl.html');
	setTimeout(function(){scrollTo(0,0)},1);
}

function subSwap(folioID) {
	folio = document.getElementById(folioID);
	if (folio.style.display == "none") { 
		$(folio).slideDown("fast","swing");
		} else {
		$(folio).slideUp("fast","swing");
	}
}

function loadJSONPlayset(title) {
	$.getJSON("playsets/" + title,function(data) {$("#playsetProper").tmpl(data).replaceAll("#IOSContainer");});
}

function getPlayset(playset) {
	// console.log(playset);
	title = {"filename": playset};
	$.getJSON("playsets/" + playset,function(data) {data = title.merge(data); $("#playsetTitleScreen").tmpl(data).replaceAll("#IOSContainer");});
	setTimeout(function(){scrollTo(0,0)},1);
}

function onPhoneReady(){ 
  document.addEventListener("backbutton", function(){ //hardware backbutton
  	alert("listening to back button");
    loadHomeScreen();
    return false; //prevents default behaviour 
  }, false); 
} 

Object.prototype.merge = (function (ob) {var o = this;var i = 0;for (var z in ob) {if (ob.hasOwnProperty(z)) {o[z] = ob[z];}}return o;});

$.get('tmpl/_playsetTitleScreen.tmpl.html', function(templates) {$('body').append(templates);});
$.get('tmpl/_playsetProper.tmpl.html', function(templates) {$('body').append(templates);});

$(document).ready(function(){
	var x=location.search.split("?")[1];
	if(x) {
		getPlayset(x+".json");
	} else {
		$('#IOSContainer').load('tmpl/_homescreen.tmpl.html');
	}
	// $(document).bind("deviceready", onPhoneReady); //when phone is ready 
	document.addEventListener("deviceready", onPhoneReady, false);
});