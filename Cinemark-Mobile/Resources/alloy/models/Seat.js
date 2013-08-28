exports.definition = {
    config: {
        columns: {
            row: "string",
            col: "string",
            section: "string"
        },
        adapter: {
            type: "sql",
            collection_name: "Seat"
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

model = Alloy.M("Seat", exports.definition, []);

collection = Alloy.C("Seat", exports.definition, model);

exports.Model = model;

exports.Collection = collection;