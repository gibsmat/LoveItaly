define(function(require) {

    var Backbone = require("backbone");
    var CarrelloModel = require("models/CarrelloModel");

    var CarrelloCollection = Backbone.Collection.extend({
        constructorName: "CarrelloCollection",
        model: CarrelloModel,

    });

    return CarrelloCollection;
});