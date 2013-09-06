exports.definition = {
	config: {
		columns: {
		    "id": "string",
		    "title": "string",
		    "summary": "string",
		    "trailerUrl" : "string",
		    "genre" : "string",
		    "director" : "string",
		    "cinemaType" : "string",
		    "picUrl" : "string"
		},
		adapter: {
			type: "sql",
			collection_name: "Movie"
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