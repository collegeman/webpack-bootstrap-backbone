var BasePaneView = require('views/panes/base');
var BootstrapNavBar = require('views/bootstrap/navbar');
var Departments = require('collections/departments');

var DepartmentsPaneView = BasePaneView.extend({

	template: require('text!templates/panes/departments.html'),

	navbarClass: BootstrapNavBar,

	data: function() {
		return {
			'departments': app.people.departments
		}
	}

});

module.exports = DepartmentsPaneView;