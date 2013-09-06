var MoviesTableViewController = function() {

	var MoviesService = require('services/MoviesService');
	var theaterId;
	var context;
	var moviesService
	
	/*
	 * Initialize the view
	 */
	this.initialize = function(args) {
		this.initializeView($.moviesTableViewWindow);
		this.showActivityIndicator('Loading Movies...');
		
		context = this;
		theaterId = args.theaterId;
		
		moviesService = new MoviesService();
		moviesService.call( theaterId, onMoviesLoaded, onLoadFail );
	};
	
	/*
	 * Movies loaded successfully
	 */
	function onMoviesLoaded(movies) {
		if( movies.length ){
		    var rows = new Array();
		    for (var i = 0; movies.length > i; i++) {
		        var movie = movies[i];
		        var image;
		        if(movie.get('cinemaType') == "3D") {
		        	 image = 'http://i00.i.aliimg.com/wsphoto/v2/442811884_2/3D-Glasses-Sunglasses-movie-Gave-Glasses-3D-TV-Glasses-1000pcs.jpg_50x50.jpg';
		        } else if(movie.get('cinemaType') == "XD") {
		        	image = 'http://www.cinemark.com/media/104710/icon_50_xd.png';
		        } else {
		        	image = 'http://cdn4.iconfinder.com/data/icons/SUPERVISTA/multimedia/png/128/video.png';
		        }
		        var row = Ti.UI.createTableViewRow({
		            movie: movie,
		            hasChild: true,
		            height: 70,
		        });
		        var label = Ti.UI.createLabel({
		        	text: movie.get("title"),
		        	left:60,
		        	font: {
		                fontWeight: "bold",
		                color:"#000000",
		                fontSize: 20
		           },
		           movie: movie,
		        });
		        var imageView = Ti.UI.createImageView({
				    image:image,
				    top:10,
				    left:5,
				    width:48,
				    preventDefaultImage:true,
				    movie: movie,
				});
				row.add(label);
				row.add(imageView);
		        rows.push(row);
		    }
		    context.hideActivityIndicator();
		    $.moviesTableView.addEventListener("click", openShowView);
		    $.moviesTableView.setData(rows);
		} else {
			Util.addNoDataMessage($.moviesTableView, 'No Movies for this Theater');
			context.hideActivityIndicator();
		}
	}
	
	/*
	 * Movies load failed
	 */
	function onLoadFail( error ) {
		context.hideActivityIndicator();
		alert(error.error);
		Util.addNoDataMessage($.moviesTableView, 'Error ocurred.');
	}
	
	/*
	 * Opens the Movie Detail view
	 */
	function openShowView(e) {
		var movie = e.rowData.movie;
		var movieDetailViewController = Alloy.createController('MovieDetailView', {movie:movie, theaterId:theaterId});
		context.openNewWindow(movieDetailViewController.getView());
	}
	
};
MoviesTableViewController.prototype = new BaseViewController();

var args = arguments[0] || {};
var controller = new MoviesTableViewController();
controller.initialize(args);