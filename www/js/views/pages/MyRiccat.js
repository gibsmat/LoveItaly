define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var Handlebars = require("handlebars");
    var ProductsModel = require("models/ProductsModel");
    var ProductsCollection = require("collections/ProductsCollection");
    var ProductsSCollection = require("collections/ProductsSCollection");

    var MyRiccat = Utils.Page.extend({

        constructorName: "MyRiccat",

        initialize: function(options) {
            // load the precompiled template
            this.template = Utils.templates.homepage;
            this.id = options.id;

            // here we can register to inTheDOM or removing events
            // this.listenTo(this, "inTheDOM", function() {
            //   $('#content').on("swipe", function(data){
            //     console.log(data);
            //   });
            // });
            // this.listenTo(this, "removing", functionName);
            // by convention, all the inner views of a view must be stored in this.subViews
        },

        id: "myriccat",
        className: "i-g page",
        model: ProductsModel,
        collection: ProductsSCollection,
        events: {
            "click .flex-item.prodottohomepage": "gotoProdotto"
        },
        render: function() {
            var riccatCollection = new ProductsSCollection({
                id: this.id
            });
            var that = this;
            riccatCollection.fetch({
                success: function(collection, response, options) {
                    $("#he2").removeClass(); //indietro

                    $("#he6").removeClass(); //cerca
                    $("#he5").removeClass(); //cerca
                    $("#menusup").removeClass();
                    var valor = $("#sear").val();
                    $("#he3").empty();
                    if (typeof(valor) == 'undefined') {
                        valor = '...'
                    }
                    valor.slice(0, 15);
                    $("#he3").html("<input class='textricerca nuovo' type='text' value ='" + valor + "' name='sear' id='sear'>");

                    $("#he2").addClass("fa fa-chevron-left icona flex-item2head"); //indietro
                    $("#he3").addClass("flex-item1head"); //div input
                    $("#he6").addClass("flex-item3head icona cercap fa fa-search"); //cerca
                    $("#he5").addClass("flex-item3head icona fa fa-shopping-cart"); //cerca
                    $("#menusup").addClass("flex-containerhead fixed");


                    var appoggio = collection.toJSON();
                    appoggio = taglio(appoggio);

                    $(that.el).html(that.template(appoggio));
                    console.log(collection);
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


            ///////////////////////////////////


        },
        gotoProdotto: function(e) {
            var nomeprodotto = $("#nomeprod").attr('class');
            nomeprodotto.slice(0, 35);
            if (nomeprodotto.length == 35) nomeprodotto = nomeprodotto + "..";
            $("#he3").html("<div class='textricerca'> " + nomeprodotto + "</div>");
            var $target = $(e.target);
            while (!$target.hasClass("prodottohomepage")) $target = $target.parent();
            var href = $target.attr('href');
            location.hash = href;
        }

    });

    return MyRiccat;

});