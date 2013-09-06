var SelectSeatsViewController = function() {
	
	var SEAT_SIZE = 25;
	var SPACE_BETWEEN_SEATS = 2;
	var AISLE_SIZE = 6;
	
	var seatCount = 2;
	var selectedSeatsViews;
	var showtime;
	var movie
	var context;
	var colsRendered;
	
	/*
	 * Initialize the view
	 */
	this.initialize = function(args) {
		this.initializeView($.selectSeatsViewWindow);
		this.showActivityIndicator('Loading Seats...');
		context = this;
		colsRendered = false;
		showtime = args.showtime;
		movie = args.movie;
		selectedSeatsViews = new Array();
		renderShowtimeView(showtime);
		$.seatCountButton.setTitle(seatCount + ' Seats');
		$.seatCountButton.addEventListener('click', openSeatsCountView);
		$.buyTicketsButton.addEventListener('click', buyTickets);
	};
	
	/*
	 * Render the showtime
	 */
	function renderShowtimeView(showtime) {
		var sections = ["left", "center", "right"];
		var top = 0;
		for(var i=0; i<sections.length; i++) {
			renderSection(showtime.get(sections[i]), top, sections[i], !colsRendered);
			if (parseInt(showtime.get(sections[i]).get("rows")) > 0 && parseInt(showtime.get(sections[i]).get("cols")) > 0 ) {
				colsRendered = true;
				top += parseInt(showtime.get(sections[i]).get("cols")) * (SEAT_SIZE+SPACE_BETWEEN_SEATS) + 6;
			}
		}
		context.hideActivityIndicator();
	};
	
	/*
	 * render each section
	 */
	function renderSection(section, sectionTop, sectionType, renderCols) {
		var sectionContainer = Ti.UI.createView();
		var sectionTakenSeats = section.get('takenSeats');
		var rows = parseInt(section.get("rows"));
		var cols = parseInt(section.get("cols"));
		var top = sectionTop;
		var left = 0;
		for(var i=rows; i>0; i--){
			left += (SEAT_SIZE+SPACE_BETWEEN_SEATS);
			top = sectionTop;
			
			if(renderCols) {
				renderColumnRowIndicator(top, left, i);
			}
			
			for(var j=0; j<cols; j++) {
				top += (SEAT_SIZE+SPACE_BETWEEN_SEATS);				
				var seatId = sectionType+"-"+i+"-"+j;
				var taken = false;
				if(i==rows) {
					renderColumnRowIndicator(top, 0, j+1);
				}
				
				for(var k=0; k<sectionTakenSeats.length; k++) {
					var takenSeat = sectionTakenSeats[k];
					var takenSeatId = sectionType + "-" + takenSeat.row + "-" + takenSeat.column;
					if(takenSeatId == seatId) {
						taken = true;
						break;
					}
				}
				var seat = Alloy.createModel("Seat", {row:i, col:j, section:sectionType});
				renderSeat(top, left, seat, taken, seatId);
			}
		}
	}
	
	/*
	 * Render the column and row number indicators
	 */
	function renderColumnRowIndicator(top, left, index) {
		var colView = Titanium.UI.createView({
			top:top,
			left:left,
		  	height:SEAT_SIZE,
		  	width:SEAT_SIZE
		});
		
		var label = Titanium.UI.createLabel({
			text:index,
			color:"#0B243B"
		});
		
		colView.add(label);
		$.seatsContainer.add(colView);
	}
	
	function renderSeat(top, left, seat, taken, id) {
		var seatView = Titanium.UI.createView({
			top:top,
			left:left,
		 	backgroundColor: taken ? '#B40404' : '#000000',
		  	height:SEAT_SIZE,
		  	width:SEAT_SIZE,
		  	id:id,
		  	seat:seat,
		  	taken:taken
		});
	
		seatView.addEventListener('click', function(e){
			var selectedSeatView = e.source;
			if(!selectedSeatView.taken) {
				if(!selectedSeatView.takenByMe) {
					if(selectedSeatsViews.length < seatCount) {
						selectSeat(selectedSeatView);
					} else {
						releaseSeat(selectedSeatsViews[0]);
						selectSeat(selectedSeatView);
					}			
				} else {
					releaseSeat(selectedSeatView);
				}
			}	
		});
	
		$.seatsContainer.add(seatView);
	}
	
	/*
	 * Remove extra seats when the users update the quantity of seats,
	 * and the selected seats count is greater than that number
	 */
	function removeExtraSeats() {
		if( selectedSeatsViews.length > seatCount ) {
			for(var i=selectedSeatsViews.length; selectedSeatsViews.length>seatCount; i--) {
				releaseSeat(selectedSeatsViews[i-1]);
			}
		}
	}
	
	/*
	 * Select seat
	 */
	function selectSeat(seatView) {
		selectedSeatsViews.push(seatView);
		seatView.setBackgroundColor("#0B610B");
		seatView.takenByMe = true;
	}
	
	/*
	 * Release a selected seat
	 */
	function releaseSeat(seatView) {
		for(var i=0; i<selectedSeatsViews.length; i++) {
			if(selectedSeatsViews[i].id == seatView.id) {
				selectedSeatsViews[i].setBackgroundColor("#000000");
				seatView.takenByMe = false;
				var updatedSelectedSeats = _.without(selectedSeatsViews, seatView);
				selectedSeatsViews = updatedSelectedSeats;
				break; 
			}
		}	
	}
	
	/*
	 * Creates and open the seat count view
	 * for the user to select how many seats to buy.
	 */
	function openSeatsCountView(){
		
		var selectedValue;
		var seatsView = Ti.UI.createWindow({
			title: 'How many seats?', 
			layout: 'vertical',
			backgroundColor: '#ffffff'
		});
		
		var readyButton = Ti.UI.createButton({
			title : 'Ready',
			top:5
		});
	
		readyButton.addEventListener('click', function(e){
			seatCount = selectedValue;
			$.seatCountButton.setTitle(seatCount + ' Seats');
			removeExtraSeats();
			seatsView.close();
		});
		
		var seatsPicker = Ti.UI.createPicker();
		seatsPicker.addEventListener('change', function(e){
			selectedValue = e.row.data;
		});
		
		var data = [];
		data[0] = Ti.UI.createPickerRow({title:'1', data:'1'});
		data[1] = Ti.UI.createPickerRow({title:'2', data:'2'});
		data[2] = Ti.UI.createPickerRow({title:'3', data:'3'});
		data[3] = Ti.UI.createPickerRow({title:'4', data:'4'});
		
		seatsPicker.add(data);
		seatsPicker.setSelectedRow(0, seatCount-1, false);
		seatsPicker.selectionIndicator = true;
		
		seatsView.add(seatsPicker);
		seatsView.add(readyButton);
		seatsView.open({modal:true});
		
	}
	
	/*
	 * Open the buy tickets view.
	 */
	function buyTickets() {
		if( selectedSeatsViews.length ) {
			var selectedSeats = new Array();
			for(var i=0; i<selectedSeatsViews.length; i++) {
				var seat = selectedSeatsViews[i].seat;
				selectedSeats.push(seat);
			}
			var buyTicketsViewController = Alloy.createController('BuyTicketsView', {selectedSeats:selectedSeats, showtime:showtime, movie:movie});
			context.openNewWindow(buyTicketsViewController.getView());	
		} else {
			alert('Select at least one seat.');
		}
	}
};
SelectSeatsViewController.prototype = new BaseViewController();

var args = arguments[0] || {};
var controller = new SelectSeatsViewController();
controller.initialize(args);
