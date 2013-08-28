function MoviesService() {
	
	var Service = require('services/Service');
	var _successCallback = null;
	var _service = new Service();
	var _serviceName = "getMovies";
	
	this.call = function( theaterId, successCallback, failCallback ) {
		_successCallback = successCallback;
	    //_service.call( _url, _parseResponse, failCallback );
	    var response = '{"movies":[{"id":"1", "thumbnail": "http://images.crocs.com/is/image/Crocs/thumbnail/Superman-Logo-_3000011-00220-0001_001_IS.jpg", "description":"Description goes here", "name":"Peli 1", "trailerUrl": "http://www.youtube.com/watch?v=a0p7YDpsCQc"}, {"id":"3", "name":"Peli 3", "description":"Description goes here", "trailerUrl":"http://www.youtube.com/watch?v=a0p7YDpsCQc", "thumbnail": "http://images.crocs.com/is/image/Crocs/thumbnail/Superman-Logo-_3000011-00220-0001_001_IS.jpg"}]}';
	    _parseResponse( response );
	};
	
	var _parseResponse = function( response ) {
		var parsedResponse = JSON.parse(response);
		var movies = new Array();
		for(var i=0; i<parsedResponse.movies.length; i++) {
			movies.push( Alloy.createModel('Movie', parsedResponse.movies[i]) );
		}
		_successCallback( movies );
	};

}

module.exports = MoviesService;