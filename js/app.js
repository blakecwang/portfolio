
//-----MODEL-----//

var categories =
[
	{
	"name": "Mechanical Engineering",
	"content": meProjects,
	// "id": "me"
	},
	{
	"name": "Web Development",
	"content": weProjects,
	// "id": "we"
	},
	{
	"name": "Graphic Design",
	"content": grProjects,
	// "id": "gr"
	},
	{
	"name": "Music",
	"content": muProjects,
	// "id": "mu"
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

	// define change category function
	this.changeCurrentCategory = function(category) {
		self.currentCategory(category);
	};

	this.init = function() {
		// init category elements
		for (var i = 0; i < self.categoryList().length; i++) {

			var elem = "<div class='col-md-3'><h2>"
				+ self.categoryList()[i].name + "</h2></div>";

			$("#categories").append(elem);
		}


		// add click listeners to categories
		// var c = $("#categories").find("h2");
		// for (var j = 0; j < categories.length; j++) {
		// 	(function(_data) {
	            
		// 		c[j].click(function() {
		// 			// self.changeCurrentCategory(_data);
		// 			console.log("click");
		// 		});

	 //        })(categories[j]);
		// }
	};
	this.init();

	// $( "#mech" ).click(function() {
	// 	self.currentCategory(0);
	// });
	// $( "#web" ).click(function() {
	// 	self.currentCategory(1);
	// });
	// $( "#graphic" ).click(function() {
	// 	self.currentCategory(2);
	// });
};

ko.applyBindings(new viewModel());