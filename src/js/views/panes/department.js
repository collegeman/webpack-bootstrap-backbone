var BasePaneView = require('views/panes/base');
var BackNavbarView = require('views/navbars/back');

/**
 * Displays a grid of faces based on the contents of app.people
 */
var DepartmentPaneView = BasePaneView.extend({

	template: require('text!templates/panes/department.html'),

	navbarClass: BackNavbarView,

	data: function() {
		this.title = 'People';
		return {
			'department': this.model
		}
	}

});

module.exports = DepartmentPaneView;