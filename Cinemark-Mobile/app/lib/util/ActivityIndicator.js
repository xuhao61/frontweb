function ActivityIndicator() {
	
	var style;
	var activityIndicator;
	
	this.show = function(window) {
		if( !window.hasActivityIndicator ) {
			_setupStyle();
			activityIndicator = Ti.UI.createActivityIndicator({ 
			  	message: 'Loading...',
			  	style:style,
			  	top:10,
			  	left:10,
			  	height:Ti.UI.SIZE,
			  	width:Ti.UI.SIZE
			});	
			window.hasActivityIndicator = true;
			window.add(activityIndicator);
		}
		
		activityIndicator.show();
	};
	
	this.hide = function(window) {
		if( !window.hasActivityIndicator ) {
			activityIndicator.hide();
		}
	};
	
	var _setupStyle = function() {
		if (Ti.Platform.name === 'iPhone OS'){
		  style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
		}
		else {
		  style = Ti.UI.ActivityIndicatorStyle.DARK;
		}
	};
	

}

module.exports = ActivityIndicator;