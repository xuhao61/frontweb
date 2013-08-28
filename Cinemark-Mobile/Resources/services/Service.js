function Service() {
    var BASE_URL = "";
    this.call = function(url, parseFc, failCallback) {
        Ti.App.addEventListener("doCall", _doCall);
        Ti.App.fireEvent("doCall", {
            url: url,
            parseFc: parseFc,
            failCallback: failCallback
        });
    };
    var _doCall = function(e) {
        var url = e.url;
        var parseFc = e.parseFc;
        var failCallback = e.failCallback;
        var httpClient = Titanium.Network.createHTTPClient();
        httpClient.open("GET", BASE_URL + url);
        httpClient.onload = function() {
            parseFc(this.responseData);
        };
        httpClient.onerror = function(e) {
            failCallback && failCallback(e);
        };
        httpClient.send();
    };
}

module.exports = Service;