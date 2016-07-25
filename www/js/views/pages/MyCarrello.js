define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var Handlebars = require("handlebars");


    var CarrelloModel = require("models/CarrelloModel");
    var CarrelloCollection = require("collections/CarrelloCollection");

    var Carrello = Utils.Page.extend({

        constructorName: "Carrello",

        initialize: function() {
            // load the precompiled template
            this.template = Utils.templates.carrello;

        },
        events: {
            "tap #xxx": "elimina"

        },

        id: "carrello",
        model: CarrelloModel,
        collection: CarrelloCollection,

        elimina: function(e) {

            var $target = $(e.target);
            while (!$target.hasClass("prodottohomepage")) {
                $target = $target.parent();
            }
            var nome = $($target).attr('name');
            var carrelloObject = JSON.parse(localStorage.getItem('carrellolocal'));
            var carrellocollection = new CarrelloCollection(carrelloObject);
            var modello = carrellocollection.get(nome);
            carrellocollection.remove(modello);
            localStorage.setItem('carrellolocal', JSON.stringify(carrellocollection));
            $("#" + nome).fadeOut(300);
            if (localStorage["carrellolocal"] == "[]") {
                Backbone.history.navigate("homepage", {
                    trigger: true
                });

            }
            // $("#" + nome).remove();
            var tot = totale();

            $('#totale').text(tot);
        },
        render: function() {
            $("#he2").removeClass(); //indietro
            $("#he3").empty(); //div input
            $("#he6").removeClass(); //cerca
            $("#he5").removeClass(); //cerca
            $("#menusup").removeClass();
            $("#he2").addClass("fa fa-chevron-left icona flex-item2head"); //indietro
            $("#he3").addClass("flex-item1head"); //div input
            $("#he4").addClass("cercami"); //input
            $("#he5").addClass("flex-item3head icona"); //cerca
            $("#menusup").addClass("flex-containerhead fixed");
            var tot = totale();
            var carrelloObject = JSON.parse(localStorage.getItem('carrellolocal'));

            localStorage['totale'] = tot;
            //var totale = localStorage.totale;
            $('#totale').text(tot);
            ///////////////////////////////////////////////////////////////////////
            $(this.el).html(this.template(carrelloObject));
            //////////////////////////////////////////////////////////////////

            return this;


        },


    });

    return Carrello;

});