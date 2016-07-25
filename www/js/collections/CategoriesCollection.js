define(function(require) {
    var autenticazione = function(xhr) {
        var key64 = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6'; //codifica 64 della API key
        var token = 'Basic '.concat(key64);
        xhr.setRequestHeader('Authorization', token);
    };
    var Backbone = require("backbone");
    var CategoryModel = require("models/CategoryModel");
    var CategoriesCollection = Backbone.Collection.extend({
        constructorName: "CategoriesCollection",
        url: 'http://loveitaly.altervista.org/api/categories/?display=full&io_format=JSON&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H',
        model: CategoryModel,
        parse: function(data) {
            return data.categories;
        },
        sync: function(method, collection, options) {
            options = options || {};
            //   options.beforeSend = autenticazione;
            return Backbone.Collection.prototype.sync.apply(this, arguments);
        }
    });
    return CategoriesCollection;
});