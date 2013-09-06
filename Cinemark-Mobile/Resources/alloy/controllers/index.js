function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        navBarHidden: "false",
        layout: "vertical",
        title: "Theaters",
        backgroundColor: "#ffffff",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId13 = Ti.UI.createView({
        layout: "vertical",
        title: "Theaters",
        id: "__alloyId13"
    });
    $.__views.index.add($.__views.__alloyId13);
    $.__views.tableView = Ti.UI.createTableView({
        id: "tableView"
    });
    $.__views.__alloyId13.add($.__views.tableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var TheatersTableViewController = function() {
        function onTheatersLoaded(theaters) {
            if (theaters.length) {
                var rows = new Array();
                for (var i = 0; theaters.length > i; i++) {
                    var theater = theaters[i];
                    row = Ti.UI.createTableViewRow({
                        title: theater.get("name"),
                        id: theater.get("id"),
                        hasChild: true,
                        height: 70,
                        font: {
                            fontWeight: "bold",
                            color: "#000000",
                            fontSize: 20
                        }
                    });
                    rows.push(row);
                }
                $.tableView.addEventListener("click", openMoviesView);
                $.tableView.setData(rows);
            } else Util.addNoDataMessage($.tableView, "Error ocurred.");
            context.hideActivityIndicator();
        }
        function openMoviesView(e) {
            var theaterId = e.row.id;
            var moviesTableViewController = Alloy.createController("MoviesTableView", {
                theaterId: theaterId
            });
            context.openNewWindow(moviesTableViewController.getView());
        }
        function onLoadFail(error) {
            alert(error);
            context.hideActivityIndicator();
            Util.addNoDataMessage($.tableView, "Error ocurred.");
        }
        var TheaterService = require("services/TheaterService");
        var context;
        this.initialize = function() {
            if (TEST_MODE) runTests(); else {
                this.initializeView($.index);
                context = this;
                context.showActivityIndicator("loading Theaters...");
                $.index.open();
                var theaterService = new TheaterService();
                theaterService.call(onTheatersLoaded, onLoadFail);
            }
        };
    };
    TheatersTableViewController.prototype = new BaseViewController();
    var theatersTableViewcontroller = new TheatersTableViewController();
    theatersTableViewcontroller.initialize();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;