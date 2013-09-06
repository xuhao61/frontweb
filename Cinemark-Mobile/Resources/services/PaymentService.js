function PaymentService() {
    var Service = require("services/Service");
    var _successCallback = null;
    var _service = new Service();
    var _serviceName;
    this.call = function(showtimeId, seats, email, dni, successCallback, failCallback) {
        var seatsString = "";
        for (var i = 0; seats.length > i; i++) seatsString += "&seat=" + seats[i].get("row") + "," + seats[i].get("col") + "," + seats[i].get("section");
        _serviceName = "resources/payments?schedule=" + showtimeId + "&email=" + email + "&dni=" + dni + seatsString;
        _successCallback = successCallback;
        _service.call(_serviceName, "POST", _parseResponse, failCallback);
    };
    var _parseResponse = function(response) {
        var parsedResponse = JSON.parse(response);
        _successCallback(parsedResponse);
    };
}

module.exports = PaymentService;