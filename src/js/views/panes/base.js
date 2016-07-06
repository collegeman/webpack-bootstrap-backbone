'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var BaseView = require('views/base');
var rivets = require('rivets');

var BasePaneView = BaseView.extend({

	className: 'pane full-screen',

	navbarClass: false,

	initialize: function() {
		BaseView.prototype.initialize.apply(this, arguments);

		this.on('navstack:sleep', _.bind(this._sleep, this));
		this.on('navstack:wake', _.bind(this._wakeUp, this));
		this.once('navstack:wake', _.bind(this.render, this));
		this.once('navstack:wake', _.bind(this._renderNavbar, this));

		this.$content = $('<div class="content"></div>');
		this.$el.append(this.$content);
	},

	render: function() {
		this.$content.html( this._template( this.data() ) );
		rivets.bind(this.$content, { 
			'view': this,
			'model': this.model 
		});
		return this;
	},

	_renderNavbar: function() {
		if (this.navbarClass) {
			this.navbar = new this.navbarClass({ parent: this });
			var $navbar = this.navbar.render().$el;
			this.$el.append( $navbar );
			if (this.navbar.$el.hasClass('navbar-fixed-top')) {
				this.$el.addClass('with-navbar-fixed-top');
			}
		}
	},

	_sleep: function() {},

	_wakeUp: function() {}

});

module.exports = BasePaneView;