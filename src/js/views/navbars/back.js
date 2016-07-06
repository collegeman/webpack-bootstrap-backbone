var BootstrapNavbarView = require('views/bootstrap/navbar');

var BackNavbarView = BootstrapNavbarView.extend({

	template: require('text!templates/navbars/back.html')

});

module.exports = BackNavbarView;