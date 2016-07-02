'use strict';

/**
 * Basic user object.
 */
var Backbone = require('backbone');
var $ = require('jquery');

module.exports = Backbone.Model.extend({

	login: function(email, password) {
		var deferred = $.Deferred();

		// implement your login routine here

		return deferred;
	},

	logout: function() {
		var deferred = $.Deferred();

		// implement your logout routine here

		return deferred;
	},

	register: function(email, password) {
		var deferred = $.Deferred();

		// implement your registration routine here

		return deferred;
	},

	reset: function(email) {
		var deferred = $.Deferred();

		// implement your password reset routine here

		return deferred;
	},

	isLoggedIn: function() {
		var deferred = $.Deferred();

		// implement your logged-in test here
		// then update loggedIn state, like this:
		var loggedIn = false;
		this.set('loggedIn', loggedIn);
		deferred.resolveWith(this, [ loggedIn ]);

		return deferred;
	}

});