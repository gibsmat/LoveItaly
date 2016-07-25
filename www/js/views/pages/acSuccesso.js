define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");

    var MySuccesso = Utils.Page.extend({

        constructorName: "MySuccesso",

        initialize: function() {
            // load the precompiled template
            this.template = Utils.templates.acSuccesso;
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

        events: {},

        render: function() {
            $("#he2").removeClass();
            $(this.el).html(this.template());


            return this;
        },


    });

    return MySuccesso;

});