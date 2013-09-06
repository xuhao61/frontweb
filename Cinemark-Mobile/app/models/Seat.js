exports.definition = {
	config: {
		columns: {
		    "row": "string",
		    "col": "int",
		    "section": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "Seat"
		}
	},		
	extendModel: function(Model) {		
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});
		
		return Model;
	},
	extendCollection: function(Collection) {		
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});
		
		return Collection;
	}
}

