var MoviesService = require('services/MoviesService');
var args = arguments[0] || {};
var theaterId;

function initialize() {
	theaterId = args.theaterId;
	var moviesService = new MoviesService();
	moviesService.call( theaterId, onMoviesLoaded, onLoadFail );
}

/*
 * Movies loaded successfully
 */
function onMoviesLoaded(movies) {
    var rows = new Array();
    for (var i = 0; movies.length > i; i++) {
        var movie = movies[i];
        var row = Ti.UI.createTableViewRow({
            leftImage: movie.get("thumbnail"),
            title: movie.get("name"),
            movie: movie,
            hasChild: true,
            height: 50
        });
        rows.push(row);
    }
    $.moviesTableView.addEventListener("click", openShowView);
    $.moviesTableView.setData(rows);
}

function openShowView(e) {
	var movie = e.rowData.movie;
	var movieDetailViewController = Alloy.createController('MovieDetailView', {movie:movie});
	movieDetailViewController.getView().open();
}

/*
 * Movies load failed
 */
function onLoadFail( error ) {
	alert(error);
}

initialize();