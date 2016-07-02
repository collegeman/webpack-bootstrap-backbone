var $ = require('jquery');
var Backbone = require('backbone');
var baseMenuTemplate = require('text!templates/menu/base.html');

var BaseMenuView = BaseView.extend({

	tagName: 'nav',

	className: 'slideout-menu',

	template: baseMenuTemplate,

	initialize: function(options) {
		var options = $.extend({}, {
			'panel': $('#panel').get(0),
			'padding': 256,
			'tolerance': 70,
			'side': 'left'
		}, options);

		this.menu = new Slideout({
	    'panel': options.panel,
	    'menu': this.el,
	    'padding': options.padding,
	    'tolerance': options.tolerance,
	    'side': options.side
	  });

	  this.menu.on('beforeopen', function() {
	  	$('body').addClass('slideout-open');
	  	$('.slidesout').add('#intercom-conversations').add('#intercom-conversation').each(function() {
	  		var $this = $(this);
	  		$this.attr('style', ($this.attr('style') || '').replace(/;transition: none; transform:.*?;/, ''));
		  });
	  });

	  this.menu.on('beforeclose', function() {
	  	$('body').removeClass('slideout-open');
	  	$('.slidesout').add('#intercom-conversations').add('#intercom-conversation').each(function() {
	  		var $this = $(this);
	  		$this.attr('style', ($this.attr('style') || '').replace(/;transition: none; transform:.*?;/, ''));
		  });
	  });

	  this.menu.on('translate', function(translated) {
	  	$('.slidesout').add('#intercom-conversations').add('#intercom-conversation').each(function() {
	  		var $this = $(this);
	  		$this.attr('style', ($this.attr('style') || '').replace(/;transition: none; transform:.*?;/, ''));
		  	$this.attr('style', $this.attr('style') + ';transition: none; transform: translate3d(' + translated + 'px, 0px, 0px);');
		  });
	  });

	  this.menu.on('translateend', function() {
	  	$('.slidesout').add('#intercom-conversations').add('#intercom-conversation').each(function() {
	  		var $this = $(this);
	  		$this.attr('style', ($this.attr('style') || '').replace(/;transition: none; transform:.*?;/, ''));
		  });
	  });
	}

});

module.exports = BaseMenuView;