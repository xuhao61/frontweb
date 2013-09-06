exports.definition = {
    config: {
        columns: {
            id: "string",
            left: "string",
            center: "string",
            right: "string",
            schedule: "string"
        },
        adapter: {
            type: "sql",
            collection_name: "Showtime"
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

model = Alloy.M("Showtime", exports.definition, []);

collection = Alloy.C("Showtime", exports.definition, model);

exports.Model = model;

exports.Collection = collection;