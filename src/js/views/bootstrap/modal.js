/**
 * Thinnest possible base view for Bootstrap modals.
 * When hidden, the modal removes itself from the DOM.
 */
var $ = require('jquery');
var Backbone = require('backbone');
var baseModalTemplate = require('text!templates/modals/base.html');

var BootstrapModalView = Backbone.View.extend({

	tagName: 'div',

	className: 'modal fade',

	template: baseModalTemplate,

	events: {
		'hidden.bs.modal': function() {
			this.remove();
		}
	},

	initialize: function() {
		Backbone.View.prototype.initialize.apply(this, arguments);
		// incorporate subclass' events for delegation
		this.events = $.extend({}, BootstrapModalView.prototype.events, this.events || {});
		
		this.render();
	},

	render: function() {
		this.$el.attr('tabindex', -1);
		this.$el.attr('role', 'dialog');
		this.$el.html(this.template);
		$('body').append(this.$el);
		return this;
	},

	show: function(modalOptions) {
		this.$el.modal(modalOptions || {});
		return this;
	},

	hide: function() {
		this.$el.modal('hide');
		return this;
	}

});

module.exports = BootstrapModalView;