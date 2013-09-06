function ActivityIndicator() {
    var style;
    this.show = function(window, message) {
        _setupStyle();
        var activityIndicator = Ti.UI.createActivityIndicator({
            message: message,
            style: style,
            backgroundColor: "#000000",
            opacity: .6,
            height: Ti.UI.FILL,
            width: Ti.UI.FILL,
            id: "activityIndicator"
        });
        window.activityIndicator = activityIndicator;
        window.add(activityIndicator);
        activityIndicator.show();
    };
    this.hide = function(window) {
        window && window.activityIndicator && window.activityIndicator.hide();
    };
    var _setupStyle = function() {
        style = Ti.UI.ActivityIndicatorStyle.DARK;
    };
}

module.exports = ActivityIndicator;