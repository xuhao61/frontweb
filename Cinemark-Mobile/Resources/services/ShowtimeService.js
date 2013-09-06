function ShowtimeService() {
    var Service = require("services/Service");
    var _successCallback = null;
    var _service = new Service();
    var _serviceName;
    this.call = function(movieId, theaterId, successCallback, failCallback) {
        _serviceName = "resources/showTimes?movie=" + movieId + "&theater=" + theaterId;
        _successCallback = successCallback;
        _service.call(_serviceName, "GET", _parseResponse, failCallback);
    };
    var _parseResponse = function(response) {
        var showtimes = new Array();
        try {
            var parsedResponse = JSON.parse(response);
            for (var i = 0; parsedResponse.length > i; i++) {
                var left = Alloy.createModel("Section", parsedResponse[i].left);
                var center = Alloy.createModel("Section", parsedResponse[i].center);
                var right = Alloy.createModel("Section", parsedResponse[i].right);
                var schedule = Alloy.createModel("Schedule", parsedResponse[i].schedules);
                var id = parsedResponse[i].id;
                var showtime = Alloy.createModel("Showtime", {
                    left: left,
                    center: center,
                    right: right,
                    schedule: schedule,
                    id: id
                });
                showtimes.push(showtime);
            }
        } catch (e) {}
        _successCallback(showtimes);
    };
}

module.exports = ShowtimeService;