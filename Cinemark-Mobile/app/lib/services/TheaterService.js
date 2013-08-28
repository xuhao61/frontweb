function TheaterService() {
	
	var Service = require('services/Service');
	var _successCallback = null;
	var _service = new Service();
	var _serviceName = "getTheater";
	
	this.call = function( successCallback, failCallback ) {
		_successCallback = successCallback;
	    //_service.call( _url, _parseResponse, failCallback );
	    var response = '{"theaters":[{"id":"1", "name":"Village Mendoza"}, {"id":"2", "name":"Village Cordoba"}, {"id":"3", "name":"Village Buenos Aires"}]}';
	    _parseResponse( response );
	};
	
	var _parseResponse = function( response ) {
		var parsedResponse = JSON.parse(response);
		var theaters = new Array();
		for(var i=0; i<parsedResponse.theaters.length; i++) {
			theaters.push( Alloy.createModel('Theater', parsedResponse.theaters[i]) );
		}
		_successCallback( theaters );
	};

}

module.exports = TheaterService;