// TODO
// change currentCat to int index instead of object



//-----MODEL-----//

var categories =
[
	{
	"name": "Mechanical Engineering",
	"content": meProjects,
	"id": "me"
	},
	{
	"name": "Web Development",
	"content": weProjects,
	"id": "we"
	},
	{
	"name": "Graphic Design",
	"content": grProjects,
	"id": "gr"
	},
	{
	"name": "Music",
	"content": muProjects,
	"id": "mu"
	}
];

var meProjects = [
	{
	"name": "ROVA Pedestrian Assistive Technology",
	"imgSrc": "some path",
	"description": "bad-ass walker"
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


//-----VIEWMODEL-----//

var viewModel = function() {
	var self = this;

	// initialize some observables
	this.catList = ko.observableArray();
	this.currentCat = ko.observable();

	//populate catList
	for (var k = 0; k < categories.length; k++) {
		self.catList.push(categories[k]);
	}

	// define change current category function
	this.changeCurrentCat = function(catIndex) {
		self.currentCat(catIndex);
	};



	this.initCats = function(data) {

		// add category elements to DOM
		for (var i = 0; i < self.catList().length; i++) {

				var catId = self.catList()[i].id;
				var catName = self.catList()[i].name;
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