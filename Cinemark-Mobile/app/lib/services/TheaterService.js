function TheaterService() {
	
	var Service = require('services/Service');
	var _successCallback = null;
	var _service = new Service();
	var _serviceName = "resources/theaters/";
	
	this.call = function( successCallback, failCallback) {
		_successCallback = successCallback;
	    _service.call( _serviceName, 'GET', _parseResponse, failCallback);
	};
	
	var _parseResponse = function( response ) {
		var theaters = new Array();
		try {
			var parsedResponse = JSON.parse(response);
			for(var i=0; i<parsedResponse.length; i++) {
				theaters.push( Alloy.createModel('Theater', parsedResponse[i]) );
			}
		} catch(e){};
		_successCallback( theaters );
	};

}

module.exports = TheaterService;