var autenticazione = function(xhr) {
    var key64 = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6'; //codifica 64 della API key
    var token = 'Basic '.concat(key64);
    xhr.setRequestHeader('Authorization', token);
}
define(function(require) {

    var Backbone = require("backbone");

    var AziendaModel = Backbone.Model.extend({

        constructorName: "AziendaModel",

        initialize: function(options) {
            this.id = options.id;
        },

        url: function() {
            var url = 'http://loveitaly.altervista.org/api/manufacturers/';
            url += this.id;
            url += '?io_format=JSON&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H';
            return url;
        },

        parse: function(data) {
            console.log(data.manufacturer);
            return data.manufacturer;

        },

        sync: function(method, collection, options) {
            options = options || {};
            //   options.beforeSend = autenticazione;
            return Backbone.Model.prototype.sync.apply(this, arguments);
        }
    });

    return AziendaModel;
});