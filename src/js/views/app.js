/**
 * This view is the container for all other views.
 * Just subclass it to build your own.
 */
var $ = require('jquery');
var Backbone = require('backbone');
var User = require('models/user');
var AuthModalView = require('views/modals/auth');
var rivets = require('rivets');
var Navstack = require('navstack');

var AppView = Backbone.View.extend({

	/**
	 * Extend models/user to create your own User
	 * object; but make sure to implement the methods
	 * for login, logout, reset, and register
	 */
	userClass: User,

	/**
	 * Set this to true to require an authenticated
	 * session on app startup.
	 */
	requiresSession: false,

	initialize: function(options) {
		Backbone.View.prototype.initialize.apply(this, arguments);		
		// incorporate subclass' events for delegation
		this.events = $.extend({}, AppView.prototype.events, this.events || {});
		// setup the navstack
		this.stage = new Navstack({
			el: this.$el
		});
		// drop this container into the body
		$('body').append(this.$el);
		// make navstack window height
		this.$el.height( $(window).height() );
		// initialize the user object
		this._initUserObject();
		// if this app requires a session, kick-off logged-in state test
		if (this.requiresSession) {
			// determine whether or not the user is logged in
			this.user.isLoggedIn();
		}
	},

	_initUserObject: function() {
		// create user object
		this.user = new this.userClass();
		// listen for state changes on user
		this.listenTo(this.user, 'change:loggedIn', function() {
			if (!this.user.get('loggedIn')) {
				new AuthModalView({ user: this.user }).show().info('Please sign in or sign up.');
			}
		});
	}

});

module.exports = AppView;