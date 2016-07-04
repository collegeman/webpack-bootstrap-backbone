var BasePaneView = require('views/panes/base');

var SearchPaneView = BasePaneView.extend({

	template: require('text!templates/panes/search.html')

});

module.exports = SearchPaneView;