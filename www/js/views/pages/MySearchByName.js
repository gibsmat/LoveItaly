define(function(require) {

    var Backbone = require("backbone");
    var ProductModel = require("models/ProductModel");
    var Utils = require("utils");
    var Handlebars = require("handlebars");
    var SearchByNameCollection = require("collections/SearchByNameCollection");

    var autenticazione = function(xhr) {
        var key64 = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6'; //codifica 64 della API key
        var token = 'Basic '.concat(key64);
        xhr.setRequestHeader('Authorization', token);
    }

    var MySearchByName = Utils.Page.extend({

        constructorName: "MySearchByName",

        initialize: function(options) {
            // load the precompiled template
            this.template = Utils.templates.homepage;
            this.id = options.id;

        },
        collection: SearchByNameCollection,
        id: "myhomepage",
        className: "i-g page",

        events: {
            "click .flex-item.prodottohomepage": "gotoProdotto"
        },
        gotoProdotto: function(e) {


            var $target = $(e.target);
            while (!$target.hasClass("prodottohomepage")) $target = $target.parent();
            var nomeprodotto = $($target).attr('name');
            nomeprodotto.slice(0, 35);
            if (nomeprodotto.length == 35) nomeprodotto = nomeprodotto + "..";

            $("#he3").html("<div class='textricerca'> " + nomeprodotto + "</div>");
            var href = $target.attr('href');
            location.hash = href;
        },
        render: function() {
            var productCollection = new SearchByNameCollection({
                name: this.id
            });
            that = this;
            productCollection.fetch({
                success: function(collection, response, options) {
                    $("#he2").removeClass(); //indietro
                    $("#he3").removeClass(); //div input
                    $("#he6").removeClass(); //cerca
                    $("#he5").removeClass(); //cerca
                    $("#menusup").removeClass();
                    var valore = $("#sear").val();
                    $("#he3").empty();
                    $("#he2").addClass("icona fa fa-chevron-left flex-item2head"); //indietro
                    $("#he3").addClass("flex-item1head ricerca"); //div input
                    if (typeof(valore) == 'undefined') {
                        valore = '...'
                    }
                    $("#he3").html("<input class='textricerca nuovo' type='text' value = '" + valore + "' name='sear' id='sear'>");
                    $("#he4").addClass("cercami"); //input
                    $("#he5").addClass("flex-item3head icona fa fa-shopping-cart"); //cerca
                    $("#he6").addClass("flex-item3head icona cercap fa fa-search"); //cerca
                    $("#menusup").addClass("flex-containerhead fixed");
                    var appoggio = collection.toJSON();
                    appoggio = taglio(appoggio);
                    $(that.el).html(that.template(appoggio));
                    var theTemplateScript = $("#address-template").html();
                    var theTemplate = Handlebars.compile(theTemplateScript);
                    var theCompiledHtml = theTemplate();
                    $('.content-placeholder').html(theCompiledHtml);
                    return that;
                },

                error: function(collection, response, options) {
                    console.log('Errore chiamata ajax!');
                }
            });
            ///////////////////////////////////////////////////////////////////////

        },

    });

    return MySearchByName;

});