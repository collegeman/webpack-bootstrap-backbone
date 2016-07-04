'use strict';

var $ = require('jquery');
var _ = require('underscore');
var BasePaneView = require('views/panes/base');
var BaseMenuView = require('views/menus/base');
var BootstrapNavbarView = require('views/bootstrap/navbar');
var HomePaneView = BasePaneView.extend({

	leftSideMenuClass: BaseMenuView,

	rightSideMenuClass: BaseMenuView,

	navbarClass: BootstrapNavbarView,

	template: require('text!templates/panes/home.html'),

	events: {
		'click [data-action="toggle-right-side-menu"]': function() {
			this.rightSideMenu && this.rightSideMenu.menu.toggle();
			return false;
		},

		'click [data-action="toggle-left-side-menu"]': function() {
			this.leftSideMenu && this.leftSideMenu.menu.toggle();
			return false;
		}
	},

	render: function() {
		BasePaneView.prototype.render.apply(this, arguments);
		// render any slideout menus
		this._renderSlideoutMenus();

		return this;
	},

	_renderSlideoutMenus: function() {
		if (this.leftSideMenuClass) {
			this.$el.addClass('slideout-panel');
			this.leftSideMenu = new this.leftSideMenuClass({ panel: this.el, 'side': 'left' });
			$('body').prepend( this.leftSideMenu.render().$el );
			this.listenTo(this.leftSideMenu, 'open', function() {
				this.rightSideMenu && this.rightSideMenu.menu.disableTouch();
			});
			this.listenTo(this.leftSideMenu, 'close', function() {
				setTimeout(_.bind(function() {
					this.rightSideMenu && this.rightSideMenu.menu.enableTouch();
				}, this), 300);
			});
		}

		if (this.rightSideMenuClass) {
			this.$el.addClass('slideout-panel');
			this.rightSideMenu = new this.rightSideMenuClass({ panel: this.el, 'side': 'right' });
			$('body').prepend( this.rightSideMenu.render().$el );
			this.listenTo(this.rightSideMenu, 'open', function() {
				this.leftSideMenu && this.leftSideMenu.menu.disableTouch();
			});
			this.listenTo(this.rightSideMenu, 'close', function() {
				setTimeout(_.bind(function() {
					this.leftSideMenu && this.leftSideMenu.menu.enableTouch();
				}, this), 300);
			});
		}
	}

});

module.exports = HomePaneView;