var _ = require('underscore');
var Backbone = require('backbone');
var lunr = require('lunr');

/**
 * A Backbone.Collection that implements client-side full-text search with Lunr.
 * @see https://github.com/mpneuried/backlunr/blob/master/_src/backlunr.coffee
 */
var LunrCollection = Backbone.Collection.extend({

	lunroptions: {
		fields: []
	},

	constructor: function(models, options) {
		Backbone.Collection.apply(this, arguments);

		this._lunrInitialized = false;

		this.on('add', this._lunrAdd);
		this.on('remove', this._lunrRemove);
		this.on('change', this._lunrChange);
	},

	_lunrInitialize: function(force) {
		if (!force && this._lunrInitialized) {
			return;
		}

		var self = this;
		self._lunrFields = [];

		self._lunrIndex = lunr(function() {
			var _opt = null;
			if (_.isFunction(self.lunroptions)) {
				_opt = self.lunroptions();
			} else {
				_opt = _.extend({ fields: [] }, self.lunroptions || {});
			}

			this.ref('cid');

			for (var idx in _opt.fields) {
				var field = _opt.fields[idx];
				self._lunrFields.push(field.name);
				this.field(field.name, _.omit( field, [ 'isID', 'name'] ));
			}

			for (var idx in self.models) {
				this.add(self._lunrExtractData(self.models[idx]));
			}
		});

		self._lunrInitialized = true;
		return this;
	},

	_lunrAdd: function(model) {
		this._lunrInitialize();
		this._lunrIndex.add(this._lunrExtractData(model));
	},

	_lunrRemove: function(model) {
		this._lunrInitialize();
		var data = model.toJSON();
		data.cid = model.cid;
		this._lunrIndex.remove(data);
	},

	_lunrChange: function(model) {
		this._lunrInitialize();
		this._lunrIndex.update(this._lunrExtractData(model));
	},

	reset: function(models, options) {
		Backbone.Collection.prototype.reset.apply(this, arguments);
		this._lunrInitialize();
		for (var idx in this.models) {
			this._lunrAdd(this.models[idx]);
		}
	},

	_lunrExtractData: function(model) {
		var data = {}
		// set the cid as ref
		data.cid = model.cid
		// add empty strings to index for fields that are not defined in the model or convert it to strings
		for (var idx in this._lunrFields) {
			var field = this._lunrFields[idx];
			if (!model.has(field)) {
				data[ field ] = "";
			} else {
				data[ field ] = model.get(field).toString();
			}
		}	
		return data;
	},
		
	processTerm: function(term) {
		return term;
	},

	search: function(term, raw) {
		this._lunrInitialize();

		var _lunrRes = this._lunrIndex.search(this.processTerm(term));
		if (raw) {
			return _lunrRes;
		}

		var _res = [];
		for (var idx in _lunrRes) {
			_res.push( this.get( _lunrRes[idx].ref ) );
		}

		_res.toJSON = function(options) {
			var _json = [];
			for (var model in this) {
				_json.push( model.toJSON(options) );
			}
			return _json;
		};

		return _res;
	}

});

module.exports = LunrCollection;