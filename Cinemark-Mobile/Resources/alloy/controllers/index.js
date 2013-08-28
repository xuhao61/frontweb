function Controller() {
    function initialize() {}
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        navBarHidden: "false",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.theatersView = Alloy.createController("TheatersTableView", {
        id: "theatersView",
        __parentSymbol: $.__views.index
    });
    $.__views.theatersView.setParent($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    initialize();
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;