function OptionsSelector() {
	
	var window;
	this.createComponent = function(title, options, selectedIndex, changeHandler, clickHandler) {
		
		window = Ti.UI.createWindow({
			title: title, 
			layout: 'vertical',
			backgroundColor: '#ffffff'
		});
		
		var readyButton = Ti.UI.createButton({
			title : 'Ready',
			top:5
		});
		
		readyButton.addEventListener('click', function(e){
			if(clickHandler) clickHandler(e);
		});
		
		var picker = Ti.UI.createPicker();
		picker.addEventListener('change', function(e){
			if(changeHandler) changeHandler(e);
		});
		
		var data = new Array();
		for(var i=0; i<options.length; i++) {
			data.push( Ti.UI.createPickerRow(options[i]) );			
		}
		
		picker.add(data);
		picker.setSelectedRow(0, selectedIndex, false);
		picker.selectionIndicator = true;
		
		window.add(picker);
		window.add(readyButton);		
		
	};
	
	this.open = function() {
		window.open({modal:true});
	};
	
	this.close = function() {
		window.close();
	};
	

}

module.exports = OptionsSelector;