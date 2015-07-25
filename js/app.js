// TODO
// change currentCat to int index instead of object



//-----MODEL-----//

var bio = [
	{
	"name": "Welcome to my Portfolio!",
	"imgSrc": "some path",
	"description": "Welcome to my portfolio!"
	}
];

var meProjects = [
	{
	"name": "ROVA Pedestrian Assistive Technology",
	"imgSrc": "some path",
	"description": "bad-ass walker"
	},
	{
	"name": "Accuvax",
	"imgSrc": "some path",
	"description": "bad-ass vaccine refrigerator"
	}
];

var weProjects = [
	{
	"name": "Frogger game",
	"imgSrc": "some path",
	"description": "bad-ass game"
	}
];

var grProjects = [
	{
	"name": "String cheese people",
	"imgSrc": "some path",
	"description": "bad-ass drawing"
	}
];

var muProjects = [
	{
	"name": "Got to Give",
	"imgSrc": "some path",
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

	// initialize some observables
	this.catList = ko.observableArray();
	for (var k = 0; k < categories.length; k++) {
		self.catList.push(categories[k]);
	}
	this.currentCat = ko.observable(0);
	this.projName = ko.computed(function() {
		var index = self.currentCat();
		var name = self.catList()[index].projects[0].name;
        return name;
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