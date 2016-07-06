var people = require('json!data/people.json');
var Person = require('models/person');
var Departments = require('collections/departments');
var _ = require('underscore');

var People = Backbone.Collection.extend({

	model: Person,

	initialize: function() {
		var self = this;
		this.departments = new Departments();
		this.on('add', this._onAdd);
		this.on('reset', function() {
			self.each(function(person) {
				self._onAdd(person);
			});
		});
	},

	_onAdd: function(person) {
		var people = this;
		// if this person has department membership
		if (person.has('departments')) {
			// loop over the departments
			_.each(person.get('departments'), function(data) {
				// try to load an existing top-level department
				var exists = people.departments.where({ 'name': data.name, 'parent': undefined }),
						department = exists.length ? exists[0] : people.departments.add(data);

				if (data.children && data.children.length) {
					_.each(data.children, function(data) {
						var child = people.departments.add(data);
						child.set('parent', department.cid);
						person.set('dep', child.cid);	
					});
				}
					
				person.set('tldep', department.cid);
			});
		}
	},

	comparator: 'name'

});

module.exports = People;