function Controller() {
    function initialize() {
        $.title.setText(title);
        $.description.setText(description);
        $.thrillerBtn.addEventListener("click", openVideo);
        $.selectSeatsBtn.addEventListener("click", openSelectSeats);
    }
    function openSelectSeats() {
        var selectSeatsViewController = Alloy.createController("SelectSeatsView", {
            showtimeId: "1"
        });
        selectSeatsViewController.getView().open();
    }
    function openVideo() {
        Ti.Platform.openURL(videoUrl);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.MovieDetailView = Ti.UI.createWindow({
        navBarHidden: "false",
        id: "MovieDetailView"
    });
    $.__views.MovieDetailView && $.addTopLevelView($.__views.MovieDetailView);
    $.__views.__alloyId0 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "#ffffff",
        id: "__alloyId0"
    });
    $.__views.MovieDetailView.add($.__views.__alloyId0);
    $.__views.title = Ti.UI.createLabel({
        id: "title"
    });
    $.__views.__alloyId0.add($.__views.title);
    $.__views.description = Ti.UI.createLabel({
        id: "description"
    });
    $.__views.__alloyId0.add($.__views.description);
    $.__views.thrillerBtn = Ti.UI.createButton({
        id: "thrillerBtn",
        title: "Watch Trailer"
    });
    $.__views.__alloyId0.add($.__views.thrillerBtn);
    $.__views.selectSeatsBtn = Ti.UI.createButton({
        id: "selectSeatsBtn",
        title: "Select Seats"
    });
    $.__views.__alloyId0.add($.__views.selectSeatsBtn);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var title = args.movie.attributes.name;
    var description = args.movie.attributes.description;
    var videoUrl = args.movie.attributes.trailerUrl;
    initialize();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;