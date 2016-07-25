define(function(require) {

    var Backbone = require("backbone");

    var CategoryModel = Backbone.Model.extend({
        id: "id",
        constructorName: "CategoryModel",
    });

    return CategoryModel;
});