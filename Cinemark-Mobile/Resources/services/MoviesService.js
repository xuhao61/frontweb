function MoviesService() {
    var Service = require("services/Service");
    var _successCallback = null;
    new Service();
    this.call = function(theaterId, successCallback) {
        _successCallback = successCallback;
        var response = '{"movies":[{"id":"1", "thumbnail": "http://images.crocs.com/is/image/Crocs/thumbnail/Superman-Logo-_3000011-00220-0001_001_IS.jpg", "description":"Description goes here", "name":"Peli 1", "trailerUrl": "http://www.youtube.com/watch?v=a0p7YDpsCQc"}, {"id":"3", "name":"Peli 3", "description":"Description goes here", "trailerUrl":"http://www.youtube.com/watch?v=a0p7YDpsCQc", "thumbnail": "http://images.crocs.com/is/image/Crocs/thumbnail/Superman-Logo-_3000011-00220-0001_001_IS.jpg"}]}';
        _parseResponse(response);
    };
    var _parseResponse = function(response) {
        var parsedResponse = JSON.parse(response);
        var movies = new Array();
        for (var i = 0; parsedResponse.movies.length > i; i++) movies.push(Alloy.createModel("Movie", parsedResponse.movies[i]));
        _successCallback(movies);
    };
}

module.exports = MoviesService;