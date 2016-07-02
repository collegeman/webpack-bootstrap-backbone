'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var BaseView = require('views/base');
var baseNavbarTemplate = require('text!templates/bootstrap/navbar.html');

var BootstrapNavbarView = BaseView.extend({

	tagName: 'nav',

	className: 'navbar navbar-default navbar-fixed-top slidesout',

	template: baseNavbarTemplate

});

module.exports = BootstrapNavbarView;