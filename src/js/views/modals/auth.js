var rivets = require('rivets');
var Backbone = require('backbone');
var BootstrapModalView = require('views/bootstrap/modal');
var authModalTemplate = require('text!templates/modals/auth.html');
var User = require('models/user');
var $ = require('jquery');

var AuthModalView = BootstrapModalView.extend({

	events: {
		'show.bs.tab': function(e) {
			var $a = $(e.target), mode = $a.attr('href').substring(1);
			this.model.set('mode', mode);
			this.$('.modal-dialog').removeClass().addClass('modal-dialog modal-dialog-auth ' + mode);
		},

		'submit': function() {
			var $btn = this.$('button[type="submit"]');
			$btn.button('loading');
			this.$('.alert').hide();
			this.submit().always(function() {
				$btn.button('reset');
			});
			return false;
		}

	},

	template: authModalTemplate,

	initialize: function(options) {
		BootstrapModalView.prototype.initialize.apply(this, arguments);

		this.user = options.user || new User();

		this.listenTo(this.model, 'change:mode', function() {
			var mode = this.model.get('mode');
			this.model.set({
				'isResetMode': mode === 'reset',
				'isSignInMode': mode === 'signin',
				'isSignUpMode': mode === 'signup'
			});
		});

		this.model.set('mode', 'signin');
		this.$('.modal-dialog').addClass('signin');
	},

	submit: function() {
		var authModal = this,
				deferred = $.Deferred(), 
				mode = this.model.get('mode'), 
				data = this.model.attributes;

		if (mode === 'signin') {
			if (!data.email || !data.password) {
				this.error('E-mail and Password are required.');
				deferred.reject();
				return deferred;
			} 

			this.user.login(data.email, data.password).then(function() {
				deferred.resolve();
				authModal.hide();
			}).fail(function(error) {
				deferred.reject();
				authModal.error(error);
			});
		
		} else if (mode === 'signup') {
			if (!data.email || !data.password || !data.password_confirmation) {
				this.error('Please complete all fields.');
				deferred.reject();
				return deferred;
			} else if (data.password !== data.password_confirmation) {
				this.error('Password and confirmation do not match.');
				deferred.reject();
				return deferred;
			}

			this.user.register(data.email, data.password, data.password_confirmation).then(function() {
				deferred.resolve();
				authModal.hide();
			}).fail(function(error) {
				deferred.reject();
				authModal.error(error);
			});

		} else if (mode === 'reset') {
			if (!data.email) {
				this.error('E-mail is required.');
				deferred.reject();
				return deferred;
			} 

			this.user.reset(data.email).then(function() {
				deferred.resolve();
				authModal.model.clear();
				this.info('A password reset link has been sent to your e-mail.');
			}).fail(function(error) {
				deferred.reject();
				authModal.error(error);
			});

		}

		return deferred;
	},

	info: function(text) {
		this.$('.alert').removeClass().addClass('alert alert-info').text(text).show();
	},

	error: function(text) {
		this.$('.alert').removeClass().addClass('alert alert-danger').text(text).show();
	},

	show: function() {
		this.$el.modal({ 'backdrop': 'static', 'keyboard': false });
		return this;
	}

});

module.exports = AuthModalView;