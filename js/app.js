
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



                // <div class="col-md-4">
                //     <h2 data-bind="css: { selected: currentCategory() === 0 }" id="mech">
                //         Mechanical Engineering
                //     </h2>
                // </div>
                // <div class="col-md-4">
                //     <h2 data-bind="css: { selected: currentCategory() === 1 }" id="web">
                //         Web Development
                //     </h2>
                // </div>
                // <div class="col-md-4">
                //     <h2 data-bind="css: { selected: currentCategory() === 2 }" id="graphic">
                //         Graphic Design
                //     </h2>
                // </div>



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

			var elem = "<div class='col-md-3'><h2 id='"
				+ self.categoryList()[i].id + "'>"
				+ self.categoryList()[i].name + "</h2></div>";

			$("#categories").append(elem);
		}


		// add click listeners to category elements
		// var catElems = $("#categories").children()[1];
		// console.log(catElems);
		// var c;
		// for (var j = 0; j < self.categoryList().length; j++) {

		// 	c = catElems[j];

		// 	(function(_data) {
		// 		c.click(function() {
		// 			// self.changeCurrentCategory(_data);
		// 			console.log("click");
		// 		});
	 //        })(self.categoryList()[j]);
		// }

		for (var j = 0; j < self.categoryList().length; j++) {

			var jId = "#" + self.categoryList()[j].id;

			(function(_data) {
				$(jId).click(function() {
					console.log(_data);
				});
			})(jId);
			
		}
	};
	this.initCategories(self.categoryList());


	// $( "#web" ).click(function() {
	// 	self.currentCategory(1);
	// });
	// $( "#graphic" ).click(function() {
	// 	self.currentCategory(2);
	// });
};

ko.applyBindings(new viewModel());