var BuyTicketsViewController = function() {
	
	var OptionsSelector = require("Util/OptionsSelector");
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
	
		var clickHandler = function(e){
			creditCardView.close();
		};
		
		
		var data = [];
		data[0] = {title:'AMEX', data:'1'};
		data[1] = {title:'Cabal', data:'2'};
		data[2] = {title:'Mastercard', data:'3'};
		data[3] = {title:'VISA', data:'4'};
		
		var creditCardView = new OptionsSelector();
		creditCardView.createComponent('Credit Card', data, 0, null, clickHandler);
		creditCardView.open();
		
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
