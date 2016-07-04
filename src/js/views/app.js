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
var Workspace = require('routers/workspace');

var AppView = Backbone.View.extend({

	/**
	 * Extend models/user to create your own User
	 * object; but make sure to implement the methods
	 * for login, logout, reset, and register
	 */
	userClass: User,

	routerClass: Workspace,

	/**
	 * Set this to true to require an authenticated
	 * session on app startup.
	 */
	requiresSession: false,

	events: {
		/**
		 * Setup route: URL prefix, and pass any such clicks
		 * through this.router.navigate
		 */
		'click [href^="route:"]': function(e) {
			var $clicked = $(e.currentTarget);
			this.router.navigate(( $clicked.attr('href') || '' ).substring(6), { trigger: true });
			return false;
		}
	},

	el: 'body',

	initialize: function(options) {
		Backbone.View.prototype.initialize.apply(this, arguments);		
		// merge in any events from extensions of this view class
		this.events = $.extend({}, AppView.prototype.events, this.events);
		// setup the navstack
		var $stage = $('<div id="stage"></div>');
		this.stage = new Navstack({
			transition: 'slide',
			el: $stage
		});
		// drop the stage into the body
		$('body').append($stage);
		// make navstack window height
		$stage.height( $(window).height() );
		// initialize our router
		this.router = new Workspace({ 'stage': this.stage });
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