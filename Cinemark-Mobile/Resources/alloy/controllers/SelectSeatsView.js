function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.selectSeatsViewWindow = Ti.UI.createWindow({
        navBarHidden: "false",
        backgroundColor: "#ffffff",
        id: "selectSeatsViewWindow",
        title: "Seat Selection"
    });
    $.__views.selectSeatsViewWindow && $.addTopLevelView($.__views.selectSeatsViewWindow);
    $.__views.__alloyId11 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId11"
    });
    $.__views.selectSeatsViewWindow.add($.__views.__alloyId11);
    $.__views.seatCountButton = Ti.UI.createButton({
        title: "",
        id: "seatCountButton"
    });
    $.__views.__alloyId11.add($.__views.seatCountButton);
    $.__views.buyTicketsButton = Ti.UI.createButton({
        title: "Buy Tickets",
        top: "2",
        id: "buyTicketsButton"
    });
    $.__views.__alloyId11.add($.__views.buyTicketsButton);
    $.__views.container = Ti.UI.createView({
        id: "container",
        layout: "vertical"
    });
    $.__views.__alloyId11.add($.__views.container);
    $.__views.seatsContainer = Ti.UI.createScrollView({
        id: "seatsContainer",
        contentHeight: "auto",
        contentWidth: "auto",
        scrollType: "horizontal"
    });
    $.__views.container.add($.__views.seatsContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var SelectSeatsViewController = function() {
        function renderShowtimeView(showtime) {
            var sections = [ "left", "center", "right" ];
            var top = 0;
            for (var i = 0; sections.length > i; i++) {
                renderSection(showtime.get(sections[i]), top, sections[i], !colsRendered);
                if (parseInt(showtime.get(sections[i]).get("rows")) > 0 && parseInt(showtime.get(sections[i]).get("cols")) > 0) {
                    colsRendered = true;
                    top += parseInt(showtime.get(sections[i]).get("cols")) * (SEAT_SIZE + SPACE_BETWEEN_SEATS) + 6;
                }
            }
            context.hideActivityIndicator();
        }
        function renderSection(section, sectionTop, sectionType, renderCols) {
            Ti.UI.createView();
            var sectionTakenSeats = section.get("takenSeats");
            var rows = parseInt(section.get("rows"));
            var cols = parseInt(section.get("cols"));
            var top = sectionTop;
            var left = 0;
            for (var i = rows; i > 0; i--) {
                left += SEAT_SIZE + SPACE_BETWEEN_SEATS;
                top = sectionTop;
                renderCols && renderColumnRowIndicator(top, left, i);
                for (var j = 0; cols > j; j++) {
                    top += SEAT_SIZE + SPACE_BETWEEN_SEATS;
                    var seatId = sectionType + "-" + i + "-" + j;
                    var taken = false;
                    i == rows && renderColumnRowIndicator(top, 0, j + 1);
                    for (var k = 0; sectionTakenSeats.length > k; k++) {
                        var takenSeat = sectionTakenSeats[k];
                        var takenSeatId = sectionType + "-" + takenSeat.row + "-" + takenSeat.column;
                        if (takenSeatId == seatId) {
                            taken = true;
                            break;
                        }
                    }
                    var seat = Alloy.createModel("Seat", {
                        row: i,
                        col: j,
                        section: sectionType
                    });
                    renderSeat(top, left, seat, taken, seatId);
                }
            }
        }
        function renderColumnRowIndicator(top, left, index) {
            var colView = Titanium.UI.createView({
                top: top,
                left: left,
                height: SEAT_SIZE,
                width: SEAT_SIZE
            });
            var label = Titanium.UI.createLabel({
                text: index,
                color: "#0B243B"
            });
            colView.add(label);
            $.seatsContainer.add(colView);
        }
        function renderSeat(top, left, seat, taken, id) {
            var seatView = Titanium.UI.createView({
                top: top,
                left: left,
                backgroundColor: taken ? "#B40404" : "#000000",
                height: SEAT_SIZE,
                width: SEAT_SIZE,
                id: id,
                seat: seat,
                taken: taken
            });
            seatView.addEventListener("click", function(e) {
                var selectedSeatView = e.source;
                if (!selectedSeatView.taken) if (selectedSeatView.takenByMe) releaseSeat(selectedSeatView); else if (seatCount > selectedSeatsViews.length) selectSeat(selectedSeatView); else {
                    releaseSeat(selectedSeatsViews[0]);
                    selectSeat(selectedSeatView);
                }
            });
            $.seatsContainer.add(seatView);
        }
        function removeExtraSeats() {
            if (selectedSeatsViews.length > seatCount) for (var i = selectedSeatsViews.length; selectedSeatsViews.length > seatCount; i--) releaseSeat(selectedSeatsViews[i - 1]);
        }
        function selectSeat(seatView) {
            selectedSeatsViews.push(seatView);
            seatView.setBackgroundColor("#0B610B");
            seatView.takenByMe = true;
        }
        function releaseSeat(seatView) {
            for (var i = 0; selectedSeatsViews.length > i; i++) if (selectedSeatsViews[i].id == seatView.id) {
                selectedSeatsViews[i].setBackgroundColor("#000000");
                seatView.takenByMe = false;
                var updatedSelectedSeats = _.without(selectedSeatsViews, seatView);
                selectedSeatsViews = updatedSelectedSeats;
                break;
            }
        }
        function openSeatsCountView() {
            var selectedValue;
            var seatsView = Ti.UI.createWindow({
                title: "How many seats?",
                layout: "vertical",
                backgroundColor: "#ffffff"
            });
            var readyButton = Ti.UI.createButton({
                title: "Ready",
                top: 5
            });
            readyButton.addEventListener("click", function() {
                seatCount = selectedValue;
                $.seatCountButton.setTitle(seatCount + " Seats");
                removeExtraSeats();
                seatsView.close();
            });
            var seatsPicker = Ti.UI.createPicker();
            seatsPicker.addEventListener("change", function(e) {
                selectedValue = e.row.data;
            });
            var data = [];
            data[0] = Ti.UI.createPickerRow({
                title: "1",
                data: "1"
            });
            data[1] = Ti.UI.createPickerRow({
                title: "2",
                data: "2"
            });
            data[2] = Ti.UI.createPickerRow({
                title: "3",
                data: "3"
            });
            data[3] = Ti.UI.createPickerRow({
                title: "4",
                data: "4"
            });
            seatsPicker.add(data);
            seatsPicker.setSelectedRow(0, seatCount - 1, false);
            seatsPicker.selectionIndicator = true;
            seatsView.add(seatsPicker);
            seatsView.add(readyButton);
            seatsView.open({
                modal: true
            });
        }
        function buyTickets() {
            if (selectedSeatsViews.length) {
                var selectedSeats = new Array();
                for (var i = 0; selectedSeatsViews.length > i; i++) {
                    var seat = selectedSeatsViews[i].seat;
                    selectedSeats.push(seat);
                }
                var buyTicketsViewController = Alloy.createController("BuyTicketsView", {
                    selectedSeats: selectedSeats,
                    showtime: showtime,
                    movie: movie
                });
                context.openNewWindow(buyTicketsViewController.getView());
            } else alert("Select at least one seat.");
        }
        var SEAT_SIZE = 25;
        var SPACE_BETWEEN_SEATS = 2;
        var seatCount = 2;
        var selectedSeatsViews;
        var showtime;
        var movie;
        var context;
        var colsRendered;
        this.initialize = function(args) {
            this.initializeView($.selectSeatsViewWindow);
            this.showActivityIndicator("Loading Seats...");
            context = this;
            colsRendered = false;
            showtime = args.showtime;
            movie = args.movie;
            selectedSeatsViews = new Array();
            renderShowtimeView(showtime);
            $.seatCountButton.setTitle(seatCount + " Seats");
            $.seatCountButton.addEventListener("click", openSeatsCountView);
            $.buyTicketsButton.addEventListener("click", buyTickets);
        };
    };
    SelectSeatsViewController.prototype = new BaseViewController();
    var args = arguments[0] || {};
    var controller = new SelectSeatsViewController();
    controller.initialize(args);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;