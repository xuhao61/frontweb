var BaseViewController = function() {
    this.window;
    this.initializeView = function(_window) {
        this.window = _window;
        WindowManager.addWindow(_window);
    };
    this.showActivityIndicator = function(message) {
        ActivityIndicatorView.show(this.window, message);
    };
    this.hideActivityIndicator = function() {
        ActivityIndicatorView.hide(this.window);
    };
    this.openNewWindow = function(windowToOpen) {
        windowToOpen.open({
            transition: Titanium.UI.iPhone.AnimationStyle.CURL_UP
        });
    };
};

module.exports = BaseViewController;