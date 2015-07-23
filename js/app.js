
//-----MODEL-----//

var categories =
[
	{
	"name": "Mechanical Engineering",
	"selected": false
	},
	{
	"name": "Web Development",
	"selected": false
	},
	{
	"name": "Graphic Design",
	"selected": false
	}
];

$( "#mech" ).click(function() {
  console.log( "Handler for .click() called." );
});


//-----VIEWMODEL-----//

var viewModel = function() {
	this.currentCategory = ko.observable(-1);
};

ko.applyBindings(new viewModel());