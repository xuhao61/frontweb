var TheaterService = require('services/TheaterService');

function initialize() {
	var theaterService = new TheaterService();
	theaterService.call( onTheatersLoaded, onLoadFail );
}

/*
 * Theaters loaded successfully
 */
function onTheatersLoaded( theaters ) {
	var rows = new Array();
	for (var i = 0; theaters.length > i; i++){
		var theater = theaters[i];
        row = Ti.UI.createTableViewRow({
            title: theater.get("name"),
            id: theater.get("id"),
            font: {
                fontWeight: "bold",
                color:"#000000"
            }
        });
        
        rows.push(row);
    }
	
	$.tableView.addEventListener("click", openMoviesView);
	$.tableView.setData(rows);
}

/*
 * Opens the MoviesTableView for the selected theater
 */
function openMoviesView(e) {
	var theaterId = e.row.id;
	var moviesTableViewController = Alloy.createController('MoviesTableView', {theaterId:theaterId});
	moviesTableViewController.getView().open({animated:true});

}

/*
 * Theaters load failed
 */
function onLoadFail( error ) {
	alert(error);
}

initialize();