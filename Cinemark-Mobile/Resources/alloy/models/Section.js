exports.definition = {
    config: {
        columns: {
            id: "string",
            type: "string",
            cols: "int",
            rows: "int",
            takenSeats: "string"
        },
        adapter: {
            type: "sql",
            collection_name: "Section"
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

model = Alloy.M("Section", exports.definition, []);

collection = Alloy.C("Section", exports.definition, model);

exports.Model = model;

exports.Collection = collection;