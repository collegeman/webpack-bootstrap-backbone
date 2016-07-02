var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var rivets = require('rivets');

var BaseView = Backbone.View.extend({

	template: '<span></span>',

	tagName: 'div',

	className: '',

	modelClass: Backbone.Model,

	initialize: function(options) {
		this.model = new this.modelClass(options);
		this._template = _.template(this.template);
	},

	render: function() {
		this.$el.html( this._template(this.model.attributes) );
		rivets.bind(this.$el, { 'model': this.model });
		return this;
	}

});

module.exports = BaseView;