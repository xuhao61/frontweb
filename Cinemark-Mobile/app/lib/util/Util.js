function Util() {
	
	/*
	 * Find a view by id.
	 */
	this.findById = function(w, id) {
		for ( var x in w.children ) {
	    	if (w.children[x].id == id) {
	        	return w.children[x];
	    	}
	    	return null;
	  	}
	};
	
	/*
	 * Add the given message to a table view
	 * Used when the server return no data
	 */
	this.addNoDataMessage = function(tableView, message) {
		var noDataRow = Ti.UI.createTableViewRow({
            title : message,
            hasChild: false,
            height: 35
        });
        var rows = [noDataRow];
		tableView.setData(rows);
	};
	
	/*
	 * Validates if a string is a valid email 
	 */
	this.isEmail = function(email) {
		var atpos = email.indexOf("@");
		var dotpos = email.lastIndexOf(".");
		if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
			return false;
		} else {
			return true;
		}
	};
	
	
}

module.exports = Util;