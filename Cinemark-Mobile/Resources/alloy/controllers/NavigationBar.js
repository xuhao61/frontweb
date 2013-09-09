function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.NavigationBar = Ti.UI.createWindow({
        navBarHidden: "false",
        layout: "vertical",
        id: "NavigationBar"
    });
    $.__views.NavigationBar && $.addTopLevelView($.__views.NavigationBar);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId9!click!goBack"] && $.__views.__alloyId9.addEventListener("click", goBack);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;