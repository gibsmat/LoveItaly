define(function(require) {

    var Backbone = require("backbone");
    var $ = require("jquery");


    var autenticazione = function(xhr) {
        var key64 = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6'; //codifica 64 della API key
        var token = 'Basic '.concat(key64);
        xhr.setRequestHeader('Authorization', token);
    }

    var UserModel = Backbone.Model.extend({

        constructorName: "UserModel",



        initialize: function(options) {
            this.email = options.email;

        },
        url: function() {
            console.log(this.email);
            var url = 'http://192.168.56.101/loveitaly/api/customers/?io_format=JSON&filter[email]=[' + this.email + ']&display=[passwd]';
            return url;
        },

        parse: function(data) {
            console.log(data);
            return data.customers;
        },

        sync: function(method, collection, options) {
            options = options || {};
            options.beforeSend = autenticazione;
            return Backbone.Model.prototype.sync.apply(this, arguments);
        },

    });

    return UserModel;
});