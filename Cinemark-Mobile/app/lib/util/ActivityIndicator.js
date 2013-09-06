function ActivityIndicator() {
	
	var style;
	/*
	 * Create and show the activity indicator in the given view.
	 */
	this.show = function(window, message) {
		_setupStyle();
		var activityIndicator = Ti.UI.createActivityIndicator({ 
		  	message: message,
		  	style:style,
		  	backgroundColor:'#000000',
		  	opacity:0.6,
		  	height: Ti.UI.FILL,
		  	width: Ti.UI.FILL,
		  	id: 'activityIndicator'
		});	
		window.activityIndicator = activityIndicator;
		window.add(activityIndicator);
		
		activityIndicator.show();
	};
	
	/*
	 * Hide the activity indicator from the given view.
	 */
	this.hide = function(window) {
		if( window && window.activityIndicator ) {
			window.activityIndicator.hide();
		}
	};
	
	/*
	 * Setup the style according to the current os
	 */
	var _setupStyle = function() {
		if (Ti.Platform.name === 'iPhone OS'){
		  style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
		} else {
		  style = Ti.UI.ActivityIndicatorStyle.DARK;
		}
	};
	

}

module.exports = ActivityIndicator;