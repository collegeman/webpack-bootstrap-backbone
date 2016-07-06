'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var Navstack = require('navstack');
var DepartmentPaneView = require('views/panes/department');
var DepartmentsPaneView = require('views/panes/departments');
var SearchPaneView = require('views/panes/search');

module.exports = Backbone.Router.extend({

	routes: {
		'': 'departments',

		'departments/:id': 'departments',

		'people/:id': 'person',

		'search': 'search'
	},

	initialize: function(options) {
		var options = $.extend({
			// setup the navstack
			stage: new Navstack({
				el: $('<div></div>')
			})
		}, options);

		this.stage = options.stage;
	},

	departments: function(id) {
		if (id) {
			this.stage.push('departments:' + id, function() {
				var department = app.people.departments.get({ 'cid': id });
				return new DepartmentPaneView({ model: department });
			});
		} else {
			this.stage.push('departments', function() {
				return new DepartmentsPaneView();
			});
		}
	},

	person: function(id) {
		this.stage.push('people:' + id, function() {
			var person = app.epople.get(id);
			return new PersonPaneView({ model: person });
		});
	},

	search: function() {
		this.stage.push('search!search', function() {
			return new SearchPaneView();
		});
	}

});