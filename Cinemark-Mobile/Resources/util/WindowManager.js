function WindowManager() {
    var windowStack = new Array();
    this.addWindow = function(window) {
        window.orientationModes = [ Titanium.UI.PORTRAIT ];
        windowStack.push(window);
    };
    this.removeWindow = function() {
        var window = this.getCurrentView();
        windowStack.pop();
        window.close({
            transition: Titanium.UI.iPhone.AnimationStyle.CURL_DOWN
        });
    };
    this.getCurrentView = function() {
        return windowStack[windowStack.length - 1];
    };
    this.getInitialView = function() {
        if (windowStack) return windowStack[0];
    };
}

module.exports = WindowManager;