'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var BaseView = require('views/base');
var baseMenuTemplate = require('text!templates/menus/base.html');
var Slideout = require('slideout');

var BaseMenuView = BaseView.extend({

	tagName: 'nav',

	className: 'slideout-menu',

	template: baseMenuTemplate,

	initialize: function(options) {
		var menuView = this;

		BaseView.prototype.initialize.apply(this, arguments);

		var options = $.extend({}, {
			'panel': $('#panel').get(0),
			'padding': 256, // TODO: get from CSS somehow
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

	 	this.$el.addClass('slideout-menu-' + options.side);
	 
	  this.menu.on('beforeopen', function() {
	  	$('body').addClass('slideout-open-' + options.side);
	  	$('.slidesout').each(function() {
	  		var $this = $(this);
	  		$this.attr('style', ($this.attr('style') || '').replace(/;transition: none; transform:.*?;/, ''));
	  		$this.addClass('slidesout-' + options.side);
	  	});
	  });

	  this.menu.on('beforeclose', function() {
	  	$('.slidesout').each(function() {
	  		var $this = $(this);
	  		$this.attr('style', ($this.attr('style') || '').replace(/;transition: none; transform:.*?;/, ''));
	  		$this.removeClass('slidesout-' + options.side);
		  });
	  });

	  this.menu.on('open', function() {
	  	$('.slidesout').addClass('slidesout-' + options.side);
	  	menuView.trigger('open');
	  });

	  this.menu.on('close', function() {
	  	menuView.trigger('close');
	  	$('.slidesout').removeClass('slidesout-' + options.side);
	  	$('body').removeClass('slideout-open-' + options.side);
	  });

	  this.menu.on('translate', function(translated) {
	  	$('.slidesout').each(function() {
	  		var $this = $(this);
	  		$this.attr('style', ($this.attr('style') || '').replace(/;transition: none; transform:.*?;/, ''));
		  	$this.attr('style', $this.attr('style') + ';transition: none; transform: translate3d(' + translated + 'px, 0px, 0px);');
		  });
	  });

	  this.menu.on('translateend', function() {
	  	$('.slidesout').each(function() {
	  		var $this = $(this);
	  		$this.attr('style', ($this.attr('style') || '').replace(/;transition: none; transform:.*?;/, ''));
		  });
	  });

	  if (options.navbar) {
			options.navbar.$el.find('[data-action="toggle-' + options.side + '-side-menu"]').click(function() {
				menuView.menu.toggle();
				
			});	
		}
	}

});

module.exports = BaseMenuView;