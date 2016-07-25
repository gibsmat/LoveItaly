define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var Handlebars = require("handlebars");
    var UtenteModel = require("models/UtenteModel");
    var MyUtente = Utils.Page.extend({

        constructorName: "MyUtente",

        initialize: function() {
            // load the precompiled template
            this.template = Utils.templates.personale;
        },
        events: {

        },

        id: "myppers",
        model: UtenteModel,


        render: function() {
            var email = localStorage.email;
            var utentemodel = new UtenteModel({
                email: email
            });
            that = this;
            utentemodel.fetch({
                success: function(model, response, options) {
                    $("#he2").removeClass(); //indietro
                    $("#he3").empty(); //div input
                    $("#he6").removeClass(); //cerca
                    $("#he5").removeClass(); //cerca
                    $("#menusup").removeClass();
                    $("#he2").addClass("fa fa-chevron-left icona flex-item2head"); //indietro
                    $("#he3").addClass("flex-item1head"); //div input
                    $("#he4").addClass("cercami"); //input
                    $("#he5").addClass("flex-item3head icona fa fa-shopping-cart"); //cerca
                    $("#menusup").addClass("flex-containerhead fixed");
                    $(that.el).html(that.template(model.attributes[0]));
                    var theTemplateScript = $("#personale-template").html();
                    var theTemplate = Handlebars.compile(theTemplateScript);
                    var theCompiledHtml = theTemplate();
                    $('.content-placeholder').html(theCompiledHtml);
                    var loc = localStorage.localizzazione;
                    $('#loc').text(loc);
                    return that;
                },
                error: function(collection, response, options) {
                    console.log('Errore chiamata ajax!');
                }
            });
        },
    });
    return MyUtente;
});