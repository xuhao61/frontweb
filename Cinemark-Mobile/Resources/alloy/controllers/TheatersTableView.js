function Controller() {
    function initialize() {
        var theaterService = new TheaterService();
        theaterService.call(onTheatersLoaded, onLoadFail);
    }
    function onTheatersLoaded(theaters) {
        var rows = new Array();
        for (var i = 0; theaters.length > i; i++) {
            var theater = theaters[i];
            row = Ti.UI.createTableViewRow({
                title: theater.get("name"),
                id: theater.get("id"),
                font: {
                    fontWeight: "bold",
                    color: "#000000"
                }
            });
            rows.push(row);
        }
        $.tableView.addEventListener("click", openMoviesView);
        $.tableView.setData(rows);
    }
    function openMoviesView(e) {
        var theaterId = e.row.id;
        var moviesTableViewController = Alloy.createController("MoviesTableView", {
            theaterId: theaterId
        });
        moviesTableViewController.getView().open({
            animated: true
        });
    }
    function onLoadFail(error) {
        alert(error);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.TheatersTableView = Ti.UI.createView({
        layout: "vertical",
        id: "TheatersTableView"
    });
    $.__views.TheatersTableView && $.addTopLevelView($.__views.TheatersTableView);
    $.__views.tableView = Ti.UI.createTableView({
        id: "tableView"
    });
    $.__views.TheatersTableView.add($.__views.tableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var TheaterService = require("services/TheaterService");
    initialize();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;