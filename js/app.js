// TODO
// change currentCategory to int index instead of object



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
	this.categoryList = ko.observableArray();
	this.currentCategory = ko.observable();

	//populate categoryList
	for (var k = 0; k < categories.length; k++) {
		self.categoryList.push(categories[k]);
	}

	// define change current category function
	this.changeCurrentCategory = function(category) {
		self.currentCategory(category);
	};



	this.initCategories = function(data) {

		// add category elements to DOM
		for (var i = 0; i < self.categoryList().length; i++) {

				var catId = self.categoryList()[i].id;
				var catName = self.categoryList()[i].name;
				var elem = "<div class='row' "
					+ "id='" + catId + "'>"
					+ "<h2 data-bind='css: { selected: currentCategory() === " + i + "}'>"
					+ catName + "</h2></div>";

				$("#categories").append(elem);

		}

		// add click listeners to category elements
		for (var j = 0; j < self.categoryList().length; j++) {

			var catObj = self.categoryList()[j];
			var catIndex = j;
			
			(function(_data, _index) {
				var catElem = "#" + _data.id;
				$(catElem).click(function() {
					self.changeCurrentCategory(_index);
				});
			})(catObj, catIndex);
		}
	};

	this.initCategories(self.categoryList());

	this.changeCurrentCategory(self.categoryList()[1]);


};

ko.applyBindings(new viewModel());