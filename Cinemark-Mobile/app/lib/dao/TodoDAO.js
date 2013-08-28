function TodoDAO() {
	
	var DataBaseConnector = require('database/DataBaseConnector');
	var _dataBaseConnector = new DataBaseConnector();
	var _tableName = "todo";
	
	this.addItem = function(item) {
		var queryString = 'insert into '+ _tableName +' values ("'+ item +'", 0, 0, null)';
		_dataBaseConnector.executeQuery(queryString);
	};
	
	this.updateItem = function(id, done, callback) {
		var queryString = 'update '+ _tableName +' set done='+ done +' where  id='+id;
		_dataBaseConnector.executeQueryWithCallback(queryString, callback);
	};
	
	this.selectItems = function() {
		var query = 'select * from todo;';
		return _dataBaseConnector.executeQueryWithCallback(query, parseSelect);
	};
	
	var parseSelect = function(rows) {
		var retData = new Array();
		while ( rows.isValidRow() ) {
			var taskModel = Alloy.createModel( 'Task', {
				id:rows.fieldByName('id'),
				item:rows.fieldByName('text'),
				done:rows.fieldByName('done'),
				sync:rows.fieldByName('sync')
				
			});
			retData.push( taskModel );
			rows.next();
		}
		
		return retData;
	}
	
}

module.exports = TodoDAO;
