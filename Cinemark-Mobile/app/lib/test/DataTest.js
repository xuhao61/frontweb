Titanium.include("TitaniumUnity.js");
var TheaterService = require('services/TheaterService');
var MoviesService = require('services/MoviesService');
var ShowtimeService = require('services/ShowtimeService');
var theaters;
var movies;
var showtimes;
 
var DataTestSuite = {
 
    suiteName: "Cinemark Mobile Unit Test",
 
    setUp: function() {
    },
 
    tearDown: function() {
    },
 
 
    testTheaters: function() {
    	return jsUnity.assertions.assertNotNull(theaters);
    },
    
    testMovies: function() {
    	return jsUnity.assertions.assertNotNull(movies);
    },
    
    testShowtimes: function() {
    	return jsUnity.assertions.assertNotNull(showtimes);
    }
};

/*
 * Make all the application flow
 * and save the data. Once the data is loaded
 * we run the tests.
 */
function getDataReady(callback) {
	var theaterService = new TheaterService();

	var onTheatersLoaded = function(result) {
		theaters = result;
		var moviesService = new MoviesService();
		var onMoviesLoaded = function(result) {

			movies = result;
			var showtimeService = new ShowtimeService();
			var onShowtimeLoaded = function(result) {
				showtimes = result;
				callback();
			};
			showtimeService.call( movies[0].id, theaters[0].get('id'), onShowtimeLoaded );
		};
		moviesService.call( theaters[0].get('id'), onMoviesLoaded );
	};
	theaterService.call( onTheatersLoaded );
}
