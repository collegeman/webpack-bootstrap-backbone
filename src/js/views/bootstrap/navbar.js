'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var BaseView = require('views/base');
var baseNavbarTemplate = require('text!templates/bootstrap/navbar.html');
var rivets = require('rivets');

var BootstrapNavbarView = BaseView.extend({

	tagName: 'nav',

	className: 'navbar navbar-default navbar-fixed-top',

	template: baseNavbarTemplate,

	render: function() {
		this.$el.html( this._template( this.data() ) );
		rivets.bind(this.$el, { 
			'parent': this.parent,
			'view': this,
			'model': this.model 
		});
		return this;
	}

});

module.exports = BootstrapNavbarView;