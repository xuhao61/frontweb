exports.definition = {
	config: {
		columns: {
		    "id": "string",
		    "type": "string",
		    "cols": "int",
		    "rows": "int",
		    "takenSeats": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "Section"
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
};