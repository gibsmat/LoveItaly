define(function(require) {

    var Backbone = require("backbone");
    var ProductsModel = require("models/ProductsModel");

    var ProductsSCollection = Backbone.Collection.extend({
        constructorName: "ProductsSCollection",
        model: ProductsModel,
        url: 'http://192.168.56.101/loveitaly/api/products/?display=full&io_format=JSON&limit=8',

        url: function() {
            var url = 'http://loveitaly.altervista.org/api/products/';
            url += '?io_format=JSON&';
            url += 'display=full&filter[id_category_default]=[';
            url += this.id;
            url += ']&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H';
            return url;
        },
        initialize: function(options) {
            this.id = options.id;
        },
        parse: function(data) {
            return data.products;
        },

        sync: function(method, collection, options) {
            options = options || {};
            //  options.beforeSend = autenticazione;
            return Backbone.Collection.prototype.sync.apply(this, arguments);
        }
    });

    return ProductsSCollection;
});