var MovieDetailViewController = function() {

	var ShowtimeService = require('services/ShowtimeService');
	var context;
	var movie;
	var theaterId;
	var seatCount;
	var showtimeService
	/*
	 * Initialize the view
	 */
	this.initialize = function(args) {
		this.initializeView($.movieDetailViewWindow);
		this.showActivityIndicator("Loading Movie Details...");
		
		context = this;
		movie = args.movie.attributes;
		description = movie.summary;
		videoUrl = movie.trailerUrl;
		theaterId = args.theaterId;
		
		showtimeService = new ShowtimeService();
		showtimeService.call( movie.id, theaterId, onShowtimeLoaded, onLoadFail );
		
		var cinemaTypeString = movie.cinemaType == "XD" || movie.cinemaType == "3D" ? ' ('+movie.cinemaType+')' : '';  
		
		$.title.setText(movie.title + cinemaTypeString);
		$.description.setValue(movie.summary);
		$.movieImage.setImage(movie.picUrl);
		$.infoLabel.setText(movie.genre + " - Director: " + movie.director);
		$.thrillerBtn.addEventListener("click", openVideo);
	};
	
	/*
	 * The showtimes loaded with success
	 */
	function onShowtimeLoaded(showtimes) {
		if(showtimes.length){
			for(var i=0; i<showtimes.length; i++) {
				renderShowtimeButton(showtimes[i]);
			}
		} else {
			$.selectShowtimeLabel.setVisible(false);
			alert('No showtimes for this Movie in this Theater.');
		}
		context.hideActivityIndicator();
	}
	
	/*
	 * Showtime load failed
	 */
	function onLoadFail(e) {
		context.hideActivityIndicator();
		alert(e.error);
	}
	
	/*
	 * Render a showtime button
	 */
	function renderShowtimeButton(showtime) {
		var showtimeBtn = Titanium.UI.createView({
		 	backgroundColor: '#CCCCCC',
		  	height:50,
		  	width:50,
		  	showtime:showtime,
		  	borderColor:"#0B6121",
			borderWidth:"4",
			borderRadius:"4"
		});
		var showtimeLabel = Titanium.UI.createLabel({
			text: showtime.get('schedule').get('time'),
			color: '#000000',
			showtime:showtime
		});
		
		showtimeBtn.addEventListener('click', openShowtimeView);
		showtimeBtn.add(showtimeLabel);
		$.showtimesContainer.add(showtimeBtn);
		
		//Add separator view for margin between view
		var separator = Titanium.UI.createView({
		  	height:50,
		  	width:5
		});
		$.showtimesContainer.add(separator);
	}
	
	/*
	 * Opens the showtime view
	 */
	function openShowtimeView(e) {
		var showtime = e.source.showtime;
		var selectSeatsViewController = Alloy.createController('SelectSeatsView', {showtime:showtime, movie:movie});
		context.openNewWindow(selectSeatsViewController.getView());
	}
	
	/*
	 * Opens an url with a video
	 */
	function openVideo() {
		Titanium.Platform.openURL(movie.trailerUrl);
	}
};
MovieDetailViewController.prototype = new BaseViewController();

var args = arguments[0] || {};
var controller = new MovieDetailViewController();
controller.initialize(args);