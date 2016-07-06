var AppView = require('views/app');
var People = require('collections/people');

var LookBookView = AppView.extend({

	initialize: function() {
		AppView.prototype.initialize.apply(this, arguments);
		this.people = new People();
		this.people.reset(require('json!data/people.json'));
	}

});

module.exports = LookBookView;