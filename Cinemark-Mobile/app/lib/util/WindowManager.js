function WindowManager() {

	var windowStack = new Array();
	
	/*
	 * Add window the window stack
	 */
	this.addWindow = function(window) {
		window.orientationModes = [Titanium.UI.PORTRAIT];
		windowStack.push(window);
	};
	
	/*
	 * Remove window from the view stack
	 */
	this.removeWindow = function() {
		var window = this.getCurrentView();
		windowStack.pop();	
		window.close({transition:Titanium.UI.iPhone.AnimationStyle.CURL_DOWN});
	};
	
	/*
	 * returns the current view
	 */
	this.getCurrentView = function() {
		return windowStack[windowStack.length-1];
	};
	
	/*
	 * returns the current view
	 */
	this.getInitialView = function() {
		if( windowStack ) {
			return windowStack[0];
		}
	};
	
}

module.exports = WindowManager;