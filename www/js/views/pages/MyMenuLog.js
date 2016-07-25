define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var Handlebars = require("handlebars");


    var MyMenuLog = Utils.Page.extend({

        constructorName: "MyMenuLog",

        initialize: function() {
            // load the precompiled template
            this.template = Utils.templates.menulog;

            // here we can register to inTheDOM or removing events
            // this.listenTo(this, "inTheDOM", function() {
            //   $('#content').on("swipe", function(data){
            //     console.log(data);
            //   });
            // });
            // this.listenTo(this, "removing", functionName);
            // by convention, all the inner views of a view must be stored in this.subViews
        },
        events: {
            "tap #esci": "esci",
            "tap #carrello": "carrello",
            "tap #paginapersonale": "paginapersonale"
        },

        id: "mymenu",

        esci: function() {
            localStorage.setItem("sessione", "false");
            localStorage.setItem("email", "");
            $("#errore").empty();
            $('.menu').animate({
                "left": "-100%"
            }, 250);
            $(".content").css("overflow-y", "auto");

            Backbone.history.navigate("menunolog", {
                trigger: true
            });
        },



        carrello: function() {

            $('.menu').animate({
                "left": "-100%"
            }, 250);
            $(".content").css("overflow-y", "auto");

            Backbone.history.navigate("Carrello", {
                trigger: true
            });
        },




        paginapersonale: function() {

            $('.menu').animate({
                "left": "-100%"
            }, 250);
            $(".content").css("overflow-y", "auto");

            Backbone.history.navigate("personale", {
                trigger: true
            });
        },


        render: function() {
            $(this.el).html(this.template);
            return this;
        },


    });

    return MyMenuLog;

});