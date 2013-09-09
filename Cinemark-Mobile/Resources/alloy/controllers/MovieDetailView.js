function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.movieDetailViewWindow = Ti.UI.createWindow({
        navBarHidden: "false",
        backgroundColor: "#ffffff",
        id: "movieDetailViewWindow"
    });
    $.__views.movieDetailViewWindow && $.addTopLevelView($.__views.movieDetailViewWindow);
    $.__views.__alloyId2 = Alloy.createController("NavigationBar", {
        id: "__alloyId2",
        __parentSymbol: $.__views.movieDetailViewWindow
    });
    $.__views.__alloyId2.setParent($.__views.movieDetailViewWindow);
    $.__views.__alloyId3 = Ti.UI.createView({
        top: 50,
        layout: "vertical",
        id: "__alloyId3"
    });
    $.__views.movieDetailViewWindow.add($.__views.__alloyId3);
    $.__views.title = Ti.UI.createLabel({
        color: "#0B3861",
        font: {
            fontWeight: "bold",
            fontSize: 20
        },
        id: "title"
    });
    $.__views.__alloyId3.add($.__views.title);
    $.__views.infoLabel = Ti.UI.createLabel({
        color: "#000000",
        font: {
            fontWeight: "bold",
            fontSize: 10
        },
        id: "infoLabel"
    });
    $.__views.__alloyId3.add($.__views.infoLabel);
    $.__views.movieImage = Ti.UI.createImageView({
        height: 150,
        id: "movieImage"
    });
    $.__views.__alloyId3.add($.__views.movieImage);
    $.__views.description = Ti.UI.createTextArea({
        left: 5,
        height: 70,
        font: {
            fontSize: 12
        },
        editable: "false",
        textAlign: "left",
        id: "description",
        borderColor: "#ffffff",
        borderWidth: "0"
    });
    $.__views.__alloyId3.add($.__views.description);
    $.__views.thrillerBtn = Ti.UI.createImageView({
        height: 50,
        id: "thrillerBtn",
        image: "http://nogreaterjoy.org/shop/media/watch-trailer-button.png"
    });
    $.__views.__alloyId3.add($.__views.thrillerBtn);
    $.__views.selectShowtimeLabel = Ti.UI.createLabel({
        left: "5",
        top: "5",
        id: "selectShowtimeLabel",
        text: "Select Showtime:",
        color: "#000000"
    });
    $.__views.__alloyId3.add($.__views.selectShowtimeLabel);
    $.__views.showtimesContainer = Ti.UI.createView({
        left: "5",
        id: "showtimesContainer",
        layout: "horizontal"
    });
    $.__views.__alloyId3.add($.__views.showtimesContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var MovieDetailViewController = function() {
        function onShowtimeLoaded(showtimes) {
            if (showtimes.length) for (var i = 0; showtimes.length > i; i++) renderShowtimeButton(showtimes[i]); else {
                $.selectShowtimeLabel.setVisible(false);
                alert("No showtimes for this Movie in this Theater.");
            }
            context.hideActivityIndicator();
        }
        function onLoadFail(e) {
            context.hideActivityIndicator();
            alert(e.error);
        }
        function renderShowtimeButton(showtime) {
            var showtimeBtn = Titanium.UI.createView({
                backgroundColor: "#CCCCCC",
                height: 50,
                width: 50,
                showtime: showtime,
                borderColor: "#0B6121",
                borderWidth: "4",
                borderRadius: "4"
            });
            var showtimeLabel = Titanium.UI.createLabel({
                text: showtime.get("schedule").get("time"),
                color: "#000000",
                showtime: showtime
            });
            showtimeBtn.addEventListener("click", openShowtimeView);
            showtimeBtn.add(showtimeLabel);
            $.showtimesContainer.add(showtimeBtn);
            var separator = Titanium.UI.createView({
                height: 50,
                width: 5
            });
            $.showtimesContainer.add(separator);
        }
        function openShowtimeView(e) {
            var showtime = e.source.showtime;
            var selectSeatsViewController = Alloy.createController("SelectSeatsView", {
                showtime: showtime,
                movie: movie
            });
            context.openNewWindow(selectSeatsViewController.getView());
        }
        function openVideo() {
            Titanium.Platform.openURL(movie.trailerUrl);
        }
        var ShowtimeService = require("services/ShowtimeService");
        var context;
        var movie;
        var theaterId;
        var showtimeService;
        this.initialize = function(args) {
            this.initializeView($.movieDetailViewWindow);
            this.showActivityIndicator("Loading Movie Details...");
            context = this;
            movie = args.movie.attributes;
            description = movie.summary;
            videoUrl = movie.trailerUrl;
            theaterId = args.theaterId;
            showtimeService = new ShowtimeService();
            showtimeService.call(movie.id, theaterId, onShowtimeLoaded, onLoadFail);
            var cinemaTypeString = "XD" == movie.cinemaType || "3D" == movie.cinemaType ? " (" + movie.cinemaType + ")" : "";
            $.title.setText(movie.title + cinemaTypeString);
            $.description.setValue(movie.summary);
            $.movieImage.setImage(movie.picUrl);
            $.infoLabel.setText(movie.genre + " - Director: " + movie.director);
            $.thrillerBtn.addEventListener("click", openVideo);
        };
    };
    MovieDetailViewController.prototype = new BaseViewController();
    var args = arguments[0] || {};
    var controller = new MovieDetailViewController();
    controller.initialize(args);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;