var ShowtimeService = require('services/ShowtimeService');
var args = arguments[0] || {};

var SEAT_SIZE = 25;
var SPACE_BETWEEN_SEATS = 2;
var AISLE_SIZE = 6;

function initialize() {
	var showtimeId = args.showtimeId;
	var showtimeService = new ShowtimeService();
	showtimeService.call( showtimeId, onShowtimeLoaded, onLoadFail );
}

function onShowtimeLoaded(showtime) {
	var sections = ["left", "center", "right"];
	var top = 0;
	for(var i=0; i<sections.length; i++) {
		renderSection(showtime.get(sections[i]), top, sections[i]);
		top += parseInt(showtime.get(sections[i]).get("cols")) * (SEAT_SIZE+SPACE_BETWEEN_SEATS) + 6;
	}
}

function renderSection(section, sectionTop, sectionType) {
	var sectionContainer = Ti.UI.createView();
	var sectionTakenSeats = section.get('takenSeats');
	var rows = parseInt(section.get("rows"));
	var cols = parseInt(section.get("cols"));
	var top = sectionTop;
	var left = 0;
	for(var i=0; i<rows; i++){
		left += (SEAT_SIZE+SPACE_BETWEEN_SEATS);
		top = sectionTop;
		for(var j=0; j<cols; j++) {
			top += (SEAT_SIZE+SPACE_BETWEEN_SEATS);
			var seatId = sectionType+"-"+i+"-"+j;
			var taken = false;
			for(var k=0; k<sectionTakenSeats.lenght; k++) {
				var takenSeat = sectionTakenSeats[k];
				var takenSeatId = sectionType+"-"+takenSeat.row+"-"+takenSeat.col;
				if(takenSeatId == seatId) {
					taken = true;
					break;
				}
			}
			renderSeat(top, left, seatId, taken);
		}
	}
}

function renderSeat(top, left, id, taken) {
	var path = Titanium.Filesystem.resourcesDirectory + Titanium.Filesystem.separator;
	var seat = Titanium.UI.createView({
		top:top,
		left:left,
	 	backgroundColor: taken ? '#CCCCCC' : '#000000',
	  	height:SEAT_SIZE,
	  	width:SEAT_SIZE,
	  	id:id
	});
	$.seatsContainer.add(seat);
}

function markTakenSeats(takenSeats, sectionType) {
	for(var i=0; i<takenSeats.length; i++) {
		var seat = takenSeats[i];
		var seatView = Util.findById($.seatsContainer, sectionType+"-"+seat.row+"-"+seat.col);
		alert(sectionType+"-"+seat.row+"-"+seat.col);
	}
	
}

function onLoadFail(e) {
	alert(e);
}

initialize();
