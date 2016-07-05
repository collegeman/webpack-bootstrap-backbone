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
		// create default model
		this.model = new this.modelClass(options);
		// initialize the template
		this._template = _.template(this.template);
	},

	data: function() {
		return this.model.attributes;
	},

	render: function() {
		this.$el.html( this._template( this.data() ) );
		rivets.bind(this.$el, { 'model': this.model });
		return this;
	}

});

module.exports = BaseView;