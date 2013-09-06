Titanium.include("TitaniumUnity.js");
 
var DataTestSuite = {
 
    suiteName: "Data Test Suite",
 
    setUp: function() {
    },
 
    tearDown: function() {
    },
 
    testInit: function() {
    },
 
    testQuery: function() {
    }
};

var currentWindow = WindowManager.getCurrentView();
 
currentWindow.addEventListener(
    'focus',
    function(e) {
        jsUnity.run(DataTestSuite);
});