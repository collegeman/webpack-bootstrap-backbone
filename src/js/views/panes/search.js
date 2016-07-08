var BasePaneView = require('views/panes/base');
var SearchNavbarView = require('views/navbars/search');

var SearchPaneView = BasePaneView.extend({

	navbarClass: SearchNavbarView,

	events: {
		'keyup [data-value="search"]': function() {
			this.search();
		}
	},

	initialize: function() {
		BasePaneView.prototype.initialize.apply(this, arguments);
		this.results = new Backbone.Collection();
		this.listenTo(this.results, 'reset', this.render);
	},

	search: function() {
		
	},

	data: function() {
		var data = BasePaneView.prototype.data.apply(this, arguments);
		data['results'] = this.results;
		return data;
	},

	template: require('text!templates/panes/search.html')

});

module.exports = SearchPaneView;