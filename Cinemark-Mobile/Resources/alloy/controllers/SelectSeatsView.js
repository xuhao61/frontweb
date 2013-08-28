function Controller() {
    function initialize() {
        var showtimeId = args.showtimeId;
        var showtimeService = new ShowtimeService();
        showtimeService.call(showtimeId, onShowtimeLoaded, onLoadFail);
    }
    function onShowtimeLoaded(showtime) {
        var sections = [ "left", "center", "right" ];
        var top = 0;
        for (var i = 0; sections.length > i; i++) {
            renderSection(showtime.get(sections[i]), top, sections[i]);
            top += parseInt(showtime.get(sections[i]).get("cols")) * (SEAT_SIZE + SPACE_BETWEEN_SEATS) + 6;
        }
    }
    function renderSection(section, sectionTop, sectionType) {
        Ti.UI.createView();
        var sectionTakenSeats = section.get("takenSeats");
        var rows = parseInt(section.get("rows"));
        var cols = parseInt(section.get("cols"));
        var top = sectionTop;
        var left = 0;
        for (var i = 0; rows > i; i++) {
            left += SEAT_SIZE + SPACE_BETWEEN_SEATS;
            top = sectionTop;
            for (var j = 0; cols > j; j++) {
                top += SEAT_SIZE + SPACE_BETWEEN_SEATS;
                var seatId = sectionType + "-" + i + "-" + j;
                var taken = false;
                for (var k = 0; sectionTakenSeats.lenght > k; k++) {
                    var takenSeat = sectionTakenSeats[k];
                    var takenSeatId = sectionType + "-" + takenSeat.row + "-" + takenSeat.col;
                    if (takenSeatId == seatId) {
                        taken = true;
                        break;
                    }
                }
                renderSeat(top, left, seatId, taken);
            }
        }
    }
    function renderSeat(top, left, id, taken) {
        Titanium.Filesystem.resourcesDirectory + Titanium.Filesystem.separator;
        var seat = Titanium.UI.createView({
            top: top,
            left: left,
            backgroundColor: taken ? "#CCCCCC" : "#000000",
            height: SEAT_SIZE,
            width: SEAT_SIZE,
            id: id
        });
        $.seatsContainer.add(seat);
    }
    function onLoadFail(e) {
        alert(e);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.SelectSeatsView = Ti.UI.createWindow({
        navBarHidden: "false",
        backgroundColor: "#ffffff",
        id: "SelectSeatsView"
    });
    $.__views.SelectSeatsView && $.addTopLevelView($.__views.SelectSeatsView);
    $.__views.container = Ti.UI.createView({
        id: "container"
    });
    $.__views.SelectSeatsView.add($.__views.container);
    $.__views.seatsContainer = Ti.UI.createScrollView({
        id: "seatsContainer",
        showHorizontalScrollIndicator: "true",
        showVerticalScrollIndicator: "true",
        contentHeight: "auto",
        contentWidth: "auto"
    });
    $.__views.container.add($.__views.seatsContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var ShowtimeService = require("services/ShowtimeService");
    var args = arguments[0] || {};
    var SEAT_SIZE = 25;
    var SPACE_BETWEEN_SEATS = 2;
    initialize();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;