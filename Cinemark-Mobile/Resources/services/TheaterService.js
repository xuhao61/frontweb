function TheaterService() {
    var Service = require("services/Service");
    var _successCallback = null;
    new Service();
    this.call = function(successCallback) {
        _successCallback = successCallback;
        var response = '{"theaters":[{"id":"1", "name":"Village Mendoza"}, {"id":"2", "name":"Village Cordoba"}, {"id":"3", "name":"Village Buenos Aires"}]}';
        _parseResponse(response);
    };
    var _parseResponse = function(response) {
        var parsedResponse = JSON.parse(response);
        var theaters = new Array();
        for (var i = 0; parsedResponse.theaters.length > i; i++) theaters.push(Alloy.createModel("Theater", parsedResponse.theaters[i]));
        _successCallback(theaters);
    };
}

module.exports = TheaterService;