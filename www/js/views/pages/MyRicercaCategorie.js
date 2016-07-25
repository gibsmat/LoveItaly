define(function(require) {

    var Backbone = require("backbone");
    var CategoryModel = require("models/CategoryModel");
    var CategoriesCollection = require("collections/CategoriesCollection");
    var Utils = require("utils");
    var Handlebars = require("handlebars");


    var MyRicercaCategorie = Utils.Page.extend({

        constructorName: "MyRicercaCategorie",

        initialize: function() {
            // load the precompiled template
            this.template = Utils.templates.ricercacategorie;
        },

        id: "ricercacategorie",
        model: CategoryModel,
        collection: CategoriesCollection,

        events: {
            "click .cercap": "ricerca",
            "click .prodottocategorie": "gotoProdotti",
        },
        gotoProdotti: function(e) {
            var $target = $(e.target);
            while (!$target.hasClass("prodottocategorie")) $target = $target.parent();
            var className = $target.attr('name');
            $("#sear").val(className);
            var href = $target.attr('href');
            location.hash = href;
        },
        ricerca: function() {
            var rice = $("#sear").val();
            $("#sear").val(rice);
            var href = "searchname/" + rice;
            console.log(href);
            location.hash = href;
        },

        render: function() {
            $("#he2").removeClass(); //indietro
            $("#he3").removeClass(); //div input
            $("#he3").empty();
            $("#he6").removeClass(); //cerca
            $("#he5").removeClass(); //cerca
            $("#menusup").removeClass();
            $("#he2").addClass("icona fa fa-chevron-left flex-item2head"); //indietro
            $("#he3").addClass("flex-item1head ricerca"); //div input
            $("#he3").html("<input class='textricerca nuovo' value ='cercami..' type='text' name='sear' id='sear'>");
            $("#he4").addClass("cercami"); //input
            $("#he5").addClass("flex-item3head icona cercap fa fa-search"); //cerca
            $("#menusup").addClass("flex-containerhead fixed");
            var cat = JSON.parse(localStorage.getItem('categorie'));
            $(this.el).html(this.template(cat));

            return this;
        },

    });

    return MyRicercaCategorie;

});