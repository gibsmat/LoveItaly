define(function(require) {

    var Backbone = require("backbone");
    var ProductsModel = require("models/ProductsModel");

    var ProductsCollection = Backbone.Collection.extend({
        constructorName: "ProductsCollection",
        model: ProductsModel,
        url: 'http://loveitaly.altervista.org/api/products/?display=full&io_format=JSON&limit=14&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H',

        parse: function(data) {
            return data.products;
        },

        sync: function(method, collection, options) {
            options = options || {};
            // options.beforeSend = autenticazione;
            return Backbone.Collection.prototype.sync.apply(this, arguments);
        }
    });

    return ProductsCollection;
});