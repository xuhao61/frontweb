function MoviesService() {
	
	var Service = require('services/Service');
	var _successCallback = null;
	var _service = new Service();
	var _serviceName;
	
	this.call = function( theaterId, successCallback, failCallback) {
		_serviceName = "resources/theaters/"+ theaterId +"/movies";
		_successCallback = successCallback;
	    _service.call( _serviceName, 'GET', _parseResponse, failCallback);
	};
	
	var _parseResponse = function( response ) {
		var movies = new Array();
		try {
			var parsedResponse = JSON.parse(response);
			for(var i=0; i<parsedResponse.length; i++) {
				movies.push( Alloy.createModel('Movie', parsedResponse[i]) );
			}
		} catch(e) { }
		_successCallback( movies );
	};

}

module.exports = MoviesService;