'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var BaseView = require('views/base');

var BasePaneView = BaseView.extend({

	className: 'pane full-screen',

	navbarClass: false,

	initialize: function() {
		BaseView.prototype.initialize.apply(this, arguments);

		this.on('navstack:sleep', this._sleep);
		this.on('navstack:wake', this._wakeUp);
		this.once('navstack:wake', this.render);
	},

	render: function() {
		BaseView.prototype.render.apply(this, arguments);
		// initialize the navbar
		this._renderNavbar();

		return this;
	},

	_renderNavbar: function() {
		if (this.navbarClass) {
			this.navbar = new this.navbarClass();
			var $navbar = this.navbar.render().$el;
			this.$el.append( $navbar );
			if (this.navbar.$el.hasClass('navbar-fixed-top')) {
				this.$el.addClass('with-navbar-fixed-top');
			}

			this.$el.on('scroll', function() {
				$navbar.css({ top: $(this).scrollTop() });
			});
		}
	},

	_sleep: function() {},

	_wakeUp: function() {}

});

module.exports = BasePaneView;