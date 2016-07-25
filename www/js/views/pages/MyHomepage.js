define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var Handlebars = require("handlebars");
    var ProductsModel = require("models/ProductsModel");
    var ProductsCollection = require("collections/ProductsCollection");


    var MyHomepage = Utils.Page.extend({

        constructorName: "MyHomepage",

        initialize: function() {
            // load the precompiled template
            this.template = Utils.templates.homepage;
        },
        events: {
            "click .flex-item.prodottohomepage": "gotoProdotto"
        },

        id: "myhomepage",
        model: ProductsModel,
        collection: ProductsCollection,


        render: function() {

            var homepageCollection = new ProductsCollection();
            var that = this;
            homepageCollection.fetch({
                success: function(collection, response, options) {
                    $("#he2").removeClass(); //indietro
                    $("#he3").removeClass(); //div input
                    $("#he3").empty();
                    $("#he6").removeClass(); //cerca
                    $("#he5").removeClass(); //cerca
                    $("#menusup").removeClass();
                    $("#he2").addClass("fa fa-bars icona flex-item2head"); //indietro
                    $("#he3").addClass("flex-item1head"); //div input
                    $("#he3").html('<div id="titolo" class="titolo" >LoveItaly</div>');
                    $("#he6").addClass("flex-item3head icona cerca fa fa-search"); //cerca
                    $("#he5").addClass("flex-item3head icona fa fa-shopping-cart"); //cerca
                    $("#menusup").addClass("flex-containerhead fixed");
                    $("#content").css("overflow-y", "auto");
                    $("#menusup").css("overflow-y", "hidden");
                    $("#menulat").css("overflow-y", "hidden");
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




    });

    return MyHomepage;

});