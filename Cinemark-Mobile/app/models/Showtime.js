exports.definition = {
	config: {
		columns: {
		    "id": "string",
		    "left": "string",
		    "center": "string",
		    "right": "string",
		    "schedule": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "Showtime"
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