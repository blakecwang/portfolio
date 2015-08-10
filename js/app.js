

//-----MODEL-----//

var bio = [
	{
	"name": "Welcome to my Portfolio!",
	"imgSrc": "TBD",
	"altText": "TBD",
	"description": "TBD"
	}
];

var meProjects = [
	{
	"name": "ROVA Pedestrian Assistive Technology",
	"imgSrc": "TBD",
	"altText": "TBD",
	"description": "TBD"
	},
	{
	"name": "Accuvax",
	"imgSrc": "TBD",
	"altText": "TBD",
	"description": "TBD"
	}
];

var weProjects = [
	{
	"name": "Frogger game",
	"imgSrc": "TBD",
	"altText": "TBD",
	"description": "TBD"
	}
];

var muProjects = [
	{
	"name": "Got to Give",
	"imgSrc": "TBD",
	"altText": "TBD",
	"description": "TBD"
	}
];

var grProjects = [
	{
	"name": "String cheese people",
	"imgSrc": "TBD",
	"altText": "TBD",
	"description": "TBD"
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
	"title": "Music",
	"projects": muProjects,
	"id": "mu",
	"active": false
	},
	{
	"title": "Graphic Design",
	"projects": grProjects,
	"id": "gr",
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



//-----VIEWMODEL-----//

// declare some top level vars
var setActive, windowLayout;

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


// set up all the desktop elements
var initDesktop = function() {

	// set windowLayout to desktop
	windowLayout = "desktop";

	// show 'about me' element
	categories[0].active = true;

	// define setActive to only let one category be active
	setActive = function(_catIndex) {

		for (var h = 0; h < categories.length; h++) {
			categories[h].active = false;
		}
		categories[_catIndex].active = true;

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
};



// set up all the mobile elements
var initMobile = function() {

	// set windowLayout to mobile
	windowLayout = "mobile";

	// define setActive to let multiple categories be active
	setActive = function(_catIndex) {

		if (categories[_catIndex].active === true) {
			categories[_catIndex].active = false;
		} else {
			categories[_catIndex].active = true;
		}
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
};


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

	console.log("showHideProjects was run.");
};


// add click listeners to category elements
var initClickListeners = function() {

	for (var k = 0; k < categories.length; k++) {

		var catObj = categories[k];
		var catIndex = k;
		
		(function(_data, _index) {
			var catElem = "#" + _data.id;
			$(catElem).click(function() {
				setActive(_index);
				showHideProjects();
			});
		})(catObj, catIndex);
	}
};


// append elements to DOM differently for desktop and mobile
var initApp = function() {

	var self = this;

	// set breakpoint to switch between desktop and mobile versions
	this.breakPoint = 800;
	this.windowWidth = $(window).width();

	// init layout depending on screen width
	this.initLayout = function(b) {
	    if (self.windowWidth > b) {
			initDesktop();
		} else {
			initMobile();
		}
	};

	// grab the bio from bio.txt
	$.ajax({
        url: "bio.txt",
        dataType: "text",
        success: function(data) {

        	// set the bio project description to the text from bio.txt
            categories[0].projects[0].description = data;

            self.initLayout(self.breakPoint);

            showHideProjects();
			initClickListeners();
        }
    });

}

initApp();
