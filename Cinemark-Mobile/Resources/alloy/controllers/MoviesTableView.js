function Controller() {
    function initialize() {
        theaterId = args.theaterId;
        var moviesService = new MoviesService();
        moviesService.call(theaterId, onMoviesLoaded, onLoadFail);
    }
    function onMoviesLoaded(movies) {
        var rows = new Array();
        for (var i = 0; movies.length > i; i++) {
            var movie = movies[i];
            var row = Ti.UI.createTableViewRow({
                leftImage: movie.get("thumbnail"),
                title: movie.get("name"),
                movie: movie,
                hasChild: true,
                height: 50
            });
            rows.push(row);
        }
        $.moviesTableView.addEventListener("click", openShowView);
        $.moviesTableView.setData(rows);
    }
    function openShowView(e) {
        var movie = e.rowData.movie;
        var movieDetailViewController = Alloy.createController("MovieDetailView", {
            movie: movie
        });
        movieDetailViewController.getView().open();
    }
    function onLoadFail(error) {
        alert(error);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.MoviesTableView = Ti.UI.createWindow({
        navBarHidden: "false",
        id: "MoviesTableView"
    });
    $.__views.MoviesTableView && $.addTopLevelView($.__views.MoviesTableView);
    $.__views.__alloyId1 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "#ffffff",
        id: "__alloyId1"
    });
    $.__views.MoviesTableView.add($.__views.__alloyId1);
    $.__views.moviesTableView = Ti.UI.createTableView({
        id: "moviesTableView"
    });
    $.__views.__alloyId1.add($.__views.moviesTableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var MoviesService = require("services/MoviesService");
    var args = arguments[0] || {};
    var theaterId;
    initialize();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;