function Service() {
    var BASE_URL = "http://promocinemark.herokuapp.com/";
    this.call = function(url, method, _parseFc, _failCallback) {
        var httpClient = Titanium.Network.createHTTPClient();
        httpClient.onload = function() {
            _parseFc(this.responseText);
        };
        httpClient.onerror = function(e) {
            _failCallback && _failCallback(e);
        };
        httpClient.open(method, BASE_URL + url);
        httpClient.setRequestHeader("Content-Type", "application/json");
        httpClient.send();
    };
}

module.exports = Service;