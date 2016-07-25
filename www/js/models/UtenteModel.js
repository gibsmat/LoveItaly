define(function(require) {

    var Backbone = require("backbone");
    var $ = require("jquery");


    var autenticazione = function(xhr) {
        var key64 = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6'; //codifica 64 della API key
        var token = 'Basic '.concat(key64);
        xhr.setRequestHeader('Authorization', token);
    }

    var UtenteModel = Backbone.Model.extend({

        constructorName: "UtenteModel",



        initialize: function(options) {
            this.email = options.email;

        },

        url: function() {

            var url = 'http://192.168.56.101/loveitaly/api/customers/?display=full&io_format=JSON&filter[email]=';
            url += this.email;
            return url;
        },

        parse: function(data) {
            console.log(data.customers);
            return data.customers;
        },

        sync: function(method, collection, options) {
            options = options || {};
            options.beforeSend = autenticazione;
            return Backbone.Model.prototype.sync.apply(this, arguments);
        },

    });

    return UtenteModel;
});