function ShowtimeService() {
    var Service = require("services/Service");
    var _successCallback = null;
    new Service();
    this.call = function(showtimeId, successCallback) {
        _successCallback = successCallback;
        var response = '{"left":{"rows":"30","cols":"4","takenSeats":[{"row":"1","col":"3"}]},"center":{"rows":"30","cols":"15","takenSeats":[{"row":"2","col":"5"}]},"right":{"rows":"30","cols":"4","takenSeats":[{"row":"6","col":"2"}]}}';
        _parseResponse(response);
    };
    var _parseResponse = function(response) {
        var parsedResponse = JSON.parse(response);
        var left = Alloy.createModel("Section", parsedResponse.left);
        var center = Alloy.createModel("Section", parsedResponse.center);
        var right = Alloy.createModel("Section", parsedResponse.right);
        var showtime = Alloy.createModel("Showtime", {
            left: left,
            center: center,
            right: right
        });
        _successCallback(showtime);
    };
}

module.exports = ShowtimeService;