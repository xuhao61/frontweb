function goBack() {
    WindowManager.removeWindow();
}

function runTests() {
    getDataReady(function() {
        jsUnity.run(DataTestSuite);
    });
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Titanium.include("test/DataTest.js");

var BaseViewController = require("util/BaseViewController");

var ActivityIndicator = require("util/ActivityIndicator");

var ActivityIndicatorView = new ActivityIndicator();

var UtilClass = require("util/Util");

var Util = new UtilClass();

var WindowManagerClass = require("util/WindowManager");

var WindowManager = new WindowManagerClass();

var TEST_MODE = false;

Alloy.createController("index");