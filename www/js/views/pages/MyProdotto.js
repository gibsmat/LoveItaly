define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var Handlebars = require("handlebars");
    var CarrelloModel = require("models/CarrelloModel");
    var CarrelloCollection = require("collections/CarrelloCollection");
    var carrellomodel;
    var ProductModel = require("models/ProductModel");
    var MyProdotto = Utils.Page.extend({

        constructorName: "MyProdotto",

        initialize: function(options) {
            // load the precompiled template
            this.template = Utils.templates.prodotto;
            this.id = options.id;
        },
        events: {
            "click .addcarrello": "aggiungi_al_carrello",
            "click .btn_visitaazienda": "PaginaAzienda",
            "click #acq": "acquista"
        },

        id: "myprodotto",
        className: "i-g page",
        model: ProductModel,

        azie: function(e) {
            var $target = $(e.target);
            var href = $target.attr('href');
            location.hash = href;
        },
        render: function() {
            var prodmodel = new ProductModel({
                id: this.id
            });
            that = this;
            prodmodel.fetch({
                success: function(model, response, options) {
                    $("#he2").removeClass(); //indietro
                    $("#he3").removeClass(); //div input
                    $("#he6").removeClass(); //cerca
                    $("#he5").removeClass(); //cerca
                    $("#menusup").removeClass();
                    $("#he2").addClass("fa fa-chevron-left icona flex-item2head"); //indietro
                    $("#he3").addClass("flex-item1head"); //div input
                    $("#he4").addClass("cercami"); //input
                    $("#he5").addClass("flex-item3head icona fa fa-shopping-cart"); //cerca
                    $("#menusup").addClass("flex-containerhead fixed");
                    var appoggio = model.toJSON();
                    appoggio.description_short = notag(appoggio.description_short);
                    appoggio.description = notag(appoggio.description);
                    appoggio.price = "  " + arrotonda(appoggio.price);
                    $(that.el).html(that.template(appoggio));
                    var theTemplateScript = $("#prodotto-template").html();
                    var theTemplate = Handlebars.compile(theTemplateScript);
                    var theCompiledHtml = theTemplate();
                    $('.content-placeholder').html(theCompiledHtml);
                    return that;
                },
                error: function(collection, response, options) {
                    console.log('Errore chiamata ajax!');
                }
            });
        },
        // Called on view click
        aggiungi_al_carrello: function(e) {
            var $target = $(e.target);

            while (!$target.hasClass("addcarrello")) $target = $target.parent();
            var id = $target.attr('id');
            var name = $target.attr('name');
            var price = $target.attr('price');
            var Azienda = $target.attr('azienda');
            var id_img = $target.attr('id_img');

            var quantita = $(".quantita").val();
            price = arrotonda(price);
            carrellomodel = new CarrelloModel({
                val: id,
                name: name,
                price: price,
                azienda: Azienda,
                id_img: id_img
            });

        },
        acquista: function() {
            var ident = parseInt(localStorage.getItem('identificativo_carrello'));
            ident = ident + 1;
            localStorage.setItem('identificativo_carrello', ident);
            var quantita = $(".quantita").val();
            carrellomodel.set("id", ident);
            carrellomodel.set("quantita", quantita);
            var carrelloObject = JSON.parse(localStorage.getItem('carrellolocal'));
            var carrellocollection = new CarrelloCollection(carrelloObject);
            console.log(carrellomodel);
            carrellocollection.add(carrellomodel);
            localStorage.setItem('carrellolocal', JSON.stringify(carrellocollection));
        },
        PaginaAzienda: function(e) {
            var $target = $(e.target);
            while (!$target.hasClass("btn_visitaazienda")) $target = $target.parent();
            var href = $target.attr('href');
            location.hash = href;

        },



    });

    return MyProdotto;

});