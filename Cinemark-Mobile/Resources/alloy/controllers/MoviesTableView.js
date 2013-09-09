function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.moviesTableViewWindow = Ti.UI.createWindow({
        navBarHidden: "false",
        id: "moviesTableViewWindow",
        backgroundColor: "#ffffff",
        title: "Movies"
    });
    $.__views.moviesTableViewWindow && $.addTopLevelView($.__views.moviesTableViewWindow);
    $.__views.__alloyId4 = Alloy.createController("NavigationBar", {
        id: "__alloyId4",
        __parentSymbol: $.__views.moviesTableViewWindow
    });
    $.__views.__alloyId4.setParent($.__views.moviesTableViewWindow);
    $.__views.__alloyId5 = Ti.UI.createView({
        top: 50,
        layout: "vertical",
        id: "__alloyId5"
    });
    $.__views.moviesTableViewWindow.add($.__views.__alloyId5);
    $.__views.moviesTableView = Ti.UI.createTableView({
        id: "moviesTableView"
    });
    $.__views.__alloyId5.add($.__views.moviesTableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var MoviesTableViewController = function() {
        function onMoviesLoaded(movies) {
            if (movies.length) {
                var rows = new Array();
                for (var i = 0; movies.length > i; i++) {
                    var movie = movies[i];
                    var image;
                    image = "3D" == movie.get("cinemaType") ? "http://i00.i.aliimg.com/wsphoto/v2/442811884_2/3D-Glasses-Sunglasses-movie-Gave-Glasses-3D-TV-Glasses-1000pcs.jpg_50x50.jpg" : "XD" == movie.get("cinemaType") ? "http://www.cinemark.com/media/104710/icon_50_xd.png" : "http://cdn4.iconfinder.com/data/icons/SUPERVISTA/multimedia/png/128/video.png";
                    var row = Ti.UI.createTableViewRow({
                        movie: movie,
                        hasChild: true,
                        height: 70
                    });
                    var label = Ti.UI.createLabel({
                        text: movie.get("title"),
                        left: 60,
                        font: {
                            fontWeight: "bold",
                            color: "#000000",
                            fontSize: 20
                        },
                        movie: movie
                    });
                    var imageView = Ti.UI.createImageView({
                        image: image,
                        top: 10,
                        left: 5,
                        width: 48,
                        preventDefaultImage: true,
                        movie: movie
                    });
                    row.add(label);
                    row.add(imageView);
                    rows.push(row);
                }
                context.hideActivityIndicator();
                $.moviesTableView.addEventListener("click", openShowView);
                $.moviesTableView.setData(rows);
            } else {
                Util.addNoDataMessage($.moviesTableView, "No Movies for this Theater");
                context.hideActivityIndicator();
            }
        }
        function onLoadFail(error) {
            context.hideActivityIndicator();
            alert(error.error);
            Util.addNoDataMessage($.moviesTableView, "Error ocurred.");
        }
        function openShowView(e) {
            var movie = e.rowData.movie;
            var movieDetailViewController = Alloy.createController("MovieDetailView", {
                movie: movie,
                theaterId: theaterId
            });
            context.openNewWindow(movieDetailViewController.getView());
        }
        var MoviesService = require("services/MoviesService");
        var theaterId;
        var context;
        var moviesService;
        this.initialize = function(args) {
            this.initializeView($.moviesTableViewWindow);
            this.showActivityIndicator("Loading Movies...");
            context = this;
            theaterId = args.theaterId;
            moviesService = new MoviesService();
            moviesService.call(theaterId, onMoviesLoaded, onLoadFail);
        };
    };
    MoviesTableViewController.prototype = new BaseViewController();
    var args = arguments[0] || {};
    var controller = new MoviesTableViewController();
    controller.initialize(args);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;