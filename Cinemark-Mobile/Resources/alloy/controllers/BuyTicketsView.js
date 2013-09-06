function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.buyTicketsViewWindow = Ti.UI.createWindow({
        navBarHidden: "false",
        backgroundColor: "#ffffff",
        id: "buyTicketsViewWindow",
        title: "Buy Tickets"
    });
    $.__views.buyTicketsViewWindow && $.addTopLevelView($.__views.buyTicketsViewWindow);
    $.__views.__alloyId1 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId1"
    });
    $.__views.buyTicketsViewWindow.add($.__views.__alloyId1);
    $.__views.infoLabel = Ti.UI.createLabel({
        color: "#0B3861",
        font: {
            fontWeight: "bold",
            fontSize: 20
        },
        id: "infoLabel"
    });
    $.__views.__alloyId1.add($.__views.infoLabel);
    $.__views.emailInput = Ti.UI.createTextField({
        hintText: "Email",
        id: "emailInput",
        borderColor: "#336699",
        width: "250",
        top: "5",
        keyboardType: Titanium.UI.KEYBOARD_EMAIL
    });
    $.__views.__alloyId1.add($.__views.emailInput);
    $.__views.dniInput = Ti.UI.createTextField({
        hintText: "DNI",
        id: "dniInput",
        borderColor: "#336699",
        width: "250",
        top: "5",
        keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD
    });
    $.__views.__alloyId1.add($.__views.dniInput);
    $.__views.creditCardNumber = Ti.UI.createTextField({
        hintText: "Credit Card Number",
        id: "creditCardNumber",
        borderColor: "#336699",
        width: "250",
        top: "5",
        keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD
    });
    $.__views.__alloyId1.add($.__views.creditCardNumber);
    $.__views.creditCardButton = Ti.UI.createButton({
        title: "Set Credit Card Type",
        id: "creditCardButton",
        top: "5"
    });
    $.__views.__alloyId1.add($.__views.creditCardButton);
    $.__views.buyButton = Ti.UI.createButton({
        title: "Buy!",
        id: "buyButton"
    });
    $.__views.__alloyId1.add($.__views.buyButton);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var BuyTicketsViewController = function() {
        function openCreditCardView() {
            var creditCardView = Ti.UI.createWindow({
                title: "Credit Card",
                layout: "vertical",
                backgroundColor: "#ffffff"
            });
            var readyButton = Ti.UI.createButton({
                title: "Ready"
            });
            readyButton.addEventListener("click", function() {
                creditCardView.close();
            });
            var creditCardPicker = Ti.UI.createPicker();
            creditCardPicker.addEventListener("change", function() {});
            var data = [];
            data[0] = Ti.UI.createPickerRow({
                title: "AMEX",
                data: "1"
            });
            data[1] = Ti.UI.createPickerRow({
                title: "Cabal",
                data: "2"
            });
            data[2] = Ti.UI.createPickerRow({
                title: "Mastercard",
                data: "3"
            });
            data[3] = Ti.UI.createPickerRow({
                title: "VISA",
                data: "4"
            });
            creditCardPicker.add(data);
            creditCardPicker.setSelectedRow(0, 0, false);
            creditCardPicker.selectionIndicator = true;
            creditCardView.add(creditCardPicker);
            creditCardView.add(readyButton);
            creditCardView.open({
                modal: true
            });
        }
        function buyTickets() {
            if ("" != $.emailInput.value && "" != $.dniInput.value && "" != $.creditCardNumber.value && Util.isEmail($.emailInput.value)) {
                context.showActivityIndicator("Making payment...");
                paymentService = new PaymentService();
                paymentService.call(showtime.id, selectedSeats, $.emailInput.value, $.dniInput.value, paymentComplete, paymentFail);
            } else alert("Fill the fields with correct values.");
        }
        function paymentComplete(response) {
            context.hideActivityIndicator();
            var alertDialog = Ti.UI.createAlertDialog({
                title: "Payment Complete",
                message: "Your confirmation code is " + response.code,
                buttonNames: [ "OK" ]
            });
            alertDialog.addEventListener("click", function() {
                var indexViewController = Alloy.createController("index");
                context.openNewWindow(indexViewController.getView());
            });
            alertDialog.show();
        }
        function paymentFail(e) {
            context.hideActivityIndicator();
            alert(e.error);
        }
        var PaymentService = require("services/PaymentService");
        var selectedSeats;
        var showtime;
        var movie;
        var context;
        var paymentService;
        this.initialize = function(args) {
            this.initializeView($.buyTicketsViewWindow);
            context = this;
            selectedSeats = args.selectedSeats;
            showtime = args.showtime.attributes;
            var time = showtime.schedule.attributes.time;
            movie = args.movie;
            var seatsString = selectedSeats.length > 1 ? "Seats" : "Seat";
            $.infoLabel.setText(selectedSeats.length + " " + seatsString + " for " + movie.title + " at " + time);
            $.creditCardButton.addEventListener("click", openCreditCardView);
            $.buyButton.addEventListener("click", buyTickets);
        };
    };
    BuyTicketsViewController.prototype = new BaseViewController();
    var args = arguments[0] || {};
    var controller = new BuyTicketsViewController();
    controller.initialize(args);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;