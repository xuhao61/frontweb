exports.definition = {
    config: {
        columns: {
            id: "string",
            name: "string"
        },
        adapter: {
            type: "sql",
            collection_name: "Theater"
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

model = Alloy.M("Theater", exports.definition, []);

collection = Alloy.C("Theater", exports.definition, model);

exports.Model = model;

exports.Collection = collection;