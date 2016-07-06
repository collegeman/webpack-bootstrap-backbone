var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var rivets = require('rivets');

var BaseView = Backbone.View.extend({

	template: '<span></span>',

	tagName: 'div',

	className: '',

	modelClass: Backbone.Model,

	events: {},

	initialize: function(options) {
		Backbone.View.prototype.initialize.apply(this, arguments);
		// merge in any events from extensions of this view class
		this.events = $.extend({}, BaseView.prototype.events, this.events);
		// make sure options is an object
		this.options = $.extend({
			'parent': window.app
		}, options);
		// attach parent to this object
		this.parent = this.options.parent;
		// create/attach model
		this.model = this.options.model = ( this.options.model ? this.options.model : new this.modelClass(options) );
		// initialize the template
		this._template = _.template(this.template);
	},

	data: function() {
		return this.model.attributes;
	},

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

module.exports = BaseView;