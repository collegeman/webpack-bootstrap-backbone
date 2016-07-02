/**
 * Thinnest possible base view for Bootstrap modals.
 * When hidden, the modal removes itself from the DOM.
 */
var $ = require('jquery');
var Backbone = require('backbone');
var BaseView = require('views/base');
var baseModalTemplate = require('text!templates/bootstrap/modal.html');

var BootstrapModalView = BaseView.extend({

	tagName: 'div',

	className: 'modal fade',

	template: baseModalTemplate,

	events: {
		'hidden.bs.modal': function() {
			this.remove();
		}
	},

	initialize: function() {
		BaseView.prototype.initialize.apply(this, arguments);
		// incorporate subclass' events for delegation
		this.events = $.extend({}, BootstrapModalView.prototype.events, this.events || {});
		
		this.render();
	},

	render: function() {
		BaseView.prototype.render.apply(this, arguments);

		this.$el.attr('tabindex', -1);
		this.$el.attr('role', 'dialog');
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