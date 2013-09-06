var BaseViewController = function() {
	
	// The main window of the controller
	this.window;
	
	/*
	 * Initialize the view 
	 */
	this.initializeView = function(_window) {
		this.window = _window;
		WindowManager.addWindow(_window);
	};
	
	/*
	 * Show the activity indicator
	 */
	this.showActivityIndicator = function(message) {
		ActivityIndicatorView.show(this.window, message);
	};
	
	/*
	 * Hide the activity indicator
	 */
	this.hideActivityIndicator = function() {
		ActivityIndicatorView.hide(this.window);
	};
	
	/*
	 * open new window
	 */
	this.openNewWindow = function(windowToOpen) {
		if (Ti.Platform.name === 'iPhone OS') {
			windowToOpen.open({transition:Titanium.UI.iPhone.AnimationStyle.CURL_UP});
		} else {
			windowToOpen.open({animated:true});
		}
	};
	
};
module.exports = BaseViewController;
