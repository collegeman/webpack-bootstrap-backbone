'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var AppView = require('views/app');
var HomePaneView = require('views/panes/home');

module.exports = Backbone.Router.extend({

	routes: {
		'': 'home',
		'settings': 'settings'
	},

	initialize: function(options) {
		this.options = $.extend({}, options, {});
		if (!this.options) {
			this.options.app = new AppView();
		}
		this.app = this.options.app;
	},

	home: function() {
		this.app.stage.push('home', function() {
			return new HomePaneView();
		});
	},

	settings: function() {

	}

});