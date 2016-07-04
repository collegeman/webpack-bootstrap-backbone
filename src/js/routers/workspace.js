'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var Navstack = require('navstack');
var HomePaneView = require('views/panes/home');
var SearchPaneView = require('views/panes/search');
var NextPaneView = require('views/panes/next');

module.exports = Backbone.Router.extend({

	routes: {
		'': 'home',

		'search': 'search',

		'next': 'next'
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

	home: function() {
		this.stage.push('home', function() {
			return new HomePaneView();
		});
	},

	next: function() {
		this.stage.push('next', function() {
			return new NextPaneView();
		});
	},

	search: function() {
		this.stage.push('search!search', function() {
			return new SearchPaneView();
		});
	}

});