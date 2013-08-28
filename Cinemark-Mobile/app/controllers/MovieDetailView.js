var args = arguments[0] || {};
var title = args.movie.attributes.name;
var description = args.movie.attributes.description;
var videoUrl = args.movie.attributes.trailerUrl;

function initialize() {
	$.title.setText(title);
	$.description.setText(description);
	
	$.thrillerBtn.addEventListener("click", openVideo);
	$.selectSeatsBtn.addEventListener("click", openSelectSeats);
}

function openSelectSeats() {
	var selectSeatsViewController = Alloy.createController('SelectSeatsView', {showtimeId:"1"});
	selectSeatsViewController.getView().open();
}

function openVideo() {
	Ti.Platform.openURL(videoUrl);
}

initialize();