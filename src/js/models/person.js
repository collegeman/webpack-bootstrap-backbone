var _ = require('underscore');
var Backbone = require('backbone');
var Departments = require('collections/departments');

var Person = Backbone.Model.extend({

	initialize: function() {
		this.departments = new Departments();
		if (this.has('departments')) {
			_.each(this.get('departments'), _.bind(function(children, name) {
				this.departments.add({ 'name': name, 'children': children });
			}, this));
		}
	}

});

module.exports = Person;