var _ = require('underscore');
var Backbone = require('backbone');

var Departments = Backbone.Collection.extend({

	model: Backbone.Model.extend({

		defaults: {
			'parent': undefined,
		},

		people: function() {
			if (this.get('parent')) {
				return app.people.where({ 'dep': this.cid });
			} else {
				return app.people.where({ 'tldep': this.cid });
			}
		}

	}),

	comparator: 'name'

});

module.exports = Departments;