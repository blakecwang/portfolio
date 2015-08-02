// TODO
// if on mobile:
//	- render list of cats with "about me" projects shown
//	- not a "current cat" model - each cat is active or inactive
// 	- all projects are added to DOM but all except current cat(s) are hidden
//	- tapping cat shows/hides its projects directly under respective cat
//	- cats have dropdown icon
// if on desktop:
//	- cats render on the left
//	- only one current cat (there can only be one!)
//	- projects are shown in main area

// strategy:
//	- only thing hardcoded into index.html is the header (everything else changes)
//	- use giant if statement to control how page gets rendered
//	- knockout monitors active status of projects
//	- all cat objects must be observables with data binds to their "active" property which shows/hides them
//	- on mobile, multiple cats can be active while on desktop, there can only be one



//-----MODEL-----//

var bio = [
	{
	"name": "Welcome to my Portfolio!",
	"imgSrc": "img/penguin.jpeg",
	"altText": "adorable penguin with giant glasses",
	"description": "Welcome to my portfolio!"
	}
];

var meProjects = [
	{
	"name": "ROVA Pedestrian Assistive Technology",
	"imgSrc": "some path",
	"altText": "adorable penguin with giant glasses",
	"description": "bad-ass walker"
	},
	{
	"name": "Accuvax",
	"imgSrc": "some path",
	"altText": "adorable penguin with giant glasses",
	"description": "bad-ass vaccine refrigerator"
	}
];

var weProjects = [
	{
	"name": "Frogger game",
	"imgSrc": "some path",
	"altText": "adorable penguin with giant glasses",
	"description": "bad-ass game"
	}
];

var grProjects = [
	{
	"name": "String cheese people",
	"imgSrc": "some path",
	"altText": "adorable penguin with giant glasses",
	"description": "bad-ass drawing"
	}
];

var muProjects = [
	{
	"name": "Got to Give",
	"imgSrc": "some path",
	"altText": "adorable penguin with giant glasses",
	"description": "bad-ass song"
	}
];


var categories =
[
	{
	"title": "About Me",
	"projects": bio,
	"id": "bi",
	"active": false
	},
	{
	"title": "Mechanical Engineering",
	"projects": meProjects,
	"id": "me",
	"active": false
	},
	{
	"title": "Web Development",
	"projects": weProjects,
	"id": "we",
	"active": false
	},
	{
	"title": "Graphic Design",
	"projects": grProjects,
	"id": "gr",
	"active": false
	},
	{
	"title": "Music",
	"projects": muProjects,
	"id": "mu",
	"active": false
	}
];

// assign classes to projects
for (var b = 0; b < categories.length; b++) {

	var pc = categories[b].id + "Proj";

	for (var c = 0; c < categories[b].projects.length; c++) {
		categories[b].projects[c].pClass = pc;
	}
	
}



//-----LAYOUT-----//

// build a category DOM element
var buildCatElem = function(catObj) {

	var catTitle = catObj.title;
	var catId = catObj.id;

	var catElem =
	"<div class='row' id='" + catId + "'>" +
		"<h2>" + catTitle + "</h2>" +
	"</div>";

	return catElem;
};

// build a project DOM elemnt
var buildProjElem = function(projObj) {

	var projImgSrc = projObj.imgSrc;
	var projAltText = projObj.altText;
	var projName = projObj.name;
	var projDescription = projObj.description;
	var projClass = projObj.pClass;

	var projElem =
	"<div class='row " + projClass + "'>" +
		"<div class='col-md-4'>" +
			"<img src='" + projImgSrc + "' alt='" + projAltText + "'>" +
		"</div>" +
		"<div class='col-md-8'>" +
			"<div class='row'>" +
				"<h2>" + projName + "</h2>" +
			"</div>" +
			"<div class='row'>" +
				"<p>" + projDescription + "</p>" +
			"</div>" +
		"</div>" +
	"</div>";

	return projElem;
};



// append elements to DOM differently for desktop and mobile

var breakPoint = 800;
var windowWidth = $(window).width();
var windowLayout;
if (windowWidth > breakPoint) {
	windowLayout = "desktop";
} else {
	windowLayout = "mobile";
}

var setActive;

// for desktop
if (windowLayout === "desktop") {

	// show about me element
	categories[0].active = true;

	// define setActive to only let one category be active
	setActive = function(_cat) {
		console.log("there can only be one!");
	};

	// append separate columns for categories and projects
	var desktopElem = 
	"<div class='row' id='content'>" +
        "<div class='col-md-4' id='categories'></div>" +
        "<div class='col-md-8' id='projects'></div>" +
    "</div>";
    $(".container").append(desktopElem);

	for (var i = 0; i < categories.length; i++) {

		// append category elements to categories column
		var catElem = buildCatElem(categories[i]);
		$("#categories").append(catElem);

		// append project elements to projects column
		for (var j = 0; j < categories[i].projects.length; j++) {

			var projElem = buildProjElem(categories[i].projects[j]);
			$("#projects").append(projElem);

		}
	}
}



// for mobile
if (windowLayout === "mobile") {

	// define setActive to let multiple categories be active
	setActive = function(_cat) {
		console.log("there can be many!");
	};

	// append one column for categories and projects
	var mobileElem = "<div class='col-md-12' id='content'>";
	$(".container").append(mobileElem);

	// append categories immediately followed by their respective projects
	for (var m = 0; m < categories.length; m++) {

		var contentElem = "";

		// add category element
		contentElem += buildCatElem(categories[m]);

		// add projects
		for (var n = 0; n < categories[m].projects.length; n++) {
			contentElem += buildProjElem(categories[m].projects[n]);
		}

		contentElem += "<br>";

		$("#content").append(contentElem);

	}

	// add selectedDiv class to all categories
	for (var g = 0; g < categories.length; g++) {
		var selDiv = "#" + categories[g].id;
		$(selDiv).addClass("selectedDiv");
	}
}


// loop through categores and show if active === true
// and hide if active === false
var showHideProjects = function() {
	for (var f = 0; f < categories.length; f++) {

		var catDiv = "#" + categories[f].id;
		var cl = "." + categories[f].id + "Proj";

		if (categories[f].active === true) {
			
			$(cl).show();
			if (windowLayout === "desktop") {$(catDiv).addClass("selectedDiv");}
			
		}
		else {
			
			$(cl).hide();
			if (windowLayout === "desktop") {$(catDiv).removeClass("selectedDiv");}

		}
	}
};
showHideProjects();


// add click listeners to category elements
// for (var k = 0; k < categories.length; k++) {

// 	var catObj = categories[k];
// 	var catIndex = k;
	
// 	(function(_data, _index) {
// 		var catElem = "#" + _data.id;
// 		$(catElem).click(function() {
// 			console.log(catElem);
// 		});
// 	})(catObj, catIndex);
// }




//-----VIEWMODEL-----//

// var viewModel = function() {
// 	var self = this;

// 	var da = [];
// 	for (var d = 0; d < categories.length; d++) {
// 		da.push(categories[d].active);
// 	}

// 	this.displayArr = ko.observable(da);


// 	// initialize some observables
// 	this.catList = ko.observableArray();
// 	for (var k = 0; k < categories.length; k++) {
// 		self.catList.push(categories[k]);
// 	}
// 	this.currentCat = ko.observable(0);

// 	// init projects
// 	this.projects = ko.computed(function() {


//         return projElem;
//     }, this);

// };

// ko.applyBindings(new viewModel());