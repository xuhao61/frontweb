var BuyTicketsViewController = function() {
	
	var PaymentService = require('services/PaymentService');
	var selectedSeats;
	var showtime;
	var movie;
	var context;
	var paymentService;
	
	/*
	 * Initialize the view
	 */
	this.initialize = function(args) {
		this.initializeView($.buyTicketsViewWindow);
		context = this;
		selectedSeats = args.selectedSeats;
		showtime = args.showtime.attributes;
		var time = showtime.schedule.attributes.time;
		movie = args.movie;
		var seatsString = selectedSeats.length > 1 ? "Seats" : "Seat";
		$.infoLabel.setText( selectedSeats.length + " " + seatsString + " for " + movie.title + " at " + time );
		$.creditCardButton.addEventListener('click', openCreditCardView);
		$.buyButton.addEventListener('click', buyTickets);
	};
	
	/*
	 * Open the credit card selection view.
	 */
	function openCreditCardView() {
		var creditCardView = Ti.UI.createWindow({
			title: 'Credit Card', 
			layout: 'vertical',
			backgroundColor: '#ffffff'
		});
		
		var readyButton = Ti.UI.createButton({
			title : 'Ready'
		});
	
		readyButton.addEventListener('click', function(e){
			creditCardView.close();
		});
		
		
		var creditCardPicker = Ti.UI.createPicker();
		creditCardPicker.addEventListener('change', function(e){
		});
		
		var data = [];
		data[0] = Ti.UI.createPickerRow({title:'AMEX', data:'1'});
		data[1] = Ti.UI.createPickerRow({title:'Cabal', data:'2'});
		data[2] = Ti.UI.createPickerRow({title:'Mastercard', data:'3'});
		data[3] = Ti.UI.createPickerRow({title:'VISA', data:'4'});
		
		creditCardPicker.add(data);
		creditCardPicker.setSelectedRow(0, 0, false);
		creditCardPicker.selectionIndicator = true;
		
		
		creditCardView.add(creditCardPicker);
		creditCardView.add(readyButton);
		creditCardView.open({modal:true});
	}
	
	/*
	 * Make the payment
	 */
	function buyTickets() {
		if( $.emailInput.value != '' && $.dniInput.value != '' && $.creditCardNumber.value != '' && Util.isEmail($.emailInput.value) ) {
			context.showActivityIndicator('Making payment...');
			paymentService = new PaymentService();
			paymentService.call( showtime.id, selectedSeats, $.emailInput.value, $.dniInput.value,  paymentComplete, paymentFail );
		} else {
			alert("Fill the fields with correct values.");
		}
	}
	
	/*
	 * Payment success handler
	 */
	function paymentComplete(response) {
		context.hideActivityIndicator();
		var alertDialog = Ti.UI.createAlertDialog({
			title : 'Payment Complete',
			message : 'Your confirmation code is ' + response.code,
			buttonNames: ['OK']
		});
		
		alertDialog.addEventListener('click', function(e){
			var indexViewController = Alloy.createController('index');
			context.openNewWindow(indexViewController.getView());				
		});
		
		alertDialog.show();
	}
	
	/*
	 * Payment fail handler
	 */
	function paymentFail(e) {
		context.hideActivityIndicator();
		alert(e.error);
	}
	
};
BuyTicketsViewController.prototype = new BaseViewController();

var args = arguments[0] || {};
var controller = new BuyTicketsViewController();
controller.initialize(args);
