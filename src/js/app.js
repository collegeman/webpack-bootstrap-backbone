'use strict';

// load Font Awesome, because it's awesome
require('font-awesome-webpack');
// setup global references for jQuery and Backbone
var $ = require('jquery');
var Backbone = require('backbone');
require('rivets-backbone-adapter');
// import our application router
var Workspace = require('./routers/workspace');
// import FastClick, to improve UI responsiveness on mobile
var FastClick = require('fastclick');
// and last but not least, import our AppView
var AppView = require('views/app');

$(function() {

	/**
	 * Some elements' click events should not be converted into
	 * touch events by FastClick. This is achieved by returning
	 * true from this handle called needsClick. So here we
	 * adapt the default handler, and I've added some basics
	 * from other projects.
	 */
  var needsClick = FastClick.prototype.needsClick;
  FastClick.prototype.needsClick = function(target) {
  	// this was an issue from working with radio and checkbox elements
  	// in Designmodo's Flat UI bootstrap theme
  	if (target.className === 'icon-checked' || target.className === 'icon-unchecked') {
  		return true;

  	// these "pac-item" elements are part of Google's Places API JS widget
  	} else if ( (target.className || '').indexOf('pac-item') > -1 ) {
      return true;
    } else if ( (target.parentNode.className || '').indexOf('pac-item') > -1) {
      return true;

    // don't change click events on anything in the Redactor editor
    } else if ( $(target).closest('.redactor-editor').length > 0 ) {
      return true;

    // finally, pass control back to the default handler
    } else {
      return needsClick.apply(this, arguments);
    }
  };
  FastClick.attach(document.body);

  // initialize our app view
  window.app = new AppView();

  // and start keeping track of browser history changes
	Backbone.history.start({ 
    root: location.host === 'collegeman.github.io' ? '/webpack-bootstrap-backbone' : '',
    pushState: false 
  });
});