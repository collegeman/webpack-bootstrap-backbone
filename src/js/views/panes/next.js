var BasePaneView = require('views/panes/base');
var BootstrapNavbarView = require('views/bootstrap/navbar');

var NextPaneView = BasePaneView.extend({

	template: require('text!templates/panes/next.html')

});

module.exports = NextPaneView;