define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");

    var Myselezione = Utils.Page.extend({

        constructorName: "Myselezione",
        id: "file1",
        className: "i-g page",

        events: {
            "tap #salta": "avanti"
        },

        initialize: function() {
            // load the precompiled template
            this.template = Utils.templates.myselezione;
            // here we  can register to inTheDOM or removing events
            // this.listenTo(this, "inTheDOM", function() {
            //   $('#content').on("swipe", function(data){
            //     console.log(data);
            //   });
            // });
            // this.listenTo(this, "removing", mostrabarradeltitolo);

            // by convention, all the inner views of a view must be stored in this.subViews
        },

        render: function() {


            var flag = localStorage.getItem("procedere");
            if (flag == 'false') {
                Backbone.history.navigate("", {
                    trigger: true
                });
            }
            $(this.el).html(this.template());

            return this;
        },
        avanti: function() {
            var scelta = $("#sel1").val();
            console.log(scelta);
            if ((scelta == 'salta') || (scelta = '')) {
                localStorage.setItem('localizzazione', 'null');
                Backbone.history.navigate("homepage", {
                    trigger: true
                });
            } else {
                var scelta = $("#sel1").val();
                console.log(scelta + "dd");

                localStorage.setItem('localizzazione', scelta);
                Backbone.history.navigate("homepage", {
                    trigger: true
                });
            }
        }

    });


    return Myselezione;

});