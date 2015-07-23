
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