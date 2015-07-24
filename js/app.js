
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

var init = function() {
	for (i = 0; i < categories.length; i++) {
		var name = categories[i].name;
		var id = categories[i].id;
		var before = "<div class='col-md-3'><h2 id='"
		var after = "</h2></div>"
		var elem = before + id + "'>" + name + after;

		$("#categories").append(elem);
	}
};
init();

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

	this.currentCategory = ko.observable();

	$( "#mech" ).click(function() {
		self.currentCategory(0);
	});
	$( "#web" ).click(function() {
		self.currentCategory(1);
	});
	$( "#graphic" ).click(function() {
		self.currentCategory(2);
	});
};

ko.applyBindings(new viewModel());