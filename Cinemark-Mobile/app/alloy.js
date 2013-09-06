// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
Titanium.include("test/DataTest.js");
var BaseViewController = require('util/BaseViewController');
var ActivityIndicator = require('util/ActivityIndicator');
var ActivityIndicatorView = new ActivityIndicator();

var UtilClass = require('util/Util');
var Util = new UtilClass();

var WindowManagerClass = require('util/WindowManager');
var WindowManager = new WindowManagerClass();

function goBack() {
	WindowManager.removeWindow();
}

var TEST_MODE = false;

function runTests() {
	getDataReady(function(){
		jsUnity.run(DataTestSuite);		
	});
}
