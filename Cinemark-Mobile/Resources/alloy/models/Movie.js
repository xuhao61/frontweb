exports.definition = {
    config: {
        columns: {
            id: "string",
            name: "string",
            description: "string",
            trailerUrl: "string"
        },
        adapter: {
            type: "sql",
            collection_name: "Movie"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("Movie", exports.definition, []);

collection = Alloy.C("Movie", exports.definition, model);

exports.Model = model;

exports.Collection = collection;