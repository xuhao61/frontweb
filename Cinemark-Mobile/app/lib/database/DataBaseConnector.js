function DataBaseConnector() {
	
	var _dataBaseName = "todoDB";
	var _dataBaseFile = "database/db.sqlite";
	if( Titanium.Platform.osname == "android" ) {
		_dataBaseFile = "db.sqlite";
	}
	
	this.createDB = function() {
		Ti.Database.install(_dataBaseFile, _dataBaseName);	
	};
	
	this.executeQuery = function(query) {
		var db = Ti.Database.open(_dataBaseName);
		var result = db.execute(query);
		db.close();
	};
	
	this.executeQueryWithCallback = function(query, callbackFc) {
		var db = Ti.Database.open(_dataBaseName);
		var result = callbackFc( db.execute(query) );
		db.close();
		return result;
	}
	
}

module.exports = DataBaseConnector;