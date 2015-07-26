
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
	"id": "bi"
	},
	{
	"title": "Mechanical Engineering",
	"projects": meProjects,
	"id": "me"
	},
	{
	"title": "Web Development",
	"projects": weProjects,
	"id": "we"
	},
	{
	"title": "Graphic Design",
	"projects": grProjects,
	"id": "gr"
	},
	{
	"title": "Music",
	"projects": muProjects,
	"id": "mu"
	}
];


//-----VIEWMODEL-----//

var viewModel = function() {
	var self = this;

	var imgX = 1920;
	var imgY = 1080;
	var winX = $(window).width();
	var winY = $(window).height();
	var newX, newY;
	if (winX / winY < imgX / imgY) {
		newY = winY;
		newX = imgX * (winY / imgY);
	} else {
		newX = winX;
		newY = imgY * (winX / imgX);
	}
	var newXY = newX + "px " + newY + "px";
	console.log(newXY);

	$("html").css("background-image", "url('img/beach_2.jpg')");
	$("html").css("background-color", "black");
	$("html").css("background-repeat", "no-repeat");
	$("html").css("background-position", "center");
	$("html").css("background-size", newXY);


	


	// initialize some observables
	this.catList = ko.observableArray();
	for (var k = 0; k < categories.length; k++) {
		self.catList.push(categories[k]);
	}
	this.currentCat = ko.observable(0);
	this.projects = ko.computed(function() {

		var catIndex = self.currentCat();
		var projArray = self.catList()[catIndex].projects;
		var projElem = "";

		for (var m = 0; m < projArray.length; m++) {

			var projImgSrc = projArray[m].imgSrc;
			var projAltText = projArray[m].altText;
			var projName = projArray[m].name;
			var projDescription = projArray[m].description;

			projElem +=
			"<div class='row'>" +
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
		}


        return projElem;
    }, this);


	// define change current category function
	this.changeCurrentCat = function(catIndex) {
		self.currentCat(catIndex);
	};



	this.initCats = function(data) {

		// add category elements to DOM
		for (var i = 0; i < self.catList().length; i++) {

				var catId = self.catList()[i].id;
				var catName = self.catList()[i].title;
				var catElem = "<div class='row' "
					+ "id='" + catId + "'>"
					+ "<h2 data-bind='css: { selected: currentCat() === " + i + "}'>"
					+ catName + "</h2></div>";

				$("#categories").append(catElem);

		}

		// add click listeners to category elements
		for (var j = 0; j < self.catList().length; j++) {

			var catObj = self.catList()[j];
			var catIndex = j;
			
			(function(_data, _index) {
				var catElem = "#" + _data.id;
				$(catElem).click(function() {
					self.changeCurrentCat(_index);
				});
			})(catObj, catIndex);
		}
	};

	this.initCats(self.catList());

};

ko.applyBindings(new viewModel());