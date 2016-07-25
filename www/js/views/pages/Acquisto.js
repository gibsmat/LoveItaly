define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");

    var MyAcquisto = Utils.Page.extend({

        constructorName: "MyAcquisto",

        initialize: function() {
            // load the precompiled template
            this.template = Utils.templates.acquisto;
            // here we can register to inTheDOM or removing events
            // this.listenTo(this, "inTheDOM", function() {
            //   $('#content').on("swipe", function(data){
            //     console.log(data);
            //   });
            // });
            // this.listenTo(this, "removing", functionName);

            // by convention, all the inner views of a view must be stored in this.subViews
        },

        id: "mypresentazione",
        className: "i-g page",

        events: {
            "tap .successo": "successo",
        },
        successo: function() {
            if (localStorage["sessione"] == "false") {
                Backbone.history.navigate("homepage", {
                    trigger: true
                });
                $('.menu').animate({
                    "left": "0%"
                }, 250);
                $(".content").css("overflow-y", "hidden");
                $("#menusup").removeClass("fixed");
            } else {
                Backbone.history.navigate("acSuccesso", {
                    trigger: true
                });
                localStorage["carrellolocal"] = "[]";

            }

        },
        render: function() {
            $(this.el).html(this.template());
            return this;
        },


    });

    return MyAcquisto;

});