define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var Handlebars = require("handlebars");
    var AziendaModel = require("models/AziendaModel");
    var AddressModel = require("models/AddressModel");

    var MyAzienda = Utils.Page.extend({

        constructorName: "MyAzienda",

        initialize: function(options) {
            // load the precompiled template
            this.template = Utils.templates.azienda;
            this.id = options.id;

        },
        events: {
            // "click .flex-item.prodottohomepage" : "gotoProdotto"
        },

        id: "myazienda",
        model: AziendaModel,

        render: function() {

            var aziemodel = new AziendaModel({
                id: this.id
            });
            that = this;
            aziemodel.fetch({
                success: function(model, response, options) {
                    var addr;
                    var city;
                    var phone;
                    $("#he2").removeClass(); //indietro
                    $("#he3").empty(); //div input
                    $("#he6").removeClass(); //cerca
                    $("#he5").removeClass(); //cerca
                    $("#menusup").removeClass(); //input
                    $("#he2").addClass("fa fa-chevron-left icona flex-item2head"); //indietro
                    $("#he3").addClass("flex-item1head"); //div input
                    $("#he6").addClass("flex-item3head icona"); //cerca
                    $("#he5").addClass("flex-item3head icona fa fa-shopping-cart"); //cerca
                    $("#menusup").addClass("flex-containerhead fixed");
                    var descr = model.get("meta_description");
                    descr = notag(descr);
                    model.set("meta_description", descr);
                    var AddressObject = model.get("associations");
                    var id_add = AddressObject.addresses[0].id;
                    //Prendiamo i campi indirizzo dal server
                    var address = new AddressModel({
                        id: id_add
                    });
                    var appoggio_model = model;
                    address.fetch({
                        success: function(model, response, options) {
                            addr = model.get("address1");
                            city = model.get("city");
                            phone = model.get("phone");
                            if (phone.length == 0) phone = "Non disponibile";
                            appoggio_model.set("addr", addr);
                            appoggio_model.set("city", city);
                            appoggio_model.set("phone", phone);
                            $(that.el).html(that.template(appoggio_model.toJSON()));
                            $("#indirizzo").text(addr);
                            $("#telefono").text(phone);
                            $("#city").text(city);
                            var theTemplateScript = $("#Azienda-template").html();
                            var theTemplate = Handlebars.compile(theTemplateScript);
                            var theCompiledHtml = theTemplate();
                            $('.content-placeholder').html(theCompiledHtml);
                        },
                        error: function(model, response, options) {
                            console.log('Errore chiamata ajax!');
                        }
                    });


                    return this;
                },
                error: function(model, response, options) {
                    console.log('Errore chiamata ajax!');
                }
            });
        },
    });

    return MyAzienda;

});