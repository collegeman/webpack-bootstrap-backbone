var BootstrapNavbarView = require('views/bootstrap/navbar');

var SearchNavbarView = BootstrapNavbarView.extend({

	template: require('text!templates/navbars/search.html')

});

module.exports = SearchNavbarView;