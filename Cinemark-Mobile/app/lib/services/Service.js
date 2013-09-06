function Service() {
	
	//var BASE_URL = "http://172.17.227.225:8080/cinemark/";
	var BASE_URL = "http://promocinemark.herokuapp.com/";
	
	/*
	 * Make the http request
	 */
	this.call = function(url, method, _parseFc, _failCallback) {
		
		var httpClient = Titanium.Network.createHTTPClient();
		httpClient.onload = function(response) {
			_parseFc(this.responseText);
		};
		
		httpClient.onerror = function(e) {
			if( _failCallback ) _failCallback(e);
		};
		
		httpClient.open(method,BASE_URL + url);
		httpClient.setRequestHeader('Content-Type', 'application/json');
		httpClient.send();
	};	
	
}

module.exports = Service;
