define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var Handlebars = require("handlebars");
    var UserModel = require("models/UserModel");

    var MyRegistrazione = Utils.Page.extend({

        constructorName: "MyRegistrazione",
        model: UserModel,
        events: {
            "click #iscriviti": "registrati"
        },
        initialize: function() {
            // load the precompiled template
            this.template = Utils.templates.registrazione;
        },

        id: "registrazione",
        render: function() {
            $(this.el).html(this.template());
            $("#he2").addClass("fa fa-chevron-left icona flex-item2head"); //indietro
            $("#he3").addClass("flex-item1head"); //div input
            $("#he6").addClass("flex-item3head icona"); //cerca
            $("#he5").addClass("flex-item3head icona"); //cerca
            $("#menusup").addClass("flex-containerhead fixed");
            return this;
        },
        registrati: function() {
            var autenticazione = function(xhr) {
                var key64 = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6'; //codifica 64 della API key
                var token = 'Basic '.concat(key64);
                xhr.setRequestHeader('Authorization', token);
            }
            var email = $("#mail").val();
            var passwd = $("#password").val();
            var firstname = $("#nome").val();
            var lastname = $("#cog").val();
            var postContact = function(xml) {
                var $xml = $(xml);
                $xml.find('email').text(email);
                $xml.find('passwd').text(passwd);
                $xml.find('firstname').text(firstname);
                $xml.find('lastname').text(lastname);
                var contact = '<?xml version="1.0" encoding="UTF-8"?> <prestashop xmlns:xlink="http://www.w3.org/1999/xlink">' + $xml.find('prestashop').html() + '</prestashop>';
                $.ajax({
                    url: 'http://192.168.56.101/loveitaly/api/customers/?io_format=XML&schema=blank',
                    async: true,
                    type: "POST",
                    dataType: 'xml',
                    contentType: "text/xml",
                    beforeSend: autenticazione,
                    data: contact,
                    success: function(result) {
                        localStorage.setItem("email", email);
                        localStorage.setItem("sessione", "true");
                        Backbone.history.navigate("menulog", {
                            trigger: true
                        });
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        console.log('Errore chiamata ajax!' +
                            '\nReponseText: ' + XMLHttpRequest.responseText +
                            '\nStatus: ' + textStatus +
                            '\nError: ' + errorThrown);
                    }
                })
            }
            var updateContact = function() {
                $.ajax({
                    url: 'http://192.168.56.101/loveitaly/api/customers/?io_format=XML&schema=blank',
                    async: true,
                    type: "GET",
                    dataType: 'xml',
                    beforeSend: autenticazione,
                    success: function(result) {
                        postContact(result)
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        console.log('Errore chiamata ajax!' +
                            '\nReponseText: ' + XMLHttpRequest.responseText +
                            '\nStatus: ' + textStatus +
                            '\nError: ' + errorThrown);
                    }
                })
            }
            updateContact();
        }
    });
    return MyRegistrazione;
});