/**
 * This view is the container for all other views.
 * Just subclass it to build your own.
 */
var $ = require('jquery');
var Backbone = require('backbone');
var User = require('models/user');
var AuthModalView = require('views/modals/auth');
var rivets = require('rivets');

var AppView = Backbone.View.extend({

	id: 'panel',

	userClass: User,

	requiresSession: true,

	initialize: function(options) {
		Backbone.View.prototype.initialize.apply(this, arguments);		
		// incorporate subclass' events for delegation
		this.events = $.extend({}, AppView.prototype.events, this.events || {});
		// stash the router
		this.router = options.router;
		// drop the panel into the body
		$('body').append(this.$el);
		// call render automatically
		this.render();
		// create user object
		this.user = new this.userClass();
		// listen for state changes on user
		this.listenTo(this.user, 'change:loggedIn', function() {
			if (!this.user.get('loggedIn')) {
				new AuthModalView({ user: this.user }).show().info('Please sign in or sign up.');
			}
		});
		// if this app requires a session, kick-off logged-in state test
		if (this.requiresSession) {
			// determine whether or not the user is logged in
			this.user.isLoggedIn();
		}
	},

	render: function() {
		return this;
	}

});

module.exports = AppView;