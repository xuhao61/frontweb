var TheatersTableViewController = function (){

	var TheaterService = require('services/TheaterService');
	var context;
	
	/*
	 * Initialize the view
	 */
	this.initialize = function() {
		if(!TEST_MODE){
			this.initializeView($.index);
			context = this;
			context.showActivityIndicator('loading Theaters...');				
			
			$.index.open();
			
			var theaterService = new TheaterService();
			theaterService.call( onTheatersLoaded, onLoadFail);
		} else {
			runTests();
		}
	};
	
	/*
	 * Theaters loaded successfully
	 */
	function onTheatersLoaded( theaters) {
		if(theaters.length) {
			
			var rows = new Array();
			for (var i = 0; theaters.length > i; i++){
				var theater = theaters[i];
		        row = Ti.UI.createTableViewRow({
		            title: theater.get("name"),
		            id: theater.get("id"),
		            hasChild: true,
		            height: 70,
		            font: {
		                fontWeight: "bold",
		                color:"#000000",
		                fontSize: 20
		            }
		        });
		        
		        rows.push(row);
		    }
			
			$.tableView.addEventListener("click", openMoviesView);
			$.tableView.setData(rows);
		} else {
			Util.addNoDataMessage($.tableView, 'Error ocurred.');
		}
		
		context.hideActivityIndicator();
	};
	
	/*
	 * Opens the MoviesTableView for the selected theater
	 */
	function openMoviesView(e) {
		var theaterId = e.row.id;
		var moviesTableViewController = Alloy.createController('MoviesTableView', {theaterId:theaterId});
		context.openNewWindow(moviesTableViewController.getView());
	
	}
	
	/*
	 * Theaters load failed
	 */
	function onLoadFail( error ) {
		alert(error);
		context.hideActivityIndicator();
		Util.addNoDataMessage($.tableView, 'Error ocurred.');
	}
};
TheatersTableViewController.prototype = new BaseViewController();

var theatersTableViewcontroller = new TheatersTableViewController();
theatersTableViewcontroller.initialize();