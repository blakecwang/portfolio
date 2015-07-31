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
	console.log(projClass);

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



// layout
var windowWidth = $(window).width();
var showHideProjects;

// for desktop
if (windowWidth > 800) {

	// append separate columns for categories and projects
	var desktopElem = 
	"<div class='row'>" +
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
else {

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
		$("#content").append(contentElem);

	}
}


// show or hide projects depending on whether their cat is active
showHideProjects = function() {

	for (var a = 0; a < categories.length; a++) {

		var cl = "." + categories[a].pClass;
		if (categories[a].active === true) {
			$(cl).show();
		} else {
			$(cl).hide();
		}
	}
};


// add click listeners to category elements
for (var k = 0; k < categories.length; k++) {

	var catObj = categories[k];
	var catIndex = k;
	
	(function(_data, _index) {
		var catElem = "#" + _data.id;
		$(catElem).click(function() {
			console.log(catElem);
		});
	})(catObj, catIndex);
}

showHideProjects();



// //-----VIEWMODEL-----//

// var viewModel = function() {
// 	var self = this;

// 	// initialize some observables
// 	this.catList = ko.observableArray();
// 	for (var k = 0; k < categories.length; k++) {
// 		self.catList.push(categories[k]);
// 	}
// 	this.currentCat = ko.observable(0);

// 	// init projects
// 	this.projects = ko.computed(function() {

// 		var catIndex = self.currentCat();
// 		var projArray = self.catList()[catIndex].projects;
// 		var projElem = "";

// 		for (var m = 0; m < projArray.length; m++) {

// 			var projImgSrc = projArray[m].imgSrc;
// 			var projAltText = projArray[m].altText;
// 			var projName = projArray[m].name;
// 			var projDescription = projArray[m].description;

// 			projElem +=
// 			"<div class='row'>" +
// 				"<div class='col-md-4'>" +
// 					"<img src='" + projImgSrc + "' alt='" + projAltText + "'>" +
// 				"</div>" +
// 				"<div class='col-md-8'>" +
// 					"<div class='row'>" +
// 						"<h2>" + projName + "</h2>" +
// 					"</div>" +
// 					"<div class='row'>" +
// 						"<p>" + projDescription + "</p>" +
// 					"</div>" +
// 				"</div>" +
// 			"</div>";
// 		}

//         return projElem;
//     }, this);


// 	this.initCats = function(data) {

// 		// add category elements to DOM
// 		for (var i = 0; i < self.catList().length; i++) {

// 				var catId = self.catList()[i].id;
// 				var catName = self.catList()[i].title;
// 				var catElem = "<div class='row' data-bind='css: { selectedDiv: currentCat() === " + i + "}' "
// 					+ "id='" + catId + "'>"
// 					+ "<h2 data-bind='css: { selectedText: currentCat() === " + i + "}'>"
// 					+ catName + "</h2></div>";

// 				$("#categories").append(catElem);

// 		}

// 		// add click listeners to category elements
// 		for (var j = 0; j < self.catList().length; j++) {

// 			var catObj = self.catList()[j];
// 			var catIndex = j;
			
// 			(function(_data, _index) {
// 				var catElem = "#" + _data.id;
// 				$(catElem).click(function() {
// 					self.changeCurrentCat(_index);
// 				});
// 			})(catObj, catIndex);
// 		}
// 	};
// 	this.initCats(self.catList());


// 	// init project area
// 	this.setProjectArea = function() {

// 		var winX = $(window).width();
// 		console.log(winX);

// 		// remove projects
// 		$("#content").remove();

// 		// add projects
// 		if (winX > 700) {
// 			$("#main").append("<div class='col-md-8' id='content' data-bind='html: projects'></div>");
// 		} else {
// 			var index = self.currentCat();
// 			var selector = "#" + self.catList()[index].id;
// 			$(selector).after("<div class='row' id='content' data-bind='html: projects'></div>");
// 		}
//     };
// 	$(window).resize(self.setProjectArea());

// 	// define change current category function
// 	this.changeCurrentCat = function(catIndex) {
// 		self.currentCat(catIndex);
// 		self.setProjectArea();
// 	};

// };

// ko.applyBindings(new viewModel());