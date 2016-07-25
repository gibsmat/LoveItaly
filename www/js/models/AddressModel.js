var autenticazione = function(xhr) {
    var key64 = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6'; 
    var token = 'Basic '.concat(key64);
    xhr.setRequestHeader('Authorization', token);
}
define(function(require) {

    var Backbone = require("backbone");

    var AddressModel = Backbone.Model.extend({

        constructorName: "AddressModel",

        initialize: function(options) {
            this.id = options.id;
        },

        url: function() {
            var url = 'http://loveitaly.altervista.org/api/addresses/';
            url += this.id;
            url += '?io_format=JSON&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H';
            return url;
        },

        parse: function(data) {
            return data.address;

        },

        sync: function(method, collection, options) {
            options = options || {};
            return Backbone.Model.prototype.sync.apply(this, arguments);
        }
    });

    return AddressModel;
});