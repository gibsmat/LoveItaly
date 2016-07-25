define(function(require) {

    var autenticazione = function(xhr) {
        var key64 = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6';
        var token = 'Basic '.concat(key64);
        xhr.setRequestHeader('Authorization', token);
    };
    var Backbone = require("backbone");
    var ProductsModel = require("models/ProductsModel");

    var SearchByNameCollection = Backbone.Collection.extend({
        constructorName: "SearchByNameCollection",

        initialize: function(options) {
            this.name = options.name;
        },
        url: function() {
            var url = "http://loveitaly.altervista.org/api/search?language=1&query=";
            url += this.name;
            url += "&io_format=JSON&display=full&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H";
            return url;
        },

        model: ProductsModel,

        parse: function(data) {
            console.log(data);
            return data.products;

        },

        sync: function(method, collection, options) {
            options = options || {};
            return Backbone.Collection.prototype.sync.apply(this, arguments);
        }
    });


    return SearchByNameCollection;
});