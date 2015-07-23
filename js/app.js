
//-----MODEL-----//

var categories =
[
	{
	"name": "Mechanical Engineering",
	"bold": false
	},
	{
	"name": "Web Development",
	"bold": false
	},
	{
	"name": "Graphic Design",
	"bold": false
	}
];


//-----VIEWMODEL-----//

var viewModel = function() {
	this.currentCategory = ko.observable(-1);
};

ko.applyBindings(new viewModel());